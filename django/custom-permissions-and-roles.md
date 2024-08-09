## Custom Permissions and Roles

### 1. **Overview**

This guide provides a step-by-step approach to implementing custom roles and permissions using Django and Django Rest Framework with JWT authentication for secure access.

### 2. **Setup**

Ensure your Django project is configured with DRF and JWT authentication.

In `settings.py`, add the following:

```python
from datetime import timedelta

REST_FRAMEWORK = {
    "DEFAULT_AUTHENTICATION_CLASSES": (
        "rest_framework_simplejwt.authentication.JWTAuthentication",
    ),
    "DEFAULT_PERMISSION_CLASSES": (
        'rest_framework.permissions.IsAuthenticated',
    ),
    "DEFAULT_PAGINATION_CLASS": "rest_framework.pagination.PageNumberPagination",
    "PAGE_SIZE": 10,
}

SIMPLE_JWT = {
    "ACCESS_TOKEN_LIFETIME": timedelta(days=1),
}
```

### 3. **Models**

#### `Permission` and `Role` Models

Create custom models for `Permission` and `Role`, and link them to a `Profile` model associated with the user.

```python
from django.contrib.auth.models import User
from django.db import models

class Permission(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField(blank=True)

    class Meta:
        db_table = "users_permission"


class Role(models.Model):
    name = models.CharField(max_length=100)
    permissions = models.ManyToManyField(Permission, related_name='roles')

    class Meta:
        db_table = "users_role"


class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='profile')
    roles = models.ManyToManyField(Role, related_name='profiles')

    class Meta:
        db_table = "users_profile"

# Signal to create a Profile when a User is created
from django.dispatch import receiver
from django.db.models.signals import post_save

@receiver(post_save, sender=User)
def create_user_profile(sender, instance, created, **kwargs):
    if created:
        Profile.objects.create(user=instance)

@receiver(post_save, sender=User)
def save_user_profile(sender, instance, **kwargs):
    instance.profile.save()
```

### 4. **Views**

#### **LoginView**

This view handles user authentication and JWT token generation. The generated token includes user roles and permissions.

```python
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import AllowAny
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth import authenticate
import json, os

class LoginView(APIView):
    authentication_classes = []
    permission_classes = [AllowAny]

    def post(self, request):
        username = request.data.get("username")
        password = request.data.get("password")
        user = authenticate(username=username, password=password)
        if user is None:
            return Response({"error": "Invalid credentials"}, status=status.HTTP_401_UNAUTHORIZED)

        token = RefreshToken.for_user(user)
        token['user_id'] = user.id
        token['username'] = username

        roles = user.profile.roles.values_list('name', flat=True)
        permissions = Permission.objects.filter(roles__in=user.profile.roles.all()).values_list('name', flat=True)
        token['roles'] = list(roles)
        token['permissions'] = self.generate_permissions(list(set(permissions)))

        return Response({
            "refresh": str(token),
            "access": str(token.access_token),
        })

    def generate_permissions(self, permissions):
        BASE_DIR = os.path.dirname(os.path.abspath(__file__))
        permissions_file = os.path.join(BASE_DIR, 'permissions.json')

        with open(permissions_file) as f:
            data = json.load(f)

        modules = data.get("modules", {})
        for module_name, module_data in modules.items():
            apps = module_data.get("apps", {})
            module_full_access = True
            module_has_partial_access = False

            for app_name, app_data in list(apps.items()):
                attributes = app_data.get("attributes", {})
                app_has_access = False
                full_access = True

                for perm in permissions:
                    if perm.startswith(f"{module_name}_{app_name}_"):
                        attribute = perm.split(f"{module_name}_{app_name}_")[1]
                        if attribute in attributes:
                            attributes[attribute] = True
                            app_has_access = True

                for attribute, access in attributes.items():
                    if access is None:
                        full_access = False

                app_data["access"] = "full_access" if full_access else (
                    "partial_access" if app_has_access else None)

                if app_data["access"] is None:
                    apps.pop(app_name)
                else:
                    module_has_partial_access = module_has_partial_access or (
                        app_data["access"] == "partial_access")
                    module_full_access = module_full_access and (
                        app_data["access"] == "full_access")

            module_data["access"] = "full_access" if module_full_access else (
                "partial_access" if module_has_partial_access else None)

            if module_data["access"] is None:
                modules.pop(module_name)

        return data
```

#### **User and Role Management Views**

These views handle user creation, role assignment, and permission creation.

```python

class CreateUserView(APIView):

    def post(self, request):
        username = request.data.get("username")
        password = request.data.get("password")
        email = request.data.get("email", "")
        first_name = request.data.get("first_name", "")
        last_name = request.data.get("last_name", "")

        if not username or not password or not email or not first_name or not last_name:
            return Response({"error": "Some fields are missing"}, status=status.HTTP_400_BAD_REQUEST)

        if User.objects.filter(username=username).exists():
            return Response({"error": "Username is already taken"}, status=status.HTTP_400_BAD_REQUEST)

        user = User.objects.create_user(
            username=username,
            password=password,
            email=email,
            first_name=first_name,
            last_name=last_name,
            is_staff=True,
            is_active=True
        )

        return Response({"message": "User created successfully", "user_id": user.id}, status=status.HTTP_201_CREATED)


class AssignRoleView(APIView):

    def post(self, request):
        user_id = request.data.get("user_id")
        role_id = request.data.get("role_id")

        try:
            user = User.objects.get(id=user_id)
            role = Role.objects.get(id=role_id)
        except User.DoesNotExist:
            return Response({"error": "User not found"}, status=status.HTTP_404_NOT_FOUND)
        except Role.DoesNotExist:
            return Response({"error": "Role not found"}, status=status.HTTP_404_NOT_FOUND)

        user.profile.roles.add(role)
        return Response({"message": "Role assigned successfully"}, status=status.HTTP_200_OK)


class CreatePermissionView(APIView):

    def post(self, request):
        name = request.data.get("name")
        description = request.data.get("description", "")

        if not name:
            return Response({"error": "Permission name is required"}, status=status.HTTP_400_BAD_REQUEST)

        permission = Permission.objects.create(
            name=name, description=description)
        return Response({"message": "Permission created successfully", "permission_id": permission.id}, status=status.HTTP_201_CREATED)


class CreateRoleView(APIView):

    def post(self, request):
        name = request.data.get("name")
        permission_ids = request.data.get("permission_ids", [])

        if not name:
            return Response({"error": "Role name is required"}, status=status.HTTP_400_BAD_REQUEST)

        role = Role.objects.create(name=name)
        if permission_ids:
            permissions = Permission.objects.filter(id__in=permission_ids)
            role.permissions.set(permissions)

        return Response({"message": "Role created successfully", "role_id": role.id}, status=status.HTTP_201_CREATED)
```

### 5. **Custom Permissions**

Create a custom permission class to check if the user has the required permissions.

```python
from rest_framework.permissions import BasePermission
from rest_framework_simplejwt.tokens import AccessToken
from django.contrib.auth import get_user_model

class HasPermission(BasePermission):
    def has_permission(self, request, view):
        token = request.headers.get('Authorization')
        if not token:
            return False

        try:
            token = token.replace('Bearer ', '')
            access_token = AccessToken(token)
            user_id = access_token.get('user_id', 0)
            User = get_user_model()
            user = User.objects.get(id=user_id)
            permissions = Permission.objects.filter(roles__in=user.profile.roles.all()).values_list('name', flat=True)

            required_permission = view.permission_required
            if required_permission in permissions:
                return True
        except Exception:
            return False

        return False
```

Use this custom permission in any view:

```python
permission_classes = [HasPermission]
permission_required = 'can_add_item'
```

### 6. **URL Configuration**

```python
from django.urls import path
from .views import LoginView, CreateUserView, AssignRoleView, CreatePermissionView, CreateRoleView

urlpatterns = [
    path("login/", LoginView.as_view(), name="login"),
    path("create_user/", CreateUserView.as_view(), name="create-user"),
    path('assign_role/', AssignRoleView.as_view(), name='assign_role'),
    path('create_permission/', CreatePermissionView.as_view(), name='create_permission'),
    path('create_role/', CreateRoleView.as_view(), name='create_role'),
]
```

### 7. **permissions.json File**

This file defines the structure for different modules and their access levels.

```json
{
  "modules": {
    "erp": {
      "access": null,
      "apps": {
        "items": {
          "access": null,
          "attributes": {
            "create": null,
            "view": null,
            "edit": null,
            "delete": null,
            "add_quantity": null,
            "view_cost": null,
            "edit_quantity": null,
            "view_details": null,
            "edit_details": null
          }
        }
      }
    }
  }
}
```

Access levels:

- No access (The whole json object will be removed if access level is no_access)
- full_access
- partial_access

### 8. **Usage**

To use the custom permission in your views, just add:

```python
permission_classes = [HasPermission]
permission_required = 'your_permission_name'
```

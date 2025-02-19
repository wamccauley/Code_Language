### Custom User Models  

#### Why Use a Custom User Model?  

Django’s default `User` model (`django.contrib.auth.models.User`) is sufficient for many applications, but there are cases where customization is necessary:  

- Adding extra fields (e.g., `phone_number`, `date_of_birth`)  
- Using email instead of a username for authentication  
- Modifying default behaviors (e.g., making `is_staff` default to `True`)  
- Creating different user roles (e.g., Admin, Customer, Vendor)  

Django **strongly recommends** setting up a custom user model at the start of a project because changing it later requires recreating the database.  

---

#### Creating a Custom User Model  

##### Step 1: Subclass `AbstractUser` or `AbstractBaseUser`  

There are two ways to create a custom user model:  

1. **Extending `AbstractUser`** (Easiest & retains Django's built-in functionality)  
2. **Using `AbstractBaseUser`** (More control but requires defining authentication logic)  

##### Option 1: Extending `AbstractUser`  

This keeps Django's default fields but allows adding extra ones.  

```python
from django.contrib.auth.models import AbstractUser
from django.db import models

class CustomUser(AbstractUser):
    phone_number = models.CharField(max_length=15, unique=True, null=True, blank=True)
    date_of_birth = models.DateField(null=True, blank=True)

    def __str__(self):
        return self.username
```

---

##### Option 2: Using `AbstractBaseUser`  

This requires manually defining the `USERNAME_FIELD`, authentication, and manager.  

```python
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin
from django.db import models

class CustomUserManager(BaseUserManager):
    def create_user(self, email, password=None, **extra_fields):
        if not email:
            raise ValueError("Email is required")
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)
        return self.create_user(email, password, **extra_fields)

class CustomUser(AbstractBaseUser, PermissionsMixin):
    email = models.EmailField(unique=True)
    first_name = models.CharField(max_length=30, blank=True)
    last_name = models.CharField(max_length=30, blank=True)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)

    objects = CustomUserManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['first_name', 'last_name']

    def __str__(self):
        return self.email
```

Here:  
- `USERNAME_FIELD = 'email'` makes email the unique identifier instead of a username.  
- `is_staff` and `is_active` must be explicitly defined.  
- `CustomUserManager` handles user and superuser creation.  

---

#### Step 2: Updating `settings.py`  

After creating a custom user model, it must be set in `settings.py`:  

```python
AUTH_USER_MODEL = 'myapp.CustomUser'
```

**Important:** This must be done **before running the first migration**. Changing it later requires recreating the database.  

---

#### Step 3: Creating Migrations and Superuser  

Run migrations:  

```bash
python manage.py makemigrations
python manage.py migrate
```

Create a superuser:  

```bash
python manage.py createsuperuser
```

If using `AbstractBaseUser`, the email will be required instead of a username.  

---

#### Step 4: Updating Admin Panel  

By default, the Django admin expects the default `User` model. To register the custom user model properly, modify `admin.py`:  

```python
from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import CustomUser

class CustomUserAdmin(UserAdmin):
    model = CustomUser
    list_display = ('email', 'first_name', 'last_name', 'is_staff', 'is_active')
    fieldsets = (
        (None, {'fields': ('email', 'password')}),
        ('Personal Info', {'fields': ('first_name', 'last_name')}),
        ('Permissions', {'fields': ('is_staff', 'is_active', 'is_superuser', 'groups', 'user_permissions')}),
        ('Important Dates', {'fields': ('last_login',)}),
    )
    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('email', 'password1', 'password2', 'first_name', 'last_name', 'is_staff', 'is_active'),
        }),
    )
    search_fields = ('email',)
    ordering = ('email',)

admin.site.register(CustomUser, CustomUserAdmin)
```

---

#### Step 5: Updating Forms (Optional)  

If using Django’s built-in authentication views (`LoginView`, `SignupView`), they rely on `UserCreationForm` and `AuthenticationForm`. These need to be overridden.  

##### Custom `UserCreationForm`  

```python
from django.contrib.auth.forms import UserCreationForm
from .models import CustomUser

class CustomUserCreationForm(UserCreationForm):
    class Meta:
        model = CustomUser
        fields = ('email', 'first_name', 'last_name')
```

##### Custom `AuthenticationForm`  

```python
from django.contrib.auth.forms import AuthenticationForm
from django import forms

class CustomAuthenticationForm(AuthenticationForm):
    username = forms.EmailField(widget=forms.TextInput(attrs={'autofocus': True}))
```

Use these forms in views:

```python
from django.contrib.auth.views import LoginView
from .forms import CustomAuthenticationForm

class CustomLoginView(LoginView):
    authentication_form = CustomAuthenticationForm
```

---

#### Using a Custom User Model in Queries  

```python
from django.contrib.auth import get_user_model

User = get_user_model()

# Creating a user
user = User.objects.create_user(email="user@example.com", password="securepassword")

# Retrieving a user
user = User.objects.get(email="user@example.com")

# Filtering users
users = User.objects.filter(is_active=True)
```

Using `get_user_model()` ensures compatibility if the user model changes.  

---

#### Extending an Existing Project’s User Model  

If a project has already started with Django’s default `User`, but additional fields are needed, use **One-to-One relationships** instead of replacing the model.  

```python
from django.contrib.auth.models import User
from django.db import models

class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    phone_number = models.CharField(max_length=15, unique=True, null=True, blank=True)
    date_of_birth = models.DateField(null=True, blank=True)

    def __str__(self):
        return self.user.username
```

Signals can automatically create a profile when a new user registers:  

```python
from django.db.models.signals import post_save
from django.dispatch import receiver

@receiver(post_save, sender=User)
def create_profile(sender, instance, created, **kwargs):
    if created:
        Profile.objects.create(user=instance)

@receiver(post_save, sender=User)
def save_profile(sender, instance, **kwargs):
    instance.profile.save()
```

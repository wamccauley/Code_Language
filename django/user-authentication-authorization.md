### User Authentication and Authorization

Authentication system in Django includes: user login, logout, password management, and user registration.

**Main Components:**

1. **User Model**: Represents users in the database.
2. **Authentication Backend**: Handles the process of authenticating a user.
3. **Middleware**: Processes requests and applies authentication checks.

#### User Model

Django comes with a built-in `User` model in `django.contrib.auth.models.User`. This model includes fields like `username`, `password`, `email`, `first_name`, `last_name`, etc.

Example:

```python
from django.contrib.auth.models import User

# Create a new user
user = User.objects.create_user('john', 'john@example.com', 'password123')
user.first_name = 'John'
user.last_name = 'Doe'
user.save()
```

#### Authentication Backend

The default authentication backend is `ModelBackend`, which uses the `User` model. Custom authentication backends can be created to implement different authentication methods.

Example:

```python
# settings.py
AUTHENTICATION_BACKENDS = [
    'django.contrib.auth.backends.ModelBackend',
    'myapp.backends.MyCustomBackend',
]
```

#### Middleware

Django uses authentication middleware to manage user sessions and apply authentication checks on each request.

Example:

```python
# settings.py
MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]
```

#### User Authentication Views

Django provides built-in views for user authentication:

1. **LoginView**: Handles user login.
2. **LogoutView**: Handles user logout.
3. **PasswordChangeView**: Allows users to change their password.
4. **PasswordResetView**: Allows users to reset their password.

Example:

```python
# urls.py
from django.urls import path
from django.contrib.auth import views as auth_views

urlpatterns = [
    path('login/', auth_views.LoginView.as_view(), name='login'),
    path('logout/', auth_views.LogoutView.as_view(), name='logout'),
    path('password_change/', auth_views.PasswordChangeView.as_view(), name='password_change'),
    path('password_reset/', auth_views.PasswordResetView.as_view(), name='password_reset'),
]
```

#### User Authorization

Authorization in Django is managed using permissions and groups. Each user can have specific permissions and be a member of different groups.

**Permissions:**
Permissions can be added to the `User` model and checked in views and templates.

Example:

```python
from django.contrib.auth.models import User

# Check if a user has a specific permission
if user.has_perm('app_name.permission_codename'):
    # Do something
```

**Groups:**
Groups are a way to manage permissions for multiple users. Users in a group inherit the group's permissions.

Example:

```python
from django.contrib.auth.models import Group, User

# Create a new group
group = Group.objects.create(name='Editors')

# Add a user to the group
user = User.objects.get(username='john')
user.groups.add(group)
```

### User Authentication and Authorization in Django  

Django provides a built-in authentication system that handles user authentication, authorization, and session management.  

#### Authentication in Django  

Django’s authentication framework provides functionalities for user login, logout, and password management.  

```python
from django.contrib.auth import authenticate, login
from django.http import HttpResponse

def user_login(request):
    user = authenticate(username='john', password='secret')
    if user is not None:
        login(request, user)
        return HttpResponse('User authenticated and logged in.')
    return HttpResponse('Invalid credentials.')
```

- `authenticate(username, password)` checks if the credentials are valid.  
- `login(request, user)` logs the user in and creates a session.  

#### User Model  

Django provides a built-in `User` model for handling authentication and user-related data.  

```python
from django.contrib.auth.models import User

user = User.objects.create_user(username='john', password='secret')
user.save()
```

- `create_user()` securely hashes the password before saving.  
- `save()` stores the user in the database.  

#### Logging Out Users  

Django provides a method to log users out and clear their session.  

```python
from django.contrib.auth import logout
from django.http import HttpResponse

def user_logout(request):
    logout(request)
    return HttpResponse('User logged out.')
```

- `logout(request)` clears the session and logs the user out.  

#### Restricting Access with LoginRequired  

Django provides the `@login_required` decorator to restrict access to authenticated users.  

```python
from django.contrib.auth.decorators import login_required
from django.http import HttpResponse

@login_required
def dashboard(request):
    return HttpResponse('Welcome to your dashboard.')
```

- `@login_required` ensures only logged-in users can access the view.  

#### Checking Permissions  

Django allows checking if a user has specific permissions before allowing access.  

```python
from django.http import HttpResponse

def restricted_view(request):
    if request.user.is_authenticated and request.user.has_perm('app_name.permission_codename'):
        return HttpResponse('Access granted.')
    return HttpResponse('Access denied.')
```

- `request.user.is_authenticated` verifies if the user is logged in.  
- `request.user.has_perm('app_name.permission_codename')` checks for a specific permission.  

#### Using Groups for Role-Based Access  

Django supports grouping users to manage permissions efficiently.  

```python
from django.contrib.auth.models import Group, User

group = Group.objects.create(name='Editors')
user = User.objects.get(username='john')
user.groups.add(group)
```

- `Group.objects.create(name='Editors')` creates a new user group.  
- `user.groups.add(group)` assigns the user to the group.  

#### Custom User Model  

Django allows customizing the `User` model for additional fields and functionality.  

```python
from django.contrib.auth.models import AbstractUser
from django.db import models

class CustomUser(AbstractUser):
    age = models.PositiveIntegerField(null=True, blank=True)
```

- `AbstractUser` provides all built-in authentication features.  
- `age = models.PositiveIntegerField()` adds a custom field.  

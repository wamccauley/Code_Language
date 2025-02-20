### Password Management in Django  

Django provides built-in utilities for handling password storage, validation, and reset functionality securely.  

#### Storing Passwords Securely  

Django automatically hashes passwords before storing them in the database using a strong hashing algorithm.  

```python
from django.contrib.auth.models import User

user = User.objects.create(username='john')
user.set_password('securepassword')
user.save()
```

- `set_password('securepassword')` hashes the password before saving it.  
- `save()` persists the user’s data in the database.  

#### Verifying a User’s Password  

Django provides a method to check if a given password matches the stored hashed password.  

```python
from django.contrib.auth import authenticate

user = authenticate(username='john', password='securepassword')

if user is not None:
    print('Password is correct!')
else:
    print('Invalid credentials.')
```

- `authenticate(username, password)` verifies the user’s credentials.  
- Returns `None` if the credentials are incorrect.  

#### Changing a User’s Password  

Users can change their password while logged in.  

```python
user = User.objects.get(username='john')
user.set_password('newsecurepassword')
user.save()
```

- `set_password('newsecurepassword')` updates the password securely.  

Django also provides built-in views for handling password changes via forms.  

```python
from django.contrib.auth.views import PasswordChangeView
from django.urls import path

urlpatterns = [
    path('change-password/', PasswordChangeView.as_view(), name='password_change'),
]
```

- `PasswordChangeView` provides a built-in form to change passwords.  

#### Resetting a User’s Password  

Django includes views for handling password resets via email.  

```python
from django.contrib.auth.views import PasswordResetView, PasswordResetConfirmView
from django.urls import path

urlpatterns = [
    path('password-reset/', PasswordResetView.as_view(), name='password_reset'),
    path('password-reset-confirm/<uidb64>/<token>/', PasswordResetConfirmView.as_view(), name='password_reset_confirm'),
]
```

- `PasswordResetView` sends a reset email to the user.  
- `PasswordResetConfirmView` allows users to set a new password after clicking the reset link.  

#### Using `make_password` for Manual Hashing  

Django provides `make_password()` to manually hash passwords when needed.  

```python
from django.contrib.auth.hashers import make_password

hashed_password = make_password('mypassword')
print(hashed_password)
```

- `make_password('mypassword')` returns a securely hashed version of the password.  

#### Checking Password Strength  

Django provides built-in password validators to enforce password strength requirements.  

```python
AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
        'OPTIONS': {'min_length': 8},
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]
```

- `MinimumLengthValidator` ensures passwords meet a minimum length.  
- `CommonPasswordValidator` prevents weak passwords.  
- `NumericPasswordValidator` blocks fully numeric passwords.  

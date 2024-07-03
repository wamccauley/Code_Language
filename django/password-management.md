### Password Management

Django provides its own system for managing user passwords, including changing passwords, resetting forgotten passwords, and enforcing password policies.

#### Password Change

Django provides built-in views and forms for changing a user's password while they are logged in. The primary view for this functionality is `PasswordChangeView`.

**Setup:**

1. **URL Configuration**
2. **Template**
3. **Form Handling**

**URL Configuration:**
You need to configure the URL for the password change view in your `urls.py` file.

Example:

```python
# urls.py
from django.urls import path
from django.contrib.auth import views as auth_views

urlpatterns = [
    path('password_change/', auth_views.PasswordChangeView.as_view(), name='password_change'),
    path('password_change/done/', auth_views.PasswordChangeDoneView.as_view(), name='password_change_done'),
]
```

**Template:**
Create templates for the password change view and the success view. By default, Django looks for templates named `registration/password_change_form.html` and `registration/password_change_done.html`.

Example:

```html
<!-- templates/registration/password_change_form.html -->
<!DOCTYPE html>
<html>
  <head>
    <title>Change Password</title>
  </head>
  <body>
    <h2>Change Password</h2>
    <form method="post">
      {% csrf_token %} {{ form.as_p }}
      <button type="submit">Change Password</button>
    </form>
  </body>
</html>
```

```html
<!-- templates/registration/password_change_done.html -->
<!DOCTYPE html>
<html>
  <head>
    <title>Password Change Successful</title>
  </head>
  <body>
    <h2>Password Changed Successfully</h2>
    <a href="{% url 'login' %}">Login</a>
  </body>
</html>
```

**Form Handling:**
The `PasswordChangeView` uses the `PasswordChangeForm` to handle the password change process. This form is automatically included in the context by the view.

#### Password Reset

Django provides a series of views and forms to handle password reset via email. The primary views for this functionality are `PasswordResetView`, `PasswordResetDoneView`, `PasswordResetConfirmView`, and `PasswordResetCompleteView`.

**Setup:**

1. **URL Configuration**
2. **Templates**
3. **Email Configuration**

**URL Configuration:**
You need to configure the URLs for the password reset views in your `urls.py` file.

Example:

```python
# urls.py
from django.urls import path
from django.contrib.auth import views as auth_views

urlpatterns = [
    path('password_reset/', auth_views.PasswordResetView.as_view(), name='password_reset'),
    path('password_reset/done/', auth_views.PasswordResetDoneView.as_view(), name='password_reset_done'),
    path('reset/<uidb64>/<token>/', auth_views.PasswordResetConfirmView.as_view(), name='password_reset_confirm'),
    path('reset/done/', auth_views.PasswordResetCompleteView.as_view(), name='password_reset_complete'),
]
```

**Templates:**
Create templates for each password reset view. By default, Django looks for templates named `registration/password_reset_form.html`, `registration/password_reset_done.html`, `registration/password_reset_confirm.html`, and `registration/password_reset_complete.html`.

Example:

```html
<!-- templates/registration/password_reset_form.html -->
<!DOCTYPE html>
<html>
  <head>
    <title>Reset Password</title>
  </head>
  <body>
    <h2>Reset Password</h2>
    <form method="post">
      {% csrf_token %} {{ form.as_p }}
      <button type="submit">Reset Password</button>
    </form>
  </body>
</html>
```

```html
<!-- templates/registration/password_reset_done.html -->
<!DOCTYPE html>
<html>
  <head>
    <title>Password Reset Email Sent</title>
  </head>
  <body>
    <h2>Password Reset Email Sent</h2>
    <p>Check your email for the link to reset your password.</p>
  </body>
</html>
```

```html
<!-- templates/registration/password_reset_confirm.html -->
<!DOCTYPE html>
<html>
  <head>
    <title>Enter New Password</title>
  </head>
  <body>
    <h2>Enter New Password</h2>
    <form method="post">
      {% csrf_token %} {{ form.as_p }}
      <button type="submit">Set New Password</button>
    </form>
  </body>
</html>
```

```html
<!-- templates/registration/password_reset_complete.html -->
<!DOCTYPE html>
<html>
  <head>
    <title>Password Reset Complete</title>
  </head>
  <body>
    <h2>Password Reset Complete</h2>
    <a href="{% url 'login' %}">Login</a>
  </body>
</html>
```

**Email Configuration:**
Django needs to be configured to send emails. Update your `settings.py` with the email backend and related settings.

Example:

```python
# settings.py
EMAIL_BACKEND = 'django.core.mail.backends.smtp.EmailBackend'
EMAIL_HOST = 'smtp.example.com'
EMAIL_PORT = 587
EMAIL_USE_TLS = True
EMAIL_HOST_USER = 'your_email@example.com'
EMAIL_HOST_PASSWORD = 'your_email_password'
DEFAULT_FROM_EMAIL = 'webmaster@example.com'
```

#### Password Validators

Django allows you to enforce password policies using password validators. These validators can check for password length, complexity, and other criteria.

**Configuring Password Validators:**
Update your `settings.py` to include the desired password validators.

Example:

```python
# settings.py
AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
        'OPTIONS': {
            'min_length': 8,
        }
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]
```

**Custom Password Validators:**
You can create custom password validators by implementing the `BasePasswordValidator` class.

Example:

```python
# validators.py
from django.core.exceptions import ValidationError
from django.utils.translation import gettext as _

class MyCustomPasswordValidator:
    def validate(self, password, user=None):
        if not any(char.isupper() for char in password):
            raise ValidationError(
                _("This password must contain at least one uppercase letter."),
                code='password_no_upper',
            )

    def get_help_text(self):
        return _("Your password must contain at least one uppercase letter.")
```

Add the custom validator to your `settings.py`:

Example:

```python
# settings.py
AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'myapp.validators.MyCustomPasswordValidator',
    },
]
```

### User Registration

#### Creating a User Registration Form

Django's forms framework simplifies creating and handling HTML forms. You can create a custom registration form by subclassing `forms.Form` or `forms.ModelForm`.

Example:

```python
# forms.py
from django import forms
from django.contrib.auth.models import User

class UserRegistrationForm(forms.ModelForm):
    password = forms.CharField(label='Password', widget=forms.PasswordInput)
    password_confirm = forms.CharField(label='Confirm Password', widget=forms.PasswordInput)

    class Meta:
        model = User
        fields = ('username', 'email', 'password')

    def clean_password_confirm(self):
        cd = self.cleaned_data
        if cd['password'] != cd['password_confirm']:
            raise forms.ValidationError('Passwords don’t match.')
        return cd['password_confirm']
```

#### User Registration View

You can create a view to handle the registration process. This view will display the registration form, validate the input, and create a new user if the form is valid.

Example:

```python
# views.py
from django.shortcuts import render, redirect
from django.contrib.auth import login
from django.contrib.auth.models import User
from .forms import UserRegistrationForm

def register(request):
    if request.method == 'POST':
        form = UserRegistrationForm(request.POST)
        if form.is_valid():
            new_user = form.save(commit=False)
            new_user.set_password(form.cleaned_data['password'])
            new_user.save()
            login(request, new_user)
            return redirect('home')
    else:
        form = UserRegistrationForm()
    return render(request, 'registration/register.html', {'form': form})
```

#### User Registration Template

The registration template displays the form and handles form submission.

Example:

```html
<!-- templates/registration/register.html -->
<!DOCTYPE html>
<html>
  <head>
    <title>Register</title>
  </head>
  <body>
    <h2>Register</h2>
    <form method="post">
      {% csrf_token %} {{ form.as_p }}
      <button type="submit">Register</button>
    </form>
  </body>
</html>
```

#### URLs Configuration

Add a URL pattern for the registration view in your `urls.py` file.

Example:

```python
# urls.py
from django.urls import path
from .views import register

urlpatterns = [
    path('register/', register, name='register'),
]
```

#### Customizing User Model

For more complex user registration requirements, you might need to customize the user model. You can do this by extending Django's built-in `AbstractUser` or `AbstractBaseUser`.

Example:

```python
# models.py
from django.contrib.auth.models import AbstractUser

class CustomUser(AbstractUser):
    # Add any extra fields here
    bio = models.TextField(blank=True, null=True)
```

Update settings to use the custom user model:

```python
# settings.py
AUTH_USER_MODEL = 'yourapp.CustomUser'
```

Adjust the registration form and view to use the custom user model:

```python
# forms.py
from django import forms
from .models import CustomUser

class CustomUserRegistrationForm(forms.ModelForm):
    password = forms.CharField(label='Password', widget=forms.PasswordInput)
    password_confirm = forms.CharField(label='Confirm Password', widget=forms.PasswordInput)

    class Meta:
        model = CustomUser
        fields = ('username', 'email', 'password')

    def clean_password_confirm(self):
        cd = self.cleaned_data
        if cd['password'] != cd['password_confirm']:
            raise forms.ValidationError('Passwords don’t match.')
        return cd['password_confirm']
```

```python
# views.py
from django.shortcuts import render, redirect
from django.contrib.auth import login
from .models import CustomUser
from .forms import CustomUserRegistrationForm

def register(request):
    if request.method == 'POST':
        form = CustomUserRegistrationForm(request.POST)
        if form.is_valid():
            new_user = form.save(commit=False)
            new_user.set_password(form.cleaned_data['password'])
            new_user.save()
            login(request, new_user)
            return redirect('home')
    else:
        form = CustomUserRegistrationForm()
    return render(request, 'registration/register.html', {'form': form})
```

#### User Registration Signals

You might want to perform additional actions when a user registers, such as sending a welcome email. Django signals are a great way to implement this.

Example:

```python
# signals.py
from django.db.models.signals import post_save
from django.dispatch import receiver
from django.core.mail import send_mail
from .models import CustomUser

@receiver(post_save, sender=CustomUser)
def send_welcome_email(sender, instance, created, **kwargs):
    if created:
        send_mail(
            'Welcome!',
            'Thank you for registering.',
            'from@example.com',
            [instance.email],
            fail_silently=False,
        )
```

Register the signal in your app's `apps.py`:

```python
# apps.py
from django.apps import AppConfig

class YourAppConfig(AppConfig):
    name = 'yourapp'

    def ready(self):
        import yourapp.signals
```

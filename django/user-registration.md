### User Registration  

Handling user registration involves creating a new user, validating input data, and securely storing the password.  

#### Creating a User  

The `User` model provides a method for creating new users with hashed passwords.  

```python
from django.contrib.auth.models import User

user = User.objects.create_user(username='john', password='securepassword', email='john@example.com')
user.save()
```

- `create_user()` ensures the password is hashed before storing it.  
- `save()` persists the user’s data in the database.  

#### Using Forms for User Registration  

A `ModelForm` simplifies user registration by handling validation automatically.  

```python
from django import forms
from django.contrib.auth.models import User

class RegistrationForm(forms.ModelForm):
    password = forms.CharField(widget=forms.PasswordInput)

    class Meta:
        model = User
        fields = ['username', 'email', 'password']
```

- `password = forms.CharField(widget=forms.PasswordInput)` ensures the password is hidden in the form.  
- `Meta.fields` defines the required fields for user registration.  

#### Handling Registration in a View  

A view processes the registration form and creates a new user if the input is valid.  

```python
from django.shortcuts import render, redirect
from django.contrib.auth import login
from .forms import RegistrationForm

def register(request):
    if request.method == 'POST':
        form = RegistrationForm(request.POST)
        if form.is_valid():
            user = form.save(commit=False)
            user.set_password(form.cleaned_data['password'])
            user.save()
            login(request, user)
            return redirect('dashboard')
    else:
        form = RegistrationForm()
    return render(request, 'register.html', {'form': form})
```

- `form.is_valid()` checks for valid input.  
- `user.set_password()` ensures the password is securely hashed.  
- `login(request, user)` logs in the user immediately after registration.  

#### Registration Template  

A simple template collects user details and submits the form.  

```html
<form method="post">
    &#123;% endraw %&#125;&#123;% csrf_token %&#125;
    {{ form.as_p }}
    <button type="submit">Register</button>
</form>
```

- `&#123;% endraw %&#125;&#123;% csrf_token %&#125;` prevents CSRF attacks.  
- `form.as_p` renders form fields with labels.  

#### Redirecting After Registration  

After successful registration, users can be redirected to a dashboard or login page.  

```python
return redirect('dashboard')  # Redirects to the user's dashboard
```
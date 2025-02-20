### Security Best Practices  

#### 1. Use `SECRET_KEY` Properly  

A strong and unique `SECRET_KEY` is critical for security. Avoid hardcoding it in `settings.py`. Instead, store it in **environment variables**:  

```python
import os
SECRET_KEY = os.getenv("DJANGO_SECRET_KEY")
```

Generate a strong key using:  

```bash
python -c 'import secrets; print(secrets.token_urlsafe(50))'
```

In production, set this in your environment variables or a `.env` file.  

---

#### 2. Keep Debug Mode Off in Production  

Debug mode (`DEBUG = True`) exposes sensitive information in error messages. Disable it in production:  

```python
DEBUG = False
```

Also, set `ALLOWED_HOSTS` to restrict access:  

```python
ALLOWED_HOSTS = ['yourdomain.com']
```

---

#### 3. Secure Database Configuration  

Never store database credentials directly in `settings.py`. Instead, use environment variables:  

```python
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': os.getenv('DB_NAME'),
        'USER': os.getenv('DB_USER'),
        'PASSWORD': os.getenv('DB_PASSWORD'),
        'HOST': os.getenv('DB_HOST'),
        'PORT': os.getenv('DB_PORT'),
    }
}
```

Use **strong passwords** and limit database user permissions.  

---

#### 4. Use HTTPS in Production  

Always enable HTTPS to encrypt communication:  

- Use **Let's Encrypt** for free SSL certificates.  
- Set `SECURE_SSL_REDIRECT = True` to force HTTPS.  
- Enable **HSTS** to prevent protocol downgrade attacks:  

```python
SECURE_HSTS_SECONDS = 31536000  # 1 year
SECURE_HSTS_INCLUDE_SUBDOMAINS = True
SECURE_HSTS_PRELOAD = True
```

---

#### 5. Protect Against Cross-Site Scripting (XSS)  

Django automatically escapes HTML in templates, but never trust user input.  

Use **`safe`** carefully in templates:  

```django
{{ user_input | safe }}  {# Avoid unless necessary #}
```

Use Django’s built-in **`bleach`** library for sanitizing input:  

```python
from bleach.sanitizer import Cleaner
cleaner = Cleaner(tags=['b', 'i', 'u', 'a'], attributes={'a': ['href']})
safe_text = cleaner.clean(user_input)
```

---

#### 6. Prevent SQL Injection  

Always use Django’s ORM instead of raw SQL:  

```python
User.objects.filter(email=email).first()  # Safe
```

If raw queries are necessary, use parameterized queries:  

```python
cursor.execute("SELECT * FROM users WHERE email = %s", [email])  # Safe
```

Never concatenate user input directly into queries.  

---

#### 7. Protect Against Cross-Site Request Forgery (CSRF)  

Django includes CSRF protection by default. Ensure all forms include a CSRF token:  

```django
<form method="post">
    &#123;% endraw %&#125;&#123;% csrf_token %&#125;
</form>
```

For APIs, use `csrf_exempt` only when necessary and consider **token-based authentication** instead.  

```python
from django.views.decorators.csrf import csrf_exempt

@csrf_exempt
def my_api_view(request):
    ...
```

---

#### 8. Secure User Authentication  

- Use Django’s built-in authentication system.  
- Enforce **strong passwords** with `AUTH_PASSWORD_VALIDATORS`:  

```python
AUTH_PASSWORD_VALIDATORS = [
    {'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator', 'OPTIONS': {'min_length': 8}},
    {'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator'},
    {'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator'},
]
```

- Use **`LOGIN_URL` and `LOGIN_REDIRECT_URL`** properly.  
- Implement **two-factor authentication (2FA)** using `django-otp` or `django-two-factor-auth`.  

---

#### 9. Limit Login Attempts  

To prevent brute-force attacks, use `django-axes` or Django’s built-in authentication middleware:  

```bash
pip install django-axes
```

Add it to `INSTALLED_APPS`:  

```python
INSTALLED_APPS = [
    'axes',
    ...
]
```

Add middleware:  

```python
MIDDLEWARE = [
    'axes.middleware.AxesMiddleware',
    ...
]
```

Run migrations:  

```bash
python manage.py migrate axes
```

This limits failed login attempts based on IP or user.  

---

#### 10. Secure File Uploads  

- Validate file types to prevent malicious uploads.  
- Store uploaded files outside of `MEDIA_ROOT` and serve them securely.  
- Use Django’s **`FileExtensionValidator`**:  

```python
from django.core.validators import FileExtensionValidator
from django.db import models

class Profile(models.Model):
    avatar = models.ImageField(upload_to='avatars/', validators=[FileExtensionValidator(['jpg', 'png'])])
```

Use **`CONTENT_LENGTH`** limits in `nginx` or Django settings to prevent large file uploads.  

---

#### 11. Use Django Security Middleware  

Django’s `SecurityMiddleware` adds protections against common attacks. Ensure it’s enabled:  

```python
MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    ...
]
```

It enforces:  

- **Strict Transport Security (HSTS)**  
- **Content Security Policy (CSP)**  
- **Referrer Policy**  
- **X-Frame-Options** to prevent clickjacking  

---

#### 12. Secure API Endpoints  

If exposing APIs:  

- Use **authentication tokens** (JWT, OAuth) instead of session-based auth.  
- Restrict CORS origins using `django-cors-headers`:  

```bash
pip install django-cors-headers
```

```python
INSTALLED_APPS = [
    'corsheaders',
    ...
]

MIDDLEWARE = [
    'corsheaders.middleware.CorsMiddleware',
    ...
]

CORS_ALLOWED_ORIGINS = [
    "https://example.com",
]
```

- Use rate limiting to prevent abuse:  

```bash
pip install django-ratelimit
```

```python
from django_ratelimit.decorators import ratelimit

@ratelimit(key='ip', rate='5/m')
def my_api_view(request):
    ...
```

---

#### 13. Set Up Logging for Security Monitoring  

Django’s logging can help detect suspicious activity:  

```python
LOGGING = {
    'version': 1,
    'disable_existing_loggers': False,
    'handlers': {
        'file': {
            'level': 'WARNING',
            'class': 'logging.FileHandler',
            'filename': 'security.log',
        },
    },
    'loggers': {
        'django.security': {
            'handlers': ['file'],
            'level': 'WARNING',
            'propagate': True,
        },
    },
}
```

This logs security-related warnings and errors to `security.log`.  

---

#### 14. Regularly Update Dependencies  

Outdated dependencies introduce vulnerabilities. Use:  

```bash
pip list --outdated
```

Upgrade dependencies:  

```bash
pip install --upgrade -r requirements.txt
```

Automate security checks using:  

```bash
pip install safety
safety check
```

---

#### 15. Restrict Admin Panel Access  

- Change the default `/admin/` URL:  

```python
urlpatterns = [
    path('secure-admin/', admin.site.urls),
]
```

- Restrict admin access by IP:  

```python
MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    ...
]

SECURE_PROXY_SSL_HEADER = ('HTTP_X_FORWARDED_PROTO', 'https')

ALLOWED_HOSTS = ['yourdomain.com']
```

- Use **multi-factor authentication (MFA)** for admin users.  

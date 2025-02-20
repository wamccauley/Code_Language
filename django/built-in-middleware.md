### Middleware  

#### Built-in Middleware  

Django includes several middleware classes that handle security, session management, authentication, and other core functionalities. These middleware components are listed in `MIDDLEWARE` inside `settings.py`.  

##### SecurityMiddleware  

Enhances security by enforcing HTTPS, preventing clickjacking, and setting security headers.  

```python
MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
]
```

- Forces HTTPS if `SECURE_SSL_REDIRECT = True`.  
- Adds the `X-Content-Type-Options: nosniff` header to prevent MIME-type sniffing.  
- Prevents clickjacking with the `X-Frame-Options` header.  

##### CommonMiddleware  

Handles various HTTP enhancements, including URL normalization and redirecting missing slashes.  

```python
MIDDLEWARE = [
    'django.middleware.common.CommonMiddleware',
]
```

- Redirects `/page` to `/page/` if `APPEND_SLASH = True`.  
- Blocks requests based on `DISALLOWED_USER_AGENTS`.  
- Supports `USE_ETAGS` for caching.  

##### CsrfViewMiddleware  

Protects against Cross-Site Request Forgery (CSRF) attacks by validating CSRF tokens in requests.  

```python
MIDDLEWARE = [
    'django.middleware.csrf.CsrfViewMiddleware',
]
```

- Requires `&#123;% endraw %&#125;&#123;% csrf_token %&#125;` in forms for protection.  
- Blocks POST requests without a valid CSRF token.  

##### AuthenticationMiddleware  

Associates users with requests, making `request.user` available in views.  

```python
MIDDLEWARE = [
    'django.contrib.auth.middleware.AuthenticationMiddleware',
]
```

- Automatically sets `request.user` based on the session.  
- Requires `SessionMiddleware` to be enabled.  

##### SessionMiddleware  

Handles user sessions by enabling session storage in cookies or databases.  

```python
MIDDLEWARE = [
    'django.contrib.sessions.middleware.SessionMiddleware',
]
```

- Stores session data in `request.session`.  
- Supports different backends like cookies, databases, and cache.  

##### XFrameOptionsMiddleware  

Protects against clickjacking by setting `X-Frame-Options` headers.  

```python
MIDDLEWARE = [
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]
```

- Blocks rendering the site in an iframe unless `X_FRAME_OPTIONS = 'ALLOW-FROM'` is set.  

##### MessageMiddleware  

Enables temporary messages between requests, used with Django’s messages framework.  

```python
MIDDLEWARE = [
    'django.contrib.messages.middleware.MessageMiddleware',
]
```

- Stores messages in sessions or cookies.  
- Requires `request.get_messages()` to retrieve messages.  

##### LocaleMiddleware  

Enables language translation and timezone handling for internationalization.  

```python
MIDDLEWARE = [
    'django.middleware.locale.LocaleMiddleware',
]
```

- Detects user language from cookies, session, or headers.  
- Uses `LANGUAGE_CODE` and `LOCALE_PATHS` for translations.  

Each middleware component plays a specific role in handling requests, responses, and security features.
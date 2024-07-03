### Built-in Middleware

Django comes with a variety of built-in middleware that handles common tasks such as security, session management, authentication, and more.

#### List of Built-in Middleware

1. **SecurityMiddleware**
2. **SessionMiddleware**
3. **CommonMiddleware**
4. **CsrfViewMiddleware**
5. **AuthenticationMiddleware**
6. **MessageMiddleware**
7. **XFrameOptionsMiddleware**
8. **LocaleMiddleware**
9. **GZipMiddleware**

#### SecurityMiddleware

The `SecurityMiddleware` provides several security enhancements to protect your application from common web vulnerabilities.

Features:

- Forces HTTPS connections.
- Sets security-related HTTP headers.
- Prevents content sniffing.

Example:

```python
# settings.py
MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    # ...
]

SECURE_BROWSER_XSS_FILTER = True
SECURE_CONTENT_TYPE_NOSNIFF = True
SECURE_HSTS_SECONDS = 3600
SECURE_SSL_REDIRECT = True
```

#### SessionMiddleware

The `SessionMiddleware` enables session support by managing session data in the database and handling session cookies.

Example:

```python
# settings.py
MIDDLEWARE = [
    'django.contrib.sessions.middleware.SessionMiddleware',
    # ...
]

SESSION_ENGINE = 'django.contrib.sessions.backends.db'  # Default session engine
```

#### CommonMiddleware

The `CommonMiddleware` provides several useful functionalities, including:

- Enforcing trailing slashes on URLs.
- Normalizing URL paths.
- Handling content length headers.

Example:

```python
# settings.py
MIDDLEWARE = [
    'django.middleware.common.CommonMiddleware',
    # ...
]

APPEND_SLASH = True
PREPEND_WWW = False
```

#### CsrfViewMiddleware

The `CsrfViewMiddleware` provides protection against Cross-Site Request Forgery (CSRF) attacks by checking for the presence of a CSRF token in POST requests.

Example:

```python
# settings.py
MIDDLEWARE = [
    'django.middleware.csrf.CsrfViewMiddleware',
    # ...
]

CSRF_COOKIE_SECURE = True
CSRF_COOKIE_HTTPONLY = True
```

#### AuthenticationMiddleware

The `AuthenticationMiddleware` associates users with requests using sessions. It is essential for enabling user authentication in your application.

Example:

```python
# settings.py
MIDDLEWARE = [
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    # ...
]
```

#### MessageMiddleware

The `MessageMiddleware` enables temporary storage of messages for users, typically used for notifications and alerts.

Example:

```python
# settings.py
MIDDLEWARE = [
    'django.contrib.messages.middleware.MessageMiddleware',
    # ...
]

from django.contrib.messages import constants as message_constants

MESSAGE_LEVEL = message_constants.DEBUG
```

#### XFrameOptionsMiddleware

The `XFrameOptionsMiddleware` provides clickjacking protection by setting the `X-Frame-Options` HTTP header.

Example:

```python
# settings.py
MIDDLEWARE = [
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
    # ...
]

X_FRAME_OPTIONS = 'DENY'
```

#### LocaleMiddleware

The `LocaleMiddleware` enables language selection based on the request's `Accept-Language` header. It allows your application to support multiple languages and locales.

Example:

```python
# settings.py
MIDDLEWARE = [
    'django.middleware.locale.LocaleMiddleware',
    # ...
]

LANGUAGE_CODE = 'en-us'
LANGUAGES = [
    ('en', 'English'),
    ('es', 'Spanish'),
]

LOCALE_PATHS = [
    '/path/to/locale/folder',
]
```

#### GZipMiddleware

The `GZipMiddleware` compresses responses if the client supports GZip compression. This reduces the size of the response and improves load times.

Example:

```python
# settings.py
MIDDLEWARE = [
    'django.middleware.gzip.GZipMiddleware',
    # ...
]
```

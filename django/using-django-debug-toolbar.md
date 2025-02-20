### Using Django Debug Toolbar  

Django Debug Toolbar is an essential tool for monitoring and optimizing Django applications. It provides insights into SQL queries, cache usage, template rendering time, and more.

#### 1. Installing Django Debug Toolbar

Install the package using pip:  

```bash
pip install django-debug-toolbar
```

---

#### 2. Adding to Installed Apps

Modify `settings.py` to include `'debug_toolbar'` in `INSTALLED_APPS`:  

```python
INSTALLED_APPS = [
    ...
    "debug_toolbar",
]
```

---

#### 3. Adding Middleware  

Insert `'debug_toolbar.middleware.DebugToolbarMiddleware'` **before** `'django.middleware.common.CommonMiddleware'` in `MIDDLEWARE`:  

```python
MIDDLEWARE = [
    "django.middleware.security.SecurityMiddleware",
    "debug_toolbar.middleware.DebugToolbarMiddleware",
    "django.middleware.common.CommonMiddleware",
    ...
]
```

---

#### 4. Configuring Internal IPs  

Django Debug Toolbar is only available for internal IPs. Add this setting to `settings.py`:  

```python
INTERNAL_IPS = [
    "127.0.0.1",
]
```

If using Docker, use:  

```python
import socket

hostname, _, ips = socket.gethostbyname_ex(socket.gethostname())
INTERNAL_IPS = [ip[:-1] + "1" for ip in ips]
```

---

#### 5. Adding Debug Toolbar URLs  

Modify `urls.py` to include Debug Toolbar's URLs:  

```python
from django.conf import settings
from django.conf.urls import include
from django.urls import path

urlpatterns = [
    ...
]

if settings.DEBUG:
    import debug_toolbar
    urlpatterns += [path("__debug__/", include(debug_toolbar.urls))]
```

---

#### 6. Running the Server  

Start the development server:  

```bash
python manage.py runserver
```

Visit your project in the browser, and you should see the Django Debug Toolbar appear on the right side of the screen.

---

#### 7. Features of Django Debug Toolbar  

The toolbar provides several built-in panels for debugging:  

- **SQL Queries**: View the SQL executed for each request.
- **Templates**: See which templates were rendered and how long they took.
- **Cache**: Check cache hits and misses.
- **Static Files**: Monitor loaded static assets.
- **Signals**: View Django’s internal signals.
- **Logging**: Inspect log messages.

---

#### 8. Configuring Debug Toolbar Panels  

Customize which panels appear in `settings.py`:  

```python
DEBUG_TOOLBAR_PANELS = [
    "debug_toolbar.panels.versions.VersionsPanel",
    "debug_toolbar.panels.timer.TimerPanel",
    "debug_toolbar.panels.settings.SettingsPanel",
    "debug_toolbar.panels.headers.HeadersPanel",
    "debug_toolbar.panels.request.RequestPanel",
    "debug_toolbar.panels.sql.SQLPanel",
    "debug_toolbar.panels.staticfiles.StaticFilesPanel",
    "debug_toolbar.panels.templates.TemplatesPanel",
    "debug_toolbar.panels.cache.CachePanel",
    "debug_toolbar.panels.signals.SignalsPanel",
    "debug_toolbar.panels.logging.LoggingPanel",
]
```

---

#### 9. Monitoring SQL Queries  

To log all SQL queries in real time, enable query logging:  

```python
DEBUG_TOOLBAR_CONFIG = {
    "SHOW_TOOLBAR_CALLBACK": lambda request: True,
    "SQL_WARNING_THRESHOLD": 100,  # Highlight queries taking more than 100ms
}
```

You can also enable detailed query execution plans with:  

```python
from django.db import connection

with connection.cursor() as cursor:
    cursor.execute("EXPLAIN ANALYZE SELECT * FROM my_table")
    print(cursor.fetchall())
```

---

#### 10. Enabling Debug Toolbar Only in Development  

Ensure Debug Toolbar is active only in development:  

```python
DEBUG_TOOLBAR_CONFIG = {
    "SHOW_TOOLBAR_CALLBACK": lambda request: request.META.get("REMOTE_ADDR") in INTERNAL_IPS,
}
```

---

#### 11. Checking Cache Performance  

If caching is enabled, Debug Toolbar provides insights into cache performance.  

```python
from django.core.cache import cache

cache.set("my_key", "my_value", timeout=60)
value = cache.get("my_key")
print(value)  # Output: my_value
```

---

#### 12. Debugging Template Performance  

The toolbar shows:  
- Which templates were used.
- How long each template took to render.
- Context variables passed to each template.

```html
&#123;% endraw %&#125;&#123;% for book in books %&#125;
    <p>{{ book.title }}</p>
&#123;% endraw %&#125;&#123;% endfor %&#125;
```

With Debug Toolbar, you can check if template rendering is slow due to large context data.

---

#### 13. Viewing HTTP Headers  

Debug Toolbar provides HTTP request and response headers, useful for debugging:  

```python
def my_view(request):
    print(request.headers)
    return HttpResponse("Check Debug Toolbar for headers")
```

---

#### 14. Disabling Debug Toolbar in Production  

Never use Django Debug Toolbar in production. Disable it using:  

```python
if not DEBUG:
    INSTALLED_APPS.remove("debug_toolbar")
    MIDDLEWARE.remove("debug_toolbar.middleware.DebugToolbarMiddleware")
```

Or completely disable it with:  

```python
SHOW_TOOLBAR_CALLBACK = lambda request: False
```

---

#### 15. Summary of Django Debug Toolbar  

| Feature | Benefit |
|---------|---------|
| SQL Queries Panel | Shows all executed queries and highlights slow ones |
| Templates Panel | Displays template load times and context variables |
| Cache Panel | Shows cache hits, misses, and usage |
| Static Files Panel | Monitors loaded static files |
| Headers Panel | Displays HTTP request/response headers |
| Signals Panel | Shows all Django signals being triggered |
| Logging Panel | Displays log messages in real-time |


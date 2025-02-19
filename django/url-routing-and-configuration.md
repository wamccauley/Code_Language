# URL Routing and Configuration

The URL configuration (URLconf) is a mapping between URL patterns and view functions. This mapping is defined in a `urls.py` file, typically located in your project and app directories.

### Project URL Configuration

When you create a new Django project, a `urls.py` file is automatically created in the project directory. This file is the central point for routing URLs to the appropriate views:

```python
# myproject/urls.py

from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include('myapp.urls')),  # Include the URLs from the app
]
```

### App URL Configuration

Each app can have its own `urls.py` file to handle URLs specific to that app. This modular approach keeps your URL configurations organized:

```python
# myapp/urls.py

from django.urls import path
from . import views

urlpatterns = [
    path('', views.index, name='index'),  # Maps the root URL of the app to the index view
    path('about/', views.about, name='about'),  # Maps the 'about/' URL to the about view
]
```

In this example:

- `path('', views.index, name='index')`: Maps the root URL (`''`) to the `index` view.
- `path('about/', views.about, name='about')`: Maps the `about/` URL to the `about` view.

### URL Patterns

URL patterns are defined using the `path()` function, which takes the following arguments:

- `route`: A string representing the URL pattern.
- `view`: The view function or class that handles requests matching the route.
- `kwargs` (optional): Additional arguments to pass to the view function.
- `name` (optional): A name for the URL pattern, allowing you to refer to it in templates and views.

### Namespacing URL Names

To avoid name conflicts between URL patterns in different apps, you can use namespaces. Namespaces allow you to group URLs under a specific name, making it easier to refer to them in templates and views.

```python
# myproject/urls.py

from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('blog/', include('blog.urls', namespace='blog')),  # Namespaced URLs
]

# blog/urls.py

from django.urls import path
from . import views

app_name = 'blog'  # Set the app namespace

urlpatterns = [
    path('', views.index, name='index'),
    path('post/<int:id>/', views.post_detail, name='post_detail'),
]
```

### Handling Static and Media Files

In development, Django can serve static and media files for you. You need to add configurations in your project's `urls.py` and `settings.py` files.

#### settings.py

```python
# settings.py

from pathlib import Path

BASE_DIR = Path(__file__).resolve().parent.parent

STATIC_URL = '/static/'
MEDIA_URL = '/media/'
MEDIA_ROOT = BASE_DIR / 'media'

```

#### urls.py

```python
# myproject/urls.py

from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('admin/', admin.site.urls),
    path('blog/', include('blog.urls', namespace='blog')),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
```

## URL Dispatching

When a request is received, Django looks for the first match in the URL patterns and dispatches the request to the corresponding view. If no match is found, Django raises a 404 error (Page Not Found).

### Custom 404 and 500 Error Pages

You can create custom error pages for 404 and 500 errors by creating views and templates for these errors.

#### views.py

```python
# myapp/views.py

from django.shortcuts import render

def custom_404(request, exception):
    return render(request, '404.html', status=404)

def custom_500(request):
    return render(request, '500.html', status=500)
```

#### urls.py

```python
# myproject/urls.py

handler404 = 'myapp.views.custom_404'
handler500 = 'myapp.views.custom_500'
```

#### templates/404.html

```html
<!DOCTYPE html>
<html>
  <head>
    <title>Page Not Found</title>
  </head>
  <body>
    <h1>404 - Page Not Found</h1>
    <p>Sorry, the page you are looking for does not exist.</p>
  </body>
</html>
```

#### templates/500.html

```html
<!DOCTYPE html>
<html>
  <head>
    <title>Server Error</title>
  </head>
  <body>
    <h1>500 - Server Error</h1>
    <p>Sorry, something went wrong on our end.</p>
  </body>
</html>
```

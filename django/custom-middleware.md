### Custom Middleware

#### Creating Custom Middleware

To create custom middleware, we need to define a middleware class with specific methods to process requests and responses. The class must implement an `__init__` method and a `__call__` method. Optionally, you can implement other processing methods as needed.

**Basic Structure of Custom Middleware:**

```python
class MyCustomMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        # Code to be executed for each request before
        # the view (and later middleware) are called.

        response = self.get_response(request)

        # Code to be executed for each request/response after
        # the view is called.

        return response
```

#### Custom Middleware Methods

Here are the methods you can define in your middleware class:

1. **`__init__(self, get_response)`**: Called once when the web server starts. It initializes the middleware and is passed the `get_response` callable.
2. **`__call__(self, request)`**: Called for each request. It processes the request and returns a response by calling the `get_response` method.
3. **`process_request(self, request)`**: Processes the request before the view is called.
4. **`process_view(self, request, view_func, view_args, view_kwargs)`**: Processes the request before the view is called, but after `process_request`.
5. **`process_exception(self, request, exception)`**: Processes the request if an exception is raised by the view.
6. **`process_template_response(self, request, response)`**: Processes the response before rendering the template.
7. **`process_response(self, request, response)`**: Processes the response before it is returned to the client.

#### Example: Logging Middleware

Here is an example of custom middleware that logs each request's method and path, as well as the response status code.

```python
# myapp/middleware.py
import logging

logger = logging.getLogger(__name__)

class LoggingMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        # Log the request method and path
        logger.info(f"Request: {request.method} {request.path}")

        response = self.get_response(request)

        # Log the response status code
        logger.info(f"Response: {response.status_code}")

        return response
```

#### Example: Custom Authentication Middleware

Here is an example of custom middleware that checks if a user is authenticated and redirects them to a login page if they are not.

```python
# myapp/middleware.py
from django.shortcuts import redirect
from django.urls import reverse

class CustomAuthenticationMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        if not request.user.is_authenticated and request.path != reverse('login'):
            return redirect('login')

        response = self.get_response(request)
        return response
```

#### Using Custom Middleware

To use your custom middleware, add it to the `MIDDLEWARE` setting in your `settings.py` file.

Example:

```python
# settings.py
MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'myapp.middleware.LoggingMiddleware',
    'myapp.middleware.CustomAuthenticationMiddleware',
]
```

#### Middleware Ordering

The order in which middleware is defined in the `MIDDLEWARE` setting is important. Middleware processes requests and responses in the order they are listed for requests (top to bottom) and in reverse order for responses (bottom to top).

### Middleware  

#### Understanding Middleware  

Middleware is a series of hooks that process requests and responses globally before they reach views or after they leave them. Each middleware component is a Python class that interacts with requests and responses.  

Every middleware class must implement at least one of the following methods:  

- `__init__(self, get_response)`: Initializes the middleware and stores the `get_response` function.  
- `__call__(self, request)`: Processes the request before it reaches the view.  
- `process_view(request, view_func, view_args, view_kwargs)`: Executes before calling the view.  
- `process_exception(request, exception)`: Handles exceptions raised by the view.  
- `process_template_response(request, response)`: Modifies the response before rendering a template.  

```python
class SimpleMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        print("Before view")
        response = self.get_response(request)
        print("After view")
        return response
```

- `__call__()` executes logic before and after the view processes the request.  
- `get_response(request)` passes the request to the next middleware or view.  

Middleware components are listed in `MIDDLEWARE` inside `settings.py`.  

```python
MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'django.middleware.common.CommonMiddleware',
    'myapp.middleware.SimpleMiddleware',
]
```

- The order of middleware matters since each one wraps the response of the next.
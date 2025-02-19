#### Custom Middleware  

Custom middleware allows executing logic before and after a request is processed by the view. Middleware can modify requests, responses, or handle exceptions globally.  

##### Structure of a Custom Middleware  

A middleware class must implement `__init__()` and `__call__()`. Additional hooks like `process_view()`, `process_exception()`, and `process_template_response()` can be included.  

```python
class CustomMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        print("Before view")
        response = self.get_response(request)
        print("After view")
        return response
```

- `__init__()` stores the `get_response` function.  
- `__call__()` executes logic before and after the request is processed.  

##### Using process_view() to Modify Views  

The `process_view()` method runs before the view is called.  

```python
class BlockUserMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response

    def process_view(self, request, view_func, view_args, view_kwargs):
        if request.user.is_authenticated and request.user.username == "blocked_user":
            return HttpResponse("Access Denied", status=403)
```

- `process_view()` inspects the request before reaching the view.  
- Returning an `HttpResponse` prevents the view from executing.  

##### Handling Exceptions with process_exception()  

The `process_exception()` method catches exceptions raised in views.  

```python
class ExceptionHandlerMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response

    def process_exception(self, request, exception):
        return HttpResponse(f"Error: {str(exception)}", status=500)
```

- `process_exception()` handles exceptions and returns a custom response.  

##### Modifying Template Responses with process_template_response()  

The `process_template_response()` method runs after the view returns a `TemplateResponse`.  

```python
class AddContextMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response

    def process_template_response(self, request, response):
        response.context_data['extra'] = 'Extra Context Data'
        return response
```

- `process_template_response()` modifies the response’s context data before rendering.  

##### Activating Custom Middleware  

To enable custom middleware, add it to `MIDDLEWARE` in `settings.py`.  

```python
MIDDLEWARE = [
    'myapp.middleware.CustomMiddleware',
    'myapp.middleware.BlockUserMiddleware',
]
```

- The order in `MIDDLEWARE` affects execution.  
- Each middleware wraps the response of the next in the stack.  

Custom middleware provides a flexible way to modify request processing globally.
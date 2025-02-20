### Handling Requests and Responses

The `HttpRequest` object encapsulates all HTTP request information. It provides attributes like `method`, `GET`, `POST`, `COOKIES`, `FILES`, and `META` data.

```python
from django.http import HttpResponse

def my_view(request):
    if request.method == 'POST':
        # Process POST data
        return HttpResponse('POST request processed.')
    else:
        # Process GET data
        return HttpResponse('GET request processed.')
```

- `request.method` checks the HTTP method (GET or POST).
- `request.POST` accesses POST data.

#### Django HttpResponse Object

The `HttpResponse` object represents the HTTP response. It contains the content and optional headers to send back to the client.

```python
from django.http import HttpResponse

def hello_world(request):
    return HttpResponse('Hello, world!')
```

- `HttpResponse('Hello, world!')` sends a simple HTTP response with content.

#### JsonResponse for JSON Responses

The `JsonResponse` class in Django simplifies returning JSON-encoded data as a response.

```python
from django.http import JsonResponse

def api_data(request):
    data = {'key': 'value'}
    return JsonResponse(data)
```

- `JsonResponse(data)` sends a JSON response with the specified data.

#### Redirects

Django provides utilities to perform HTTP redirects.

```python
from django.shortcuts import redirect

def my_view(request):
    if some_condition:
        return redirect('another_view_name')
    else:
        return redirect('/some_url/')
```

- `redirect('view_name')` redirects to a named view.
- `redirect('/some_url/')` redirects to a specified URL.

#### Handling File Uploads

Django facilitates handling file uploads with `request.FILES`.

```python
def handle_uploaded_file(request):
    if request.method == 'POST' and request.FILES:
        uploaded_file = request.FILES['file']
        # Process the uploaded file
        return HttpResponse('File uploaded successfully.')
    return HttpResponse('File upload failed.')
```

- `request.FILES['file']` accesses the uploaded file.

### Function-Based Views (FBVs)

Function-Based Views (FBVs) in Django are one of the simplest and most straightforward ways to handle requests and responses. Each view is defined as a Python function that receives a web request and returns a web response.

#### Basic Structure of a Function-Based View

A basic function-based view receives a `HttpRequest` object as its first parameter and returns an `HttpResponse` object.

##### Simple Function-Based View

```python
from django.http import HttpResponse

def hello_world(request):
    return HttpResponse("Hello, world!")
```

- `hello_world` is a function that takes a `request` and returns a simple `HttpResponse`.

You can also create a view that returns a JsonResponse:

```python
from django.http import JsonResponse

def hello_world(request):
    return JsonResponse({'message': 'Hello World!'})
```

`urls.py` would be

```python
from django.urls import path
from . import views

urlpatterns = [
    path('hello/', views.hello_world, name='hello_world'),
]
```

#### Using URL Parameters in FBVs

FBVs can capture URL parameters and use them in the view function.

```python
from django.http import HttpResponse

def greet(request, name):
    return HttpResponse(f"Hello, {name}!")
```

- The `name` parameter is captured from the URL and used in the response.

Here the url would be

```python
path('greet/<str:name>/', views.greet, name='greet')
```

#### Handling 404 Errors in FBVs

You can raise a `Http404` exception to handle not found errors.

```python
from django.http import Http404

def get_item(request, item_id):
    try:
        item = Item.objects.get(pk=item_id)
    except Item.DoesNotExist:
        raise Http404("Item does not exist")
    return render(request, 'item_detail.html', {'item': item})
```

- The view raises a `Http404` exception if the `Item` does not exist.

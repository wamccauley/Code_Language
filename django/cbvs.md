### Class-Based Views (CBVs)

Class-Based Views (CBVs) in Django offer a more modular and reusable way to handle requests compared to Function-Based Views (FBVs). They provide a clean way to organize view logic by leveraging object-oriented programming principles.

#### Basic Structure of a Class-Based View

A basic class-based view inherits from `View` and defines a method corresponding to the HTTP method (e.g., `get`, `post`).

```python
from django.http import HttpResponse
from django.views import View

class HelloWorldView(View):
    def get(self, request):
        return HttpResponse("Hello, world!")
```

- `HelloWorldView` is a class that inherits from `View`.
- The `get` method handles GET requests and returns a simple `HttpResponse`.

#### URL Configuration for CBVs

In the `urls.py` file, use the `as_view()` method to include CBVs in URL patterns.

```python
from django.urls import path
from .views import HomePageView, ContactView, ItemDetailView, ItemListView

urlpatterns = [
    path('', HomePageView.as_view(), name='home'),
    path('contact/', ContactView.as_view(), name='contact'),
    path('item/<int:pk>/', ItemDetailView.as_view(), name='item_detail'),
    path('items/', ItemListView.as_view(), name='item_list'),
]
```

- `as_view()` converts the class-based view into a view function.

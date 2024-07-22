### Creating a Simple API


#### Step 1: Creating the Model

Define a simple model in `myapp/models.py`. For this example, let’s create a model for storing information about books.

```python
from django.db import models

class Book(models.Model):
    title = models.CharField(max_length=100)
    author = models.CharField(max_length=100)
    published_date = models.DateField()
    isbn = models.CharField(max_length=13, unique=True)

    def __str__(self):
        return self.title
```

#### Step 2: Creating the Serializer

Create a serializer for the `Book` model in `myapp/serializers.py`:

```python
from rest_framework import serializers
from .models import Book

class BookSerializer(serializers.ModelSerializer):
    class Meta:
        model = Book
        fields = ['id', 'title', 'author', 'published_date', 'isbn']
```

#### Step 3: Creating the Views

Create views for the API in `myapp/views.py`. DRF provides several generic views, but for this example, we’ll use `APIView` for more control.

```python
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status
from .models import Book
from .serializers import BookSerializer

class BookListCreate(APIView):
    def get(self, request):
        books = Book.objects.all()
        serializer = BookSerializer(books, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = BookSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class BookDetail(APIView):
    def get_object(self, pk):
        try:
            return Book.objects.get(pk=pk)
        except Book.DoesNotExist:
            return None

    def get(self, request, pk):
        book = self.get_object(pk)
        if book is None:
            return Response(status=status.HTTP_404_NOT_FOUND)
        serializer = BookSerializer(book)
        return Response(serializer.data)

    def put(self, request, pk):
        book = self.get_object(pk)
        if book is None:
            return Response(status=status.HTTP_404_NOT_FOUND)
        serializer = BookSerializer(book, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk):
        book = self.get_object(pk)
        if book is None:
            return Response(status=status.HTTP_404_NOT_FOUND)
        book.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
```

#### Step 4: Creating the URLs

Define the URL patterns for the API in `myapp/urls.py`:

```python
from django.urls import path
from .views import BookListCreate, BookDetail

urlpatterns = [
    path('books/', BookListCreate.as_view(), name='book-list-create'),
    path('books/<int:pk>/', BookDetail.as_view(), name='book-detail'),
]
```

Include these URLs in the main project’s `urls.py`:

```python
from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('myapp.urls')),
]
```


### Testing the API

1. **List Books**:
    ```bash
    curl http://127.0.0.1:8000/api/books/
    ```

2. **Create a Book**:
    ```bash
    curl -X POST http://127.0.0.1:8000/api/books/ -H "Content-Type: application/json" -d '{"title": "The Great Gatsby", "author": "F. Scott Fitzgerald", "published_date": "1925-04-10", "isbn": "9780743273565"}'
    ```

3. **Retrieve a Book**:
    ```bash
    curl http://127.0.0.1:8000/api/books/1/
    ```

4. **Update a Book**:
    ```bash
    curl -X PUT http://127.0.0.1:8000/api/books/1/ -H "Content-Type: application/json" -d '{"title": "The Great Gatsby", "author": "F. Scott Fitzgerald", "published_date": "1925-04-10", "isbn": "9780743273565"}'
    ```

5. **Delete a Book**:
    ```bash
    curl -X DELETE http://127.0.0.1:8000/api/books/1/
    ```

# Simple Project: Todo App

### Step 1: Set Up the Environment

1. **Install Django and Django REST Framework**:

   ```sh
   pip install django djangorestframework
   ```

2. **Start a New Django Project**:

   ```sh
   django-admin startproject todo_project
   cd todo_project
   ```

3. **Create a New Django App**:

   ```sh
   python manage.py startapp todos
   ```

4. **Add the App and DRF to `INSTALLED_APPS` in `settings.py`**:
   ```python
   INSTALLED_APPS = [
       ...
       'rest_framework',
       'todos',
   ]
   ```

### Step 2: Create the Todo Model

1. **Define the `Todo` Model in `todos/models.py`**:

   ```python
   from django.db import models

   class Todo(models.Model):
       title = models.CharField(max_length=100)
       description = models.TextField()
       completed = models.BooleanField(default=False)

       def __str__(self):
           return self.title
   ```

2. **Run Migrations**:
   ```sh
   python manage.py makemigrations
   python manage.py migrate
   ```

### Step 3: Create Serializers

1. **Create a Serializer for the `Todo` Model in `todos/serializers.py`**:

   ```python
   from rest_framework import serializers
   from .models import Todo

   class TodoSerializer(serializers.ModelSerializer):
       class Meta:
           model = Todo
           fields = '__all__'
   ```

### Step 4: Create Views

1. **Create API Views in `todos/views.py`**:

   ```python
   from rest_framework import generics
   from .models import Todo
   from .serializers import TodoSerializer

   class TodoListCreate(generics.ListCreateAPIView):
       queryset = Todo.objects.all()
       serializer_class = TodoSerializer

   class TodoRetrieveUpdateDestroy(generics.RetrieveUpdateDestroyAPIView):
       queryset = Todo.objects.all()
       serializer_class = TodoSerializer
   ```

### Step 5: Set Up URLs

1. **Add URLs in `todos/urls.py`**:

   ```python
   from django.urls import path
   from .views import TodoListCreate, TodoRetrieveUpdateDestroy

   urlpatterns = [
       path('todos/', TodoListCreate.as_view(), name='todo-list-create'),
       path('todos/<int:pk>/', TodoRetrieveUpdateDestroy.as_view(), name='todo-retrieve-update-destroy'),
   ]
   ```

2. **Include the App URLs in `todo_project/urls.py`**:

   ```python
   from django.contrib import admin
   from django.urls import path, include

   urlpatterns = [
       path('admin/', admin.site.urls),
       path('api/', include('todos.urls')),
   ]
   ```

### Step 6: Run the Development Server

1. **Run the Server**:

   ```sh
   python manage.py runserver
   ```

2. **Test the API Endpoints**:
   - **List and Create Todos**: `http://127.0.0.1:8000/api/todos/`
   - **Retrieve, Update, and Delete a Todo**: `http://127.0.0.1:8000/api/todos/<id>/`

### Step 7: Testing the API

You can use tools like Postman or cURL to test the API endpoints.

- **List Todos**:

  ```sh
  curl -X GET http://127.0.0.1:8000/api/todos/
  ```

- **Create a Todo**:

  ```sh
  curl -X POST -H "Content-Type: application/json" -d '{"title": "New Todo", "description": "Todo description", "completed": false}' http://127.0.0.1:8000/api/todos/
  ```

- **Retrieve a Todo**:

  ```sh
  curl -X GET http://127.0.0.1:8000/api/todos/1/
  ```

- **Update a Todo**:

  ```sh
  curl -X PUT -H "Content-Type: application/json" -d '{"title": "Updated Todo", "description": "Updated description", "completed": true}' http://127.0.0.1:8000/api/todos/1/
  ```

- **Delete a Todo**:
  ```sh
  curl -X DELETE http://127.0.0.1:8000/api/todos/1/
  ```

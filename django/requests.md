### Requests

### 1. Accessing Query Parameters
Query parameters are typically used to filter or modify the results of a GET request. You can access them using `request.query_params`.

```python
from rest_framework.views import APIView
from rest_framework.response import Response

class ExampleView(APIView):
    def get(self, request):
        param_value = request.query_params.get('param_name', 'default_value')
        return Response({'param_value': param_value})
```

### 2. Accessing Request Data
Request data is used for POST, PUT, PATCH, and DELETE requests. You can access it using `request.data`.

```python
from rest_framework.views import APIView
from rest_framework.response import Response

class ExampleView(APIView):
    def post(self, request):
        data_value = request.data.get('data_key', 'default_value')
        return Response({'data_value': data_value})
```

### 3. Accessing Headers
You can access the headers of the request using `request.headers`.

```python
from rest_framework.views import APIView
from rest_framework.response import Response

class ExampleView(APIView):
    def get(self, request):
        user_agent = request.headers.get('User-Agent', 'default_value')
        return Response({'User-Agent': user_agent})
```

### 4. Accessing Path Parameters
Path parameters are typically captured using URL patterns. You can access them using `request.parser_context`.

```python
from rest_framework.views import APIView
from rest_framework.response import Response

class ExampleView(APIView):
    def get(self, request, *args, **kwargs):
        path_param = kwargs.get('path_param', 'default_value')
        return Response({'path_param': path_param})
```

### 5. Accessing Files
You can access uploaded files using `request.FILES`.

```python
from rest_framework.views import APIView
from rest_framework.response import Response

class FileUploadView(APIView):
    def post(self, request):
        uploaded_file = request.FILES.get('file', None)
        if uploaded_file:
            # Handle the uploaded file
            return Response({'file_name': uploaded_file.name})
        return Response({'error': 'No file uploaded'}, status=400)
```
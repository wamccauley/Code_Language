### Responses

#### Response Class

The `Response` class is a subclass of Django's standard `HttpResponse`. It simplifies returning JSON responses by handling content negotiation and rendering the data into the requested content type.

**Basic Usage:**

```python
from rest_framework.response import Response
from rest_framework.decorators import api_view

@api_view(['GET'])
def example_view(request):
    data = {'message': 'Hello, world!'}
    return Response(data)
```

**Attributes:**

- **data**: The data to be returned in the response. This can be any serializable object.
- **status**: The HTTP status code for the response. Defaults to `200 OK`.
- **headers**: Additional HTTP headers to include in the response.

**Status Codes:**

You can set the status code using the `status` attribute:

```python
from rest_framework import status

@api_view(['GET'])
def example_view(request):
    data = {'message': 'Hello, world!'}
    return Response(data, status=status.HTTP_200_OK)
```

#### Rendering the Response

DRF handles content negotiation, which means it can return responses in various formats based on the client's request. By default, it supports JSON, but you can add other renderers like YAML or XML.

**Example with JSON:**

```python
from rest_framework.renderers import JSONRenderer

@api_view(['GET'])
def example_view(request):
    data = {'message': 'Hello, world!'}
    response = Response(data)
    response.accepted_renderer = JSONRenderer()
    response.accepted_media_type = 'application/json'
    return response
```

#### Adding Headers

You can add custom headers to the response:

```python
@api_view(['GET'])
def example_view(request):
    data = {'message': 'Hello, world!'}
    response = Response(data)
    response['X-Custom-Header'] = 'CustomValue'
    return response
```

#### Working with Templates

You can return HTML responses using Django templates:

```python
from django.shortcuts import render

@api_view(['GET'])
def example_view(request):
    data = {'message': 'Hello, world!'}
    return render(request, 'template.html', data)
```

#### Non-200 Status Codes

To handle various HTTP status codes:

```python
from rest_framework import status

@api_view(['POST'])
def example_view(request):
    if not request.data.get('key'):
        return Response({'error': 'Bad Request'}, status=status.HTTP_400_BAD_REQUEST)
    data = {'message': 'Success'}
    return Response(data, status=status.HTTP_201_CREATED)
```

#### Redirecting Responses

You can redirect responses using Django’s `HttpResponseRedirect`:

```python
from django.http import HttpResponseRedirect

@api_view(['GET'])
def example_view(request):
    return HttpResponseRedirect('/some-path/')
```

#### Streaming Responses

For large responses, use `StreamingHttpResponse`:

```python
from django.http import StreamingHttpResponse

def generator():
    yield 'Part 1'
    yield 'Part 2'

@api_view(['GET'])
def example_view(request):
    return StreamingHttpResponse(generator())
```

#### File Responses

To serve files:

```python
from django.http import FileResponse

@api_view(['GET'])
def example_view(request):
    file = open('example.txt', 'rb')
    return FileResponse(file)
```

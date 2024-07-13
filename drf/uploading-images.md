## Image Uploading

### Step-by-Step Guide

1. **Setting Up the Serializer**:

   ```python
   from rest_framework import serializers

   class ImageUploadSerializer(serializers.Serializer):
       thumbnail = serializers.ImageField()
   ```

2. **Creating the View**:
   In the view, handle the file upload and save it to the desired location.

   ```python
   from django.conf import settings
   from django.utils.crypto import get_random_string
   from rest_framework.views import APIView
   from rest_framework.response import Response
   from rest_framework.parsers import MultiPartParser, FormParser
   from .serializers import ImageUploadSerializer
   import os

   class ImageUploadView(APIView):
       parser_classes = (MultiPartParser, FormParser)

       def post(self, request, *args, **kwargs):
           serializer = ImageUploadSerializer(data=request.data)
           if serializer.is_valid():
               thumbnail = request.FILES.get('thumbnail')

               if thumbnail:
                   # Generate a unique filename
                   unique_filename = get_random_string(length=10)
                   file_name = f"{unique_filename}_{thumbnail.name}"
                   relative_path = os.path.join('public_html', 'media', 'notifications', file_name)
                   file_path = os.path.join(settings.BASE_DIR, relative_path)

                   # Save the file
                   with open(file_path, 'wb+') as destination:
                       for chunk in thumbnail.chunks():
                           destination.write(chunk)

                   image_url = f"https://domain.com/media/notifications/{file_name}"
                   return Response({"image_url": image_url}, status=200)

           return Response(serializer.errors, status=400)
   ```

3. **Configuring URLs**:
   Add the view to your `urls.py`.

   ```python
   from django.urls import path
   from .views import ImageUploadView

   urlpatterns = [
       path('upload/', ImageUploadView.as_view(), name='image-upload'),
   ]
   ```

4. **Settings**:
   Ensure that you have the `MEDIA_URL` and `MEDIA_ROOT` properly set in your `settings.py`.

   ```python
   MEDIA_URL = '/media/'
   MEDIA_ROOT = os.path.join(BASE_DIR, 'media')
   ```

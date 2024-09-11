### Create a Serializer

```python
from rest_framework import serializers

class UserSerializer(serializers.Serializer):
    username = serializers.CharField(max_length=100)
    email = serializers.EmailField()

    def validate_email(self, value):
        """
        Check if the email domain is valid.
        Raise a ValidationError if the email domain is invalid.
        """
        if not value.endswith('@example.com'):
            raise serializers.ValidationError("Only @example.com emails are allowed.")
        return value
```

### Create a View

```python
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .serializers import UserSerializer

class CreateUserView(APIView):

    def post(self, request):
        serializer = UserSerializer(data=request.data)

        if serializer.is_valid():
            # If valid, you can save or do other actions here
            return Response({"message": "User created successfully!"}, status=status.HTTP_201_CREATED)

        # If not valid, raise the validation error as a response
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
```

### Test the Endpoint

1. **Valid Request:**

   - Payload:
     ```json
     {
       "username": "john",
       "email": "john@example.com"
     }
     ```
   - Response:
     ```json
     {
       "message": "User created successfully!"
     }
     ```

2. **Invalid Request:**
   - Payload:
     ```json
     {
       "username": "john",
       "email": "john@gmail.com"
     }
     ```
   - Response:
     ```json
     {
       "email": ["Only @example.com emails are allowed."]
     }
     ```

### Custom Errors

**Custom errors** allow you to define your own error types by inheriting from the base `Exception` class.

#### Basic Example

```python
class CustomError(Exception):
    pass

def example_function(x):
    if x < 0:
        raise CustomError("Negative value error")

try:
    example_function(-1)
except CustomError as e:
    print(e)  # Output: Negative value error
```

#### Advanced Example: Adding Attributes

```python
class CustomError(Exception):
    def __init__(self, message, code):
        super().__init__(message)
        self.code = code

try:
    raise CustomError("An error occurred", 404)
except CustomError as e:
    print(f"Error: {e}, Code: {e.code}")  # Output: Error: An error occurred, Code: 404
```

#### Using Custom Errors in a Context

```python
class NegativeValueError(Exception):
    pass

def factorial(n):
    if n < 0:
        raise NegativeValueError("Negative values are not allowed")
    if n == 0:
        return 1
    return n * factorial(n - 1)

try:
    print(factorial(-5))
except NegativeValueError as e:
    print(e)  # Output: Negative values are not allowed
```

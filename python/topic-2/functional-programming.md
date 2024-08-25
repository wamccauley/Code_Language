### Functional programming

Functional programming is a paradigm in programming where functions are treated as first-class citizens. This means functions can be passed around as arguments to other functions, returned as values from other functions, and assigned to variables. Python supports functional programming features such as lambda functions, higher-order functions, and provides utilities in the `functools` module to enhance functional programming capabilities.

### Lambda Functions

Lambda functions, also known as anonymous functions, are one-line functions defined using the `lambda` keyword. They are typically used for simple operations where defining a full function using `def` would be overkill.

#### Example: Lambda Function

```python
# Regular function
def square(x):
    return x ** 2

# Equivalent lambda function
square_lambda = lambda x: x ** 2

# Usage
print(square(5))        # Output: 25
print(square_lambda(5)) # Output: 25
```

Lambda functions are often used in scenarios where a function is needed temporarily or as an argument to higher-order functions.

### Higher-Order Functions

Higher-order functions are functions that take other functions as arguments or return functions as results. They enable functional programming paradigms such as map, filter, reduce, and more complex operations like function composition.

#### Example: Higher-Order Function (Map)

```python
# Map example: Applying a function to each element in a list
numbers = [1, 2, 3, 4, 5]
squared = list(map(lambda x: x ** 2, numbers))
print(squared)  # Output: [1, 4, 9, 16, 25]
```

In the above example:

- `map()` takes a function (`lambda x: x ** 2`) and an iterable (`numbers`).
- It applies the function to each element in the iterable and returns a new iterable with the results.

### functools Module

The `functools` module in Python provides higher-order functions for functional programming, along with utilities to manipulate functions and decorators. Two important functions in `functools` are `wraps` and `partial`.

#### functools.wraps

The `wraps` function is a decorator used to update the attributes of a wrapper function to look like the attributes of the original function. This is useful for preserving metadata (e.g., docstring, name) of the original function when creating decorators.

#### Example: Using `wraps`

```python
from functools import wraps

def decorator(func):
    @wraps(func)
    def wrapper(*args, **kwargs):
        print(f"Calling {func.__name__}")
        return func(*args, **kwargs)
    return wrapper

@decorator
def greet(name):
    """Greet someone."""
    return f"Hello, {name}!"

# Usage
print(greet("Alice"))  # Output: Calling greet \n Hello, Alice!
print(greet.__name__)  # Output: greet
print(greet.__doc__)   # Output: Greet someone.
```

In this example, `wraps` ensures that the decorated function `wrapper` retains the metadata (name and docstring) of the original function `greet`.

#### functools.partial

The `partial` function allows you to fix a certain number of arguments of a function and generate a new function with fewer arguments than the original. It's useful for creating specialized functions from more general ones.

#### Example: Using `partial`

```python
from functools import partial

# Original function
def power(base, exponent):
    return base ** exponent

# Create a specialized function using partial
square = partial(power, exponent=2)

# Usage
print(square(5))  # Output: 25 (equivalent to power(5, 2))
```

Here, `partial` fixes the `exponent` argument of the `power` function, creating a new function `square` that squares its argument.

### Benefits of Functional Programming in Python

- **Modularity**: Encourages writing modular and reusable code through small, composable functions.
- **Readability**: Emphasizes clear, brief expressions of logic.
- **Concurrency**: Supports concurrent and parallel programming paradigms effectively, especially with tools like `map`, `filter`, and `reduce`.

## Decorators

Decorators in Python are a powerful feature used to modify or extend functions or methods without changing their source code directly. They are functions themselves that take another function as an argument, add some functionality, and then return another function. Decorators allow you to wrap another function to modify its behavior.

#### Basics of Decorators

1. **Function Basics**: In Python, functions are first-class citizens, which means they can be passed around and used as arguments just like any other object (e.g., integers, strings).

2. **Syntax**: Decorators use the `@decorator_name` syntax above the function definition. It's a cleaner and more readable way to apply decorators compared to the traditional way of using `function_name = decorator_name(function_name)`.

3. **Purpose**: Common uses of decorators include logging, timing functions, access control, and memoization (caching results for performance).

#### Creating a Decorator to Measure Function Execution Time

Let's create a custom decorator to measure the execution time of a function using Python's `time` module:

```python
import time

def measure_time(func):
    def wrapper(*args, **kwargs):
        start_time = time.time()
        result = func(*args, **kwargs)
        end_time = time.time()
        print(f"Execution of '{func.__name__}' took {end_time - start_time} seconds")
        return result
    return wrapper
```

#### Explanation:

- **Outer Function (`measure_time`)**:

  - Accepts a function (`func`) as an argument.
  - Defines an inner function (`wrapper`) that:
    - Starts a timer (`start_time`) before calling `func`.
    - Calls `func` with its arguments (`*args`, `**kwargs`) and captures the result.
    - Stops the timer (`end_time`) after `func` completes.
    - Calculates and prints the elapsed time.
    - Returns the result of `func`.

- **Inner Function (`wrapper`)**:

  - Executes the wrapped function (`func`) and calculates the time it takes to execute.

- **Returning `wrapper`**:
  - Returns the `wrapper` function, which replaces the original function when used as a decorator.

#### Example Usage:

```python
@measure_time
def some_function():
    time.sleep(2)  # Simulate some work
    print("Function executed")

some_function()
```

#### Output:

```
Function executed
Execution of 'some_function' took 2.0006470680236816 seconds
```

#### Notes:

- **Arguments and Return Values**: The `wrapper` function uses `*args` and `**kwargs` to accept any number of positional and keyword arguments that `func` might take.
- **Decorating Functions with Parameters**: If the decorated function (`func`) takes parameters, the decorator (`measure_time`) should handle them correctly within `wrapper`.

- **Preserving Function Metadata**: To preserve metadata (like `__name__`, `__doc__`, etc.) of the original function, you can use `functools.wraps` from the `functools` module:

  ```python
  from functools import wraps

  def measure_time(func):
      @wraps(func)
      def wrapper(*args, **kwargs):
          # Implementation remains the same
          pass
      return wrapper
  ```

# Topic 2: Advanced Concepts

### Using `*args` (Arbitrary Arguments)

The `*args` parameter in a function allows you to pass a variable number of positional arguments. Inside the function, `args` will be a tuple containing all the positional arguments passed to the function.

```python
def sum_all(*args):
    total = 0
    for num in args:
        total += num
    return total

# Example usage
print(sum_all(1, 2, 3))  # Output: 6
print(sum_all(10, 20, 30, 40))  # Output: 100
```

In this example:

- `sum_all` accepts any number of arguments (`*args`).
- Inside the function, `args` becomes a tuple (`(1, 2, 3)` or `(10, 20, 30, 40)`).
- It iterates through `args` and calculates the sum.

### Using `**kwargs` (Arbitrary Keyword Arguments)

The `**kwargs` parameter allows you to pass a variable number of keyword arguments to a function. Inside the function, `kwargs` is a dictionary containing the keyword arguments passed to the function, where keys are the argument names and values are their corresponding values.

```python
def display_info(**kwargs):
    for key, value in kwargs.items():
        print(f"{key}: {value}")

# Example usage
display_info(name="Alice", age=30, city="New York")
```

In this example:

- `display_info` accepts any number of keyword arguments (`**kwargs`).
- Inside the function, `kwargs` is a dictionary (`{"name": "Alice", "age": 30, "city": "New York"}`).
- It iterates through `kwargs` and prints each key-value pair.

### Using `*args` and `**kwargs` Together

You can use `*args` and `**kwargs` together in a function to handle both positional and keyword arguments simultaneously.

```python
def process_data(*args, **kwargs):
    print("Positional arguments (*args):")
    for arg in args:
        print(arg)

    print("\nKeyword arguments (**kwargs):")
    for key, value in kwargs.items():
        print(f"{key}: {value}")

# Example usage
process_data(1, 2, 3, name="Alice", age=30, city="New York")
```

In this example:

- `process_data` accepts both positional arguments (`*args`) and keyword arguments (`**kwargs`).
- It prints the positional arguments and then the keyword arguments.

### Using `*args` and `**kwargs` in Decorators

Decorators often use `*args` and `**kwargs` to wrap and modify functions without knowing the specific arguments of the function being decorated.

```python
def log_arguments(func):
    def wrapper(*args, **kwargs):
        print(f"Arguments passed to {func.__name__}:")
        if args:
            print("Positional arguments:")
            for arg in args:
                print(arg)

        if kwargs:
            print("Keyword arguments:")
            for key, value in kwargs.items():
                print(f"{key}: {value}")

        return func(*args, **kwargs)

    return wrapper

# Example usage of decorator with *args and **kwargs
@log_arguments
def calculate_total(*args, discount_rate=0, **kwargs):
    total = sum(args)
    for key, value in kwargs.items():
        if key.startswith('extra_'):
            total += value
    return total - (total * discount_rate)

# Example call
print(calculate_total(100, 50, 75, discount_rate=0.1, extra_shipping=10, extra_handling=5))
```

In this decorator example:

- `log_arguments` decorates `calculate_total`.
- `wrapper` in `log_arguments` prints all positional and keyword arguments passed to `calculate_total`.
- `calculate_total` computes a total based on positional arguments and keyword arguments (`discount_rate` and any `extra_*` kwargs).

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

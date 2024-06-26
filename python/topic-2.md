# Topic 2: Advanced Concepts

## Iterators

Iterators are objects that implement the iterator protocol, consisting of two methods:

1. **`__iter__()`**: Returns the iterator object itself.
2. **`__next__()`**: Returns the next item in the sequence. When no more items are available, it raises the `StopIteration` exception.

In Python, any object that implements these methods can be used as an iterator. Iterators are used in `for` loops, comprehensions, and other contexts where sequential or lazy evaluation is required.

Example of a simple iterator:

```python
class Counter:
    def __init__(self, start, end):
        self.current = start
        self.end = end

    def __iter__(self):
        return self

    def __next__(self):
        if self.current > self.end:
            raise StopIteration
        else:
            self.current += 1
            return self.current - 1

# Usage:
counter = Counter(1, 5)
for num in counter:
    print(num)
```

## Generators

Generators are a type of iterable, but unlike regular classes implementing the iterator protocol, generators use the `yield` statement to produce a series of values lazily. This means they generate values only when requested and maintain their state between calls.

Key characteristics of generators:

- **Lazy evaluation**: Values are generated on-the-fly when `next()` is called.
- **Memory efficiency**: They do not store all values in memory simultaneously.
- **Simplicity**: Easier to write and understand compared to custom iterator classes.

#### Types of Generators

1. **Generator Functions**: Defined using the `def` keyword with `yield` statements inside the function body.

Example of a generator function:

```python
def square_numbers(n):
    for i in range(n):
        yield i ** 2

# Usage:
gen = square_numbers(5)
for num in gen:
    print(num)
```

2. **Generator Expressions**: Similar to list comprehensions but using round brackets `()` instead of square brackets `[]`.

Example of a generator expression:

```python
gen_exp = (x ** 2 for x in range(5))
for num in gen_exp:
    print(num)
```

#### Advantages of Generators

- **Efficient memory usage**: Ideal for processing large datasets or infinite sequences.
- **Simplified code**: Eliminates the boilerplate of iterator classes.
- **Supports pipelines**: Generators can be chained together for data processing.

### Advanced Concepts

- **`send()` Method**: Allows sending data into a generator.
- **`throw()` Method**: Raises an exception at a specific point in the generator.
- **`close()` Method**: Terminates the generator.

#### Example of using `send()`:

```python
def accumulator():
    total = 0
    while True:
        value = yield total
        if value is None:
            break
        total += value

acc = accumulator()
next(acc)  # Prime the generator
print(acc.send(1))  # Output: 1
print(acc.send(2))  # Output: 3
acc.close()
```

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

## Basics of Context Managers

Context managers in Python provide a convenient way to manage resources, such as files or database connections, ensuring they are properly initialized and cleaned up. They are used extensively with the `with` statement and are implemented using special methods `__enter__()` and `__exit__()`.

A context manager is any object that implements the context management protocol:

1. **`__enter__()`**: Prepares the context and returns the resource to be managed. It is called when entering the `with` block.
2. **`__exit__(exc_type, exc_val, exc_tb)`**: Cleans up resources after the `with` block exits, even if an exception occurs. It is called upon exiting the `with` block.

#### Example of a Context Manager for File Handling:

```python
class FileContextManager:
    def __init__(self, filename, mode):
        self.filename = filename
        self.mode = mode

    def __enter__(self):
        self.file = open(self.filename, self.mode)
        return self.file

    def __exit__(self, exc_type, exc_val, exc_tb):
        self.file.close()

# Usage:
filename = 'example.txt'
with FileContextManager(filename, 'w') as file:
    file.write('Hello, context managers!')
```

### Advanced Patterns with Context Managers

#### Nested Context Managers

Context managers can be nested within each other to manage multiple resources simultaneously. This is useful when dealing with dependencies or complex setups.

```python
class NestedContextManager:
    def __enter__(self):
        print("Entering outer context")
        return self

    def __exit__(self, exc_type, exc_val, exc_tb):
        print("Exiting outer context")

class InnerContextManager:
    def __enter__(self):
        print("Entering inner context")
        return self

    def __exit__(self, exc_type, exc_val, exc_tb):
        print("Exiting inner context")

# Usage:
with NestedContextManager():
    with InnerContextManager():
        print("Inside inner context")
    print("Outside inner context")
print("Outside outer context")
```

#### Contextlib Module

The `contextlib` module provides utilities for creating and working with context managers. It includes decorators (`@contextmanager`) and helper functions (`closing()`, `redirect_stdout()`, etc.) to simplify context manager creation.

Example using `contextlib.contextmanager`:

```python
from contextlib import contextmanager

@contextmanager
def timer(label):
    import time
    start = time.time()
    try:
        yield
    finally:
        end = time.time()
        print(f"{label}: {end - start} seconds")

# Usage:
with timer("Execution time"):
    # Code block to measure time
    import time
    time.sleep(2)
```

#### Async Context Managers (Python 3.7+)

For managing asynchronous resources or operations, Python introduced async context managers, which use `async def` and `async with` syntax.

```python
class AsyncResource:
    async def __aenter__(self):
        # Async setup code
        return self

    async def __aexit__(self, exc_type, exc_val, exc_tb):
        # Async cleanup code
        pass

# Usage:
async def use_async_resource():
    async with AsyncResource() as resource:
        # Async code using the resource

# Call async function
await use_async_resource()
```

### Benefits of Context Managers

- **Resource management**: Ensures resources are properly initialized and released.
- **Error handling**: Automatic cleanup, even if exceptions occur.
- **Readability**: Improves code readability by encapsulating setup and teardown logic.

## Basics of Metaclasses

Metaclasses a way to customize the creation and behavior of classes. They are often used when you need to apply common logic or transformations to multiple classes, enforce design patterns, or automate repetitive tasks during class creation.

1. **Class as an Instance of Metaclass**:

   - In Python, classes themselves are instances of metaclasses. By default, most classes are instances of the `type` metaclass.

2. **Metaclass Definition**:
   - A metaclass is a class of a class. It defines how classes behave, just as classes define how instances (objects) behave.
   - To define a custom metaclass, you typically inherit from `type`.

#### Example: Creating a Simple Metaclass

```python
class MyMeta(type):
    def __new__(cls, name, bases, dct):
        # Custom logic before class creation
        cls_obj = super().__new__(cls, name, bases, dct)
        # Custom logic after class creation
        return cls_obj

# Usage:
class MyClass(metaclass=MyMeta):
    pass
```

### Advanced Patterns with Metaclasses

#### Customizing Class Creation

- **`__new__()` vs. `__init__()`**:
  - `__new__()` is called before the class is created, and it returns the newly created class object.
  - `__init__()` initializes the created class object, similar to instance initialization.

#### Example: Adding Methods Dynamically

```python
class MyMeta(type):
    def __new__(cls, name, bases, dct):
        # Add a new method to the class dynamically
        dct['custom_method'] = lambda self: print("Custom method added")
        cls_obj = super().__new__(cls, name, bases, dct)
        return cls_obj

# Usage:
class MyClass(metaclass=MyMeta):
    pass

obj = MyClass()
obj.custom_method()  # Output: Custom method added
```

#### Singleton Pattern Using Metaclasses

Metaclasses can enforce design patterns, such as the singleton pattern (ensuring only one instance of a class exists).

```python
class SingletonMeta(type):
    _instances = {}

    def __call__(cls, *args, **kwargs):
        if cls not in cls._instances:
            cls._instances[cls] = super().__call__(*args, **kwargs)
        return cls._instances[cls]

# Usage:
class SingletonClass(metaclass=SingletonMeta):
    pass

instance1 = SingletonClass()
instance2 = SingletonClass()

print(instance1 is instance2)  # Output: True
```

#### Use Cases for Metaclasses

- **Framework Integration**: Automatically register classes, methods, or attributes.
- **Validation and Verification**: Enforce rules or constraints on class definitions.
- **API Design**: Standardize interfaces or protocols across multiple classes.

### Benefits of Metaclasses

- **Code Reuse**: Centralize common class behavior or modifications.
- **Encapsulation**: Separate concerns related to class creation and behavior.
- **Customization**: Flexibility to tailor class creation to specific needs without modifying individual classes.

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

### Basic Operations

#### Arithmetic Operations

- Addition: `+`
- Subtraction: `-`
- Multiplication: `*`
- Division: `/`
- Floor Division: `//`
- Modulus: `%`
- Exponentiation: `**`

```python
a = 10
b = 3

print(a + b)  # 13
print(a - b)  # 7
print(a * b)  # 30
print(a / b)  # 3.3333333333333335
print(a // b) # 3
print(a % b)  # 1
print(a ** b) # 1000
```

#### Comparison Operators

- Equal: `==`
- Not equal: `!=`
- Greater than: `>`
- Less than: `<`
- Greater than or equal to: `>=`
- Less than or equal to: `<=`

```python
a = 10
b = 20

print(a == b)  # False
print(a != b)  # True
print(a > b)   # False
print(a < b)   # True
print(a >= b)  # False
print(a <= b)  # True
```

#### Logical Operators

- and: `and`
- or: `or`
- not: `not`

```python
x = True
y = False

print(x and y)  # False
print(x or y)   # True
print(not x)    # False
```

#### Assignment Operators

- Assign: `=`
- Add and assign: `+=`
- Subtract and assign: `-=`
- Multiply and assign: `*=`
- Divide and assign: `/=`
- Floor divide and assign: `//=`
- Modulus and assign: `%=`
- Exponent and assign: `**=`

```python
a = 10
a += 5  # a = a + 5
print(a)  # 15
```

#### Variable Scope

- **Local variables** are defined within a function and can only be used there.
- **Global variables** are defined outside any function and can be accessed anywhere.

```python
x = 5  # Global variable

def func():
    y = 10  # Local variable
    global x
    x = 20  # Modify global variable

func()
print(x)  # 20
```

#### Type Hinting

Python supports type hints to specify the expected type of variables.

```python
def greeting(name: str) -> str:
    return "Hello, " + name

name: str = "Alice"
age: int = 30
```

#### F-Strings

Formatted string literals for easy string interpolation.

```python
name = "Alice"
age = 30

print(f"Hello, {name}. You are {age} years old.")
```

#### Lambda Functions

Small anonymous functions.

```python
add = lambda x, y: x + y
print(add(2, 3))  # 5
```

#### Unpacking

Extracting values from collections.

```python
a, b, c = (1, 2, 3)
print(a, b, c)  # 1 2 3

lst = [4, 5, 6]
x, y, z = lst
print(x, y, z)  # 4 5 6
```

gap1

#### Using the `enumerate` function

Enumerate adds a counter to an iterable.

```python
for index, value in enumerate(['a', 'b', 'c']):
    print(index, value)
```

#### Using the `zip` function

Combining iterables.

```python
names = ["Alice", "Bob", "Charlie"]
ages = [25, 30, 35]

for name, age in zip(names, ages):
    print(f"{name} is {age} years old.")
```

#### Using the `map` function

Apply a function to all items in an input list.

```python
nums = [1, 2, 3, 4, 5]
squares = list(map(lambda x: x**2, nums))
print(squares)  # [1, 4, 9, 16, 25]
```

#### Using the `filter` function

Filter items out of a list.

```python
nums = [1, 2, 3, 4, 5]
even_nums = list(filter(lambda x: x % 2 == 0, nums))
print(even_nums)  # [2, 4]
```

#### Using the `reduce` function

Apply a function of two arguments cumulatively.

```python
from functools import reduce

nums = [1, 2, 3, 4, 5]
product = reduce(lambda x, y: x * y, nums)
print(product)  # 120
```

gap1end

#### Ternary Conditional Operator

```python
x = 10
result = "Greater than 5" if x > 5 else "5 or less"
print(result)
```

#### Custom Increments

```python
x = 5
increment = 3
x += increment
print(x)  # 8
```

#### Using `any()` and `all()`

- **`any()`**: Returns `True` if any element in an iterable is `True`.

  ```python
  conditions = [False, True, False]
  if any(conditions):
      print("At least one condition is true")
  ```

- **`all()`**: Returns `True` if all elements in an iterable are `True`.

  ```python
  conditions = [True, True, True]
  if all(conditions):
      print("All conditions are true")
  ```

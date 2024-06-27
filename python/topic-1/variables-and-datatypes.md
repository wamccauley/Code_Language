### Variables in Python

```python
x = 5
y = "Hello, World!"
```

#### Variable Naming Rules

- Must start with a letter or an underscore
- Cannot start with a number
- Can only contain alphanumeric characters and underscores
- Case-sensitive

```python
my_var = 10
_my_var = 20
MY_VAR = 30
myVar2 = 40
```

#### Dynamic Typing

Python is dynamically typed, meaning you don't need to declare the type of a variable. The type is inferred from the value.

```python
x = 10      # int
x = "text"  # str
```

### Data Types

Python has several built-in data types:

#### Numeric Types

- **int**: Integer values

  ```python
  x = 10
  ```

- **float**: Floating-point values

  ```python
  y = 10.5
  ```

- **complex**: Complex numbers

  ```python
  z = 1 + 2j
  ```

#### Sequence Types

- **str**: String

  ```python
  name = "Alice"
  ```

- **list**: Ordered, mutable collection

  ```python
  my_list = [1, 2, 3]
  ```

- **tuple**: Ordered, immutable collection

  ```python
  my_tuple = (1, 2, 3)
  ```

#### Mapping Type

- **dict**: Key-value pairs

  ```python
  my_dict = {"name": "Alice", "age": 25}
  ```

#### Set Types

- **set**: Unordered, unique collection

  ```python
  my_set = {1, 2, 3}
  ```

- **frozenset**: Immutable set

  ```python
  my_frozenset = frozenset([1, 2, 3])
  ```

#### Boolean Type

- **bool**: True or False

  ```python
  is_active = True
  ```

#### None Type

- **NoneType**: Represents the absence of a value

  ```python
  x = None
  ```

#### Input

- **List Comprehensions**: To read multiple values into a list.

  ```python
  numbers = list(map(int, input("Enter multiple numbers: ").split()))
  print(numbers)
  ```

- **Reading from File**: If the input is from a file, use `open()` and `read()` methods.

  ```python
  with open('input.txt', 'r') as file:
      data = file.read()
  print(data)
  ```

- **Input Validation**:

```python
try:
    age = int(input("Enter your age: "))
except ValueError:
    print("Invalid input. Please enter a number.")
```

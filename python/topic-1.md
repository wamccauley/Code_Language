# Topic 1: Python Basics

### Comments

Use the `#` symbol.

```python
# This is a single-line comment
x = 5  # This is an inline comment
```

Use triple quotes (`'''` or `"""`).

```python
"""
This is a
multi-line comment
"""
x = 5
```

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

gap3lists

## Basic Data Structures and Collections

### Lists

A tuple is an ordered, mutable collection of items.

```python
my_list = [1, 2, 3, 4, 5]

print(my_list[0])  # 1
print(my_list[-1])  # 5
```

#### Slicing

```python
print(my_list[1:3])  # [2, 3]
print(my_list[:2])  # [1, 2]
print(my_list[2:])  # [3, 4, 5]
```

#### Adding Elements

- **append()**: Adds an element to the end.

  ```python
  my_list.append(6)
  ```

- **insert()**: Adds an element at a specific position.

  ```python
  my_list.insert(2, 'a')
  ```

- **extend()**: Adds multiple elements.

  ```python
  my_list.extend([7, 8])
  ```

#### Removing Elements

- **remove()**: Removes the first occurrence of an element.

  ```python
  my_list.remove(2)
  ```

- **pop()**: Removes and returns the element at the given index.

  ```python
  my_list.pop(1)
  ```

- **clear()**: Removes all elements.

  ```python
  my_list.clear()
  ```

#### List Comprehensions

```python
squares = [x**2 for x in range(10)]
```

#### List Techniques

- **Sorting**: Use `sort()` for in-place sorting or `sorted()` to return a new sorted list. **Reverse** is set to True to make the sorting descending.

  ```python
  my_list.sort()
  sorted_list = sorted(my_list, reverse=True)
  ```

- **Filtering**: Using list comprehensions.

  ```python
  even_numbers = [x for x in my_list if x % 2 == 0]
  ```

- **Mapping**: Applying a function to all elements.

  ```python
  squared = list(map(lambda x: x**2, my_list))

  # Another example
  def addition(n):
    return n + n
  result = map(addition, my_list)
  ```

### Tuples

A tuple is an ordered, immutable collection of items.

```python
my_tuple = (1, 2, 3)

print(my_tuple[0])  # 1
print(my_tuple[-1])  # 3
```

#### Tuple Unpacking

Extracting values from a tuple.

```python
a, b, c = my_tuple
```

#### Advanced Tuple Techniques

- **Creating Single-element Tuples**: Add a comma after the element.

  ```python
  single_element_tuple = (1,)
  ```

- **Tuple Comprehensions**: Using `tuple()` and generator expressions.

  ```python
  squared_tuple = tuple(x**2 for x in range(10))
  ```

- **Named Tuples**: Creating more readable tuples using `collections.namedtuple`.

  ```python
  from collections import namedtuple
  Point = namedtuple('Point', ['x', 'y'])
  p = Point(1, 2)
  print(p.x, p.y)  # 1 2
  ```

### Sets

A set is an unordered, mutable collection of **unique** elements.

```python
my_set = {1, 2, 3}
```

- **add()**: Adds an element.

  ```python
  my_set.add(4)
  ```

- **update()**: Adds multiple elements.

  ```python
  my_set.update([5, 6])
  ```

#### Removing Elements

- **remove()**: Removes an element (raises an error if not found).

  ```python
  my_set.remove(2)
  ```

- **discard()**: Removes an element (doesn't raise an error if not found).

  ```python
  my_set.discard(2)
  ```

- **pop()**: Removes and returns an arbitrary element.

  ```python
  my_set.pop()
  ```

- **clear()**: Removes all elements.

  ```python
  my_set.clear()
  ```

#### Set Operations

- **Union**: Combine sets.

  ```python
  set1 = {1, 2, 3}
  set2 = {3, 4, 5}
  union_set = set1 | set2  # {1, 2, 3, 4, 5}
  ```

- **Intersection**: Elements common to both sets.

  ```python
  intersection_set = set1 & set2  # {3}
  ```

- **Difference**: Elements in one set but not the other.

  ```python
  difference_set = set1 - set2  # {1, 2}
  ```

- **Symmetric Difference**: Elements in either set, but not both.

  ```python
  symmetric_difference_set = set1 ^ set2  # {1, 2, 4, 5}
  ```

#### Advanced Set Techniques

- **Set Comprehensions**: Creating sets with a comprehension.

  ```python
  squared_set = {x**2 for x in range(10)}
  ```

- **Frozen Sets**: Immutable sets.

  ```python
  frozen_set = frozenset([1, 2, 3])
  ```

### Dictionaries

A dictionary is an unordered, mutable collection of key-value pairs.

```python
my_dict = {'name': 'Alice', 'age': 25}
```

#### Accessing Elements

Use keys to access values.

```python
print(my_dict['name'])  # Alice
```

#### Adding/Updating Elements

- **Adding**: Use a new key.

  ```python
  my_dict['address'] = '123 Main St'
  ```

- **Updating**: Use an existing key.

  ```python
  my_dict['age'] = 26
  ```

#### Removing Elements

- **pop()**: Removes and returns an element by key.

  ```python
  age = my_dict.pop('age')
  ```

- **popitem()**: Removes and returns the last key-value pair.

  ```python
  last_item = my_dict.popitem()
  ```

- **del**: Removes an element by key.

  ```python
  del my_dict['name']
  ```

- **clear()**: Removes all elements.

  ```python
  my_dict.clear()
  ```

#### Dictionary Comprehensions

A concise way to create dictionaries.

```python
squares = {x: x**2 for x in range(10)}
```

#### Advanced Dictionary Techniques

- **Iterating**: Using `.items()`, `.keys()`, and `.values()`.

  ```python
  for key, value in my_dict.items():
      print(key, value)
  ```

- **Default Values**: Using `get()` to avoid `KeyError`.

  ```python
  name = my_dict.get('name', 'Unknown')
  ```

- **Merging**: Combining dictionaries.

  ```python
  dict1 = {'a': 1, 'b': 2}
  dict2 = {'b': 3, 'c': 4}
  merged_dict = {**dict1, **dict2}
  ```

- **Default Dictionaries**: Using `collections.defaultdict` for automatic default values.

  ```python
  from collections import defaultdict
  default_dict = defaultdict(int)
  default_dict['a'] += 1
  ```

gap4

### For Loop

```python
my_list = [1, 2, 3, 4, 5]
for item in my_list:
    print(item)

my_string = "Hello"
for char in my_string:
    print(char)
```

#### Iterating Over Dictionaries

- **Keys**:

  ```python
  my_dict = {'a': 1, 'b': 2, 'c': 3}
  for key in my_dict:
      print(key)
  ```

- **Values**:

  ```python
  for value in my_dict.values():
      print(value)
  ```

- **Key-Value Pairs**:
  ```python
  for key, value in my_dict.items():
      print(key, value)
  ```

#### Using `range()`

```python
for i in range(2, 10, 2):
    print(i)  # 2, 4, 6, 8
```

#### For Loop Techniques

- **Using `enumerate()`**: To get both index and value.

  ```python
  for index, value in enumerate(['a', 'b', 'c']):
      print(index, value)
  ```

- **Using `zip()`**: To iterate over multiple sequences in parallel.

  ```python
  names = ["Alice", "Bob", "Charlie"]
  ages = [25, 30, 35]
  for name, age in zip(names, ages):
      print(f"{name} is {age} years old.")
  ```

- **Using `break` and `continue`**: To control the flow of the loop.

  ```python
  for i in range(10):
      if i == 5:
          break  # Exit the loop
      if i % 2 == 0:
          continue  # Skip the rest of the code in this iteration
      print(i)
  ```

### While Loop

```python
i = 0
while i < 5:
    print(i)
    i += 1
```

- **break**: Exit the loop.

  ```python
  i = 0
  while i < 10:
      if i == 5:
          break
      print(i)
      i += 1
  ```

- **continue**: Skip the rest of the code in this iteration.

  ```python
  i = 0
  while i < 10:
      i += 1
      if i % 2 == 0:
          continue
      print(i)
  ```

#### While Loop Techniques

- **Combining with else**: The `else` block after a `while` loop executes when the loop condition becomes false.

  ```python
  i = 0
  while i < 5:
      print(i)
      i += 1
  else:
      print("Loop ended")
  ```

- **Simulating Do-While Loop**: Python doesn't have a do-while loop, but you can simulate it.

  ```python
  while True:
      print("This will execute at least once")
      if not condition:
          break
  ```

### Object-Oriented Programming

#### Basic Concepts

**1. Class and Object**

- **Class**: A blueprint for creating objects. It defines a set of attributes and methods that the created objects will have.
- **Object**: An instance of a class.

**2. Defining a Class**
Use the `class` keyword.

```python
class Dog:
    pass
```

**3. Creating an Object**
Instantiate a class to create an object.

```python
my_dog = Dog()
```

**4. The `__init__` Method**
The initializer method, also known as the constructor. It is called when an object is created.

```python
class Dog:
    def __init__(self, name, age):
        self.name = name
        self.age = age

my_dog = Dog("Buddy", 3)
```

**5. Instance Variables and Methods**

- **Instance Variables**: Attributes unique to each instance.
- **Instance Methods**: Functions defined within a class and designed to operate on instance variables.

```python
class Dog:
    def __init__(self, name, age):
        self.name = name
        self.age = age

    def bark(self):
        return f"{self.name} says woof!"

my_dog = Dog("Buddy", 3)
print(my_dog.bark())  # Output: Buddy says woof!
```

#### Advanced Concepts

**1. Class Variables and Methods**

- **Class Variables**: Shared across all instances of the class.
- **Class Methods**: Operate on class variables. Use `@classmethod` decorator.

```python
class Dog:
    species = "Canis familiaris"

    def __init__(self, name, age):
        self.name = name
        self.age = age

    @classmethod
    def common_species(cls):
        return cls.species

print(Dog.common_species())  # Output: Canis familiaris
```

**2. Static Methods**
Do not operate on instance or class variables. Use `@staticmethod` decorator.

```python
class MathOperations:
    @staticmethod
    def add(x, y):
        return x + y

print(MathOperations.add(5, 3))  # Output: 8
```

**3. Inheritance**
A way to create a new class using details of an existing class without modifying it.

```python
class Animal:
    def __init__(self, name):
        self.name = name

    def speak(self):
        raise NotImplementedError("Subclass must implement speak method")

class Dog(Animal):
    def speak(self):
        return f"{self.name} says woof!"

class Cat(Animal):
    def speak(self):
        return f"{self.name} says meow!"

dog = Dog("Buddy")
cat = Cat("Whiskers")
print(dog.speak())  # Output: Buddy says woof!
print(cat.speak())  # Output: Whiskers says meow!
```

**4. Method Overriding**
Redefining a method in the derived class that was already defined in the base class.

```python
class Animal:
    def speak(self):
        return "Some generic sound"

class Dog(Animal):
    def speak(self):
        return "Woof!"

dog = Dog()
print(dog.speak())  # Output: Woof!
```

**5. Super Function**
Call a method from the parent class.

```python
class Animal:
    def __init__(self, name):
        self.name = name

class Dog(Animal):
    def __init__(self, name, breed):
        super().__init__(name)
        self.breed = breed

dog = Dog("Buddy", "Golden Retriever")
print(dog.name)  # Output: Buddy
print(dog.breed)  # Output: Golden Retriever
```

**6. Encapsulation**
Restricting access to some of an object's components. Use a leading underscore for weak internal use indication.

```python
class Person:
    def __init__(self, name, age):
        self._name = name  # Protected attribute
        self.__age = age   # Private attribute

    def get_age(self):
        return self.__age

person = Person("Alice", 30)
print(person._name)  # Output: Alice
print(person.get_age())  # Output: 30
# print(person.__age)  # AttributeError
```

**7. Polymorphism**
Using a unified interface to represent different underlying forms (data types).

```python
class Animal:
    def speak(self):
        raise NotImplementedError

class Dog(Animal):
    def speak(self):
        return "Woof!"

class Cat(Animal):
    def speak(self):
        return "Meow!"

def animal_sound(animal):
    print(animal.speak())

dog = Dog()
cat = Cat()
animal_sound(dog)  # Output: Woof!
animal_sound(cat)  # Output: Meow!
```

**8. Abstraction**
Using abstract classes and methods to define common interfaces.

```python
from abc import ABC, abstractmethod

class Animal(ABC):
    @abstractmethod
    def speak(self):
        pass

class Dog(Animal):
    def speak(self):
        return "Woof!"

class Cat(Animal):
    def speak(self):
        return "Meow!"

dog = Dog()
cat = Cat()
print(dog.speak())  # Output: Woof!
print(cat.speak())  # Output: Meow!
```

**9. Dunder (Magic) Methods**
Special methods with double underscores used to emulate built-in behavior.

```python
class Vector:
    def __init__(self, x, y):
        self.x = x
        self.y = y

    def __add__(self, other):
        return Vector(self.x + other.x, self.y + other.y)

    def __repr__(self):
        return f"Vector({self.x}, {self.y})"

v1 = Vector(2, 3)
v2 = Vector(4, 5)
print(v1 + v2)  # Output: Vector(6, 8)
```

**10. Property Decorators**
Getters and setters in Python using the `@property` decorator.

```python
class Person:
    def __init__(self, name):
        self._name = name

    @property
    def name(self):
        return self._name

    @name.setter
    def name(self, value):
        if not value:
            raise ValueError("Name cannot be empty")
        self._name = value

person = Person("Alice")
print(person.name)  # Output: Alice
person.name = "Bob"
print(person.name)  # Output: Bob
```

**11. Class Decorators and Metaclasses**
Advanced OOP techniques for altering class behavior.

- **Class Decorators**:

  ```python
  def decorator(cls):
      cls.extra_attribute = "Added by decorator"
      return cls

  @decorator
  class MyClass:
      pass

  print(MyClass.extra_attribute)  # Output: Added by decorator
  ```

- **Metaclasses**:

  ```python
  class Meta(type):
      def __new__(cls, name, bases, dct):
          dct['extra_attribute'] = "Added by metaclass"
          return super().__new__(cls, name, bases, dct)

  class MyClass(metaclass=Meta):
      pass

  print(MyClass.extra_attribute)  # Output: Added by metaclass
  ```

**12. Composition**
Building complex objects by combining simpler ones.

```python
class Engine:
    def start(self):
        return "Engine started"

class Car:
    def __init__(self, engine):
        self.engine = engine

    def start(self):
        return self.engine.start()

engine = Engine()
car = Car(engine)
print(car.start())  # Output: Engine started
```

### Recursion

**Recursion** is a method where a function calls itself in order to solve a problem. Each recursive call should break down the problem into smaller instances until a base case is reached, ensuring termination.

```python
def factorial(n):
    if n == 1:  # Base case
        return 1
    else:
        return n * factorial(n - 1)  # Recursive call

print(factorial(5))  # Output: 120
```

#### Advanced Example: Fibonacci Series

Computing the nth Fibonacci number using recursion:

```python
def fibonacci(n):
    if n <= 0:
        raise ValueError("Fibonacci number is not defined for n <= 0")
    if n == 1 or n == 2:  # Base cases
        return 1
    else:
        return fibonacci(n - 1) + fibonacci(n - 2)  # Recursive calls

print(fibonacci(6))  # Output: 8
```

#### Recursion with Memoization

Optimizing the recursive Fibonacci function using memoization to store previously computed results.

```python
def fibonacci(n, memo={}):
    if n in memo:
        return memo[n]
    if n <= 0:
        raise ValueError("Fibonacci number is not defined for n <= 0")
    if n == 1 or n == 2:
        return 1
    memo[n] = fibonacci(n - 1, memo) + fibonacci(n - 2, memo)
    return memo[n]

print(fibonacci(50))  # Output: 12586269025
```

### Lambda Functions

**Lambda functions** are small anonymous functions defined with the `lambda` keyword. They can have any number of arguments but only one expression.

```python
square = lambda x: x ** 2
print(square(5))  # Output: 25
```

#### Using Lambda with `map()`, `filter()`, and `reduce()`

- **map()**: Apply a function to all items in an input list.

  ```python
  nums = [1, 2, 3, 4, 5]
  squares = list(map(lambda x: x ** 2, nums))
  print(squares)  # Output: [1, 4, 9, 16, 25]
  ```

- **filter()**: Filter items in an input list.

  ```python
  evens = list(filter(lambda x: x % 2 == 0, nums))
  print(evens)  # Output: [2, 4]
  ```

- **reduce()**: Apply a rolling computation to sequential pairs of values in a list.

  ```python
  from functools import reduce
  product = reduce(lambda x, y: x * y, nums)
  print(product)  # Output: 120
  ```

### Regular Expressions

**Regular expressions (regex)** are sequences of characters that form search patterns, primarily used for string matching.

#### Basic Example

```python
import re

pattern = r'\d+'  # Matches one or more digits
string = "The house number is 123 and the zip code is 45678."
matches = re.findall(pattern, string)
print(matches)  # Output: ['123', '45678']
```

#### Advanced Example: Email Validation

```python
pattern = r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$'
email = "example@example.com"
match = re.match(pattern, email)
if match:
    print("Valid email")
else:
    print("Invalid email")
```

#### Using `re` Functions

- **search()**: Search for a pattern in a string.

  ```python
  match = re.search(r'\d+', string)
  if match:
      print(f"First match: {match.group()}")  # Output: First match: 123
  ```

- **sub()**: Replace occurrences of a pattern with a string.

  ```python
  result = re.sub(r'\d+', '#', string)
  print(result)  # Output: The house number is # and the zip code is #.
  ```

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

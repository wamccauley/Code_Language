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

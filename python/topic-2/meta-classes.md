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

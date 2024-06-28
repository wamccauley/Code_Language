### Advanced Python Patterns

#### Singleton Pattern Implementation

The **Singleton pattern** ensures that a class has only one instance and provides a global point of access to it.

- **Implementation using a decorator**:

```python
def singleton(cls):
    instances = {}
    def get_instance():
        if cls not in instances:
            instances[cls] = cls()
        return instances[cls]
    return get_instance

@singleton
class SingletonClass:
    def __init__(self):
        print("Singleton instance created")

# Usage:
instance1 = SingletonClass()  # Output: Singleton instance created
instance2 = SingletonClass()
print(instance1 is instance2)  # Output: True (same instance)
```

- **Using `__new__` method**:

```python
class Singleton:
    _instance = None

    def __new__(cls):
        if not cls._instance:
            cls._instance = super().__new__(cls)
        return cls._instance

    def __init__(self):
        print("Singleton instance created")

# Usage:
instance1 = Singleton()  # Output: Singleton instance created
instance2 = Singleton()
print(instance1 is instance2)  # Output: True (same instance)
```

#### Factory and Abstract Factory Patterns

The **Factory pattern** and **Abstract Factory pattern** are creational patterns that provide interfaces for creating objects without specifying their concrete classes.

- **Factory Pattern**:

```python
class Shape:
    def draw(self):
        pass

class Circle(Shape):
    def draw(self):
        print("Circle.draw")

class Square(Shape):
    def draw(self):
        print("Square.draw")

class ShapeFactory:
    def create_shape(self, shape_type):
        if shape_type == 'circle':
            return Circle()
        elif shape_type == 'square':
            return Square()
        else:
            raise ValueError("Unknown shape type")

# Usage:
factory = ShapeFactory()
circle = factory.create_shape('circle')
circle.draw()  # Output: Circle.draw
```

- **Abstract Factory Pattern**:

```python
class AbstractFactory:
    def create_shape(self):
        pass

class CircleFactory(AbstractFactory):
    def create_shape(self):
        return Circle()

class SquareFactory(AbstractFactory):
    def create_shape(self):
        return Square()

# Usage:
factory = CircleFactory()
circle = factory.create_shape()
circle.draw()  # Output: Circle.draw
```

#### Observer and Strategy Patterns

The **Observer pattern** and **Strategy pattern** are behavioral patterns that define a way to communicate changes and select algorithms at runtime, respectively.

- **Observer Pattern**:

```python
class Observer:
    def update(self, message):
        pass

class Subject:
    def __init__(self):
        self._observers = []

    def add_observer(self, observer):
        self._observers.append(observer)

    def notify_observers(self, message):
        for observer in self._observers:
            observer.update(message)

# Usage:
class ConcreteObserver(Observer):
    def update(self, message):
        print(f"Received message: {message}")

subject = Subject()
observer1 = ConcreteObserver()
observer2 = ConcreteObserver()

subject.add_observer(observer1)
subject.add_observer(observer2)

subject.notify_observers("Hello observers!")  # Output: Received message: Hello observers!
```

- **Strategy Pattern**:

```python
class Strategy:
    def execute(self):
        pass

class ConcreteStrategyA(Strategy):
    def execute(self):
        print("Executing strategy A")

class ConcreteStrategyB(Strategy):
    def execute(self):
        print("Executing strategy B")

class Context:
    def __init__(self, strategy):
        self._strategy = strategy

    def execute_strategy(self):
        self._strategy.execute()

# Usage:
context = Context(ConcreteStrategyA())
context.execute_strategy()  # Output: Executing strategy A

context = Context(ConcreteStrategyB())
context.execute_strategy()  # Output: Executing strategy B
```

### Benefits of Advanced Python Patterns

- **Flexibility**: Enables flexible object creation and behavior customization.
- **Reusability**: Promotes code reuse and maintainability through structured design patterns.
- **Scalability**: Facilitates scaling of applications by managing complexity and improving modularity.

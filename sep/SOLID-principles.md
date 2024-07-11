## SOLID principles

The SOLID principles are a set of design principles that can help developers create more maintainable, understandable, and flexible software.

### 1. Single Responsibility Principle (SRP)

**Definition**: A class should have only one reason to change, meaning it should have only one job or responsibility.

**Example**: A class representing a report that also handles printing.

**Wrong Code**:

```python
class Report:
    def __init__(self, title, content):
        self.title = title
        self.content = content

    def print_report(self):
        print(f"Title: {self.title}")
        print(f"Content: {self.content}")

    def save_to_file(self, filename):
        with open(filename, 'w') as f:
            f.write(f"Title: {self.title}\n")
            f.write(f"Content: {self.content}")

# The Report class has two responsibilities: managing report data and saving the report to a file.
```

**Correct Code**:

```python
class Report:
    def __init__(self, title, content):
        self.title = title
        self.content = content

class ReportPrinter:
    @staticmethod
    def print_report(report):
        print(f"Title: {report.title}")
        print(f"Content: {report.content}")

class ReportSaver:
    @staticmethod
    def save_to_file(report, filename):
        with open(filename, 'w') as f:
            f.write(f"Title: {report.title}\n")
            f.write(f"Content: {report.content}")

# The Report class has a single responsibility, while printing and saving are handled by separate classes.
```

### 2. Open/Closed Principle (OCP)

**Definition**: Software entities should be open for extension but closed for modification.

**Example**: A shape class where we want to add new shapes without modifying existing code.

**Wrong Code**:

```python
class Shape:
    def __init__(self, shape_type):
        self.shape_type = shape_type

    def draw(self):
        if self.shape_type == 'circle':
            print("Drawing a circle")
        elif self.shape_type == 'square':
            print("Drawing a square")

# Adding a new shape requires modifying the draw method.
```

**Correct Code**:

```python
class Shape:
    def draw(self):
        pass

class Circle(Shape):
    def draw(self):
        print("Drawing a circle")

class Square(Shape):
    def draw(self):
        print("Drawing a square")

# Adding a new shape can be done by creating a new class without modifying existing code.
```

### 3. Liskov Substitution Principle (LSP)

**Definition**: Subtypes must be substitutable for their base types without altering the correctness of the program.

**Example**: A rectangle class and a square class where square is a subtype of rectangle.

**Wrong Code**:

```python
class Rectangle:
    def __init__(self, width, height):
        self.width = width
        self.height = height

    def set_width(self, width):
        self.width = width

    def set_height(self, height):
        self.height = height

    def area(self):
        return self.width * self.height

class Square(Rectangle):
    def set_width(self, width):
        self.width = width
        self.height = width

    def set_height(self, height):
        self.width = height
        self.height = height

# Using Square as a substitute for Rectangle can lead to incorrect behavior.
rect = Rectangle(2, 3)
print(rect.area())  # Output: 6

square = Square(2, 2)
square.set_width(3)
print(square.area())  # Output: 9, but expected 6 (since it should be a square)
```

**Correct Code**:

```python
class Shape:
    def area(self):
        pass

class Rectangle(Shape):
    def __init__(self, width, height):
        self.width = width
        self.height = height

    def area(self):
        return self.width * self.height

class Square(Shape):
    def __init__(self, side):
        self.side = side

    def area(self):
        return self.side * self.side

# Both Rectangle and Square can be used interchangeably without altering the correctness.
rect = Rectangle(2, 3)
print(rect.area())  # Output: 6

square = Square(3)
print(square.area())  # Output: 9
```

### 4. Interface Segregation Principle (ISP)

**Definition**: Clients should not be forced to depend on interfaces they do not use.

**Example**: A printer interface that includes methods not relevant to all types of printers.

**Wrong Code**:

```python
class Printer:
    def print(self, document):
        pass

    def scan(self, document):
        pass

    def fax(self, document):
        pass

class OldPrinter(Printer):
    def print(self, document):
        print("Printing document")

    def scan(self, document):
        pass  # OldPrinter cannot scan

    def fax(self, document):
        pass  # OldPrinter cannot fax

# OldPrinter is forced to implement methods it does not use.
```

**Correct Code**:

```python
class Printer:
    def print(self, document):
        pass

class Scanner:
    def scan(self, document):
        pass

class Fax:
    def fax(self, document):
        pass

class OldPrinter(Printer):
    def print(self, document):
        print("Printing document")

# OldPrinter only implements the print method, adhering to the interface segregation principle.
```

### 5. Dependency Inversion Principle (DIP)

**Definition**: High-level modules should not depend on low-level modules. Both should depend on abstractions.

**Example**: A class that directly instantiates another class it depends on.

**Wrong Code**:

```python
class FileLogger:
    def log(self, message):
        with open('logfile.txt', 'a') as f:
            f.write(message + '\n')

class Application:
    def __init__(self):
        self.logger = FileLogger()

    def run(self):
        self.logger.log("Application has started")

# Application is tightly coupled to FileLogger.
```

**Correct Code**:

```python
class Logger:
    def log(self, message):
        pass

class FileLogger(Logger):
    def log(self, message):
        with open('logfile.txt', 'a') as f:
            f.write(message + '\n')

class Application:
    def __init__(self, logger):
        self.logger = logger

    def run(self):
        self.logger.log("Application has started")

# Application depends on the Logger abstraction, allowing for flexibility in logging implementations.
logger = FileLogger()
app = Application(logger)
app.run()
```

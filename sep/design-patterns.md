### Design Patterns in Software Engineering

Design patterns are proven solutions to common problems encountered in software design. They are like blueprints that guide developers in crafting flexible, scalable, and maintainable code. Understanding and using design patterns effectively can significantly improve software quality and help developers solve complex design problems systematically.

#### **1. Creational Design Patterns**

Creational patterns deal with object creation mechanisms, trying to create objects in a manner suitable to the situation. They abstract the instantiation process and help make a system independent of how its objects are created, composed, and represented.

**1.1. Singleton Pattern:**

- **Purpose:** Ensures that a class has only one instance and provides a global point of access to it.
- **When to Use:** When exactly one instance of a class is needed across the system, like a configuration manager or connection pool.
- **Example:** A logging class that writes logs to a file where only one instance is necessary to avoid conflicts.

**1.2. Factory Method Pattern:**

- **Purpose:** Defines an interface for creating an object but lets subclasses alter the type of objects that will be created.
- **When to Use:** When a class cannot anticipate the class of objects it must create, or when a class wants its subclasses to specify the objects it creates.
- **Example:** A document editor application where different subclasses of `Document` (e.g., `WordDocument`, `SpreadsheetDocument`) are created based on user input.

**1.3. Abstract Factory Pattern:**

- **Purpose:** Provides an interface for creating families of related or dependent objects without specifying their concrete classes.
- **When to Use:** When the system needs to be independent of how its products are created, composed, and represented, or when families of related product objects are designed to be used together.
- **Example:** A GUI toolkit that supports different look-and-feel standards like Windows, macOS, and Linux, each with its own set of UI components.

**1.4. Builder Pattern:**

- **Purpose:** Separates the construction of a complex object from its representation, allowing the same construction process to create different representations.
- **When to Use:** When constructing an object involves multiple steps or when the creation process must allow different representations.
- **Example:** Building a `Car` object where each model has different components, such as engines, wheels, and seats, which can be configured independently.

**1.5. Prototype Pattern:**

- **Purpose:** Creates new objects by copying an existing object, known as the prototype.
- **When to Use:** When the cost of creating an object is expensive or complex, and you want to clone an existing instance.
- **Example:** Creating new objects in a game by cloning a prototype enemy object with predefined characteristics.

#### **2. Structural Design Patterns**

Structural patterns concern class and object composition. They help ensure that if one part of a system changes, the entire structure of the system does not need to do so.

**2.1. Adapter Pattern:**

- **Purpose:** Allows incompatible interfaces to work together by acting as a bridge between them.
- **When to Use:** When you want to use an existing class, and its interface does not match the one you need.
- **Example:** An adapter that allows a legacy payment processing system to interact with a modern e-commerce platform.

**2.2. Bridge Pattern:**

- **Purpose:** Decouples an abstraction from its implementation, allowing them to vary independently.
- **When to Use:** When an abstraction and its implementation should be able to vary independently or when avoiding a permanent binding between an abstraction and its implementation.
- **Example:** Separating the interface of a `RemoteControl` from its implementation so it can work with different devices like TVs, Radios, etc.

**2.3. Composite Pattern:**

- **Purpose:** Composes objects into tree structures to represent part-whole hierarchies, allowing clients to treat individual objects and compositions of objects uniformly.
- **When to Use:** When you need to represent a hierarchy of objects, and clients should treat individual objects and compositions uniformly.
- **Example:** A file system where files and directories are treated the same way, enabling recursive operations like searching or listing contents.

**2.4. Decorator Pattern:**

- **Purpose:** Adds additional responsibilities to an object dynamically without affecting other objects of the same class.
- **When to Use:** When you want to add responsibilities to individual objects without affecting other objects of the same class, or when subclassing for every possible variation is impractical.
- **Example:** Adding scrollbars, borders, or shadows to UI components like text boxes or windows.

**2.5. Facade Pattern:**

- **Purpose:** Provides a simplified interface to a complex subsystem, making it easier to use.
- **When to Use:** When you want to simplify interaction with a complex system, providing a single entry point.
- **Example:** A single interface for a complex library or framework, like a facade for database operations that hides the complexity of connecting, querying, and closing connections.

**2.6. Flyweight Pattern:**

- **Purpose:** Reduces memory usage by sharing as much data as possible with similar objects; it is a way to use objects in large numbers efficiently.
- **When to Use:** When many fine-grained objects are needed, and the cost of object creation is high.
- **Example:** A text editor that uses a flyweight to share character fonts, sizes, and colors across documents, rather than creating new objects for each character.

**2.7. Proxy Pattern:**

- **Purpose:** Provides a surrogate or placeholder for another object to control access to it.
- **When to Use:** When you need to control access to an object, add functionality like lazy initialization, access control, or logging.
- **Example:** A proxy server that acts as an intermediary for requests from clients seeking resources from other servers.

#### **3. Behavioral Design Patterns**

Behavioral patterns are concerned with algorithms and the assignment of responsibilities between objects. They help manage complex communication and control flows between objects.

**3.1. Chain of Responsibility Pattern:**

- **Purpose:** Passes a request along a chain of handlers. Each handler decides whether to process the request or pass it to the next handler in the chain.
- **When to Use:** When multiple objects can handle a request, and the handler is unknown at design time.
- **Example:** A support system where a request escalates through multiple levels of support (e.g., customer service, technical support, product development) until it is resolved.

**3.2. Command Pattern:**

- **Purpose:** Encapsulates a request as an object, thereby allowing for parameterization of clients with queues, requests, and operations, and supports undoable operations.
- **When to Use:** When you want to parameterize objects with operations, support undo operations, or queue operations.
- **Example:** A text editor with operations like cut, copy, and paste, where each operation can be undone or redone.

**3.3. Interpreter Pattern:**

- **Purpose:** Defines a grammar for a language and provides an interpreter to interpret sentences in that language.
- **When to Use:** When you need to interpret sentences in a language defined by a simple grammar.
- **Example:** A simple calculator that interprets mathematical expressions.

**3.4. Iterator Pattern:**

- **Purpose:** Provides a way to access the elements of an aggregate object sequentially without exposing its underlying representation.
- **When to Use:** When you need to traverse a collection without exposing the underlying details.
- **Example:** Iterating over a collection of items in a shopping cart, regardless of its implementation.

**3.5. Mediator Pattern:**

- **Purpose:** Defines an object that encapsulates how a set of objects interact, promoting loose coupling by preventing objects from referring to each other explicitly.
- **When to Use:** When you want to reduce direct dependencies between communicating objects, making the system easier to maintain and extend.
- **Example:** A chatroom mediator that handles communication between multiple users, preventing direct communication and managing message distribution.

**3.6. Memento Pattern:**

- **Purpose:** Captures and externalizes an object’s internal state so that the object can be restored to this state later without violating encapsulation.
- **When to Use:** When you need to implement undo or rollback features.
- **Example:** A text editor that allows users to undo changes by restoring previous states of the document.

**3.7. Observer Pattern:**

- **Purpose:** Defines a one-to-many dependency between objects so that when one object changes state, all its dependents are notified and updated automatically.
- **When to Use:** When changes in one object need to trigger updates in multiple other objects.
- **Example:** A news agency that notifies subscribers when new articles are published.

**3.8. State Pattern:**

- **Purpose:** Allows an object to alter its behavior when its internal state changes. The object will appear to change its class.
- **When to Use:** When an object’s behavior depends on its state, and it must change its behavior at runtime depending on that state.
- **Example:** A vending machine that changes its behavior based on the state (e.g., item selection, payment processing, dispensing item).

**3.9. Strategy Pattern:**

- **Purpose:** Defines a family of algorithms, encapsulates each one, and makes them interchangeable. The strategy lets the algorithm vary independently from clients that use it.
- **When to Use:** When you have multiple algorithms for a specific task, and you want to switch between them easily.
- **Example:** Different sorting strategies (e.g., quicksort, mergesort) that can be chosen based on the data set.

**3.10. Template Method Pattern:**

- **Purpose:** Defines the skeleton of an algorithm in a method, deferring some steps to subclasses. The template

method lets subclasses redefine certain steps of an algorithm without changing its structure.

- **When to Use:** When you want to implement the invariant parts of an algorithm once and let subclasses implement the behavior that can vary.
- **Example:** A framework that defines the steps to generate reports, but allows subclasses to define specific report content and formatting.

**3.11. Visitor Pattern:**

- **Purpose:** Represents an operation to be performed on the elements of an object structure. The Visitor pattern lets you define a new operation without changing the classes of the elements on which it operates.
- **When to Use:** When you need to perform operations on objects of different types grouped in a structure, and you want to keep related operations together by separating algorithms from the object structure.
- **Example:** An object structure representing a file system where operations like listing files, calculating sizes, or applying permissions can be implemented as visitors.

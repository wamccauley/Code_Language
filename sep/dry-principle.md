## DRY Principle

**Concepts:**

1. **Single Source of Truth (SSOT):**

   - Ensure that every piece of knowledge or logic is represented in one place within the codebase. This helps in maintaining consistency and makes updates easier.

2. **Abstraction:**

   - Use functions, classes, and modules to abstract common logic. This avoids repeating the same code and makes the system more modular and easier to maintain.

3. **Reusability:**
   - Write code in a way that it can be reused across the system. This reduces redundancy and promotes cleaner and more efficient code.

**Benefits:**

1. **Maintainability:**

   - Changes are easier to implement and errors are less likely to occur since updates need to be made in only one place.

2. **Readability:**

   - Code is easier to read and understand when there's no unnecessary repetition.

3. **Reduced Errors:**

   - By avoiding duplicate code, the risk of inconsistencies and errors is minimized.

4. **Efficiency:**
   - Writing less code to achieve the same functionality saves time and reduces the potential for bugs.

**Examples:**

1. **Functions:**

   - Instead of repeating a block of code, encapsulate it in a function.

   ```python
   # Repetitive Code
   area1 = length1 * width1
   area2 = length2 * width2
   area3 = length3 * width3

   # DRY Code
   def calculate_area(length, width):
       return length * width

   area1 = calculate_area(length1, width1)
   area2 = calculate_area(length2, width2)
   area3 = calculate_area(length3, width3)
   ```

2. **Classes:**

   - Use classes to encapsulate data and behaviors, avoiding repeated code.

   ```python
   # Repetitive Code
   class Dog:
       def __init__(self, name, age):
           self.name = name
           self.age = age

   class Cat:
       def __init__(self, name, age):
           self.name = name
           self.age = age

   # DRY Code
   class Animal:
       def __init__(self, name, age):
           self.name = name
           self.age = age

   class Dog(Animal):
       pass

   class Cat(Animal):
       pass
   ```

3. **Modules:**

   - Use modules to organize and share code across different parts of the application.

   ```python
   # Repetitive Code
   # file1.py
   def fetch_data():
       # code to fetch data

   # file2.py
   def fetch_data():
       # same code to fetch data

   # DRY Code
   # fetch_module.py
   def fetch_data():
       # code to fetch data

   # file1.py
   from fetch_module import fetch_data

   # file2.py
   from fetch_module import fetch_data
   ```

**Common Pitfalls:**

1. **Over-Abstraction:**

   - Avoid abstracting too early or too much, which can lead to complex and hard-to-understand code.

2. **Context Matters:**

   - Sometimes, repeating code can be more readable and understandable, especially when the context differs slightly.

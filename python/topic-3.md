# Topic 3: Random Notes

# Managing Dependencies

Managing dependencies is crucial for ensuring that your Python projects run smoothly and consistently across different environments. This guide covers how to install `pip` on Windows, macOS, and Linux, how to set up a virtual environment (venv), and how to install dependencies from a `requirements.txt` file.

## Installing `pip`

`pip` is the package installer for Python, allowing you to install and manage additional libraries and dependencies that are not part of the Python standard library.

### Windows

1. **Download get-pip.py:**

   - Open a web browser and navigate to the [get-pip.py](https://bootstrap.pypa.io/get-pip.py) page.
   - Right-click on the page and select "Save As" to save the file to your preferred location.

2. **Install `pip`:**
   - Open Command Prompt (cmd) or PowerShell.
   - Navigate to the directory where you saved `get-pip.py`.
   - Run the following command:
     ```shell
     python get-pip.py
     ```
   - Verify the installation by running:
     ```shell
     pip --version
     ```

### macOS

1. **Ensure Python is installed:**

   - macOS comes with Python pre-installed. However, it is recommended to use `brew` to install the latest version.
   - Install Homebrew if you haven't already:
     ```shell
     /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
     ```
   - Install Python using Homebrew:
     ```shell
     brew install python
     ```

2. **Install `pip`:**
   - `pip` is included with Python installations via Homebrew. Verify the installation by running:
     ```shell
     pip3 --version
     ```

### Linux

1. **Ensure Python is installed:**

   - Most Linux distributions come with Python pre-installed. You can check if Python is installed by running:
     ```shell
     python3 --version
     ```

2. **Install `pip`:**
   - For Debian-based distributions (e.g., Ubuntu):
     ```shell
     sudo apt update
     sudo apt install python3-pip
     ```
   - For Red Hat-based distributions (e.g., CentOS):
     ```shell
     sudo yum install python3-pip
     ```
   - Verify the installation by running:
     ```shell
     pip3 --version
     ```

## Setting Up a Virtual Environment

Using a virtual environment is a good practice to manage dependencies for different projects separately.

### Creating a Virtual Environment

1. **Navigate to your project directory:**

   ```shell
   cd /path/to/your/project
   ```

2. **Create a virtual environment:**
   ```shell
   python3 -m venv venv
   ```
   This command creates a new directory named `venv` containing the virtual environment.

### Activating the Virtual Environment

- **Windows:**

  ```shell
  venv\Scripts\activate
  ```

- **macOS and Linux:**
  ```shell
  source venv/bin/activate
  ```

You should see the name of your virtual environment in the terminal prompt, indicating that the virtual environment is active.

### Deactivating the Virtual Environment

To deactivate the virtual environment, simply run:

```shell
deactivate
```

## Installing Dependencies

Dependencies for a project are typically listed in a `requirements.txt` file.

### Creating a `requirements.txt` File

To generate a `requirements.txt` file for your project, run:

```shell
pip freeze > requirements.txt
```

This command lists all the installed packages and their versions and saves them to `requirements.txt`.

### Installing Dependencies from `requirements.txt`

To install the dependencies listed in `requirements.txt`, ensure your virtual environment is activated, then run:

```shell
pip install -r requirements.txt
```

## Python Random Notes

### Data Types

- **Decimal**:
  - Exact and no rounding.
  - Can hold bigger numbers.
  - Slower compared to floating-point numbers.
  - Used in high precision calculations.

### Function Handling

- **Overriding**:

  - Redefining a function from the superclass in the subclass.

- **Overloading**:

  - Defining multiple functions with the same name but different parameters within the same class.

- **Overwriting**:
  - Changing the value of a variable.

### Namespaces

- **Namespace**:
  - Organizes variables and functions to avoid naming conflicts.
  - Local namespaces, e.g., a function cannot have two variables with the same name.
  - Class namespaces, e.g., a class cannot have two functions with the same name.

### Special Files and Statements

- **`__init__.py`**:

  - Used in modules and modular apps.
  - Contains initial configurations and imports.

- **`if __name__ == "__main__":`**:
  - Checks if the script is being run directly or imported.
  - Commonly used for running Python apps from the CLI with arguments.

### Functions with \*args and \*\*kwargs

- **`*args`**:

  - Allows a function to accept any number of positional arguments.

- **`**kwargs`\*\*:
  - Allows a function to accept any number of keyword arguments.

Example:

```python
class MyClass:
    def my_function(self, *args, **kwargs):
        if len(args) == 1:
            print(f"One positional argument: {args[0]}")
        elif len(args) == 2:
            print(f"Two positional arguments: {args[0]}, {args[1]}")
        elif 'param1' in kwargs and 'param2' not in kwargs:
            print(f"One keyword argument: {kwargs['param1']}")
        elif 'param1' in kwargs and 'param2' in kwargs:
            print(f"Two keyword arguments: {kwargs['param1']}, {kwargs['param2']}")
        else:
            print("No parameters or unsupported parameter combination")

obj = MyClass()
obj.my_function("test")                    # One positional argument: test
obj.my_function("test1", "test2")          # Two positional arguments: test1, test2
obj.my_function(param1="test")             # One keyword argument: test
obj.my_function(param1="test1", param2="test2")  # Two keyword arguments: test1, test2
obj.my_function()                          # No parameters or unsupported parameter combination
```

### Decorators

- **Decorators**:
  - Add functionality to a function without modifying its code.

Example:

```python
import time

def timing_decorator(func):
    def wrapper(*args, **kwargs):
        start_time = time.time()
        result = func(*args, **kwargs)
        end_time = time.time()
        execution_time = end_time - start_time
        print(f"Function '{func.__name__}' executed in {execution_time:.4f} seconds")
        return result
    return wrapper

@timing_decorator
def example_function(n):
    sum = 0
    for i in range(n):
        sum += i
    return sum

result = example_function(1000000)
print(f"Result: {result}")
```

### Codebase Standards

Below is a quick standards markdown notes I wrote for a codebase I was managing recently.

---

# Coding Standards and Best Practices

## Overview

This document outlines the coding standards, comment guidelines, and best practices to be followed by all contributors to maintain code quality and consistency across the project.

## Coding Standards

### PEP 8 Compliance

In this project, we stick to the PEP 8 style guide for Python code to ensure readability and consistency. All Python code should follow these guidelines:

- **Automatic Formatting**: Use the [autopep8](https://marketplace.visualstudio.com/items?itemName=ms-python.autopep8) extension in Visual Studio Code to automatically format your code according to PEP 8 standards.
- **Installation**: Install the autopep8 extension with the following ID: `ms-python.autopep8`.

### Git Commits

To commit your changes, use the following steps based on your operating system:

**Unix Systems:**

1. Make the script executable (only needed once):

   ```sh
   chmod +x gitupdate.sh
   ```

2. Run the script with your commit message:
   ```sh
   ./gitupdate.sh "COMMIT_MESSAGE"
   ```

**Windows:**

Simply run:

```sh
gitupdate.bat
```

Each commit should be linked to an issue to ensure traceability in the development process. A developer should fork the repository and create a new branch for each issue they work on. When committing changes, reference the relevant issue number in the commit message. To automatically close an issue when the commit is merged, use the keywords "Fixes," "Closes," or "Resolves" followed by the issue number. For example:

```sh
git commit -m "Feature: Add user login functionality (Closes #123)".
```

Some prefix we might use:

1. **Feature**: Adds a new feature or functionality.
2. **Fix**: Fixes a bug or issue.
3. **Enhancement**: Improves existing functionality.
4. **Refactor**: Changes code without altering external behavior (often for code cleanliness or optimization).
5. **Docs**: Updates or adds documentation.
6. **Style**: Changes code style or formatting without affecting functionality.
7. **Test**: Adds or updates tests.
8. **Chore**: Routine tasks or maintenance not affecting application logic.
9. **Build**: Changes related to build configuration or scripts.
10. **Revert**: Reverts a previous commit.

Don't forger to document every modification you make.

### Import Statements

We should organize import statements in a structured manner to enhance code readability and maintainability. Begin with standard library imports, followed by third-party library imports, and finally your project-specific imports. Group imports logically and separate them with a blank line to improve clarity. The recommended order is:

1. Standard library imports (e.g., `import html`, `import json`)
2. Third-party library imports (e.g., `from django.db.models import Q`, `from rest_framework import status`)
3. Project-specific imports (e.g., `from someapp.models import MyModel`)

## Commenting Guidelines

Writing clear and meaningful comments is essential for code maintainability. Follow these guidelines to write effective comments:

1. **Be Clear and Concise**: Comments should be easy to understand. Avoid unnecessary verbosity while ensuring clarity.

   - **Example**: `# Calculates the total price including tax`

2. **Explain the 'Why', Not the 'What'**: Focus on explaining why a certain approach was taken rather than what the code is doing, which should be clear from the code itself.

   - **Example**: `# Using binary search for efficiency as the list is sorted`

3. **Update Comments When Modifying Code**: Always update or remove comments that are no longer relevant after code changes.

4. **Use Docstrings for Functions and Classes**: Every function, method, and class should have a docstring explaining its purpose, parameters, and return values.

   - **Example**:

     ```python
     def calculate_total(price, tax_rate):
         """
         Calculate the total price including tax.

         Args:
             price (float): The initial price.
             tax_rate (float): The tax rate to apply.

         Returns:
             float: The total price including tax.
         """
         return price * (1 + tax_rate)
     ```

5. **Avoid Useless Comments**: Do not write comments that directly describes what the code does.
   - **Not Useful**: `# Increment i by 1`
   - **Better**: `# Move to the next item in the list`

## Best Practices

To maintain a high-quality codebase, adhere to the following best practices:

1. **Write Modular and Reusable Code**: Break down large functions or classes into smaller, reusable components.

2. **Adopt a Consistent Naming Convention**: Use descriptive names for variables, functions, and classes. Follow the PEP 8 naming conventions:

   - Variables and functions: `snake_case`
   - Classes: `CamelCase`

3. **Keep Functions Short and Focused**: A function should do one thing and do it well. Aim for functions to be no longer than 20 lines.

4. **Limit the Use of Magic Numbers**: Replace magic numbers with named constants for better readability and maintainability.

   - **Example**: Replace `60` with `SECONDS_IN_MINUTE = 60`.

5. **Error Handling**: Implement robust error handling using `try-except` blocks where appropriate. Ensure that exceptions are meaningful and provide clear information about what went wrong.

6. **Write Tests**: Ensure that every new feature or bug fix is accompanied by relevant tests. Aim for high test coverage and use descriptive test case names.

7. **Use Version Control Properly**: Commit small, logical changes with meaningful commit messages. Follow a branching strategy that suits the project's workflow.

### Comparing Strings

1. **Equality Comparison (`==`)**:

   ```python
   str1 = "hello"
   str2 = "hello"
   if str1 == str2:
       print("Strings are equal")
   ```

2. **Inequality Comparison (`!=`)**:

   ```python
   str1 = "hello"
   str2 = "world"
   if str1 != str2:
       print("Strings are not equal")
   ```

3. **Case Sensitivity**:

   ```python
   str1 = "Hello"
   str2 = "hello"
   if str1.lower() == str2.lower():
       print("Case-insensitive comparison: Strings are equal")
   ```

4. **Comparison Operators (`<`, `>`, `<=`, `>=`)**:

   ```python
   str1 = "apple"
   str2 = "banana"
   if str1 < str2:
       print("str1 comes before str2 lexicographically")
   ```

5. **Length Comparison**:
   ```python
   str1 = "apple"
   str2 = "banana"
   if len(str1) < len(str2):
       print("str1 is shorter than str2")
   ```

#### String Methods: `startswith()`, `endswith()`, and `find()`

1. **`startswith(prefix[, start[, end]])`**:

   - This method checks if a string starts with the specified `prefix`.
   - Parameters:
     - `prefix`: Required. The prefix to check against the start of the string.
     - `start` (optional): Specify where to start the search in the string.
     - `end` (optional): Specify where to end the search in the string.
   - Returns `True` if the string starts with `prefix`, otherwise `False`.
   - Example:
     ```python
     text = "Hello, world!"
     if text.startswith("Hello"):
         print("The string starts with 'Hello'")
     ```

2. **`endswith(suffix[, start[, end]])`**:

   - This method checks if a string ends with the specified `suffix`.
   - Parameters:
     - `suffix`: Required. The suffix to check against the end of the string.
     - `start` (optional): Specify where to start the search in the string.
     - `end` (optional): Specify where to end the search in the string.
   - Returns `True` if the string ends with `suffix`, otherwise `False`.
   - Example:
     ```python
     filename = "script.py"
     if filename.endswith(".py"):
         print("The file is a Python script")
     ```

3. **`find(sub[, start[, end]])`**:
   - This method searches for the substring `sub` within the string.
   - Parameters:
     - `sub`: Required. The substring to search for.
     - `start` (optional): Specify where to start the search in the string.
     - `end` (optional): Specify where to end the search in the string.
   - Returns the lowest index in the string where `sub` is found, or `-1` if `sub` is not found.
   - Example:
     ```python
     sentence = "Python is powerful"
     index = sentence.find("is")
     if index != -1:
         print(f"'is' found at index {index}")
     ```

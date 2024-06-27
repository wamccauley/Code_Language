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

### For Loop

```python
my_list = [1, 2, 3, 4, 5]
for item in my_list:
    print(item)

my_string = "Hello"
for char in my_string:
    print(char)
```

#### Iterating Over Dictionaries

- **Keys**:

  ```python
  my_dict = {'a': 1, 'b': 2, 'c': 3}
  for key in my_dict:
      print(key)
  ```

- **Values**:

  ```python
  for value in my_dict.values():
      print(value)
  ```

- **Key-Value Pairs**:
  ```python
  for key, value in my_dict.items():
      print(key, value)
  ```

#### Using `range()`

```python
for i in range(2, 10, 2):
    print(i)  # 2, 4, 6, 8
```

#### For Loop Techniques

- **Using `enumerate()`**: To get both index and value.

  ```python
  for index, value in enumerate(['a', 'b', 'c']):
      print(index, value)
  ```

- **Using `zip()`**: To iterate over multiple sequences in parallel.

  ```python
  names = ["Alice", "Bob", "Charlie"]
  ages = [25, 30, 35]
  for name, age in zip(names, ages):
      print(f"{name} is {age} years old.")
  ```

- **Using `break` and `continue`**: To control the flow of the loop.

  ```python
  for i in range(10):
      if i == 5:
          break  # Exit the loop
      if i % 2 == 0:
          continue  # Skip the rest of the code in this iteration
      print(i)
  ```

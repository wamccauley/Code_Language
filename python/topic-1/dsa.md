### Lists

A tuple is an ordered, mutable collection of items.

```python
my_list = [1, 2, 3, 4, 5]

print(my_list[0])  # 1
print(my_list[-1])  # 5
```

#### Slicing

```python
print(my_list[1:3])  # [2, 3]
print(my_list[:2])  # [1, 2]
print(my_list[2:])  # [3, 4, 5]
```

#### Adding Elements

- **append()**: Adds an element to the end.

  ```python
  my_list.append(6)
  ```

- **insert()**: Adds an element at a specific position.

  ```python
  my_list.insert(2, 'a')
  ```

- **extend()**: Adds multiple elements.

  ```python
  my_list.extend([7, 8])
  ```

#### Removing Elements

- **remove()**: Removes the first occurrence of an element.

  ```python
  my_list.remove(2)
  ```

- **pop()**: Removes and returns the element at the given index.

  ```python
  my_list.pop(1)
  ```

- **clear()**: Removes all elements.

  ```python
  my_list.clear()
  ```

#### List Comprehensions

```python
squares = [x**2 for x in range(10)]
```

#### List Techniques

- **Sorting**: Use `sort()` for in-place sorting or `sorted()` to return a new sorted list. **Reverse** is set to True to make the sorting descending.

  ```python
  my_list.sort()
  sorted_list = sorted(my_list, reverse=True)
  ```

- **Filtering**: Using list comprehensions.

  ```python
  even_numbers = [x for x in my_list if x % 2 == 0]
  ```

- **Mapping**: Applying a function to all elements.

  ```python
  squared = list(map(lambda x: x**2, my_list))

  # Another example
  def addition(n):
    return n + n
  result = map(addition, my_list)
  ```

### Tuples

A tuple is an ordered, immutable collection of items.

```python
my_tuple = (1, 2, 3)

print(my_tuple[0])  # 1
print(my_tuple[-1])  # 3
```

#### Tuple Unpacking

Extracting values from a tuple.

```python
a, b, c = my_tuple
```

#### Advanced Tuple Techniques

- **Creating Single-element Tuples**: Add a comma after the element.

  ```python
  single_element_tuple = (1,)
  ```

- **Tuple Comprehensions**: Using `tuple()` and generator expressions.

  ```python
  squared_tuple = tuple(x**2 for x in range(10))
  ```

- **Named Tuples**: Creating more readable tuples using `collections.namedtuple`.

  ```python
  from collections import namedtuple
  Point = namedtuple('Point', ['x', 'y'])
  p = Point(1, 2)
  print(p.x, p.y)  # 1 2
  ```

### Sets

A set is an unordered, mutable collection of **unique** elements.

```python
my_set = {1, 2, 3} # my_set = set({1, 2, 3})
```

- **add()**: Adds an element.

  ```python
  my_set.add(4)
  ```

- **update()**: Adds multiple elements.

  ```python
  my_set.update([5, 6])
  ```

#### Removing Elements

- **remove()**: Removes an element (raises an error if not found).

  ```python
  my_set.remove(2)
  ```

- **discard()**: Removes an element (doesn't raise an error if not found).

  ```python
  my_set.discard(2)
  ```

- **pop()**: Removes and returns an arbitrary element.

  ```python
  my_set.pop()
  ```

- **clear()**: Removes all elements.

  ```python
  my_set.clear()
  ```

#### Set Operations

- **Union**: Combine sets.

  ```python
  set1 = {1, 2, 3}
  set2 = {3, 4, 5}
  union_set = set1 | set2  # {1, 2, 3, 4, 5}
  ```

- **Intersection**: Elements common to both sets.

  ```python
  intersection_set = set1 & set2  # {3}
  ```

- **Difference**: Elements in one set but not the other.

  ```python
  difference_set = set1 - set2  # {1, 2}
  ```

- **Symmetric Difference**: Elements in either set, but not both.

  ```python
  symmetric_difference_set = set1 ^ set2  # {1, 2, 4, 5}
  ```

#### Advanced Set Techniques

- **Set Comprehensions**: Creating sets with a comprehension.

  ```python
  squared_set = {x**2 for x in range(10)}
  ```

- **Frozen Sets**: Immutable sets.

  ```python
  frozen_set = frozenset([1, 2, 3])
  ```

### Dictionaries

A dictionary is an unordered, mutable collection of key-value pairs.

```python
my_dict = {'name': 'Alice', 'age': 25}
```

#### Accessing Elements

Use keys to access values.

```python
print(my_dict['name'])  # Alice
```

#### Adding/Updating Elements

- **Adding**: Use a new key.

  ```python
  my_dict['address'] = '123 Main St'
  ```

- **Updating**: Use an existing key.

  ```python
  my_dict['age'] = 26
  ```

#### Removing Elements

- **pop()**: Removes and returns an element by key.

  ```python
  age = my_dict.pop('age')
  ```

- **popitem()**: Removes and returns the last key-value pair.

  ```python
  last_item = my_dict.popitem()
  ```

- **del**: Removes an element by key.

  ```python
  del my_dict['name']
  ```

- **clear()**: Removes all elements.

  ```python
  my_dict.clear()
  ```

#### Dictionary Comprehensions

A brief way to create dictionaries.

```python
squares = {x: x**2 for x in range(10)}
```

#### Advanced Dictionary Techniques

- **Iterating**: Using `.items()`, `.keys()`, and `.values()`.

  ```python
  for key, value in my_dict.items():
      print(key, value)
  ```

- **Default Values**: Using `get()` to avoid `KeyError`.

  ```python
  name = my_dict.get('name', 'Unknown')
  ```

- **Merging**: Combining dictionaries.

  ```python
  dict1 = {'a': 1, 'b': 2}
  dict2 = {'b': 3, 'c': 4}
  merged_dict = {**dict1, **dict2}
  ```

- **Default Dictionaries**: Using `collections.defaultdict` for automatic default values.

  ```python
  from collections import defaultdict
  default_dict = defaultdict(int)
  default_dict['a'] += 1
  ```

### Data Structures (Advanced)

#### Advanced Usage of `collections` Module

The `collections` module in Python provides specialized container datatypes beyond the built-in types like lists and dictionaries, offering enhanced functionality and performance.

##### `deque`, `defaultdict`, `Counter`

- **`deque`**: Double-ended queue for fast appends and pops from both ends.

Example usage of `deque`:

```python
from collections import deque

# Initialize deque
d = deque([1, 2, 3])
print(d)  # Output: deque([1, 2, 3])

# Append and pop elements
d.append(4)
d.appendleft(0)
print(d)  # Output: deque([0, 1, 2, 3, 4])

d.pop()
d.popleft()
print(d)  # Output: deque([1, 2, 3])
```

- **`defaultdict`**: Dictionary subclass that provides a default value for missing keys.

Example usage of `defaultdict`:

```python
from collections import defaultdict

# Initialize defaultdict with int as default factory
d = defaultdict(int)

# Increment counts
d['apple'] += 1
d['banana'] += 2
print(d)  # Output: defaultdict(<class 'int'>, {'apple': 1, 'banana': 2})
```

- **`Counter`**: Dictionary subclass for counting hashable objects.

Example usage of `Counter`:

```python
from collections import Counter

# Count elements in an iterable
c = Counter(['apple', 'banana', 'apple', 'orange', 'banana', 'apple'])
print(c)  # Output: Counter({'apple': 3, 'banana': 2, 'orange': 1})

# Access most common elements
print(c.most_common(2))  # Output: [('apple', 3), ('banana', 2)]
```

#### Named Tuples and Data Classes

##### Named Tuples

Named tuples are tuples with named fields, providing more readable and self-documenting code.

```python
from collections import namedtuple

# Define a named tuple type
Point = namedtuple('Point', ['x', 'y'])

# Create instances of Point
p1 = Point(1, 2)
p2 = Point(x=3, y=4)

# Access fields by name
print(p1.x, p1.y)  # Output: 1 2
print(p2.x, p2.y)  # Output: 3 4
```

##### Data Classes

Data classes simplify the creation of classes to store data, providing automatic generation of `__init__`, `__repr__`, `__eq__`, and other methods.

```python
from dataclasses import dataclass

# Define a data class
@dataclass
class Point:
    x: int
    y: int

# Create instances of Point
p1 = Point(1, 2)
p2 = Point(3, 4)

# Access fields directly
print(p1.x, p1.y)  # Output: 1 2
print(p2.x, p2.y)  # Output: 3 4
```

#### `heapq` and `bisect` Modules for Efficient Data Manipulation

##### `heapq` Module

The `heapq` module provides an implementation of the heap queue algorithm, a data structure for efficiently retrieving the smallest (or largest) elements.

```python
import heapq

# Creating a heap
heap = []
heapq.heappush(heap, 3)
heapq.heappush(heap, 1)
heapq.heappush(heap, 2)

# Accessing elements in order
while heap:
    print(heapq.heappop(heap))  # Output: 1, 2, 3
```

##### `bisect` Module

The `bisect` module provides tools for maintaining a list in sorted order without having to explicitly sort the list each time an element is added or removed.

```python
import bisect

# Sorted list
sorted_list = [1, 3, 5, 7, 9]

# Inserting elements in sorted order
bisect.insort(sorted_list, 4)
bisect.insort(sorted_list, 2)

print(sorted_list)  # Output: [1, 2, 3, 4, 5, 7, 9]
```

### Benefits of Advanced Data Structures

- **Efficiency**: Enhances performance through optimized algorithms and data manipulation techniques.
- **Readability**: Provides clearer and more expressive code using named tuples, data classes, and specialized container types.
- **Functionality**: Offers additional functionalities like counting, queueing, and sorting that aren't available in standard Python data structures.

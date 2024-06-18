# Hashmaps

A **hashmap** (or hash table) is a data structure that implements an associative array abstract data type, a structure that can map keys to values. Hashmaps are efficient for both lookup and insertion operations.

## Overview

### Key Concepts

1. **Key-Value Pairs**: Each entry in a hashmap consists of a key and a value.
2. **Hash Function**: A function that maps a key to an index in the array. The hash function should distribute keys uniformly across the array.
3. **Collision Handling**: Since multiple keys can hash to the same index, a good collision resolution strategy is necessary.

### Common Operations

1. **Insertion**: Add a key-value pair to the hashmap.
2. **Deletion**: Remove a key-value pair from the hashmap.
3. **Lookup**: Retrieve the value associated with a given key.
4. **Update**: Modify the value associated with a given key.

### Time Complexity

- **Average Case**: O(1) for insertion, deletion, and lookup.
- **Worst Case**: O(n) for insertion, deletion, and lookup (if many collisions occur).

## Hashmaps in Python

In Python, the built-in dictionary (`dict`) type is an implementation of a hashmap.

### Creating a Dictionary

```python
# Creating an empty dictionary
my_dict = {}

# Creating a dictionary with initial values
my_dict = {
    "apple": 1,
    "banana": 2,
    "cherry": 3
}
```

### Basic Operations

#### Insertion

```python
# Adding a new key-value pair
my_dict["date"] = 4
```

#### Deletion

```python
# Removing a key-value pair
del my_dict["banana"]
```

#### Lookup

```python
# Accessing the value associated with a key
value = my_dict["apple"]
```

#### Update

```python
# Updating the value associated with a key
my_dict["cherry"] = 5
```

### Methods

Python dictionaries come with several useful methods:

- **`.get(key[, default])`**: Returns the value for `key` if `key` is in the dictionary, else `default`.
  
  ```python
  value = my_dict.get("apple", 0)  # Returns 1
  value = my_dict.get("banana", 0)  # Returns 0 (default) since "banana" was deleted
  ```

- **`.keys()`**: Returns a view object that displays a list of all the keys.

  ```python
  keys = my_dict.keys()
  ```

- **`.values()`**: Returns a view object that displays a list of all the values.

  ```python
  values = my_dict.values()
  ```

- **`.items()`**: Returns a view object that displays a list of dictionary's key-value tuple pairs.

  ```python
  items = my_dict.items()
  ```

- **`.pop(key[, default])`**: Removes the specified key and returns the corresponding value. If the key is not found, `default` is returned if provided, otherwise a `KeyError` is raised.

  ```python
  value = my_dict.pop("date", 0)  # Returns 4 and removes "date"
  ```

- **`.update([other])`**: Updates the dictionary with elements from another dictionary object or from an iterable of key-value pairs.

  ```python
  my_dict.update({"fig": 6, "grape": 7})
  ```

## Collision Handling

### Chaining

Chaining is a common technique to handle collisions. Each array index points to a linked list of key-value pairs that hash to the same index.

### Open Addressing

Open addressing handles collisions by finding another open slot within the array. This can be done using techniques like linear probing, quadratic probing, or double hashing.

## Example: Implementing a Simple Hashmap

Here is a basic implementation of a hashmap using chaining in Python:

```python
class HashMap:
    def __init__(self, size=10):
        self.size = size
        self.table = [[] for _ in range(size)]

    def _hash(self, key):
        return hash(key) % self.size

    def insert(self, key, value):
        hash_key = self._hash(key)
        key_exists = False
        bucket = self.table[hash_key]
        for i, kv in enumerate(bucket):
            k, v = kv
            if key == k:
                key_exists = True
                break
        if key_exists:
            bucket[i] = (key, value)
        else:
            bucket.append((key, value))

    def delete(self, key):
        hash_key = self._hash(key)
        bucket = self.table[hash_key]
        for i, kv in enumerate(bucket):
            k, v = kv
            if key == k:
                del bucket[i]
                break

    def lookup(self, key):
        hash_key = self._hash(key)
        bucket = self.table[hash_key]
        for k, v in bucket:
            if key == k:
                return v
        return None
```

# Usage
```python
hash_map = HashMap()
hash_map.insert("apple", 1)
hash_map.insert("banana", 2)
print(hash_map.lookup("apple"))  # Output: 1
hash_map.delete("banana")
print(hash_map.lookup("banana"))  # Output: None
```
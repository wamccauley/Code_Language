## Iterators

Iterators are objects that implement the iterator protocol, consisting of two methods:

1. **`__iter__()`**: Returns the iterator object itself.
2. **`__next__()`**: Returns the next item in the sequence. When no more items are available, it raises the `StopIteration` exception.

In Python, any object that implements these methods can be used as an iterator. Iterators are used in `for` loops, comprehensions, and other contexts where sequential or lazy evaluation is required.

```python
class Counter:
    def __init__(self, start, end):
        self.current = start
        self.end = end

    def __iter__(self):
        return self

    def __next__(self):
        if self.current > self.end:
            raise StopIteration
        else:
            self.current += 1
            return self.current - 1

# Usage:
counter = Counter(1, 5)
for num in counter:
    print(num)
```

## Generators

Generators are a type of iterable, but unlike regular classes implementing the iterator protocol, generators use the `yield` statement to produce a series of values lazily. This means they generate values only when requested and maintain their state between calls.

Key characteristics of generators:

- **Lazy evaluation**: Values are generated on-the-fly when `next()` is called.
- **Memory efficiency**: They do not store all values in memory simultaneously.
- **Simplicity**: Easier to write and understand compared to custom iterator classes.

#### Types of Generators

1. **Generator Functions**: Defined using the `def` keyword with `yield` statements inside the function body.

```python
def square_numbers(n):
    for i in range(n):
        yield i ** 2

# Usage:
gen = square_numbers(5)
for num in gen:
    print(num)
```

2. **Generator Expressions**: Similar to list comprehensions but using round brackets `()` instead of square brackets `[]`.

```python
gen_exp = (x ** 2 for x in range(5))
for num in gen_exp:
    print(num)
```

#### Advantages of Generators

- **Efficient memory usage**: Ideal for processing large datasets or infinite sequences.
- **Simplified code**: Eliminates the boilerplate of iterator classes.
- **Supports pipelines**: Generators can be chained together for data processing.

### Advanced Concepts

- **`send()` Method**: Allows sending data into a generator.
- **`throw()` Method**: Raises an exception at a specific point in the generator.
- **`close()` Method**: Terminates the generator.

#### Using `send()`:

```python
def accumulator():
    total = 0
    while True:
        value = yield total
        if value is None:
            break
        total += value

acc = accumulator()
next(acc)  # Prime the generator
print(acc.send(1))  # Output: 1
print(acc.send(2))  # Output: 3
acc.close()
```

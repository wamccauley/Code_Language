### Lambda Functions

**Lambda functions** are small anonymous functions defined with the `lambda` keyword. They can have any number of arguments but only one expression.

```python
square = lambda x: x ** 2
print(square(5))  # Output: 25
```

#### Using Lambda with `map()`, `filter()`, and `reduce()`

- **map()**: Apply a function to all items in an input list.

  ```python
  nums = [1, 2, 3, 4, 5]
  squares = list(map(lambda x: x ** 2, nums))
  print(squares)  # Output: [1, 4, 9, 16, 25]
  ```

- **filter()**: Filter items in an input list.

  ```python
  evens = list(filter(lambda x: x % 2 == 0, nums))
  print(evens)  # Output: [2, 4]
  ```

- **reduce()**: Apply a rolling computation to sequential pairs of values in a list.

  ```python
  from functools import reduce
  product = reduce(lambda x, y: x * y, nums)
  print(product)  # Output: 120
  ```

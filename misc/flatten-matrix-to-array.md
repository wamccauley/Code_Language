
We can flatten matrix to array simply by using a list comprehension:

```python
matrix = [[1, 3, 5, 7], [10, 11, 16, 20], [23, 30, 34, 60]]
array = [element for row in matrix for element in row]
print(array)
```

This will output:
```
[1, 3, 5, 7, 10, 11, 16, 20, 23, 30, 34, 60]
```

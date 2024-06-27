### While Loop

```python
i = 0
while i < 5:
    print(i)
    i += 1
```

- **break**: Exit the loop.

  ```python
  i = 0
  while i < 10:
      if i == 5:
          break
      print(i)
      i += 1
  ```

- **continue**: Skip the rest of the code in this iteration.

  ```python
  i = 0
  while i < 10:
      i += 1
      if i % 2 == 0:
          continue
      print(i)
  ```

#### While Loop Techniques

- **Combining with else**: The `else` block after a `while` loop executes when the loop condition becomes false.

  ```python
  i = 0
  while i < 5:
      print(i)
      i += 1
  else:
      print("Loop ended")
  ```

- **Simulating Do-While Loop**: Python doesn't have a do-while loop, but you can simulate it.

  ```python
  while True:
      print("This will execute at least once")
      if not condition:
          break
  ```

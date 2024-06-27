### Recursion

**Recursion** is a method where a function calls itself in order to solve a problem. Each recursive call should break down the problem into smaller instances until a base case is reached, ensuring termination.

```python
def factorial(n):
    if n == 1:  # Base case
        return 1
    else:
        return n * factorial(n - 1)  # Recursive call

print(factorial(5))  # Output: 120
```

#### Advanced Example: Fibonacci Series

Computing the nth Fibonacci number using recursion:

```python
def fibonacci(n):
    if n <= 0:
        raise ValueError("Fibonacci number is not defined for n <= 0")
    if n == 1 or n == 2:  # Base cases
        return 1
    else:
        return fibonacci(n - 1) + fibonacci(n - 2)  # Recursive calls

print(fibonacci(6))  # Output: 8
```

#### Recursion with Memoization

Optimizing the recursive Fibonacci function using memoization to store previously computed results.

```python
def fibonacci(n, memo={}):
    if n in memo:
        return memo[n]
    if n <= 0:
        raise ValueError("Fibonacci number is not defined for n <= 0")
    if n == 1 or n == 2:
        return 1
    memo[n] = fibonacci(n - 1, memo) + fibonacci(n - 2, memo)
    return memo[n]

print(fibonacci(50))  # Output: 12586269025
```

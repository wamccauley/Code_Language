
### Daily Temperatures

Given a list of daily temperatures \( \text{temperatures} \), return a list such that, for each day in the input, tells you how many days you would have to wait until a warmer temperature. If there is no future day for which this is possible, put \( 0 \) instead.

### Approach

**Monotonic Stack**

1. **Initialization**:
    - Create a list `answer` of the same length as `temperatures`, initialized with zeros.
    - Create an empty stack to store the indices of temperatures.

2. **Iterate through Temperatures**:
    - For each temperature, check the stack:
        - While the stack is not empty and the current temperature is greater than the temperature at the index stored at the top of the stack, pop the stack.
        - For each index popped from the stack, update the `answer` list at that index with the difference between the current index and the popped index.
    - Push the current index onto the stack.

3. **End Condition**:
    - The stack ensures that temperatures are processed in a way that maintains their indices in decreasing order, allowing for the correct calculation of days until a warmer temperature.

### Time Complexity

- The time complexity of this approach is \( O(n) \), where \( n \) is the length of the temperatures list. Each index is pushed and popped from the stack at most once.

```python
class Solution(object):
    def dailyTemperatures(self, temperatures):
        """
        :type temperatures: List[int]
        :rtype: List[int]
        """
        n = len(temperatures)
        answer = [0] * n
        stack = []

        for i in range(n):
            while stack and temperatures[i] > temperatures[stack[-1]]:
                idx = stack.pop()
                answer[idx] = i - idx
            stack.append(i)

        return answer
```

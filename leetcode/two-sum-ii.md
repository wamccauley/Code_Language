# Two Sum II

Given an array of integers that is already sorted in ascending order, find two numbers such that they add up to a specific target number. The function should return the indices of the two numbers (1-based index).

## Approach

### Two-Pointer Technique

1. **Initialization**:

   - Start with two pointers: one at the beginning (`pointer_1`) and one at the end (`pointer_2`) of the array.

2. **Iterate and Adjust Pointers**:

   - Check the sum of the elements at the two pointers:
     - If the sum equals the target, return the indices (adjusted to be 1-based).
     - If the sum is less than the target, move the left pointer (`pointer_1`) to the right to increase the sum.
     - If the sum is greater than the target, move the right pointer (`pointer_2`) to the left to decrease the sum.

3. **End Condition**:
   - The loop continues until the two pointers meet.

### Time Complexity

- The time complexity of this approach is \(O(n)\), where \(n\) is the length of the array. This is the optimal solution for this problem.

```python
class Solution(object):
    def twoSum(self, numbers, target):
        pointer_1 = 0
        pointer_2 = len(numbers) - 1

        while pointer_1 < pointer_2:
            if numbers[pointer_1] + numbers[pointer_2] == target:
                return [pointer_1 + 1, pointer_2 + 1]
            if numbers[pointer_1] + numbers[pointer_2] < target:
                pointer_1 += 1
            else:
                pointer_2 -= 1
```

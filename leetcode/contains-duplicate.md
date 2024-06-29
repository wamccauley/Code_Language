# Contains Duplicate

Given an array of integers `nums`, return `True` if any value appears at least twice in the array, and return `False` if every element is distinct.

### Example:

```python
nums = [1, 2, 3, 1]
# Output: True (because 1 appears twice)
```

## Solution

```python
class Solution(object):
    def containsDuplicate(self, nums):
        """
        :type nums: List[int]
        :rtype: bool
        """
        nums_set = set()  # Initialize an empty set to store seen numbers
        for num in nums:
            if num in nums_set:
                return True  # If the number is already in the set, return True
            nums_set.add(num)  # Add the number to the set if it's not already there
        return False  # If no duplicates are found, return False
```

### Explanation:

- **Time Complexity**: O(n)
- **Space Complexity**: O(n)

#### Steps:

1. **Initialization**: Create an empty set `nums_set` to store seen numbers.

2. **Iteration**: Iterate through each number `num` in the `nums` list using a `for` loop.

3. **Check for Duplicates**: For each `num`, check if it already exists in `nums_set`.
   - If `num` is found in `nums_set`, it means there is a duplicate in the original list `nums`, so return `True`.
4. **Add to Set**: If `num` is not found in `nums_set`, add it to the set using `nums_set.add(num)`.

5. **Return Default**: If the loop completes without finding any duplicates, return `False`.

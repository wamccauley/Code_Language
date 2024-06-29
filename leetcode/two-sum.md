# Two Sum

Given an array of integers `nums` and an integer `target`, return indices of the two numbers such that they add up to `target`.

You may assume that each input would have exactly one solution, and you may not use the same element twice.

### Example:

```python
nums = [2, 7, 11, 15]
target = 9
# Output: [0, 1] (because nums[0] + nums[1] = 2 + 7 = 9)
```

## Simple Approach: Nested Loops

```python
class Solution(object):
    def twoSum(self, nums, target):
        """
        :type nums: List[int]
        :type target: int
        :rtype: List[int]
        """
        for i in range(len(nums)):
            for j in range(len(nums)):
                if nums[i] + nums[j] == target:
                    return [i, j]
```

### Explanation:

- **Time Complexity**: O(n^2)
- **Space Complexity**: O(1)
- This approach checks every pair of indices `(i, j)` in `nums` to see if their elements sum up to `target`. It is inefficient for large arrays due to the nested loops.

## Optimized Approach: HashMap

```python
class Solution(object):
    def twoSum(self, nums, target):
        """
        :type nums: List[int]
        :type target: int
        :rtype: List[int]
        """
        nums_map = {}
        for i in range(len(nums)):
            current_number = nums[i]
            difference = target - current_number
            if difference in nums_map:
                return [nums_map[difference], i]
            nums_map[current_number] = i
        return []
```

### Explanation:

- **Time Complexity**: O(n)
- **Space Complexity**: O(n)
- This approach uses a hashmap (`nums_map`) to store seen numbers and their indices as it iterates through `nums`.
- For each `current_number`, it computes `difference = target - current_number` and checks if `difference` is already in `nums_map`.
- If found, it returns the indices stored in `nums_map`, otherwise, it stores `current_number` and its index in `nums_map`.
- This solution is much more efficient compared to the nested loop approach, especially for larger arrays.

# Contains Duplicate II

Given an array of integers `nums` and an integer `k`, return `True` if there are two distinct indices `i` and `j` in the array such that `nums[i]` equals `nums[j]` and the absolute difference between `i` and `j` is at most `k`.

### Example:

```python
nums = [1, 2, 3, 1]
k = 3
# Output: True (because nums[0] and nums[3] have the same value 1, and the difference between their indices is 3-0 = 3 <= k)
```

## Solution: Using HashMap

```python
class Solution(object):
    def containsNearbyDuplicate(self, nums, k):
        """
        :type nums: List[int]
        :type k: int
        :rtype: bool
        """
        nums_map = {}  # Initialize an empty dictionary to store seen numbers and their indices
        for i in range(len(nums)):
            if nums[i] in nums_map and abs(nums_map[nums[i]] - i) <= k:
                return True  # If the number exists in nums_map and its index difference is <= k, return True
            nums_map[nums[i]] = i  # Store the current number and its index in nums_map
        return False  # If no duplicates within k distance are found, return False
```

### Explanation:

- **Time Complexity**: O(n)
- **Space Complexity**: O(n)

#### Steps:

1. **Initialization**: Create an empty dictionary `nums_map` to store seen numbers (`nums[i]`) and their indices (`i`).

2. **Iteration**: Iterate through each number in `nums` using a `for` loop and index `i`.

3. **Check for Duplicates within `k` Distance**:

   - For each `nums[i]`, check if `nums[i]` already exists in `nums_map` and if the absolute difference between `nums_map[nums[i]]` (the index where `nums[i]` was first seen) and `i` is less than or equal to `k`.
   - If both conditions are met, return `True` indicating that there exists a pair of indices `i` and `j` such that `nums[i] == nums[j]` and `|i - j| <= k`.

4. **Store in HashMap**: If the conditions in step 3 are not met, store `nums[i]` and its index `i` in `nums_map` for future reference.

5. **Return Default**: If the loop completes without finding any duplicates within `k` distance, return `False`.

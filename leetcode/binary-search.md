
### Binary Search

Given a sorted array `nums`, return the index of `target` if it exists in the array, otherwise return `-1`.

### Approach

**Iterative Binary Search**

1. **Initialization**:
   - Initialize `left` to `0` and `right` to `len(nums) - 1` as the bounds of the search range.

2. **Binary Search**:
   - While `left` is less than or equal to `right`:
     - Calculate the `mid` index as `(left + right) // 2`.
     - Compare `nums[mid]` with `target`:
       - If they are equal, return `mid`.
       - If `nums[mid]` is greater than `target`, adjust `right` to `mid - 1` to search in the left half.
       - If `nums[mid]` is less than `target`, adjust `left` to `mid + 1` to search in the right half.

3. **Return Result**:
   - If `target` is not found after exiting the loop, return `-1`.

### Time Complexity

- The time complexity of this approach is \( O(\log n) \), where \( n \) is the number of elements in `nums`. The search space is halved in each iteration.

```python
class Solution:
    def search(self, nums: List[int], target: int) -> int:
        left, right = 0, len(nums) - 1

        while left <= right:
            mid = (left + right) // 2

            if nums[mid] == target:
                return mid
            elif nums[mid] > target:
                right = mid - 1
            else:
                left = mid + 1
        
        return -1
```

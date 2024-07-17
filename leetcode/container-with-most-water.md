
### Container With Most Water

Given \( n \) non-negative integers \( a_1, a_2, \ldots, a_n \), where each represents a point at coordinate \((i, a_i)\). \( n \) vertical lines are drawn such that the two endpoints of the line \( i \) are \((i, 0)\) and \((i, a_i)\). Find two lines, which together with the x-axis forms a container, such that the container contains the most water.

**Example**:
![[question_11.jpg]]

**Input:** height = [1,8,6,2,5,4,8,3,7]
**Output:** 49
**Explanation:** The above vertical lines are represented by array [1,8,6,2,5,4,8,3,7].

### Approach

**Two-Pointer Technique**

1. **Initialization**:
    - Start with two pointers, one at the beginning (`left`) and one at the end (`right`) of the array.
    - Initialize a variable `area` to keep track of the maximum area found.

2. **Iterate and Adjust Pointers**:
    - Calculate the area formed by the lines at the `left` and `right` pointers.
    - Update `area` with the maximum of the current `area` and the newly calculated area.
    - Move the pointer that points to the shorter line towards the center to potentially find a container with a larger area.

3. **End Condition**:
    - The loop continues until the two pointers meet.

### Time Complexity

- The time complexity of this approach is \( O(n) \), where \( n \) is the length of the array. This is the optimal solution for this problem.

```python
class Solution(object):
    def maxArea(self, height):
        """
        :type height: List[int]
        :rtype: int
        """
        area = 0
        left, right = 0, len(height) - 1

        while left < right:
            area = max(area, min(height[left], height[right]) * (right - left))
            if height[left] < height[right]:
                left += 1
            else:
                right -= 1

        return area
```

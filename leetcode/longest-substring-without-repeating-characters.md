
### Longest Substring Without Repeating Characters

Given a string `s`, find the length of the longest substring without repeating characters.

### Approach

**Sliding Window with HashMap**

1. **Initialization**:
    - Initialize variables `char_map` to store characters and their indices, `left` to track the start of the current substring, and `max_length` to store the maximum length found.

2. **Iterate through String**:
    - Use a sliding window defined by two pointers (`left` and `right`):
        - If the character at `right` is already in `char_map` and its index is greater than or equal to `left`, move `left` to `char_map[s[right]] + 1` to skip the repeated character.
        - Update `char_map` with the current character's index.
        - Update `max_length` with the maximum of its current value and the length of the current substring (`right - left + 1`).

3. **Return Result**:
    - After iterating through the string, `max_length` will contain the length of the longest substring without repeating characters.

### Time Complexity

- The time complexity of this approach is \( O(n) \), where \( n \) is the length of the string `s`. Each character is processed at most twice (once by each pointer).

```python
class Solution:
    def lengthOfLongestSubstring(self, s: str) -> int:
        n = len(s)
        if n == 0:
            return 0
        
        char_map = {}
        left = 0
        max_length = 0
        
        for right in range(n):
            if s[right] in char_map and char_map[s[right]] >= left:
                left = char_map[s[right]] + 1
            char_map[s[right]] = right
            max_length = max(max_length, right - left + 1)
        
        return max_length
```
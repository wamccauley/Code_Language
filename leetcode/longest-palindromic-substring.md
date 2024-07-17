
### Longest Palindromic Substring

Given a string `s`, return the longest palindromic substring in `s`.

### Approach

**Expand Around Center**

1. **Initialization**:
    - Create a variable `result` to store the longest palindromic substring found.
    - Create a variable `length` to store the length of the longest palindromic substring found.

2. **Iterate through Characters**:
    - For each character in the string:
        - Check for the longest palindromic substring with odd length centered at the current character.
            - Initialize two pointers `l` and `r` to the current character.
            - Expand the pointers outward while the characters at the pointers are equal and within bounds.
            - Update `result` and `length` if a longer palindromic substring is found.
        - Check for the longest palindromic substring with even length centered at the current character and the next character.
            - Initialize `l` to the current character and `r` to the next character.
            - Expand the pointers outward while the characters at the pointers are equal and within bounds.
            - Update `result` and `length` if a longer palindromic substring is found.

3. **Return Result**:
    - After iterating through the string, return the longest palindromic substring stored in `result`.

### Time Complexity

- The time complexity of this approach is \( O(n^2) \), where \( n \) is the length of the string. Each character is used as the center for potential palindromes, and the expansion around the center takes \( O(n) \) time.

```python
class Solution:
    def longestPalindrome(self, s: str) -> str:
        result = ""
        length = 0

        for i in range(len(s)):
            # odd length
            l, r = i, i
            while l >= 0 and r < len(s) and s[l] == s[r]:
                if (r - l + 1) > length:
                    result = s[l:r+1]
                    length = r - l + 1
                l -= 1
                r += 1
            # even length
            l, r = i, i + 1
            while l >= 0 and r < len(s) and s[l] == s[r]:
                if (r - l + 1) > length:
                    result = s[l:r+1]
                    length = r - l + 1
                l -= 1
                r += 1
        return result
```
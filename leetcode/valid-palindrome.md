
### Valid Palindrome

Given a string, determine if it is a palindrome, considering only alphanumeric characters and ignoring cases. The function should return a boolean indicating whether the input string is a palindrome.

### Approach

**String Manipulation and Two-Pointer Technique**

1. **Preprocessing**:
    - Convert the string to lowercase to make the check case-insensitive.
    - Remove all non-alphanumeric characters using a regular expression.

2. **Early Return**:
    - If the preprocessed string is empty or has a length of 1, it is considered a palindrome.

3. **Two-Pointer Technique**:
    - Initialize two pointers, one at the beginning (`i`) and one at the end (`len(s) - 1 - i`) of the string.
    - Iterate through the string until the middle is reached:
        - Compare the characters at the two pointers.
        - If the characters are not the same, return `False`.
    - If all characters match, return `True`.

### Time Complexity

- Preprocessing the string takes \(O(n)\) time, where \(n\) is the length of the input string.
- The two-pointer check also takes \(O(n)\) time.
- Therefore, the overall time complexity is \(O(n)\).

```python
import re

class Solution(object):
    def isPalindrome(self, s):
        """
        :type s: str
        :rtype: bool
        """
        s = s.lower()      
        s = re.sub(r'[^a-zA-Z\d]', '', s)

        if len(s) == 0 or len(s) == 1:
            return True

        for i in range(len(s)):
            if i == int(len(s) / 2):
                return True

            x = s[i]
            y = s[len(s) - 1 - i]
            
            if x != y:
                return False
        
        return True
```
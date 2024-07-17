
### Valid Parentheses

Given a string containing just the characters `'('`, `')'`, `'{'`, `'}'`, `'['`, and `']'`, determine if the input string is valid. An input string is valid if:

1. Open brackets are closed by the same type of brackets.
2. Open brackets are closed in the correct order.

### Approach

**Stack and Hash Map**

1. **Initialization**:
    - Create an empty stack to keep track of opening brackets.
    - Create a dictionary `matching_pairs` to map each closing bracket to its corresponding opening bracket.

2. **Iterate through Characters**:
    - For each character in the string:
        - If the character is a closing bracket (exists in `matching_pairs`):
            - Check if the stack is empty or the top of the stack is not the matching opening bracket. If true, return `False`.
            - Otherwise, pop the top of the stack.
        - If the character is an opening bracket, push it onto the stack.

3. **End Condition**:
    - After iterating through the string, if the stack is empty, return `True` (all opening brackets were matched correctly). Otherwise, return `False`.

### Time Complexity

- The time complexity of this approach is \( O(n) \), where \( n \) is the length of the string. Each character is processed once.

```python
class Solution:
    def isValid(self, s: str) -> bool:
        stack = []
        matching_pairs = {')': '(', '}': '{', ']': '['}
        
        for char in s:
            if char in matching_pairs:
                if not stack or stack[-1] != matching_pairs[char]:
                    return False
                stack.pop()
            else:
                stack.append(char)
        
        return not stack
```


### Group Anagrams

Given an array of strings, group anagrams together. The function should return a list of lists, where each list contains strings that are anagrams of each other.

### Approach

**Hash Map and Sorted Strings**

1. **Initialization**:
    - Create an empty list `result` to store the final grouped anagrams.
    - Create a dictionary `string_dict` to map sorted strings to their corresponding anagrams.

2. **Iterate through Strings**:
    - For each string in the input list:
        - Sort the string and use it as a key in `string_dict`.
        - If the sorted string is already a key in `string_dict`, append the original string to the list corresponding to that key.
        - If the sorted string is not a key, create a new key with the sorted string and set its value to a list containing the original string.

3. **Prepare the Result**:
    - Iterate through the dictionary and append each list of anagrams to the `result` list.

### Time Complexity

- Sorting each string takes \(O(k \log k)\) time, where \(k\) is the maximum length of a string in the input list.
- Iterating through the list of strings takes \(O(n)\) time, where \(n\) is the number of strings.
- Therefore, the overall time complexity is \(O(n \cdot k \log k)\).

```python
class Solution(object):
    def groupAnagrams(self, strs):
        """
        :type strs: List[str]
        :rtype: List[List[str]]
        """
        result = []
        string_dict = {}
        for i in range(len(strs)):
            current_string = strs[i]
            sorted_string = "".join(sorted(strs[i]))
            if sorted_string in string_dict:
                string_dict[sorted_string].append(current_string)
            else:
                string_dict[sorted_string] = [current_string]
        
        for key, value in string_dict.items():
            result.append(value)
        return result
```

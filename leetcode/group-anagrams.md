# Group Anagrams

Given an array of strings `strs`, group the anagrams together. You can return the answer in any order.

**Example:**

```python
Input: strs = ["eat", "tea", "tan", "ate", "nat", "bat"]
Output: [["bat"], ["nat", "tan"], ["ate", "eat", "tea"]]
```

**Note:**

- An Anagram is a word or phrase formed by rearranging the letters of a different word or phrase, typically using all the original letters exactly once.

#### High-Level Solution

To group anagrams, we need to find a way to uniquely identify strings that are anagrams of each other. An effective approach is to transform each string into a key that can be used to group anagrams together.

#### Detailed Solution

1. **Transformation**: Convert each string into a key that represents its character composition. Sorting the characters of the string is a straightforward way to achieve this.
2. **Grouping**: Use a dictionary (or hashmap) where the keys are the transformed strings and the values are lists of strings that are anagrams.
3. **Result Construction**: Iterate over the input list, transform each string, and add it to the appropriate group in the dictionary. The final result is the list of values from the dictionary.

#### Code

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

A better version would be:

```python
from collections import defaultdict

class Solution(object):
    def groupAnagrams(self, strs):
        """
        :type strs: List[str]
        :rtype: List[List[str]]
        """
        anagrams = defaultdict(list)
        for s in strs:
            sorted_string = "".join(sorted(s))
            anagrams[sorted_string].append(s)

        return list(anagrams.values())
```

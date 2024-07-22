
### Implement Trie (Prefix Tree)

A Trie (pronounced as "try") or prefix tree is a tree data structure used to efficiently store and retrieve keys in a dataset of strings. There are various applications of this data structure, such as autocomplete and spell checker.

### Approach

**Node Class**:
- The `Node` class represents each node in the Trie.
- It has a `children` dictionary to store its child nodes and a boolean `isLeaf` to mark the end of a word.

**Trie Class**:
- The `Trie` class provides methods to insert words, search for words, and check for prefixes.

1. **Initialization**:
   - Initialize the Trie with a root node which is an instance of the `Node` class.

2. **Insert**:
   - Traverse each letter of the word.
   - For each letter, check if it exists in the current node's children:
     - If not, create a new node and add it to the children.
   - Move to the next node.
   - Mark the end of the word by setting `isLeaf` to `True` for the last node.

3. **Search**:
   - Traverse each letter of the word.
   - For each letter, check if it exists in the current node's children:
     - If it does, move to the next node.
     - If it does not, return `False`.
   - Return `True` if the current node is marked as a leaf node, indicating the end of the word.

4. **StartsWith**:
   - Traverse each letter of the prefix.
   - For each letter, check if it exists in the current node's children:
     - If it does, move to the next node.
     - If it does not, return `False`.
   - Return `True` if the prefix exists in the Trie.

### Time Complexity

- Insertion and search operations have a time complexity of \( O(m) \), where \( m \) is the length of the word or prefix. This is because each operation requires traversing the length of the input word or prefix.

```python
class Node:
    def __init__(self):
        self.children = {}
        self.isLeaf = False

class Trie:

    def __init__(self):
        self.root = Node()

    def insert(self, word: str) -> None:
        if len(word) == 0:
            return
        current = self.root
        for letter in word.lower():
            if letter not in current.children:
                # create the children and add to hashmap
                current.children[letter] = Node()
            current = current.children[letter]
        current.isLeaf = True

    def search(self, word: str) -> bool:
        if len(word) == 0:
            return True
        current = self.root
        for letter in word.lower():
            if letter in current.children:
                current = current.children[letter]
            else:
                return False
        return current.isLeaf

    def startsWith(self, prefix: str) -> bool:
        if len(prefix) == 0:
            return True
        current = self.root
        for letter in prefix.lower():
            if letter in current.children:
                current = current.children[letter]
            else:
                return False
        return True

# Your Trie object will be instantiated and called as such:
# obj = Trie()
# obj.insert(word)
# param_2 = obj.search(word)
# param_3 = obj.startsWith(prefix)
```

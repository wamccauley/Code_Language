
### Maximum Depth of Binary Tree

Given the root of a binary tree, return its maximum depth. The maximum depth is the number of nodes along the longest path from the root node down to the farthest leaf node.

### Approach

**Depth-First Search (DFS)**

1. **Initialization**:
   - Check if `root` is `None`. If it is, return `0` since the tree is empty.

2. **Recursive DFS**:
   - Implement a helper function `dfs` to traverse the tree recursively.
   - For each node, calculate the depth of its left and right subtrees.
   - The depth of the current node is `1` plus the maximum depth of its left and right subtrees.

3. **Base Case**:
   - If the current node is `None`, return the `depth - 1` (to account for the extra increment before the leaf node).

### Time Complexity

- The time complexity of this approach is \( O(n) \), where \( n \) is the number of nodes in the tree. This is because each node is visited exactly once.

```python
# Definition for a binary tree node.
# class TreeNode:
#     def __init__(self, val=0, left=None, right=None):
#         self.val = val
#         self.left = left
#         self.right = right

class Solution:
    def maxDepth(self, root: Optional[TreeNode]) -> int:
        if not root:
            return 0
        return self.dfs(root, 1)

    def dfs(self, node: Optional[TreeNode], depth: int) -> int:
        if not node:
            return depth - 1

        left_depth = self.dfs(node.left, depth + 1)
        right_depth = self.dfs(node.right, depth + 1)

        return max(left_depth, right_depth)
```

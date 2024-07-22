### Invert Binary Tree

Given a binary tree, invert it such that the left and right children of every node are swapped.

### Approach

**Breadth-First Search (BFS)**

1. **Initialization**:
   - Begin with checking if `root` is `None`, returning `None` if so.

2. **BFS Traversal**:
   - Utilize a queue initialized with `root` for level-order traversal.
   - While the queue is not empty:
     - Dequeue the node from the front of the queue.
     - Swap its left and right children.
     - Enqueue the left and right children if they exist.

3. **Return Result**:
   - After traversal completes, return the modified `root`.

### Example

Consider the following binary tree:

```
     4
   /   \
  2     7
 / \   / \
1   3 6   9
```

After inverting:

```
     4
   /   \
  7     2
 / \   / \
9   6 3   1
```


### Time Complexity

- The time complexity of this approach is \( O(n) \), where \( n \) is the number of nodes in the binary tree. This is because each node is processed exactly once.

```python
class Solution:
    def invertTree(self, root: Optional[TreeNode]) -> Optional[TreeNode]:
        if root is None:
            return
        
        queue = [root]
        
        while queue:
            node = queue.pop(0)
            
            # Swap left and right children
            temp = node.left
            node.left = node.right
            node.right = temp
            
            # Enqueue left and right children if they exist
            if node.left:
                queue.append(node.left)
            if node.right:
                queue.append(node.right)
                
        return root
```

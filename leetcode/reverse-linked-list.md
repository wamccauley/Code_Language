
### Reverse Linked List

Reverse a singly linked list.

### Approach

**Iterative Approach**

1. **Initialization**:
    - Initialize `previous` to `None` to store the previous node in the reversed list.
    - Initialize `current` to `head` to traverse through the original list.
    - Start iterating from the `head` of the list.

2. **Iterative Reversal**:
    - While `current` is not `None`:
        - Save the `next_node` as `current.next` to avoid losing the reference to the next node.
        - Reverse the `current.next` pointer to point to `previous`.
        - Move `previous` one step forward to `current`.
        - Move `current` one step forward to `next_node`.

3. **Return Result**:
    - After exiting the loop, `previous` will be the new head of the reversed list. Return `previous`.

### Time Complexity

- The time complexity of this approach is \( O(n) \), where \( n \) is the number of nodes in the linked list. Each node's `next` pointer is adjusted exactly once.

```python
# Definition for singly-linked list.
# class ListNode:
#     def __init__(self, val=0, next=None):
#         self.val = val
#         self.next = next

class Solution:
    def reverseList(self, head: ListNode) -> ListNode:
        # if head is empty or has one element
        if head is None or head.next is None:
            return head

        previous = None
        current = head
        while current:
            next_node = current.next  # save the next node
            current.next = previous   # reverse the link
            previous = current        # move previous one step
            current = next_node       # move current one step
        
        return previous
```

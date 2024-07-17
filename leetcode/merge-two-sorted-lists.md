
### Merge Two Sorted Lists

Merge two sorted linked lists and return it as a new sorted list. The new list should be made by splicing together the nodes of the first two lists.

### Approach

**Iterative Approach**

1. **Initialization**:
    - Initialize a `dummy` node to simplify the code by avoiding edge cases when appending nodes.
    - Use `current` to point to the current node in the merged list, starting from `dummy`.

2. **Merge Process**:
    - While both `list1` and `list2` are not `None`:
        - Compare the values of the current nodes of `list1` and `list2`.
        - Append the smaller node to `current.next` and move `current` to `current.next`.
        - Move `list1` or `list2` forward depending on which node was appended.

3. **Handle Remaining Nodes**:
    - After exiting the loop, append the remaining nodes of `list1` or `list2` to the end of the merged list.

4. **Return Result**:
    - Return `dummy.next`, which points to the head of the merged sorted list.

### Time Complexity

- The time complexity of this approach is \( O(m + n) \), where \( m \) and \( n \) are the lengths of `list1` and `list2`, respectively. We iterate through each list once.

```python
class Solution:
    def mergeTwoLists(self, list1: Optional[ListNode], list2: Optional[ListNode]) -> Optional[ListNode]:
        dummy = ListNode(0)
        current = dummy

        while list1 and list2:
            if list1.val <= list2.val:
                current.next = list1
                list1 = list1.next
            else:
                current.next = list2
                list2 = list2.next
            current = current.next

        if list1:
            current.next = list1
        elif list2:
            current.next = list2

        return dummy.next
```

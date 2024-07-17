### Stacks

A stack is a linear data structure that follows the Last In First Out (LIFO) principle. The element added last is the first to be removed.

In Python, lists can be used to implement a stack. Lists provide append() and pop() methods.

#### Basic Operations
1. **Push**: Add an element to the top of the stack.
2. **Pop**: Remove the top element from the stack.
3. **Peek/Top**: Get the top element without removing it.
4. **IsEmpty**: Check if the stack is empty.
5. **Size**: Get the number of elements in the stack.

#### Implementation Using Lists

```python
class Stack:
    def __init__(self):
        self.stack = []

    def push(self, item):
        self.stack.append(item)

    def pop(self):
        if not self.is_empty():
            return self.stack.pop()
        return None

    def peek(self):
        if not self.is_empty():
            return self.stack[-1]
        return None

    def is_empty(self):
        return len(self.stack) == 0

    def size(self):
        return len(self.stack)

    def __str__(self):
        return str(self.stack)
```

##### Usage

```python
if __name__ == "__main__":
    s = Stack()
    s.push(1)
    s.push(2)
    s.push(3)
    print("Stack:", s)
    print("Top element:", s.peek())
    print("Stack size:", s.size())
    print("Popped element:", s.pop())
    print("Stack after pop:", s)
```

#### Implementation Using Linked Lists
A stack can also be implemented using a linked list, where the top of the stack is the head of the linked list.

##### Node Class

```python
class Node:
    def __init__(self, data):
        self.data = data
        self.next = None
```

##### Stack Class

```python
class StackLinkedList:
    def __init__(self):
        self.head = None
        self._size = 0

    def push(self, data):
        new_node = Node(data)
        new_node.next = self.head
        self.head = new_node
        self._size += 1

    def pop(self):
        if self.is_empty():
            return None
        popped_node = self.head
        self.head = self.head.next
        self._size -= 1
        return popped_node.data

    def peek(self):
        if self.is_empty():
            return None
        return self.head.data

    def is_empty(self):
        return self.head is None

    def size(self):
        return self._size

    def __str__(self):
        elements = []
        current = self.head
        while current:
            elements.append(current.data)
            current = current.next
        return str(elements)
```

##### Usage

```python
if __name__ == "__main__":
    s = StackLinkedList()
    s.push(1)
    s.push(2)
    s.push(3)
    print("Stack:", s)
    print("Top element:", s.peek())
    print("Stack size:", s.size())
    print("Popped element:", s.pop())
    print("Stack after pop:", s)
```
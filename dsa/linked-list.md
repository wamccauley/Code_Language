### Linked Lists

A linked list is a linear data structure in which elements are stored in nodes, and each node points to the next node in the sequence. Linked lists do not store elements in contiguous memory locations unlike arrays. This allows for efficient insertions and deletions as no shifting of elements is required.

#### Types of Linked Lists
1. **Singly Linked List**: Each node points to the next node.
2. **Doubly Linked List**: Each node points to both the next and the previous node.
3. **Circular Linked List**: The last node points to the first node, forming a circle.

#### Node Class

```python
class Node:
    def __init__(self, data):
        self.data = data
        self.next = None
```

#### Singly Linked List

```python
class SinglyLinkedList:
    def __init__(self):
        self.head = None
```

**2. Insertion**

- **At the Beginning**

```python
def insert_at_beginning(self, data):
    new_node = Node(data)
    new_node.next = self.head
    self.head = new_node
```

- **At the End**

```python
def insert_at_end(self, data):
    new_node = Node(data)
    if not self.head:
        self.head = new_node
        return
    current = self.head
    while current.next:
        current = current.next
    current.next = new_node
```

**3. Deletion**

- **From the Beginning**

```python
def delete_from_beginning(self):
    if not self.head:
        return
    self.head = self.head.next
```

- **From the End**

```python
def delete_from_end(self):
    if not self.head:
        return
    if not self.head.next:
        self.head = None
        return
    current = self.head
    while current.next.next:
        current = current.next
    current.next = None
```

**4. Traversal**

```python
def traverse(self):
    current = self.head
    while current:
        print(current.data, end=' -> ')
        current = current.next
    print('None')
```

#### Doubly Linked List

```python
class DoublyNode:
    def __init__(self, data):
        self.data = data
        self.next = None
        self.prev = None
```

##### Basic Operations

**1. Initialization**

```python
class DoublyLinkedList:
    def __init__(self):
        self.head = None
```

**2. Insertion**

- **At the Beginning**

```python
def insert_at_beginning(self, data):
    new_node = DoublyNode(data)
    if not self.head:
        self.head = new_node
        return
    new_node.next = self.head
    self.head.prev = new_node
    self.head = new_node
```

- **At the End**

```python
def insert_at_end(self, data):
    new_node = DoublyNode(data)
    if not self.head:
        self.head = new_node
        return
    current = self.head
    while current.next:
        current = current.next
    current.next = new_node
    new_node.prev = current
```

**3. Deletion**

- **From the Beginning**

```python
def delete_from_beginning(self):
    if not self.head:
        return
    if not self.head.next:
        self.head = None
        return
    self.head = self.head.next
    self.head.prev = None
```

- **From the End**

```python
def delete_from_end(self):
    if not self.head:
        return
    if not self.head.next:
        self.head = None
        return
    current = self.head
    while current.next:
        current = current.next
    current.prev.next = None
```

**4. Traversal**

```python
def traverse(self):
    current = self.head
    while current:
        print(current.data, end=' <-> ')
        current = current.next
    print('None')
```

#### Circular Linked List

```python
class CircularNode:
    def __init__(self, data):
        self.data = data
        self.next = None
```

##### Basic Operations

**1. Initialization**

```python
class CircularLinkedList:
    def __init__(self):
        self.head = None
```

**2. Insertion**

- **At the Beginning**

```python
def insert_at_beginning(self, data):
    new_node = CircularNode(data)
    if not self.head:
        self.head = new_node
        new_node.next = new_node
        return
    current = self.head
    while current.next != self.head:
        current = current.next
    new_node.next = self.head
    current.next = new_node
    self.head = new_node
```

- **At the End**

```python
def insert_at_end(self, data):
    new_node = CircularNode(data)
    if not self.head:
        self.head = new_node
        new_node.next = new_node
        return
    current = self.head
    while current.next != self.head:
        current = current.next
    current.next = new_node
    new_node.next = self.head
```

**3. Deletion**

- **From the Beginning**

```python
def delete_from_beginning(self):
    if not self.head:
        return
    if self.head.next == self.head:
        self.head = None
        return
    current = self.head
    while current.next != self.head:
        current = current.next
    current.next = self.head.next
    self.head = self.head.next
```

- **From the End**

```python
def delete_from_end(self):
    if not self.head:
        return
    if self.head.next == self.head:
        self.head = None
        return
    current = self.head
    while current.next.next != self.head:
        current = current.next
    current.next = self.head
```

**4. Traversal**

```python
def traverse(self):
    if not self.head:
        return
    current = self.head
    while True:
        print(current.data, end=' -> ')
        current = current.next
        if current == self.head:
            break
    print('(head)')
```

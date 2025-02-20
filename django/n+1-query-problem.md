### N+1 Query Problem

The **N+1 query problem** is a common performance issue in Django (and other ORM-based frameworks) that occurs when querying related objects inefficiently, leading to excessive database queries.

#### **What is the N+1 Query Problem?**
The issue arises when:
1. You fetch a set of objects from the database (`N` objects).
2. Then, you loop through them and access a related field, causing **one additional query per object**.

In total, this results in **N+1 queries** instead of an optimized **2 queries**.

---

Let's say we have two models:

```python
from django.db import models

class Author(models.Model):
    name = models.CharField(max_length=100)

class Book(models.Model):
    title = models.CharField(max_length=255)
    author = models.ForeignKey(Author, on_delete=models.CASCADE)
```

Now, consider the following inefficient query:

```python
books = Book.objects.all()  # Query 1

for book in books:
    print(book.author.name)  # One additional query per book (N queries)
```

### **How Many Queries?**
1 (Fetching all books)  
+ **N** (One for each book’s `author`)  
= **N+1 Queries** ❌ (Very inefficient!)

---

## **Fixing the N+1 Query Problem Using `select_related` and `prefetch_related`**
Django provides two key optimizations:

### **`select_related` (JOIN for ForeignKey & OneToOneField)**
```python
books = Book.objects.select_related("author")  # Single optimized query ✅

for book in books:
    print(book.author.name)  # No additional queries!
```
**How it works:**  
- Uses an SQL `JOIN` to fetch books and authors in **one query**.
- Best for **ForeignKey** and **OneToOneField** relationships.

### **`prefetch_related` (Separate Query for Many-to-Many & Reverse ForeignKey)**
If authors have multiple books, we use `prefetch_related`:

```python
authors = Author.objects.prefetch_related("book_set")  # Two queries ✅

for author in authors:
    print(author.book_set.all())  # Uses cached data, no extra queries
```
**How it works:**  
- Runs **two queries** (one for authors, one for books) but optimizes fetching.
- Best for **ManyToManyField** and **reverse ForeignKey** relationships.

---

## 🎯 **Performance Comparison**
| Query Type            | Number of Queries | Efficient? |
|-----------------------|------------------|------------|
| Naïve Query (N+1)    | 1 + N            | ❌ No      |
| `select_related`      | 1                | ✅ Yes     |
| `prefetch_related`    | 2                | ✅ Yes     |

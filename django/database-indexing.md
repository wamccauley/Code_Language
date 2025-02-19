### Database Indexing  

Database indexing is a crucial optimization technique in Django that enhances query performance by allowing the database to find and retrieve data faster. Instead of scanning entire tables, indexes enable efficient lookups, filtering, and sorting.  

#### 1. Understanding Indexing  

Indexes are special data structures that store a small subset of the table’s data, acting as a roadmap for the database to quickly locate rows. They work similarly to an index in a book, pointing to the exact location of relevant data without scanning the entire dataset.  

- **Without Indexing**: The database performs a full table scan, making queries slow.
- **With Indexing**: The database uses the index to jump directly to the required rows.

---

#### 2. Creating Indexes in Django Models  

Django automatically creates indexes for primary keys and unique fields. However, developers can explicitly define additional indexes for performance optimization.  

```python
from django.db import models

class Product(models.Model):
    name = models.CharField(max_length=255, db_index=True)  # Adds an index
    category = models.CharField(max_length=100)
    price = models.DecimalField(max_digits=10, decimal_places=2)
```

- `db_index=True` creates an index on the `name` field.
- Useful for columns used frequently in queries with filtering (`WHERE` clauses).  

---

#### 3. Composite (Multi-Column) Indexes  

When queries involve multiple columns, a **composite index** improves performance.  

```python
class Order(models.Model):
    user = models.ForeignKey("auth.User", on_delete=models.CASCADE)
    status = models.CharField(max_length=20)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        indexes = [
            models.Index(fields=["user", "status"]),  # Composite index
        ]
    ```

- This index speeds up queries like:  

  ```sql
  SELECT * FROM order WHERE user_id = 1 AND status = 'pending';
  ```

- Order of fields matters: `["user", "status"]` is different from `["status", "user"]`.  

---

#### 4. Unique Indexes  

Django automatically creates an index for `unique=True` fields.  

```python
class Customer(models.Model):
    email = models.EmailField(unique=True)  # Automatically indexed
```

This speeds up lookups for unique values like email addresses.  

---

#### 5. Indexing Foreign Keys  

Foreign keys are automatically indexed in Django. This helps with faster lookups in related tables.  

```python
class Comment(models.Model):
    user = models.ForeignKey("auth.User", on_delete=models.CASCADE)  # Indexed by default
    post = models.ForeignKey("Post", on_delete=models.CASCADE)  # Indexed by default
```

Indexes on foreign keys optimize queries like:  

```sql
SELECT * FROM comment WHERE user_id = 10;
```

However, for high-performance applications, consider manually adding indexes on frequently queried relationships.  

---

#### 6. Partial Indexes (Conditional Indexing)  

If only a subset of data is queried often, use **partial indexes** for better efficiency.  

```python
from django.contrib.postgres.indexes import Index

class Order(models.Model):
    status = models.CharField(max_length=20)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        indexes = [
            Index(fields=["created_at"], name="order_created_idx", condition=models.Q(status="completed"))
        ]
```

- This index is applied **only to rows where `status='completed'`**.
- Reduces index size and improves query performance.  

---

#### 7. Full-Text Search Indexing  

For text-based searches, use PostgreSQL’s **GIN (Generalized Inverted Index)** for full-text search.  

```python
from django.contrib.postgres.search import SearchVector
from django.db.models import Index

class BlogPost(models.Model):
    title = models.CharField(max_length=200)
    content = models.TextField()

    class Meta:
        indexes = [
            Index(fields=["title", "content"], name="search_idx", using="gin"),
        ]
```

This improves `SearchVector`-based queries like:  

```python
from django.contrib.postgres.search import SearchQuery

BlogPost.objects.annotate(
    search=SearchVector("title", "content")
).filter(search=SearchQuery("Django indexing"))
```

---

#### 8. Indexing JSON Fields (PostgreSQL Only)  

For JSON data stored in PostgreSQL, **GIN indexes** significantly improve lookup speed.  

```python
from django.contrib.postgres.indexes import GinIndex

class EventLog(models.Model):
    data = models.JSONField()

    class Meta:
        indexes = [
            GinIndex(fields=["data"]),
        ]
```

Optimized query:  

```python
EventLog.objects.filter(data__contains={"user_id": 10})
```

This allows fast searches within JSON fields.  

---

#### 9. Performance Impact of Indexing  

While indexes improve read performance, they come with trade-offs:  

| Factor | Impact |
|--------|--------|
| **Read Speed** | ✅ Faster queries |
| **Write Speed** | ❌ Slower inserts & updates |
| **Storage** | ❌ Indexes take extra disk space |

Use indexes **only when necessary**—excessive indexing can slow down inserts and updates.  

---

#### 10. Checking Index Usage  

To analyze whether indexes are being used, enable SQL logging in Django:  

```python
from django.db import connection

def debug_query():
    queryset = MyModel.objects.filter(field="value")
    print(queryset.query)  # Prints the raw SQL query

debug_query()
```

Alternatively, use **EXPLAIN ANALYZE** in PostgreSQL:  

```sql
EXPLAIN ANALYZE SELECT * FROM product WHERE name = 'Laptop';
```

It shows if the query is using an index or performing a full table scan.  

---

#### 11. Manually Creating Indexes in Database  

Django migrations generate indexes automatically. However, indexes can also be created manually.  

Example for PostgreSQL:  

```sql
CREATE INDEX my_index ON product(name);
```

For dropping an index:  

```sql
DROP INDEX my_index;
```

---

#### 12. Removing Unused Indexes  

Unused indexes slow down writes and take up space. To list indexes in PostgreSQL:  

```sql
SELECT indexname, tablename FROM pg_indexes WHERE schemaname = 'public';
```

Drop unnecessary indexes:  

```sql
DROP INDEX unused_index;
```

This keeps the database lean and fast.  

### QuerySets

A `QuerySet` is created by accessing the `objects` attribute of a model. The most common way to create a `QuerySet` is by using methods like `all()`, `filter()`, and `exclude()`.

##### Example of Creating a QuerySet

Retrieve all instances of the `Author` model:

```python
authors = Author.objects.all()
```

- `Author.objects.all()` returns a `QuerySet` containing all `Author` instances.

#### Lazy Evaluation

QuerySets are lazy, meaning they are not evaluated until you explicitly request the data. This allows for efficient chaining of filters and other operations without hitting the database multiple times.

##### Example of Lazy Evaluation

```python
# No database query yet
authors = Author.objects.all()

# Database query happens here
for author in authors:
    print(author.name)
```

#### Common QuerySet Methods

Here are some common QuerySet methods you will use frequently:

##### `all()`

Returns all objects in the QuerySet.

```python
authors = Author.objects.all()
```

##### `filter()`

Returns a new QuerySet containing objects that match the given lookup parameters.

```python
authors_named_john = Author.objects.filter(name='John')
```

##### `exclude()`

Returns a new QuerySet containing objects that do not match the given lookup parameters.

```python
authors_not_named_john = Author.objects.exclude(name='John')
```

##### `order_by()`

Returns a new QuerySet ordered by the given field(s).

```python
authors_ordered_by_name = Author.objects.order_by('name')
```

##### `distinct()`

Returns a new QuerySet with duplicate records removed.

```python
distinct_authors = Author.objects.distinct()
```

##### `values()`

Returns a `QuerySet` that returns dictionaries, rather than model instances, when iterated over.

```python
author_names = Author.objects.values('name')
```

##### `values_list()`

Similar to `values()`, but returns tuples instead of dictionaries.

```python
author_names = Author.objects.values_list('name', flat=True)
```

##### `count()`

Returns the number of objects in the QuerySet.

```python
author_count = Author.objects.count()
```

##### `exists()`

Returns `True` if the QuerySet contains any results, otherwise `False`.

```python
has_authors = Author.objects.exists()
```

#### Using Slicing with QuerySets

You can use Python's array-slicing syntax to limit QuerySets.

```python
first_ten_authors = Author.objects.all()[:10]
```

- Retrieves the first ten authors.

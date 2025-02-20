### Complex Lookups

#### Using Q Objects

`Q` objects provide a way to build complex queries by combining multiple conditions with logical operators (`&` for AND, `|` for OR, and `~` for NOT). `Q` objects can be used in methods like `filter()`, `exclude()`, and `get()`.

Suppose you have an `Author` model and you want to retrieve authors named 'John' or born after January 1, 2000:

```python
from django.db.models import Q

# Retrieve authors named 'John' or born after January 1, 2000
authors = Author.objects.filter(Q(name='John') | Q(birth_date__gt='2000-01-01'))
```

- `Q(name='John') | Q(birth_date__gt='2000-01-01')` constructs a query to match either condition.

#### Combining Q Objects

You can combine multiple `Q` objects using the `&` and `|` operators to create more complex queries.

Retrieve authors named 'John' and born after January 1, 2000:

```python
# Retrieve authors named 'John' and born after January 1, 2000
authors = Author.objects.filter(Q(name='John') & Q(birth_date__gt='2000-01-01'))
```

- `Q(name='John') & Q(birth_date__gt='2000-01-01')` constructs a query to match both conditions.

#### Negating Q Objects

You can negate `Q` objects using the `~` operator to exclude specific conditions.

Retrieve authors not named 'John':

```python
# Retrieve authors not named 'John'
authors = Author.objects.filter(~Q(name='John'))
```

- `~Q(name='John')` constructs a query to exclude authors named 'John'.

#### Complex Lookups with Relationships

Django's ORM allows you to perform complex lookups involving related models using double underscores (`__`) to traverse relationships.

Suppose you have `Book` and `Author` models where a book has a foreign key to an author. Retrieve books written by authors named 'John':

```python
# Retrieve books written by authors named 'John'
books_by_john = Book.objects.filter(author__name='John')
```

- `author__name='John'` traverses the `author` relationship to filter books based on the author's name.

#### Using Aggregation with Complex Lookups

Aggregation functions can be combined with complex lookups to perform calculations on subsets of data.

Suppose you have an `Order` model with a foreign key to a `Customer` model and you want to calculate the total value of orders for customers from 'New York':

```python
from django.db.models import Sum

# Calculate total order value for customers from New York
total_value = Order.objects.filter(customer__city='New York').aggregate(Sum('total_amount'))
```

- `customer__city='New York'` filters orders based on the customer's city.
- `aggregate(Sum('total_amount'))` calculates the total value of the filtered orders.

#### Combining Multiple Complex Lookups

You can combine multiple complex lookups to handle intricate querying scenarios.

Suppose you have an `Article` model with a foreign key to an `Author` model, and you want to retrieve articles published in 2021 by authors named 'John' or who have more than 5 articles:

```python
# Retrieve articles published in 2021 by authors named 'John' or who have more than 5 articles
articles = Article.objects.filter(
    Q(author__name='John') |
    Q(author__articles__count__gt=5),
    published_date__year=2021
)
```

- `Q(author__name='John') | Q(author__articles__count__gt=5)` constructs a query to match either author condition.
- `published_date__year=2021` filters articles based on the publication year.

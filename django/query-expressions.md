### Query Expressions

#### F Expressions

`F` expressions provide a way to reference model field values directly in queries, allowing you to perform operations between fields and update fields based on their current values.

Suppose you have a `Book` model with a `num_pages` field, and you want to increase the number of pages by 10 for all books:

```python
from django.db.models import F

# Increment num_pages by 10 for all books
Book.objects.update(num_pages=F('num_pages') + 10)
```

- `F('num_pages') + 10` references the current value of `num_pages` and adds 10 to it.

Retrieve books where the number of pages is greater than the number of chapters:

```python
# Retrieve books with num_pages greater than num_chapters
books_with_more_pages = Book.objects.filter(num_pages__gt=F('num_chapters'))
```

- `F('num_chapters')` references the `num_chapters` field for comparison.

#### Annotating QuerySets

The `annotate()` method allows you to add calculated fields to your QuerySets, enabling you to perform complex aggregations and computations.

Suppose you have a `Sales` model with `quantity` and `price` fields, and you want to calculate the total sales value for each sale:

```python
from django.db.models import F, Sum

# Annotate total sales value for each sale
sales_with_total_value = Sales.objects.annotate(total_value=F('quantity') * F('price'))
```

- `F('quantity') * F('price')` calculates the total value of each sale.

#### Conditional Expressions

Conditional expressions (`Case` and `When`) allow you to create conditional logic in your queries, similar to SQL `CASE` statements.

##### Using Conditional Expressions

Suppose you have an `Employee` model with a `salary` field, and you want to give a 10% bonus to employees with a salary above $50,000 and a 5% bonus to others:

```python
from django.db.models import Case, When, F

# Annotate with conditional bonus
employees_with_bonus = Employee.objects.annotate(
    bonus=Case(
        When(salary__gt=50000, then=F('salary') * 0.10),
        default=F('salary') * 0.05,
        output_field=models.FloatField(),
    )
)
```

- `Case` and `When` create conditional logic to calculate the bonus based on the salary.

#### Value Expressions

Value expressions (`Value`) allow you to include literal values in your queries.

Retrieve all authors and annotate them with a literal value:

```python
from django.db.models import Value

# Annotate authors with a literal value
authors_with_status = Author.objects.annotate(status=Value('active', output_field=models.CharField()))
```

- `Value('active')` includes the literal value 'active' in the query results.

#### Combining Expressions

You can combine multiple expressions to create complex queries.

Suppose you have an `Order` model with `quantity` and `unit_price` fields, and you want to calculate the total cost for each order and filter orders with a total cost above $100:

```python
from django.db.models import F, Sum, Q

# Calculate total cost and filter orders
orders_with_high_cost = Order.objects.annotate(total_cost=F('quantity') * F('unit_price')).filter(total_cost__gt=100)
```

- `F('quantity') * F('unit_price')` calculates the total cost for each order.
- `filter(total_cost__gt=100)` filters orders with a total cost above $100.

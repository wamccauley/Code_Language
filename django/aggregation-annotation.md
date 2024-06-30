### Aggregation and Annotation

#### Aggregation

Aggregation functions compute a single value based on a set of input values. You can use these functions to calculate values such as sums, averages, and counts.

##### Common Aggregation Functions

- `Sum`: Calculates the sum of values.
- `Avg`: Calculates the average of values.
- `Count`: Counts the number of values.
- `Max`: Finds the maximum value.
- `Min`: Finds the minimum value.

##### Example of Aggregation

Suppose you have an `Order` model with a `total_amount` field, and you want to calculate the total sales:

```python
from django.db.models import Sum

# Calculate total sales
total_sales = Order.objects.aggregate(Sum('total_amount'))
# Output: {'total_amount__sum': 12345.67}
```

- `aggregate(Sum('total_amount'))` calculates the sum of the `total_amount` field for all orders.

#### Annotation

Annotation allows you to add calculated fields to each object in a QuerySet. This is useful for adding summary data to each record.

##### Example of Annotation

Suppose you have an `Author` model with a related `Book` model, and you want to annotate each author with the number of books they have written:

```python
from django.db.models import Count

# Annotate each author with the number of books they have written
authors_with_book_count = Author.objects.annotate(book_count=Count('book'))
for author in authors_with_book_count:
    print(f"{author.name} has written {author.book_count} books.")
```

- `annotate(book_count=Count('book'))` adds a `book_count` field to each author with the number of related books.

#### Combining Aggregation and Annotation

You can combine aggregation and annotation to perform complex calculations and add multiple calculated fields.

##### Example of Combining Aggregation and Annotation

Suppose you have an `Order` model with a related `Customer` model, and you want to annotate each customer with their total order amount and the average order amount:

```python
from django.db.models import Sum, Avg

# Annotate each customer with their total and average order amounts
customers_with_order_stats = Customer.objects.annotate(
    total_order_amount=Sum('order__total_amount'),
    average_order_amount=Avg('order__total_amount')
)
for customer in customers_with_order_stats:
    print(f"{customer.name} has a total order amount of {customer.total_order_amount} and an average order amount of {customer.average_order_amount}.")
```

- `annotate(total_order_amount=Sum('order__total_amount'), average_order_amount=Avg('order__total_amount'))` adds fields to each customer with their total and average order amounts.

#### Grouping Data with Aggregation

You can use `values()` or `values_list()` to group data before applying aggregation functions.

##### Example of Grouping Data

Suppose you have an `Order` model with a `product` field and you want to calculate the total sales for each product:

```python
from django.db.models import Sum

# Group by product and calculate total sales for each product
sales_by_product = Order.objects.values('product').annotate(total_sales=Sum('total_amount'))
for sale in sales_by_product:
    print(f"Product: {sale['product']}, Total Sales: {sale['total_sales']}")
```

- `values('product')` groups the data by product.
- `annotate(total_sales=Sum('total_amount'))` calculates the total sales for each product.

#### Conditional Aggregation

You can use `Case` and `When` expressions to perform conditional aggregation.

##### Example of Conditional Aggregation

Suppose you have an `Order` model with a `status` field and you want to calculate the total sales for completed orders:

```python
from django.db.models import Sum, Case, When, IntegerField

# Calculate total sales for completed orders
total_completed_sales = Order.objects.aggregate(
    completed_sales=Sum(
        Case(
            When(status='completed', then='total_amount'),
            default=0,
            output_field=IntegerField()
        )
    )
)
# Output: {'completed_sales': 9876.54}
```

- `Case` and `When` expressions are used to conditionally sum the `total_amount` field for completed orders.

### Aggregation and Annotation

#### Aggregation

Aggregation functions compute a single value based on a set of input values. You can use these functions to calculate values such as sums, averages, and counts.

##### Common Aggregation Functions

- `Sum`: Calculates the sum of values.
- `Avg`: Calculates the average of values.
- `Count`: Counts the number of values.
- `Max`: Finds the maximum value.
- `Min`: Finds the minimum value.

##### Aggregation

Suppose you have an `Order` model with a `total_amount` field, and you want to calculate the total sales:

```python
from django.db.models import Sum

# Calculate total sales
total_sales = Order.objects.aggregate(Sum('total_amount'))
# Output: {'total_amount__sum': 12345.67}
```

#### Combining Aggregation and Annotation

You can combine aggregation and annotation to perform complex calculations and add multiple calculated fields.

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

#### Grouping Data with Aggregation

You can use `values()` or `values_list()` to group data before applying aggregation functions.

Suppose you have an `Order` model with a `product` field and you want to calculate the total sales for each product:

```python
from django.db.models import Sum

# Group by product and calculate total sales for each product
sales_by_product = Order.objects.values('product').annotate(total_sales=Sum('total_amount'))
for sale in sales_by_product:
    print(f"Product: {sale['product']}, Total Sales: {sale['total_sales']}")
```

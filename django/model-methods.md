### Model Methods

Model methods allows you to add custom methods inside models for additional logic.

#### Creating Model Methods

To create a method on a Django model, define a function within the model class. Model methods can access and operate on the model's attributes and perform computations based on instance data.

#### Example of Model Methods

##### Example 1: Calculating Total Price

```python
class Order(models.Model):
    product = models.CharField(max_length=100)
    quantity = models.IntegerField()
    unit_price = models.DecimalField(max_digits=10, decimal_places=2)

    def total_price(self):
        return self.quantity * self.unit_price
```

In this example:

- `total_price()` calculates the total price by multiplying `quantity` with `unit_price`.

##### Example 2: Formatting Data

```python
from django.utils.text import slugify

class BlogPost(models.Model):
    title = models.CharField(max_length=100)
    content = models.TextField()

    def slug(self):
        return slugify(self.title)
```

- `slug()` generates a URL-friendly slug from the `title` of the blog post using `slugify()`.

#### Use Cases for Model Methods

- **Data Manipulation:** Calculate derived fields, perform data transformations.
- **Business Logic:** Implement business rules related to the model's data.
- **Integration:** Format data for external systems or APIs.
- **Complex Queries:** Encapsulate complex database queries related to the model.

## Model Meta Options

#### Introduction

`Meta` options allow you to control various aspects of a model's behavior that aren't related to the data stored in the model fields themselves.

#### Common Meta Options

##### `ordering`

- **Usage:** Specifies the default ordering of records retrieved from the database.
- **Example:**

  ```python
  class Product(models.Model):
      name = models.CharField(max_length=100)
      price = models.DecimalField(max_digits=10, decimal_places=2)

      class Meta:
          ordering = ['-price']
  ```

  - Orders `Product` instances by `price` in descending order (`-price`).

##### `verbose_name` and `verbose_name_plural`

- **Usage:** Customizes the human-readable name of the model in the Django admin interface.
- **Example:**

  ```python
  class Product(models.Model):
      name = models.CharField(max_length=100)

      class Meta:
          verbose_name = 'Product'
          verbose_name_plural = 'Products'
  ```

  - Sets `Product` as the singular and plural name displayed in the admin interface.

##### `db_table`

- **Usage:** Specifies the database table name for the model.
- **Example:**

  ```python
  class Customer(models.Model):
      name = models.CharField(max_length=100)

      class Meta:
          db_table = 'app_customers'
  ```

  - Defines the database table name as `app_customers` instead of the default `app_customer`.

##### `unique_together`

- **Usage:** Ensures that combinations of fields are unique across records.
- **Example:**

  ```python
  class Order(models.Model):
      customer = models.ForeignKey(Customer, on_delete=models.CASCADE)
      product = models.ForeignKey(Product, on_delete=models.CASCADE)
      quantity = models.IntegerField()

      class Meta:
          unique_together = ['customer', 'product']
  ```

  - Ensures that each combination of `customer` and `product` is unique in the `Order` model.

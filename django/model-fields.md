### Model Fields

#### Common Model Fields

##### CharField

- **Usage:** Stores a fixed-length string.
- **Example:**
  ```python
  class Person(models.Model):
      name = models.CharField(max_length=100)
  ```

##### TextField

- **Usage:** Stores large amounts of text.
- **Example:**
  ```python
  class Article(models.Model):
      content = models.TextField()
  ```

##### IntegerField, FloatField, DecimalField

- **Usage:** Stores numeric data.
- **Examples:**
  ```python
  class Product(models.Model):
      quantity = models.IntegerField()
      price = models.DecimalField(max_digits=10, decimal_places=2)  # Precise price storage
      rating = models.FloatField()
  ```
- `FloatField` is a Django model field used to store floating-point numbers. It's a wrapper around Python’s float type.
- If precision is crucial (e.g., for money calculations), you should use DecimalField.
- Django automatically uses Python’s Decimal type from the decimal module for storing and handling values. Example on Decimal type:
```python
from decimal import Decimal
n = Decimal('0.1')
print(n)
```

##### BooleanField

- **Usage:** Stores boolean (True/False) values.
- **Example:**
  ```python
  class Task(models.Model):
      completed = models.BooleanField(default=False)
  ```

##### DateField, DateTimeField

- **Usage:** Stores dates and date-time information.
- **Examples:**
  ```python
  class Event(models.Model):
      event_date = models.DateField()
      event_datetime = models.DateTimeField(auto_now_add=True)
  ```

Note: `auto_now_add` automatically adds the date. If you want to change the timezone used by Django's `auto_now_add` feature from UTC to another timezone, you need to configure Django's timezone settings appropriately in your settings file (`settings.py`):

1. **Set Timezone in `settings.py`:** Ensure your desired timezone is set in your Django project settings:

   ```python
   TIME_ZONE = 'America/New_York'
   ```

2. **Enable Timezone Support:** Ensure that Django's timezone support is enabled by setting `USE_TZ` to `True` in your `settings.py` file:

   ```python
   USE_TZ = True
   ```

##### FileField, ImageField

- **Usage:** Handles file and image uploads.
- **Example:**
  ```python
  class Document(models.Model):
      doc_file = models.FileField(upload_to='documents/')
      image_file = models.ImageField(upload_to='images/')
  ```
  - `doc_file` stores uploaded documents.
  - `image_file` stores uploaded images.

##### AutoField, BigAutoField

- **Usage:** Auto incremented field.
- **Example:**
  ```python
  class Document(models.Model):
      id = models.BigAutoField(primary_key=True)
  ```

##### BigIntegerField

- **Usage:** BigInt field.
- **Example:**
  ```python
  class Document(models.Model):
      id = models.BigIntegerField(primary_key=True)
  ```

##### ForeignKey, OneToOneField, ManyToManyField

- **Usage:** Defines relationships between models.
- **Examples:**

  ```python
  class Author(models.Model):
      name = models.CharField(max_length=100)

  class Book(models.Model):
      title = models.CharField(max_length=100)
      author = models.ForeignKey(Author, on_delete=models.CASCADE)
  ```
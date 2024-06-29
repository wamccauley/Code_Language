### Model Fields

#### Introduction

Model fields in Django define the type of data a model's attribute can hold. Django provides a wide range of built-in fields to cover various data types and relationships between models.

#### Common Model Fields

##### CharField

- **Usage:** Stores a fixed-length string.
- **Example:**
  ```python
  class Person(models.Model):
      name = models.CharField(max_length=100)
  ```
  Here, `name` is a `CharField` that can store up to 100 characters.

##### TextField

- **Usage:** Stores large amounts of text.
- **Example:**
  ```python
  class Article(models.Model):
      content = models.TextField()
  ```
  The `content` field in this `Article` model can store large text content.

##### IntegerField, FloatField, DecimalField

- **Usage:** Stores numeric data.
- **Examples:**
  ```python
  class Product(models.Model):
      quantity = models.IntegerField()
      price = models.DecimalField(max_digits=10, decimal_places=2)
  ```
  - `quantity` is an `IntegerField` storing whole numbers.
  - `price` is a `DecimalField` storing decimal numbers with up to 10 digits and 2 decimal places.

##### BooleanField

- **Usage:** Stores boolean (True/False) values.
- **Example:**
  ```python
  class Task(models.Model):
      completed = models.BooleanField(default=False)
  ```
  The `completed` field in the `Task` model indicates whether a task is completed (`True`) or not (`False` by default).

##### DateField, DateTimeField

- **Usage:** Stores dates and date-time information.
- **Examples:**
  ```python
  class Event(models.Model):
      event_date = models.DateField()
      event_datetime = models.DateTimeField(auto_now_add=True)
  ```
  - `event_date` stores a date.
  - `event_datetime` stores both date and time information.

Note: `auto_now_add` automatically adds the date. If you want to change the timezone used by Django's `auto_now_add` feature from UTC to another timezone, you need to configure Django's timezone settings appropriately in your settings file (`settings.py`):

1. **Set Timezone in `settings.py`:** First, ensure your desired timezone is set in your Django project settings. For example, if you want to set the timezone to 'America/New_York':

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

  - `author` in the `Book` model is a `ForeignKey` to the `Author` model, establishing a many-to-one relationship (many books can have one author).

#### More Field Options

Django model fields support various options to customize their behavior:

- `null` and `blank`: Control whether a field allows NULL values in the database and whether it's required in forms.
- `default`: Sets a default value for the field if none is provided.
- `choices`: Defines a set of choices for the field.
- `verbose_name` and `help_text`: Customize the field's display name and provide help text in forms.

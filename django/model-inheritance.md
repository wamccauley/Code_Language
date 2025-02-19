### Model Inheritance

#### Types of Model Inheritance

##### Abstract Base Classes

- **Usage:** Abstract base classes are used when you only want to define common fields and methods for other models to inherit, without creating database tables for the base class itself.
- **Example:**

  ```python
  class CommonInfo(models.Model):
      name = models.CharField(max_length=100)
      age = models.IntegerField()

      class Meta:
          abstract = True

  class Student(CommonInfo):
      student_id = models.CharField(max_length=10)
  ```

  - `CommonInfo` serves as an abstract base class with `name` and `age` fields, and `Student` inherits these fields along with its own `student_id` field.

##### Multi-table Inheritance

- **Usage:** Multi-table inheritance creates a new database table for each child model while keeping a link between them using a one-to-one relationship.
- **Example:**

  ```python
  class Place(models.Model):
      name = models.CharField(max_length=100)
      address = models.CharField(max_length=200)

  class Restaurant(Place):
      serves_hot_dogs = models.BooleanField(default=False)
  ```

  - `Restaurant` inherits all fields from `Place` and adds its own `serves_hot_dogs` field, with Django creating a one-to-one link between `Place` and `Restaurant`.

##### Proxy Models

- **Usage:** Proxy models allow you to create a new Python class that acts as an alias to an existing model, providing a different Python interface to the same database table.
- **Example:**

  ```python
  class MyModel(models.Model):
      field1 = models.CharField(max_length=100)

  class MyModelProxy(MyModel):
      class Meta:
          proxy = True
  ```

  - `MyModelProxy` is a proxy model that behaves like `MyModel` but can have different methods or customizations without affecting the database schema.

### Writing and Running Tests  

#### 1. Introduction to Testing in Django  

Django comes with a built-in testing framework based on **Python’s `unittest` module**. Tests help verify that code works as expected and prevent regressions when making changes.  

Tests are written inside a Django app, typically in `tests.py`, or within a dedicated `tests/` directory.  

---

#### 2. Setting Up Tests  

By default, Django creates a test database before running tests. This ensures tests don’t affect the production database.  

To create tests, import Django’s `TestCase` class:  

```python
from django.test import TestCase
from myapp.models import Item

class ItemTestCase(TestCase):
    def setUp(self):
        Item.objects.create(name="Laptop", price=1200)
        Item.objects.create(name="Phone", price=800)

    def test_item_names(self):
        """Test that item names are stored correctly"""
        laptop = Item.objects.get(name="Laptop")
        phone = Item.objects.get(name="Phone")
        self.assertEqual(laptop.name, "Laptop")
        self.assertEqual(phone.name, "Phone")
```

---

#### 3. Running Tests  

Run all tests using:  

```bash
python manage.py test
```

Run tests for a specific app:  

```bash
python manage.py test myapp
```

Run a specific test case:  

```bash
python manage.py test myapp.tests.ItemTestCase
```

Run a specific test method:  

```bash
python manage.py test myapp.tests.ItemTestCase.test_item_names
```

To see detailed output, use the `-v` flag:  

```bash
python manage.py test -v 2
```

---

#### 4. Writing Test Cases  

Django provides `TestCase`, `SimpleTestCase`, `TransactionTestCase`, and `LiveServerTestCase` for different testing needs.  

##### a) Model Tests  

Testing models ensures database interactions work correctly.  

```python
from django.test import TestCase
from myapp.models import Product

class ProductModelTest(TestCase):
    def setUp(self):
        self.product = Product.objects.create(name="Keyboard", price=50)

    def test_product_str(self):
        """Test the string representation of the model"""
        self.assertEqual(str(self.product), "Keyboard")

    def test_product_price(self):
        """Ensure product price is stored correctly"""
        self.assertEqual(self.product.price, 50)
```

##### b) View Tests  

Testing views ensures that URLs return the expected responses.  

```python
from django.test import TestCase
from django.urls import reverse
from myapp.models import Product

class ProductViewTest(TestCase):
    def setUp(self):
        self.product = Product.objects.create(name="Mouse", price=20)

    def test_product_list_view(self):
        response = self.client.get(reverse("product-list"))
        self.assertEqual(response.status_code, 200)
        self.assertContains(response, "Mouse")

    def test_product_detail_view(self):
        response = self.client.get(reverse("product-detail", args=[self.product.id]))
        self.assertEqual(response.status_code, 200)
        self.assertContains(response, "Mouse")
```

##### c) Form Tests  

Testing forms ensures validation and processing work as expected.  

```python
from django.test import TestCase
from myapp.forms import ProductForm

class ProductFormTest(TestCase):
    def test_valid_form(self):
        form = ProductForm(data={"name": "Monitor", "price": 200})
        self.assertTrue(form.is_valid())

    def test_invalid_form(self):
        form = ProductForm(data={"name": "", "price": -10})
        self.assertFalse(form.is_valid())
```

---

#### 5. Using Assertions  

Django’s `TestCase` includes many useful assertions:  

- `assertEqual(a, b)`: Check if `a == b`.  
- `assertNotEqual(a, b)`: Check if `a != b`.  
- `assertTrue(x)`: Check if `x is True`.  
- `assertFalse(x)`: Check if `x is False`.  
- `assertIsNone(x)`: Check if `x is None`.  
- `assertContains(response, text)`: Check if `text` is in response content.  
- `assertRedirects(response, url)`: Check if a view redirects correctly.  

Example:  

```python
def test_product_price(self):
    self.assertEqual(self.product.price, 50)
    self.assertNotEqual(self.product.price, 100)
```

---

#### 6. Using `setUpTestData`  

For performance improvements, use `setUpTestData()` instead of `setUp()`. It runs only once per test class instead of before every test method.  

```python
class ProductTestCase(TestCase):
    @classmethod
    def setUpTestData(cls):
        cls.product = Product.objects.create(name="Tablet", price=300)

    def test_product_name(self):
        self.assertEqual(self.product.name, "Tablet")
```

---

#### 7. Skipping Tests  

Sometimes, tests need to be skipped. Use `@unittest.skip` decorators:  

```python
from django.test import TestCase
import unittest

class MyTests(TestCase):
    @unittest.skip("Skipping this test temporarily")
    def test_todo_feature(self):
        self.assertEqual(1, 1)

    @unittest.expectedFailure
    def test_failing_case(self):
        self.assertEqual(1, 2)  # This will be marked as expected failure
```

---

#### 8. Measuring Test Coverage  

To ensure all code paths are tested, use **coverage.py**:  

```bash
pip install coverage
coverage run manage.py test
coverage report -m
```

For an HTML report:  

```bash
coverage html
open htmlcov/index.html
```

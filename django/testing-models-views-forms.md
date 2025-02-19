### Testing Models, Views, and Forms  

#### 1. Testing Models  

Model tests ensure that database operations, model methods, and constraints work as expected.  

##### a) Testing Model Creation  

```python
from django.test import TestCase
from myapp.models import Product

class ProductModelTest(TestCase):
    def test_create_product(self):
        product = Product.objects.create(name="Laptop", price=1200)
        self.assertEqual(product.name, "Laptop")
        self.assertEqual(product.price, 1200)
```

##### b) Testing Model Methods  

```python
class Product(models.Model):
    name = models.CharField(max_length=255)
    price = models.DecimalField(max_digits=10, decimal_places=2)

    def apply_discount(self, percent):
        discount = (self.price * percent) / 100
        return self.price - discount

class ProductMethodTest(TestCase):
    def test_apply_discount(self):
        product = Product.objects.create(name="Monitor", price=200)
        self.assertEqual(product.apply_discount(10), 180)
```

##### c) Testing Model Constraints  

```python
from django.db.utils import IntegrityError

class ProductConstraintTest(TestCase):
    def test_name_cannot_be_blank(self):
        with self.assertRaises(IntegrityError):
            Product.objects.create(name="", price=100)
```

##### d) Using `factory_boy` for Model Testing  

```python
import factory
from myapp.models import Product

class ProductFactory(factory.django.DjangoModelFactory):
    class Meta:
        model = Product

    name = factory.Faker("word")
    price = factory.Faker("random_int", min=10, max=1000)

class ProductFactoryTest(TestCase):
    def test_product_creation(self):
        product = ProductFactory()
        self.assertIsNotNone(product.id)
```

---

#### 2. Testing Views  

View tests check if endpoints return expected responses, enforce permissions, and handle user authentication correctly.  

##### a) Testing a Simple View  

```python
from django.test import TestCase
from django.urls import reverse

class HomeViewTest(TestCase):
    def test_homepage(self):
        response = self.client.get(reverse("home"))
        self.assertEqual(response.status_code, 200)
```

##### b) Testing a View with Authentication  

```python
from django.contrib.auth.models import User

class DashboardViewTest(TestCase):
    def setUp(self):
        self.user = User.objects.create_user(username="testuser", password="pass")

    def test_redirect_if_not_logged_in(self):
        response = self.client.get(reverse("dashboard"))
        self.assertRedirects(response, "/accounts/login/?next=/dashboard/")

    def test_dashboard_accessible_to_logged_in_users(self):
        self.client.login(username="testuser", password="pass")
        response = self.client.get(reverse("dashboard"))
        self.assertEqual(response.status_code, 200)
```

##### c) Testing a POST Request  

```python
from myapp.models import Product

class ProductCreateViewTest(TestCase):
    def test_create_product(self):
        response = self.client.post(reverse("product_create"), {"name": "Keyboard", "price": 50})
        self.assertEqual(response.status_code, 302)  # Redirect after success
        self.assertTrue(Product.objects.filter(name="Keyboard").exists())
```

##### d) Testing API Views with `APITestCase`  

For Django Rest Framework (DRF) views, use `APITestCase`.  

```python
from rest_framework.test import APITestCase
from rest_framework import status

class ProductAPITest(APITestCase):
    def test_get_products(self):
        response = self.client.get(reverse("product-list"))
        self.assertEqual(response.status_code, status.HTTP_200_OK)
```

##### e) Mocking External API Calls in Views  

```python
from unittest.mock import patch

class ExternalAPITest(TestCase):
    @patch("myapp.views.requests.get")
    def test_external_api_call(self, mock_get):
        mock_get.return_value.json.return_value = {"data": "test"}
        response = self.client.get(reverse("external-api"))
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json(), {"data": "test"})
```

---

#### 3. Testing Forms  

Form tests ensure that validation rules, required fields, and custom logic work correctly.  

##### a) Testing a Valid Form  

```python
from django.test import TestCase
from myapp.forms import ProductForm

class ProductFormTest(TestCase):
    def test_valid_form(self):
        form = ProductForm(data={"name": "Mouse", "price": 30})
        self.assertTrue(form.is_valid())
```

##### b) Testing an Invalid Form  

```python
class ProductInvalidFormTest(TestCase):
    def test_invalid_form(self):
        form = ProductForm(data={"name": "", "price": "invalid"})
        self.assertFalse(form.is_valid())
        self.assertIn("name", form.errors)
        self.assertIn("price", form.errors)
```

##### c) Testing a Form with Custom Validation  

```python
class DiscountForm(forms.Form):
    price = forms.DecimalField()
    
    def clean_price(self):
        price = self.cleaned_data["price"]
        if price <= 0:
            raise forms.ValidationError("Price must be positive.")
        return price

class DiscountFormTest(TestCase):
    def test_price_validation(self):
        form = DiscountForm(data={"price": -10})
        self.assertFalse(form.is_valid())
        self.assertIn("price", form.errors)
```

---

#### 4. Running Tests  

Run all tests:  

```bash
python manage.py test
```

Run specific tests:  

```bash
python manage.py test myapp.tests.ProductModelTest
python manage.py test myapp.tests.ProductViewTest
```  

Use `pytest` for better output:  

```bash
pytest -v
```
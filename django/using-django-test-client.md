### Using the Django Test Client  

#### 1. Instantiating the Test Client  

```python
from django.test import Client, TestCase

class BasicTestClient(TestCase):
    def setUp(self):
        self.client = Client()

    def test_homepage(self):
        response = self.client.get("/")
        self.assertEqual(response.status_code, 200)
```

The `Client` instance behaves like a lightweight browser, allowing GET, POST, PUT, DELETE, and PATCH requests.  

---

#### 2. Making GET Requests  

```python
class GetRequestTest(TestCase):
    def test_get_homepage(self):
        response = self.client.get("/")
        self.assertEqual(response.status_code, 200)
        self.assertContains(response, "Welcome")
```

- `assertContains(response, "Welcome")` ensures the response contains specific content.  
- `assertEqual(response.status_code, 200)` confirms the page loads correctly.  

---

#### 3. Making POST Requests  

```python
class PostRequestTest(TestCase):
    def test_post_product(self):
        response = self.client.post("/add-product/", {"name": "Laptop", "price": 1200})
        self.assertEqual(response.status_code, 302)  # Redirect after success
```

- `client.post(url, data, format)` simulates form submissions.  
- `302` indicates a redirect, often after successful form submission.  

---

#### 4. Testing Views with Authentication  

##### a) Logging in a User  

```python
from django.contrib.auth.models import User

class AuthTestCase(TestCase):
    def setUp(self):
        self.user = User.objects.create_user(username="testuser", password="securepassword")

    def test_login(self):
        login = self.client.login(username="testuser", password="securepassword")
        self.assertTrue(login)
```

- `client.login(username, password)` logs in a user without using the UI.  

##### b) Testing Protected Views  

```python
class ProtectedViewTest(TestCase):
    def test_protected_page_redirects(self):
        response = self.client.get("/dashboard/")
        self.assertEqual(response.status_code, 302)  # Redirect to login page
```

- If a view requires authentication, an unauthenticated request should trigger a redirect.  

##### c) Accessing a View as a Logged-in User  

```python
class AuthenticatedUserTest(TestCase):
    def setUp(self):
        self.user = User.objects.create_user(username="testuser", password="securepassword")
        self.client.login(username="testuser", password="securepassword")

    def test_dashboard_accessible(self):
        response = self.client.get("/dashboard/")
        self.assertEqual(response.status_code, 200)
```

---

#### 5. Testing API Endpoints with Django Test Client  

For Django Rest Framework (DRF), use `APITestCase`.  

```python
from rest_framework.test import APITestCase
from rest_framework import status

class APIClientTest(APITestCase):
    def test_get_products(self):
        response = self.client.get("/api/products/")
        self.assertEqual(response.status_code, status.HTTP_200_OK)
```

---

#### 6. Sending Custom Headers  

Use `HTTP_` prefix for headers in requests.  

```python
class HeaderTestCase(TestCase):
    def test_custom_header(self):
        response = self.client.get("/", HTTP_USER_AGENT="Mozilla/5.0")
        self.assertEqual(response.status_code, 200)
```

---

#### 7. Handling Sessions with the Test Client  

Sessions can be modified directly using `client.session`.  

```python
class SessionTestCase(TestCase):
    def test_session_variable(self):
        session = self.client.session
        session["cart_items"] = 5
        session.save()

        response = self.client.get("/cart/")
        self.assertContains(response, "Items in Cart: 5")
```

---

#### 8. Using `follow=True` for Redirects  

```python
class RedirectTest(TestCase):
    def test_redirect(self):
        response = self.client.get("/dashboard/", follow=True)
        self.assertRedirects(response, "/accounts/login/?next=/dashboard/")
```

- `follow=True` allows automatic following of redirects.  

---

#### 9. Testing CSRF Protection  

Django’s test client disables CSRF protection by default. To enable it:  

```python
from django.test import Client

class CSRFSecurityTest(TestCase):
    def setUp(self):
        self.client = Client(enforce_csrf_checks=True)

    def test_csrf_protected_post(self):
        response = self.client.post("/submit-form/", {"name": "John"})
        self.assertEqual(response.status_code, 403)  # CSRF token missing
```

- `enforce_csrf_checks=True` forces CSRF validation.  

---

#### 10. Uploading Files  

```python
from django.core.files.uploadedfile import SimpleUploadedFile

class FileUploadTest(TestCase):
    def test_upload_image(self):
        file = SimpleUploadedFile("test.jpg", b"file_content", content_type="image/jpeg")
        response = self.client.post("/upload/", {"image": file})
        self.assertEqual(response.status_code, 200)
```

- `SimpleUploadedFile` mocks file uploads in tests.  

---

#### 11. Running Test Client in Live Server  

Use `LiveServerTestCase` for real HTTP requests.  

```python
from django.test import LiveServerTestCase
import requests

class LiveServerTest(LiveServerTestCase):
    def test_live_server(self):
        response = requests.get(self.live_server_url + "/")
        self.assertEqual(response.status_code, 200)
```

### Profiling and Monitoring  

Profiling and monitoring in Django are essential for identifying performance bottlenecks, optimizing queries, and ensuring smooth application behavior in production. This includes analyzing database queries, CPU/memory usage, and request processing times.  

## 1. Profiling Database Queries  

### **1.1 Logging Queries in Django**  
Django provides built-in logging for SQL queries. You can enable it in your settings:  

```python
# settings.py
LOGGING = {
    "version": 1,
    "disable_existing_loggers": False,
    "handlers": {
        "console": {
            "class": "logging.StreamHandler",
        },
    },
    "loggers": {
        "django.db.backends": {
            "level": "DEBUG",
            "handlers": ["console"],
        },
    },
}
```

This prints all SQL queries executed by Django in the console.  

### **1.2 Query Debugging with `django.db.connection`**  
To analyze queries programmatically:  

```python
from django.db import connection

def debug_queries():
    queryset = MyModel.objects.filter(name="Django")
    print(queryset.query)  # Prints the raw SQL query
    print(connection.queries)  # Prints the list of executed queries

debug_queries()
```

---

## 2. Profiling with `django-debug-toolbar`  

`django-debug-toolbar` is a powerful tool for profiling Django applications.  

### **2.1 Installation**  

```sh
pip install django-debug-toolbar
```

### **2.2 Configuration**  

```python
# settings.py
INSTALLED_APPS += ["debug_toolbar"]

MIDDLEWARE += ["debug_toolbar.middleware.DebugToolbarMiddleware"]

INTERNAL_IPS = ["127.0.0.1"]  # Enable toolbar only for local development
```

### **2.3 Using the Toolbar**  

Once configured, `django-debug-toolbar` appears in the browser, showing:  
✅ Query execution times  
✅ Number of queries per request  
✅ Slow queries  
✅ Cache hits/misses  

---

## 3. Profiling Python Code Execution  

### **3.1 Using `cProfile`**  

`cProfile` is a built-in Python module for profiling execution times.  

```python
import cProfile

def slow_function():
    sum([i**2 for i in range(10**6)])

cProfile.run("slow_function()")
```

This prints execution time per function call.  

### **3.2 Using `line_profiler` for Function-Level Profiling**  

Install `line_profiler`:  

```sh
pip install line-profiler
```

Example usage:  

```python
from line_profiler import LineProfiler

def my_function():
    for i in range(1000000):
        _ = i ** 2

profiler = LineProfiler()
profiler.add_function(my_function)
profiler.enable()
my_function()
profiler.disable()
profiler.print_stats()
```

This helps identify slow lines of code.

---

## 4. Monitoring Performance in Production  

### **4.1 Using `django-silk` for Request Profiling**  

[`django-silk`](https://github.com/jazzband/django-silk) provides request profiling and SQL query analysis.  

#### **Installation**  

```sh
pip install django-silk
```

#### **Configuration**  

```python
INSTALLED_APPS += ["silk"]
MIDDLEWARE += ["silk.middleware.SilkyMiddleware"]
```

Visit `/silk/` to view logs.  

### **4.2 Using `New Relic` for Advanced Monitoring**  

New Relic provides deep performance monitoring for Django apps.  

```sh
pip install newrelic
```

To run the server with New Relic monitoring:  

```sh
newrelic-admin run-program gunicorn myapp.wsgi
```

---

## 5. Monitoring Logs with `Sentry`  

[Sentry](https://sentry.io/) is a popular logging tool for tracking performance and errors.  

### **5.1 Installing Sentry**  

```sh
pip install sentry-sdk
```

### **5.2 Configuring Django with Sentry**  

```python
import sentry_sdk
from sentry_sdk.integrations.django import DjangoIntegration

sentry_sdk.init(
    dsn="YOUR_SENTRY_DSN",
    integrations=[DjangoIntegration()],
    traces_sample_rate=1.0,  # Set lower in production
)
```

Sentry logs errors and performance bottlenecks automatically.  

---

## 6. Load Testing with `locust`  

[`locust`](https://locust.io/) helps simulate heavy loads and measure response times.  

### **6.1 Installing Locust**  

```sh
pip install locust
```

### **6.2 Writing a Locust Test**  

Create a `locustfile.py`:  

```python
from locust import HttpUser, task, between

class MyLoadTest(HttpUser):
    wait_time = between(1, 5)

    @task
    def test_homepage(self):
        self.client.get("/")
```

Run the test:  

```sh
locust -f locustfile.py
```

Visit `http://localhost:8089` to simulate traffic.  

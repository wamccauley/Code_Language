### Working with Databases (Other than SQLite)

#### Configuring a Database in Django

Django supports multiple relational database management systems (RDBMS) apart from SQLite, including **PostgreSQL, MySQL, MariaDB, and Oracle**. To switch from SQLite to another database, the database settings in `settings.py` must be updated.

##### Example: Configuring PostgreSQL

```python
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': 'mydatabase',
        'USER': 'mydatabaseuser',
        'PASSWORD': 'mypassword',
        'HOST': 'localhost',  # Set to the server's IP or domain in production
        'PORT': '5432',       # Default PostgreSQL port
    }
}
```

##### Installing PostgreSQL Adapter

Before using PostgreSQL, install `psycopg2`:

```bash
pip install psycopg2
```

For better performance, install `psycopg2-binary`:

```bash
pip install psycopg2-binary
```

---

#### Configuring MySQL

For MySQL or MariaDB, use the appropriate engine:

```python
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.mysql',
        'NAME': 'mydatabase',
        'USER': 'mydatabaseuser',
        'PASSWORD': 'mypassword',
        'HOST': 'localhost',
        'PORT': '3306',  # Default MySQL/MariaDB port
    }
}
```

##### Installing MySQL Adapter

```bash
pip install mysqlclient
```

For an alternative, use `PyMySQL`:

```bash
pip install PyMySQL
```

Then, add this to `__init__.py` in the project folder:

```python
import pymysql
pymysql.install_as_MySQLdb()
```

---

#### Running Migrations for the New Database

After configuring the database, run:

```bash
python manage.py migrate
```

This creates necessary tables for Django’s built-in apps like authentication, sessions, and admin.

---

#### Creating and Managing Database Users

**PostgreSQL User Creation**
```sql
CREATE USER mydatabaseuser WITH PASSWORD 'mypassword';
ALTER ROLE mydatabaseuser SET client_encoding TO 'utf8';
ALTER ROLE mydatabaseuser SET default_transaction_isolation TO 'read committed';
ALTER ROLE mydatabaseuser SET timezone TO 'UTC';
GRANT ALL PRIVILEGES ON DATABASE mydatabase TO mydatabaseuser;
```

**MySQL User Creation**
```sql
CREATE USER 'mydatabaseuser'@'localhost' IDENTIFIED BY 'mypassword';
GRANT ALL PRIVILEGES ON mydatabase.* TO 'mydatabaseuser'@'localhost';
FLUSH PRIVILEGES;
```

---

#### Connecting to Remote Databases

For a remote PostgreSQL database, set `HOST` to the server’s IP or domain:

```python
'HOST': 'db.example.com',
'PORT': '5432',
```

For a remote MySQL database:

```python
'HOST': 'db.example.com',
'PORT': '3306',
```

Ensure the database server allows external connections by modifying `pg_hba.conf` (PostgreSQL) or `mysqld.cnf` (MySQL).

---

#### Using Environment Variables for Database Credentials

Hardcoding database credentials in `settings.py` is insecure. Instead, use environment variables:

```python
import os

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': os.getenv('DB_NAME'),
        'USER': os.getenv('DB_USER'),
        'PASSWORD': os.getenv('DB_PASSWORD'),
        'HOST': os.getenv('DB_HOST', 'localhost'),
        'PORT': os.getenv('DB_PORT', '5432'),
    }
}
```

Set these variables in `.env`:

```
DB_NAME=mydatabase
DB_USER=mydatabaseuser
DB_PASSWORD=mypassword
DB_HOST=localhost
DB_PORT=5432
```

Use **`django-environ`** to manage `.env` files:

```bash
pip install django-environ
```

Modify `settings.py`:

```python
import environ

env = environ.Env()
environ.Env.read_env()

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': env('DB_NAME'),
        'USER': env('DB_USER'),
        'PASSWORD': env('DB_PASSWORD'),
        'HOST': env('DB_HOST', default='localhost'),
        'PORT': env('DB_PORT', default='5432'),
    }
}
```

---

#### Database Connection Pooling

For better performance, use **pgbouncer** (PostgreSQL) or **MySQL connection pooling**.

Example with `pgbouncer`:

```python
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': 'mydatabase',
        'USER': 'mydatabaseuser',
        'PASSWORD': 'mypassword',
        'HOST': 'localhost',
        'PORT': '6432',  # pgbouncer default port
        'CONN_MAX_AGE': 600,  # Keep connection alive for 10 minutes
    }
}
```

For MySQL:

```python
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.mysql',
        'OPTIONS': {
            'read_default_file': '/etc/mysql/my.cnf',
        },
    }
}
```

---

#### Using Multiple Databases

Django supports multiple databases using the `DATABASES` dictionary.

```python
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': 'default_db',
        'USER': 'default_user',
        'PASSWORD': 'default_password',
        'HOST': 'localhost',
        'PORT': '5432',
    },
    'replica': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': 'replica_db',
        'USER': 'replica_user',
        'PASSWORD': 'replica_password',
        'HOST': 'replica_host',
        'PORT': '5432',
    },
}
```

##### Routing Queries Between Databases

Define a `database_router.py`:

```python
class MyDatabaseRouter:
    def db_for_read(self, model, **hints):
        """Send read queries to the replica database."""
        return 'replica'

    def db_for_write(self, model, **hints):
        """Send write queries to the default database."""
        return 'default'

    def allow_relation(self, obj1, obj2, **hints):
        return True

    def allow_migrate(self, db, app_label, model_name=None, **hints):
        return True
```

Add this in `settings.py`:

```python
DATABASE_ROUTERS = ['myapp.database_router.MyDatabaseRouter']
```

---

#### Running Raw SQL Queries

While Django’s ORM is powerful, raw SQL can be used when necessary.

##### Executing a Raw Query

```python
from django.db import connection

with connection.cursor() as cursor:
    cursor.execute("SELECT * FROM myapp_mymodel")
    rows = cursor.fetchall()
```

##### Parameterized Queries to Prevent SQL Injection

```python
cursor.execute("SELECT * FROM myapp_mymodel WHERE id = %s", [1])
```

---

#### Using PostgreSQL-Specific Features

PostgreSQL provides advanced features like JSON fields, full-text search, and GIS support.

##### Using JSON Fields

```python
from django.db import models

class Product(models.Model):
    name = models.CharField(max_length=255)
    metadata = models.JSONField()
```

##### Full-Text Search

```python
from django.contrib.postgres.search import SearchVector
from myapp.models import Product

Product.objects.annotate(search=SearchVector('name')).filter(search='laptop')
```

##### PostgreSQL Indexing for Performance

```python
class Product(models.Model):
    name = models.CharField(max_length=255, db_index=True)
```

For **GIN Index on JSON Fields**:

```python
from django.contrib.postgres.indexes import GinIndex

class Product(models.Model):
    metadata = models.JSONField()

    class Meta:
        indexes = [GinIndex(fields=['metadata'])]
```
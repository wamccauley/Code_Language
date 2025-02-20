### Model Migrations

When you make changes in your models, these changes are not reflected to the database. When you make migrations, it reflects these changes, ensuring that the database structure get alongside the Django application without manual intervention or data loss.

#### Generating Migrations

To create a migration for model changes, use the `makemigrations` command, which analyzes your models and creates migration files that describe the changes to be applied to your database.

Suppose you have a `Product` model and decide to add a new field `description`:

1. Define the new field in your model:

   ```python
   class Product(models.Model):
       name = models.CharField(max_length=100)
       price = models.DecimalField(max_digits=10, decimal_places=2)
       description = models.TextField()
   ```

2. Generate a migration for the new field:
   ```bash
   python manage.py makemigrations
   ```
   This command generates a migration file in your app's `migrations` directory.

#### Applying Migrations

Once migrations are generated, use the `migrate` command to apply them to your database. This command runs through all the migrations and updates the database schema to match the current state of your models.

To apply the migration created in the previous step:

1. Apply migrations to the database:
   ```bash
   python manage.py migrate
   ```
   Django applies the new migration, creating or altering the `description` field in the `Product` table.

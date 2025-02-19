### Model Methods

Model methods can be categorized into different types:  

- **Instance Methods** (custom methods defined in the model)  
- **Class Methods** (usually using `@classmethod`)  
- **Static Methods** (using `@staticmethod`)  
- **Manager Methods** (customized queries using `objects`)  
- **Django Built-in Methods** (like `save()`, `delete()`, etc.)  

### **Example Django Model with Various Methods**  

```python
from django.db import models
from django.utils import timezone

class Product(models.Model):
    name = models.CharField(max_length=255)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    stock = models.IntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    # 1. Instance Method
    def is_in_stock(self):
        """Returns True if stock is available"""
        return self.stock > 0

    # 2. Class Method
    @classmethod
    def expensive_products(cls, min_price):
        """Returns queryset of products above a certain price"""
        return cls.objects.filter(price__gte=min_price)

    # 3. Static Method
    @staticmethod
    def discount_price(price, discount):
        """Calculate the discounted price"""
        return price - (price * (discount / 100))

    # 4. Overriding save()
    def save(self, *args, **kwargs):
        """Ensure price is always positive before saving"""
        if self.price < 0:
            raise ValueError("Price cannot be negative")
        super().save(*args, **kwargs)

    # 5. Overriding delete()
    def delete(self, *args, **kwargs):
        """Override delete to prevent deletion if stock is available"""
        if self.stock > 0:
            raise ValueError("Cannot delete a product that is still in stock")
        super().delete(*args, **kwargs)

    def __str__(self):
        return self.name

# 6. Custom Manager
class ProductManager(models.Manager):
    def in_stock(self):
        """Returns only products that are in stock"""
        return self.filter(stock__gt=0)

    def out_of_stock(self):
        """Returns only products that are out of stock"""
        return self.filter(stock=0)

# Using the custom manager
Product.objects = ProductManager()
```

### **Usage of These Methods**
```python
# Creating an instance
product = Product(name="Laptop", price=1200.00, stock=5)
product.save()

# Instance Method
print(product.is_in_stock())  # True

# Class Method
expensive_items = Product.expensive_products(500)
print(expensive_items)  # Queryset of products priced >= 500

# Static Method
discounted_price = Product.discount_price(1000, 10)  # 10% discount
print(discounted_price)  # 900.0

# Manager Method
in_stock_products = Product.objects.in_stock()
out_of_stock_products = Product.objects.out_of_stock()
```
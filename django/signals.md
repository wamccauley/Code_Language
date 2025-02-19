### Signals  

#### Understanding Django Signals  

Django signals allow decoupled applications to get notified when certain actions or events occur within the system. A signal is sent when an event takes place (like saving a model or user authentication), and a receiver function listens to and processes that event.

Signals enable components of an application to communicate with each other without being tightly coupled. For example, a signal can notify another part of the system when a user is created, allowing you to trigger actions like sending welcome emails or updating other records.

##### Components of Signals  
1. **Signal**: The event that is triggered. Signals are instances of the `django.db.models.signals.Signal` class.  
2. **Receiver**: A function or method that listens for signals and performs an action in response. Receivers are usually connected to signals.  
3. **Sender**: The component or model that sends the signal.  

##### How Signals Work  
1. The sender triggers the signal.  
2. The signal looks for all connected receivers.  
3. Each receiver function is called, and the event is handled.  
4. The event can be processed or ignored based on the receiver’s logic.  

#### Using Django’s Built-in Signals  

Django provides several built-in signals that are commonly used in applications. These signals are part of the `django.db.models.signals` module and are often used for handling events like saving and deleting model instances, or user authentication.

##### Example: Model Signals  

Django signals such as `pre_save`, `post_save`, `pre_delete`, and `post_delete` are automatically triggered when a model’s instance is saved or deleted.  

**pre_save**  
- Sent just before a model’s `save()` method is called.  
- Can be used to modify data before it’s saved.  

```python
from django.db.models.signals import pre_save
from django.dispatch import receiver
from myapp.models import MyModel

@receiver(pre_save, sender=MyModel)
def my_model_pre_save(sender, instance, **kwargs):
    print("Before saving:", instance)
    if not instance.name:
        instance.name = "Default Name"
```

- `pre_save` is called just before `MyModel.save()`. You can alter the instance data before it’s stored in the database.  

**post_save**  
- Sent after a model’s `save()` method is called.  
- Commonly used for tasks like updating related models or sending notifications.  

```python
from django.db.models.signals import post_save
from django.dispatch import receiver
from myapp.models import MyModel

@receiver(post_save, sender=MyModel)
def my_model_post_save(sender, instance, created, **kwargs):
    if created:
        print("New instance created:", instance)
    else:
        print("Instance updated:", instance)
```

- `post_save` is called after the object is saved. It’s often used to trigger actions like sending an email or updating related data. The `created` argument indicates whether the instance was newly created or updated.  

**pre_delete**  
- Sent before a model’s `delete()` method is called.  
- Allows performing cleanup or validation before the object is deleted.  

```python
from django.db.models.signals import pre_delete
from django.dispatch import receiver
from myapp.models import MyModel

@receiver(pre_delete, sender=MyModel)
def my_model_pre_delete(sender, instance, **kwargs):
    print("About to delete:", instance)
```

- `pre_delete` is triggered just before the instance is deleted from the database. It can be used to log or cancel the deletion if needed.  

**post_delete**  
- Sent after a model’s `delete()` method is called.  
- Typically used to clean up related objects or data.  

```python
from django.db.models.signals import post_delete
from django.dispatch import receiver
from myapp.models import MyModel

@receiver(post_delete, sender=MyModel)
def my_model_post_delete(sender, instance, **kwargs):
    print("Deleted instance:", instance)
```

- `post_delete` runs after the model is deleted and is commonly used to handle cleanup, such as deleting files or related models.  

##### Example: User Authentication Signals  

Django also provides signals related to user authentication, such as `user_logged_in`, `user_logged_out`, and `user_login_failed`. These are helpful for tracking user activity and logging login attempts.  

**user_logged_in**  
- Sent when a user successfully logs in.  

```python
from django.contrib.auth.signals import user_logged_in
from django.dispatch import receiver

@receiver(user_logged_in)
def user_logged_in_handler(sender, request, user, **kwargs):
    print(f"User {user} logged in.")
```

- This signal is useful for logging or tracking user sessions. It receives the `request` and `user` as arguments.  

**user_logged_out**  
- Sent when a user logs out.  

```python
from django.contrib.auth.signals import user_logged_out
from django.dispatch import receiver

@receiver(user_logged_out)
def user_logged_out_handler(sender, request, user, **kwargs):
    print(f"User {user} logged out.")
```

- `user_logged_out` is useful for logging events like user session termination.  

**user_login_failed**  
- Sent when a user login fails.  

```python
from django.contrib.auth.signals import user_login_failed
from django.dispatch import receiver

@receiver(user_login_failed)
def user_login_failed_handler(sender, request, credentials, **kwargs):
    print("Login failed for", credentials)
```

- `user_login_failed` is useful for tracking failed login attempts, which can help in detecting potential security issues like brute force attacks.  

#### Custom Signals  

In addition to Django’s built-in signals, you can create custom signals for your specific application needs. To define a custom signal, use the `django.db.models.signals.Signal` class.  

```python
from django.db.models.signals import Signal
from django.dispatch import receiver

# Define a custom signal
my_custom_signal = Signal()

# Define a receiver for the custom signal
@receiver(my_custom_signal)
def custom_signal_handler(sender, **kwargs):
    print("Custom signal received!", kwargs)
```

- `Signal()` defines the custom signal.  
- The receiver function is connected using `@receiver(my_custom_signal)`.  

To send a custom signal, call its `send()` method.  

```python
# Trigger the custom signal
my_custom_signal.send(sender=MyModel, custom_data="Some data")
```

- `send()` is used to dispatch the signal, passing along any required data as keyword arguments.  

#### Connecting and Disconnecting Signals  

By default, signals are automatically connected via the `@receiver` decorator. However, you can also manually connect and disconnect signals using `connect()` and `disconnect()`.  

```python
# Connect the signal manually
my_custom_signal.connect(custom_signal_handler)

# Disconnect the signal
my_custom_signal.disconnect(custom_signal_handler)
```

- `connect()` connects the receiver to the signal.  
- `disconnect()` removes the receiver from the signal.  

#### Signal Handling in the Application Lifecycle  

When using signals in Django, keep in mind that signals are executed synchronously within the request/response cycle. This means that if a signal handler performs heavy or time-consuming tasks, it can slow down the entire request. To avoid this, consider running signal handlers asynchronously using background tasks (e.g., Celery).  

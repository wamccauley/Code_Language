### Celery

Celery is an asynchronous task queue/job queue based on distributed message passing. It is used to handle background tasks and manage long-running operations in a distributed system. Celery allows us to run tasks in the background, separate from your main application logic, which helps in maintaining responsiveness and improving performance.

#### Why do we Use Celery for Task Queues and Background Jobs?

1. **Asynchronous Processing**: Celery enables you to run tasks asynchronously, freeing up the main application thread to handle other requests. This is especially useful for tasks that are time-consuming or resource-intensive.
2. **Distributed Task Management**: Celery can distribute tasks across multiple worker nodes, allowing you to scale your task processing horizontally. This makes it suitable for large-scale applications that require high availability and scalability.

3. **Reliability and Fault Tolerance**: Celery ensures that tasks are retried upon failure and provides mechanisms to handle task failures and retries. This enhances the reliability and fault tolerance of your task processing system.

4. **Periodic Tasks**: With Celery Beat, you can schedule tasks to run at regular intervals (e.g., hourly, daily), making it a robust solution for periodic tasks like batch processing and reporting.

#### Installing Celery with pip

```bash
pip install celery
pip install redis  # Optional, if you choose Redis as the broker
```

#### Configuring Celery in your Django Project

1. **Create a Celery Configuration File**
   Create a file named `celery.py` in your Django project directory (usually alongside `settings.py`).

   ```python
   # myproject/celery.py

   from __future__ import absolute_import, unicode_literals
   import os
   from celery import Celery

   # Set the default Django settings module for the 'celery' program.
   os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'myproject.settings')

   app = Celery('myproject')

   # Using a string here means the worker doesn't have to serialize
   # the configuration object to child processes.
   app.config_from_object('django.conf:settings', namespace='CELERY')

   # Load task modules from all registered Django app configs.
   app.autodiscover_tasks()
   ```

2. **Update `__init__.py`**
   Update the `__init__.py` file in your Django project directory to ensure Celery is loaded when Django starts.

   ```python
   # myproject/__init__.py

   from __future__ import absolute_import, unicode_literals

   # This will make sure the app is always imported when Django starts so that shared_task will use this app.
   from .celery import app as celery_app

   __all__ = ('celery_app',)
   ```

3. **Configure Celery Settings**
   Add Celery-related settings to your Django `settings.py` file.

   ```python
   # myproject/settings.py

   CELERY_BROKER_URL = 'redis://localhost:6379/0'  # Redis as the broker
   CELERY_RESULT_BACKEND = 'redis://localhost:6379/0'  # Redis as the result backend
   CELERY_ACCEPT_CONTENT = ['json']
   CELERY_TASK_SERIALIZER = 'json'
   CELERY_RESULT_SERIALIZER = 'json'
   CELERY_TIMEZONE = 'UTC'
   ```

#### Setting Up a Message Broker

1. **Setting Up Redis**

   - **Install Redis**: Follow the Redis installation guide for your operating system or use a managed Redis service.
   - **Start Redis Server**: Ensure Redis server is running.

2. **Setting Up RabbitMQ**

   - **Install RabbitMQ**: Follow the RabbitMQ installation guide for your operating system or use a managed RabbitMQ service.
   - **Start RabbitMQ Server**: Ensure RabbitMQ server is running.

3. **Choose the Broker**: Update the `CELERY_BROKER_URL` setting in your Django `settings.py` to match your broker of choice. For Redis:

   ```python
   CELERY_BROKER_URL = 'redis://localhost:6379/0'
   ```

   For RabbitMQ:

   ```python
   CELERY_BROKER_URL = 'pyamqp://guest@localhost//'
   ```

### Basic Concepts

#### Understanding Brokers and Backends

- **Brokers**: A broker is a message queue that Celery uses to send and receive messages. It acts as an intermediary between the application and Celery workers. Brokers are essential for message passing in Celery. Common brokers include:

  - **Redis**: An in-memory data structure store that can be used as a message broker. It’s fast and widely used with Celery.
  - **RabbitMQ**: A message broker that implements the Advanced Message Queuing Protocol (AMQP). It provides more advanced messaging features and is robust in handling complex routing.

  To configure the broker, set the `CELERY_BROKER_URL` in your Django `settings.py`. For Redis:

  ```python
  CELERY_BROKER_URL = 'redis://localhost:6379/0'
  ```

  For RabbitMQ:

  ```python
  CELERY_BROKER_URL = 'pyamqp://guest@localhost//'
  ```

- **Backends**: A backend is where Celery stores the results of tasks. It allows you to retrieve the results later and check the status of tasks. Common result backends include:

  - **Redis**: Can also be used as a result backend.
  - **Database**: Store results in a database like PostgreSQL or MySQL using `django-celery-results`.
  - **AMQP**: Results can be stored in the message broker itself.

  To configure the result backend, set `CELERY_RESULT_BACKEND` in your Django `settings.py`. For Redis:

  ```python
  CELERY_RESULT_BACKEND = 'redis://localhost:6379/0'
  ```

#### Workers, Tasks, and Queues

- **Workers**: Workers are the processes that execute the tasks. They listen to the message broker for tasks and perform the required operations. You can run multiple workers to handle more tasks concurrently. Celery allows you to configure worker settings such as concurrency and queue bindings.

- **Tasks**: A task is a Python function that is executed asynchronously by Celery workers. Tasks are defined using the `@app.task` decorator in Celery. They can be simple functions or more complex workflows.

- **Queues**: Tasks are sent to queues, which are essentially channels or routing mechanisms for task messages. You can configure different queues for different types of tasks, allowing you to prioritize or separate tasks based on their nature or urgency.

### Creating and Running Tasks

#### Defining Tasks

To define a task, you use the `@app.task` decorator provided by Celery:

```python
# tasks.py
from celery import shared_task

@shared_task
def add(x, y):
    return x + y
```

#### Calling Tasks Asynchronously

Once you’ve defined a task, you can call it asynchronously using the `delay` method. This method sends the task to the message broker, where it will be picked up by a worker:

```python
# views.py
from .tasks import add

def some_view(request):
    result = add.delay(4, 6)
    # You can access the result object to check the status or get the result later
    return HttpResponse(f"Task result: {result.get()}")
```

#### Running Celery Workers

To start Celery workers, use the `celery` command-line tool:

```bash
celery -A myproject worker --loglevel=info
```

You can start multiple workers or configure them to listen to specific queues using additional command-line options.

```bash
celery -A myproject worker -Q high_priority --loglevel=info
```

### Task States and Results

#### Monitoring Task States (PENDING, STARTED, SUCCESS, FAILURE)

Celery provides various states for tasks to help you track their progress:

- **PENDING**: The task has been received by the broker but not yet picked up by a worker. It’s in the initial state after being sent.
- **STARTED**: The task has been picked up by a worker and is currently being processed.
- **SUCCESS**: The task has been successfully completed and the result is available.
- **FAILURE**: The task has failed to complete. This can occur due to exceptions or errors during execution.

To monitor these states, you can use Celery's result objects or monitoring tools like Celery Flower:

```python
# views.py
from .tasks import add
from celery.result import AsyncResult

def some_view(request):
    task = add.delay(4, 6)
    result = AsyncResult(task.id)
    if result.state == 'PENDING':
        status = 'Task is pending'
    elif result.state == 'STARTED':
        status = 'Task has started'
    elif result.state == 'SUCCESS':
        status = 'Task succeeded'
    elif result.state == 'FAILURE':
        status = 'Task failed'
    return HttpResponse(f"Task status: {status}")
```

#### Retrieving Task Results

To get the result of a task, use the `result.get()` method. This method blocks until the task is finished and returns the result:

```python
# views.py
def some_view(request):
    result = add.delay(4, 6)
    task_result = result.get(timeout=10)  # Waits up to 10 seconds for the result
    return HttpResponse(f"Task result: {task_result}")
```

If the task fails or takes too long, you may need to handle exceptions or timeouts.

#### Handling Task Failures and Retries

Celery allows you to configure retries for tasks that fail due to exceptions. You can set the `max_retries` parameter and use the `retry` method within the task to handle retries:

```python
# tasks.py
from celery import shared_task
from celery.exceptions import MaxRetriesExceededError

@shared_task(bind=True, max_retries=3)
def add(self, x, y):
    try:
        return x + y
    except Exception as exc:
        raise self.retry(exc=exc, countdown=60)  # Retry after 60 seconds
```

### Task Scheduling

#### Using Celery’s Periodic Tasks

Celery’s periodic tasks allow you to execute tasks at regular intervals, such as hourly or daily. This is useful for recurring tasks like daily reports or cleanup operations. You can define periodic tasks using Celery Beat, which is a scheduler that kicks off tasks at specified intervals:

```python
# tasks.py
from celery import shared_task

@shared_task
def daily_cleanup():
    # Your cleanup logic here
    pass
```

#### Configuring Periodic Tasks with Celery Beat

1. **Install Celery Beat**

   Make sure you have `django-celery-beat` installed to use Celery Beat with Django:

   ```bash
   pip install django-celery-beat
   ```

2. **Add `django_celery_beat` to Your Installed Apps**

   Update your `settings.py` to include `django_celery_beat`:

   ```python
   INSTALLED_APPS = [
       # other apps
       'django_celery_beat',
   ]
   ```

3. **Run Migrations**

   Apply migrations for the `django_celery_beat` app:

   ```bash
   python manage.py migrate django_celery_beat
   ```

4. **Create and Schedule Periodic Tasks**

   You can create and manage periodic tasks from the Django admin interface or using Django’s management commands. Here’s how to define a periodic task using Django admin:

   - Go to Django Admin and find the “Periodic Tasks” section under “Django Celery Beat”.
   - Create a new periodic task and set the interval (e.g., every 24 hours) and the task name (e.g., `tasks.daily_cleanup`).

   Alternatively, you can configure periodic tasks programmatically:

   ```python
   # setup_periodic_tasks.py
   from django_celery_beat.models import PeriodicTask, IntervalSchedule
   from datetime import timedelta

   def setup_periodic_tasks():
       schedule, created = IntervalSchedule.objects.get_or_create(
           every=24,
           period=IntervalSchedule.HOURS,
       )
       PeriodicTask.objects.create(
           interval=schedule,
           name='Daily Cleanup',
           task='tasks.daily_cleanup',
       )
   ```

5. **Start Celery Beat**

   Run Celery Beat alongside your Celery workers:

   ```bash
   celery -A myproject beat --loglevel=info
   ```

### Task Routing

#### Configuring Different Queues

You can configure Celery to use different queues for different tasks. This allows you to prioritize or separate tasks based on their nature or urgency. Define queues in your Celery configuration:

```python
# settings.py
CELERY_TASK_QUEUES = {
    'high_priority': {
        'exchange': 'high_priority',
        'exchange_type': 'direct',
        'binding_key': 'high_priority',
    },
    'low_priority': {
        'exchange': 'low_priority',
        'exchange_type': 'direct',
        'binding_key': 'low_priority',
    },
}
```

#### Routing Tasks to Specific Queues

When defining tasks, you can specify which queue they should be routed to. Use the `queue` argument in the `@app.task` decorator or when calling the task:

```python
# tasks.py
from celery import shared_task

@shared_task(queue='high_priority')
def process_important_data(data):
    # Process important data
    pass

@shared_task(queue='low_priority')
def process_regular_data(data):
    # Process regular data
    pass
```

You can also route tasks dynamically by configuring routing options:

```python
# settings.py
CELERY_ROUTES = {
    'tasks.process_important_data': {'queue': 'high_priority'},
    'tasks.process_regular_data': {'queue': 'low_priority'},
}
```

### Integrating Celery with Django

To integrate Celery with Django, you need to install Celery along with some additional packages for managing periodic tasks and storing task results.

```bash
pip install celery
pip install django-celery-beat
pip install django-celery-results
```

- **Celery**: The core package for handling asynchronous tasks.
- **django-celery-beat**: Provides periodic task scheduling capabilities.
- **django-celery-results**: Stores the results of tasks in the Django database.

#### Configuring Celery Settings in Django

1. **Create the Celery Configuration File**

   Create a file named `celery.py` in your Django project directory (alongside `settings.py`).

   ```python
   # myproject/celery.py

   from __future__ import absolute_import, unicode_literals
   import os
   from celery import Celery

   # Set the default Django settings module for the 'celery' program.
   os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'myproject.settings')

   app = Celery('myproject')

   # Using a string here means the worker doesn’t have to serialize
   # the configuration object to child processes.
   app.config_from_object('django.conf:settings', namespace='CELERY')

   # Load task modules from all registered Django app configs.
   app.autodiscover_tasks()
   ```

2. **Update Django Settings**

   Add Celery-related settings to your `settings.py`:

   ```python
   # myproject/settings.py

   CELERY_BROKER_URL = 'redis://localhost:6379/0'  # or your chosen broker URL
   CELERY_RESULT_BACKEND = 'redis://localhost:6379/0'  # or your chosen backend URL
   CELERY_ACCEPT_CONTENT = ['json']
   CELERY_TASK_SERIALIZER = 'json'
   CELERY_RESULT_SERIALIZER = 'json'
   CELERY_TIMEZONE = 'UTC'
   ```

   Configure Django to use `django-celery-beat` and `django-celery-results`:

   ```python
   INSTALLED_APPS = [
       # other apps
       'django_celery_beat',
       'django_celery_results',
   ]
   ```

3. **Update `__init__.py`**

   Ensure Celery is loaded when Django starts:

   ```python
   # myproject/__init__.py

   from __future__ import absolute_import, unicode_literals

   # This will make sure the app is always imported when Django starts so that shared_task will use this app.
   from .celery import app as celery_app

   __all__ = ('celery_app',)
   ```

#### Setting Up a Message Broker

1. **Choosing a Message Broker**

   Celery supports various brokers. The two most common are:

   - **Redis**: An in-memory data structure store that is fast and easy to set up.
   - **RabbitMQ**: A robust message broker with advanced messaging features.

2. **Configuring the Message Broker in Celery and Django**

   Depending on your choice of broker, configure it in your `settings.py`. For Redis:

   ```python
   CELERY_BROKER_URL = 'redis://localhost:6379/0'
   CELERY_RESULT_BACKEND = 'redis://localhost:6379/0'
   ```

   For RabbitMQ:

   ```python
   CELERY_BROKER_URL = 'pyamqp://guest@localhost//'
   CELERY_RESULT_BACKEND = 'rpc://'  # RabbitMQ can also be used as a result backend
   ```

   Make sure the message broker server is running and accessible.

### Creating Celery Tasks

#### Defining Tasks in Django Apps

Tasks are defined using the `@app.task` decorator provided by Celery. Create a `tasks.py` file in your Django app directory:

```python
# myapp/tasks.py
from celery import shared_task

@shared_task
def add(x, y):
    return x + y
```

In this example, `add` is a Celery task that takes two arguments and returns their sum. The `@shared_task` decorator allows this function to be used as a Celery task.

#### Importing Tasks and Using Them in Views or Other Parts of the Application

You can import and call tasks from anywhere in your Django application. For example, to call the `add` task from a view:

```python
# myapp/views.py
from django.http import HttpResponse
from .tasks import add

def my_view(request):
    result = add.delay(4, 6)  # Call task asynchronously
    return HttpResponse(f"Task result: {result.get(timeout=10)}")
```

In this example, `add.delay(4, 6)` sends the `add` task to the Celery worker, and `result.get(timeout=10)` retrieves the result.

### Running Celery Workers

#### Starting Celery Worker Processes

To process tasks, you need to start Celery worker processes. Run the following command from your project directory:

```bash
celery -A myproject worker --loglevel=info
```

#### Configuring Celery Workers to Start with Django

To ensure Celery workers start automatically with Django, you can use process management tools like `supervisord`, `systemd`, or `Docker`.

**Example using `systemd` on Linux:**

1. **Create a Service File**

   Create a file named `/etc/systemd/system/celery.service`:

   ```ini
   [Unit]
   Description=Celery Service
   After=network.target

   [Service]
   User=youruser
   Group=yourgroup
   WorkingDirectory=/path/to/your/project
   ExecStart=/path/to/your/virtualenv/bin/celery -A myproject worker --loglevel=info
   Restart=always

   [Install]
   WantedBy=multi-user.target
   ```

2. **Enable and Start the Service**

   ```bash
   sudo systemctl enable celery
   sudo systemctl start celery
   ```

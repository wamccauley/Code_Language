
To set up a Django app in Docker, simply use this template that I created and used for multiple apps:

**.dockerignore:**

```
venv
__pycache__
*.pyc
*.pyo
.git
```

**Dockerfile:**

```
FROM python:3.11-slim

WORKDIR /app

COPY requirements.txt /app/

RUN apt-get update && apt-get install -y \
    pkg-config \
    libmariadb-dev-compat \
    libmariadb-dev \
    build-essential \
    && rm -rf /var/lib/apt/lists/*

RUN pip install --no-cache-dir -r requirements.txt

COPY . /app/

ENV PYTHONPATH=/app/backend

EXPOSE 8000 9000

CMD ["gunicorn", "--chdir", "backend", "--bind", "0.0.0.0:9000", "backend.wsgi:application"]
```


**docker-compose.yml:**

```
version: '3.11'

services:
  web:
    build: .
    command: python backend/manage.py runserver 0.0.0.0:8000
    volumes:
      - .:/app
    ports:
      - "8000:8000"
    environment:
      - DEBUG=1
```


**docker-compose.prod.yml:**

```
version: '3.11'

services:
  web:
    build: .
    command: gunicorn --chdir backend --bind 0.0.0.0:9000 backend.wsgi:application
    ports:
      - "9000:9000"
    environment:
      - DEBUG=0
```



#### Note:

In development environment, use `docker-compose build` and `docker-compose up` (-d to run in background and docker-compose logs for logs)

However, in production environment, use `docker-compose -f docker-compose.prod.yml build` and `docker-compose -f docker-compose.prod.yml up -d` to deploy the application.
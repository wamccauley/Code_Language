### Using Docker with Django  

#### 1. Installing Docker and Docker Compose  

On Ubuntu/Rocky Linux:  

```bash
sudo apt update && sudo apt install -y docker.io docker-compose  # Ubuntu  
sudo yum install -y docker docker-compose  # Rocky Linux  
```

Start and enable Docker:  

```bash
sudo systemctl start docker  
sudo systemctl enable docker  
```

Verify installation:  

```bash
docker --version  
docker-compose --version  
```

---

#### 2. Creating a Dockerized Django Project  

Inside the project root:  

```bash
touch Dockerfile  
touch docker-compose.yml  
mkdir backend  
```

---

#### 3. Writing the `Dockerfile`  

Create `Dockerfile` in the project root:  

```dockerfile
# Use official Python image
FROM python:3.11

# Set working directory
WORKDIR /app

# Copy requirements file and install dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy project files
COPY . .

# Set environment variables
ENV PYTHONUNBUFFERED=1

# Expose port
EXPOSE 8000

# Start the application
CMD ["gunicorn", "--bind", "0.0.0.0:8000", "backend.wsgi:application"]
```

---

#### 4. Writing `docker-compose.yml`  

Create `docker-compose.yml` in the project root:  

```yaml
version: '3.8'

services:
  web:
    build: .
    container_name: django_app
    ports:
      - "8000:8000"
    depends_on:
      - db
    volumes:
      - .:/app
    environment:
      - DJANGO_SECRET_KEY=supersecretkey
      - DJANGO_DEBUG=True
      - DATABASE_URL=postgres://user:password@db:5432/dbname

  db:
    image: postgres:15
    container_name: postgres_db
    restart: always
    environment:
      POSTGRES_DB: dbname
      POSTGRES_USER: user
      POSTGRES_PASSWORD: password
    volumes:
      - pg_data:/var/lib/postgresql/data

volumes:
  pg_data:
```

---

#### 5. Configuring Django for Docker  

Modify `settings.py`:  

```python
import os
import dj_database_url

SECRET_KEY = os.getenv("DJANGO_SECRET_KEY", "fallback-secret")
DEBUG = os.getenv("DJANGO_DEBUG", "False") == "True"

DATABASES = {
    "default": dj_database_url.config(default="sqlite:///db.sqlite3")
}
```

---

#### 6. Running the Containers  

Build and start the containers:  

```bash
docker-compose up --build -d
```

Check running containers:  

```bash
docker ps
```

View logs:  

```bash
docker-compose logs -f web
```

Stop containers:  

```bash
docker-compose down
```

Restart:  

```bash
docker-compose up -d
```

---

#### 7. Running Migrations and Creating a Superuser  

Run migrations inside the container:  

```bash
docker-compose exec web python manage.py migrate
```

Create a superuser:  

```bash
docker-compose exec web python manage.py createsuperuser
```

---

#### 8. Running Django in Development Mode  

Modify `docker-compose.yml` for hot-reloading:  

```yaml
command: >
  sh -c "python manage.py runserver 0.0.0.0:8000"
```

Rebuild and restart:  

```bash
docker-compose up --build -d
```

---

#### 9. Deploying Django with Docker and Nginx  

Modify `docker-compose.yml`:  

```yaml
version: '3.8'

services:
  web:
    build: .
    container_name: django_app
    expose:
      - "8000"
    depends_on:
      - db
    volumes:
      - .:/app
    environment:
      - DJANGO_SECRET_KEY=supersecretkey
      - DJANGO_DEBUG=False
      - DATABASE_URL=postgres://user:password@db:5432/dbname

  db:
    image: postgres:15
    container_name: postgres_db
    restart: always
    environment:
      POSTGRES_DB: dbname
      POSTGRES_USER: user
      POSTGRES_PASSWORD: password
    volumes:
      - pg_data:/var/lib/postgresql/data

  nginx:
    image: nginx:latest
    container_name: nginx_proxy
    ports:
      - "80:80"
    volumes:
      - ./nginx.conf:/etc/nginx/conf.d/default.conf
    depends_on:
      - web

volumes:
  pg_data:
```

Create `nginx.conf`:  

```nginx
server {
    listen 80;

    location / {
        proxy_pass http://web:8000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    }
}
```

Rebuild and restart:  

```bash
docker-compose up --build -d
```

---

#### 10. Running Gunicorn as a Background Service  

Modify `Dockerfile`:  

```dockerfile
CMD ["gunicorn", "--workers=3", "--bind=0.0.0.0:8000", "backend.wsgi:application"]
```

Rebuild and restart:  

```bash
docker-compose up --build -d
```

---

#### 11. Monitoring Logs and Debugging  

```bash
docker-compose logs -f web
docker-compose logs -f db
docker-compose logs -f nginx
```

Inspect running containers:  

```bash
docker stats
```

---

#### 12. Automating Deployment with GitHub Actions  

Create `.github/workflows/deploy.yml`:  

```yaml
name: Deploy Django with Docker

on:
  push:
    branches:
      - main

jobs:
  deploy:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout code
        uses: actions/checkout@v2

      - name: SSH into Server and Deploy
        uses: appleboy/ssh-action@master
        with:
          host: ${{ secrets.SERVER_IP }}
          username: ${{ secrets.SERVER_USER }}
          key: ${{ secrets.SSH_PRIVATE_KEY }}
          script: |
            cd /home/ubuntu/django-docker
            git pull origin main
            docker-compose down
            docker-compose up --build -d
```

Add secrets in GitHub repository:  
- `SERVER_IP`  
- `SERVER_USER`  
- `SSH_PRIVATE_KEY`  

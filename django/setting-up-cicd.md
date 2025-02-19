### Setting Up CI/CD for Django Projects  

#### 1. Understanding CI/CD for Django  

- **Continuous Integration (CI):** Automates testing when code is pushed.  
- **Continuous Deployment (CD):** Deploys the latest version automatically.  
- **Tools:** GitHub Actions, GitLab CI/CD, Jenkins, CircleCI, and Bitbucket Pipelines.  

---

#### 2. Setting Up GitHub Actions for CI/CD  

Create `.github/workflows/deploy.yml`:  

```yaml
name: Django CI/CD Pipeline

on:
  push:
    branches:
      - main

jobs:
  test:
    runs-on: ubuntu-latest

    services:
      postgres:
        image: postgres:15
        env:
          POSTGRES_DB: test_db
          POSTGRES_USER: test_user
          POSTGRES_PASSWORD: test_pass
        ports:
          - "5432:5432"

    steps:
      - name: Checkout repository
        uses: actions/checkout@v2

      - name: Set up Python
        uses: actions/setup-python@v3
        with:
          python-version: "3.11"

      - name: Install dependencies
        run: |
          pip install -r requirements.txt
          pip install coverage

      - name: Run migrations
        env:
          DATABASE_URL: postgres://test_user:test_pass@localhost:5432/test_db
        run: |
          python manage.py migrate

      - name: Run tests with coverage
        run: |
          coverage run manage.py test
          coverage report -m

  deploy:
    needs: test
    runs-on: ubuntu-latest

    steps:
      - name: SSH into server and deploy
        uses: appleboy/ssh-action@master
        with:
          host: ${{ secrets.SERVER_IP }}
          username: ${{ secrets.SERVER_USER }}
          key: ${{ secrets.SSH_PRIVATE_KEY }}
          script: |
            cd /home/ubuntu/django-project
            git pull origin main
            docker-compose down
            docker-compose up --build -d
```

---

#### 3. Configuring Environment Variables in GitHub  

Go to **GitHub Repo → Settings → Secrets and Variables → Actions → New Repository Secret**  
Add the following:  

- `SERVER_IP` → *Your server’s IP address*  
- `SERVER_USER` → *SSH username (e.g., ubuntu)*  
- `SSH_PRIVATE_KEY` → *Your private SSH key for the server*  

---

#### 4. Running Tests Locally  

Before committing changes, run tests locally:  

```bash
python manage.py test
```

Check test coverage:  

```bash
coverage run manage.py test && coverage report -m
```

---

#### 5. Deploying Django with Docker and Nginx  

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

#### 6. Automating Server Deployment  

Modify `.github/workflows/deploy.yml` to include deployment steps:  

```yaml
- name: SSH into server and deploy
  uses: appleboy/ssh-action@master
  with:
    host: ${{ secrets.SERVER_IP }}
    username: ${{ secrets.SERVER_USER }}
    key: ${{ secrets.SSH_PRIVATE_KEY }}
    script: |
      cd /home/ubuntu/django-project
      git pull origin main
      docker-compose down
      docker-compose up --build -d
```

---

#### 7. Rolling Back in Case of Failure  

If a deployment fails, revert to the previous version:  

```bash
git reset --hard HEAD~1
docker-compose down
docker-compose up --build -d
```

---

#### 8. Monitoring Logs and Debugging  

View logs for errors:  

```bash
docker-compose logs -f web
docker-compose logs -f db
docker-compose logs -f nginx
```

Check running containers:  

```bash
docker ps
docker stats
```

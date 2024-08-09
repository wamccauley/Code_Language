To change the `DEBUG` setting to `False` in Django settings during the deployment process, you can use environment variables. This approach allows to manage different settings for different environments (development, staging, production, etc.) without hardcoding them into your settings file.

### 1. Modify GitHub Actions Workflow

Update your GitHub Actions workflow to set the `DJANGO_DEBUG` environment variable to `False` when deploying:

```yaml
name: Deploy

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

      - name: Set up SSH
        uses: webfactory/ssh-agent@v0.5.3
        with:
          ssh-private-key: ${{ secrets.SSH_PRIVATE_KEY }}

      - name: Deploy to VPS
        run: |
          ssh -o StrictHostKeyChecking=no -vvv root@SERVER-IP << 'EOF'
            cd /path/to/docker/project
            docker-compose -f docker-compose.prod.yml down
            cd ../
            rm -rf project
            git clone git@github.com:username/project.git
            cd project
            export DJANGO_DEBUG=False
            docker-compose -f docker-compose.prod.yml build
            docker-compose -f docker-compose.prod.yml up -d
            docker image prune -f
          EOF
        env:
          SSH_PRIVATE_KEY: ${{ secrets.SSH_PRIVATE_KEY }}
          DJANGO_DEBUG: False
```

### 2. Update Django Settings

Modify `settings.py` file to read the `DJANGO_DEBUG` environment variable:

```python
import os

DEBUG = os.getenv('DJANGO_DEBUG', 'True') == 'True'
```

This code will default `DEBUG` to `True` if the `DJANGO_DEBUG` environment variable is not set. When you set `DJANGO_DEBUG` to `False` in your GitHub Actions workflow, it will set `DEBUG` to `False`.

### 3. Ensure Docker Compose File Passes the Environment Variable

Make sure that `docker-compose.prod.yml` passes the environment variable to the Django container. Update your `docker-compose.prod.yml` file to include the `DJANGO_DEBUG` environment variable:

```yaml
version: "3.8"

services:
  web:
    image: django_image
    environment:
      - DJANGO_DEBUG=${DJANGO_DEBUG}
    ports:
      - "8000:8000"
    # other configurations...
```


To make a simple GitHub actions CI/CD pipeline on a vps server that has docker set up, you can simply create `.github` directory in your local GitHub repo, then create a directory called `workflows` inside `.github` and lastly create `deploy.yml` inside `workflows`.

Note: `deploy.yml` could be named to any other workflow name.

**deploy.yml**:

```
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
        ssh -o StrictHostKeyChecking=no -vvv USER@IP << 'EOF'
          cd /home/USER/backend
          docker-compose -f docker-compose.prod.yml down
          cd ../
          rm -rf myproject
          git clone git@github.com:username/myproject.git
          cd myproject
          docker-compose -f docker-compose.prod.yml build
          docker-compose -f docker-compose.prod.yml up -d
          docker image prune -f
        EOF
      env:
        SSH_PRIVATE_KEY: ${{ secrets.SSH_PRIVATE_KEY }}
```
### Deploying to AWS (Elastic Beanstalk, EC2)  

#### 1. Choosing Between Elastic Beanstalk and EC2  

- **Elastic Beanstalk (EB)**: A Platform-as-a-Service (PaaS) solution that automates infrastructure setup, including EC2 instances, load balancers, and scaling. Best for simplified deployments.  
- **EC2 (Elastic Compute Cloud)**: A raw virtual machine that provides full control over the server but requires manual setup of the web server, database, and deployment process. Best for customized, scalable deployments.  

---

#### 2. Deploying Django on AWS Elastic Beanstalk  

##### a) Installing AWS CLI and Elastic Beanstalk CLI  

```bash
pip install awsebcli --upgrade
```

Verify installation:  

```bash
eb --version
```

##### b) Setting Up AWS Credentials  

```bash
aws configure
```

Provide:  
- AWS Access Key ID  
- AWS Secret Access Key  
- Default region (e.g., `us-east-1`)  
- Default output format (`json`)  

##### c) Creating an Elastic Beanstalk Application  

Navigate to the Django project directory:  

```bash
eb init -p python3.9 my-django-app
```

- `-p python3.9`: Specifies the Python version.  
- `my-django-app`: The application name.  

##### d) Configuring Environment Variables  

Create a `.ebextensions` folder and an environment config file:  

```bash
mkdir .ebextensions
touch .ebextensions/django.config
```

Add environment variables inside `django.config`:  

```yaml
option_settings:
  aws:elasticbeanstalk:application:environment:
    DJANGO_SECRET_KEY: "your-secret-key"
    DJANGO_DEBUG: "False"
    DATABASE_URL: "postgres://user:password@db-instance.amazonaws.com:5432/dbname"
```

##### e) Creating and Deploying the Elastic Beanstalk Environment  

```bash
eb create my-django-env
```

After deployment:  

```bash
eb open
```

To update the deployment:  

```bash
eb deploy
```

##### f) Running Database Migrations on Beanstalk  

SSH into the instance:  

```bash
eb ssh my-django-env
```

Run migrations:  

```bash
python manage.py migrate
```

##### g) Checking Logs and Debugging  

```bash
eb logs
```

Restart application:  

```bash
eb restart
```

---

#### 3. Deploying Django on AWS EC2  

##### a) Launching an EC2 Instance  

1. Go to the **AWS EC2 Dashboard**.  
2. Click **Launch Instance**.  
3. Select **Amazon Linux 2** or **Ubuntu 22.04 LTS**.  
4. Choose an instance type (e.g., `t3.micro` for free-tier).  
5. Configure security groups:
   - Allow **port 22** (SSH) for access.  
   - Allow **port 80** (HTTP) for web traffic.  
   - Allow **port 443** (HTTPS) for SSL/TLS.  
   - Allow **port 8000** if testing locally.  
6. Add an **Elastic IP** for a static IP address.  

##### b) Connecting to the EC2 Instance  

Copy the public IP and SSH into the instance:  

```bash
ssh -i my-key.pem ec2-user@ec2-xx-xx-xx-xx.compute-1.amazonaws.com
```

For Ubuntu instances:  

```bash
ssh -i my-key.pem ubuntu@ec2-xx-xx-xx-xx.compute-1.amazonaws.com
```

##### c) Installing Dependencies  

```bash
sudo yum update -y  # Amazon Linux
sudo apt update -y  # Ubuntu

sudo yum install python3-pip -y  # Amazon Linux
sudo apt install python3-pip -y  # Ubuntu
```

##### d) Setting Up a Virtual Environment  

```bash
python3 -m venv venv
source venv/bin/activate
pip install --upgrade pip
```

##### e) Cloning the Django Project  

```bash
git clone https://github.com/user/my-django-project.git
cd my-django-project
```

Install dependencies:  

```bash
pip install -r requirements.txt
```

##### f) Configuring the Database  

Using PostgreSQL:  

```bash
sudo yum install postgresql postgresql-server postgresql-devel -y  # Amazon Linux
sudo apt install postgresql postgresql-contrib libpq-dev -y  # Ubuntu
```

Update `settings.py`:  

```python
DATABASES = {
    "default": {
        "ENGINE": "django.db.backends.postgresql",
        "NAME": "mydb",
        "USER": "myuser",
        "PASSWORD": "mypassword",
        "HOST": "mydb-instance.amazonaws.com",
        "PORT": "5432",
    }
}
```

Apply migrations:  

```bash
python manage.py migrate
```

##### g) Running Django with Gunicorn  

Install Gunicorn:  

```bash
pip install gunicorn
```

Start Gunicorn:  

```bash
gunicorn --bind 0.0.0.0:8000 myproject.wsgi:application
```

##### h) Setting Up Nginx as a Reverse Proxy  

Install Nginx:  

```bash
sudo yum install nginx -y  # Amazon Linux
sudo apt install nginx -y  # Ubuntu
```

Edit Nginx config file `/etc/nginx/nginx.conf`:  

```nginx
server {
    listen 80;
    server_name ec2-xx-xx-xx-xx.compute-1.amazonaws.com;

    location / {
        proxy_pass http://127.0.0.1:8000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    }
}
```

Restart Nginx:  

```bash
sudo systemctl restart nginx
```

Enable on boot:  

```bash
sudo systemctl enable nginx
```

##### i) Running Django as a Systemd Service  

Create `/etc/systemd/system/django.service`:  

```ini
[Unit]
Description=Django Service
After=network.target

[Service]
User=ec2-user
Group=ec2-user
WorkingDirectory=/home/ec2-user/my-django-project
ExecStart=/home/ec2-user/venv/bin/gunicorn --workers 4 --bind 0.0.0.0:8000 myproject.wsgi:application
Restart=always

[Install]
WantedBy=multi-user.target
```

Enable and start the service:  

```bash
sudo systemctl daemon-reload
sudo systemctl enable django
sudo systemctl start django
```

Check service logs:  

```bash
sudo journalctl -u django --no-pager
```

---

#### 4. Configuring HTTPS with Let’s Encrypt  

##### a) Installing Certbot  

```bash
sudo yum install certbot python3-certbot-nginx -y  # Amazon Linux
sudo apt install certbot python3-certbot-nginx -y  # Ubuntu
```

##### b) Generating SSL Certificate  

```bash
sudo certbot --nginx -d example.com -d www.example.com
```

Auto-renew SSL certificate:  

```bash
sudo certbot renew --dry-run
```

---

#### 5. Automating Deployment with Git  

Create a deployment script `deploy.sh`:  

```bash
#!/bin/bash
cd /home/ec2-user/my-django-project
git pull origin main
source venv/bin/activate
pip install -r requirements.txt
python manage.py migrate
sudo systemctl restart django
```

Make it executable:  

```bash
chmod +x deploy.sh
```

Run deployment:  

```bash
./deploy.sh
```

---

#### 6. Monitoring and Logs  

Check logs:  

```bash
sudo journalctl -u django --no-pager
sudo tail -f /var/log/nginx/error.log
```

Monitor server:  

```bash
htop
```
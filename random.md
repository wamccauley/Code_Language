# Docker

Docker is a platform that allows you to develop, ship, and run applications in containers. Containers are lightweight, portable, and ensure consistency across multiple environments.

## Installing Docker

### Windows

1. **Download Docker Desktop:**

   - Go to the [Docker Desktop for Windows](https://www.docker.com/products/docker-desktop) page.
   - Download the Docker Desktop installer.

2. **Install Docker Desktop:**

   - Run the installer and follow the instructions.
   - During the installation, ensure that the option to use WSL 2 (Windows Subsystem for Linux) is selected for better performance.

3. **Start Docker Desktop:**
   - Once installed, launch Docker Desktop from the Start menu.
   - Verify the installation by opening a Command Prompt or PowerShell and running:
     ```shell
     docker --version
     ```

### macOS

1. **Download Docker Desktop:**

   - Go to the [Docker Desktop for Mac](https://www.docker.com/products/docker-desktop) page.
   - Download the Docker Desktop installer.

2. **Install Docker Desktop:**

   - Open the downloaded `.dmg` file and drag the Docker icon to the Applications folder.

3. **Start Docker Desktop:**
   - Launch Docker Desktop from the Applications folder.
   - Verify the installation by opening a terminal and running:
     ```shell
     docker --version
     ```

### Linux

1. **Install Docker Engine:**

   - For Debian-based distributions (e.g., Ubuntu):

     ```shell
     sudo apt-get update
     sudo apt-get install \
         ca-certificates \
         curl \
         gnupg \
         lsb-release

     curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg

     echo \
       "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://download.docker.com/linux/ubuntu \
       $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null

     sudo apt-get update
     sudo apt-get install docker-ce docker-ce-cli containerd.io
     ```

   - For Red Hat-based distributions (e.g., CentOS):
     ```shell
     sudo yum install -y yum-utils
     sudo yum-config-manager \
         --add-repo \
         https://download.docker.com/linux/centos/docker-ce.repo
     sudo yum install docker-ce docker-ce-cli containerd.io
     ```

2. **Start Docker:**

   ```shell
   sudo systemctl start docker
   sudo systemctl enable docker
   ```

3. **Verify the installation:**
   ```shell
   docker --version
   ```

## Basic Docker Commands

- **Pull an image from Docker Hub:**

  ```shell
  docker pull <image_name>
  ```

  Example:

  ```shell
  docker pull nginx
  ```

- **Run a container:**

  ```shell
  docker run -d -p <host_port>:<container_port> <image_name>
  ```

  Example:

  ```shell
  docker run -d -p 80:80 nginx
  ```

- **List running containers:**

  ```shell
  docker ps
  ```

- **Stop a running container:**

  ```shell
  docker stop <container_id>
  ```

- **Remove a container:**

  ```shell
  docker rm <container_id>
  ```

- **List all images:**

  ```shell
  docker images
  ```

- **Remove an image:**
  ```shell
  docker rmi <image_id>
  ```

## Dockerfile

A Dockerfile is a script that contains a series of instructions on how to build a Docker image.

### Example Dockerfile

```dockerfile
# Use an official Python runtime as a parent image
FROM python:3.8-slim

# Set the working directory in the container
WORKDIR /app

# Copy the current directory contents into the container at /app
COPY . /app

# Install any needed packages specified in requirements.txt
RUN pip install --no-cache-dir -r requirements.txt

# Make port 80 available to the world outside this container
EXPOSE 80

# Define environment variable
ENV NAME World

# Run app.py when the container launches
CMD ["python", "app.py"]
```

### Building and Running a Docker Image

1. **Build the Docker image:**

   ```shell
   docker build -t <your_image_name> .
   ```

2. **Run the Docker container:**
   ```shell
   docker run -p 4000:80 <your_image_name>
   ```

## Docker Compose

Docker Compose is a tool for defining and running multi-container Docker applications. With Compose, you use a YAML file to configure your application’s services.

### Example `docker-compose.yml`

```yaml
version: "3"
services:
  web:
    image: my_web_app
    build: .
    ports:
      - "5000:5000"
    volumes:
      - .:/code
    environment:
      FLASK_ENV: development
  redis:
    image: "redis:alpine"
```

### Using Docker Compose

1. **Start the application:**

   ```shell
   docker-compose up
   ```

2. **Stop the application:**
   ```shell
   docker-compose down
   ```

## Advanced Docker Concepts

### Networking

- **Creating a network:**

  ```shell
  docker network create <network_name>
  ```

- **Connecting a container to a network:**
  ```shell
  docker network connect <network_name> <container_name>
  ```

### Volumes

- **Creating a volume:**

  ```shell
  docker volume create <volume_name>
  ```

- **Mounting a volume to a container:**
  ```shell
  docker run -d -v <volume_name>:/path/in/container <image_name>
  ```

### Docker Swarm

Docker Swarm is a native clustering and orchestration tool for Docker containers.

- **Initialize a Swarm:**

  ```shell
  docker swarm init
  ```

- **Deploy a stack:**
  ```shell
  docker stack deploy -c <compose-file> <stack_name>
  ```

# Git

Git is a distributed version control system used for tracking changes in source code during software development. This guide will cover how to install Git, generate SSH keys to connect to a GitHub account, and explain essential Git commands.

## Installing Git

### Windows

1. **Download Git for Windows:**

   - Go to the [Git for Windows](https://gitforwindows.org/) page.
   - Download the Git installer.

2. **Install Git:**

   - Run the installer and follow the instructions.
   - During the installation, it’s recommended to select "Use Git from the Windows Command Prompt" and other default settings.

3. **Verify the installation:**
   - Open Command Prompt or PowerShell and run:
     ```shell
     git --version
     ```

### macOS

1. **Install Git:**

   - Git can be installed via Homebrew. First, install Homebrew if you haven’t already:
     ```shell
     /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
     ```
   - Then, install Git using Homebrew:
     ```shell
     brew install git
     ```

2. **Verify the installation:**
   - Open a terminal and run:
     ```shell
     git --version
     ```

### Linux

1. **Install Git:**

   - For Debian-based distributions (e.g., Ubuntu):
     ```shell
     sudo apt update
     sudo apt install git
     ```
   - For Red Hat-based distributions (e.g., CentOS):
     ```shell
     sudo yum install git
     ```

2. **Verify the installation:**
   - Open a terminal and run:
     ```shell
     git --version
     ```

## Setting Up SSH Keys for GitHub

1. **Generate an SSH key:**

   - Open a terminal and run:
     ```shell
     ssh-keygen -t ed25519 -C "your_email@example.com"
     ```
   - When prompted to "Enter a file in which to save the key," press Enter to accept the default file location.
   - Enter and confirm a secure passphrase.

2. **Start the SSH agent:**

   - Run the following command to start the SSH agent in the background:
     ```shell
     eval "$(ssh-agent -s)"
     ```

3. **Add your SSH key to the SSH agent:**

   - Run the following command to add your SSH key:
     ```shell
     ssh-add ~/.ssh/id_ed25519
     ```

4. **Add the SSH key to your GitHub account:**
   - Copy the SSH key to your clipboard:
     ```shell
     cat ~/.ssh/id_ed25519.pub
     ```
   - Log in to your GitHub account and go to **Settings** > **SSH and GPG keys** > **New SSH key**.
   - Paste your SSH key into the "Key" field and give it a descriptive title.
   - Click **Add SSH key**.

## Essential Git Commands

### Configuration

- **Set your username:**

  ```shell
  git config --global user.name "Your Name"
  ```

- **Set your email:**

  ```shell
  git config --global user.email "your_email@example.com"
  ```

- **Check your configuration:**
  ```shell
  git config --list
  ```

### Creating a Repository

- **Initialize a new repository:**

  ```shell
  git init
  ```

- **Clone an existing repository:**
  ```shell
  git clone <repository_url>
  ```

### Basic Commands

- **Check the status of your repository:**

  ```shell
  git status
  ```

- **Add changes to the staging area:**

  ```shell
  git add <file_name>
  ```

  - To add all changes:
    ```shell
    git add .
    ```

- **Commit changes:**

  ```shell
  git commit -m "Commit message"
  ```

- **View commit history:**
  ```shell
  git log
  ```

### Branching and Merging

- **Create a new branch:**

  ```shell
  git branch <branch_name>
  ```

- **Switch to a branch:**

  ```shell
  git checkout <branch_name>
  ```

- **Create and switch to a new branch:**

  ```shell
  git checkout -b <branch_name>
  ```

- **Merge a branch into the current branch:**

  ```shell
  git merge <branch_name>
  ```

- **Delete a branch:**
  ```shell
  git branch -d <branch_name>
  ```

### Remote Repositories

- **Add a remote repository:**

  ```shell
  git remote add origin <repository_url>
  ```

- **View remote repositories:**

  ```shell
  git remote -v
  ```

- **Push changes to a remote repository:**

  ```shell
  git push origin <branch_name>
  ```

- **Pull changes from a remote repository:**
  ```shell
  git pull origin <branch_name>
  ```

### Undoing Changes

- **Unstage a file:**

  ```shell
  git reset <file_name>
  ```

- **Revert changes in a file:**

  ```shell
  git checkout -- <file_name>
  ```

- **Amend the last commit:**
  ```shell
  git commit --amend
  ```

# How To Set Up Django with Postgres, Nginx, and Gunicorn on Ubuntu

Check out the [full tutorial](https://www.digitalocean.com/community/tutorials/how-to-set-up-django-with-postgres-nginx-and-gunicorn-on-ubuntu).

This guide details the process of setting up a Django application with PostgreSQL, Nginx, and Gunicorn on Ubuntu 22.04. It covers installing necessary packages, configuring PostgreSQL, setting up Django, and configuring Gunicorn and Nginx for production deployment.

## Prerequisites

- Server running Ubuntu with a non-root user with sudo privileges and an active firewall.
- Upgrade to a supported Ubuntu version if using 16.04 or below.

## Steps to Setup Django, Nginx & Gunicorn

### Step 1 — Install Packages from the Ubuntu Repositories

```bash
sudo apt update
sudo apt install python3-venv python3-dev libpq-dev postgresql postgresql-contrib nginx curl
```

### Step 2 — Create the PostgreSQL Database and User

```bash
sudo -u postgres psql
CREATE DATABASE myproject;
CREATE USER myprojectuser WITH PASSWORD 'password';
ALTER ROLE myprojectuser SET client_encoding TO 'utf8';
ALTER ROLE myprojectuser SET default_transaction_isolation TO 'read committed';
ALTER ROLE myprojectuser SET timezone TO 'UTC';
GRANT ALL PRIVILEGES ON DATABASE myproject TO myprojectuser;
\q
```

### Step 3 — Create a Python Virtual Environment for Your Project

```bash
mkdir ~/myprojectdir
cd ~/myprojectdir
python3 -m venv myprojectenv
source myprojectenv/bin/activate
pip install django gunicorn psycopg2-binary
```

### Step 4 — Create and Configure a New Django Project

```bash
django-admin startproject myproject ~/myprojectdir
nano ~/myprojectdir/myproject/settings.py
```

- Modify `ALLOWED_HOSTS`:

```python
ALLOWED_HOSTS = ['your_server_domain_or_IP', 'second_domain_or_IP', 'localhost']
```

- Update `DATABASES`:

```python
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql_psycopg2',
        'NAME': 'myproject',
        'USER': 'myprojectuser',
        'PASSWORD': 'password',
        'HOST': 'localhost',
        'PORT': '',
    }
}
```

- Set `STATIC_ROOT`:

```python
import os
STATIC_ROOT = os.path.join(BASE_DIR, 'static/')
```

### Step 5 — Complete Initial Project Setup

```bash
~/myprojectdir/manage.py makemigrations
~/myprojectdir/manage.py migrate
~/myprojectdir/manage.py createsuperuser
~/myprojectdir/manage.py collectstatic
sudo ufw allow 8000
~/myprojectdir/manage.py runserver 0.0.0.0:8000
```

### Step 6 — Test Gunicorn’s Ability to Serve the Project

```bash
cd ~/myprojectdir
gunicorn --bind 0.0.0.0:8000 myproject.wsgi
deactivate
```

### Step 7 — Create systemd Socket and Service Files for Gunicorn

- Create Gunicorn socket file:

```bash
sudo nano /etc/systemd/system/gunicorn.socket
```

Add:

```ini
[Unit]
Description=gunicorn socket

[Socket]
ListenStream=/run/gunicorn.sock

[Install]
WantedBy=sockets.target
```

- Create Gunicorn service file:

```bash
sudo nano /etc/systemd/system/gunicorn.service
```

Add:

```ini
[Unit]
Description=gunicorn daemon
Requires=gunicorn.socket
After=network.target

[Service]
User=sammy
Group=www-data
WorkingDirectory=/home/sammy/myprojectdir
ExecStart=/home/sammy/myprojectdir/myprojectenv/bin/gunicorn \
          --access-logfile - \
          --workers 3 \
          --bind unix:/run/gunicorn.sock \
          myproject.wsgi:application

[Install]
WantedBy=multi-user.target
```

```bash
sudo systemctl start gunicorn.socket
sudo systemctl enable gunicorn.socket
```

### Step 8 — Check for the Gunicorn Socket File

```bash
sudo systemctl status gunicorn.socket
file /run/gunicorn.sock
sudo journalctl -u gunicorn.socket
```

### Step 9 — Test Socket Activation

```bash
curl --unix-socket /run/gunicorn.sock localhost
sudo systemctl status gunicorn
sudo journalctl -u gunicorn
sudo systemctl daemon-reload
sudo systemctl restart gunicorn
```

### Step 10 — Configure Nginx to Proxy Pass to Gunicorn

- Create Nginx server block:

```bash
sudo nano /etc/nginx/sites-available/myproject
```

Add:

```nginx
server {
    listen 80;
    server_name server_domain_or_IP;

    location = /favicon.ico { access_log off; log_not_found off; }
    location /static/ {
        root /home/sammy/myprojectdir;
    }

    location / {
        include proxy_params;
        proxy_pass http://unix:/run/gunicorn.sock;
    }
}
```

- Enable the Nginx server block:

```bash
sudo ln -s /etc/nginx/sites-available/myproject /etc/nginx/sites-enabled
sudo nginx -t
sudo systemctl restart nginx
sudo ufw delete allow 8000
sudo ufw allow 'Nginx Full'
```

By following these steps, you will have a fully functional Django application served with PostgreSQL, Gunicorn, and Nginx on Ubuntu.

### How to Build and Run a `.sh` Script in Linux

#### Step 1: Create the Script File

1. **Open a Terminal:**

   - You can open a terminal window on most Linux distributions by pressing `Ctrl+Alt+T`.

2. **Create a New File:**
   - You can use a text editor like `nano`, `vim`, or `gedit` to create a new script file. For example, using `nano`:
     ```sh
     nano script.sh
     ```

#### Step 2: Write the Script

1. **Add the Shebang Line:**

   - At the top of your script, add the shebang line to specify the script should be run with `bash`:
     ```sh
     #!/bin/bash
     ```

2. **Add Your Commands:**

   - Write the commands you want your script to execute. For example:

     ```sh
     #!/bin/bash

     echo "Hello, World!"
     ls -l
     ```

3. **Save and Exit:**
   - Save the file and exit the text editor. In `nano`, you can do this by pressing `Ctrl+X`, then `Y`, and `Enter`.

#### Step 3: Make the Script Executable

1. **Change the Permissions:**
   - You need to give execution permission to your script file. Use the `chmod` command:
     ```sh
     chmod +x script.sh
     ```

#### Step 4: Run the Script

1. **Execute the Script:**
   - You can run your script by typing:
     ```sh
     ./script.sh
     ```

### Managing Permissions with `chmod`

```sh
chmod [options] mode file
```

### Recursive Changes

To change permissions recursively, meaning applying the changes to all files and directories within a specified directory, you can use the `-R` (or `--recursive`) option. Here are examples of how to use this:

- **Example 1:** Change permissions of all files and directories within `/www/store` to `777`:

  ```sh
  chmod -R 777 /www/store
  ```

  This command sets the permissions for all files and directories within `/www/store` to `777`, which means that everyone can read, write, and execute.

- **Example 2:** Change permissions of all files and directories in the current directory to `777`:

  ```sh
  chmod -R 777 ./
  ```

  This command applies the same permissions to everything in the current directory.

# Random Notes

Some of these random notes might not be Linux related.

## Connecting via SSH

To connect to a server using SSH on a specific port:

```sh
ssh -p 65535 root@255.255.255.255
```

## Identifying the Linux Distribution

To find out which Linux distribution you are using:

```sh
hostnamectl
```

## Setting Up a Cron Job

To set up a cron job that accesses a page to run a code:

```sh
curl -s -o /path/to/save/output.txt https://domain.com/index.php?route=page/subpage >/dev/null 2>&1
```

## Updating a Django App

To update a Django application:

```sh
sudo systemctl daemon-reload
sudo systemctl restart gunicorn
sudo systemctl restart nginx
```

## Installing `mysqlclient` in a Virtual Environment

While installing `mysqlclient` in a virtual environment, you might encounter the following error:

```sh
(venv) root@server:~/backend# pip3 install mysqlclient
File "<string>", line 28, in find_package_name
      Exception: Can not find valid pkg-config name.
      Specify MYSQLCLIENT_CFLAGS and MYSQLCLIENT_LDFLAGS env vars manually
      [end of output]

  note: This error originates from a subprocess, and is likely not a problem with pip.
error: subprocess-exited-with-error

× Getting requirements to build wheel did not run successfully.
│ exit code: 1
╰─> See above for output.
```

### Solution:

```sh
sudo apt-get update
sudo apt-get install pkg-config
sudo apt-get install libmysqlclient-dev
pip3 install mysqlclient
```

## SSH Connection Batch Script (Windows)

For automating SSH connections using PuTTY, create a batch file `SSH.bat`:

```bat
@echo off
set HOST=255.255.255.255
set PORT=65535
set USER=root
set PASSWORD=root

start "" "C:\Program Files\PuTTY\putty.exe" -pw %PASSWORD% -P %PORT% -ssh %USER%@%HOST%
```

## MySQL Commands

To login to MySQL as root:

```sh
sudo mysql -u root -p
```

### MySQL SQL Commands:

```sql
CREATE USER 'django_user'@'your_django_server_ip' IDENTIFIED BY 'strong_password';
GRANT ALL PRIVILEGES ON your_database.* TO 'django_user'@'your_django_server_ip';
FLUSH PRIVILEGES;
```

## MySQL Configuration and Commands

### Fix Django Remote MySQL Errors

Refer to: [10web.io blog](https://10web.io/blog/mysql-error-2003/)

### Restart MySQL Service

```sh
systemctl restart mysqld.service
```

### MySQL Configuration File `/etc/mysql/my.cnf`

```ini
[mysqld]
max_allowed_packet=64M
local-infile=0
innodb_file_per_table
sql-mode="NO_ENGINE_SUBSTITUTION"
```

### MySQL Commands

```sh
sudo mysql -u root -p
```

```sql
SELECT @@sql_mode;
SET sql_mode='';
SELECT VERSION();
```

```sh
mysql --version
```

### Finding MySQL Configuration Files

```sh
find /etc -name *.cnf
```

## System Monitoring Commands

### Check CPU Usage, Free Disk Space, and Folder/File Size

```sh
# Check CPU usage
top

# Check free disk space
df -h

# Check file and folder sizes
du -sh /path/to/directory
```

## .htaccess Configuration for Angular Routes

To configure `.htaccess` for Angular routes:

```apache
RewriteEngine on
RewriteCond %{REQUEST_FILENAME} -s [OR]
RewriteCond %{REQUEST_FILENAME} -l [OR]
RewriteCond %{REQUEST_FILENAME} -d
RewriteRule ^.*$ - [NC,L]

RewriteRule ^(.*) /index.html [NC,L]
```

## Fixing Django Cannot Connect to MySQL

1. Check MySQL Service

```sh
sudo systemctl start mysql
```

2. Allow MySQL Port Through Firewall

```sh
sudo ufw allow 3306
```

3. Configure MySQL

Edit the MySQL configuration file `/etc/mysql/my.cnf` to ensure it accepts connections:

Configuration Steps:

- Ensure the port is set to 3306:
  ```ini
  port = 3306
  ```
- Adjust the `bind-address` setting:
  - To accept connections from localhost:
    ```ini
    bind-address = 127.0.0.1
    ```
  - To accept remote connections, you might set it to `0.0.0.0` or your server’s specific IP address:
    ```ini
    bind-address = 0.0.0.0
    ```

4. Check Network

Ensure that the network is working correctly:

```sh
ping localhost
```

5. Create MySQL User and Grant Permissions

Create a MySQL user, grant necessary permissions, and allow connections from the backend server's IP address:

Steps to Create a MySQL User and Grant Permissions:

1. Log in to MySQL as the root user:

   ```sh
   sudo mysql -u root -p
   ```

2. Create a new user and grant privileges:
   ```sql
   CREATE USER 'django_user'@'backend_server_ip' IDENTIFIED BY 'strong_password';
   GRANT ALL PRIVILEGES ON your_database.* TO 'django_user'@'backend_server_ip';
   FLUSH PRIVILEGES;
   ```

Example Commands:

- Create a user:

  ```sql
  CREATE USER 'django_user'@'backend_server_ip' IDENTIFIED BY 'strong_password';
  ```

- Grant all privileges to the user on a specific database:

  ```sql
  GRANT ALL PRIVILEGES ON your_database.* TO 'django_user'@'backend_server_ip';
  ```

- Apply the changes:
  ```sql
  FLUSH PRIVILEGES;
  ```

## Reverse Proxy

- **Reverse Proxy**:
  - Sits between client devices and a web server.
  - Intercepts requests from clients and forwards them to the web server.
  - Benefits include:
    - Load balancing.
    - Enhanced security (hides the identity and characteristics of the backend server).
    - SSL termination (handles SSL encryption/decryption to reduce the load on backend servers).
    - Caching (improves performance by serving cached content for repeated requests).

## Load Balancer

- **Load Balancer**:
  - Distributes incoming network or application traffic across multiple servers.

## Scaling

- **Vertical Scaling**:

  - Involves adding more CPU and RAM to a single server.

- **Horizontal Scaling**:
  - Involves adding more servers and using a load balancer to distribute the load.

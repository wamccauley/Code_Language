### Deploying with WSGI  

#### 1. Understanding WSGI  

WSGI (Web Server Gateway Interface) is a specification that defines how web servers communicate with Python web applications. Django uses WSGI as its default interface. In production, Django applications should not be served using `runserver` but instead through a WSGI-compatible server like **Gunicorn**, **uWSGI**, or **mod_wsgi** with Apache.  

---

#### 2. Configuring `wsgi.py`  

Django projects include a `wsgi.py` file inside the project directory. This file is used to serve the application through WSGI-compatible servers.  

```python
import os
from django.core.wsgi import get_wsgi_application

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "myproject.settings")

application = get_wsgi_application()
```

- `os.environ.setdefault("DJANGO_SETTINGS_MODULE", "myproject.settings")`: Defines the settings module.  
- `get_wsgi_application()`: Creates the WSGI application object.  

---

#### 3. Running Django with Gunicorn  

Gunicorn (Green Unicorn) is a popular WSGI server for serving Django applications in production.  

#### a) Installing Gunicorn  

```bash
pip install gunicorn
```

#### b) Running Gunicorn  

```bash
gunicorn myproject.wsgi:application --bind 0.0.0.0:8000
```

- `myproject.wsgi:application`: Points to the `application` object in `wsgi.py`.  
- `--bind 0.0.0.0:8000`: Binds Gunicorn to all available IPs on port 8000.  

#### c) Running Gunicorn with Multiple Workers  

```bash
gunicorn myproject.wsgi:application --workers 4 --bind 0.0.0.0:8000
```

- `--workers 4`: Runs Gunicorn with 4 worker processes for handling multiple requests.  

#### d) Running Gunicorn as a Daemon (Background Process)  

```bash
gunicorn myproject.wsgi:application --daemon
```

- `--daemon`: Runs Gunicorn as a background process.  

#### e) Running Gunicorn with a Configuration File  

Instead of passing all options via the command line, a config file can be used:  

```python
# gunicorn_config.py
bind = "0.0.0.0:8000"
workers = 4
timeout = 120
loglevel = "info"
```

Run Gunicorn with:  

```bash
gunicorn -c gunicorn_config.py myproject.wsgi:application
```

---

#### 4. Using uWSGI  

uWSGI is another WSGI server that can be used to serve Django applications.  

#### a) Installing uWSGI  

```bash
pip install uwsgi
```

#### b) Running Django with uWSGI  

```bash
uwsgi --http :8000 --module myproject.wsgi
```

#### c) Running uWSGI with INI Configuration  

Instead of passing options in the command, create a `uwsgi.ini` file:  

```ini
[uwsgi]
module = myproject.wsgi
http = :8000
workers = 4
master = true
vacuum = true
```

Run uWSGI with:  

```bash
uwsgi --ini uwsgi.ini
```

---

#### 5. Serving Django with Apache and `mod_wsgi`  

#### a) Installing `mod_wsgi`  

For Apache, the `mod_wsgi` module must be installed.  

```bash
pip install mod_wsgi
```

#### b) Generating Apache Configuration  

```bash
mod_wsgi-express module-config
```

#### c) Configuring Apache  

Add this to the Apache configuration file (`/etc/httpd/conf/httpd.conf` or `/etc/apache2/apache2.conf`):  

```apache
<VirtualHost *:80>
    ServerName example.com
    DocumentRoot /path/to/myproject

    <Directory /path/to/myproject>
        Require all granted
    </Directory>

    WSGIDaemonProcess myproject python-home=/path/to/venv python-path=/path/to/myproject
    WSGIProcessGroup myproject
    WSGIScriptAlias / /path/to/myproject/myproject/wsgi.py
</VirtualHost>
```

Restart Apache:  

```bash
sudo systemctl restart apache2  # Ubuntu
sudo systemctl restart httpd    # CentOS/Rocky Linux
```

---

#### 6. Running Django with Nginx and Gunicorn  

Nginx is a high-performance web server often used as a reverse proxy in front of Gunicorn.  

#### a) Installing Nginx  

```bash
sudo apt install nginx   # Ubuntu/Debian
sudo yum install nginx   # CentOS/Rocky Linux
```

#### b) Configuring Nginx  

Edit `/etc/nginx/sites-available/myproject` (or `/etc/nginx/conf.d/myproject.conf`):  

```nginx
server {
    listen 80;
    server_name example.com;

    location / {
        proxy_pass http://127.0.0.1:8000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    }
}
```

Enable the site and restart Nginx:  

```bash
ln -s /etc/nginx/sites-available/myproject /etc/nginx/sites-enabled/
sudo systemctl restart nginx
```

---

#### 7. Running Django as a Systemd Service  

For automatic startup, create a `systemd` service file `/etc/systemd/system/myproject.service`:  

```ini
[Unit]
Description=Gunicorn server for Django project
After=network.target

[Service]
User=www-data
Group=www-data
WorkingDirectory=/path/to/myproject
ExecStart=/path/to/venv/bin/gunicorn --workers 4 --bind 0.0.0.0:8000 myproject.wsgi:application
Restart=always

[Install]
WantedBy=multi-user.target
```

Enable and start the service:  

```bash
sudo systemctl daemon-reload
sudo systemctl enable myproject
sudo systemctl start myproject
```

Check status:  

```bash
sudo systemctl status myproject
```

---

#### 8. Debugging WSGI Deployment Issues  

#### a) Checking Gunicorn Logs  

```bash
journalctl -u myproject --no-pager
```

#### b) Checking Nginx Logs  

```bash
sudo tail -f /var/log/nginx/error.log
```

#### c) Testing Gunicorn Manually  

```bash
gunicorn myproject.wsgi:application --bind 127.0.0.1:8000
```

#### d) Running `wsgi.py` Manually  

```bash
python myproject/wsgi.py
```


To use the `.htaccess` file as a reverse proxy, we need to ensure that our Apache server has the `mod_rewrite` and `mod_proxy` modules enabled.

You can enable these modules using the following commands (on a Linux system with `a2enmod`):

```sh
sudo a2enmod rewrite
sudo a2enmod proxy
sudo a2enmod proxy_http
sudo systemctl restart apache2
```

### .htaccess File

Create or edit the `.htaccess` file in the root directory of your website and add the following rules:

```apache
RewriteEngine On
RewriteCond %{REQUEST_URI} !^/proxy/
RewriteRule ^(.*)$ http://SERVER_IP:9000/$1 [P,L]
```

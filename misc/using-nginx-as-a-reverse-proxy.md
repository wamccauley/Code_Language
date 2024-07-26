
#### To set up Nginx as a reverse proxy:

## 1. Add a DNS Subdomain:

1. **Log into your DNS Management Console**:
   - For DirectAdmin, log in to your DirectAdmin control panel.

2. **Add a Subdomain Record**:
   - Go to the DNS management section.
   - Look for an option to add a new record.
   - Add a new record with the following details:
     - **Type**: `A` (for an A record that maps the subdomain to an IP address) or `CNAME` (if you want to point it to another domain).
     - **Name**: Enter the subdomain you want to create.
     - **Value**: Enter the IP address (for A records) or the domain (for CNAME records) where you want the subdomain to point.
   - Save or apply the changes.

## 2. Testing the DNS Subdomain

#### Test using `dig`

1. **Open a Terminal or Command Prompt**.

2. **Use the `dig` Command**:
   - To check the A record, use:
     ```bash
     dig subdomain.domain.com
     ```
   - To check the CNAME record, use:
     ```bash
     dig subdomain.domain.com CNAME
     ```

#### Checking DNS Propagation

1. **Use DNS Propagation Tools**:
   - Visit online tools like [DNS Checker](https://dnschecker.org)or [WhatsMyDNS](https://www.whatsmydns.net/).
   - Enter your subdomain and select the record type (A, CNAME, etc.).

Note: DNS changes can take time to propagate. Typically, this is up to 48 hours, but it often happens much faster.

## 2. Set up Nginx:

- Configure the file: `/etc/nginx/sites-available/subdomain.domain.com`

```
nginx
   server {
       listen 80;
       server_name subdomain.domain.com;

       location / {
           proxy_pass http://server_ip:9000;
           proxy_set_header Host $host;
           proxy_set_header X-Real-IP $remote_addr;
           proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
           proxy_set_header X-Forwarded-Proto $scheme;
       }
   }
```

- Create a symlink: `sudo ln -s /etc/nginx/sites-available/myproject /etc/nginx/sites-enabled/` 

- Teste Nginx configuration: `sudo nginx -t`

- Reloade Nginx: `sudo systemctl reload nginx`
Load balancing a commonly used technique for optimizing resource utilization, maximizing throughput, reducing latency, and ensuring fault‑tolerant configurations. It involves distributing client requests across multiple servers to ensure no single server becomes a bottleneck.

#### Basic Configuration

To set up load balancing in Nginx, you'll need to configure it in the `nginx.conf` file or within a specific server block. The configuration involves defining an upstream block and specifying how requests should be distributed.

```nginx
http {
    upstream myapp {
        server backend1.example.com;
        server backend2.example.com;
        server backend3.example.com;
    }

    server {
        listen 80;

        location / {
            proxy_pass http://myapp;
        }
    }
}
```

In this example:
- The `upstream` block defines a group of backend servers (`backend1`, `backend2`, `backend3`).
- The `proxy_pass` directive in the `location` block forwards requests to the upstream group.

## Load Balancing Methods

Nginx supports several load balancing algorithms. You can configure these methods using the `upstream` directive.

#### Round Robin (Default)

- Distributes requests evenly across all servers.
  
```nginx
upstream myapp {
    server backend1.example.com;
    server backend2.example.com;
}
```

#### Least Connections

- Routes requests to the server with the fewest active connections.

```nginx
upstream myapp {
    least_conn;
    server backend1.example.com;
    server backend2.example.com;
}
```

#### IP Hash

- Routes requests from the same client IP to the same server, which can help with session persistence.

```nginx
upstream myapp {
    ip_hash;
    server backend1.example.com;
    server backend2.example.com;
}
```

#### Load Balancing with SSL/TLS

You can use Nginx to terminate SSL/TLS connections and then perform load balancing over HTTP. This setup involves configuring SSL/TLS in the `server` block and proxying requests to the backend servers.

```nginx
server {
    listen 443 ssl;
    server_name example.com;

    ssl_certificate /path/to/cert.pem;
    ssl_certificate_key /path/to/key.pem;

    location / {
        proxy_pass http://myapp;
    }
}
```


#### Quick Notes:
- Use `nginx -t` to test configuration syntax before applying changes.

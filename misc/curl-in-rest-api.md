## cURL

Lately, I've been falling in love with using `curl` instead of Postman for testing REST APIs in development environment. `curl` is a powerful tool for making HTTP requests from the command line.

### 1. Basic `curl` Usage

#### GET Request
```bash
curl -X GET "https://api.example.com/data"
```

If the parameters are dynamic or if you prefer to keep the URL cleaner, you can also use the `--data-urlencode` option:
```bash
curl -G "https://api.example.com/data" \
    --data-urlencode "param1=value1" \
    --data-urlencode "param2=value2"
```
#### POST Request
```bash
curl -X POST https://api.example.com/data -d "param1=value1&param2=value2"
```

### 2. Common Options

#### URL Parameters
You can include query parameters directly in the URL:
```bash
curl "https://api.example.com/data?param1=value1&param2=value2"
```

#### Headers
Add headers using the `-H` option:
```bash
curl -H "Authorization: Bearer token" -H "Content-Type: application/json" https://api.example.com/data
```

#### Data
Send data using `-d` as `application/x-www-form-urlencoded`:
```bash
curl -X POST https://api.example.com/data -d "param1=value1&param2=value2"
```

For JSON data, use:
```bash
curl -X POST https://api.example.com/data -H "Content-Type: application/json" -d '{"param1":"value1", "param2":"value2"}'
```

#### File Upload
Use the `-F` option to upload files:
```bash
curl -F "file=@/path/to/file" https://api.example.com/upload
```

#### Authentication
Basic Authentication:
```bash
curl -u username:password https://api.example.com/data
```

Bearer Token:
```bash
curl -H "Authorization: Bearer token" https://api.example.com/data
```

### 3. Handling Responses

#### Displaying Response Headers
```bash
curl -I https://api.example.com/data
```

#### Saving Response to a File
```bash
curl https://api.example.com/data -o output.json
```

#### Including Headers in the Output
```bash
curl -i https://api.example.com/data
```

### 4. Advanced Usage

#### Multiple Headers
```bash
curl -H "Header1: value1" -H "Header2: value2" https://api.example.com/data
```

#### Verbose Output
Useful for debugging:
```bash
curl -v https://api.example.com/data
```

#### Follow Redirects
```bash
curl -L https://api.example.com/redirect
```

#### Timeout
Set a maximum time allowed for the transfer:
```bash
curl --max-time 30 https://api.example.com/data
```

### 5. Using `curl` with Authentication

#### Bearer Token
```bash
curl -H "Authorization: Bearer YOUR_TOKEN" https://api.example.com/data
```

### Handling InsecureRequestWarning in Python

## Issue:

When running a Python script, the following warning appeared:

```bash
ort@Orts-MacBook-Pro Documents % python3 otp.py
/Library/Frameworks/Python.framework/Versions/3.12/lib/python3.12/site-packages/urllib3/connectionpool.py:1099: InsecureRequestWarning: Unverified HTTPS request is being made to host 'www.bestsmsbulk.com'. Adding certificate verification is strongly advised. See: https://urllib3.readthedocs.io/en/latest/advanced-usage.html#tls-warnings
  warnings.warn
200
86242463;96181462533;1
ort@Orts-MacBook-Pro Documents %
```

## Solution:

It looks like the script executed successfully, but there is a warning regarding an insecure HTTPS request. Specifically, the warning comes from the `urllib3` library, indicating that the HTTPS request was made without verifying the server's SSL certificate.

### **How to Fix the Warning:**

You can suppress this warning if you trust the source by adding the following to your code:

```python
import requests
import urllib3

# Suppress InsecureRequestWarning
urllib3.disable_warnings(urllib3.exceptions.InsecureRequestWarning)

# Make the HTTPS request
response = requests.get('https://www.domain.com', verify=False)

# Print the response
print(response.status_code)
print(response.text)
```

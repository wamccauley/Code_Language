### HTTP Status Codes

1. **1xx: Informational**

   - These codes indicate that the request was received and understood, and that the server is continuing to process the request.

2. **2xx: Success**

   - These codes indicate that the client's request was successfully received, understood, and accepted by the server.

3. **3xx: Redirection**

   - These codes indicate that the client must take additional action to complete the request, often involving redirection to a different resource.

4. **4xx: Client Error**

   - These codes indicate that the client made an error in the request, such as providing invalid data or attempting to access a resource without proper authentication.

5. **5xx: Server Error**
   - These codes indicate that the server failed to fulfill a valid request due to an error on the server's side.

#### **Details About Some HTTP Status Codes**

##### **1xx: Informational Responses**

- **100 Continue:**

  - The server has received the initial part of the request and the client should continue with the request.

- **101 Switching Protocols:**

  - The server is switching to the protocol requested by the client, typically used for WebSocket requests.

- **102 Processing:**
  - The server has received and is processing the request, but no response is available yet. This is used to avoid timeout errors for long processes.

##### **2xx: Success**

- **200 OK:**

  - The request was successful, and the server has returned the requested resource or performed the requested operation.

- **201 Created:**

  - The request has been fulfilled, resulting in the creation of a new resource.

- **202 Accepted:**

  - The request has been accepted for processing, but the processing is not complete. This is often used for asynchronous operations.

- **204 No Content:**
  - The server successfully processed the request, but no content is returned in the response body.

##### **3xx: Redirection**

- **301 Moved Permanently:**

  - The requested resource has been permanently moved to a new URL, and all future requests should use the new URL.

- **302 Found:**

  - The requested resource resides temporarily under a different URL, and the client should continue to use the original URL for future requests.

- **304 Not Modified:**

  - The resource has not been modified since the last request, so the client can use the cached version of the resource.

- **307 Temporary Redirect:**
  - The request should be repeated with another URL, but future requests should still use the original URL.

##### **4xx: Client Error**

- **400 Bad Request:**

  - The server could not understand the request due to invalid syntax. This is often due to malformed request data.

- **401 Unauthorized:**

  - The request requires user authentication. The client must authenticate itself to get the requested response.

- **403 Forbidden:**

  - The server understands the request, but it refuses to authorize it. This is typically due to insufficient permissions.

- **404 Not Found:**

  - The server cannot find the requested resource. This is a common response for invalid or non-existent URLs.

- **405 Method Not Allowed:**

  - The request method is not supported for the requested resource. For example, using GET instead of POST for a particular operation.

- **409 Conflict:**

  - The request could not be completed due to a conflict with the current state of the resource. This is often used in situations involving versioning or simultaneous updates.

- **410 Gone:**

  - The requested resource is no longer available and has been permanently removed.

- **422 Unprocessable Entity:**

  - The server understands the content type of the request entity, but was unable to process the contained instructions.

- **429 Too Many Requests:**
  - The user has sent too many requests in a given amount of time ("rate limiting").

##### **5xx: Server Error**

- **500 Internal Server Error:**

  - The server encountered an unexpected condition that prevented it from fulfilling the request.

- **501 Not Implemented:**

  - The server does not support the functionality required to fulfill the request. This indicates that the server is either incapable of performing the action or does not recognize the request method.

- **502 Bad Gateway:**

  - The server, while acting as a gateway or proxy, received an invalid response from the upstream server.

- **503 Service Unavailable:**

  - The server is not ready to handle the request. Common causes are a server that is down for maintenance or that is overloaded.

- **504 Gateway Timeout:**
  - The server, while acting as a gateway or proxy, did not receive a timely response from the upstream server.

### Problem:

Create a websocket that listens for forcing refreshing an Angular app

### Solution:

To create a WebSocket-based solution in Django and Angular that refreshes all frontend pages when a button in a certain admin dashboard is pressed, we can follow these steps:

### **1. Setting Up Django with Channels for WebSocket Support**

#### **Step 1: Install Dependencies**

Django doesn’t support WebSockets natively, so you need to install Django Channels:

```bash
pip install channels
pip install channels-redis
```

#### **Step 2: Update Django Settings**

Update your `settings.py` to include Channels:

```python
# settings.py

INSTALLED_APPS = [
    # Other Django apps...
    'channels',
]

ASGI_APPLICATION = 'your_project_name.asgi.application'

# Channels configuration
CHANNEL_LAYERS = {
    'default': {
        'BACKEND': 'channels_redis.core.RedisChannelLayer',
        'CONFIG': {
            'hosts': [('127.0.0.1', 6379)],
        },
    },
}
```

#### **Step 3: Create `asgi.py`**

Create an `asgi.py` file in the root of your project, if it doesn’t already exist:

```python
# asgi.py

import os
from channels.routing import ProtocolTypeRouter, URLRouter
from django.core.asgi import get_asgi_application
from channels.auth import AuthMiddlewareStack
from django.urls import path
from your_app_name import consumers

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'your_project_name.settings')

application = ProtocolTypeRouter({
    "http": get_asgi_application(),
    "websocket": AuthMiddlewareStack(
        URLRouter(
            [
                path('ws/refresh/', consumers.RefreshConsumer.as_asgi()),
            ]
        )
    ),
})
```

#### **Step 4: Create a WebSocket Consumer**

Create a consumer that handles WebSocket connections:

```python
# consumers.py

import json
from channels.generic.websocket import AsyncWebsocketConsumer

class RefreshConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        await self.channel_layer.group_add("refresh_group", self.channel_name)
        await self.accept()

    async def disconnect(self, close_code):
        await self.channel_layer.group_discard("refresh_group", self.channel_name)

    async def receive(self, text_data):
        # This can be left empty since we're only sending messages from the server
        pass

    async def refresh(self, event):
        await self.send(text_data=json.dumps({
            'message': 'refresh'
        }))
```

#### **Step 5: Create a View to Trigger WebSocket Messages**

Create a view in your Django admin dashboard to trigger the refresh:

```python
# views.py

from channels.layers import get_channel_layer
from asgiref.sync import async_to_sync
from django.http import HttpResponse

def trigger_refresh(request):
    channel_layer = get_channel_layer()
    async_to_sync(channel_layer.group_send)(
        "refresh_group", {"type": "refresh"}
    )
    return HttpResponse("Frontend refresh triggered!")
```

#### **Step 6: Map the View to a URL**

Add a URL pattern for the view:

```python
# urls.py

from django.urls import path
from your_app_name import views

urlpatterns = [
    path('trigger-refresh/', views.trigger_refresh, name='trigger-refresh'),
]
```

### **2. Setting Up Angular to Listen for WebSocket Messages**

#### **Step 1: Create a WebSocket Service**

Create an Angular service to handle WebSocket connections:

```typescript
// websocket.service.ts

import { Injectable } from "@angular/core";
import { WebSocketSubject } from "rxjs/webSocket";

@Injectable({
  providedIn: "root",
})
export class WebSocketService {
  private socket$: WebSocketSubject<any>;

  constructor() {
    this.socket$ = new WebSocketSubject("ws://localhost:8000/ws/refresh/");
  }

  public get messages$() {
    return this.socket$.asObservable();
  }
}
```

#### **Step 2: Modify the Angular Component**

In your Angular component, subscribe to the WebSocket service to listen for refresh messages:

```typescript
// app.component.ts

import { Component, OnInit } from "@angular/core";
import { WebSocketService } from "./websocket.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent implements OnInit {
  constructor(private webSocketService: WebSocketService) {}

  ngOnInit() {
    this.webSocketService.messages$.subscribe((message) => {
      if (message.message === "refresh") {
        window.location.reload();
      }
    });
  }
}
```

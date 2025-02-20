### Caching  

#### Understanding Caching  

Caching is the process of storing frequently accessed data in a temporary storage location (cache) to improve performance. By caching data, you can avoid repetitive database queries or expensive computations, significantly reducing response times and improving the scalability of your application.

In Django, caching provides a flexible system for storing and retrieving data at various levels of your application, whether it's for views, templates, or database queries. Caching helps to prevent redundant work by keeping the results of expensive operations and using them when needed.

##### Key Caching Concepts  
1. **Cache Key**: A unique identifier used to store and retrieve cached data. It can be any string value.  
2. **Cache Backend**: The storage system used to store cached data. This could be memory, filesystem, or a third-party service like Redis or Memcached.  
3. **Cache Timeout**: The amount of time for which the cache is considered valid. After the timeout, the cached data is expired and needs to be regenerated.  
4. **Cache Miss**: When a requested value is not found in the cache, leading to the computation or retrieval of the data.  
5. **Cache Hit**: When a requested value is found in the cache, avoiding the need for recomputation.

#### Django Caching Framework  

Django’s caching framework provides a simple API for storing and retrieving data in a cache. It supports multiple cache backends and is highly customizable to suit different needs.

##### Cache Backends  

Django supports several cache backends, which determine where the cached data will be stored. You can configure the cache backend in the Django settings.  

**Memory-based Cache** (default)  
This backend stores cache data in the memory of the server running Django. It is very fast but not suitable for large-scale applications or multi-server environments.  

```python
CACHES = {
    'default': {
        'BACKEND': 'django.core.cache.backends.locmem.LocMemCache',
    }
}
```

**Filesystem-based Cache**  
This backend stores cache data on the local filesystem. It is slower than memory cache but persists between restarts.  

```python
CACHES = {
    'default': {
        'BACKEND': 'django.core.cache.backends.filebased.FileBasedCache',
        'LOCATION': '/var/cache/django',  # Path where cache files are stored
    }
}
```

**Redis Cache**  
Redis is a high-performance, in-memory key-value store. It is commonly used for caching in distributed systems.  

```python
CACHES = {
    'default': {
        'BACKEND': 'django_redis.cache.RedisCache',
        'LOCATION': 'redis://127.0.0.1:6379/1',  # Redis server location
    }
}
```

**Memcached**  
Memcached is a memory-based caching system designed for high-performance applications.  

```python
CACHES = {
    'default': {
        'BACKEND': 'django.core.cache.backends.memcached.MemcachedCache',
        'LOCATION': '127.0.0.1:11211',  # Memcached server location
    }
}
```

##### Cache Settings in Django  

Django’s caching framework allows you to configure various cache parameters in the settings. You can specify the cache timeout, cache key prefixes, and other settings based on your needs.  

- **CACHE_TIMEOUT**: The default time-to-live (TTL) for cached data.  
- **CACHE_KEY_PREFIX**: A prefix added to cache keys to avoid collisions when using multiple caches.  

Example configuration for memory cache with a timeout setting:  

```python
CACHES = {
    'default': {
        'BACKEND': 'django.core.cache.backends.locmem.LocMemCache',
        'TIMEOUT': 3600,  # Cache timeout in seconds (1 hour)
    }
}
```

#### Caching Views  

Django allows you to cache entire views using the `cache_page` decorator or the `CacheMiddleware`. These methods cache the full HTML response of a view to improve performance, especially for views with static content.  

##### Using `cache_page` Decorator  

The `cache_page` decorator caches the output of a view for a specified amount of time. When the view is accessed, the cached version is returned if it hasn’t expired.  

```python
from django.views.decorators.cache import cache_page
from django.shortcuts import render

@cache_page(60 * 15)  # Cache the view for 15 minutes
def my_view(request):
    return render(request, 'my_template.html')
```

- This will cache the rendered response of `my_view` for 15 minutes. After the cache expires, Django will regenerate the response and store it again.  

##### Using CacheMiddleware  

`CacheMiddleware` can be added to the `MIDDLEWARE` setting to cache the output of all views automatically. It works based on the cache settings and can be configured for specific URLs.  

```python
MIDDLEWARE = [
    'django.middleware.cache.UpdateCacheMiddleware',
    'django.middleware.cache.FetchFromCacheMiddleware',
]
```

- This middleware caches all responses for the duration specified in the cache timeout.  
- It's important to place `UpdateCacheMiddleware` first and `FetchFromCacheMiddleware` second to handle the caching logic properly.  

#### Template Caching  

Django also supports caching fragments of templates, allowing you to cache only parts of a page. This can be useful when parts of the page change frequently, but other sections remain static.  

##### Using `&#123;% endraw %&#125;&#123;% cache %&#125;` Template Tag  

The `&#123;% endraw %&#125;&#123;% cache %&#125;` tag can be used to cache specific sections of a template. You specify a cache key and a timeout. The block of template code inside the tag will be cached for the specified duration.  

```html
&#123;% endraw %&#125;&#123;% load cache %&#125;

&#123;% endraw %&#125;&#123;% cache 600 my_cache_key %&#125;
    <h1>Latest News</h1>
    <ul>
        &#123;% endraw %&#125;&#123;% for article in articles %&#125;
            <li>{{ article.title }}</li>
        &#123;% endraw %&#125;&#123;% endfor %&#125;
    </ul>
&#123;% endraw %&#125;&#123;% endcache %&#125;
```

- This will cache the block of template code inside the `&#123;% endraw %&#125;&#123;% cache %&#125;` tag for 10 minutes. After 10 minutes, the cache will expire, and Django will re-render the block.  
- `my_cache_key` can be any unique string to identify the cached block.  

#### Low-Level Caching  

Django provides a low-level caching API that allows you to store and retrieve arbitrary data from the cache. This is useful for caching items like database query results or computations.  

##### `cache.set()` and `cache.get()`  

- `cache.set(key, value, timeout=None)` stores data in the cache.  
- `cache.get(key)` retrieves data from the cache.  

```python
from django.core.cache import cache

# Store data in the cache for 1 hour
cache.set('my_key', 'my_value', timeout=3600)

# Retrieve data from the cache
value = cache.get('my_key')
```

- If `my_key` is in the cache, `cache.get('my_key')` will return its value; otherwise, it will return `None`.  

##### `cache.delete()` and `cache.clear()`  

- `cache.delete(key)` removes a specific cache key.  
- `cache.clear()` clears all cached data.  

```python
# Delete a specific cache key
cache.delete('my_key')

# Clear all cache data
cache.clear()
```

- `cache.delete()` is used to remove a specific cached item, while `cache.clear()` wipes all cached data from the backend.  

#### Cache Versioning  

Django supports cache versioning, allowing you to store different versions of the cache for the same key. This can be useful when the cache content changes but you want to maintain different versions for various purposes.  

You can use a version number when setting or retrieving cache data:  

```python
cache.set('my_key', 'my_value', version=1)
value = cache.get('my_key', version=1)
```

- The `version` parameter allows you to store and retrieve different versions of the same cache key.  

#### Cache in Templates  

In addition to using the `&#123;% endraw %&#125;&#123;% cache %&#125;` tag for template-level caching, you can also use Django’s `cache.get()` and `cache.set()` methods within your views to pass cached data into templates.

```python
from django.core.cache import cache
from django.shortcuts import render

def my_view(request):
    cached_data = cache.get('my_cached_data')
    if not cached_data:
        cached_data = compute_expensive_data()
        cache.set('my_cached_data', cached_data, timeout=600)
    return render(request, 'my_template.html', {'cached_data': cached_data})
```

- Here, the computed expensive data is cached for 10 minutes. If the data is already cached, it’s retrieved from the cache, avoiding recomputation.  

#### Cache Invalidations  

Cache invalidation refers to the process of clearing or updating cached data when the underlying data changes. There are various strategies to handle cache invalidation, such as:  
1. **Time-based Expiration**: Setting a timeout for cache data. After the timeout, the data is automatically invalidated.  
2. **Manual Invalidation**: Manually clearing cache data when the underlying data is updated.  
3. **Event-based Invalidation**: Using signals or other events to trigger cache invalidation when related data changes.  

Django doesn’t provide built-in automatic cache invalidation for model changes, so you often need to handle it yourself, especially in cases where the data changes frequently.

```python
cache.delete('my_key')  # Manually invalidating cache after data change
```
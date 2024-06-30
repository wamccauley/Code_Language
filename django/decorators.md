### Decorators

Django provides several built-in decorators that can be used with both Function-Based Views (FBVs) and Class-Based Views (CBVs) to enhance their functionality.

#### @login_required Decorator

The `@login_required` decorator ensures that the user must be logged in to access a view.

##### Example of Using @login_required Decorator with FBVs

```python
from django.contrib.auth.decorators import login_required
from django.shortcuts import render

@login_required
def profile(request):
    # View logic for profile page
    return render(request, 'profile.html')
```

- `@login_required` ensures that only authenticated users can access the `profile` view.

#### @permission_required Decorator

The `@permission_required` decorator restricts access to users with specific permissions.

##### Example of Using @permission_required Decorator with FBVs

```python
from django.contrib.auth.decorators import permission_required
from django.shortcuts import render

@permission_required('app_name.view_item')
def item_detail(request, item_id):
    # View logic for item detail page
    return render(request, 'item_detail.html')
```

- `@permission_required('app_name.view_item')` ensures that only users with the 'view_item' permission can access the `item_detail` view.

#### @method_decorator

The `@method_decorator` decorator is used to apply decorators to class-based view methods.

##### Example of Using @method_decorator with CBVs

```python
from django.utils.decorators import method_decorator
from django.contrib.auth.decorators import login_required
from django.views.generic import TemplateView

@method_decorator(login_required, name='dispatch')
class ProtectedView(TemplateView):
    template_name = 'protected.html'
```

- `@method_decorator(login_required, name='dispatch')` applies the `login_required` decorator to the `dispatch` method of the `ProtectedView` class.

#### Custom Decorators

You can create custom decorators to encapsulate reusable logic and apply them to views.

##### Example of Creating a Custom Decorator

```python
from django.http import HttpResponseForbidden

def custom_permission_required(permission):
    def decorator(view_func):
        def wrapper(request, *args, **kwargs):
            if not request.user.has_perm(permission):
                return HttpResponseForbidden('Permission Denied')
            return view_func(request, *args, **kwargs)
        return wrapper
    return decorator
```

- `custom_permission_required` is a custom decorator that checks if the user has a specific permission before executing the view function.

#### Using Decorators with Class-Based Views

Decorators can be applied to class-based views using `method_decorator`.

##### Example of Using Decorators with CBVs

```python
from django.utils.decorators import method_decorator
from django.contrib.auth.decorators import login_required
from django.views.generic import TemplateView

@method_decorator(login_required, name='dispatch')
class ProtectedView(TemplateView):
    template_name = 'protected.html'
```

- `@method_decorator(login_required, name='dispatch')` applies the `login_required` decorator to the `dispatch` method of the `ProtectedView` class.

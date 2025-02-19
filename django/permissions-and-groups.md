### Permissions and Groups

Permissions and groups control access to different parts of an application.  

Each model can have `add`, `change`, `delete`, and `view` permissions. Custom permissions can also be defined.  

```python
from django.contrib.auth.models import Permission
from django.contrib.contenttypes.models import ContentType
from myapp.models import MyModel

content_type = ContentType.objects.get_for_model(MyModel)
permission = Permission.objects.create(
    codename='can_publish',
    name='Can Publish Items',
    content_type=content_type,
)
```

- `get_for_model(MyModel)` links the permission to a specific model.  
- `Permission.objects.create()` defines a custom permission.  

A user’s permissions can be checked with `has_perm()`.  

```python
user = User.objects.get(username='john')
if user.has_perm('myapp.can_publish'):
    print('User has the permission!')
```

- `has_perm('myapp.can_publish')` checks if the user has the specified permission.  

Groups allow multiple users to share the same permissions.  

```python
from django.contrib.auth.models import Group

group = Group.objects.create(name='Editors')
group.permissions.add(permission)
user.groups.add(group)
```

- `Group.objects.create(name='Editors')` creates a new group.  
- `group.permissions.add(permission)` assigns permissions to the group.  
- `user.groups.add(group)` adds a user to the group.  

Permissions assigned to a group apply to all its users. Checking group-based permissions works the same way as individual permissions.  

```python
if user.has_perm('myapp.can_publish'):
    print('User has permission via group!')
```
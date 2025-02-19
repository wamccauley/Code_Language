### Field Lookups

#### Basic Field Lookups

Field lookups are specified as keyword arguments to the `filter()`, `exclude()`, and `get()` methods. Each lookup argument takes the form `field__lookup=value`.

##### Basic Field Lookups

Suppose you have an `Author` model and you want to filter authors by name:

```python
authors_named_john = Author.objects.filter(name='John')
```

#### Common Field Lookups

##### `exact`

Matches values exactly equal to the specified value.

```python
authors_named_john = Author.objects.filter(name__exact='John')
```

##### `iexact`

Case-insensitive match.

```python
authors_named_john = Author.objects.filter(name__iexact='john')
```

##### `contains`

Case-sensitive match for whether a value contains the specified substring.

```python
authors_with_jo = Author.objects.filter(name__contains='Jo')
```

##### `icontains`

Case-insensitive match for whether a value contains the specified substring.

```python
authors_with_jo = Author.objects.filter(name__icontains='jo')
```

##### `in`

Matches any of the values in the given list.

```python
authors_named_john_or_jane = Author.objects.filter(name__in=['John', 'Jane'])
```

##### `gt` / `gte`

Matches values greater than / greater than or equal to the specified value.

```python
authors_born_after_2000 = Author.objects.filter(birth_date__gt='2000-01-01')
authors_born_on_or_after_2000 = Author.objects.filter(birth_date__gte='2000-01-01')
```

##### `lt` / `lte`

Matches values less than / less than or equal to the specified value.

```python
authors_born_before_2000 = Author.objects.filter(birth_date__lt='2000-01-01')
authors_born_on_or_before_2000 = Author.objects.filter(birth_date__lte='2000-01-01')
```

##### `startswith` / `istartswith`

Case-sensitive / case-insensitive match for whether a value starts with the specified prefix.

```python
authors_starting_with_j = Author.objects.filter(name__startswith='J')
authors_starting_with_j = Author.objects.filter(name__istartswith='j')
```

##### `endswith` / `iendswith`

Case-sensitive / case-insensitive match for whether a value ends with the specified suffix.

```python
authors_ending_with_n = Author.objects.filter(name__endswith='n')
authors_ending_with_n = Author.objects.filter(name__iendswith='n')
```

##### `range`

Matches values within the given range.

```python
authors_born_in_1990s = Author.objects.filter(birth_date__range=['1990-01-01', '1999-12-31'])
```

##### `isnull`

Matches `True` or `False` based on whether a field is `NULL` or not.

```python
authors_with_no_birth_date = Author.objects.filter(birth_date__isnull=True)
```

#### Combining Field Lookups with `Q` Objects

For more complex queries, you can combine field lookups using `Q` objects.

Retrieve authors named 'John' or born after January 1, 2000:

```python
from django.db.models import Q

authors = Author.objects.filter(Q(name='John') | Q(birth_date__gt='2000-01-01'))
```

- `Q(name='John') | Q(birth_date__gt='2000-01-01')` retrieves authors with the name 'John' or born after January 1, 2000.

#### Negating Field Lookups

You can negate field lookups using the `~` operator with `Q` objects.

Retrieve authors not named 'John':

```python
from django.db.models import Q

authors_not_named_john = Author.objects.filter(~Q(name='John'))
```

- `~Q(name='John')` retrieves authors whose name is not 'John'.

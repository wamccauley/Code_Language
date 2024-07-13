### Safely Accessing Dictionary Keys

#### Common Pitfall

Consider the following example where you want to check if a response contains a specific key, `some_id`:

```python
response = send_some_api_request()

if response['some_id']:
    pass
    # some code here
```

This code will raise a `KeyError` if `response` doesn't contain the key `'some_id'`, or if `response` is `None`, it will raise a `TypeError`. To handle this properly, we need to add checks to ensure `response` is not `None` and contains the key `'some_id'`.

#### Nested `if` Statements

One way to handle this is using nested `if` statements:

```python
if response:
    if 'some_id' in response:
        pass
        # some code here
```

This approach ensures that `response` is not `None` and contains the key `'some_id'` before attempting to access it. However, nested `if` statements can be cumbersome and less readable.

#### Simplifying with a Single `if` Statement

To improve readability, we can combine the checks into a single `if` statement:

```python
if response and 'some_id' in response:
    pass
    # some code here
```

This single line ensures that `response` is not `None` and that it contains the key `'some_id'` before executing the block of code.

#### Incorrect Order of Checks

It's important to note that the order of checks matters. Consider this incorrect example:

```python
if response['some_id'] and response:
    pass
    # some code here
```

In this case, Python will attempt to access `response['some_id']` before checking if `response` is not `None`, which can result in a `TypeError` if `response` is `None`. Always ensure that the `None` check comes before accessing keys in the dictionary.

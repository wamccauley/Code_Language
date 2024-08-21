To remove browsable API we need to remove the 'browsable API renderer' from our list of supported renderers:

```python
REST_FRAMEWORK = {
    'DEFAULT_RENDERER_CLASSES': (
        'rest_framework.renderers.JSONRenderer',
    ) if not DEBUG else []
}
```

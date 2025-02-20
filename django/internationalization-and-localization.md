### Internationalization and Localization

#### What is Internationalization (i18n)?

Internationalization (often abbreviated as i18n) is the process of designing and developing an application in such a way that it can be easily adapted to different languages, regions, and cultures without requiring changes to the underlying codebase. This process ensures that your Django application can support multiple languages and locales efficiently.

#### What is Localization (l10n)?

Localization (l10n) is the actual adaptation of your application for a specific locale, which includes translating text, adjusting formatting (e.g., for dates and numbers), and possibly adapting the content to suit local customs. Localization works hand-in-hand with internationalization to create a fully localized experience for users in different regions.

In Django, i18n and l10n are supported out-of-the-box with features like translation strings, locale-aware formatting, and time zone handling.

---

### Enabling Internationalization and Localization in Django

#### Step 1: Set Up Internationalization and Localization

To enable i18n and l10n in Django, you need to modify the `settings.py` file.

##### Update `settings.py`:

```python
USE_I18N = True  # Enable internationalization
USE_L10N = True  # Enable localization
USE_TZ = True  # Enable time zone support
```

- `USE_I18N` enables support for translating strings in your application.
- `USE_L10N` enables locale-aware formatting for numbers, dates, and time.
- `USE_TZ` allows you to work with time zones correctly by storing times in UTC and converting them based on the user’s time zone.

#### Step 2: Define the Available Languages

In `settings.py`, you can define the languages your application will support. This is done using the `LANGUAGES` setting.

```python
LANGUAGES = [
    ('en', _('English')),
    ('fr', _('French')),
    ('de', _('German')),
    ('es', _('Spanish')),
]
```

Here, the `LANGUAGES` setting is a list of tuples, where the first element is the language code (e.g., `'en'`, `'fr'`) and the second is the human-readable name for the language.

#### Step 3: Define the Language Code

The default language code is `'en'` (English), but you can change it as needed:

```python
LANGUAGE_CODE = 'en-us'  # Default language for your site
```

You can modify this depending on the default language you want to serve.

---

### Translating Strings in Django

#### Marking Strings for Translation

To translate strings in Django, you use the `gettext` (abbreviated `_`) function. This is how you mark strings for translation:

```python
from django.utils.translation import gettext as _

def greet_user(request):
    message = _("Welcome to our website!")
    return HttpResponse(message)
```

Here, `"Welcome to our website!"` will be marked for translation.

#### Step 1: Run the `makemessages` Command

After marking the strings for translation, run the `makemessages` command to generate `.po` files containing all the marked strings that need translation.

```bash
django-admin makemessages -l fr
```

This command creates a `.po` file for the specified language (in this case, French) under the `locale` directory.

#### Step 2: Translate Strings in `.po` Files

In the `.po` file for each language, you'll find the marked strings that need translation. Open the `.po` file for the specific language, and provide the translated string.

Example for `locale/fr/LC_MESSAGES/django.po`:

```po
msgid "Welcome to our website!"
msgstr "Bienvenue sur notre site web !"
```

#### Step 3: Compile the `.po` Files

Once the translations are added, you need to compile the `.po` files into `.mo` files, which Django uses to serve translations.

```bash
django-admin compilemessages
```

This will generate `.mo` files in the appropriate `locale` directories.

---

### Locale-Aware Formatting

Django provides support for formatting dates, times, numbers, and currencies according to the locale settings.

#### Formatting Dates and Times

Django uses the `date` and `time` template filters to format dates and times in a way that respects the current locale.

```html
<p>{{ user.date_joined|date:"l, F j, Y" }}</p>
```

This will format the `date_joined` field according to the locale. In the French locale, it will display something like "lundi, janvier 1, 2023."

#### Formatting Numbers and Currency

Django uses the `floatformat` and `localize` template filters to format numbers and currencies according to the locale.

```html
<p>{{ product.price|localize }}</p>
```

In the French locale, it might display the price as `€19.99` instead of `$19.99`.

---

### Time Zones in Django

Django also provides support for time zone handling, which is important for applications serving users in multiple time zones.

#### Step 1: Set Up Time Zone Support

Ensure that `USE_TZ` is set to `True` in `settings.py`, as mentioned earlier. Additionally, you can set the default time zone:

```python
TIME_ZONE = 'UTC'  # Default time zone
```

#### Step 2: Set User-Specific Time Zones

Django automatically converts times to the user's time zone, based on their preference. To set the user’s time zone, you can use `django.utils.timezone.activate()`.

```python
from django.utils import timezone

def my_view(request):
    user_timezone = request.user.profile.timezone  # Get user’s timezone from profile
    timezone.activate(user_timezone)
    return render(request, 'my_template.html')
```

---

### Using Translation in Templates

Django allows you to use translation in templates as well.

#### `&#123;% endraw %&#125;&#123;% trans %&#125;` Template Tag

The `&#123;% endraw %&#125;&#123;% trans %&#125;` tag is used in templates to mark text for translation.

```html
<h1>&#123;% endraw %&#125;&#123;% trans "Welcome to our website!" %&#125;</h1>
```

Django will replace the string with the translated version, depending on the active language.

#### `&#123;% endraw %&#125;&#123;% blocktrans %&#125;` Template Tag

For more complex translations (e.g., text with variables), you can use `&#123;% endraw %&#125;&#123;% blocktrans %&#125;`.

```html
&#123;% endraw %&#125;&#123;% blocktrans %&#125;
    Welcome, {{ user.username }}! You have {{ unread_messages }} unread messages.
&#123;% endraw %&#125;&#123;% endblocktrans %&#125;
```

This allows translation of text that includes dynamic content like variables.

---

### Changing the Language for a User

Django provides a way to change the language on a per-request basis, usually based on user preferences or browser settings.

#### Step 1: Set the Language for a User

You can change the language for the user by using the `set_language` view provided by Django.

```python
from django.utils.translation import activate
from django.shortcuts import redirect

def set_language(request):
    user_language = request.GET.get('lang', 'en')  # Get language from GET request
    activate(user_language)
    return redirect('index')  # Redirect to the main page
```

This allows users to switch the language of the site dynamically.

---

### Language Middleware

Django provides a `LocaleMiddleware` to handle automatic language selection based on the user's request. It can choose a language based on the user’s browser settings or session data.

To enable it, add the middleware to `MIDDLEWARE` in `settings.py`:

```python
MIDDLEWARE = [
    'django.middleware.locale.LocaleMiddleware',
    # other middleware...
]
```

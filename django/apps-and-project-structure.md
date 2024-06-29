# Apps and Project Structure in Django

## Project Structure

When you navigate to your terminal and run:

```sh
$ django-admin startproject myproject
```

you'll end up with a folder that has the following structure:

```sh
myproject/
   manage.py
   myproject/
      __init__.py
      settings.py
      urls.py
      wsgi.py
      asgi.py
```

- `manage.py` − This file allows you to perform various actions for your project using the command line, such as running the server, testing the project, or making migrations for the database.

- `myproject` subfolder − The inner directory is the Python package for your project. It contains:
  - `__init__.py` − Marks the directory as a Python package.
  - `settings.py` − Configuration settings for your project.
  - `urls.py` − The main URL declarations for your project.
  - `wsgi.py` − An entry point for WSGI-compatible web servers to serve your project.
  - `asgi.py` − An entry point for ASGI-compatible web servers to serve your project.

## Apps inside a Django Project

A Django project can be divided into multiple topics, called `apps`. For example, a Facebook project could have multiple apps like users, posts, groups, and events, each modularizing a specific feature.

Start by creating your app:

```sh
python manage.py startapp users
```

Then add it to the `INSTALLED_APPS` list in `settings.py` to make it recognized and accessible.

You can further organize your project by putting apps inside a folder called `apps` or any name you prefer.

### Directory and File Structure

A good way to structure your app is as follows:
(Note: I'm a DRF developer and I don't use templates.)

```sh
.
└── backend/
    ├── apps/
    │   ├── app1/
    │   │   ├── api/
    │   │   │   └── v1/
    │   │   │       ├── serializers.py
    │   │   │       ├── urls.py
    │   │   │       └── views.py
    │   │   ├── migrations/
    │   │   │   └── __init__.py
    │   │   ├── tests/
    │   │   │   ├── test_models.py
    │   │   │   ├── test_setup.py
    │   │   │   └── test_views.py
    │   │   ├── __init__.py
    │   │   ├── actions.py
    │   │   ├── admin.py
    │   │   ├── apps.py
    │   │   ├── constants.py
    │   │   ├── exceptions.py
    │   │   ├── filters.py
    │   │   ├── managers.py
    │   │   ├── messages.py
    │   │   ├── models.py
    │   │   └── views.py
    ├── backend/
    │   ├── __init__.py
    │   ├── asgi.py
    │   ├── settings.py
    │   ├── urls.py
    │   └── wsgi.py
    ├── common/
    │   ├── __init__.py
    │   ├── constants.py
    │   ├── custom_logger.py
    │   ├── exceptions.py
    │   ├── filters.py
    │   ├── generics.py
    │   ├── messages.py
    │   ├── mixins.py
    │   ├── models.py
    │   ├── pagination.py
    │   ├── permissions.py
    │   ├── swagger.py
    │   ├── utils.py
    │   └── viewsets.py
    ├── .dockerignore
    ├── .gitignore
    ├── .sample.env
    ├── Dockerfile
    ├── docker-compose.yaml
    ├── manage.py
    └── requirements.txt
```

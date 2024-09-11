To deploy a Python package to PYPI, follow these steps:

##### 1. Update Code and Files

Create setup.py:

```py
from setuptools import setup, find_packages

setup(
    name="name",
    version="0.1.0",
    packages=find_packages(),
    description="description",
    long_description=open("README.md").read(),
    long_description_content_type="text/markdown",
    author="author",
    author_email="author_email@gmail.com",
    url="https://github.com/author_email/package",
    classifiers=[
        "Programming Language :: Python :: 3",
        "License :: OSI Approved :: GNU General Public License v3 (GPLv3)",
        "Operating System :: OS Independent",
    ],
    python_requires=">=3.6",
)
```

Create package/**init**.py:

```py
from .core import MyClass
```

Create package/core.py with the pakcage core classes and functions.

##### 2. Build the Updated Package

After making changes, rebuild your package to create new distribution archives. Navigate to the directory containing your `setup.py` and run:

```bash
python setup.py sdist bdist_wheel
```

This command creates updated `.tar.gz` and `.whl` files in the `dist` directory.

##### 3. Upload the Updated Package

Upload the new distribution archives to PyPI using `twine`. Run:

```bash
twine upload dist/*
```

You’ll need to authenticate with your PyPI credentials or API token.

##### 4. Verify the Update

After uploading, check that the updated version of your package is available on PyPI by visiting your project page at `https://pypi.org/project/your-package/`.

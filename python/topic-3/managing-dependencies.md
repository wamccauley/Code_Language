## Managing Dependencies

### Installing `pip`

`pip` is the package installer for Python, allowing you to install and manage additional libraries and dependencies that are not part of the Python standard library.

### Windows

1. **Download get-pip.py:**

   - Open a web browser and navigate to the [get-pip.py](https://bootstrap.pypa.io/get-pip.py) page.
   - Right-click on the page and select "Save As" to save the file to your preferred location.

2. **Install `pip`:**
   - Open Command Prompt (cmd) or PowerShell.
   - Navigate to the directory where you saved `get-pip.py`.
   - Run the following command:
     ```shell
     python get-pip.py
     ```
   - Verify the installation by running:
     ```shell
     pip --version
     ```

### macOS

1. **Ensure Python is installed:**

   - macOS comes with Python pre-installed. However, it is recommended to use `brew` to install the latest version.
   - Install Homebrew if you haven't already:
     ```shell
     /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
     ```
   - Install Python using Homebrew:
     ```shell
     brew install python
     ```

2. **Install `pip`:**
   - `pip` is included with Python installations via Homebrew. Verify the installation by running:
     ```shell
     pip3 --version
     ```

### Linux

1. **Ensure Python is installed:**

   - Most Linux distributions come with Python pre-installed. You can check if Python is installed by running:
     ```shell
     python3 --version
     ```

2. **Install `pip`:**
   - For Debian-based distributions (e.g., Ubuntu):
     ```shell
     sudo apt update
     sudo apt install python3-pip
     ```
   - For Red Hat-based distributions (e.g., CentOS):
     ```shell
     sudo yum install python3-pip
     ```
   - Verify the installation by running:
     ```shell
     pip3 --version
     ```

## Setting Up a Virtual Environment

Using a virtual environment is a good practice to manage dependencies for different projects separately.

### Creating a Virtual Environment

1. **Navigate to your project directory:**

   ```shell
   cd /path/to/your/project
   ```

2. **Create a virtual environment:**
   ```shell
   python3 -m venv venv
   ```
   This command creates a new directory named `venv` containing the virtual environment.

### Activating the Virtual Environment

- **Windows:**

  ```shell
  venv\Scripts\activate
  ```

- **macOS and Linux:**
  ```shell
  source venv/bin/activate
  ```

You should see the name of your virtual environment in the terminal prompt, indicating that the virtual environment is active.

### Deactivating the Virtual Environment

To deactivate the virtual environment, simply run:

```shell
deactivate
```

## Installing Dependencies

Dependencies for a project are typically listed in a `requirements.txt` file.

### Creating a `requirements.txt` File

To generate a `requirements.txt` file for your project, run:

```shell
pip freeze > requirements.txt
```

This command lists all the installed packages and their versions and saves them to `requirements.txt`.

### Installing Dependencies from `requirements.txt`

To install the dependencies listed in `requirements.txt`, ensure your virtual environment is activated, then run:

```shell
pip install -r requirements.txt
```

# Must-Know Linux Commands

## Navigation Commands

### `ls` - List Directory Contents

Lists files and directories in the current directory.

```sh
ls           # Lists all files and directories
ls -l        # Lists with detailed information (permissions, owner, size, etc.)
ls -a        # Lists all files including hidden files
ls -lh       # Lists with human-readable file sizes
```

### `cd` - Change Directory

Changes the current working directory.

```sh
cd /path/to/directory   # Navigate to specified directory
cd ~                    # Navigate to home directory
cd ..                   # Move up one directory level
cd -                    # Go to the previous directory
```

### `pwd` - Print Working Directory

Displays the current directory path.

```sh
pwd                    # Prints the full path of the current directory
```

## File Operations

### `cp` - Copy Files and Directories

Copies files or directories from one location to another.

```sh
cp source.txt destination.txt          # Copy file
cp -r /source/directory /destination/  # Copy directory recursively
```

### `mv` - Move/Rename Files and Directories

Moves or renames files or directories.

```sh
mv oldname.txt newname.txt             # Rename file
mv file.txt /path/to/new/location/     # Move file to a different directory
```

### `rm` - Remove Files or Directories

Deletes files or directories.

```sh
rm file.txt                  # Remove file
rm -r /path/to/directory/    # Remove directory recursively
rm -i file.txt               # Prompt before removing
```

### `touch` - Create an Empty File

Creates an empty file or updates the timestamp of an existing file.

```sh
touch newfile.txt            # Create an empty file or update timestamp
```

### `mkdir` - Create Directories

Creates new directories.

```sh
mkdir newdirectory           # Create a new directory
mkdir -p /path/to/directory  # Create nested directories
```

## File Viewing and Editing

### `cat` - Concatenate and Display Files

Displays the contents of a file.

```sh
cat file.txt                 # Display file contents
cat file1.txt file2.txt      # Display contents of multiple files
```

### `less` - View File Contents

Views file contents one screen at a time.

```sh
less file.txt                # View file with navigation
```

### `head` - Display Beginning of File

Displays the first few lines of a file.

```sh
head file.txt                # Display the first 10 lines (default)
head -n 20 file.txt          # Display the first 20 lines
```

### `tail` - Display End of File

Displays the last few lines of a file.

```sh
tail file.txt                # Display the last 10 lines (default)
tail -n 20 file.txt          # Display the last 20 lines
tail -f logfile.txt          # Continuously monitor file for new lines
```

### `nano` - Simple Text Editor

A simple, user-friendly text editor.

```sh
nano file.txt                # Open file in nano editor
```

### `vim` - Advanced Text Editor

A powerful text editor with extensive features.

```sh
vim file.txt                 # Open file in vim editor
```

## System Information

### `uname` - System Information

Displays system information.

```sh
uname -a                     # Detailed system information
uname -r                     # Kernel version
```

### `df` - Disk Space Usage

Displays disk space usage of file systems.

```sh
df -h                        # Human-readable disk space usage
```

### `du` - Disk Usage

Displays disk usage of files and directories.

```sh
du -h /path/to/directory     # Human-readable disk usage
du -sh /path/to/directory    # Summary of disk usage for a directory
```

### `top` - Task Manager

Displays real-time system processes and resource usage.

```sh
top                          # View running processes
```

### `ps` - Process Status

Displays information about active processes.

```sh
ps                           # Snapshot of current processes
ps aux                       # Detailed list of all processes
```

### `htop` - Interactive Process Viewer

An interactive process viewer (similar to `top`).

```sh
htop                         # Start htop
```

## Network Commands

### `ifconfig` - Network Interface Configuration

Displays or configures network interfaces (use `ip` for newer systems).

```sh
ifconfig                     # Display network interfaces
```

### `ip` - IP Address Configuration

Displays or configures network interfaces.

```sh
ip addr                      # Display IP addresses
ip link                      # Display network interfaces
```

### `ping` - Check Network Connectivity

Tests connectivity to a network host.

```sh
ping www.example.com         # Ping a domain
ping 192.168.1.1             # Ping an IP address
```

### `wget` - Download Files from the Web

Downloads files from the internet.

```sh
wget http://example.com/file.txt  # Download a file
```

### `curl` - Transfer Data from or to a Server

Transfers data using various network protocols.

```sh
curl http://example.com      # Fetch content from URL
curl -O http://example.com/file.txt  # Download a file
```

### `ssh` - Secure Shell

Connects to a remote machine securely.

```sh
ssh user@hostname            # Connect to remote host
ssh -i keyfile user@hostname # Connect using SSH key
```

## File Permissions

### `chmod` - Change File Permissions

Modifies file or directory permissions.

```sh
chmod 755 file.sh            # Set read, write, execute for owner; read and execute for group and others
chmod +x file.sh             # Add execute permission
```

### `chown` - Change File Owner and Group

Changes the ownership of a file or directory.

```sh
chown user:group file.txt    # Change owner and group
chown user file.txt          # Change owner only
```

## Package Management

### APT (Debian-based Systems)

```sh
sudo apt update              # Update package index
sudo apt install package     # Install a package
sudo apt upgrade             # Upgrade all packages
sudo apt remove package      # Remove a package
```

### YUM/DNF (Red Hat-based Systems)

```sh
sudo yum update              # Update package index (YUM)
sudo dnf update              # Update package index (DNF)
sudo yum install package     # Install a package (YUM)
sudo dnf install package     # Install a package (DNF)
sudo yum remove package      # Remove a package (YUM)
sudo dnf remove package      # Remove a package (DNF)
```

### Pacman (Arch-based Systems)

```sh
sudo pacman -Syu             # Synchronize and update packages
sudo pacman -S package       # Install a package
sudo pacman -R package       # Remove a package
```

## Other Useful Commands

### `grep` - Search Text Using Patterns

Searches for text patterns within files.

```sh
grep "pattern" file.txt      # Search for a pattern in a file
grep -r "pattern" /path      # Recursive search in a directory
```

### `find` - Search for Files and Directories

Searches for files and directories.

```sh
find /path -name "file.txt"  # Find a file by name
find /path -type d           # Find directories
```

### `tar` - Archive Files

Creates or extracts archives.

```sh
tar -cvf archive.tar /path   # Create a tar archive
tar -xvf archive.tar         # Extract a tar archive
tar -czvf archive.tar.gz /path  # Create a compressed archive
tar -xzvf archive.tar.gz     # Extract a compressed archive
```

### `zip`/`unzip` - Compress and Decompress Files

Creates or extracts zip archives.

```sh
zip archive.zip file.txt     # Create a zip archive
unzip archive.zip            # Extract a zip archive
```

### `rsync` - Remote File and Directory Synchronization

Synchronizes files and directories between two locations.

```sh
rsync -av /source /destination  # Synchronize source to destination
rsync -avz /source user@remote:/destination  # Synchronize to a remote location
```

### `crontab` - Schedule Tasks

Schedules and manages recurring tasks.

```sh
crontab -e                   # Edit the current user's cron jobs
crontab -l                   # List the current user's cron jobs
```

### `echo` - Display a Line of Text

Outputs text to the terminal or to a file.

```sh
echo "Hello, World!"         # Display text
echo "Text" > file.txt       # Write text to a file
echo "More text" >> file.txt # Append text to a file
```

### `man` - Manual Pages

Displays the manual page for a command.

```sh
man ls                       # Display manual for the `ls` command
```

### `alias` - Create Aliases for Commands

Creates shortcuts for commands.

```sh
alias ll='ls -la'            # Create an alias for a long listing format
```

### `history` - Command History

Shows the command history.

```sh
history                      # Display command history
!123                         # Re-run command number
```

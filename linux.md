# Linux: An Overview

## What is Linux?

Linux is an open-source operating system (OS) kernel created by Linus Torvalds in 1991. Unlike proprietary operating systems like Windows or macOS, Linux is based on Unix-like principles and is freely available for anyone to use, modify, and distribute. It forms the foundation of various operating systems collectively known as Linux distributions, or "distros."

### Key Features of Linux:
- **Open Source**: The source code is freely available and can be modified by anyone.
- **Security**: Linux is known for its robust security features.
- **Stability and Performance**: Linux systems are highly stable and can run for extended periods without crashing.
- **Flexibility**: Suitable for various environments, from desktops to servers and embedded systems.
- **Community Support**: Strong support from a large global community of developers and users.

## How Distributions (Distros) Work

A Linux distribution is an OS made from a software collection that includes the Linux kernel, system libraries, and software applications. Each distro is tailored for different user needs and preferences, providing unique features, package management systems, and default configurations.

### Components of a Linux Distribution:
- **Linux Kernel**: The core of the OS that manages hardware resources.
- **GNU Tools and Libraries**: Essential system utilities and libraries that work with the kernel.
- **Package Manager**: Software that automates the installation, upgrading, configuration, and removal of programs. Examples include APT (Debian-based), YUM/DNF (Red Hat-based), and Pacman (Arch-based).
- **Desktop Environment**: The graphical user interface (GUI) users interact with, such as GNOME, KDE, or XFCE.
- **Applications**: Pre-installed software such as web browsers, office suites, and media players.

### Popular Linux Distributions:
- **Ubuntu**: User-friendly, based on Debian, suitable for beginners.
- **Fedora**: Cutting-edge features, sponsored by Red Hat, aimed at developers and system administrators.
- **Debian**: Known for its stability and vast software repository.
- **Arch Linux**: Rolling release model, minimalistic, and highly customizable.
- **CentOS**: Community-supported, derived from Red Hat Enterprise Linux, used in servers.
- **Linux Mint**: Based on Ubuntu, popular for its ease of use and pre-installed multimedia support.

## Essential Knowledge for Using Linux

### Basic Commands:
- **Navigation**: `ls` (list files), `cd` (change directory), `pwd` (print working directory)
- **File Operations**: `cp` (copy files), `mv` (move/rename files), `rm` (remove files)
- **System Info**: `uname -a` (system information), `df -h` (disk space usage), `top` (process monitoring)
- **Package Management**:
  - Debian-based (APT): `sudo apt update`, `sudo apt install <package>`, `sudo apt upgrade`
  - Red Hat-based (YUM/DNF): `sudo yum install <package>`, `sudo dnf update`
  - Arch-based (Pacman): `sudo pacman -Syu`, `sudo pacman -S <package>`

### File Permissions:
- **Understanding Permissions**: `r` (read), `w` (write), `x` (execute)
- **Changing Permissions**: `chmod` (change file mode bits), `chown` (change file owner)
- **Example**: `chmod 755 file.sh` (rwxr-xr-x), `chown user:group file.sh`

### Shell Scripting:
- **Basics**: Writing and executing simple scripts with `#!/bin/bash` at the start.
- **Variables and Loops**: Using variables (`$VAR`), loops (`for`, `while`), and conditionals (`if`, `else`).
- **Example Script**:
    ```bash
    #!/bin/bash
    echo "Hello, World!"
    for i in {1..5}; do
        echo "Iteration $i"
    done
    ```

### System Administration:
- **User Management**: `adduser`, `deluser`, `usermod`
- **Service Management**: `systemctl start <service>`, `systemctl stop <service>`, `systemctl enable <service>`
- **Networking**: `ifconfig`, `ip`, `ping`, `ssh`



# Understanding Kernels, Bootloaders, and GRUB

## The Kernel

### What is the Kernel?

The kernel is the core component of an operating system, acting as a bridge between the hardware and software. It manages system resources and allows applications to interact with hardware components such as the CPU, memory, and peripheral devices.

### Functions of the Kernel:
- **Process Management**: Controls processes, including scheduling, creation, and termination.
- **Memory Management**: Manages memory allocation and deallocation, ensuring efficient use of RAM.
- **Device Management**: Manages communication between hardware devices and software.
- **File System Management**: Handles file operations and manages file system access.
- **System Calls**: Provides an interface for applications to request services from the kernel.

### Types of Kernels:
- **Monolithic Kernels**: All essential operating system services run in the kernel space, leading to efficient performance. Examples: Linux, Unix.
- **Microkernels**: Only the most fundamental services run in kernel space, with other services running in user space. This design improves modularity and stability. Example: Minix, QNX.
- **Hybrid Kernels**: Combine elements of monolithic and microkernel designs. Example: Windows NT.

### The Linux Kernel:
The Linux kernel, initially released by Linus Torvalds in 1991, is a monolithic kernel used in various Linux distributions. It is open-source, highly configurable, and supports a wide range of hardware platforms.

## The Boot Process

The boot process is the sequence of events that occurs when a computer is powered on and the operating system is loaded into memory. Here’s an overview of the stages in the boot process:

1. **BIOS/UEFI Initialization**:
   - The Basic Input/Output System (BIOS) or Unified Extensible Firmware Interface (UEFI) initializes hardware components and performs a Power-On Self Test (POST) to ensure everything is functioning correctly.
   - BIOS/UEFI locates and executes the bootloader from the bootable device (e.g., HDD, SSD).

2. **Bootloader Execution**:
   - The bootloader is a small program that loads the operating system kernel into memory.
   - Common bootloaders include GRUB (GRand Unified Bootloader) and LILO (Linux Loader).

3. **Kernel Loading**:
   - The bootloader loads the kernel and initial RAM disk (initrd or initramfs) into memory.
   - The kernel initializes hardware components, mounts the root file system, and starts the initial process (`init` or `systemd`).

4. **System Initialization**:
   - The `init` process or `systemd` initializes user-space services and sets up the user environment.
   - The system reaches a state where users can log in and interact with the OS.

## The Bootloader

### What is a Bootloader?

A bootloader is a program that loads the operating system kernel into memory and starts its execution. It also allows users to select from multiple operating systems installed on the system.

### Common Bootloaders:
- **GRUB (GRand Unified Bootloader)**: The most widely used bootloader for Linux systems, supporting a wide range of file systems and configurations.
- **LILO (Linux Loader)**: An older bootloader that has largely been replaced by GRUB.
- **Syslinux/EXTlinux**: Lightweight bootloaders often used for live USBs and embedded systems.

### Bootloader Stages:
1. **Stage 1**: Located in the Master Boot Record (MBR) or the GUID Partition Table (GPT). It loads the Stage 1.5 or Stage 2 bootloader.
2. **Stage 1.5**: Optional intermediate stage that understands file systems, allowing the Stage 2 bootloader to be located and loaded.
3. **Stage 2**: The main bootloader that presents the user with a menu to select the operating system and loads the selected OS kernel.

## GRUB (GRand Unified Bootloader)

### What is GRUB?

GRUB is the default bootloader for many Linux distributions. It is highly configurable and supports multiple operating systems, file systems, and advanced features like scripting and network booting.

### GRUB Versions:
- **GRUB Legacy**: The original version, now largely replaced by GRUB 2.
- **GRUB 2**: The current version with improved features, modular design, and better support for modern hardware.

### GRUB Configuration:
- **Configuration File**: `/boot/grub/grub.cfg`
- **Default File**: `/etc/default/grub` (used to generate `grub.cfg`)

### Key GRUB Commands:
- **Update GRUB Configuration**:
  ```sh
  sudo update-grub   # Debian-based systems
  sudo grub-mkconfig -o /boot/grub/grub.cfg  # Other systems
  ```
- **Install GRUB**:
  ```sh
  sudo grub-install /dev/sdX  # Replace X with the appropriate drive letter
  ```

### GRUB Configuration Example:
```sh
# /etc/default/grub
GRUB_DEFAULT=0
GRUB_TIMEOUT=5
GRUB_DISTRIBUTOR=`lsb_release -i -s 2> /dev/null || echo Debian`
GRUB_CMDLINE_LINUX_DEFAULT="quiet splash"
GRUB_CMDLINE_LINUX=""

# /boot/grub/grub.cfg (generated)
menuentry 'Ubuntu' --class ubuntu --class gnu-linux --class gnu --class os {
    recordfail
    load_video
    gfxmode $linux_gfx_mode
    insmod gzio
    insmod part_msdos
    insmod ext2
    set root='hd0,msdos1'
    linux /boot/vmlinuz-5.4.0-42-generic root=UUID=xxxx ro quiet splash
    initrd /boot/initrd.img-5.4.0-42-generic
}
```

## Advanced Bootloader Concepts

### Chainloading:
Chainloading allows one bootloader to load another bootloader. This is useful for systems with multiple operating systems that each have their own bootloaders.
```sh
menuentry "Chainload Another GRUB" {
    set root=(hd0,1)
    chainloader +1
}
```

### Rescue Mode:
If GRUB fails to boot, it enters rescue mode, allowing users to manually boot the system or repair the bootloader.
- **Example Commands**:
  ```sh
  set root=(hd0,1)
  linux /boot/vmlinuz root=/dev/sda1
  initrd /boot/initrd.img
  boot
  ```



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


# Understanding the Linux File System Architecture

## The Linux File System Hierarchy

The Linux file system is structured in a hierarchical format, starting from the root directory `/` and branching into subdirectories. Each directory has a specific purpose, and understanding these can help you navigate and manage a Linux system more effectively.

### Root Directory `/`

The root directory is the top-level directory in the Linux file system hierarchy. All other directories and files are nested within this root directory.

## Key Directories Under `/`

### `/bin` - Essential User Binaries
Contains essential command binaries (executables) needed for single-user mode and for all users. These commands are required for the system to boot and function correctly.
- Examples: `ls`, `cp`, `mv`, `bash`

### `/sbin` - System Binaries
Holds essential system binaries that are typically used by the system administrator. These binaries are crucial for system maintenance and repair.
- Examples: `fsck`, `reboot`, `shutdown`, `ifconfig`

### `/etc` - Configuration Files
Contains all the system-wide configuration files and shell scripts that are used to boot and initialize system settings.
- Examples: `/etc/passwd` (user account information), `/etc/fstab` (file system mount points), `/etc/hosts` (hostname to IP mappings)

### `/home` - User Home Directories
Holds the home directories of all users. Each user has a subdirectory under `/home` where their personal files, configurations, and settings are stored.
- Example: `/home/username` (home directory for the user `username`)

### `/root` - Root User's Home Directory
The home directory of the root user (the superuser). It is separate from the `/home` directory to ensure the root user's files are isolated for security and system integrity.
- Example: `/root`

### `/lib` - Essential Shared Libraries
Contains essential shared libraries and kernel modules required for the binaries in `/bin` and `/sbin`.
- Examples: `libc.so`, `libdl.so`

### `/usr` - User Binaries and Read-Only Data
Stands for "Unix System Resources" and contains user utilities and applications. This directory is further subdivided to organize its contents.
- **`/usr/bin`**: Non-essential command binaries for all users (e.g., `gcc`, `make`)
- **`/usr/sbin`**: Non-essential system binaries for the superuser (e.g., `apache2`, `vsftpd`)
- **`/usr/lib`**: Libraries for `/usr/bin` and `/usr/sbin`
- **`/usr/share`**: Architecture-independent data (e.g., documentation, icons, default configurations)

### `/var` - Variable Files
Contains variable data files. This includes files that are expected to grow over time, such as logs, databases, cache, and spool files.
- **`/var/log`**: Log files (e.g., `syslog`, `dmesg`)
- **`/var/spool`**: Spool directories for tasks like printing and mail
- **`/var/tmp`**: Temporary files preserved between reboots

### `/tmp` - Temporary Files
Holds temporary files created by system and user processes. Files in `/tmp` are often deleted on system reboot.
- Example: Temporary storage for downloads and installations

### `/dev` - Device Files
Contains device files that represent hardware devices. These are special files that allow software to interact with hardware devices like disks, terminals, and printers.
- Examples: `/dev/sda` (first hard drive), `/dev/tty` (terminals), `/dev/null` (null device)

### `/mnt` - Mount Directory
A generic mount point under which temporary file systems can be mounted. Often used for mounting external storage devices like USB drives.
- Example: `/mnt/usb`

### `/media` - Removable Media
Contains subdirectories for mounting removable media such as USB drives, CD-ROMs, and DVDs.
- Example: `/media/cdrom`

### `/opt` - Optional Packages
Used for installing additional software packages that are not part of the default Linux distribution. Often contains commercial software.
- Example: `/opt/mysoftware`

### `/srv` - Service Data
Holds data for services provided by the system, such as web and FTP servers.
- Examples: `/srv/www` (web server data), `/srv/ftp` (FTP server data)

### `/proc` - Process Information
A virtual file system that provides a mechanism to access process information and kernel information. It contains a hierarchy of special files representing the current state of the kernel.
- Examples: `/proc/cpuinfo` (CPU information), `/proc/meminfo` (memory information)

### `/sys` - System Information
Another virtual file system similar to `/proc` that exposes information about the system and allows interaction with the kernel.
- Examples: `/sys/class` (device classes), `/sys/block` (block devices)

### `/run` - Runtime Data
Contains transient runtime data since the last boot. It is used for storing data that should not persist across reboots.
- Examples: `/run/lock` (lock files), `/run/user` (user-specific runtime data)

### `/boot` - Boot Loader Files
Contains files related to the boot loader and kernel. These are essential for the system to boot.
- Examples: `vmlinuz` (kernel image), `initrd.img` (initial RAM disk)

### `/lost+found` - Recovered Files
A directory used by the `fsck` (file system check) utility for recovering lost files. It exists on every partition with a file system.
- Example: `/lost+found` (contains recovered file fragments)

## Understanding How It All Works Together

The Linux file system hierarchy is designed to keep the system organized and efficient. Each directory has a specific role, ensuring that files are systematically categorized based on their function and usage. This structure allows users and system administrators to easily locate and manage files and ensures that the operating system operates smoothly.

- **System Binaries and Libraries**: Core system binaries and libraries are placed in `/bin`, `/sbin`, and `/lib` to ensure they are available during the boot process and in single-user mode.
- **User Data**: User-specific files and configurations are stored in `/home`, ensuring each user's data is isolated and protected.
- **Configuration and Logs**: System-wide configuration files in `/etc` and logs in `/var/log` help manage and troubleshoot the system effectively.
- **Device Management**: The `/dev` and `/sys` directories provide an interface to hardware devices, allowing the kernel and user space programs to interact with the hardware.
- **Temporary and Variable Data**: Temporary files in `/tmp` and variable data in `/var` ensure that transient and growing data is separated from static system files.

Understanding this hierarchy is crucial for effective system administration, troubleshooting, and maintaining a Linux system.


# Random Notes (May not be Linux related)

## Connecting via SSH

To connect to a server using SSH on a specific port:
```sh
ssh -p 65535 root@255.255.255.255
```

## Identifying the Linux Distribution

To find out which Linux distribution you are using:
```sh
hostnamectl
```

## Setting Up a Cron Job

To set up a cron job that accesses a page to run a code:
```sh
curl -s -o /path/to/save/output.txt https://domain.com/index.php?route=page/subpage >/dev/null 2>&1
```

## Updating a Django App

To update a Django application:
```sh
sudo systemctl daemon-reload
sudo systemctl restart gunicorn
sudo systemctl restart nginx
```

## Installing `mysqlclient` in a Virtual Environment

While installing `mysqlclient` in a virtual environment, you might encounter the following error:
```sh
(venv) root@server:~/backend# pip3 install mysqlclient
File "<string>", line 28, in find_package_name
      Exception: Can not find valid pkg-config name.
      Specify MYSQLCLIENT_CFLAGS and MYSQLCLIENT_LDFLAGS env vars manually
      [end of output]

  note: This error originates from a subprocess, and is likely not a problem with pip.
error: subprocess-exited-with-error

× Getting requirements to build wheel did not run successfully.
│ exit code: 1
╰─> See above for output.
```

### Solution:
```sh
sudo apt-get update
sudo apt-get install pkg-config
sudo apt-get install libmysqlclient-dev
pip3 install mysqlclient
```

## SSH Connection Batch Script (Windows)

For automating SSH connections using PuTTY, create a batch file `SSH.bat`:

```bat
@echo off
set HOST=255.255.255.255
set PORT=65535
set USER=root
set PASSWORD=root

start "" "C:\Program Files\PuTTY\putty.exe" -pw %PASSWORD% -P %PORT% -ssh %USER%@%HOST%
```

## MySQL Commands

To login to MySQL as root:
```sh
sudo mysql -u root -p
```

### MySQL SQL Commands:
```sql
CREATE USER 'django_user'@'your_django_server_ip' IDENTIFIED BY 'strong_password';
GRANT ALL PRIVILEGES ON your_database.* TO 'django_user'@'your_django_server_ip';
FLUSH PRIVILEGES;
```

## MySQL Configuration and Commands

### Fix Django Remote MySQL Errors
Refer to: [10web.io blog](https://10web.io/blog/mysql-error-2003/)

### Restart MySQL Service
```sh
systemctl restart mysqld.service
```

### MySQL Configuration File `/etc/mysql/my.cnf`
```ini
[mysqld]
max_allowed_packet=64M
local-infile=0
innodb_file_per_table
sql-mode="NO_ENGINE_SUBSTITUTION"
```

### MySQL Commands
```sh
sudo mysql -u root -p
```
```sql
SELECT @@sql_mode; 
SET sql_mode='';
SELECT VERSION();
```
```sh
mysql --version
```

### Finding MySQL Configuration Files
```sh
find /etc -name *.cnf
```

## System Monitoring Commands

### Check CPU Usage, Free Disk Space, and Folder/File Size
```sh
# Check CPU usage
top

# Check free disk space
df -h

# Check file and folder sizes
du -sh /path/to/directory
```

## .htaccess Configuration for Angular Routes

To configure `.htaccess` for Angular routes:
```apache
RewriteEngine on
RewriteCond %{REQUEST_FILENAME} -s [OR]
RewriteCond %{REQUEST_FILENAME} -l [OR]
RewriteCond %{REQUEST_FILENAME} -d
RewriteRule ^.*$ - [NC,L]

RewriteRule ^(.*) /index.html [NC,L]
```
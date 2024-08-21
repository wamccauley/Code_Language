There are multiple ways to share files through SSH:

### 1. **Using SCP (Secure Copy Protocol)**

**SCP** is a straightforward method for copying files between hosts on a network.

#### Basic Syntax:

```bash
scp [options] [source] [destination]
```

#### Examples:

- **Copying a file from local to remote:**

  ```bash
  scp /path/to/localfile username@remotehost:/path/to/remotefile
  ```

- **Copying a file from remote to local:**

  ```bash
  scp username@remotehost:/path/to/remotefile /path/to/localfile
  ```

- **Copying a directory recursively from local to remote:**

  ```bash
  scp -r /path/to/localdirectory username@remotehost:/path/to/remotedirectory
  ```

- **Copying a directory recursively from remote to local:**
  ```bash
  scp -r username@remotehost:/path/to/remotedirectory /path/to/localdirectory
  ```

### 2. **Using SFTP (SSH File Transfer Protocol)**

**SFTP** is an interactive file transfer program that uses the SSH protocol. It is useful for transferring files and navigating remote directories.

#### Connect to Remote Server:

```bash
sftp username@remotehost
```

#### Common Commands:

- **Listing files in the remote directory:**

  ```bash
  ls
  ```

- **Change directory on remote server:**

  ```bash
  cd /path/to/directory
  ```

- **Upload a file to the remote server:**

  ```bash
  put localfile
  ```

- **Download a file from the remote server:**

  ```bash
  get remotefile
  ```

- **Upload a directory recursively:**

  ```bash
  put -r localdirectory
  ```

- **Download a directory recursively:**
  ```bash
  get -r remotedirectory
  ```

### 3. **Using RSYNC**

**RSYNC** is a versatile tool for syncing files and directories between local and remote systems. It is efficient and can resume transfers.

#### Basic Syntax:

```bash
rsync [options] [source] [destination]
```

#### Examples:

- **Sync a local directory with a remote directory:**

  ```bash
  rsync -avz /path/to/localdirectory username@remotehost:/path/to/remotedirectory
  ```

- **Sync a remote directory with a local directory:**

  ```bash
  rsync -avz username@remotehost:/path/to/remotedirectory /path/to/localdirectory
  ```

- **Exclude files or directories from being synced:**
  ```bash
  rsync -avz --exclude='*.tmp' /path/to/localdirectory username@remotehost:/path/to/remotedirectory
  ```

### 4. **Using SSHFS (SSH Filesystem)**

**SSHFS** allows you to mount a remote filesystem over SSH, so you can interact with remote files as if they were local.

#### Installation:

- **On Debian/Ubuntu:**

  ```bash
  sudo apt-get install sshfs
  ```

- **On Red Hat/CentOS:**
  ```bash
  sudo yum install sshfs
  ```

#### Mount a Remote Directory:

```bash
sshfs username@remotehost:/path/to/remotedirectory /path/to/localmountpoint
```

#### Unmount the Directory:

```bash
fusermount -u /path/to/localmountpoint
```

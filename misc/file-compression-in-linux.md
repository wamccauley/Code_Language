
## Compressing and decompressing tools:

### 1. `zip` and `unzip`

- **`zip`**: This is one of the most popular tools for creating compressed files in Linux. It packages files and directories into a single archive file with a `.zip` extension.
  
  **Usage**:
  ```bash
  zip archive_name.zip file1 file2 dir1
  ```

- **`unzip`**: This tool is used to extract files from a `.zip` archive.
  
  **Usage**:
  ```bash
  unzip archive_name.zip
  ```

### 2. `tar`

- **`tar`**: Short for Tape Archive, `tar` is commonly used to combine multiple files into a single file, known as a tarball, with extensions like `.tar`. While `tar` itself does not compress files, it is often used in conjunction with compression tools like `gzip` or `bzip2`.

  **Usage**:
  ```bash
  tar -cvf archive_name.tar file1 file2 dir1
  ```

### 3. `gzip` and `gunzip`

- **`gzip`**: This tool compresses files using the GNU zip algorithm, typically resulting in `.gz` files.

  **Usage**:
  ```bash
  gzip file1
  ```

- **`gunzip`**: This is used to decompress `.gz` files.

  **Usage**:
  ```bash
  gunzip file1.gz
  ```

- **Combining `tar` and `gzip`**:
  ```bash
  tar -czvf archive_name.tar.gz file1 file2 dir1
  tar -xzvf archive_name.tar.gz
  ```

### 4. `bzip2` and `bunzip2`

- **`bzip2`**: This tool provides higher compression ratios than `gzip`, but it is slower. It results in files with a `.bz2` extension.

  **Usage**:
  ```bash
  bzip2 file1
  ```

- **`bunzip2`**: This is used to decompress `.bz2` files.

  **Usage**:
  ```bash
  bunzip2 file1.bz2
  ```

- **Combining `tar` and `bzip2`**:
  ```bash
  tar -cjvf archive_name.tar.bz2 file1 file2 dir1
  tar -xjvf archive_name.tar.bz2
  ```

### 5. `xz` and `unxz`

- **`xz`**: This tool provides high compression ratios and is used to compress files to `.xz` format.

  **Usage**:
  ```bash
  xz file1
  ```

- **`unxz`**: This is used to decompress `.xz` files.

  **Usage**:
  ```bash
  unxz file1.xz
  ```

- **Combining `tar` and `xz`**:
  ```bash
  tar -cJvf archive_name.tar.xz file1 file2 dir1
  tar -xJvf archive_name.tar.xz
  ```

### 6. `7z` and `p7zip`

- **`7z`**: This is the command-line version of the 7-Zip compression tool, providing high compression ratios. The files compressed by this tool typically have a `.7z` extension.

  **Usage**:
  ```bash
  7z a archive_name.7z file1 file2 dir1
  ```

- **`p7zip`**: This is a Unix port of 7-Zip, providing the `7z` and `7za` commands.

- **`7z` Extraction**:
  ```bash
  7z x archive_name.7z
  ```

## Permissions in Linux

File permissions in Unix and Linux are represented by a three-digit octal number. Each digit can be a value from 0 to 7, representing different levels of permission. The three digits are assigned to:

1. **User (Owner)**
2. **Group**
3. **Others**

Each digit is a sum of the following values:

| Number | Permission    | Symbol |
| ------ | ------------- | ------ |
| 0      | No Permission | ---    |
| 1      | Execute       | --x    |
| 2      | Write         | -w-    |
| 4      | Read          | r--    |

These values can be combined to form other permissions:

| Number | Permission           | Symbol |
| ------ | -------------------- | ------ |
| 3      | Write and Execute    | -wx    |
| 5      | Read and Execute     | r-x    |
| 6      | Read and Write       | rw-    |
| 7      | Read, Write, Execute | rwx    |

### Examples

- **777**: Read, write, and execute permissions for user, group, and others.

  ```sh
  chmod 777 filename
  ```

  Permissions: `rwxrwxrwx`

- **755**: Read, write, and execute permissions for user; read and execute permissions for group and others.

  ```sh
  chmod 755 filename
  ```

  Permissions: `rwxr-xr-x`

- **644**: Read and write permissions for user; read-only permissions for group and others.

  ```sh
  chmod 644 filename
  ```

  Permissions: `rw-r--r--`

### Permissions Table

| Number | User (Owner)         | Group                | Others               | Symbol |
| ------ | -------------------- | -------------------- | -------------------- | ------ |
| 0      | No Permission        | No Permission        | No Permission        | ---    |
| 1      | Execute              | Execute              | Execute              | --x    |
| 2      | Write                | Write                | Write                | -w-    |
| 3      | Write and Execute    | Write and Execute    | Write and Execute    | -wx    |
| 4      | Read                 | Read                 | Read                 | r--    |
| 5      | Read and Execute     | Read and Execute     | Read and Execute     | r-x    |
| 6      | Read and Write       | Read and Write       | Read and Write       | rw-    |
| 7      | Read, Write, Execute | Read, Write, Execute | Read, Write, Execute | rwx    |

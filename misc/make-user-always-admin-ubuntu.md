To make a user always admin on an Ubuntu server:

1. **Grant the user passwordless sudo access:**

   Edit the sudoers file using `visudo` to ensure syntax correctness:

   ```bash
   sudo visudo
   ```

   Add the following line to the file, replacing `username` with the actual username:

   ```bash
   username ALL=(ALL) NOPASSWD: ALL
   ```

   This configuration allows `username` to run any command without being prompted for a password.

2. **Alternatively, you can give a user root access directly (not recommended due to security risks):**

   ```bash
   sudo usermod -aG sudo username
   ```

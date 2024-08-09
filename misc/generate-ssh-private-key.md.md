1. **Generate SSH Key Pair**:
   You can generate an SSH key pair using the `ssh-keygen` command.

   ```bash
   ssh-keygen -t rsa -b 4096 -C "email@example.com"
   ```

   - `-t rsa`: Specifies the RSA algorithm.
   - `-b 4096`: Uses a 4096-bit key.
   - `-C "email@example.com"`: Adds a label (optional).

   When prompted, you can specify a file to save the key (e.g., `~/.ssh/id_rsa`), or press Enter to accept the default. You may also be prompted to enter a passphrase (optional, but recommended).

2. **Copy the Private Key**:
   After generating the key, you will have two files: the private key (`id_rsa`) and the public key (`id_rsa.pub`). You need to copy the contents of the private key file.

   ```bash
   cat ~/.ssh/id_rsa
   ```

   Copy the entire content of the file including this:

```
-----BEGIN RSA PRIVATE KEY-----
MIIEpAIBAAKCAQEA7...
...
-----END RSA PRIVATE KEY-----
```

Or use

```bash
cat ~/.ssh/id_rsa.pub
```

This should output something like:

```text
ssh-rsa AAAAB3... user@example.com
```

Alternatively, on Windows, you can use:

```bash
type %userprofile%\.ssh\id_rsa.pub
```

Or using git CLI:

```bash
cat ~/.ssh/id_rsa.pub
```

3. **Add the Public Key to the server**:
   On your VPS server, add the public key to the `~/.ssh/authorized_keys` file. You can do this by appending the content of the public key file to `authorized_keys`:

   ```bash
   cat ~/.ssh/id_rsa.pub >> ~/.ssh/authorized_keys
   ```

### Adding the SSH Key as a GitHub Secret

1. **Navigate to Your Repository**:
   Go to your repository on GitHub.

2. **Go to Settings**:
   Click on `Settings` in the top menu.

3. **Create a Secret**:
   - In the left sidebar, click on `Secrets and variables`, then `Actions`.
   - Click on `New repository secret`.
   - Set the `Name` to `SSH_PRIVATE_KEY`.
   - Paste the contents of your private key file into the `Value` field.
   - Click `Add secret`.

### Using Secrets in GitHub Actions

In your GitHub Actions workflow, you can use the secrets by referencing them like `${{ secrets.SSH_PRIVATE_KEY }}`. Here’s an example snippet:

```yaml
- name: Set up SSH
  uses: webfactory/ssh-agent@v0.5.3
  with:
    ssh-private-key: ${{ secrets.SSH_PRIVATE_KEY }}
```

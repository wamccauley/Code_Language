In this short tutorial, we will go through the process of configuring Ubuntu server to automatically start a command like `bpytop` at boot time.

### Step 1: Install `bpytop`

If you haven't already installed `bpytop`, you can do so using the following commands:

```bash
sudo apt update
sudo apt install bpytop
```

`bpytop` is a system resource monitor written in Python, and it can be installed easily using package manager or pip.

### Step 2: Create a Systemd Service File

To run `bpytop` (or any other command) at boot, you can create a systemd service. Systemd is the system and service manager for Linux that initializes the system components after booting.

1. **Create a new service file**:

   Use a text editor like `nano` to create a new service file:

   ```bash
   sudo nano /etc/systemd/system/bpytop.service
   ```

2. **Add the following configuration**:

   Paste the following content into the file. This tells systemd how to start `bpytop` and ensures it runs as a service:

   ```ini
   [Unit]
   Description=Run bpytop on boot
   After=network.target

   [Service]
   Type=simple
   ExecStart=/usr/bin/bpytop
   User=your-username
   WorkingDirectory=/home/your-username

   [Install]
   WantedBy=multi-user.target
   ```

   Replace `your-username` with your actual username on the server. The `ExecStart` line points to the `bpytop` executable. If you've installed it in a custom location, adjust the path accordingly.

### Step 3: Reload Systemd and Enable the Service

After creating the service file, you need to reload systemd so it recognizes the new service. Then, enable the service to start on boot.

1. **Reload systemd**:

   ```bash
   sudo systemctl daemon-reload
   ```

2. **Enable the service to start on boot**:

   ```bash
   sudo systemctl enable bpytop.service
   ```

   This command creates a symbolic link in the system’s service directory, which tells systemd to start the service at boot.

3. **Start the service immediately** (optional):

   If you want to start `bpytop` right away without rebooting, use:

   ```bash
   sudo systemctl start bpytop.service
   ```

### Step 4: Verify the Service

You can check the status of your service to ensure it’s running correctly:

```bash
sudo systemctl status bpytop.service
```

This command should display the current status of the `bpytop` service. If it’s running properly, you should see an "Active (running)" status.

### Step 5: Reboot and Test

Finally, reboot your server to ensure that the command starts automatically on boot:

```bash
sudo reboot
```

After the reboot, you can verify that `bpytop` is running by checking the status again:

```bash
sudo systemctl status bpytop.service
```

### Troubleshooting

If the service isn’t running as expected, you can check the systemd logs for more detailed error messages:

```bash
journalctl -xe
```

This command will show you logs that might indicate why the service failed to start.

### Remove the Service

To remove the `bpytop` service you created, follow these steps:

1. **Stop the Service:**

   If the service is currently running, stop it first:

   ```sh
   sudo systemctl stop bpytop.service
   ```

2. **Disable the Service:**

   Disable it to prevent it from starting on boot:

   ```sh
   sudo systemctl disable bpytop.service
   ```

3. **Remove the Service File:**

   Delete the service file:

   ```sh
   sudo rm /etc/systemd/system/bpytop.service
   ```

4. **Reload Systemd:**

   Reload the systemd daemon to apply the changes:

   ```sh
   sudo systemctl daemon-reload
   ```

5. **Verify Removal:**

   Check to make sure the service has been removed by listing available services:

   ```sh
   systemctl list-units --type=service | grep bpytop
   ```

   You should not see `bpytop` listed anymore.

To install Docker and related components on an Ubuntu server, you can follow these steps:

1. **Update Package Index:**

   ```bash
   sudo apt update
   ```

2. **Install Required Packages:**
   Install packages that allow `apt` to use packages over HTTPS.

   ```bash
   sudo apt install apt-transport-https ca-certificates curl software-properties-common
   ```

3. **Add Docker’s Official GPG Key:**

   ```bash
   curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -
   ```

4. **Add Docker Repository:**

   ```bash
   sudo add-apt-repository "deb [arch=amd64] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable"
   ```

5. **Update Package Index Again:**

   ```bash
   sudo apt update
   ```

6. **Install Docker Engine:**

   ```bash
   sudo apt install docker-ce
   ```

7. **Start and Enable Docker Service:**

   ```bash
   sudo systemctl start docker
   sudo systemctl enable docker
   ```

8. **Verify Docker Installation:**

   ```bash
   sudo docker --version
   ```

9. **Install Docker Compose:**
   Docker Compose allows you to define and run multi-container Docker applications. To install Docker Compose, follow these steps:

   ```bash
   sudo curl -L "https://github.com/docker/compose/releases/download/$(curl -s https://api.github.com/repos/docker/compose/releases/latest | grep tag_name | cut -d '"' -f 4)/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
   ```

10. **Apply Executable Permissions to the Docker Compose Binary:**

    ```bash
    sudo chmod +x /usr/local/bin/docker-compose
    ```

11. **Verify Docker Compose Installation:**

    ```bash
    docker-compose --version
    ```

12. **Optional: Install Docker Machine:**
    Docker Machine is a tool to provision and manage Docker hosts. If you need it, install it using:

    ```bash
    sudo curl -L "https://github.com/docker/machine/releases/download/$(curl -s https://api.github.com/repos/docker/machine/releases/latest | grep tag_name | cut -d '"' -f 4)/docker-machine-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-machine
    ```

13. **Apply Executable Permissions to Docker Machine Binary:**

    ```bash
    sudo chmod +x /usr/local/bin/docker-machine
    ```

14. **Verify Docker Machine Installation:**
    `bash
    docker-machine --version
    `
    If you need to manage Docker as a non-root user, you can add your user to the `docker` group with:

```bash
sudo usermod -aG docker $USER
```

Then log out and log back in for the group change to take effect.

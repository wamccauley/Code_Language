
### 1. **`iptables` (Common Across Distributions)**

To add a port opening with `iptables`, you can use the following commands. Make sure to adjust the port number and protocol (`tcp` or `udp`) as needed.

**Open port 8080 for TCP:**

```bash
sudo iptables -A INPUT -p tcp --dport 8080 -j ACCEPT
```

**Save the configuration (on Debian-based systems):**

```bash
sudo iptables-save | sudo tee /etc/iptables/rules.v4
```

**Save the configuration (on Red Hat-based systems):**

```bash
sudo service iptables save
```

### 2. **`firewalld` (Fedora, CentOS 7+, RHEL 7+)**

**Open port 8080 for TCP:**

```bash
sudo firewall-cmd --zone=public --add-port=8080/tcp --permanent
sudo firewall-cmd --reload
```

**For multiple ports (e.g., 8080 and 9090):**

```bash
sudo firewall-cmd --zone=public --add-port=8080/tcp --permanent
sudo firewall-cmd --zone=public --add-port=9090/tcp --permanent
sudo firewall-cmd --reload
```

### 3. **`ufw` (Ubuntu, Debian-based)**

**Open port 8080 for TCP:**

```bash
sudo ufw allow 8080/tcp
```

**For multiple ports (e.g., 8080 and 9090):**

```bash
sudo ufw allow 8080/tcp
sudo ufw allow 9090/tcp
```

**Enable `ufw` if not already enabled:**

```bash
sudo ufw enable
```

### 4. **`nftables` (Newer Systems)**

**Open port 8080 for TCP:**

```bash
sudo nft add rule ip filter input tcp dport 8080 accept
```

**For multiple ports (e.g., 8080 and 9090):**

```bash
sudo nft add rule ip filter input tcp dport {8080,9090} accept
```

**Save the configuration:**

```bash
sudo nft list ruleset > /etc/nftables.conf
```

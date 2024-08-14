### FTP/SFTP

FTP (File Transfer Protocol) and SFTP (SSH File Transfer Protocol) are two widely used protocols for transferring files between clients and servers over a network. While FTP is the traditional method, SFTP is a secure alternative that leverages SSH (Secure Shell) for encrypted data transfer.

- **FTP:** A standard network protocol used for transferring files between a client and a server over a TCP-based network.
- **SFTP:** A secure version of FTP that uses SSH to encrypt data transfers, providing enhanced security.

#### What is FTP?

**File Transfer Protocol (FTP)** is one of the oldest protocols used to transfer files over the internet or an intranet. It operates on a client-server model, where the client requests files, and the server provides them. FTP is commonly used for uploading and downloading files, managing directories, and editing files on a remote server.

**Features of FTP:**

- **Unencrypted Communication:** FTP transfers data in plaintext, which makes it vulnerable to interception and attacks.
- **Ports:** FTP typically uses two ports:
  - **Port 21:** The command port, where the client sends commands to the server.
  - **Port 20:** The data port, used for transferring files.
- **Modes of Operation:**
  - **Active Mode:** The client opens a random port and informs the server, which then connects to this port for data transfer.
  - **Passive Mode:** The server opens a random port for data transfer and informs the client, which then connects to this port. This mode is used to overcome firewall restrictions.

**Structure of FTP:**

- **Commands:** FTP uses a set of standard commands for file operations. Examples include:
  - **USER:** Specifies the username.
  - **PASS:** Specifies the password.
  - **LIST:** Lists files in the current directory.
  - **RETR:** Retrieves a file from the server.
  - **STOR:** Uploads a file to the server.
  - **DELE:** Deletes a file on the server.
- **Responses:** The server responds to commands with numeric codes, indicating success, failure, or the need for additional information.
  - **200:** Command OK.
  - **220:** Service ready.
  - **331:** User name okay, need password.
  - **550:** Requested action not taken (e.g., file not found).

**Use Cases of FTP:**

- **Website Management:** FTP is commonly used to upload and manage website files on a remote server.
- **File Sharing:** FTP servers are used for distributing large files or collections of files.
- **Backup:** FTP can be used to back up data by transferring it to a remote server.

**Security Concerns with FTP:**

- **Data in Plaintext:** All data, including passwords, is transmitted in plaintext, making it susceptible to interception.
- **No Data Integrity:** FTP does not provide mechanisms to ensure the integrity of transferred files.
- **Vulnerability to Attacks:** FTP is vulnerable to various attacks, such as Man-in-the-Middle (MitM) attacks, where an attacker intercepts and possibly alters the data.

#### What is SFTP?

**SSH File Transfer Protocol (SFTP)** is a secure alternative to FTP, designed to overcome the security weaknesses of traditional FTP. Unlike FTP, SFTP encrypts both commands and data, ensuring confidentiality and integrity during file transfer.

**Features of SFTP:**

- **Encryption:** SFTP encrypts all data transferred between the client and server, protecting it from eavesdropping and interception.
- **Single Port:** SFTP uses only one port (usually port 22), the same port as SSH, simplifying firewall configurations.
- **Data Integrity:** SFTP includes mechanisms to ensure the integrity of transferred files, verifying that files are not altered during transmission.
- **Authentication:** SFTP supports various authentication methods, including password authentication, public key authentication, and multifactor authentication (MFA).

**Structure of SFTP:**

- **Commands:** SFTP commands are similar to those of FTP but are executed over an encrypted SSH session. Examples include:
  - **get:** Downloads a file from the server.
  - **put:** Uploads a file to the server.
  - **ls:** Lists files in the current directory.
  - **cd:** Changes the current directory.
  - **rm:** Removes a file on the server.
  - **chmod:** Changes file permissions.
- **Security Layers:** SFTP operates over SSH, inheriting its security features, including encryption, key exchange, and host authentication.

**Use Cases of SFTP:**

- **Secure File Transfer:** SFTP is widely used for securely transferring sensitive data between systems, such as financial transactions or confidential documents.
- **Remote File Management:** SFTP allows administrators to securely manage files on remote servers, including uploading, downloading, and modifying files.
- **Automated Backups:** SFTP is often used in automated backup systems to securely transfer files to remote storage.

**Benefits of SFTP Over FTP:**

- **Security:** SFTP's encryption ensures that data remains confidential and protected from unauthorized access.
- **Compliance:** SFTP is often required for regulatory compliance in industries where data security is paramount, such as finance and healthcare.
- **Simplified Firewall Configuration:** Unlike FTP, which uses multiple ports, SFTP operates over a single port, reducing the complexity of firewall rules.

#### Differences Between FTP and SFTP

| **Feature**                | **FTP**                                      | **SFTP**                                          |
| -------------------------- | -------------------------------------------- | ------------------------------------------------- |
| **Security**               | No encryption, data is sent in plaintext     | Encrypted via SSH, providing confidentiality      |
| **Port**                   | Uses ports 20 (data) and 21 (commands)       | Uses port 22 (same as SSH)                        |
| **Authentication**         | Username and password (plaintext)            | SSH-based authentication, supports key-based auth |
| **Firewall Configuration** | Complex due to multiple ports                | Simplified, uses a single port                    |
| **Data Integrity**         | No built-in integrity checks                 | Ensures data integrity with encryption            |
| **Use Cases**              | Non-sensitive file transfers, legacy systems | Secure file transfers, regulatory compliance      |

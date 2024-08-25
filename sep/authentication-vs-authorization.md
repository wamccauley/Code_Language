### Authentication vs Authorization

#### **1. Authentication**

**a. What is Authentication?**

- Authentication is the process of verifying the identity of a user or entity in a system. It answers the question: "Who are you?" The goal of authentication is to ensure that the person or system accessing a resource is, in fact, who they claim to be.

**b. How Authentication Works:**

- During authentication, the user or system provides credentials, such as a username and password, a token, or a biometric signature (e.g., fingerprint or facial recognition). The system then checks these credentials against a stored record to verify their validity.

**c. Types of Authentication:**

- **Password-Based Authentication:** The most common method where users provide a password along with their username.
- **Two-Factor Authentication (2FA):** Combines something the user knows (password) with something they have (e.g., a mobile phone or hardware token) or something they are (biometrics).
- **Multi-Factor Authentication (MFA):** Extends 2FA by adding more layers of verification, such as an additional token or biometric factor.
- **Biometric Authentication:** Uses unique biological traits, such as fingerprints, iris patterns, or facial recognition.
- **Token-Based Authentication:** Involves the use of tokens (e.g., JWTs, OAuth tokens) that are issued upon successful login and used in subsequent requests.

**d. The Role of Authentication in Security:**

- Authentication is the first line of defense in security. Without proper authentication, unauthorized users could gain access to sensitive resources. Strong authentication mechanisms reduce the risk of identity theft, data breaches, and unauthorized access.

#### **2. Authorization**

**a. What is Authorization?**

- Authorization is the process of determining what actions a user or system is allowed to perform. It answers the question: "What can you do?" Once a user has been authenticated, authorization controls determine what resources the user can access and what actions they can take on those resources.

**b. How Authorization Works:**

- After a user’s identity is authenticated, the system checks the user's permissions and roles to determine if they are allowed to perform the requested action on a particular resource. For instance, a user might be authorized to view a document but not edit or delete it.

**c. Types of Authorization:**

- **Role-Based Access Control (RBAC):** Users are assigned roles, and each role has specific permissions. This model simplifies management by allowing administrators to grant permissions based on roles rather than individual users.
- **Attribute-Based Access Control (ABAC):** Uses attributes (e.g., user attributes, resource attributes, and environmental attributes) to define access control policies. This model is more flexible and can handle complex scenarios.
- **Discretionary Access Control (DAC):** The owner of a resource decides who can access it and what they can do with it. This is common in file systems where file owners can set permissions for other users.
- **Mandatory Access Control (MAC):** Access is controlled by a central authority based on predefined policies, and users cannot alter the permissions. This model is often used in government and military environments where security is critical.

**d. The Role of Authorization in Security:**

- Authorization ensures that authenticated users only have access to the resources and actions they are permitted to use. Proper authorization prevents users from performing actions outside their scope, thereby protecting sensitive data and maintaining the integrity of the system.

#### **3. Authentication vs. Authorization**

**a. Main Differences:**

- **Purpose:**
  - **Authentication:** Confirms the identity of the user.
  - **Authorization:** Defines what resources and actions the authenticated user can access.
- **Process:**
  - **Authentication:** Involves verifying credentials like passwords, tokens, or biometrics.
  - **Authorization:** Involves checking permissions and roles against access control policies.
- **Sequence:**
  - **Authentication First:** Authorization occurs only after successful authentication.
- **Data:**
  - **Authentication:** Deals with user credentials and identity data.
  - **Authorization:** Deals with permissions, roles, and access rights.

**b. Dependency:**

- Authorization is dependent on authentication. Without knowing who the user is, the system cannot determine what actions they are authorized to perform. However, authentication does not depend on authorization; a user can be authenticated even if they are not authorized to perform any actions.

**c. Example Scenario:**

- **Authentication:** When logging into an online banking system, the user provides a username and password. The system verifies these credentials to ensure the user is who they claim to be.
- **Authorization:** After authentication, the system checks the user’s role (e.g., customer, admin) to determine what actions they can perform, such as viewing account balances, transferring funds, or managing other user accounts.

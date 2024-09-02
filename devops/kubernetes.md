## Kubernetes

Kubernetes is an open-source platform designed to automate deploying, scaling, and operating containerized applications. It helps us manage and orchestrate those containers at scale. It mainly consists of:

### 1. **Pods**

A Pod is the smallest and most basic deployable unit in Kubernetes. It represents a single instance of a running process in your cluster. A pod can contain one or more containers that share the same network namespace and storage.

- **Single-Container Pod:** Most of the time, a pod contains only one container. This container is typically your application, like a Django server running inside a container.
- **Multi-Container Pod:** Sometimes, you might want to run multiple containers together in a single pod. These containers work closely together, sharing resources like storage and network. For example, one container might run your Django app, while another container might handle logging or serve as a reverse proxy.

Let's say you have a Django application and a Redis instance that must always run together. Instead of deploying them as separate pods, you could place them in a single pod. This way, they share the same IP address and can communicate with each other more efficiently.

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: django-redis-pod
spec:
  containers:
    - name: django-container
      image: your-django-image
      ports:
        - containerPort: 8000
    - name: redis-container
      image: redis
      ports:
        - containerPort: 6379
```

### 2. **Nodes**

Nodes are the physical or virtual machines that make up the Kubernetes cluster. Each node is responsible for running the pods assigned to it.

- **Components on a Node:** Each node runs several key components:

  - **Kubelet:** An agent that ensures the containers in the pods are running correctly.
  - **Container Runtime:** Software like Docker or containerd that runs the containers.
  - **Kube-proxy:** Manages networking for the pods and enables communication with other pods or external services.

- **Types of Nodes:**
  - **Master Node:** Manages the control plane, responsible for maintaining the desired state of the cluster.
  - **Worker Node:** Runs the application workloads (pods). Most of the time, when you hear "node," it refers to worker nodes.

Suppose you have a Kubernetes cluster with three worker nodes. When you deploy your Django app, Kubernetes might spread the pods across these nodes. If one node fails, Kubernetes can automatically reschedule the pods on another available node, ensuring high availability.

### 3. **Cluster**

**Definition:**

A Kubernetes cluster is a set of nodes (master and worker) that are orchestrated and managed together to run your containerized applications.

- The cluster is the overarching infrastructure that holds all the resources—pods, nodes, services, storage, etc. The control plane manages the cluster and ensures that the desired state of the system (as defined by the user) is maintained.

- **Multi-Zone Clusters:** Kubernetes can manage clusters that span multiple availability zones (AZs) or regions, offering higher availability and fault tolerance.

If you have a Django application that needs to be highly available, you might deploy a Kubernetes cluster across three different availability zones. The cluster will ensure that if one zone goes down, your application continues running in the other zones.

### 4. **Control Plane**

The control plane is the central nervous system of a Kubernetes cluster. It manages and controls the cluster, making decisions about scheduling, scaling, and maintaining the desired state of the system.

- **API Server:** The front-end for the Kubernetes control plane. It exposes the Kubernetes API, which is used by users, services, and the Kubernetes components to interact with the control plane.
- **etcd:** A key-value store that persists the cluster’s state. It stores all cluster data, configurations, and metadata.
- **Scheduler:** Decides which node should run each newly created pod based on resource availability and constraints.
- **Controller Manager:** Ensures the actual state of the cluster matches the desired state. It includes controllers for tasks like replicating pods, managing endpoints, and handling node failures.

When you deploy a Django app using a `Deployment`, the control plane's scheduler determines which nodes have enough resources to run the pods. The API server processes your request, and the controller manager ensures the pods remain running as intended.

### 5. **Services**

A Service in Kubernetes is an abstraction that defines a logical set of pods and a policy by which to access them. Services provide a stable endpoint (IP address or DNS name) to access pods, even as the underlying pods might be changing due to scaling or updates.

**Types of Services:**

- **ClusterIP:** Exposes the service on a cluster-internal IP. This is the default type and is only accessible within the cluster.
- **NodePort:** Exposes the service on each node’s IP at a static port. Useful for external access to a service.
- **LoadBalancer:** Creates an external load balancer (typically on a cloud provider) that directs traffic to the service.
- **ExternalName:** Maps a service to an external name, essentially providing a DNS alias for an external service.

You have a Django app running in a Kubernetes cluster. The pods can come and go as you scale up or down. By creating a Service, you provide a stable IP or DNS name that clients can use to access your app, regardless of the underlying pods.

```yaml
apiVersion: v1
kind: Service
metadata:
  name: django-service
spec:
  selector:
    app: django
  ports:
    - protocol: TCP
      port: 80
      targetPort: 8000
  type: LoadBalancer
```

### 6. **Deployments**

A Deployment in Kubernetes is a higher-level abstraction that manages a group of pods and ensures that your application runs correctly. It controls the creation and scaling of pods and handles updates to the application with rolling updates.

- **Desired State:** The Deployment allows you to define the desired state of your application, such as the number of replicas you want to run.
- **Rolling Updates:** Deployments support rolling updates, which means you can update your application without downtime. The old version of the app is gradually replaced with the new version.
- **Rollback:** If something goes wrong during an update, Kubernetes can automatically roll back to the previous version.

Suppose you have a Django app and you want to run three instances (pods) of it for high availability. You would create a Deployment that specifies this desired state. Kubernetes ensures that three pods are always running, even if one fails or is updated.

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: django-deployment
spec:
  replicas: 3
  selector:
    matchLabels:
      app: django
  template:
    metadata:
      labels:
        app: django
    spec:
      containers:
        - name: django
          image: your-django-image
          ports:
            - containerPort: 8000
```

### Deploying Applications with Kubernetes

### **1. Deployments**

- **Creating a Deployment:**
  A Deployment in Kubernetes is defined using a YAML manifest file. Here’s a simple example for a Django app:

  ```yaml
  apiVersion: apps/v1
  kind: Deployment
  metadata:
    name: django-deployment
  spec:
    replicas: 3
    selector:
      matchLabels:
        app: django
    template:
      metadata:
        labels:
          app: django
      spec:
        containers:
          - name: django
            image: my-django-app:latest
            ports:
              - containerPort: 8000
  ```

- **Managing Deployments:**
  - **Scaling:** You can scale the number of replicas by updating the `replicas` field or using the `kubectl scale` command:
    ```bash
    kubectl scale deployment django-deployment --replicas=5
    ```
  - **Viewing Deployment Status:**
    ```bash
    kubectl get deployments
    ```

#### **Rolling Updates and Rollbacks**

- **Rolling Updates:**
  Kubernetes allows us to update our application without downtime. When we update a Deployment, Kubernetes incrementally replaces old pods with new ones. For example, changing the image version in the Deployment YAML file triggers a rolling update.

- **Rollback:**
  If something goes wrong during an update, you can easily roll back to a previous version:
  ```bash
  kubectl rollout undo deployment/django-deployment
  ```

### **2. Services and Networking**

Kubernetes Services expose your pods to external traffic and other services within the cluster.

#### **Exposing Applications with ClusterIP, NodePort, and LoadBalancer Services**

- **ClusterIP (Default):**

  - This type of service exposes the application within the cluster. It’s not accessible from outside the cluster but is useful for communication between different services.

  ```yaml
  apiVersion: v1
  kind: Service
  metadata:
    name: django-service
  spec:
    selector:
      app: django
    ports:
      - protocol: TCP
        port: 80
        targetPort: 8000
  ```

- **NodePort:**

  - Exposes the application on a specific port of each node in the cluster. It allows external traffic by using the IP address of any node in the cluster.

  ```yaml
  spec:
    type: NodePort
    ports:
      - port: 80
        targetPort: 8000
        nodePort: 30007
  ```

- **LoadBalancer:**

  - Used in cloud environments, this type of service creates an external load balancer that directs traffic to the exposed pods.

  ```yaml
  spec:
    type: LoadBalancer
  ```

#### **Introduction to Ingress for HTTP Routing**

- **Ingress:**

  - Ingress allows you to expose HTTP and HTTPS routes from outside the cluster to services within the cluster. It also provides features like SSL termination and load balancing.

  Example Ingress configuration for a Django app:

  ```yaml
  apiVersion: networking.k8s.io/v1
  kind: Ingress
  metadata:
    name: django-ingress
  spec:
    rules:
      - host: django.example.com
        http:
          paths:
            - path: /
              pathType: Prefix
              backend:
                service:
                  name: django-service
                  port:
                    number: 80
  ```

### **3. Configuration Management**

Managing configurations and secrets is crucial for deploying applications in different environments (development, staging, production).

#### **Using ConfigMaps and Secrets for Application Configuration**

- **ConfigMaps:**

  - ConfigMaps are used to store non-confidential data in key-value pairs. You can inject these values into your pods as environment variables or as configuration files.

  ```yaml
  apiVersion: v1
  kind: ConfigMap
  metadata:
    name: django-config
  data:
    DJANGO_SETTINGS_MODULE: myproject.settings
  ```

- **Secrets:**

  - Secrets store sensitive data like passwords, tokens, and keys. Secrets can be used similarly to ConfigMaps but are encoded in base64 for security.

  ```yaml
  apiVersion: v1
  kind: Secret
  metadata:
    name: django-secret
  type: Opaque
  data:
    POSTGRES_PASSWORD: cGFzc3dvcmQ=
  ```

#### **Mounting Configurations into Pods**

- ConfigMaps and Secrets can be mounted as environment variables or files inside the pod:

  ```yaml
  env:
    - name: DJANGO_SETTINGS_MODULE
      valueFrom:
        configMapKeyRef:
          name: django-config
          key: DJANGO_SETTINGS_MODULE
  ```

### **4. Scaling Applications**

Scaling is one of Kubernetes’ most powerful features, allowing your application to handle varying amounts of traffic.

#### **Manual and Auto-scaling of Applications**

- **Manual Scaling:**

  - You can manually scale your Deployment by adjusting the replica count.

  ```bash
  kubectl scale deployment django-deployment --replicas=10
  ```

- **Horizontal Pod Autoscaler (HPA):**

  - HPA automatically scales the number of pods in a Deployment based on observed CPU usage (or other select metrics).

  Example HPA configuration:

  ```yaml
  apiVersion: autoscaling/v1
  kind: HorizontalPodAutoscaler
  metadata:
    name: django-hpa
  spec:
    scaleTargetRef:
      apiVersion: apps/v1
      kind: Deployment
      name: django-deployment
    minReplicas: 3
    maxReplicas: 10
    targetCPUUtilizationPercentage: 50
  ```

### **Building and Deploying a Scalable Django Project on Kubernetes**

### **1. Setting Up a Kubernetes Cluster**

Before deploying your Django application, you need to set up a Kubernetes cluster.

#### **Using Minikube, K3s, or a Cloud Provider**

- **Minikube:** Ideal for local development, Minikube runs a single-node Kubernetes cluster on your local machine.

  ```bash
  minikube start
  ```

- **K3s:** A lightweight Kubernetes distribution that’s perfect for edge and IoT environments.

  ```bash
  curl -sfL https://get.k3s.io | sh -
  ```

- **Cloud Providers (GKE, EKS):** Use Google Kubernetes Engine (GKE) or Amazon Elastic Kubernetes Service (EKS) for a managed Kubernetes service. This is best for production environments.

  - **GKE Example:**
    ```bash
    gcloud container clusters create django-cluster --num-nodes=3
    ```

#### **Cluster Provisioning and Node Management**

Once your cluster is up, you can manage nodes using `kubectl`:

- **View Nodes:**

  ```bash
  kubectl get nodes
  ```

- **Add or Remove Nodes:** Cloud providers allow you to scale the number of nodes in your cluster through their respective dashboards or CLI tools.

### **2. CI/CD Pipeline Integration**

Integrating a CI/CD pipeline automates your build, test, and deployment processes, making your deployments more reliable and repeatable.

#### **Automating Docker Builds and Deployments**

- **Jenkins:**

  - Set up a Jenkins pipeline to build your Docker images and push them to a container registry (e.g., Docker Hub).
  - Configure Jenkins to deploy the updated application to your Kubernetes cluster.

- **GitLab CI/CD:**

  - GitLab offers built-in CI/CD capabilities that can be configured using a `.gitlab-ci.yml` file.
  - Example:

    ```yaml
    stages:
      - build
      - deploy

    build:
      script:
        - docker build -t my-django-app:latest .
        - docker push my-django-app:latest

    deploy:
      script:
        - kubectl apply -f k8s/
    ```

- **GitHub Actions:**

  - Automate Docker builds and Kubernetes deployments directly from your GitHub repository.
  - Example Workflow:

    ```yaml
    name: CI/CD Pipeline

    on:
      push:
        branches:
          - main

    jobs:
      build:
        runs-on: ubuntu-latest
        steps:
          - uses: actions/checkout@v2
          - name: Build Docker image
            run: docker build -t my-django-app:latest .
          - name: Push Docker image
            run: docker push my-django-app:latest

      deploy:
        runs-on: ubuntu-latest
        steps:
          - name: Deploy to Kubernetes
            run: kubectl apply -f k8s/
    ```

#### **Deploying Applications on Kubernetes from a CI/CD Pipeline**

- After setting up the pipeline, ensure that your Kubernetes cluster is configured as a deployment target. The pipeline should automatically deploy the Dockerized Django application to your Kubernetes cluster whenever changes are pushed to the repository.

### **3. Deploying Django and DRF on Kubernetes**

Now, let's create a full Django and DRF application, containerize it, and deploy it to your Kubernetes cluster.

#### **Creating a Dockerfile for Django and DRF**

Your Dockerfile should define the environment for your Django application. Here’s an example:

```Dockerfile
# Dockerfile
FROM python:3.10-slim

ENV PYTHONUNBUFFERED 1

WORKDIR /app

COPY requirements.txt /app/
RUN pip install -r requirements.txt

COPY . /app/

CMD ["gunicorn", "--bind", "0.0.0.0:8000", "myproject.wsgi:application"]
```

- **requirements.txt:**
  List all the necessary Python packages.

  ```plaintext
  Django>=4.0,<5.0
  djangorestframework
  gunicorn
  psycopg2-binary
  ```

#### **Writing Kubernetes Manifests for Deployments, Services, and Ingress**

- **Deployment Manifest:**

  ```yaml
  apiVersion: apps/v1
  kind: Deployment
  metadata:
    name: django-deployment
  spec:
    replicas: 3
    selector:
      matchLabels:
        app: django
    template:
      metadata:
        labels:
          app: django
      spec:
        containers:
          - name: django
            image: my-django-app:latest
            ports:
              - containerPort: 8000
  ```

- **Service Manifest:**

  ```yaml
  apiVersion: v1
  kind: Service
  metadata:
    name: django-service
  spec:
    selector:
      app: django
    ports:
      - protocol: TCP
        port: 80
        targetPort: 8000
    type: LoadBalancer
  ```

- **Ingress Manifest:**

  ```yaml
  apiVersion: networking.k8s.io/v1
  kind: Ingress
  metadata:
    name: django-ingress
  spec:
    rules:
      - host: my-django-app.example.com
        http:
          paths:
            - path: /
              pathType: Prefix
              backend:
                service:
                  name: django-service
                  port:
                    number: 80
  ```

#### **Setting Up Auto-scaling and Load Balancing**

- **Horizontal Pod Autoscaler (HPA):**

  ```yaml
  apiVersion: autoscaling/v1
  kind: HorizontalPodAutoscaler
  metadata:
    name: django-hpa
  spec:
    scaleTargetRef:
      apiVersion: apps/v1
      kind: Deployment
      name: django-deployment
    minReplicas: 3
    maxReplicas: 10
    targetCPUUtilizationPercentage: 50
  ```

- Kubernetes will automatically scale the number of pods based on CPU usage or other metrics defined in the HPA.

### **4. Managing and Updating Your Application**

Managing a live application in Kubernetes involves rolling updates, handling database migrations, and preparing for disaster recovery.

#### **Rolling Updates and Handling Migrations**

- **Rolling Updates:**

  - When you update your application, Kubernetes will perform a rolling update by gradually replacing the old pods with the new ones.

- **Handling Migrations:**

  - Before rolling out a new version, make sure to run any necessary database migrations. This can be done as a pre-deployment step in your CI/CD pipeline.

  ```bash
  kubectl exec -it <pod_name> -- python manage.py migrate
  ```

#### **Backup and Disaster Recovery Strategies**

- **Backups:**

  - Regularly back up your database and application data. Use Kubernetes CronJobs to automate backups.

  ```yaml
  apiVersion: batch/v1
  kind: CronJob
  metadata:
    name: backup-cron
  spec:
    schedule: "0 2 * * *"
    jobTemplate:
      spec:
        template:
          spec:
            containers:
              - name: backup
                image: my-backup-image
                args:
                  - /bin/sh
                  - -c
                  - "pg_dumpall -c > /backups/all_databases.sql"
            restartPolicy: OnFailure
  ```

- **Disaster Recovery:**
  - Implement disaster recovery plans, including restoring from backups, scaling nodes, and redeploying applications.

# 🚀 Mini Project Report

## **Problem Statement**

**Deploying a Website Using AWS (EC2 + S3 + IAM + GitHub)**

---

## **Introduction**

Cloud computing enables developers to deploy and manage applications more efficiently. This mini-project demonstrates how to host a static website using Amazon EC2, S3, IAM, and GitHub. The objective is to automate the deployment process and ensure high availability, security, and scalability.

---

## **Project Components**

### 🖥️ **Amazon EC2 (Elastic Compute Cloud)**
- Acts as a virtual server to run the web server.
- Pulls the latest code from GitHub.
- Hosts the website using Apache.
- Syncs files to S3 for static hosting.

### 📦 **Amazon S3 (Simple Storage Service)**
- Stores website files.
- Serves them as a static website.
- Offers scalability and high availability via a public URL.

### 🔐 **IAM (Identity and Access Management)**
- Manages AWS permissions and access control.
- IAM Role is attached to EC2 to securely access S3.
- S3 Bucket Policy allows public read access for website files.

### 🧑‍💻 **GitHub**
- Stores and version-controls website source code (HTML, CSS, JS).
- EC2 pulls the latest code from GitHub automatically.
- Allows easy updates via Git pushes.

---

## **Cloud Services Used**

| **Service** | **Type** | **Purpose in Project** |
|-------------|----------|-------------------------|
| EC2         | IaaS     | Hosts the website and pulls code from GitHub. |
| S3          | Storage  | Stores and serves static files. |
| IAM         | Security | Manages permissions for secure EC2-S3 access. |
| GitHub      | VCS      | Hosts source code and enables version control. |

---

## **Step-by-Step Implementation**

### 🔹 **1. Launch an EC2 Instance**
- Open AWS EC2 Console → Click "Launch Instance".
- Choose **Amazon Linux 2** (Free Tier).
- Select **t2.micro** instance type.
- Add **User Data** (to install Apache, Git, AWS CLI).
- Configure Security Group to allow **HTTP (port 80)** and **SSH (port 22)**.
- Attach **IAM Role** (created in step 3).
- Click **Launch**.

---

### 🔹 **2. Create an S3 Bucket for Static Hosting**
- Open AWS S3 Console → Click "Create Bucket".
- Name the bucket (e.g., `my-webapp-bucket`).
- Disable **Block Public Access**.
- Enable **Static Website Hosting**.
- Set "Index Document" to `index.html`.

**S3 Bucket Policy**:
```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Principal": "*",
      "Action": "s3:GetObject",
      "Resource": "arn:aws:s3:::my-webapp-bucket/*"
    }
  ]
}
```

---

### 🔹 **3. Create and Attach IAM Role**
- Open IAM Console → Roles → Create Role.
- Select **EC2** as trusted entity.
- Attach **AmazonS3FullAccess** policy.
- Name it `EC2S3AccessRole`.
- Attach the role to your EC2 instance.

---

### 🔹 **4. Clone Website Code & Deploy via EC2**

#### SSH into EC2 and run:
```bash
# Update system and install necessary packages
sudo yum update -y
sudo yum install -y httpd git aws-cli

# Start and enable Apache
sudo systemctl start httpd
sudo systemctl enable httpd

# Go to web root
cd /var/www/html

# Clone your GitHub repo
sudo git clone https://github.com/Amey2701/Amey-Portfolio-Website-Template.git my-webapp

# Set proper permissions
sudo chown -R apache:apache /var/www/html/my-webapp
sudo chmod -R 755 /var/www/html/my-webapp

# Sync files to S3
aws s3 sync /var/www/html/my-webapp s3://my-webapp-bucket --acl public-read

# Restart Apache
sudo systemctl restart httpd
```

---

## **Accessing the Website**

- **EC2 Hosted Website**:  
  `http://<EC2-Public-IP>`

- **S3 Static Website URL**:  
  `http://my-webapp-bucket.s3-website.<region>.amazonaws.com`

---

## 🔁 **How EC2, S3, IAM, and GitHub Work Together**

1. GitHub hosts the website source code.
2. EC2 pulls code from GitHub, serves it using Apache.
3. IAM ensures EC2 has permissions to sync files to S3 securely.
4. S3 serves the static version of the website to users globally.

---

## ✅ **Benefits of This Setup**

- **Automation**: EC2 pulls the latest code and syncs it.
- **Security**: IAM roles securely restrict access.
- **Scalability**: S3 handles high traffic cost-effectively.
- **Availability**: Hosted both on EC2 and S3 for redundancy.

---

## **Conclusion**

This project demonstrates how to efficiently deploy a static website using AWS services and GitHub. It showcases the synergy between EC2, S3, IAM, and GitHub to deliver a scalable, secure, and easily manageable solution for modern web hosting. Developers can update the site by simply pushing code to GitHub, ensuring an automated and streamlined deployment process.

---

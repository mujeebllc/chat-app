[![Fork Button](https://img.shields.io/github/forks/iemafzalhassan/full-stack_chatApp?style=social)](https://github.com/iemafzalhassan/full-stack_chatApp/fork)


# Real-Time Chat Application


Welcome to the **Full Stack Realtime Chat App** project, where we're building a scalable and secure real-time chat experience using the latest technologies. Whether you're a seasoned developer or a beginner, we invite you to contribute and be a part of this exciting journey!

## Table of Contents


* [Introduction](#introduction)
* [Features](#features)
* [Tech Stack](#tech-stack)
* [Getting Started](#getting-started)
* [Building the Backend](#building-the-backend)
* [Running the Application](#running-the-application)
* [Contributing](#contributing)
* [Future Plans](#future-plans)
* [License](#license)

## 📝 Introduction

This project aims to provide a real-time chat experience that's both scalable and secure. With a focus on modern technologies, we're building an application that's easy to use and maintain.

## ✨ Features


* **Real-time Messaging**: Send and receive messages instantly using Socket.io 
* **User Authentication & Authorization**: Securely manage user access with JWT 
* **Scalable & Secure Architecture**: Built to handle large volumes of traffic and data 
* **Modern UI Design**: A user-friendly interface crafted with React and TailwindCSS 
* **Profile Management**: Users can upload and update their profile pictures 
* **Online Status**: View real-time online/offline status of users 


## 🛠️ Tech Stack


* **Backend:** Node.js, Express, MongoDB, Redis, Socket.io
* **Frontend:** React, TailwindCSS
* **Containerization:** Docker
* **Orchestration:** Kubernetes (planned)
* **Web Server:** Nginx
* **State Management:** Zustand
* **Authentication:** JWT
* **Styling Components:** DaisyUI


### 🔧 Prerequisites


* **[Node.js](https://nodejs.org/)** (v14 or higher)
* **[Docker](https://www.docker.com/get-started)** (for containerizing the app)
* **[Git](https://git-scm.com/downloads)** (to clone the repository)


### 📝 Environment Configuration

Create a `.env` file in the root directory with the following configuration:

```env
# Database Configuration
MONGODB_URI=mongodb://root:admin@mongo:27017/chatApp?authSource=admin&retryWrites=true&w=majority

# JWT Configuration
JWT_SECRET=your_jwt_secret_key

# Server Configuration
PORT=5001
NODE_ENV=production
```

> **Note:** 
> - Replace `your_jwt_secret_key` with a strong secret key
> - For local development without Docker, change `MONGODB_URI` to `mongodb://localhost:27017/chatApp`
> - You can use command ```echo "Text what you want" | base64



## 🛠️ Getting Started

Follow these simple steps to get the project up and running on your local Host using docker.

```bash
git clone https://github.com/iemafzalhassan/full-stack_chatApp.git
```

```bash
cd full-stack_chatApp
```
# 🐳 Docker Deployment

The application is containerized using separate Docker images for the frontend and backend.

## Frontend Docker Image

The frontend uses a multi-stage Docker build.

The first stage builds the React application using Node.js, and the second stage uses NGINX to serve the generated production files.

### Build the Frontend Image

From the project root:

```bash
docker build -t mujeebllc/frontend:latest ./frontend

k8s/
├── namespace.yml
├── secret.yml
│
├── frontend-deployment.yml
├── frontend-service.yml
│
├── backend-deployment.yml
├── backend-service.yml
│
├── mongodb-statefulset.yml
├── mongodb-service.yml
├── mongo-pvc.yml
│
├── redis-deployment.yml
├── redis-service.yml
│
└── chat-ingress.yml
###K8s Architecture:

                           Client Browser
                                │
                                │ HTTP
                                ▼
                     ┌────────────────────┐
                     │   NGINX Ingress    │
                     │    Controller      │
                     └─────────┬──────────┘
                               │
                    ┌──────────┴──────────┐
                    │                     │
                 /api                    /
                    │                     │
                    ▼                     ▼
          ┌──────────────────┐   ┌──────────────────┐
          │ Backend Service  │   │ Frontend Service │
          │      :5001       │   │       :80        │
          └────────┬─────────┘   └────────┬─────────┘
                   │                      │
                   ▼                      ▼
          ┌──────────────────┐   ┌──────────────────┐
          │ Backend Pods (2) │   │   Frontend Pod   │
          │ Node + Express   │   │ React + NGINX    │
          │      :5001       │   │       :80        │
          └────────┬─────────┘   └──────────────────┘
                   │
         ┌─────────┴─────────┐
         │                   │
         ▼                   ▼
┌──────────────────┐   ┌──────────────────┐
│  Redis Service   │   │ MongoDB Service  │
│      :6379       │   │      :27017      │
└────────┬─────────┘   └────────┬─────────┘
         │                      │
         ▼                      ▼
┌──────────────────┐   ┌──────────────────┐
│   Redis Pod      │   │   MongoDB Pod    │
│      :6379       │   │      :27017      │
└──────────────────┘   └────────┬─────────┘
                                │
                                ▼
                       ┌──────────────────┐
                       │   MongoDB PVC    │
                       │       2Gi        │
                       │     longhorn     │
                       └──────────────────┘



###Request Flow:
Browser
   │
   ▼
NGINX Ingress Controller
   │
   ├── / ──────────► Frontend Service
   │                       │
   │                       ▼
   │                  Frontend Pod
   │                  React + NGINX
   │
   └── /api ────────► Backend Service
                           │
                           ▼
                      Backend Pods
                      Node + Express
                           │
                 ┌─────────┴─────────┐
                 │                   │
                 ▼                   ▼
            Redis Service      MongoDB Service
                 │                   │
                 ▼                   ▼
             Redis Pod          MongoDB Pod
                 │                   │
                 ▼                   ▼
             In-memory          MongoDB PVC



### 🤝 Contributing


We welcome contributions from DevOps & Developer of all skill levels! Here's how you can contribute:

**Report bugs:** If you encounter any bugs or issues, please open an issue with detailed information.
**Suggest features:** Have an idea for a new feature? Open an issue to discuss it with the community.
**Submit pull requests:** If you have a fix or a feature you'd like to contribute, submit a pull request. Ensure your changes pass any linting or tests, if applicable.

### 🌐 Join the Community

We invite you to join our community of developers and contributors. Let's work together to build an amazing real-time chat application!

* **Star this repository** to show your support
* **Fork this repository** to contribute to the project
* **Open an issue** to report bugs or suggest features
* **Submit a pull request** to contribute code changes

## 🔮 Future Plans


This project is evolving, and here are a few exciting things on the horizon:

* [ ] **CI/CD Pipelines:** Implement Continuous Integration and Continuous Deployment pipelines to automate testing and deployment.
* [x] **Kubernetes (K8s):** Add Kubernetes manifests for container orchestration to deploy the app on cloud platforms like AWS, GCP, or Azure.
* [ ] **Feature Expansion:** Add more features like group chats, media sharing, and user status updates.
* **Stay tuned for updates as we continue to improve and expand this project!**

---

## 📚 Project Snapshots:

![Settings](frontend/public/settings.png)

![chat](frontend/public/chat.png)

![logout](/frontend/public/logout.png)

![Login](/frontend/public/login.png)



## 📜 License


This project is licensed under the MIT License. See the LICENSE file for more details.















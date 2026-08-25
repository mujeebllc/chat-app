# Full-Stack Realtime Chat Application

A full-stack realtime chat application built with **React, Node.js, Express, MongoDB, and Socket.IO**.

The application provides user authentication, realtime messaging, online-user tracking, profile management, theme customization, and image uploads.

## Features

* User registration and login
* JWT-based authentication
* Authentication using HTTP cookies
* Realtime messaging with Socket.IO
* Online user status
* Private messaging
* User profiles
* Profile image uploads
* Cloudinary integration for image storage
* MongoDB persistence
* Protected frontend routes
* Responsive React interface
* Theme customization
* Toast notifications
* Backend health-check endpoint
* Production frontend serving through the Express backend

## Technology Stack

### Frontend

* React 18
* Vite
* React Router
* Zustand
* Axios
* Socket.IO Client
* Tailwind CSS
* DaisyUI
* Lucide React
* React Hot Toast

### Backend

* Node.js
* Express.js
* MongoDB
* Mongoose
* Socket.IO
* JSON Web Tokens
* bcryptjs
* Cookie Parser
* CORS
* Cloudinary
* dotenv

The frontend dependencies and development tooling are defined in `frontend/package.json`.

The backend uses Express, Mongoose, Socket.IO, JWT, bcryptjs, Cloudinary, and related middleware.

## Architecture

The application follows a client-server architecture:

```text
                    ┌─────────────────────┐
                    │      Browser        │
                    │   React Frontend    │
                    └──────────┬──────────┘
                               │
                 HTTP / REST   │   WebSocket
                               │
                ┌──────────────▼──────────────┐
                │       Node.js Backend       │
                │       Express + Socket.IO   │
                └──────────────┬──────────────┘
                               │
                 ┌─────────────┼─────────────┐
                 │             │             │
                 ▼             ▼             ▼
           ┌──────────┐  ┌──────────┐  ┌───────────┐
           │ MongoDB  │  │Cloudinary│  │  Socket.IO │
           │ Database │  │  Images  │  │ Connections│
           └──────────┘  └──────────┘  └───────────┘
```

The backend exposes authentication, messaging, and health-check routes.

## Realtime Communication

Socket.IO is used for realtime communication between clients and the backend.

When a user connects, the server associates the user's ID with their Socket.IO connection. The server maintains an in-memory mapping of:

```text
userId → socketId
```

It also broadcasts the list of currently connected users to clients whenever users connect or disconnect.

This allows the frontend to display online users and receive realtime events without repeatedly polling the backend.

## Database

MongoDB is used as the application's primary database.

Mongoose handles the connection between the Node.js application and MongoDB. The application requires the `MONGODB_URI` environment variable and uses connection pooling and timeout configuration for database connectivity.

## Authentication

Authentication is handled by the backend using:

* bcryptjs for password hashing
* JSON Web Tokens for authentication
* HTTP cookies for storing authentication information
* Protected API routes

The frontend checks the current authentication state before allowing access to protected pages.

For example, unauthenticated users are redirected to `/login`, while authenticated users can access the chat application and profile pages.

## Application Routes

### Frontend Routes

| Route       | Purpose              |
| ----------- | -------------------- |
| `/`         | Chat home page       |
| `/signup`   | User registration    |
| `/login`    | User login           |
| `/settings` | Application settings |
| `/profile`  | User profile         |

Authentication state determines whether users can access protected routes.

### Backend Routes

| Endpoint        | Purpose                                |
| --------------- | -------------------------------------- |
| `/api/auth`     | Authentication operations              |
| `/api/messages` | Messaging operations                   |
| `/health`       | Application and database health status |

The `/health` endpoint returns the application status, timestamp, database connection status, and current environment.

## Project Structure

```text
full-stack_chatApp/
│
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   ├── lib/
│   │   │   ├── db.js
│   │   │   └── socket.js
│   │   ├── middleware/
│   │   ├── models/
│   │   ├── routes/
│   │   │   ├── auth.route.js
│   │   │   ├── message.route.js
│   │   │   └── health.route.js
│   │   └── index.js
│   │
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── store/
│   │   ├── App.jsx
│   │   └── main.jsx
│   │
│   └── package.json
│
├── package.json
└── README.md
```

## Environment Variables

Create a `.env` file for the backend configuration.

Example:

```env
PORT=5000

MONGODB_URI=mongodb://localhost:27017/chatApp

JWT_SECRET=your_jwt_secret

CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret

NODE_ENV=development
```

Do not commit real credentials, API keys, database passwords, JWT secrets, or Cloudinary credentials to GitHub.

## Installation

Clone the repository:

```bash
git clone https://github.com/mujeebllc/full-stack_chatApp.git
cd full-stack_chatApp
```

Install dependencies and build the frontend:

```bash
npm run build
```

The root `build` script installs dependencies in both the backend and frontend and then builds the frontend application.

## Development

Start the backend in development mode:

```bash
cd backend
npm run dev
```

Start the frontend development server:

```bash
cd frontend
npm run dev
```

The Vite development server is configured through the frontend project, while the backend runs through Node.js/Express.

## Production

Build the application:

```bash
npm run build
```

Then start the backend:

```bash
npm start
```

In production mode, the Express backend serves the compiled React frontend from the frontend build directory.

## Health Check

The backend provides a health endpoint:

```text
GET /health
```

A healthy response includes information similar to:

```json
{
  "status": "healthy",
  "timestamp": "2026-01-01T00:00:00.000Z",
  "database": "connected",
  "environment": "production"
}
```

The endpoint can be useful for monitoring and deployment environments.

## Realtime Message Flow

A typical chat interaction works approximately like this:

```text
User A
  │
  │ sends message
  ▼
React Frontend
  │
  │ HTTP request
  ▼
Express Backend
  │
  ├──────────────► MongoDB
  │                 stores message
  │
  └──────────────► Socket.IO
                    │
                    │ realtime event
                    ▼
                 User B
```

Socket.IO maintains active connections and tracks online users, while MongoDB provides persistent storage for application data.

## Deployment

The application can be deployed using several approaches, including:

* Traditional Node.js hosting
* Virtual machines
* Containerized deployments
* Kubernetes
* Cloud hosting platforms

For a Kubernetes deployment, the application can be separated into frontend/backend workloads and exposed through Kubernetes Services and an Ingress controller.

## Security Considerations

Before deploying publicly:

* Use strong JWT secrets.
* Never commit `.env` files.
* Use HTTPS in production.
* Restrict CORS to trusted origins.
* Use secure and appropriately configured cookies.
* Protect MongoDB from public internet access.
* Rotate exposed credentials immediately.
* Configure Cloudinary credentials through environment variables.
* Use appropriate resource limits when deploying to Kubernetes.

## Credits

This project is based on the original **Full Stack Realtime Chat App** project by `iemafzalhassan`.

The current repository is maintained as a fork under the `mujeebllc` GitHub account.

## License

The original upstream repository uses the MIT License. Check the upstream repository and included license information before redistributing modified versions.

## Author

**Mujeeb Ullah**

GitHub: `https://github.com/mujeebllc`

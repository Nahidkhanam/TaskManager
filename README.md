# MERN TaskManager

A full-stack Task Management application featuring secure authentication, a personalized dashboard, and real-time CRUD operations.

## 🛠 Tech Stack
- **Frontend:** React.js (Vite), Tailwind CSS, Lucide React (Icons), Axios
- **Backend:** Node.js, Express.js, JWT (JSON Web Tokens), Bcrypt.js
- **Database:** MongoDB (Local or Atlas)
- **State Management:** React Context API

## 📋 Features
- **Secure Auth:** Signup and Login with password hashing and JWT-protected routes.
- **User Profile:** Personalized dashboard fetching real-time user data.
- **CRUD Operations:** Create, Read (List), and Delete tasks.
- **Search:** Dynamic, case-insensitive task filtering.
- **Responsive Design:** Optimized for mobile and desktop using Tailwind CSS.

## ⚙️ Setup & Installation

### 1. Prerequisites
- Node.js (v18+)
- MongoDB Compass or Atlas Cluster

### 2. Backend Setup
1. Navigate to the backend directory: `cd backend`
2. Install dependencies: `npm install`
3. Create a `.env` file:
   ```env
   PORT=
   MONGO_URI=
   JWT_SECRET=
4. Start the server: node server.js

### 3. Frontend Setup
1. Open a new terminal and navigate to the frontend: `cd frontend`
2. Install dependencies: `npm install`
3. Start the development server: `npm run dev`
4. Open your browser to http://localhost:5173

### 4. Demo Credentials
Email: demo@gmail.com
Password: 123456 (min 6 characters)

### 5. Production Scalability Note
To scale this application for a production environment:

Infrastructure: Dockerize the frontend and backend to ensure environment consistency and deploy using a load balancer (e.g., Nginx) on AWS or DigitalOcean.

Security: Implement HTTP-only cookies for JWT storage to mitigate XSS risks and use Helmet.js for secure headers.

Database: Add MongoDB indexing on user and title fields to optimize query performance as the data grows.

Caching: Integrate Redis caching for the /api/v1/me profile endpoint to reduce database load.

UX/UI: Implement pagination for the task list and use "Optimistic UI" updates for a zero-latency user experience.

### 6. Project Structure
taskmanager/
├── backend/
    ├── middlewares/ 
    ├── models/     
    ├── routes/     
    └── server.js  
└── frontend/
    ├── src/
        ├── components/
        ├── context/    
        ├── pages/     
        └── App.jsx  

### 7. postman file
[taskmanagerr.postman_collection.json](https://github.com/user-attachments/files/25072630/taskmanagerr.postman_collection.json)

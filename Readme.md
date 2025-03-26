# YouTube Clone

A full-stack web application designed to replicate YouTube's core functionalities. Users can view videos, create channels, upload content, and interact with videos through comments. This project showcases a modern web development stack with a focus on a responsive and engaging user interface.

## 🎬 Video Preview
[Watch Demo](https://drive.google.com/file/d/1aS2LBfYerToZXZVn90NNKwALDeEjkgi0/view?usp=sharing)

---

## 🚀 Key Features

### 🌐 Backend (Node.js, Express.js, MongoDB)
- **Authentication:** Secure user login and registration using JSON Web Tokens (JWT).
- **Video Management:**
  - Videos are uploaded and managed with Cloudinary for storage and optimization.
  - File verification handled using Multer middleware.
- **RESTful APIs:** APIs for managing users, channels, videos, and comments.

### 🖥️ Frontend (React.js, JavaScript, Tailwind CSS)
- **Responsive Design:** Fully responsive UI for an optimal experience across various devices.
- **State Management:** Redux is used for managing global application state.
- **Dynamic Features:**
  - Browse and watch videos directly from the homepage.
  - Signed-in users can:
    - Create and manage their own channel.
    - Upload, edit, or delete videos from their channel.
    - Add comments on videos.

---

## 🛠️ Technology Stack

### **Backend:**
- **Node.js** - JavaScript runtime for backend development.
- **Express.js** - Web framework for creating RESTful APIs.
- **MongoDB** - NoSQL database for storing user and video data.
- **Cloudinary** - Media storage and optimization for video files.
- **Multer** - Middleware for handling file uploads.
- **JWT** - Secure authentication and authorization.

### **Frontend:**
- **React.js** - JavaScript library for building dynamic UIs.
- **JavaScript** - Frontend logic and interactivity.
- **Tailwind CSS** - Utility-first CSS framework for modern styling.
- **Redux** - Manages application-wide state efficiently.

---

## ⚙️ Installation Guide

### Prerequisites
Ensure the following software is installed:
- Node.js and npm
- MongoDB (installed and running)
- Cloudinary account for media storage

### 📌 Clone the Repository
```bash
git clone https://github.com/Anchal-Mishra/Youtube-Clone-Project
cd youtube-clone-main
```

### 📌 Backend Setup
Navigate to the server directory:
```bash
cd server
```

Install dependencies:
```bash
npm install
```

Create a `.env` file and add the following environment variables:
```ini
PORT=5000
MONGO_URI=your-mongodb-uri
CLOUDINARY_CLOUD_NAME=your-cloudinary-name
CLOUDINARY_API_KEY=your-cloudinary-api-key
CLOUDINARY_API_SECRET=your-cloudinary-api-secret
JWT_SECRET=your-jwt-secret
```

Start the backend server:
```bash
npm start
```

### 📌 Frontend Setup
Navigate to the client directory:
```bash
cd client
```

Install frontend dependencies:
```bash
npm install
```

Run the frontend:
```bash
npm run dev
```

---

## 🖥️ How It Works

### **Home Page**
- Users can browse and watch videos available on the platform.

### **Sign Up / Sign In**
- Users must register an account and sign in to access additional features such as channel creation and video management.

### **Create a Channel**
- Signed-in users can create a personalized channel to upload and manage their videos.

### **Upload Videos**
- Users can upload videos to their channel, with videos stored and optimized via Cloudinary.

### **Manage Content**
- Users can edit or delete their videos, as well as delete their channels if needed.

### **Comments**
- Signed-in users can add comments on any video, allowing for interaction and engagement.

---

## 📌 Repository Details
- **GitHub Repository:** [YouTube Clone](https://github.com/Anchal-Mishra/Youtube-Clone-Project)



# 🎓 Student Management System (MERN Stack)

A full-stack Student Management System built using the **MERN stack (MongoDB, Express.js, React.js, Node.js)**.  
This application helps institutions manage students, courses, attendance, and communication through a centralized digital platform.

---

## 🚀 Features

### 👩‍🎓 Student Features
- Student registration & profile management
- View academic details
- Track attendance
- Receive notifications/messages
- Secure login & authentication

### 🧑‍🏫 Admin Features
- Add, update, delete student records
- Manage courses and subjects
- Monitor attendance
- Send announcements/messages
- Dashboard analytics

### 🔐 Authentication
- Secure login system
- Role-based access (Admin/Student)
- Protected routes
- JWT-based authentication

---

## 🛠️ Tech Stack

### Frontend
- React.js
- Tailwind CSS / CSS
- Axios
- React Router

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication
- REST APIs

### Database
- MongoDB Atlas

---

## 📁 Project Structure


Student_Management/
│
├── backend/
│ ├── routes/
│ ├── controllers/
│ ├── models/
│ ├── middleware/
│ ├── server.js
│
├── frontend/
│ ├── src/
│ ├── public/
│ ├── components/
│ ├── pages/
│
└── README.md

---

## ⚙️ Installation & Setup

### 1️⃣ Clone Repository

```bash
git clone https://github.com/yourusername/Student_Management.git
cd Student_Management
2️⃣ Backend Setup
cd backend
npm install

Create .env file in backend:

MONGO_URI=your_mongodb_connection
JWT_SECRET=your_secret_key
PORT=5000

Run Backend
npm start
3️⃣ Frontend Setup
cd frontend
npm install
npm start
## 🌐 Deployment

### Frontend
Planned deployment on Vercel / Netlify

### Backend
Planned deployment on Render / Railway

### Database
MongoDB Atlas Cloud (for production-ready setup)

## 🌐 Running Locally

Frontend runs on:
http://localhost:3000

Backend runs on:
http://localhost:5000

Database:
MongoDB (local or Atlas)


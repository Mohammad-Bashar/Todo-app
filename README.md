# 📝 Full-Stack Todo Management Application

A robust task management solution built using the **MERN stack**. This application features secure user authentication, private data routing, and a responsive UI to help users manage their daily productivity effectively.

🚀 **Live Demo:** [todo-app-frontend6.onrender.com](https://todo-app-frontend6.onrender.com/)

---

## ✨ Features

* **User Authentication:** Secure Sign-up and Login functionality using **JWT (JSON Web Tokens)**.
* **Personalized Dashboard:** Tasks are user-specific; you only see the data you created.
* **Full CRUD Operations:** Create, Read, Update (mark as completed/pending), and Delete tasks.
* **Protected Routes:** Backend API endpoints are shielded, requiring a valid token for access.
* **Responsive Design:** Clean and intuitive interface built with **React** and **Bootstrap/CSS**.
* **Live Deployment:** Backend and Frontend hosted on **Render**.

---

## 🛠️ Tech Stack

**Frontend:**
* React.js
* Bootstrap / CSS
* Axios (API Calls)

**Backend:**
* Node.js & Express.js
* JSON Web Tokens (JWT) for Security
* Bcrypt.js (Password Hashing)

**Database:**
* MongoDB (Atlas)

---

## 🚀 Getting Started

To run this project locally, follow these steps:

### 1. Clone the repository
```bash
git clone [https://github.com/Mohammad-Bashar/Todo-app.git](https://github.com/Mohammad-Bashar/Todo-app.git)
cd Todo-app

##Folder Structure
├── backend/
│   ├── models/        # Mongoose schemas (User, Todo)
│   ├── routes/        # Express routes
│   ├── middleware/    # Auth middleware (JWT verification)
│   └── server.js      # Entry point
├── frontend/
│   ├── src/
│   │   ├── components/ # Reusable UI components
│   │   ├── pages/      # Login, Signup, Dashboard
│   │   └── App.js      # Main logic & Routing
└── README.md

# 🏫 School App Backend

## 🚀 Project Overview

This is the backend for the **School App**, built with **Node.js** and **Express.js**. It provides API endpoints for managing school profiles, authentication, and user data.

## 📌 Features

- **RESTful API** built with Express.js
- **MongoDB database** for storing school profiles
- **Authentication** (JWT-based)
- **CORS & Body Parsing Middleware**
- **File Upload Support** for school profile images
- **Environment Variables** for easy configuration

## 🛠️ Tech Stack

- **Node.js & Express.js**
- **MongoDB (Mongoose ODM)**
- **JWT Authentication**
- **Dotenv for environment variables**
- **Multer for file uploads**

---

## ⚙️ Installation & Setup

### 1️⃣ Clone the Repository

````sh
git clone https://github.com/PRAMOD222/school-profile-backend.git
cd schoolapp-backend

````

### 2️⃣ Install Dependencies

```sh
npm install  

```

### 3️⃣ Environment Variables

Create a `.env.local` file in the root directory and add:

```env
MONGO_URI=mongodb://localhost:27017/SchoolProfile
JWT_SECRET=jwt_secret_key
```

### 4️⃣ Run the Development Server

```sh
npm run dev 
```

The Server will be available at `http://localhost:3001`.


## 🔌 API Endpoints

### 🔐 Authentication
All **create, update, and delete** routes require a **Bearer Token**, which can be obtained by creating an account and logging in.

#### ➤ Register a New User
**Endpoint:**  
```sh
POST http://localhost:3001/users/signup
```
 
**Payload:**
```sh
{
    "name": "John Doe",
    "email": "johndoe@example.com",
    "password": "securepassword"
}
```
### Login & Get Token
**Endpoint:**
```sh
POST http://localhost:3001/users/login
```
**Payload:**
```sh
{
    "email": "johndoe@example.com",
    "password": "securepassword"
}
```
### demo data for creating school profile 

**Endpoint:**
```sh
http://localhost:3001/api/profile/add
```

**Headers:**
```sh
Authorization: Bearer <your_jwt_token>
Content-Type: multipart/form-data
```

**Payload:**
```sh
{
    "subDomain": "greenwood",
    "name": " Greenwood International School",
    "logo": "", # logo will be an image file 
    "phone": " +91-9876543210",
    "email": " info@greenwoodschool.com",
    "city": " Bangalore",
    "address": " 123, MG Road, Bangalore, India",
    "googleMapLink": " https://goo.gl/maps/example",
    "aboutSchool": " Greenwood International School is committed to academic excellence and student well-being.",
    "vision": " To provide quality education with a focus on holistic development.",
    "mission": " Empower students with knowledge, skills, and values for a better future.",
}

```

### demo data for Updating school profile 

**Endpoint:**
```sh
http://localhost:3001/api/profile/update/:id
```

**Headers:**
```sh
Authorization: Bearer <your_jwt_token>
Content-Type: multipart/form-data
```

**Payload:**
```sh
{
    "subDomain": "greenwood",
    "name": " Greenwood International School",
    "logo": "", # logo will be an image file 
    "phone": " +91-9876543210",
    "email": " info@greenwoodschool.com",
    "city": " Bangalore",
    "address": " 123, MG Road, Bangalore, India",
    "googleMapLink": " https://goo.gl/maps/example",
    "aboutSchool": " Greenwood International School is committed to academic excellence and student well-being.",
    "vision": " To provide quality education with a focus on holistic development.",
    "mission": " Empower students with knowledge, skills, and values for a better future.",
}

```


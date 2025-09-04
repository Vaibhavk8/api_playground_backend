# 🏗️ API Playground Project

A modern full-stack web application for managing and exploring user profiles.

📄 **[View My Resume](https://drive.google.com/file/d/1cKVoMhPGTSzK81GDumFCPHk9qRK79PlC/view)**

---

## 🌐 Architecture

### **Frontend**

* Built with **React.js** ⚛️
* Deployed on **Vercel** ☁️
* Connects to backend via environment variable: `REACT_APP_API_URL`

### **Backend**

* **Node.js** + **Express** server 🟢
* Deployed on **Render** 🚀
* Connects to **MongoDB Atlas** 🗄️
* Provides **RESTful API endpoints** (e.g., `/profile/profile`)

### **Database**

* **MongoDB Atlas** (cloud-hosted) 🧩
* Stores **user profiles** and related data

---

## ⚙️ Setup Instructions

### 🔹 Local Setup

#### **Clone Repository**

```bash
git clone <repo-url>
cd <project-folder>
```

#### **Backend**

```bash
cd backend
npm install
```

Create `.env` file:

```env
MONGODB_URI=<your-mongodb-uri>
PORT=5000
```

Start backend server:

```bash
npm start
```

#### **Frontend**

```bash
cd frontend
npm install
```

Create `.env` file:

```env
REACT_APP_API_URL=http://localhost:5000
```

Start frontend server:

```bash
npm start
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

### 🔹 Production Setup

#### **Backend**

* Deploy on **Render**
* Set environment variable: `MONGODB_URI`
* Render assigns a public backend URL, e.g.:
  `https://api-playground-backend-1.onrender.com`

#### **Frontend**

* Deploy on **Vercel**
* Set environment variable:

```env
REACT_APP_API_URL=https://api-playground-backend-1.onrender.com
```

* Vercel serves frontend at e.g.:
  `https://api-playground-frontend.vercel.app`

---

## 🗄️ Database Schema

### **Profile Schema (Mongoose / MongoDB)**

```javascript
const profileSchema = new mongoose.Schema({
  name: String,
  email: String,
  education: String,
  skills: [String],
  experience: String
});
```

---

## 📡 API Endpoints & Sample Requests

### **Using `curl`**

* **Fetch all profiles**

```bash
curl -X GET https://api-playground-backend-1.onrender.com/profile/profile
```

* **Add a new profile**

```bash
curl -X POST https://api-playground-backend-1.onrender.com/profile/profile \
-H "Content-Type: application/json" \
-d '{
  "name": "Vaibhav",
  "email": "vaibhav0080@gmail.com",
  "education": "BTech in Information Technology",
  "skills": ["React", "Node.js", "MongoDB"]
}'
```

### **Using Postman**

* `GET /profile/profile` → Fetch all profiles
* `POST /profile/profile` → Add a new profile

---

## ⚠️ Known Limitations

* ❌ **No authentication/authorization** (API is public)
* ❌ **No input validation** → backend may accept malformed data
* ❌ **Minimal error handling** (404s, JSON parse errors)
* ⚙️ **CORS** may need adjustment based on deployment
* 🕒 Free-tier Render/Vercel → backend may **spin down on inactivity** (cold starts)

---

Made with ❤️ using **React.js**, **Node.js**, and **MongoDB Atlas** 🌟

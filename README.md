# Job Portal App

A full-stack web application for job seekers and recruiters to connect seamlessly. Built with the **MERN stack** and **Next.js**, the app offers features like job postings, applications, and a personalized dashboard.

---

## 🚀 Features

### **For Job Seekers**
- 🔍 **Search Jobs**: Filter by title, location, or type.
- 📄 **Apply to Jobs**: One-click application for open positions.
- 📜 **View Application History**: Track previously applied jobs.

### **For Recruiters**
- 📝 **Post Jobs**: Add detailed job postings with tags and descriptions.
- 📊 **Manage Applications**: Review applicant profiles and track submissions.

### **General**
- 🔒 **Authentication**: Secure login and registration.
- 💾 **Persistent Data**: Data is stored securely using MongoDB.
- 📱 **Responsive Design**: Works seamlessly on all devices.

---

## 🛠️ Tech Stack

### **Frontend**
- [React](https://reactjs.org/) with [Next.js](https://nextjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)

### **Backend**
- [Node.js](https://nodejs.org/) with [Express](https://expressjs.com/)
- [MongoDB](https://www.mongodb.com/) for the database

---

## 📦 Installation and Setup

Follow these steps to set up the project locally:

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/your-username/job-portal-app.git
   cd job-portal-app
   
2. **Install Dependencies:**
   
   • For the backend:
   ```bash
   cd server
   npm install
   ```
  
   • For the frontend:
   ```bash
   cd client
   npm install
   
3. **Set Environment Variables:**

   • Create a .env file in the server directory:
   ```bash
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_secret_key

4. **Start the Application**

   • Start the backend
   ```bash
   cd server
   npm start
   ```

   • Start the frontend
   ```bash
   cd client
   npm run dev

5. **Access the App**

   • Open your browser and navigate to http://localhost:3000.



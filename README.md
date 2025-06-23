# Employeverse – AI-Powered Job & Internship Portal

Employeverse is a full-stack web platform where job seekers and recruiters connect seamlessly. The application allows users to register, apply, and manage job/internship listings. It also features an in-platform resume builder with AI-powered suggestions using Google Gemini.

## 🚀 Features

- 🔐 Secure Authentication (JWT + OTP-based email verification)
- 🧑‍💼 Recruiters can post jobs/internships and manage applicants
- 👨‍🎓 Seekers can apply, create & download AI-reviewed resumes
- 📂 Profile management system with image/document upload (via Multer)
- 🤖 AI resume feedback using Google Gemini 1.5 Flash model
- 📄 Resume builder with PDF export
- 🖥 Responsive frontend built with Next.js and Tailwind CSS
- ☁️ Deployed on Vercel

## 🛠 Tech Stack

- **Frontend**: Next.js, Tailwind CSS
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Authentication**: JWT, OTP-based email
- **File Upload**: Multer, Cloudinary
- **AI**: Google Gemini 1.5 Flash
- **Hosting**: Vercel (Frontend), Render (Optional Backend)

## 🧪 Setup Instructions

---

## Install Dependencies

cd client && npm install
cd ../server && npm install

## Configure Environment Variables

## Create a .env file inside /server and add:

### 3. Create `.env` file inside `/server` with the following:

MONGODB_URL=mongodb://127.0.0.1:27017/internshala
EXPRESS_SESSION_SECRETE=your_session_secret_here
JWT_SECRET=your_jwt_secret_here
JWT_EXPIRE=100h
COOKIE_EXPIRE=1

MAIL_EMAIL_ADDRESS=your_email@example.com
MAIL_EMAIL_PASSWORD=your_email_app_password

GEMINI_API_KEY=your_google_gemini_api_key

PUBLICKEY_IMAGEKIT=your_public_key
PRIVATEKEY_IMAGEKIT=your_private_key
URLENDPOINT_IMAGEKIT=https://ik.imagekit.io/your_endpoint

## Backend:

cd server
npm run dev

## 📁 Folder Structure

employeverse/
├── client/ # Frontend (Next.js)
│ └── pages/
│ └── components/
│ └── styles/

├── server/ # Backend (Node.js)
│ └── controllers/
│ └── routes/
│ └── models/
│ └── middlewares/
│ └── utils/

## 👨‍💻 Author

GitHub: https://github.com/Kunallokhande3969
LinkedIn:https://www.linkedin.com/in/kunal-lokhande-70464b290
    
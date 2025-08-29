# Full-Stack Note-Taking Application

This is a complete, full-stack note-taking web application featuring a secure authentication system and full CRUD (Create, Read, Update, Delete) functionality for managing user-specific notes. The project is designed with a clean, responsive user interface and a robust back-end API.

---

## Features Implemented

- **Dual Authentication System**
  - **Email & OTP**: A passwordless flow where users receive a One-Time Password to their email for authentication. Includes a timed "Resend OTP" functionality.
  - **Google OAuth 2.0**: Seamless one-click sign-in and sign-up using a Google account.
- **Secure API**: The back-end API is protected using JSON Web Tokens (JWT). Users can only access and manage their own notes.
- **Note Management**: Once authenticated, users can create, view, and delete their personal notes on a clean dashboard interface.
- **Responsive UI**: The front-end is designed to be fully responsive, providing an optimal user experience on both desktop and mobile devices.
- **Asynchronous Feedback**: Clear feedback for all operations, including loading indicators and toast notifications for success or error messages.
- **Persistent Login**: The application maintains the user's session, automatically redirecting logged-in users to the dashboard.

---

## Technology Stack

| Category       | Technology                                                                 |
|----------------|----------------------------------------------------------------------------|
| **Front-End**  | React.js, TypeScript, Vite, React Router, Axios, React Hot Toast, CSS Modules |
| **Back-End**   | Node.js, Express.js, TypeScript, MongoDB, Mongoose                        |
| **Database**   | MongoDB Atlas                                                             |
| **Security**   | JSON Web Tokens (JWT), Google OAuth 2.0                                   |
| **Emailing**   | Nodemailer with Gmail (using App Passwords)                               |

---

## Local Setup and Installation

To clone and run this application on your local machine, you need **Node.js**, **npm**, and **Git** installed.

### 1. Clone the Repository

```bash
git clone https://github.com/Vinay-Daripelly/Notes-App.git
```

---

### 2. Back-End Server Setup

Navigate to the server directory:
```bash
cd server
```

Install dependencies:
```bash
npm install
```

Create a new file named `.env` in the `server/` directory. Copy the structure below and fill it with your own credentials:

```env
PORT=5000
MONGO_URI=
JWT_SECRET=

# Credentials for sending OTP emails via Gmail
EMAIL_USER=
EMAIL_PASS=

# Google OAuth 2.0 Credentials
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
CLIENT_URL=http://localhost:5173
```

**How to get the values:**
- **MONGO_URI**: Your MongoDB Atlas connection string.
- **JWT_SECRET**: A long, random string to sign JSON Web Tokens.
- **EMAIL_USER**: Gmail account for sending OTPs.
- **EMAIL_PASS**: App Password generated from your Google Account.
- **GOOGLE_CLIENT_ID** and **GOOGLE_CLIENT_SECRET**: From Google Cloud Console → APIs & Services → Credentials.
- **CLIENT_URL**: URL of your front-end application (default: `http://localhost:5173`).

Run the server:
```bash
npm run dev
```

---

### 3. Front-End Client Setup

In a new terminal, navigate to the client directory:
```bash
cd client
```

Install dependencies:
```bash
npm install
```

Create a new file named `.env` in the `client/` directory. Add your Google Client ID:
```env
VITE_GOOGLE_CLIENT_ID=
```

Run the client:
```bash
npm run dev
```

Your application is now fully running locally.

---

## Deployment

This application is configured for deployment on platforms like **Render**.

**Build Command:**
```bash
npm install --prefix client && npm install --prefix server && npm run build --prefix client && npm run build --prefix server
```

**Start Command:**
```bash
npm start --prefix server
```

All necessary environment variables listed above must be added to the deployment service's environment settings.


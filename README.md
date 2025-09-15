# NBKRSocieties - College Society Event Platform

[![License](https://img.shields.io/badge/license-ISC-blue.svg)](LICENSE)
[![Node.js](https://img.shields.io/badge/Node.js-18+-green.svg)](https://nodejs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-blue.svg)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-19+-61dafb.svg)](https://reactjs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-8.0+-47a248.svg)](https://www.mongodb.com/)

A comprehensive web application designed to manage and showcase events organized by various **societies and clubs** at N.B.K.R. Institute of Science & Technology. This project provides students and faculty with a central platform to view, register, and stay updated on upcoming events.

## 📋 Table of Contents

- [Features](#-features)
- [Architecture](#-architecture)
- [Tech Stack](#-tech-stack)
- [Quick Start](#-quick-start)
- [Project Structure](#-project-structure)
- [API Documentation](#-api-documentation)
- [Contributing](#-contributing)
- [License](#-license)

## 🚀 Features

### ✅ Currently Implemented

- 🔐 **User Authentication System**
  - JWT-based authentication with secure cookie storage
  - Role-based access control (student, coremember, director, hod, admin)
  - Secure password hashing with bcrypt
  - Email verification with OTP system
- 📧 **Email Service Integration**
  - Gmail SMTP integration for notifications
  - OTP email verification system
- 🛡️ **Security Features**
  - HTTP-only cookies for JWT tokens
  - Protected routes with middleware
  - Input validation and error handling
- 🎨 **Modern Frontend**
  - React 19 with TypeScript
  - Tailwind CSS for responsive styling
  - Component-based architecture
  - Client-side routing with React Router

### 🚧 Planned Features

- 📅 **Event Management** – Add, edit, and delete events for different societies/clubs
- 🏛 **Society & Club Profiles** – Each society has its own page with details and activities
- 📝 **Event Registration** – Students can register for events online
- 🔔 **Announcements & Notifications** – Stay updated with the latest events
- 📊 **Dashboard Analytics** – View event statistics and user engagement

## 🏗 Architecture

This project follows a **monorepo structure** with separate backend and frontend applications:

```
NBKRSocieties/
├── backend/                 # Node.js/Express API server
│   ├── src/
│   │   ├── app.ts          # Express app configuration
│   │   ├── config/         # Environment & database config
│   │   ├── middleware/     # Authentication & error handling
│   │   ├── service/        # Email service
│   │   └── user/           # User authentication module
│   ├── server.ts           # Server entry point
│   └── package.json
├── frontend/                # React SPA
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── pages/          # Page components
│   │   ├── hooks/          # Custom React hooks
│   │   └── App.tsx         # Main app component
│   ├── index.html
│   └── package.json
└── .github/                 # GitHub configuration
    └── copilot-instructions.md
```

### Data Flow

1. **Frontend** makes API calls to backend endpoints
2. **Backend** validates requests using JWT middleware
3. **Database** operations handled by Mongoose ODM
4. **Email service** sends OTPs via Gmail SMTP
5. **Responses** sent back with appropriate HTTP status codes

## 🛠 Tech Stack

### Backend

- **Runtime:** Node.js with ES Modules (ESM)
- **Framework:** Express.js v5
- **Language:** TypeScript (strict mode)
- **Database:** MongoDB with Mongoose ODM
- **Authentication:** JWT with bcrypt hashing
- **Email Service:** Nodemailer with Gmail SMTP

### Frontend

- **Framework:** React 19
- **Language:** TypeScript
- **Build Tool:** Vite
- **Styling:** Tailwind CSS
- **Routing:** React Router v7
- **Icons:** Heroicons

### Development Tools

- **Package Manager:** pnpm
- **Linting:** ESLint with TypeScript support
- **Type Checking:** TypeScript compiler
- **Version Control:** Git

## 🚀 Quick Start

### Prerequisites

- Node.js (v18 or higher)
- MongoDB (local or cloud instance)
- Gmail account (for email service)
- pnpm package manager

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/Sukesh282/NBKRSocieties.git
   cd NBKRSocieties
   ```

2. **Install dependencies**

   ```bash
   # Install all dependencies (backend + frontend)
   pnpm install
   ```

3. **Environment Setup**

   **Backend Configuration:**

   ```bash
   cd backend
   cp .env.example .env
   ```

   Edit `backend/.env`:

   ```bash
   PORT=3000
   NODE_ENV=development
   MONGODB_URI=mongodb://localhost:27017/nbkrsocieties
   JWT_SECRET=your_super_secure_jwt_secret_key_here
   GOOGLE_APP_USERNAME=your_gmail@gmail.com
   GOOGLE_APP_PASSWORD=your_gmail_app_password
   OTP_EXPIRY_MS=900000
   ```

   **Frontend Configuration:**

   ```bash
   cd ../frontend
   cp .env.example .env
   ```

   Edit `frontend/.env`:

   ```bash
   VITE_BASE_URL=http://localhost:3000
   ```

4. **Database Setup**

   - Ensure MongoDB is running locally or update `MONGODB_URI` for your cloud database
   - Generate Gmail App Password: Google Account → Security → 2-Step Verification → App passwords

5. **Start Development Servers**

   **Terminal 1 - Backend:**

   ```bash
   cd backend
   pnpm run dev
   ```

   **Terminal 2 - Frontend:**

   ```bash
   cd frontend
   pnpm run dev
   ```

6. **Access the Application**
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:3000

## 📂 Project Structure

```
NBKRSocieties/
├── backend/                 # Backend application
│   ├── src/
│   │   ├── app.ts          # Express app setup
│   │   ├── config/         # Configuration files
│   │   ├── middleware/     # Express middleware
│   │   ├── service/        # Business logic services
│   │   └── user/           # User domain module
│   ├── server.ts           # Server entry point
│   ├── package.json        # Backend dependencies
│   ├── tsconfig.json       # TypeScript config
│   └── README.md           # Backend documentation
├── frontend/                # Frontend application
│   ├── src/
│   │   ├── components/     # Reusable components
│   │   ├── pages/          # Page components
│   │   ├── hooks/          # Custom hooks
│   │   └── App.tsx         # Main app component
│   ├── public/             # Static assets
│   ├── package.json        # Frontend dependencies
│   ├── vite.config.ts      # Vite configuration
│   └── README.md           # Frontend documentation
├── .github/                 # GitHub configuration
│   └── copilot-instructions.md
├── .gitignore              # Git ignore rules
└── README.md               # This file
```

## 📚 API Documentation

The backend provides RESTful APIs for user authentication and management. See [Backend README](./backend/README.md) for detailed API documentation.

### Key Endpoints

- `POST /api/users/register` - User registration
- `POST /api/users/login` - User login
- `GET /api/users/refresh` - Refresh access token
- `POST /api/users/sendmail` - Send OTP email (protected)
- `POST /api/users/verifyotp` - Verify email OTP (protected)

## 🤝 Contributing

We welcome contributions! Please see our contributing guidelines:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines

- Follow the established module pattern for new features
- Use `.js` extensions in all backend import statements
- Implement proper error handling with `http-errors`
- Add TypeScript interfaces for all data structures
- Test database connections and API endpoints
- Follow ESLint and TypeScript strict mode rules

## 📄 Documentation

- **[Backend Documentation](./backend/README.md)** - Detailed backend setup, API docs, and architecture
- **[Frontend Documentation](./frontend/README.md)** - Frontend setup, components, and development guide
- **[Copilot Instructions](./.github/copilot-instructions.md)** - AI coding assistant guidelines

## 👨‍💻 Authors

**NBKRSocieties Development Team**  
N.B.K.R. Institute of Science & Technology

- **[Sukesh Reddy](https://github.com/Sukesh282)** - Full Stack Developer
- **[Murali](https://github.com/tobioffice)** - Full Stack Developer
- **[Mothi](https://github.com/mothi-135)** - Full Stack Developer

## 📞 Support

For questions or support, please contact the development team or create an issue in the repository.

## 📜 License

This project is developed for educational purposes under N.B.K.R. Institute of Science & Technology. Feel free to modify and improve it for your own learning and development.</content>
<filePath>/home/murali/Desktop/Github/NBKRSocieties/README.md

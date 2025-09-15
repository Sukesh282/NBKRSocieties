# NBKRSocieties Backend API

[![Node.js](https://img.shields.io/badge/Node.js-18+-green.svg)](https://nodejs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-blue.svg)](https://www.typescriptlang.org/)
[![Express.js](https://img.shields.io/badge/Express.js-5.0+-000000.svg)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-8.0+-47a248.svg)](https://www.mongodb.com/)
[![pnpm](https://img.shields.io/badge/pnpm-10.0+-F69220.svg)](https://pnpm.io/)

Backend API server for NBKRSocieties - a comprehensive web application for managing college society events at N.B.K.R. Institute of Science & Technology.

## 📋 Table of Contents

- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Installation & Setup](#-installation--setup)
- [API Documentation](#-api-documentation)
- [Architecture Patterns](#-architecture-patterns)
- [Development](#-development)
- [Testing](#-testing)

## 🚀 Features

### ✅ Currently Implemented

- 🔐 **User Authentication System**
  - JWT-based authentication with cookie storage
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
- 📊 **Database Integration**
  - MongoDB with Mongoose ODM
  - Connection pooling and error handling
  - Schema validation and TypeScript interfaces

### 🚧 Planned Features

- 📅 **Event Management APIs** – CRUD operations for events
- 🏛 **Society Management** – Society/club profile management
- 📝 **Registration System** – Event registration APIs
- 🔔 **Notification System** – Push notifications and announcements

## 🛠 Tech Stack

- **Runtime:** Node.js with ES Modules (ESM)
- **Framework:** Express.js v5
- **Language:** TypeScript (strict mode)
- **Database:** MongoDB with Mongoose ODM
- **Authentication:** JWT with bcrypt hashing
- **Email Service:** Nodemailer with Gmail SMTP
- **Package Manager:** pnpm
- **Linting:** ESLint with TypeScript support
- **Type Checking:** TypeScript compiler

## 📂 Project Structure

```
backend/
├── server.ts                    # Main server entry point with DB connection
├── src/
│   ├── app.ts                   # Express app configuration & routes
│   ├── config/
│   │   ├── config.ts           # Environment configuration (frozen)
│   │   └── db.ts               # MongoDB connection setup
│   ├── middleware/
│   │   ├── globalErrorHandler.ts # Global error handling middleware
│   │   └── protected.ts        # JWT authentication middleware
│   ├── service/
│   │   └── sendOTPMail.ts      # Email service with Gmail SMTP
│   └── user/                   # User authentication module
│       ├── userController.ts   # Express route handlers
│       ├── userModel.ts        # Mongoose schema & model
│       ├── userRouter.ts       # Express router configuration
│       └── userTypes.ts        # TypeScript interfaces & enums
├── .env                        # Environment variables
├── .env.example                # Environment variables template
├── package.json                # Project metadata & dependencies
├── tsconfig.json               # TypeScript configuration
├── eslint.config.mts           # ESLint configuration
└── README.md
```

## ⚙️ Installation & Setup

### Prerequisites

- Node.js (v18 or higher)
- MongoDB (local or cloud instance)
- Gmail account (for email service)

### 1. Install Dependencies

```bash
pnpm install
```

### 2. Environment Configuration

```bash
# Copy the example environment file
cp .env.example .env
```

Edit `.env` with your configuration:

```bash
# Server Configuration
PORT=3000
NODE_ENV=development

# Database
MONGODB_URI=mongodb://localhost:27017/nbkrsocieties

# Authentication
JWT_SECRET=your_super_secure_jwt_secret_key_here

# Email Service (Gmail SMTP)
GOOGLE_APP_USERNAME=your_gmail@gmail.com
GOOGLE_APP_PASSWORD=your_gmail_app_password
OTP_EXPIRY_MS=900000
```

**Important Notes:**

- Use a **Gmail App Password** (not your regular password) for `GOOGLE_APP_PASSWORD`
- Generate app password: Google Account → Security → 2-Step Verification → App passwords
- Keep `JWT_SECRET` secure and unique

### 3. Database Setup

Ensure MongoDB is running locally or update `MONGODB_URI` for your cloud database.

### 4. Development Server

```bash
pnpm run dev
```

The server will start on `http://localhost:3000`

## 🎯 API Documentation

### Authentication Endpoints

#### Register User

```http
POST /api/users/register
Content-Type: application/json

{
  "name": "John Doe",
  "username": "johndoe",
  "password": "securepassword123"
}
```

**Response:**

```json
{
  "success": true,
  "data": {
    "user": {
      "name": "John Doe",
      "username": "johndoe",
      "role": "student"
    }
  },
  "message": "User registered successfully"
}
```

#### Login User

```http
POST /api/users/login
Content-Type: application/json

{
  "username": "johndoe",
  "password": "securepassword123"
}
```

**Response:**

```json
{
  "success": true,
  "data": {
    "user": {
      "name": "John Doe",
      "username": "johndoe",
      "role": "student"
    }
  },
  "message": "Login successful"
}
```

#### Refresh Access Token

```http
GET /api/users/refresh
```

**Response:**

```json
{
  "success": true,
  "data": {
    "user": {
      "name": "John Doe",
      "username": "johndoe",
      "role": "student"
    }
  },
  "message": "Token refreshed successfully"
}
```

#### Send OTP Email (Protected)

```http
POST /api/users/sendmail
Authorization: Bearer <token>
Content-Type: application/json

{
  "email": "user@example.com"
}
```

**Response:**

```json
{
  "success": true,
  "message": "OTP sent successfully"
}
```

#### Verify Email OTP (Protected)

```http
POST /api/users/verifyotp
Authorization: Bearer <token>
Content-Type: application/json

{
  "otp": "123456"
}
```

**Response:**

```json
{
  "success": true,
  "message": "Email verified successfully"
}
```

### Response Format

All API responses follow this consistent format:

```json
{
  "success": boolean,
  "data": object | null,
  "message": string
}
```

### Error Format

```json
{
  "success": false,
  "message": "Error description"
}
```

## 🏗 Architecture Patterns

### Feature Module Structure

Each domain follows a consistent modular pattern:

```
feature/
├── featureController.ts  # Express handlers with error handling
├── featureModel.ts      # Mongoose schema with TypeScript interfaces
├── featureRouter.ts     # Express router with protected/public routes
└── featureTypes.ts      # TypeScript interfaces and enums
```

### Key Patterns

- **ESM Modules:** Uses `.js` extensions in imports (required for NodeNext resolution)
- **Frozen Configuration:** Environment config frozen with `Object.freeze()`
- **Async Database Connection:** Established before server startup
- **JWT Authentication:** Cookie-based tokens with httpOnly flag
- **Error Handling:** Centralized with `http-errors` package
- **Role-Based Access:** 5-level hierarchy (student → coremember → director → hod → admin)

### Middleware Order

```typescript
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);
app.use("/api/users", userRouter);
app.use(globalErrorHandler); // Must be last
```

## 💻 Development

### Development Workflow

```bash
# Start development server with hot reload
pnpm run dev

# Run linting
npx eslint .

# Run type checking
npx tsc --noEmit
```

### Code Quality Checks

```bash
# Lint the code
npx eslint .

# Type check
npx tsc --noEmit
```

### API Testing

Use tools like Postman, Insomnia, or curl to test endpoints:

```bash
# Test server health
curl http://localhost:3000/

# Register a new user
curl -X POST http://localhost:3000/api/users/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Test User","username":"testuser","password":"password123"}'
```

### Database Management

- Models are defined using Mongoose in respective modules
- Connection established in `backend/src/config/db.ts`
- Error handling includes connection failure scenarios

## 🧪 Testing

### Manual Testing

1. Start the server: `pnpm run dev`
2. Use API testing tools to test endpoints
3. Check database for data persistence
4. Verify email functionality

### Environment Variables for Testing

```bash
# Use test database
MONGODB_URI=mongodb://localhost:27017/nbkrsocieties_test

# Use test email credentials
GOOGLE_APP_USERNAME=test@gmail.com
GOOGLE_APP_PASSWORD=test_app_password
```

## 🔧 Configuration

### Environment Variables

| Variable              | Description               | Required | Default           |
| --------------------- | ------------------------- | -------- | ----------------- |
| `PORT`                | Server port               | No       | `3000`            |
| `NODE_ENV`            | Environment mode          | No       | `development`     |
| `MONGODB_URI`         | MongoDB connection string | Yes      | -                 |
| `JWT_SECRET`          | JWT signing secret        | Yes      | -                 |
| `GOOGLE_APP_USERNAME` | Gmail username            | Yes      | -                 |
| `GOOGLE_APP_PASSWORD` | Gmail app password        | Yes      | -                 |
| `OTP_EXPIRY_MS`       | OTP expiry time in ms     | No       | `900000` (15 min) |

### TypeScript Configuration

- **Target:** ES2020
- **Module:** NodeNext
- **Strict:** Enabled
- **ES Modules:** Enabled with `.js` extensions

## 🚀 Deployment

### Production Build

```bash
# Build the application
npm run build

# Start production server
npm start
```

### Environment Setup for Production

- Set `NODE_ENV=production`
- Use production MongoDB instance
- Configure production Gmail credentials
- Set secure `JWT_SECRET`
- Enable HTTPS in production

## 🤝 Contributing

1. Follow the established module pattern for new features
2. Use `.js` extensions in all import statements
3. Implement proper error handling with `http-errors`
4. Add TypeScript interfaces for all data structures
5. Test database connections and API endpoints
6. Follow ESLint and TypeScript strict mode rules

## 📞 Support

For questions or support, please contact the development team or create an issue in the repository.

## 📜 License

This project is developed for educational purposes under N.B.K.R. Institute of Science & Technology.

- **Development Server:** ts-node with ESM loader

### Frontend (Planned)

- **Framework:** React.js
- **Styling:** Tailwind CSS
- **Language:** TypeScript

---

## 📂 Project Structure

```
├── backend/
│   ├── server.ts                    # Main server entry point with DB connection
│   └── src/
│       ├── app.ts                   # Express app configuration & routes
│       ├── config/
│       │   ├── config.ts           # Environment configuration (frozen)
│       │   └── db.ts               # MongoDB connection setup
│       ├── middlewares/
│       │   ├── globalErrorHandler.ts # Global error handling middleware
│       │   └── protected.ts        # JWT authentication middleware
│       ├── service/
│       │   └── sendOTPMail.ts      # Email service with Gmail SMTP
│       └── user/                   # User authentication module
│           ├── userController.ts   # Express route handlers
│           ├── userModel.ts        # Mongoose schema & model
│           ├── userRouter.ts       # Express router configuration
│           └── userTypes.ts        # TypeScript interfaces & enums
├── .env                            # Environment variables
├── .env.example                    # Environment variables template
├── package.json                    # Project metadata & dependencies
├── tsconfig.json                   # TypeScript configuration
├── eslint.config.mts               # ESLint configuration
└── README.md
```

---

## ⚙️ Installation & Setup

### Prerequisites

- Node.js (v18 or higher)
- MongoDB (local or cloud instance)
- Gmail account (for email service)

### 1. Clone the Repository

```bash
git clone https://github.com/Sukesh282/NBKRSocieties.git
cd NBKRSocieties
```

### 2. Install Dependencies

```bash
pnpm install
```

### 3. Environment Configuration

```bash
# Copy the example environment file
cp .env.example .env
```

Edit `.env` with your configuration:

```bash
# Server Configuration
PORT=3000
NODE_ENV=development

# Database
MONGODB_URI=mongodb://localhost:27017/nbkrsocieties

# Authentication
JWT_SECRET=your_super_secure_jwt_secret_key_here

# Email Service (Gmail SMTP)
GOOGLE_APP_USERNAME=your_gmail@gmail.com
GOOGLE_APP_PASSWORD=your_gmail_app_password
```

**Important Notes:**

- Use a **Gmail App Password** (not your regular password) for `GOOGLE_APP_PASSWORD`
- Generate app password: Google Account → Security → 2-Step Verification → App passwords
- Keep `JWT_SECRET` secure and unique

### 4. Database Setup

Ensure MongoDB is running locally or update `MONGODB_URI` for your cloud database.

### 5. Development Server

```bash
pnpm run dev
```

The server will start on `http://localhost:3000`

### 6. Code Quality Checks

```bash
# Lint the code
npx eslint .

# Type check
npx tsc --noEmit
```

---

## 🎯 API Documentation

### Authentication Endpoints

#### Register User

```http
POST /api/users/register
Content-Type: application/json

{
  "name": "John Doe",
  "username": "johndoe",
  "password": "securepassword123"
}
```

#### Login User

```http
POST /api/users/login
Content-Type: application/json

{
  "username": "johndoe",
  "password": "securepassword123"
}
```

#### Refresh Access Token

```http
GET /api/users/refresh
```

#### Send OTP Email (Protected)

```http
POST /api/users/sendmail
Authorization: Bearer <token>
Content-Type: application/json

{
  "email": "user@example.com"
}
```

#### Verify Email OTP (Protected)

```http
POST /api/users/verifyotp
Authorization: Bearer <token>
Content-Type: application/json

{
  "otp": "123456"
}
```

### Response Format

```json
{
  "success": true,
  "data": { ... },
  "message": "Operation successful"
}
```

### Error Format

```json
{
  "success": false,
  "message": "Error description"
}
```

---

## 🏗 Architecture Patterns

### Feature Module Structure

Each domain follows a consistent modular pattern:

```
feature/
├── featureController.ts  # Express handlers with error handling
├── featureModel.ts      # Mongoose schema with TypeScript interfaces
├── featureRouter.ts     # Express router with protected/public routes
└── featureTypes.ts      # TypeScript interfaces and enums
```

### Key Patterns

- **ESM Modules:** Uses `.js` extensions in imports (required for NodeNext resolution)
- **Frozen Configuration:** Environment config frozen with `Object.freeze()`
- **Async Database Connection:** Established before server startup
- **JWT Authentication:** Cookie-based tokens with httpOnly flag
- **Error Handling:** Centralized with `http-errors` package
- **Role-Based Access:** 5-level hierarchy (student → coremember → director → hod → admin)

---

## 🎯 Usage

### Development Workflow

```bash
# Start development server with hot reload
pnpm run dev

# Run linting
npx eslint .

# Run type checking
npx tsc --noEmit
```

### API Testing

Use tools like Postman, Insomnia, or curl to test endpoints:

```bash
# Test server health
curl http://localhost:3000/

# Register a new user
curl -X POST http://localhost:3000/api/users/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Test User","username":"testuser","password":"password123"}'
```

### Database Management

- Models are defined using Mongoose in respective modules
- Connection established in `backend/src/config/db.ts`
- Error handling includes connection failure scenarios

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines

- Follow the established module pattern for new features
- Use `.js` extensions in all import statements
- Implement proper error handling with `http-errors`
- Add TypeScript interfaces for all data structures
- Test database connections and API endpoints
- Follow ESLint and TypeScript strict mode rules

---

## 📜 License

This project is developed for educational purposes under N.B.K.R. Institute of Science & Technology.
Feel free to modify and improve it for your own learning and development.

---

## 👨‍💻 Authors

**NBKRSocieties Development Team**  
N.B.K.R. Institute of Science & Technology

- **[Sukesh Reddy](https://github.com/Sukesh282)** - Full Stack Developer
- **[Murali](https://github.com/tobioffice)** - Full Stack Developer
- **[Mothi](https://github.com/mothi-135)** - Full Stack Developer

---

## 📞 Support

For questions or support, please contact the development team or create an issue in the repository.

# NBKRSocieties - College Society Event Platform

A comprehensive web application designed to manage and showcase events organized by various **societies and clubs** at N.B.K.R. Institute of Science & Technology.
This project provides students and faculty with a central platform to view, register, and stay updated on upcoming events.

---

## 🚀 Features

### ✅ Currently Implemented

- � **User Authentication System**
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

### 🚧 Planned Features

- �📅 **Event Management** – Add, edit, and delete events for different societies/clubs
- 🏛 **Society & Club Profiles** – Each society has its own page with details and activities
- 📝 **Event Registration** – Students can register for events online
- 🔔 **Announcements & Notifications** – Stay updated with the latest events
- 🌐 **Responsive Frontend** – React.js, Tailwind CSS, TypeScript UI

---

## 🛠 Tech Stack

### Backend

- **Runtime:** Node.js with ES Modules (ESM)
- **Framework:** Express.js v5
- **Language:** TypeScript (strict mode)
- **Database:** MongoDB with Mongoose ODM
- **Authentication:** JWT with bcrypt hashing
- **Email Service:** Nodemailer with Gmail SMTP

### Development Tools

- **Package Manager:** pnpm
- **Linting:** ESLint with TypeScript support
- **Type Checking:** TypeScript compiler
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

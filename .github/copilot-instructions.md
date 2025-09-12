# Copilot Instructions for NBKRSocieties

This guide helps AI coding agents work productively in the NBKRSocieties codebase.

## Project Overview

- **Purpose:** Central platform for managing and showcasing college society events (N.B.K.R. Institute of Science & Technology).
- **Architecture:**
  - `backend/`: Node.js/Express/TypeScript backend with MongoDB
  - `frontend/` (not present yet): React.js, Tailwind CSS, TypeScript (UI, pages, assets)
  - `public/` (not present yet): Static assets

## Key Files & Directories

- `backend/server.ts`: Main server entry point with database connection and server startup
- `backend/src/app.ts`: Express app configuration and basic routes
- `backend/src/config/config.ts`: Environment configuration with dotenv
- `backend/src/config/db.ts`: MongoDB connection setup with Mongoose
- `backend/src/middlewares/globalErrorHandler.ts`: Global error handling middleware
- `backend/src/middlewares/protected.ts`: JWT authentication middleware with cookie-based tokens
- `backend/src/service/sendOTPMail.ts`: Email service using nodemailer/Gmail SMTP
- `backend/src/user/`: Complete user authentication module (controller/model/router/types)
- `package.json`: Project metadata, scripts, dependencies (uses pnpm)
- `tsconfig.json`: TypeScript config (strict mode, NodeNext modules, ESM)
- `eslint.config.mts`: ESLint config (TypeScript + JS, browser globals)
- `.env`: Environment variables (PORT, MONGODB*URI, JWT_SECRET, GOOGLE_APP*\*)

## Developer Workflows

- **Install dependencies:**
  - Use `pnpm install` (pnpm is the package manager)
- **Development server:**
  - `pnpm run dev` runs `node --loader ts-node/esm --experimental-specifier-resolution=node backend/server.ts`
- **Linting:**
  - ESLint configured for JS/TS. Use `npx eslint .` to lint the project.
- **Type Checking:**
  - TypeScript strict mode enabled. Use `npx tsc --noEmit` to check types.
- **Database:**
  - MongoDB connection handled in `backend/src/config/db.ts`
  - Connection string in `.env` as `MONGODB_URI`

## Critical Patterns & Conventions

### ESM Modules (REQUIRED)

- **Always use `.js` extensions in imports** (e.g., `import { app } from "./app.js"`)
- Required for NodeNext resolution with TypeScript ESM
- This is NOT optional - the project will fail to run without `.js` extensions

### Configuration Pattern

- Environment variables loaded via dotenv in `config.ts`
- Config object frozen with `Object.freeze(_config)` for immutability
- Add new env vars to both `.env` and `config.ts` exports

### Database & Authentication

- **Mongoose ODM** with connection event handlers and error handling
- **JWT authentication** with cookie-based tokens (not localStorage)
- **bcrypt hashing** with exactly 10 salt rounds: `await bcrypt.hash(password, 10)`
- **User roles enum**: `["student", "coremember", "director", "hod", "admin"]`
- **CustomRequest interface** extends Express Request for authenticated user data

### Error Handling

- **http-errors package** for consistent error creation: `createHttpError(400, "message")`
- Global error handler as **last middleware** in `app.ts`
- Errors passed to next() for centralized handling

### Feature Module Architecture

Each domain follows the user module pattern:

```
feature/
├── featureController.ts  # Express handlers with error handling
├── featureModel.ts      # Mongoose schema with TypeScript interfaces
├── featureRouter.ts     # Express router with protected/public routes
└── featureTypes.ts      # TypeScript interfaces and enums
```

### API Structure

- **Feature-based routing** with `/api/{feature}` prefix pattern
- **Protected routes** use `protectedRout` middleware from `middlewares/protected.ts`
- Router imported and mounted in `app.ts` after `app.use(express.json())`

## Integration Points

- **Database Connection:** Established in `server.ts` before `app.listen()` - never start server without DB
- **Environment Config:** All config loaded from `.env` file in `config.ts` and frozen
- **Email Service:** Gmail SMTP using nodemailer with app passwords (not regular passwords)
- **JWT Tokens:** Stored in httpOnly cookies, verified in `protected.ts` middleware
- **Middleware Order:** `express.json()` → `cookie-parser()` → routes → `globalErrorHandler` (last)

## Examples

### Adding a New Feature Module

```typescript
// backend/src/events/eventTypes.ts
export interface Event {
  _id: string;
  title: string;
  description: string;
  date: Date;
  society: string;
}

// backend/src/events/eventModel.ts
import mongoose from "mongoose";
import { Event } from "./eventTypes.js";

const eventSchema = new mongoose.Schema<Event>({...});
const EventModel = mongoose.model("Event", eventSchema);
export default EventModel;

// backend/src/events/eventController.ts
import createHttpError from "http-errors";
export const createEvent = async (req, res, next) => {
  // Implementation with error handling
};

// backend/src/events/eventRouter.ts
import { Router } from "express";
const eventRouter = Router();
eventRouter.post("/", createEvent);
export default eventRouter;

// backend/src/app.ts
import eventRouter from "./events/eventRouter.js";
// ... after userRouter
app.use("/api/events", eventRouter);
```

### Environment Variables

```bash
# .env
PORT=3000
MONGODB_URI=mongodb://localhost:27017/nbkrsocieties
JWT_SECRET=your_secure_jwt_secret_here
GOOGLE_APP_USERNAME=your_gmail@gmail.com
GOOGLE_APP_PASSWORD=your_gmail_app_password
```

## Recommendations for AI Agents

- **Always use `.js` extensions** in import statements (required for ESM + NodeNext)
- **Freeze config objects** with `Object.freeze()` for immutability
- **Establish database connection** before starting server in async `startServer()` function
- **Use http-errors** for error handling: `createHttpError(status, message)`
- **Hash passwords with bcrypt** using exactly 10 salt rounds
- **Follow enum-based role pattern** for user permissions
- **Store JWT tokens in cookies** (not localStorage) for security
- **Test database connections** and server startup after changes
- **Update both `.env` and `config.ts`** when adding new environment variables
- **Place global error handler last** in middleware chain
- **Use CustomRequest interface** for authenticated routes to access `req.user`

---

For questions or missing context, ask the user for clarification or examples from their workflow.

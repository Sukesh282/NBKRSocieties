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
- `package.json`: Project metadata, scripts, dependencies (uses pnpm)
- `tsconfig.json`: TypeScript config (strict mode, NodeNext modules, ESM)
- `eslint.config.mts`: ESLint config (TypeScript + JS, browser globals)
- `.env`: Environment variables (PORT, MONGODB_URI, JWT_SECRET)

## Developer Workflows

- **Install dependencies:**
  - Use `pnpm install` (pnpm is the package manager)
- **Development server:**
  - `pnpm run dev` runs `node --loader ts-node/esm --experimental-specifier-resolution=node backend/server.ts`
- **Linting:**
  - ESLint configured for JS/TS. Use `eslint .` to lint the project.
- **Type Checking:**
  - TypeScript strict mode enabled. Use `tsc --noEmit` to check types.
- **Database:**
  - MongoDB connection handled in `backend/src/config/db.ts`
  - Connection string in `.env` as `MONGODB_URI`

## Patterns & Conventions

- **ESM Modules:** Uses ES modules with NodeNext resolution - imports use `.js` extensions (e.g., `import { app } from "./app.js"`)
- **Configuration:** Environment variables loaded via dotenv, config object frozen with `Object.freeze(_config)`
- **Database:** Mongoose ODM with connection event handlers and error handling
- **Error Handling:** Global error handler using `http-errors` package, imported as middleware in `app.ts`
- **Middleware:** Express middleware applied in `app.ts`, global error handler should be last middleware
- **TypeScript:** Strict type safety with comprehensive rules (`noImplicitAny`, `noUnusedLocals`, etc.)
- **User Roles:** Enum-based role system with 5 levels: student, coremember, director, hod, admin
- **Password Security:** bcrypt hashing with salt rounds of 10
- **API Structure:** Feature-based routing with separate controller/model/router files per domain

## Integration Points

- **Database Connection:** Established in `server.ts` before starting the server
- **Environment Config:** All config loaded from `.env` file in `config.ts`
- **Error Handling:** Centralized in `globalErrorHandler.ts` middleware
- **API Routes:** Modular router system with `/api/users` prefix pattern

## Examples

- **Adding a new route:** Add to `backend/src/app.ts` after `app.use(express.json())`
- **Database model:** Create in `backend/src/models/` directory, import Mongoose
- **Middleware:** Add to `backend/src/middlewares/` and import in `app.ts`
- **Environment variable:** Add to `.env`, then to `config.ts` and export
- **New feature module:** Follow user module pattern: `featureController.ts`, `featureModel.ts`, `featureRouter.ts`, `featureTypes.ts`

## Recommendations for AI Agents

- Always use `.js` extensions in import statements (required for ESM + NodeNext)
- Follow existing patterns: frozen config objects, async database connection
- Use `http-errors` for error handling consistency
- Test database connections and server startup after changes
- Update `.env` for new environment variables and reflect in `config.ts`
- Use bcrypt for password hashing with 10 salt rounds
- Follow enum-based role pattern for user permissions

---

For questions or missing context, ask the user for clarification or examples from their workflow.

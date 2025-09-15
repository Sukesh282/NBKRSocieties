# NBKRSocieties Frontend

[![React](https://img.shields.io/badge/React-19+-61dafb.svg)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-blue.svg)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-7.0+-646cff.svg)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.0+-38bdf8.svg)](https://tailwindcss.com/)
[![React Router](https://img.shields.io/badge/React_Router-7.0+-ca4245.svg)](https://reactrouter.com/)

Modern React frontend application for NBKRSocieties - a comprehensive web platform for managing college society events at N.B.K.R. Institute of Science & Technology.

## 📋 Table of Contents

- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Installation & Setup](#-installation--setup)
- [Development](#-development)
- [Component Architecture](#-component-architecture)
- [Styling Guide](#-styling-guide)
- [API Integration](#-api-integration)
- [Build & Deployment](#-build--deployment)

## 🚀 Features

### ✅ Currently Implemented

- 🔐 **User Authentication UI**
  - Login and signup forms with validation
  - JWT token management with cookies
  - Protected routes and authentication state
- 🎨 **Modern UI Components**
  - Responsive design with Tailwind CSS
  - Reusable component library
  - Consistent design system
- 🧭 **Client-Side Routing**
  - React Router v7 for navigation
  - Protected and public routes
  - Dashboard and authentication pages
- 📱 **Responsive Design**
  - Mobile-first approach
  - Cross-device compatibility
  - Accessible UI components

### 🚧 Planned Features

- 📅 **Event Management Interface** – Create, edit, and view events
- 🏛 **Society Profiles** – Society pages with event listings
- 📝 **Event Registration** – User registration forms
- 🔔 **Notifications** – Real-time notifications and announcements
- 📊 **Dashboard Analytics** – User engagement metrics

## 🛠 Tech Stack

- **Framework:** React 19
- **Language:** TypeScript
- **Build Tool:** Vite
- **Styling:** Tailwind CSS v4
- **Routing:** React Router v7
- **Icons:** Heroicons
- **Package Manager:** pnpm
- **Linting:** ESLint with React support
- **Formatting:** Prettier

## 📂 Project Structure

```
frontend/
├── public/                     # Static assets
│   ├── Inter-VariableFont_opsz,wght.ttf
│   ├── mobile_menu.svg
│   └── vite.png
├── src/
│   ├── components/             # Reusable UI components
│   │   ├── Button.tsx         # Button component
│   │   ├── Menu.tsx           # Navigation menu
│   │   ├── Navbar.tsx         # Top navigation bar
│   │   └── PageTitle.tsx      # Page title component
│   ├── pages/                 # Page components
│   │   ├── Login.tsx          # Authentication page
│   │   └── Dashboard.tsx      # User dashboard
│   ├── hooks/                 # Custom React hooks
│   │   └── env.ts             # Environment configuration
│   ├── context/               # React context providers
│   ├── App.tsx                # Main app component
│   ├── main.tsx               # Application entry point
│   ├── index.css              # Global styles
│   └── vite-env.d.ts          # Vite environment types
├── index.html                 # HTML template
├── package.json               # Project dependencies
├── vite.config.ts             # Vite configuration
├── tailwind.config.js         # Tailwind CSS configuration
├── tsconfig.json              # TypeScript configuration
├── tsconfig.app.json          # App-specific TypeScript config
├── tsconfig.node.json         # Node-specific TypeScript config
├── eslint.config.js           # ESLint configuration
└── README.md
```

## ⚙️ Installation & Setup

### Prerequisites

- Node.js (v18 or higher)
- pnpm package manager

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
VITE_BASE_URL=http://localhost:3000
```

### 3. Development Server

```bash
pnpm run dev
```

The application will start on `http://localhost:5173`

## 💻 Development

### Development Workflow

```bash
# Start development server with hot reload
pnpm run dev

# Run linting
pnpm run lint

# Format code
pnpm run format

# Build for production
pnpm run build

# Preview production build
pnpm run preview
```

### Available Scripts

| Script             | Description               |
| ------------------ | ------------------------- |
| `pnpm run dev`     | Start development server  |
| `pnpm run build`   | Build for production      |
| `pnpm run lint`    | Run ESLint                |
| `pnpm run preview` | Preview production build  |
| `pnpm run format`  | Format code with Prettier |

## 🧩 Component Architecture

### Component Patterns

All components follow consistent patterns:

```tsx
// Component with TypeScript interface
interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: "primary" | "secondary";
  disabled?: boolean;
}

export default function Button({
  children,
  onClick,
  variant = "primary",
  disabled = false,
}: ButtonProps) {
  // Component logic
  return (
    <button
      className={/* Tailwind classes */}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}
```

### Component Categories

- **Layout Components:** `Navbar`, `Menu` - Application structure
- **UI Components:** `Button`, `PageTitle` - Reusable UI elements
- **Page Components:** `Login`, `Dashboard` - Full page views

### State Management

- **Local State:** React `useState` for component state
- **Server State:** Direct API calls with fetch
- **Authentication:** JWT tokens stored in cookies

## 🎨 Styling Guide

### Tailwind CSS v4

This project uses Tailwind CSS v4 with custom configuration:

```js
// tailwind.config.js
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};
```

### Design System

- **Colors:** Tailwind default palette
- **Typography:** Inter font family
- **Spacing:** Tailwind spacing scale
- **Breakpoints:** Mobile-first responsive design

### CSS Classes Pattern

```tsx
// Utility-first approach
<button className="rounded bg-blue-600 px-4 py-2 text-white transition-colors hover:bg-blue-700">
  Click me
</button>;

// Component-specific classes
const Button = ({ variant }) => {
  const baseClasses = "px-4 py-2 rounded font-medium transition-colors";
  const variantClasses = {
    primary: "bg-blue-600 text-white hover:bg-blue-700",
    secondary: "bg-gray-200 text-gray-800 hover:bg-gray-300",
  };

  return (
    <button className={`${baseClasses} ${variantClasses[variant]}`}>
      Button
    </button>
  );
};
```

## 🔗 API Integration

### Environment Configuration

```typescript
// src/hooks/env.ts
export const BASE_URL =
  import.meta.env.VITE_BASE_URL || "http://localhost:3000";
```

### API Calls Pattern

```typescript
// Authentication API calls
const login = async (credentials: LoginData) => {
  const response = await fetch(`${BASE_URL}/api/users/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include", // Include cookies
    body: JSON.stringify(credentials),
  });

  if (!response.ok) {
    throw new Error("Login failed");
  }

  return response.json();
};
```

### Authentication Flow

1. User submits login/signup form
2. API call made with credentials
3. JWT tokens stored in httpOnly cookies
4. Protected routes check authentication status
5. Automatic token refresh on expiry

## 🏗 Build & Deployment

### Production Build

```bash
# Build the application
pnpm run build
```

This creates an optimized production build in the `dist/` directory.

### Deployment Configuration

- **Base URL:** Configure `VITE_BASE_URL` for production API endpoint
- **Static Assets:** Served from `public/` directory
- **Routing:** Client-side routing requires server configuration for SPA

### Server Configuration for SPA

For Apache/Nginx, configure to serve `index.html` for all routes:

```nginx
# nginx.conf
location / {
    try_files $uri $uri/ /index.html;
}
```

## 🧪 Testing

### Component Testing

```bash
# Run tests (when implemented)
pnpm run test
```

### Manual Testing

1. Start development server: `pnpm run dev`
2. Test authentication flow
3. Verify responsive design
4. Check API integration

## 📱 Responsive Design

### Breakpoints

- **Mobile:** < 640px
- **Tablet:** 640px - 1024px
- **Desktop:** > 1024px

### Mobile-First Approach

```tsx
// Mobile-first responsive classes
<div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
  {/* Responsive grid */}
</div>
```

## 🤝 Contributing

### Component Development Guidelines

1. Use TypeScript interfaces for all props
2. Follow Tailwind CSS utility-first approach
3. Implement responsive design
4. Add proper error handling
5. Test components across devices

### Code Style

- **Formatting:** Prettier configuration
- **Linting:** ESLint with React rules
- **TypeScript:** Strict mode enabled
- **Imports:** Group by external libraries, then internal modules

## 🔧 Configuration Files

### Vite Configuration

```typescript
// vite.config.ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    port: 5173,
  },
});
```

### TypeScript Configuration

- **App Config:** `tsconfig.app.json` - Application code
- **Node Config:** `tsconfig.node.json` - Build tools
- **Base Config:** `tsconfig.json` - Shared configuration

## 📞 Support

For questions or support, please contact the development team or create an issue in the repository.

## 📜 License

This project is developed for educational purposes under N.B.K.R. Institute of Science & Technology.

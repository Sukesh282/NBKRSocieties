# NBKRSocieties - College Society Event Platform

A web application designed to manage and showcase events organized by various **societies and clubs** at N.B.K.R. Institute of Science & Technology.  
This project aims to provide students and faculty with a central platform to view, register, and stay updated on upcoming events.

---

## 🚀 Features

- 📅 **Event Management** – Add, edit, and delete events for different societies/clubs.
- 🏛 **Society & Club Profiles** – Each society has its own page with details and activities.
- 📝 **Event Registration** – Students can register for events online.
- 🔔 **Announcements & Notifications** – Stay updated with the latest events.
- 🔐 **User Authentication** – Secure login and role-based access (student, coremember, director, hod, admin).
- 🌐 **Responsive Design** – Works smoothly on desktop and mobile devices (planned for frontend).

---

## 🛠 Tech Stack

- **Backend:** Node.js / Express / TypeScript
- **Database:** MongoDB with Mongoose ODM
- **Authentication:** JWT with bcrypt hashing
- **Package Manager:** pnpm
- **Linting:** ESLint
- **Type Checking:** TypeScript (strict mode)
- **Frontend:** React.js, Tailwind CSS, TypeScript (planned)

---

## 📂 Project Structure

```
├── backend/
│   ├── server.ts          # Main server entry point
│   └── src/
│       ├── app.ts         # Express app configuration
│       ├── config/
│       │   ├── config.ts  # Environment configuration
│       │   └── db.ts      # MongoDB connection setup
│       ├── middlewares/
│       │   └── globalErrorHandler.ts  # Error handling middleware
│       └── user/          # User module (authentication)
│           ├── userController.ts
│           ├── userModel.ts
│           ├── userRouter.ts
│           └── userTypes.ts
├── public/                # Static assets (planned)
├── package.json
├── tsconfig.json
├── eslint.config.mts
└── README.md
```

---

## ⚙️ Installation & Setup

1. **Clone the repository**

   ```bash
   git clone https://github.com/Sukesh282/NBKRSocieties.git
   cd NBKRSocieties
   ```

2. **Install dependencies**

   ```bash
   pnpm install
   ```

3. **Set up environment variables**

   - Copy `.env.example` to `.env` (if available) or create `.env`
   - Add the following variables:
     ```
     PORT=3000
     MONGODB_URI=mongodb://localhost:27017/nbkrsocieties
     JWT_SECRET=your_jwt_secret_here
     ```

4. **Set up MongoDB**

   - Ensure MongoDB is running locally or update `MONGODB_URI` for your database.

5. **Run the development server**

   ```bash
   pnpm run dev
   ```

6. **Lint and type check**

   ```bash
   # Lint the code
   npx eslint .

   # Type check
   npx tsc --noEmit
   ```

---

## 🎯 Usage

- **Development:** Use `pnpm run dev` to start the server with hot reloading.
- **API Endpoints:** Access via `/api/users` for user-related operations.
- **Database:** Models are defined using Mongoose in the respective modules.
- **Error Handling:** Global error handler catches and formats errors.

---

## 🤝 Contributing

1. Fork the repo
2. Create a feature branch (`git checkout -b feature-name`)
3. Commit your changes (`git commit -m 'Added new feature'`)
4. Push to your branch (`git push origin feature-name`)
5. Open a Pull Request

---

## 📜 License

This project is for educational purposes under N.B.K.R. Institute of Science & Technology.  
Feel free to modify and improve it for your own learning.

---

## 👨‍💻 Authors

Team Members of College Society Event Website Project  
N.B.K.R. Institute of Science & Technology

- [Sukesh Reddy](https://github.com/Sukesh282)
- [Murali](https://github.com/tobioffice)
- [Mothi](https://github.com/mothi-135)

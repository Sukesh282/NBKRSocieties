import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import { ErrorProvider } from "./contexts/ErrorContext";
import AlertComponent from "./components/AlertComponent";
import Profile from "./pages/Profile";

import { AuthProvider } from "./contexts/AuthContext";
import NavBar from "./components/NavBar";
// import ProtectedNavbar from "./components/ProtectedNavbar";

function App() {
  // const PublicRoutes: string[] = ["/login", "/signup", "/"];

  return (
    <ErrorProvider>
      <AuthProvider>
        <AlertComponent />
        <div className="font-family-sans min-h-screen bg-gray-100">
          <NavBar />
          <Routes>
            <Route path="/" element={<div>Home</div>} />
            <Route path="/auth" element={<Login />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
        </div>
      </AuthProvider>
    </ErrorProvider>
  );
}

export default App;

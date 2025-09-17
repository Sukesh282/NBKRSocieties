import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Navbar from "./components/Navbar";
import Dashboard from "./pages/Dashboard";
import { ErrorProvider } from "./contexts/ErrorContext";
import { AuthProvider } from "./contexts/AuthContext";
import AlertComponent from "./components/AlertComponent";

function App() {
  return (
    <AuthProvider>
      <ErrorProvider>
        <AlertComponent />
        <div className="font-family-sans min-h-screen bg-gray-100">
          <Navbar />
          <Routes>
            <Route path="/" element={<div>Home</div>} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Login />} />
            <Route path="/dashboard" element={<Dashboard />} />
          </Routes>
        </div>
      </ErrorProvider>
    </AuthProvider>
  );
}

export default App;

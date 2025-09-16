import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Navbar from "./components/Navbar";
import Dashboard from "./pages/Dashboard";
import { ErrorProvider } from "./contexts/ErrorContext";
import { LoginProvider } from "./contexts/LoginConext";
import AlertComponent from "./components/AlertComponent";

function App() {
  return (
    <LoginProvider>
      <ErrorProvider>
        <AlertComponent />
        <div className="font-family-sans min-h-screen bg-gray-100">
          <Navbar />
          <Routes>
            <Route path="/" element={<div>Home</div>} />
            <Route path="/login" element={<Login isLoginP={true} />} />
            <Route path="/signup" element={<Login isLoginP={false} />} />
            <Route path="/dashboard" element={<Dashboard />} />
          </Routes>
        </div>
      </ErrorProvider>
    </LoginProvider>
  );
}

export default App;

// AuthContext.js
import React, { useState, useEffect } from "react";
import { AuthContext } from "./useAuth";
import { Navigate } from "react-router-dom";
import { useError } from "./useError";

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [accessToken, setAccessToken] = useState(null);
  const { setError, setGood } = useError();

  const login = async (credentials: { username: string; password: string }) => {
    const res = await fetch("http://localhost:5000/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(credentials),
      credentials: "include",
    });

    if (!res.ok) {
      setError("Login failed. Please check your credentials.");
      setGood(false);
      <Navigate to="/login" />;
      return;
    }
    const data = await res.json();

    setAccessToken(data.accessToken);
  };

  const logout = () => {
    setAccessToken(null);
    fetch("http://localhost:5000/api/logout", {
      method: "POST",
      credentials: "include",
    });
  };

  useEffect(() => {
    const refresh = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/refresh", {
          method: "POST",
          credentials: "include",
        });
        if (res.ok) {
          const data = await res.json();
          setAccessToken(data.accessToken);
        }
      } catch {
        setAccessToken(null);
      }
    };
    refresh();
  }, []);

  return (
    <AuthContext.Provider value={{ accessToken, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

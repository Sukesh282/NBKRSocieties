// AuthContext.js
import React, { useState, useEffect } from "react";
import { AuthContext } from "./useAuth";
import { Navigate } from "react-router-dom";
import { useError } from "./useError";
import { BASE_URL } from "@/hooks/env";
import { type User } from "./useAuth";

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [accessToken, setAccessToken] = useState(null);
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { setError, setGood } = useError();

  const login = async (credentials: { username: string; password: string }) => {
    const res = await fetch(`${BASE_URL}/api/users/login`, {
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

  const logout = async () => {
    setAccessToken(null);
    await fetch(`${BASE_URL}/logout`, {
      method: "POST",
      credentials: "include",
    });
    setUser(null);
    setGood(true);
    setError("Logged out successfully");
    <Navigate to="/login" />;
  };

  useEffect(() => {
    const refresh = async () => {
      try {
        const res = await fetch(`${BASE_URL}/api/users/refresh`, {
          credentials: "include",
        });
        if (res.ok) {
          const data = await res.json();
          setAccessToken(data.accessToken);
          setUser({
            name: data.name,
            email: data.email,
            username: data.username,
            role: data.role,
          });
        }
      } catch {
        setAccessToken(null);
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };
    refresh();
  }, []);

  return (
    <AuthContext.Provider
      value={{ accessToken, user, login, logout, isLoading }}
    >
      {children}
    </AuthContext.Provider>
  );
};

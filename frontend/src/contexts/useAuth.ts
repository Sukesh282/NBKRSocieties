import { createContext, useContext } from "react";

export interface AuthContextType {
  accessToken: string | null;
  login: (credentials: { username: string; password: string }) => Promise<void>;
  logout: () => void;
  user: User | null;
  isLoading: boolean;
}

export interface User {
  name: string;
  email: string | null;
  username: string;
  role: string;
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined,
);

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

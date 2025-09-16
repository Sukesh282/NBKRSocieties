import { createContext, useContext } from "react";

export interface ErrorContextType {
  error: string | null;
  setError: (error: string | null) => void;
  isGood: boolean;
  setGood: (isGood: boolean) => void;
  clearError: () => void;
}

export const ErrorContext = createContext<ErrorContextType | undefined>(
  undefined,
);

export const useError = () => {
  const context = useContext(ErrorContext);
  if (context === undefined) {
    throw new Error("useError must be used within an ErrorProvider");
  }
  return context;
};

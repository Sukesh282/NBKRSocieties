import React, { useState } from "react";
import { ErrorContext } from "./useError";

export const ErrorProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [error, setError] = useState<string | null>(null);
  const [isGood, setGood] = useState<boolean>(false);

  const clearError = () => setError(null);

  return (
    <ErrorContext.Provider
      value={{ error, setError, clearError, isGood, setGood }}
    >
      {children}
    </ErrorContext.Provider>
  );
};

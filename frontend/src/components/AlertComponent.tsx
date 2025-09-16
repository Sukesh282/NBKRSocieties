import { useEffect, useRef } from "react";
import { useError } from "../contexts/useError";
import { XCircleIcon } from "@heroicons/react/24/solid";

const AlertComponent = () => {
  const { isGood } = useError();
  const { error, clearError } = useError();
  const timeoutRef = useRef<number | null>(null);

  useEffect(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    if (error) {
      timeoutRef.current = setTimeout(() => {
        clearError();
      }, 2000);
    }

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [error, clearError]);

  const bgClass = isGood ? "bg-feedback-success" : "bg-feedback-error";
  const ringClass = isGood ? "ring-green-400" : "ring-red-400";

  return (
    error && (
      <div
        className={`${bgClass} fixed top-4 left-1/2 z-50 flex -translate-x-1/2 transform gap-4 rounded-lg p-2 text-white shadow-lg ring-1 ${ringClass} ring-offset-2`}
      >
        {error}
        <button className="cursor-pointer" onClick={clearError}>
          <div className="h-5 w-5">
            <XCircleIcon />
          </div>
        </button>
      </div>
    )
  );
};

export default AlertComponent;

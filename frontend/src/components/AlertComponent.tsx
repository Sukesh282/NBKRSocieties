import { useEffect, useRef } from "react";
import { useError } from "../contexts/useError";
import { CheckCircle2Icon, CircleAlert } from "lucide-react";
import { Alert, AlertTitle } from "@/components/ui/alert";

const AlertComponent = () => {
  const { isGood } = useError();
  const { error, clearError } = useError();
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

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

  return (
    error && (
      <Alert
        className="fixed top-5 left-[50%] z-50 w-fit -translate-x-1/2 transform"
        variant={isGood ? "default" : "destructive"}
      >
        {isGood ? <CheckCircle2Icon /> : <CircleAlert />}
        <AlertTitle>{error}</AlertTitle>
      </Alert>
    )
  );
};

export default AlertComponent;

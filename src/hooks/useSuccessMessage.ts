import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";

const SUCCESS_MESSAGE_DURATION = 5000;

export function useSuccessMessage(): boolean {
  const searchParams = useSearchParams();
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  useEffect(() => {
    if (searchParams.get("booking") === "success") {
      setShowSuccessMessage(true);
      // Remove query param from URL
      window.history.replaceState({}, "", "/tickets");
      
      // Hide message after duration
      const timer = setTimeout(() => {
        setShowSuccessMessage(false);
      }, SUCCESS_MESSAGE_DURATION);

      return () => clearTimeout(timer);
    }
  }, [searchParams]);

  return showSuccessMessage;
}


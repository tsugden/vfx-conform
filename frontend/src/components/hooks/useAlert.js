import { useEffect, useState } from "react";

const useAlert = (alert, timeout = 5000) => {
  const [message, setMessage] = useState(null);

  useEffect(() => {
    if (alert !== null) {
      setMessage(alert);
    }

    const timeoutId = setTimeout(() => {
      setMessage(null);
    }, timeout);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [alert, timeout]);

  return message;
};

export default useAlert;

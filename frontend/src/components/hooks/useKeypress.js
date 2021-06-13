import { useEffect } from "react";

const useKeypress = (key, handler) => {
  useEffect(() => {
    const onKeyUp = (e) => {
      if (e.key === key) {
        handler(e);
      }
    };

    document.addEventListener("keyup", onKeyUp);

    return () => {
      document.removeEventListener("keyup", onKeyUp);
    };
  }, [key, handler]);
};

export default useKeypress;

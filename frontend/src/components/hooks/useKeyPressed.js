import { useEffect, useState } from "react";

const useKeyPressed = () => {
  const [keyPressed, setKeyPressed] = useState(null);

  useEffect(() => {
    const onKeyDown = (e) => {
      setKeyPressed(e.key);
    };

    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [keyPressed]);

  useEffect(() => {
    const onKeyUp = (e) => {
      setKeyPressed(null);
    };

    document.addEventListener("keyup", onKeyUp);

    return () => {
      document.removeEventListener("keyup", onKeyUp);
    };
  }, [keyPressed]);

  return keyPressed;
};

export default useKeyPressed;

import { useEffect } from "react";

const useDoubleClick = (ref, handler) => {
  useEffect(() => {
    const listener = (e) => {
      if (ref.current) {
        handler(e);
      }
    };

    document.addEventListener("dblclick", listener);

    return () => {
      document.removeEventListener("dblclick", listener);
    };
  }, [ref, handler]);
};

export default useDoubleClick;

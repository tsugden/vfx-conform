// React
import React from "react";

// CSS
import "./Layout.css";

const Carousel = ({ children, className, ...rest }) => {
  const classNames = ["carousel", className].filter(Boolean).join(" ").trim();

  return (
    <ul className={classNames} {...rest}>
      {children}
    </ul>
  );
};

export default Carousel;

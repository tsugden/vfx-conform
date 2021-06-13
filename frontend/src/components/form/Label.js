// React
import React from "react";

// CSS
import "./Label.css";

const Label = ({ children, className, ...rest }) => {
  const classNames = ["label", className].filter(Boolean).join(" ").trim();

  return (
    <label className={classNames} {...rest}>
      {children}
    </label>
  );
};

export default Label;

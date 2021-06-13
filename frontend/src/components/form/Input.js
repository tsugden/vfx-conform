import React from "react";

import "./Input.css";

const Input = ({ children, content, className, ...rest }) => {
  const classNames = ["input", className].filter(Boolean).join(" ").trim();

  return (
    <input className={classNames} {...rest}>
      {content ? content : children}
    </input>
  );
};

export default Input;

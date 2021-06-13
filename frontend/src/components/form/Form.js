// React
import React from "react";

// CSS
import "./Form.css";

const Form = ({ children, className, ...rest }) => {
  const classNames = ["form", className].filter(Boolean).join(" ").trim();

  return (
    <form className={classNames} {...rest}>
      {children}
    </form>
  );
};

export default Form;

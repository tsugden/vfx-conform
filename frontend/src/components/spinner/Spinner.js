// React
import React from "react";

// CSS
import "./Spinner.css";

const Spinner = ({ className, ...rest }) => {
  const classNames = ["spinner", className].filter(Boolean).join(" ").trim();

  return (
    <div className={classNames} {...rest}>
      <i className="fas fa-circle-notch" />
    </div>
  );
};

export default Spinner;

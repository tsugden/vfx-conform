import React from "react";

import "./Layout.css";

const Wrapper = ({ children, className, ...rest }) => {
  const classNames = ["wrapper", className].filter(Boolean).join(" ").trim();

  return (
    <div className={classNames} {...rest}>
      {children}
    </div>
  );
};

export default Wrapper;

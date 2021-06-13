import React from "react";

import "./Layout.css";

const ContentBody = ({ children, className, ...rest }) => {
  const classNames = ["content-body", className]
    .filter(Boolean)
    .join(" ")
    .trim();

  return (
    <div className={classNames} {...rest}>
      {children}
    </div>
  );
};

export default ContentBody;

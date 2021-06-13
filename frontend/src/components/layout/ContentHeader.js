import React from "react";

import "./Layout.css";

const ContentHeader = ({ children, className, ...rest }) => {
  const classNames = ["content-header", className]
    .filter(Boolean)
    .join(" ")
    .trim();

  return (
    <div className={classNames} {...rest}>
      {children}
    </div>
  );
};

export default ContentHeader;

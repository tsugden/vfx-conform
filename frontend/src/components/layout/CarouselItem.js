// React
import React from "react";

// CSS
import "./Layout.css";

const CarouselItem = ({ children, className, selected, ...rest }) => {
  const classNames = [
    "carousel-item",
    className,
    `${selected ? "selected" : ""}`,
  ]
    .filter(Boolean)
    .join(" ")
    .trim();

  return (
    <li className={classNames} {...rest}>
      {children}
    </li>
  );
};

export default CarouselItem;

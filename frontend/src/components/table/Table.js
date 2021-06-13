// React
import React from "react";

// CSS
import "./Table.css";

export const TableContainer = ({ children, className, secondary, ...rest }) => {
  const classNames = [
    "table-container",
    className,
    `${secondary ? "secondary" : ""}`,
  ]
    .filter(Boolean)
    .join(" ")
    .trim();

  return (
    <div className={classNames} {...rest}>
      {children}
    </div>
  );
};

export const TableTitle = ({ children, className, ...rest }) => {
  const classNames = ["table-title", className]
    .filter(Boolean)
    .join(" ")
    .trim();

  return (
    <div className={classNames} {...rest}>
      {children}
    </div>
  );
};

export const TableHeader = ({ children, className, ...rest }) => {
  const classNames = ["table-header", className]
    .filter(Boolean)
    .join(" ")
    .trim();

  return (
    <ul className={classNames} {...rest}>
      {children}
    </ul>
  );
};

export const TableBody = ({ children, className, ...rest }) => {
  const classNames = ["table-body", className].filter(Boolean).join(" ").trim();

  return (
    <ul className={classNames} {...rest}>
      {children}
    </ul>
  );
};

export const TableRow = ({ children, className, ...rest }) => {
  const classNames = ["table-row", className].filter(Boolean).join(" ").trim();

  return (
    <li className={classNames} {...rest}>
      {children}
    </li>
  );
};

export const TableItem = ({ children, className, ...rest }) => {
  const classNames = ["table-item", className].filter(Boolean).join(" ").trim();

  return (
    <div className={classNames} {...rest}>
      {children}
    </div>
  );
};

// NEW
export const Table = ({ children, className, ...rest }) => {
  const classNames = ["table", className].filter(Boolean).join(" ").trim();

  return (
    <table className={classNames} {...rest}>
      {children}
    </table>
  );
};

export const THead = ({ children, className, ...rest }) => {
  const classNames = ["thead", className].filter(Boolean).join(" ").trim();

  return (
    <thead className={classNames} {...rest}>
      {children}
    </thead>
  );
};

export const TBody = ({ children, className, ...rest }) => {
  const classNames = ["tbody", className].filter(Boolean).join(" ").trim();

  return (
    <tbody className={classNames} {...rest}>
      {children}
    </tbody>
  );
};

export const TR = ({ children, className, selected, ...rest }) => {
  const classNames = ["tr", selected ? "selected" : "", className]
    .filter(Boolean)
    .join(" ")
    .trim();

  return (
    <tr className={classNames} {...rest}>
      {children}
    </tr>
  );
};

export const TH = ({ children, className, ...rest }) => {
  const classNames = ["th", className].filter(Boolean).join(" ").trim();

  return (
    <th className={classNames} {...rest}>
      {children}
    </th>
  );
};

export const TD = ({ children, className, ...rest }) => {
  const classNames = ["td", className].filter(Boolean).join(" ").trim();

  return (
    <td className={classNames} {...rest}>
      {children}
    </td>
  );
};

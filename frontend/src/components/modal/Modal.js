import React, { useRef } from "react";
import ReactDOM from "react-dom";

import "./Modal.css";

const Modal = ({ show, onClose, children }) => {
  const ref = useRef();

  /*
  useKeypress("Escape", onClose);
  useOnClickOutside(ref, onClose);
  */

  if (!show) {
    return null;
  }

  const renderedModal = (
    <section className="modal">
      <div className="modal-wrapper" ref={ref}>
        {children}
      </div>
    </section>
  );

  return ReactDOM.createPortal(renderedModal, document.querySelector("#root"));
};

export default Modal;

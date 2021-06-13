import React from "react";

import { Modal, ModalContent, ModalActions, ModalHeader } from "../modal";
import { Button } from "../../components/form";

const Confirm = ({ show, header, content, onConfirm, onCancel }) => {
  return (
    <Modal show={show}>
      <ModalHeader>{header && header}</ModalHeader>

      <ModalContent>
        <p>{content && content}</p>
      </ModalContent>

      <ModalActions position="right">
        <Button content="Cancel" onClick={onCancel} />
        <Button content="Confirm" onClick={onConfirm} />
      </ModalActions>
    </Modal>
  );
};

export default Confirm;

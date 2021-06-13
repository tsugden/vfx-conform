import React, { useState } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { createProject } from "../../actions/projectActions";

import { Modal, ModalContent, ModalActions, ModalHeader } from "../modal";
import { Button } from "../../components/form";
import { Input } from "../../components/form";

import "./NewProjectModal.css";

const NewProjectModal = ({ show, onClose, createProject }) => {
  const [name, setName] = useState("");
  const [nickname, setNickname] = useState("");

  const clearAll = () => {
    onClose();
    setName("");
    setNickname("");
  };

  const onFormSubmit = (e) => {
    e.preventDefault();
    createProject({ name, nickname });
    clearAll();
  };

  return (
    <Modal show={show} onClose={onClose}>
      <ModalHeader>New Project</ModalHeader>
      <ModalContent>
        <div className="new-project-container">
          <form id="new-project-form" onSubmit={onFormSubmit}>
            <Input
              required
              label="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <Input
              required
              label="Nickname"
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
            />
          </form>
        </div>
      </ModalContent>
      <ModalActions position="right">
        <Button content="Cancel" onClick={clearAll} />
        <Button content="Submit" type="submit" form="new-project-form" />
      </ModalActions>
    </Modal>
  );
};

NewProjectModal.propTypes = {
  createProject: PropTypes.func.isRequired,
};

export default connect(null, { createProject })(NewProjectModal);

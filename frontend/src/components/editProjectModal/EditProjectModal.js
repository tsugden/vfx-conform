import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { updateProject, deleteProject } from "../../actions/projectActions";

import { Modal, ModalContent, ModalActions, ModalHeader } from "../modal";
import { Button } from "../../components/form";
import { Input } from "../../components/form";

import DeleteProjectModal from "../deleteProjectModal";

import "./EditProjectModal.css";

const EditProjectModal = ({
  show,
  onClose,
  selectedProject,
  updateProject,
  deleteProject,
}) => {
  const [name, setName] = useState("");
  const [nickname, setNickname] = useState("");

  useEffect(() => {
    if (selectedProject !== null) {
      const { name, nickname } = selectedProject;
      setName(name);
      setNickname(nickname);
    }
  }, [selectedProject, show]);

  const onFormSubmit = (e) => {
    e.preventDefault();
    updateProject({ name, nickname, _id: selectedProject._id });
    onClose();
  };

  const onFormDelete = (e) => {
    deleteProject(selectedProject);
    onClose();
  };

  return (
    <Modal show={show} onClose={onClose}>
      <ModalHeader>Edit Project</ModalHeader>
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
        <Button content="Close" onClick={onClose} />
        <Button content="Submit" type="submit" form="new-project-form" />
      </ModalActions>
      <ModalActions position="left">
        <DeleteProjectModal
          onDelete={onFormDelete}
          content={`Are you sure you want do delete...`}
        />
      </ModalActions>
    </Modal>
  );
};
/*
        <Button secondary content="Delete Project" onClick={onFormDelete} />
        */

EditProjectModal.propTypes = {
  selectedProject: PropTypes.object,
  updateProject: PropTypes.func.isRequired,
  deleteProject: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  selectedProject: state.project.selected,
});

export default connect(mapStateToProps, { updateProject, deleteProject })(
  EditProjectModal
);

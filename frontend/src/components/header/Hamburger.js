import React, { useState, useRef } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import EditProjectModal from "../editProjectModal";

import NavbarItem from "./NavbarItem";
import { MenuItem, MenuHeader, MenuSeparator } from "../menu";
import { Button } from "../form";

import useOnClickOutside from "../hooks/useOnClickOutside";
import useKeypress from "../hooks/useKeypress";

const HamburgerBtn = ({ selectedProject }) => {
  const hamburgerOpen = <i className="fas fa-bars" />;
  const hamburgerClose = <i className="fas fa-times" />;

  const [open, setOpen] = useState(false);
  const [show, setShow] = useState(false);

  const ref = useRef();

  useOnClickOutside(ref, () => setOpen(false));
  useKeypress("Escape", () => setOpen(false));

  const renderedMenu = (
    <div className="menu-bg">
      <MenuHeader>{selectedProject && selectedProject.name}</MenuHeader>

      <Button
        menu
        content="Edit Project"
        onClick={() => {
          setOpen(false);
          setShow(true);
        }}
      />

      <MenuItem to="/" onClick={() => setOpen(false)} content="Home" />

      <MenuSeparator />
      <MenuHeader>Assets</MenuHeader>
      <MenuItem
        to="/watch"
        onClick={() => setOpen(false)}
        content="Asset Management"
      />
      <MenuSeparator />
      <MenuHeader>Open Clip</MenuHeader>
      <MenuItem
        to="/openclipcreator"
        onClick={() => setOpen(false)}
        content="Open Clip Creator"
      />
      <MenuSeparator />
      <MenuHeader>Sequences</MenuHeader>
      <MenuItem
        to="/findsequences"
        onClick={() => setOpen(false)}
        content="Find Sequences"
      />
    </div>
  );

  return (
    <nav id="hamburger-menu" ref={ref}>
      <NavbarItem
        content={open ? hamburgerClose : hamburgerOpen}
        enabled={selectedProject !== null}
        onClick={() => setOpen(!open)}
      />

      <EditProjectModal show={show} onClose={() => setShow(false)} />

      {open && renderedMenu}
    </nav>
  );
};

HamburgerBtn.propTypes = {
  selectedProject: PropTypes.object,
};

const mapStateToProps = (state) => ({
  selectedProject: state.project.selected,
});

export default connect(mapStateToProps)(HamburgerBtn);

// React
import React, { useState } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

// Components
import {
  TableContainer,
  TableTitle,
  TableHeader,
  TableBody,
  TableRow,
  TableItem,
} from "../table";
import { Spinner } from "../spinner";

import { ButtonBox, NavButton } from "../button";

// Hooks
import useTurnoverActions from "./useTurnoverActions";
import useInputMemory from "../hooks/useInputMemory";

// CSS
import "./WatchDir.css";

const WatchDir = ({ data }) => {
  const { _id, path } = data;

  const [{ current, missing }, index, indexAll, forget] = useTurnoverActions(
    _id
  );

  const sortData = (data) => {
    return data
      .sort((a, b) => b.path.localeCompare(a.path))
      .sort((a) => (a.isIndexed ? 1 : -1));
  };
  const sortedDirs = sortData([...current, ...missing]);

  const PATH_LABEL = "PATH_LABEL";
  const PATH_EDIT = "PATH_EDIT";
  const PATH_DELETE = "PATH_DELETE";
  const [form, setForm] = useState(PATH_LABEL);

  const [
    formPath,
    pathSnapshot,
    onPathInit,
    onPathChange,
    onPathCancel,
  ] = useInputMemory(path);

  const handleIndex = (e, _id) => {
    switch (e.shiftKey) {
      case true:
        indexAll(sortedDirs);
        break;

      case false:
        index(_id);
        break;

      default:
        throw new Error(`Unknown event: ${e}`);
    }
  };

  const onEditClick = () => {
    onPathInit(path);
    setForm(PATH_EDIT);
  };

  const onEditCancel = () => {
    onPathCancel();
    setForm(PATH_LABEL);
  };

  const renderedEditForm = (
    <form className="form">
      <input
        value={formPath}
        onChange={(e) => onPathChange(e.target.value)}
        required
        autoFocus
      />

      <ButtonBox right>
        <NavButton
          type="submit"
          disabled={formPath === pathSnapshot || formPath === ""}
        >
          <i className="fas fa-check" />
        </NavButton>

        <NavButton type="button" onClick={onEditCancel}>
          <i className="fas fa-times" />
        </NavButton>
      </ButtonBox>
    </form>
  );

  const renderedTable = (
    <TableContainer id={_id}>
      <TableTitle>{path}</TableTitle>

      <TableHeader>
        <TableRow>
          <TableItem>NAME</TableItem>
          <TableItem>STATUS</TableItem>
          <TableItem>ACTIONS</TableItem>
        </TableRow>
      </TableHeader>

      <TableBody>
        {sortedDirs.map((data) => {
          const { _id, path, isIndexed, indexedAt, isBusy } = data;

          return (
            <TableRow key={_id}>
              <TableItem>{path}</TableItem>
              <TableItem>{isIndexed ? indexedAt : "New"}</TableItem>
              <TableItem>
                <ButtonBox right>
                  {isBusy && <Spinner />}

                  <NavButton onClick={(e) => handleIndex(e, _id)}>
                    <i className="fas fa-sync-alt" />
                  </NavButton>
                  <NavButton onClick={() => console.log("open-clip")}>
                    <i className="far fa-file-code" />
                  </NavButton>
                  <NavButton onClick={() => forget(_id)}>
                    <i className="far fa-times-circle" />
                  </NavButton>
                </ButtonBox>
              </TableItem>
            </TableRow>
          );
        })}
      </TableBody>
    </TableContainer>
  );

  return renderedTable;
};

WatchDir.propTypes = {
  projectId: PropTypes.string,
};

const mapStateToProps = (state) => ({
  projectId:
    state.project.selected !== null ? state.project.selected._id : null,
});

export default connect(mapStateToProps)(WatchDir);

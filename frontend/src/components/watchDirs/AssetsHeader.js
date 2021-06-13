// React
import React, { useState, useEffect } from "react";

// Components
import {
  TableContainer,
  TableHeader,
  TableBody,
  TableRow,
  TableItem,
} from "../table";
import { Spinner } from "../spinner";

import { NavButton, ButtonBox } from "../button";

// CSS
import "./Assets.css";

const AssetsHeader = ({ assets, loading, addPath, deletePath }) => {
  const [showNewForm, setShowNewForm] = useState(false);
  const [newPath, setNewPath] = useState("");

  useEffect(() => {
    setShowNewForm(false);
    setNewPath("");
  }, [assets]);

  const handleAddNewPath = (e) => {
    e.preventDefault();
    addPath(newPath);
  };

  const handleCancelNewPathForm = () => {
    setShowNewForm(false);
    setNewPath("");
  };
  const assetActions = (id) => (
    <ButtonBox>
      <NavButton onClick={() => deletePath(id)}>
        <i className="fas fa-folder-minus" />
      </NavButton>
    </ButtonBox>
  );

  const newPathForm = () => {
    return (
      <form className="new-path-form" onSubmit={handleAddNewPath}>
        <input
          value={newPath}
          onChange={(e) => setNewPath(e.target.value)}
          autoFocus
        />

        <ButtonBox right>
          <NavButton type="submit">
            <i className="fas fa-check" />
          </NavButton>

          <NavButton onClick={handleCancelNewPathForm}>
            <i className="fas fa-times" />
          </NavButton>
        </ButtonBox>
      </form>
    );
  };

  const renderedTable = (
    <TableContainer id="assets-table">
      <TableHeader>
        <TableRow>
          <TableItem>PATH</TableItem>
          <TableItem>ACTIONS</TableItem>
        </TableRow>
      </TableHeader>

      <TableBody>
        {assets.map(({ _id, path }) => (
          <TableRow key={_id}>
            <TableItem>
              <a href={`#${_id}`}>{path}</a>
            </TableItem>
            <TableItem>{assetActions(_id)}</TableItem>
          </TableRow>
        ))}

        {showNewForm && <TableRow>{newPathForm()}</TableRow>}
      </TableBody>
    </TableContainer>
  );

  return (
    <div className="header-container">
      <div className="header-title">
        <h6>ASSETS</h6>
      </div>
      <div className="header-table">{renderedTable}</div>
      <div className="actions-box">
        <ButtonBox right>
          {loading && <Spinner big />}

          <NavButton big onClick={() => setShowNewForm(!showNewForm)}>
            <i className="fas fa-folder-plus" />
          </NavButton>
        </ButtonBox>
      </div>
    </div>
  );
};

export default AssetsHeader;

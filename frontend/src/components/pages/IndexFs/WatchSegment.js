import React from "react";

// import "./WatchSegment.css";

const WatchSegment = ({ name, path }) => {
  return (
    <div className="containerz">
      <div className="info">
        <i className="folder"></i>
        <h4>{name}</h4>
        <p>{path}</p>
      </div>
      <div className="buttons">
        <div>
          <p>Add</p>
        </div>
      </div>
    </div>
    //
  );
};

export default WatchSegment;

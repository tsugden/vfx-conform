// React
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

// Components
import WatchDir from "./WatchDir";
import { ContentHeader, ContentBody, Wrapper } from "../layout";
import AssetsHeader from "./AssetsHeader";

// Actions
import useAssetActions from "./useAssetActions";

// CSS
import "./WatchDirs.css";

const WatchDirs = ({ projectID }) => {
  const [
    { directories, loading },
    setProjectID,
    addPath,
    deletePath,
  ] = useAssetActions(projectID);

  useEffect(() => setProjectID(projectID), [setProjectID, projectID]);

  const renderedHeader = (
    <ContentHeader>
      <Wrapper>
        <AssetsHeader
          assets={directories}
          loading={loading}
          addPath={addPath}
          deletePath={deletePath}
        />
      </Wrapper>
    </ContentHeader>
  );

  const renderedTables = (
    <ContentBody>
      <Wrapper>
        {directories.map((data) => (
          <WatchDir key={data._id} id={data._id} data={data} />
        ))}
      </Wrapper>
    </ContentBody>
  );

  return (
    <ContentBody id="watch-dirs">
      {renderedHeader}
      {directories.length > 0 && renderedTables}
    </ContentBody>
  );
};

WatchDirs.propTypes = {
  projectID: PropTypes.string,
};

const mapStateToProps = (state) => ({
  projectID: state.project.selected ? state.project.selected._id : null,
});

export default connect(mapStateToProps)(WatchDirs);

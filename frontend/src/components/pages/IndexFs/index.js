import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Container, Grid, List } from "semantic-ui-react";

import { getWatchDirs } from "../../../actions/dirActions";
import WatchSegment from "./WatchSegment";

const IndexFs = ({ dirs, selectedProject, getWatchDirs }) => {
  useEffect(() => {
    if (selectedProject !== null) {
      getWatchDirs(selectedProject._id);
    }
  }, [selectedProject, getWatchDirs]);

  const renderedList = dirs.map(({ _id, name, path }) => (
    <WatchSegment key={_id} name={name} path={path} />
  ));

  return (
    <div id="indexFs">
      <Container>
        <Grid textAlign="left" centered>
          <Grid.Column style={{ maxWidth: 800 }}>
            <h4 id="header">Index Filesystem</h4>
            <p className="para">Add watch folders and index the filesystem</p>

            <List>{renderedList}</List>
          </Grid.Column>
        </Grid>
      </Container>
    </div>
  );
};

const mapStateToProps = (state) => ({
  dirs: state.directory.dirs,
  selectedProject: state.project.selected,
});

export default connect(mapStateToProps, { getWatchDirs })(IndexFs);

// React
import React from "react";

// Components
import PageContainer from "./PageContainer";
import AssetsContainer from "./AssetsContainer";
import SequenceContainer from "./SequenceContainer";

const OpenClipCreator = () => {
  return (
    <PageContainer>
      <SequenceContainer />
      <AssetsContainer />
    </PageContainer>
  );
};

export default OpenClipCreator;

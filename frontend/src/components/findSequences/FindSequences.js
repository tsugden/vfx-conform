// React
import React, { useState, useEffect } from "react";
import { connect } from "react-redux";

// Components
import QueryForm from "./QueryForm";
import SelectForm from "./SelectForm";
import SequenceTable from "./SequenceTable";
import { ContentHeader, ContentBody, Wrapper } from "../layout";

// Actions
import useFindSequenceActions from "./useFindSequenceActions";
import useTableActions from "../hooks/useTableActions";

// CSS
import "./FindSequences.css";

const FindSequences = ({ project }) => {
  const projectId = project.selected ? project.selected._id : null;

  const [
    { searchTerm, selectTerm, sequences, loading, error },
    setSearchTerm,
    setSelectTerm,
    clearSearch,
    getSequences,
  ] = useFindSequenceActions(projectId);

  const [
    tableData,
    selected,
    setTableData,
    toggleSelected,
    appendSelected,
    extendSelected,
    clearSelected,
    sortTable,
    matchString,
    invertSelected,
  ] = useTableActions();

  useEffect(() => setTableData(sequences), [sequences]);

  const [nameAscending, setNameAscending] = useState(true);
  const [lengthAscending, setLengthAscending] = useState(true);

  const onRowClick = (e, index) => {
    if (e.shiftKey) {
      extendSelected(index);
    } else if (e.altKey) {
      appendSelected(index);
    } else {
      toggleSelected(index);
    }
  };

  const onQuerySubmit = (e) => {
    e.preventDefault();
    getSequences();
  };

  const onSelectClick = (e) => {
    e.preventDefault();
    matchString("basename", selectTerm, false);
  };

  const onMergeClick = (e) => {
    e.preventDefault();
    matchString("basename", selectTerm, true);
  };

  useEffect(() => sortTable("basename", nameAscending), [nameAscending]);
  useEffect(() => sortTable("length", lengthAscending), [lengthAscending]);

  const renderedTable = (
    <SequenceTable
      tableData={tableData}
      onRowClick={onRowClick}
      onNameClick={() => setNameAscending(!nameAscending)}
      onLengthClick={() => setLengthAscending(!lengthAscending)}
    />
  );

  const renderedBody = (
    <ContentBody>
      <Wrapper>{renderedTable}</Wrapper>
    </ContentBody>
  );

  const renderedQueryForm = (
    <QueryForm
      onSubmit={onQuerySubmit}
      onClear={clearSearch}
      term={searchTerm}
      setTerm={setSearchTerm}
      loading={loading}
    />
  );

  const renderedSelectForm = (
    <SelectForm
      onSubmit={onSelectClick}
      onClear={clearSelected}
      onInvert={invertSelected}
      onMerge={onMergeClick}
      term={selectTerm}
      setTerm={setSelectTerm}
    />
  );

  const renderedHeader = (
    <ContentHeader className="find-seq-header" style={{ marginBottom: "24px" }}>
      <Wrapper>
        {renderedQueryForm}
        {renderedSelectForm}
      </Wrapper>
    </ContentHeader>
  );

  return (
    <ContentBody>
      {renderedHeader}
      {renderedBody}
    </ContentBody>
  );
};

const mapStateToProps = (state) => ({
  project: state.project,
});

export default connect(mapStateToProps)(FindSequences);

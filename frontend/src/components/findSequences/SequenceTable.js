// React
import React from "react";

// Components
import { Table, THead, TBody, TR, TH, TD } from "../table";

const SequenceTable = ({
  tableData,
  onRowClick,
  onNameClick,
  onLengthClick,
}) => {
  const renderedRow = (data, index) => {
    const { isSelected } = data;
    const { _id, name, length, frameIn, frameOut, ext } = data.data;

    return (
      <TR key={_id} selected={isSelected} onClick={(e) => onRowClick(e, index)}>
        <TD>{name}</TD>
        <TD>{length}</TD>
        <TD>{ext}</TD>
        <TD>{frameIn}</TD>
        <TD>{frameOut}</TD>
      </TR>
    );
  };

  return (
    <Table>
      <THead>
        <TR>
          <TH onClick={onNameClick}>NAME</TH>
          <TH onClick={onLengthClick}>LENGTH</TH>
          <TH>EXT</TH>
          <TH>FRAME IN</TH>
          <TH>FRAME OUT</TH>
        </TR>
      </THead>
      <TBody>{tableData.map((data, index) => renderedRow(data, index))}</TBody>
    </Table>
  );
};

export default SequenceTable;

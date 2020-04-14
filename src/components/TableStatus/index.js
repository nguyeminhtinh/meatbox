// @flow
import React, { memo } from 'react';
import TableHead from './TableHead';
import TableRow from './TableRow';

type Props = {
  tableHeads: Array<{ id: number, name: string }>,
  tableBody: Array<{ id: number }>
};

const TableStatus = ({ tableHeads, tableBody }: Props) => {
  const renderBodyTable = () => {
    return tableBody.map((item, index) => (
      // eslint-disable-next-line react/no-array-index-key
      <TableRow rowItem={item} key={index} />
    ));
  };

  return (
    <div className="wrapper__status container-fluid">
      <TableHead listItems={tableHeads} />
      <div>{renderBodyTable()}</div>
    </div>
  );
};

export default memo<Props>(TableStatus);

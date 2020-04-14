// @flow
import React, { memo } from 'react';
import { Table } from 'react-bootstrap';
import TableHead from './TableHead';
import TableRowProduct from './TableRowProduct';

type Props = {
  tableHeads: Array<{ id: number, name: string }>,
  tableBody: Array<{ id: number }>,
  isShowImage?: boolean,
  handleCheckBox: Function,
  isShowId?: boolean,
  listId: Array
};

const TableProduct = ({
  tableHeads,
  tableBody,
  isShowImage,
  handleCheckBox,
  isShowId,
  listId
}: Props) => {
  const renderBodyTable = () => {
    return (
      tableBody &&
      tableBody.map(item => (
        <TableRowProduct
          rowItem={item}
          key={item.id}
          handleCheckBox={handleCheckBox}
          isShowImage={isShowImage}
          isShowId={isShowId}
          listId={listId}
        />
      ))
    );
  };
  const renderBody = () => {
    if (renderBodyTable() && renderBodyTable().length > 0) {
      return renderBodyTable();
    }
    return (
      <tr className="p-3 text-center table-no-data w-100">
        <td colSpan={tableHeads && tableHeads.length}>
          <p className="mb-0">데이터가 존재하지 않습니다.</p>
        </td>
      </tr>
    );
  };
  return (
    <Table striped bordered hover responsive>
      <thead>
        <TableHead listItems={tableHeads} />
      </thead>
      <tbody>{renderBody()}</tbody>
    </Table>
  );
};
TableProduct.defaultProps = { isShowImage: false, isShowId: false };
export default memo<Props>(TableProduct);

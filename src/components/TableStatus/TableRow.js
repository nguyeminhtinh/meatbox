// @flow
import React, { memo } from 'react';
import { Row, Col } from 'react-bootstrap';

type Props = {
  rowItem: Object
};

const TableRow = ({ rowItem }: Props) => {
  return (
    <Row>
      {Object.keys(rowItem).map(item => (
        <Col key={item} xs={3} className="boder-item">
          {rowItem[item]}
        </Col>
      ))}
    </Row>
  );
};

export default memo<Props>(TableRow);

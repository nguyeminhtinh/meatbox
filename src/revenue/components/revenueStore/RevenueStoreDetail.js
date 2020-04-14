// @flow
import React, { memo } from 'react';
import { Row, Col } from 'react-bootstrap';
import TableData from 'components/Table';
import Loading from 'components/Loading';
import { headRevenueStorePopup } from 'constants/headerTable';

type Props = {
  listRevenueStoreDetail: Array<{}>,
  isProcessing: boolean
};
const RevenueStoreDetail = ({
  listRevenueStoreDetail,
  isProcessing
}: Props) => {
  return (
    <>
      {isProcessing ? (
        <div className="wrapper-loading">
          <Loading
            animation="grow"
            role="status"
            className=""
            text=""
            variant="dark"
            size="lg"
          />
        </div>
      ) : (
        <Row className="mt-4 table-price table-scroll px-3">
          <Col xs={12} className="px-0">
            <div className="title-detail">기기리스트</div>
            <TableData
              tableHeads={headRevenueStorePopup}
              tableBody={listRevenueStoreDetail}
              isShowId
            />
          </Col>
        </Row>
      )}
    </>
  );
};

export default memo<Props>(RevenueStoreDetail);

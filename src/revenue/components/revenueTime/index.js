// @flow
import React, { memo, useEffect, useState } from 'react';
import Immutable from 'seamless-immutable';
import { Row, Col, Container } from 'react-bootstrap';
import ReactPaginate from 'react-paginate';
import Loading from 'components/Loading';
import SimpleLineChartValue from '../../../components/Charts/chartValue/LineChartValue';
import SecondarySearch from '../../../components/Form/SecondarySearch';
import MainLayout from '../../../layout/MainLayout';
import listStore from '../../../mockData/listStore';
import { listKeyTime } from '../../../constants/listKey';
import TitleHeader from '../../../components/TitleHeader';
import Table from '../../../components/Table/index';
import { headRevenueTime } from '../../../constants/headerTable';

type Props = {
  getListRevenueTime: Function,
  getDeviceCode: Function,
  deviceCodes: Array<{}>,
  listRevenueTime: Array<{}>,
  dataRevenueHistories: Array<{}>,
  totalRows: number,
  isProcessing: boolean,
  isOpenNotify: boolean,
  notifyAccountDenied: Function
};

const RevenueTime = ({
  getDeviceCode,
  deviceCodes,
  getListRevenueTime = () => {},
  dataRevenueHistories,
  listRevenueTime,
  totalRows,
  isProcessing,
  isOpenNotify,
  notifyAccountDenied
}: Props) => {
  const [deviceCodeList, setDeviceCodeList] = useState([]);
  const [params, setParams] = useState({
    deviceId: null,
    storeName: ''
  });

  useEffect(() => {
    getListRevenueTime(params);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    getDeviceCode();
    setDeviceCodeList(deviceCodes);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [deviceCodes.length]);

  useEffect(() => {
    if (isOpenNotify) {
      notifyAccountDenied();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpenNotify]);

  const handleSelectPagination = eventKey => {
    getListRevenueTime({ ...params, pageIndex: eventKey.selected });
  };

  const handleSubmitSearch = value => {
    setParams(value);
    getListRevenueTime(value);
  };

  return (
    <MainLayout>
      <>
        <Container fluid className="form-revenue-time-page home-main">
          <Row>
            <Col xs={12}>
              <div>
                <TitleHeader title="시간별 매출현황" />
                <SecondarySearch
                  listStore={listStore}
                  listDrive={Immutable.asMutable(deviceCodeList)}
                  listKey={listKeyTime}
                  handleSubmitSearch={handleSubmitSearch}
                />
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
                  <>
                    <div className="overflow-x">
                      <SimpleLineChartValue
                        data={listRevenueTime}
                        chartHeight={300}
                        chartMinHeight={300}
                        chartMinWidth={1190}
                        chartColor="#8884d8"
                      />
                    </div>
                    <div className="mt-3">
                      <div className="revenue-time table-price-3-4">
                        <Table
                          tableHeads={headRevenueTime}
                          tableBody={dataRevenueHistories}
                        />
                      </div>
                    </div>
                  </>
                )}
              </div>
            </Col>
          </Row>
        </Container>
        {totalRows > 10 && (
          <Col sm={12} className="wrapper-pagination">
            <ReactPaginate
              previousLabel="←"
              nextLabel="→"
              breakLabel={<span className="gap">...</span>}
              pageCount={Math.ceil(totalRows / 10)}
              onPageChange={eventKey => handleSelectPagination(eventKey)}
              forcePage={0}
              containerClassName="pagination"
              disabledClassName="disabled"
              activeClassName="active"
              breakClassName="page-item"
              breakLinkClassName="page-link"
              pageClassName="page-item"
              pageLinkClassName="page-link"
              previousClassName="page-item"
              previousLinkClassName="page-link"
              nextClassName="page-item"
              nextLinkClassName="page-link"
              marginPagesDisplayed={1}
            />
          </Col>
        )}
      </>
    </MainLayout>
  );
};
export default memo<Props>(RevenueTime);

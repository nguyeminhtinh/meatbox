// @flow

import React, { useState, useEffect } from 'react';
import Immutable from 'seamless-immutable';
import { Row, Col, Container } from 'react-bootstrap';
import ReactPaginate from 'react-paginate';
import Table from 'components/Table';
import Loading from 'components/Loading';
import FourthSearch from '../../../components/Form/FourthSearch';
import { headRevenueProduct } from '../../../constants/headerTable';
import TitleHeader from '../../../components/TitleHeader';
import MainLayout from '../../../layout/MainLayout';
import { listKeySearchFourth } from '../../../constants/listKey';

type Props = {
  getListRevenueProduct: Function,
  listRevenueProduct: Array<{}>,
  dataCount: Object,
  getDeviceCode: Function,
  deviceCodes: Array<{}>,
  totalRows: Number,
  isProcessing: boolean,
  isOpenNotify: boolean,
  notifyAccountDenied: Function
};

const RevenueProduct = ({
  getListRevenueProduct,
  listRevenueProduct,
  dataCount,
  getDeviceCode,
  deviceCodes,
  totalRows,
  isProcessing,
  isOpenNotify,
  notifyAccountDenied
}: Props) => {
  const [deviceCodeList, setDeviceCodeList] = useState([]);
  const [params, setParams] = useState({ page: 0 });
  useEffect(() => {
    getDeviceCode();
    setDeviceCodeList(deviceCodes);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [deviceCodes.length]);

  const handleSubmitSearch = value => {
    setParams(value);
    // getListRevenueProduct(value);
  };
  useEffect(() => {
    getListRevenueProduct(params);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params.codeDevice, params.startDate, params.endDate, params.codeProduct]);

  useEffect(() => {
    if (isOpenNotify) {
      notifyAccountDenied();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpenNotify]);

  const handleSelectPagination = eventKey => {
    setParams({ ...params, page: eventKey.selected });
    getListRevenueProduct({ ...params, page: eventKey.selected });
  };

  return (
    <MainLayout>
      <div className="home-main">
        <Container fluid>
          <TitleHeader title="상품별 매출 · 통계" />
          <Row>
            <Col sm={12}>
              <FourthSearch
                listDrive={Immutable.asMutable(deviceCodeList)}
                listKeySearchFourth={listKeySearchFourth}
                handleSubmitSearch={handleSubmitSearch}
              />
            </Col>
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
                <Col sm={12} className="my-3">
                  <div className="essential">
                    <div className="total-stores">
                      <div className="head-total">총 판매건수</div>
                      <div className="body-total">
                        {dataCount && dataCount.totalAmount === null
                          ? 0
                          : dataCount &&
                            dataCount.totalAmount.toLocaleString('en')}
                        <span>건</span>
                      </div>
                    </div>
                    <div className="total-sales">
                      <div className="head-total">매출 총액</div>
                      <div className="body-total">
                        {dataCount && dataCount.totalProfit === null
                          ? 0
                          : dataCount &&
                            dataCount.totalProfit.toLocaleString('en')}
                        <span>원</span>
                      </div>
                    </div>
                  </div>
                </Col>
                <Col sm={12} className="table-price-4-5">
                  <div className="title-table">상품별 매출통계표</div>
                  <Table
                    tableHeads={headRevenueProduct}
                    tableBody={listRevenueProduct}
                  />
                </Col>
              </>
            )}
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
              forcePage={params.page || 0}
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
      </div>
    </MainLayout>
  );
};

export default RevenueProduct;

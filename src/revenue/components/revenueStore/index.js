// @flow

import React, { memo, useEffect, useState } from 'react';
import { Row, Col, Container } from 'react-bootstrap';
import ReactPaginate from 'react-paginate';
import Loading from 'components/Loading';
import ModalPrimary from 'components/Modal';
import Table from 'components/Table';
import FiveSearch from '../../../components/Form/FiveSearch';
import { headRevenueStore } from '../../../constants/headerTable';
import TitleHeader from '../../../components/TitleHeader';
import MainLayout from '../../../layout/MainLayout';
import listStore from '../../../mockData/listStore';
import { listKeySearchFive } from '../../../constants/listKey';
import RevenueStoreDetail from './RevenueStoreDetail';
import listAddress from '../../../mockData/listAddress';

type Props = {
  getListRevenueStore: Function,
  getListRevenueStoreDetail: Function,
  listRevenueStore: Array<{}>,
  listRevenueStoreDetail: Array<{}>,
  dataRevenue: Object,
  totalRows: number,
  isProcessing: boolean,
  isOpenNotify: boolean,
  notifyAccountDenied: Function
};
const RevenueStores = ({
  getListRevenueStore,
  getListRevenueStoreDetail,
  listRevenueStore,
  listRevenueStoreDetail,
  dataRevenue,
  totalRows,
  isProcessing,
  isOpenNotify,
  notifyAccountDenied
}: Props) => {
  const [params, setParams] = useState({ pageIndex: 0, pageSize: 10 });
  const [popupDetail, setPopupDetail] = useState(false);
  const handleSubmitSearch = value => {
    setParams(value);
    getListRevenueStore(value);
  };
  useEffect(() => {
    getListRevenueStore(params);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params.storeName, params.startDay, params.endDay, params.rank]);

  useEffect(() => {
    if (isOpenNotify) {
      notifyAccountDenied();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpenNotify]);

  const handleSelectPagination = eventKey => {
    setParams({ ...params, pageIndex: eventKey.selected });
    getListRevenueStore({ ...params, pageIndex: eventKey.selected });
  };

  return (
    <MainLayout>
      {!isProcessing && (
        <ModalPrimary
          title="상세보기"
          size="lg"
          content={
            // eslint-disable-next-line react/jsx-wrap-multilines
            <RevenueStoreDetail
              listRevenueStoreDetail={listRevenueStoreDetail}
            />
          }
          animation={false}
          isOpen={popupDetail}
          handleClose={() => {
            setPopupDetail(false);
          }}
          customClass="modal-center popup-revenues-detail"
        />
      )}
      <div className="home-main">
        <Container fluid>
          <TitleHeader title="매장별 매출 · 통계" />
          <Row>
            <Col sm={12}>
              <FiveSearch
                listStore={listStore}
                listKeySearchFive={listKeySearchFive}
                handleSubmitSearch={handleSubmitSearch}
                listAddress={listAddress}
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
                      <div className="head-total">총 매장 수</div>
                      <div className="body-total">
                        {dataRevenue && dataRevenue.totalStore === 0
                          ? 0
                          : dataRevenue &&
                            dataRevenue.totalStore.toLocaleString('en')}
                        <span>호점</span>
                      </div>
                    </div>
                    <div className="total-sales">
                      <div className="head-total">매출 총액</div>
                      <div className="body-total">
                        {dataRevenue && dataRevenue.totalMoney === null
                          ? 0
                          : dataRevenue &&
                            dataRevenue.totalMoney.toLocaleString('en')}
                        <span>원</span>
                      </div>
                    </div>
                  </div>
                </Col>
                <Col sm={12} className="table-price table-revenues-store">
                  <div className="title-table">매장별 매출통계표</div>
                  <Table
                    tableHeads={headRevenueStore}
                    tableBody={listRevenueStore}
                    isShowColumnBtn
                    handleClickBtnDetail={item => {
                      getListRevenueStoreDetail({
                        ...params,
                        storeId: parseInt(item.storeId, 10)
                      });
                      setPopupDetail(true);
                    }}
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
              forcePage={params.pageIndex || 0}
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

export default memo<Props>(RevenueStores);

// @flow

import React, { memo, useState, useEffect } from 'react';
import ReactPaginate from 'react-paginate';
import { Row, Col, Container } from 'react-bootstrap';
import ReserveSearch from 'components/Form/ReserveSearch';
import ModalPrimary from 'components/Modal';
import Table from 'components/Table';
import Loading from 'components/Loading';
import { headReserve } from '../../constants/headerTable';
import TitleHeader from '../../components/TitleHeader';
import MainLayout from '../../layout/MainLayout';
import ModalSetting from './settingReserve';
import ModalAccumulation from './accumulationReserve';

type Props = {
  isProcessing: boolean,
  listReserve: Function,
  getListReserve: Function,
  registerEventDay: Function,
  getListReserveUse: Function,
  totalRows: Number,
  type: string,
  reserveUse: Object,
  isOpenNotify: boolean,
  notifyAccountDenied: Function
};

const ReserveManagement = ({
  isProcessing,
  listReserve,
  getListReserve,
  totalRows,
  registerEventDay,
  type,
  getListReserveUse,
  reserveUse,
  isOpenNotify,
  notifyAccountDenied
}: Props) => {
  const [popupConfirm, setPopupConfirm] = useState({
    isShow: false
  });
  const [params, setParams] = useState({
    currentPage: 0,
    validFrom: null,
    validTill: null
  });

  const [isOpenModalSetting, setIsOpenModalSetting] = useState(false);
  const [isOpenModalAccumulation, setIsOpenModalAccumulation] = useState(false);
  useEffect(() => {
    getListReserve(params);
    getListReserveUse();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    switch (type) {
      case 'REGISTER_EVENT_DAY_SUCCESS':
        setIsOpenModalSetting(false);
        setIsOpenModalAccumulation(false);
        setParams({ currentPage: 0, validFrom: null, validTill: null });
        getListReserve({ currentPage: 0, validFrom: null, validTill: null });
        getListReserveUse();
        break;
      case 'REGISTER_EVENT_DAY_FAILED':
        setIsOpenModalSetting(false);
        setIsOpenModalAccumulation(false);
        setPopupConfirm({
          ...popupConfirm,
          isShow: true,
          content: '업데이트 실패'
        });
        break;
      default:
        break;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [type]);

  useEffect(() => {
    if (isOpenNotify) {
      notifyAccountDenied();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpenNotify]);

  const handleSubmitSearch = value => {
    setParams(value);
    getListReserve(value);
  };
  const handleSetting = () => {
    setIsOpenModalSetting(true);
  };
  const handleAccumulation = () => {
    setIsOpenModalAccumulation(true);
  };

  const handleModalSetting = data => {
    setIsOpenModalSetting(false);
    registerEventDay(data);
  };

  const handleModalAccumulation = data => {
    setIsOpenModalAccumulation(false);
    registerEventDay(data);
  };
  const handleSelectPagination = eventKey => {
    setParams({ ...params, currentPage: eventKey.selected });
    getListReserve({ ...params, currentPage: eventKey.selected });
  };
  return (
    <>
      <MainLayout>
        <div className="store-management">
          <Container fluid>
            <TitleHeader title="적립금관리" />
            <Row>
              <Col sm={12}>
                <ReserveSearch
                  handleSubmitSearch={handleSubmitSearch}
                  handleSetting={handleSetting}
                  handleAccumulation={handleAccumulation}
                  reserveUse={reserveUse}
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
                <Col sm={12} className="text-pre-line">
                  <Table tableHeads={headReserve} tableBody={listReserve} />
                </Col>
              )}
            </Row>
          </Container>
        </div>
        {totalRows > 10 && (
          <Col sm={12} className="wrapper-pagination">
            <ReactPaginate
              previousLabel="←"
              nextLabel="→"
              breakLabel={<span className="gap">...</span>}
              pageCount={Math.ceil(totalRows / 10)}
              onPageChange={eventKey => handleSelectPagination(eventKey)}
              forcePage={params.currentPage}
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
      </MainLayout>
      <ModalPrimary
        title="이벤트 적립율 이벤트 설정"
        size="md"
        content={<ModalSetting handleModalSetting={handleModalSetting} />}
        animation={false}
        isOpen={isOpenModalSetting}
        handleClose={() => {
          setIsOpenModalSetting(false);
        }}
        customClass="modalSetting d-none-btn"
      />
      <ModalPrimary
        title="고정 적립율  설정"
        size="md"
        content={
          // eslint-disable-next-line react/jsx-wrap-multilines
          <ModalAccumulation
            handleModalAccumulation={handleModalAccumulation}
          />
        }
        animation={false}
        isOpen={isOpenModalAccumulation}
        handleClose={() => {
          setIsOpenModalAccumulation(false);
        }}
        customClass="modalSetting d-none-btn"
      />
      <ModalPrimary
        title="알림"
        content={popupConfirm.content}
        isOpen={popupConfirm.isShow}
        handleClose={() => {
          setPopupConfirm({
            isShow: false
          });
        }}
      />
    </>
  );
};

export default memo<Props>(ReserveManagement);

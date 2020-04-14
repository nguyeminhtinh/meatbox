// @flow

import React, { memo, useState, useEffect } from 'react';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';
import ReactPaginate from 'react-paginate';
import Immutable from 'seamless-immutable';
import { Row, Col, Container } from 'react-bootstrap';
import ModalPrimary from 'components/Modal';
import Button from 'components/Button';
import Loading from 'components/Loading';
import PaymentSearch from 'components/Form/PaymentSearch';
import Table from 'components/Table';
import {
  listStatusPaymentType,
  listStatusPayment
} from '../../../constants/listKey';
import { headerPayment } from '../../../constants/headerTable';
import TitleHeader from '../../../components/TitleHeader';
import MainLayout from '../../../layout/MainLayout';
import { listValueStatusPayment } from '../../../constants/listStatusTable';
import PaymentHistory from '../../containers/paymentDetailContainer';
import ERROR_MESSAGE from '../../../constants/errorMsg';

type Props = {
  isProcessing: boolean,
  listPayment: Array<{}>,
  getListPaymentHistory: Function,
  getDeviceCode: Function,
  deviceCodes: Array<{}>,
  getListStoreByName: Function,
  storeName: Array<{}>,
  totalRows: Number,
  getPaymentHistoryDetail: Function,
  paymentDetail: Object,
  getPaymentHistoryCancel: Function,
  isOpenNotify: boolean,
  notifyAccountDenied: Function,
  getAllListPaymentHistory: Function,
  listAllPayment: Array<{}>
};

const HistoryPayment = ({
  isProcessing,
  listPayment,
  getListPaymentHistory,
  getDeviceCode,
  deviceCodes,
  getListStoreByName,
  storeName,
  totalRows,
  getPaymentHistoryDetail,
  paymentDetail,
  getPaymentHistoryCancel,
  isOpenNotify,
  notifyAccountDenied,
  getAllListPaymentHistory,
  listAllPayment
}: Props) => {
  const [deviceCodeList, setDeviceCodeList] = useState([]);
  const [params, setParams] = useState({
    pageIndex: 0,
    pageSize: 10,
    period: 0
  });
  const [popupHistory, setPopupHistory] = useState(false);
  const [orderId, setOrderId] = useState('');
  const [isStatus, setIsStatus] = useState('');
  const [popupConfirm, setPopupConfirm] = useState({
    isShow: false,
    content: ''
  });
  const [isReload, setIsReload] = useState(false);
  const handleSelectPagination = eventKey => {
    setParams({ ...params, pageIndex: eventKey.selected });
    getListPaymentHistory({ ...params, pageIndex: eventKey.selected });
  };
  useEffect(() => {
    getDeviceCode();
    setDeviceCodeList(deviceCodes);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [deviceCodes.length]);

  useEffect(() => {
    getListStoreByName({});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    getListPaymentHistory(params);

    /**
     * TODO: just assume maximum page size, will update this
     */
    getAllListPaymentHistory({
      ...params,
      pageSize: 9999999
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    params.deviceId,
    params.storeId,
    params.startDay,
    params.endDay,
    params.payType,
    params.period,
    params.status,
    isReload
  ]);

  useEffect(() => {
    if (isOpenNotify) {
      notifyAccountDenied();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpenNotify]);

  const handleShowPopupClosePayment = () => {
    setPopupHistory(true);
    setPopupConfirm({
      isShow: true,
      content: ERROR_MESSAGE.CONFIRM_CLOSE_PAYMENT
    });
  };
  const handleClosePayment = () => {
    setPopupHistory(false);
    setPopupConfirm({
      ...popupConfirm,
      isShow: false
    });
    getPaymentHistoryCancel(orderId);
    setIsReload(true);
    setParams({
      ...params,
      pageIndex: 0
    });
  };
  const handleSubmitClosePayment = () => {
    setPopupConfirm({
      ...popupConfirm,
      isShow: false
    });
  };
  const handleSubmitSearch = value => {
    setParams(value);
  };

  const handleHistoryPayment = item => {
    setPopupHistory(true);
    getPaymentHistoryDetail(item.orderId);
    setOrderId(item.orderId);
    setIsStatus(item.status);
  };

  const fileType = `application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8`;
  const fileExtension = '.xlsx';

  const exportToExcel = (csvData, fileName) => {
    const ws = XLSX.utils.json_to_sheet(csvData);
    const wb = { Sheets: { data: ws }, SheetNames: ['data'] };
    const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    const data = new Blob([excelBuffer], { type: fileType });
    FileSaver.saveAs(data, fileName + fileExtension);
  };

  return (
    <>
      {!isProcessing && (
        <ModalPrimary
          title="결제내역 상세"
          size="md"
          content={<PaymentHistory paymentDetail={paymentDetail} />}
          animation={false}
          isOpen={popupHistory}
          isShowCloseIco
          handleCloseIco={() => {
            setPopupHistory(false);
          }}
          handleCancel={() => handleShowPopupClosePayment()}
          customClass="custom-popup-detail detail-payment"
          status={isStatus !== 2}
          handleClose={() => {
            setPopupHistory(false);
          }}
          textLeft="매출취소"
          textRight="닫기"
          submitForm
          handleSubmit={() => {
            setPopupHistory(false);
          }}
        />
      )}
      <ModalPrimary
        title="알림"
        content={popupConfirm.content}
        isOpen={popupConfirm.isShow}
        status
        classNameBtnRight="blue"
        textLeft="확인"
        textRight="취소"
        handleSubmit={() => {
          handleSubmitClosePayment();
        }}
        handleClose={() => handleClosePayment()}
        isShowCloseIco
        handleCloseIco={() => {
          handleSubmitClosePayment();
        }}
      />
      <MainLayout>
        <div className="member-page border">
          <Container fluid>
            <TitleHeader title="결제내역" />
            <Row>
              <Col sm={12}>
                <PaymentSearch
                  listDrive={Immutable.asMutable(deviceCodeList)}
                  listStore={storeName && Immutable.asMutable(storeName)}
                  listStatusPaymentType={listStatusPaymentType}
                  listStatusPayment={listStatusPayment}
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
                  <Col sm={12} className="download-excel">
                    <Button
                      type="submit"
                      variant="secondary"
                      onClick={() => {
                        exportToExcel(listAllPayment, 'payment-history');
                      }}
                      disabled={listAllPayment && listAllPayment.length <= 0}
                    >
                      엑셀 다운로드
                    </Button>
                  </Col>
                  <Col sm={12} className="table-price-5 table-payment mt-3">
                    <Table
                      tableHeads={headerPayment}
                      tableBody={listPayment}
                      statusField="status"
                      valueStatusField={listValueStatusPayment}
                      isShowColumnBtnStatus
                      showLabel
                      isShowColumnBtn
                      handleClickBtnDetail={handleHistoryPayment}
                      isShowId
                    />
                  </Col>
                </>
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
      </MainLayout>
    </>
  );
};

export default memo<Props>(HistoryPayment);

// @flow
import React from 'react';
import { Row, Col } from 'react-bootstrap';

type Props = {
  paymentDetail: Object
};
const PaymentHistory = ({ paymentDetail }: Props) => {
  const phone =
    paymentDetail && paymentDetail.phoneNumber
      ? paymentDetail.phoneNumber.replace(/-/g, '')
      : '';

  let phoneNumber = '';
  if (phone === '') {
    phoneNumber = '';
  } else {
    phoneNumber = `${phone.slice(0, 3)}-${phone.slice(3, 7)}-${phone.slice(
      7,
      11
    )}`;
  }
  const tel =
    paymentDetail && paymentDetail.storePhoneNumber
      ? paymentDetail.storePhoneNumber
      : '';

  let phoneStore = '';
  if (tel === '') {
    phoneStore = '';
  } else {
    phoneStore = `${tel.slice(0, 3)}-${tel.slice(3, 7)}-${tel.slice(7, 11)}`;
  }

  return (
    <Row className="payment-history w-100">
      <Col xs={12}>
        <div className="table-history">
          <h3>결제정보</h3>
          <div className="d-flex">
            <Col xs={4}>결제시간</Col>
            <Col xs={8}>{paymentDetail && paymentDetail.payTime}</Col>
          </div>
          <div className="d-flex">
            <Col xs={4}>구분</Col>
            <Col xs={8}>{paymentDetail && paymentDetail.payType}</Col>
          </div>
          <div className="d-flex">
            <Col xs={4}>결제상태</Col>
            <Col xs={8}>{paymentDetail && paymentDetail.orderStatus}</Col>
          </div>
          <div className="d-flex">
            <Col xs={4}>결제금액</Col>
            <Col xs={8} className="money">
              {`${paymentDetail && paymentDetail.totalMoney}원`}
            </Col>
          </div>
        </div>
      </Col>
      <Col xs={12}>
        <div className="table-history">
          <h3>주문정보</h3>
          <div className="d-flex">
            <Col xs={4}>상품명</Col>
            <Col xs={8}>{paymentDetail && paymentDetail.productName}</Col>
          </div>
          {paymentDetail && paymentDetail.point !== '' && (
            <>
              <div className="d-flex">
                <Col xs={4}>적립금</Col>
                <Col xs={8}>{`${paymentDetail && paymentDetail.point}원`}</Col>
              </div>
              <div className="d-flex">
                <Col xs={4}>핸드폰번호</Col>
                <Col xs={8}>{phoneNumber}</Col>
              </div>
            </>
          )}
        </div>
      </Col>
      <Col xs={12}>
        <div className="table-history">
          <h3>매장정보</h3>
          <div className="d-flex">
            <Col xs={4}>매장명</Col>
            <Col xs={8}>{paymentDetail && paymentDetail.storeName}</Col>
          </div>
          <div className="d-flex">
            <Col xs={4}>매장주소</Col>
            <Col xs={8}>{paymentDetail && paymentDetail.address}</Col>
          </div>
          <div className="d-flex">
            <Col xs={4}>매장전화번호</Col>
            <Col xs={8}>{phoneStore}</Col>
          </div>
          <div className="d-flex">
            <Col xs={4}>기기식별코드</Col>
            <Col xs={8}>{paymentDetail && paymentDetail.deviceCode}</Col>
          </div>
        </div>
      </Col>
    </Row>
  );
};

export default PaymentHistory;

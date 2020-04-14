// @flow
import React, { memo, useState } from 'react';
import Input from 'components/Input';
import PrimaryButton from 'components/Button';
import { Row, Col, Container } from 'react-bootstrap';
import TitleHeader from '../../../../components/TitleHeader';
import MainLayout from '../../../../layout/MainLayout';
import ModalPrimary from '../../../../components/Modal';
import ERROR_MESSAGE from '../../../../constants/errorMsg';

type Props = {
  history: {
    push: Function
  }
};
const ApprovalAdInfo = ({ history }: Props) => {
  const status = 1;
  const handleViewDetail = () => {
    history.push(`/adverting`);
  };

  const [popupConfirmApproval, setPopupConfirmApproval] = useState({
    isShow: false,
    content: ''
  });

  const [popupConfirmReturn, setPopupConfirmReturn] = useState({
    isShow: false,
    content: ''
  });

  const clickApproval = () => {
    setPopupConfirmApproval({
      isShow: true,
      content: ERROR_MESSAGE.CONFIRM_APPROVAL
    });
  };
  const clickReturn = () => {
    setPopupConfirmReturn({
      isShow: true,
      content: ERROR_MESSAGE.CONFIRM_APPROVAL
    });
  };

  const handleSubmitForm = () => {
    setPopupConfirmApproval({
      ...popupConfirmApproval,
      isShow: false
    });
    setPopupConfirmReturn({
      ...popupConfirmReturn,
      isShow: false
    });
  };

  return (
    <MainLayout>
      <div className="home-main">
        <Container fluid>
          <TitleHeader title="광고승인정보" />
          <Row>
            <Col sm={12}>
              <div className="wrapper-approvalInfo mb-3">
                <div className="btn-action text-right mb-2">
                  {status === 1 && (
                    <PrimaryButton
                      className="mb-1"
                      type="button"
                      variant="secondary"
                      onClick={() => {}}
                    >
                      승인
                    </PrimaryButton>
                  )}
                  {status === 2 && (
                    <PrimaryButton
                      className="mb-1"
                      type="button"
                      variant="success"
                      onClick={() => {}}
                    >
                      대기
                    </PrimaryButton>
                  )}
                  {status === 3 && (
                    <PrimaryButton
                      className="mb-1"
                      type="button"
                      variant="danger"
                      onClick={() => {}}
                    >
                      반려
                    </PrimaryButton>
                  )}
                </div>
                <div className="row-item d-flex align-items-center">
                  <div className="row-item__label">제목</div>
                  <div className="row-item__content">
                    <Input
                      type="text"
                      value="승인 부탁드립니다.
                  "
                      disabled
                    />
                  </div>
                </div>
                <div className="row-item d-flex align-items-center">
                  <div className="row-item__label">매장명</div>
                  <div className="row-item__content">
                    <Input
                      type="text"
                      value="00편의점
                  "
                      disabled
                    />
                  </div>
                </div>
                <div className="row-item d-flex align-items-center">
                  <div className="row-item__label">파일업로드</div>
                  <div className="row-item__content content-file d-flex align-items-center">
                    <Input
                      type="text"
                      value="삼겹살 요리방법 avi
                  "
                      disabled
                    />
                    <PrimaryButton
                      className="mb-1"
                      size="sm"
                      type="button"
                      variant="secondary"
                      onClick={() => {}}
                    >
                      다운로드
                    </PrimaryButton>
                  </div>
                </div>

                {status === 3 && (
                  <div className="row-item d-flex align-items-center">
                    <div className="row-item__label">파일업로드</div>
                    <div className="row-item__content content-file d-flex align-items-center">
                      <textarea
                        className="form-control"
                        rows="5"
                        disabled
                        value="광고에 적합하지 않은 광고입니다"
                      />
                    </div>
                  </div>
                )}
              </div>
              {status === 2 && (
                <div className="wrapper-btn my-3 d-flex justify-content-center">
                  <PrimaryButton
                    className="mb-1 mr-3"
                    type="button"
                    variant="secondary"
                    onClick={() => {
                      clickApproval();
                    }}
                  >
                    승인
                  </PrimaryButton>
                  <PrimaryButton
                    className="mb-1"
                    type="button"
                    variant="secondary"
                    onClick={() => {
                      clickReturn();
                    }}
                  >
                    반려
                  </PrimaryButton>
                </div>
              )}
              <div className="btn-list text-right mb-5">
                <PrimaryButton
                  className="mb-1"
                  type="button"
                  variant="secondary"
                  onClick={() => {
                    handleViewDetail();
                  }}
                >
                  목록
                </PrimaryButton>
              </div>

              <ModalPrimary
                title="알림"
                content={popupConfirmApproval.content}
                isOpen={popupConfirmApproval.isShow}
                handleClose={() => {
                  handleSubmitForm();
                }}
                status
                textLeft="확인"
                textRight="취소"
              />
              <ModalPrimary
                title="반려 사유"
                content={
                  // eslint-disable-next-line react/jsx-wrap-multilines
                  <textarea
                    className="form-control"
                    rows="5"
                    placeholder="반려사유를 적어주세요."
                  />
                }
                textLeft="확인"
                textRight="취소"
                status
                isOpen={popupConfirmReturn.isShow}
                handleClose={() => {
                  handleSubmitForm();
                }}
              />
            </Col>
          </Row>
        </Container>
      </div>
    </MainLayout>
  );
};

export default memo<Props>(ApprovalAdInfo);

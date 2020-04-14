// @flow
// libs
import React, { memo, useEffect, useState } from 'react';
import { Row, Button, FormControl, Container } from 'react-bootstrap';
import Table from 'components/Table';
import Input from 'components/Input';
import { headItemsStoreDetail } from '../../../constants/headerTable';
import MainLayout from '../../../layout/MainLayout';

type Props = {
  history: {
    push: Function
  },
  getStoreDetail: Function,
  listDevice: Array<{
    id: number,
    nameDevice: string,
    deviceCode: string,
    frozen: string
  }>,
  match: {
    params: {
      id: string
    }
  },
  dataStoreDetail: Object,
  isOpenNotify: boolean,
  notifyAccountDenied: Function
};
export const MerchantInfo = ({
  history,
  getStoreDetail,
  match,
  dataStoreDetail,
  listDevice,
  isOpenNotify,
  notifyAccountDenied
}: Props) => {
  const dataDetail = {
    password: '',
    businessReg: '',
    userId: '',
    erpTraderCode: '',
    companyName: '',
    address: '',
    addressDetail: '',
    phoneFirst: '',
    phoneSecond: '',
    phoneEnd: '',
    ceoName: '',
    taxBusinessType: '',
    taxEmail: '',
    taxBusinessCategory: '',
    traderMemo: '',
    niceYN: ''
  };
  const [storeDetail, setStoreDetail] = useState(dataDetail);
  const handleBack = () => {
    history.push(`/stores`);
  };
  const handleDeviceDetail = item => {
    history.push(`/device/${item.id}`);
  };
  const { id } = match.params;
  useEffect(() => {
    getStoreDetail(parseInt(id, 10));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setStoreDetail(dataStoreDetail);
  }, [dataStoreDetail, id]);

  useEffect(() => {
    if (isOpenNotify) {
      notifyAccountDenied();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpenNotify]);

  return (
    <MainLayout>
      <Container fluid className="py-3 home-main">
        <div className="title__header">
          <h1>매장정보</h1>
        </div>
        {storeDetail ? (
          <>
            <div className="wrapper__info mb-5">
              <div className="card-header edit-store">기본정보</div>
              <Row className="row__custom">
                <div className="col-md-3 d-flex align-items-center py-2">
                  <div className="title">사업자 등록번호</div>
                </div>
                <div className="col-md-9 py-2 input-50">
                  <Input
                    type="text"
                    value={storeDetail && storeDetail.businessReg}
                    disabled
                  />
                </div>
              </Row>
              <Row className="row__custom">
                <div className="col-md-3 d-flex align-items-center py-2">
                  <div className="title">매장코드</div>
                </div>
                <div className="col-md-9 py-2 input-50">
                  <Input
                    type="text"
                    value={storeDetail && storeDetail.erpTraderCode}
                    disabled
                  />
                </div>
              </Row>
              <Row className="row__custom">
                <div className="col-md-3 d-flex align-items-center py-2">
                  <div className="title">매장명</div>
                </div>
                <div className="col-md-9 py-2 input-50">
                  <Input
                    type="text"
                    value={storeDetail && storeDetail.companyName}
                    disabled
                  />
                </div>
              </Row>
              <Row className="row__custom">
                <div className="col-md-3 d-flex align-items-center py-2">
                  <div className="title">매장주소</div>
                </div>
                <div className="col-md-9 py-2">
                  <Row>
                    <div className="col-12 col-md-9 pr-md-0">
                      <Input
                        type="text"
                        value={storeDetail && storeDetail.address}
                        disabled
                      />
                    </div>
                    <div className="col-12 col-md-3 mt-2 mt-md-0 ">
                      <Input
                        type="text"
                        value={storeDetail && storeDetail.addressDetail}
                        disabled
                      />
                    </div>
                  </Row>
                </div>
              </Row>
              <Row className="row__custom">
                <div className="col-md-3 d-flex align-items-center py-2">
                  <div className="title">매장 전화번호</div>
                </div>
                <div className="col-md-9 py-2">
                  <Row className="row-50 mr-0">
                    <div className="col-4 pr-0">
                      <Input
                        type="text"
                        value={storeDetail && storeDetail.phoneFirst}
                        disabled
                      />
                    </div>
                    <div className="col-4 pr-0">
                      <Input
                        type="text"
                        value={storeDetail && storeDetail.phoneSecond}
                        disabled
                      />
                    </div>
                    <div className="col-4 pr-0">
                      <Input
                        type="text"
                        value={storeDetail && storeDetail.phoneEnd}
                        disabled
                      />
                    </div>
                  </Row>
                </div>
              </Row>
              <Row className="row__custom">
                <div className="col-md-3 d-flex align-items-center py-2">
                  <div className="title">대표자명</div>
                </div>
                <div className="col-md-9 py-2 input-50">
                  <Input
                    type="text"
                    value={storeDetail && storeDetail.ceoName}
                    disabled
                  />
                </div>
              </Row>
              <Row className="row__custom">
                <div className="col-md-3 d-flex align-items-center py-2">
                  <div className="title">계산서 발행 방법</div>
                </div>
                <div className="col-md-9 py-2 input-50">
                  <Input
                    type="text"
                    value={storeDetail && storeDetail.niceYN}
                    disabled
                  />
                </div>
              </Row>
              <Row className="row__custom">
                <div className="col-md-3 d-flex align-items-center py-2">
                  <div className="title">이메일 주소</div>
                </div>
                <div className="col-md-9 py-2 input-50">
                  <Input
                    type="text"
                    value={storeDetail && storeDetail.taxEmail}
                    disabled
                  />
                </div>
              </Row>
              <Row className="row__custom">
                <div className="col-md-3 d-flex align-items-center py-2">
                  <div className="title">사업의 종류</div>
                </div>
                <div className="col-md-9 py-2">
                  <Row>
                    <div className="col-12 col-md-6 pr-md-0">
                      <Input
                        type="text"
                        value={storeDetail && storeDetail.taxBusinessType}
                        disabled
                      />
                    </div>
                    <div className="col-12 col-md-6 mt-2 mt-md-0">
                      <Input
                        type="text"
                        value={storeDetail && storeDetail.taxBusinessCategory}
                        disabled
                      />
                    </div>
                  </Row>
                </div>
              </Row>
              <Row className="row__custom">
                <div className="col-md-3 d-flex align-items-center py-2">
                  <div className="title">기타 특이사항</div>
                </div>
                <div className="col-md-9 py-2">
                  <FormControl
                    as="textarea"
                    aria-label="With textarea"
                    value={storeDetail && storeDetail.traderMemo}
                    disabled
                  />
                </div>
              </Row>
            </div>
            <div className="wrapper__info mb-5">
              <div className="card-header edit-store">계정정보</div>
              <Row className="row__custom">
                <div className="col-md-3 d-flex align-items-center py-2">
                  <div className="title">아이디</div>
                </div>
                <div className="col-md-9 py-2 input-50">
                  <Input
                    type="text"
                    value={storeDetail && storeDetail.userId}
                    disabled
                  />
                </div>
              </Row>
              <Row className="row__custom">
                <div className="col-md-3 d-flex align-items-center py-2">
                  <div className="title">비밀번호</div>
                </div>
                <div className="col-md-9 py-2 input-50">
                  <Input
                    type="password"
                    value={storeDetail && storeDetail.password}
                    disabled
                  />
                </div>
              </Row>
            </div>
          </>
        ) : (
          <div className="not-data text-center p-5">
            데이터가 존재하지 않습니다.
          </div>
        )}
        <div className="wrapper__info">
          <div className="card">
            <div className="card-header">
              {`기기정보 (현재 보유 기기 수: ${listDevice.length || 0}대)`}
            </div>
            <div className="card-body">
              <Table
                tableHeads={headItemsStoreDetail}
                tableBody={listDevice}
                onClickRow={handleDeviceDetail}
                isShowId
              />
              <div className="d-block text-right mt-3 mt-lg-0">
                <Button variant="secondary" size="md" onClick={handleBack}>
                  확인
                </Button>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </MainLayout>
  );
};

export default memo<Props>(MerchantInfo);

// @flow
import React, { memo, useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';
import Immutable from 'seamless-immutable';
import { Row, Col, Container } from 'react-bootstrap';
import Loading from 'components/Loading';
import { listKeyDeviceSearch, listStatus } from 'constants/listKey';
import PrimarySearch from 'components/Form/PrimarySearch';
import Button from 'components/Button';
import MainLayout from '../../../layout/MainLayout';
import TitleHeader from '../../../components/TitleHeader';
import { headDevice } from '../../../constants/headerTable';
import Table from '../../../components/Table/index';
import listPage from '../../../constants/listPageSize';
import { listValueStatusDevice } from '../../../constants/listStatusTable';

type Props = {
  getAddressOptions: Function,
  addressOptions: Array<{}>,
  getCityOptions: Function,
  cityOptions: Array<{}>,
  getListDevices: Function,
  listDevices: Array<{}>,
  isProcessing: boolean,
  history: {
    push: Function
  },
  totalRows: number,
  devicesInfo: Object,
  handleResetType: Function,
  isOpenNotify: boolean,
  notifyAccountDenied: Function
};

const Device = ({
  getAddressOptions,
  addressOptions,
  getCityOptions,
  cityOptions,
  getListDevices,
  listDevices,
  isProcessing,
  history,
  totalRows,
  devicesInfo,
  handleResetType,
  isOpenNotify,
  notifyAccountDenied
}: Props) => {
  const [params, setParams] = useState({
    pageSize: 10,
    typeDevice: '',
    city: '',
    provinces: '',
    productStorage: '',
    deviceStatus: '',
    pageIndex: '',
    address: '',
    storeName: '',
    deviceCode: ''
  });
  useEffect(() => {
    getAddressOptions();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // get label from Search
  const getListCityOption = label => {
    const addressName = {
      level1: label || ''
    };
    getCityOptions(addressName);
  };

  const listAddress =
    addressOptions === undefined || addressOptions === null
      ? []
      : Immutable.asMutable(addressOptions);

  const listCityOptions =
    cityOptions === undefined || cityOptions === null
      ? []
      : Immutable.asMutable(cityOptions);

  const handleSubmitSearch = value => {
    setParams(value);
    getListDevices(value);
  };

  const handleSelectPagination = eventKey => {
    setParams({ ...params, pageIndex: eventKey.selected });
    const paramsRequest = { ...params, pageIndex: eventKey.selected };
    getListDevices(paramsRequest);
  };
  useEffect(() => {
    getListDevices(params);
    handleResetType();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    getListDevices(params);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [totalRows]);

  useEffect(() => {
    if (isOpenNotify) {
      notifyAccountDenied();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpenNotify]);

  const handleViewDetail = item => {
    // getDeviceDetail(item.id);
    history.push(`/device/${item.id}`);
  };

  const handleAddDevice = () => {
    history.push(`/device/add`);
  };
  return (
    <>
      <MainLayout>
        <Container fluid className="form-device-page device-page border">
          <Row>
            <Col xs={12}>
              <TitleHeader title="기기관리" />
              <PrimarySearch
                listAddress={listAddress}
                listKey={listKeyDeviceSearch}
                listPage={listPage}
                cityOptions={listCityOptions}
                getCityOptions={getListCityOption}
                handleSubmitSearch={handleSubmitSearch}
                listDriveModelStatus={listStatus}
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
                  <div sm={12} className="device-status">
                    <div className="table-status pl-0 table-responsive table-right-md pl-0 w-md-75">
                      <table className="table table-striped table-responsive col-sm-6 col-md-6 table-bordered text-center mb-0 px-0">
                        <thead>
                          <tr>
                            <th scope="col">전체</th>
                            <th scope="col">사용중</th>
                            <th scope="col">사용해지</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>
                              {(devicesInfo && devicesInfo.countAll) || 0}
                            </td>
                            <td>
                              {(devicesInfo && devicesInfo.countInUse) || 0}
                            </td>
                            <td>
                              {(devicesInfo && devicesInfo.countUsed) || 0}
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                    <div className="btn-register">
                      <Button
                        type="button"
                        className="btn btn-primary"
                        onClick={handleAddDevice}
                      >
                        기기 등록
                      </Button>
                    </div>
                  </div>
                  <Table
                    tableHeads={headDevice}
                    tableBody={listDevices}
                    onClickRow={handleViewDetail}
                    valueStatusField={listValueStatusDevice}
                    showLabel
                    statusField="status"
                    isShowColumnBtnStatus
                    isShowId
                  />
                </>
              )}
            </Col>
          </Row>
        </Container>
        {totalRows > params.pageSize && (
          <Col sm={12} className="wrapper-pagination">
            <ReactPaginate
              previousLabel="←"
              nextLabel="→"
              breakLabel={<span className="gap">...</span>}
              pageCount={Math.ceil(totalRows / params.pageSize)}
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
              marginPagesDisplayed={1}
              nextLinkClassName="page-link"
            />
          </Col>
        )}
      </MainLayout>
    </>
  );
};

export default memo<Props>(Device);

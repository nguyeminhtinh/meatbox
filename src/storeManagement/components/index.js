// @flow

import React, { useEffect, memo, useState } from 'react';
import Immutable from 'seamless-immutable';

import ReactPaginate from 'react-paginate';
import { Row, Col, Container } from 'react-bootstrap';
import StoreSearch from 'components/Form/StoreSearch';
import Table from 'components/Table';
import Loading from 'components/Loading';
import { headStore } from '../../constants/headerTable';
import TitleHeader from '../../components/TitleHeader';
import MainLayout from '../../layout/MainLayout';
import { listKeyRevenue } from '../../constants/listKey';
import listPage from '../../constants/listPageSize';

type Props = {
  getAddressOptions: Function,
  addressOptions: Array<{}>,
  getCityOptions: Function,
  cityOptions: Array<{}>,
  listStores: Array<{}>,
  getListStores: Function,
  isProcessing: boolean,
  history: {
    push: Function
  },
  totalRows: number,
  isOpenNotify: boolean,
  notifyAccountDenied: Function
};

const StoreManagement = ({
  getAddressOptions,
  addressOptions,
  history,
  getListStores,
  listStores,
  isProcessing,
  totalRows,
  getCityOptions,
  cityOptions,
  isOpenNotify,
  notifyAccountDenied
}: Props) => {
  const [dataFilter, setDataFilter] = useState({
    pageRecord: 10,
    pageIndex: 1,
    province: '',
    city: '',
    ceoName: '',
    phone: '',
    companyName: ''
  });

  const [paginationIndex, setPaginationIndex] = useState(0);
  const handleSubmitSearch = value => {
    setDataFilter(value);
    getListStores(value);
    setPaginationIndex(0);
  };
  const handleSelectPagination = eventKey => {
    setDataFilter({ ...dataFilter, pageIndex: eventKey.selected });
    setPaginationIndex(eventKey.selected);
    const paramsRequest = { ...dataFilter, pageIndex: eventKey.selected + 1 };
    getListStores(paramsRequest);
  };
  useEffect(() => {
    getAddressOptions();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    getListStores(dataFilter);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (isOpenNotify) {
      notifyAccountDenied();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpenNotify]);

  // get label from Search
  const getListCityOption = label => {
    const addressName = {
      level1: label || ''
    };
    getCityOptions(addressName);
  };

  const handleViewDetail = item => {
    history.push(`/stores/${item.id}`);
  };

  const listAddress =
    addressOptions === undefined || addressOptions === null
      ? []
      : Immutable.asMutable(addressOptions);

  const listCityOptions =
    cityOptions === undefined || cityOptions === null
      ? []
      : Immutable.asMutable(cityOptions);
  return (
    <>
      <MainLayout>
        <div className="store-management">
          <Container fluid>
            <TitleHeader title="매장관리" />
            <Row>
              <Col sm={12}>
                <StoreSearch
                  listAddress={listAddress}
                  listKey={listKeyRevenue}
                  listPage={listPage}
                  cityOptions={listCityOptions}
                  getCityOptions={getListCityOption}
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
                <Col sm={12}>
                  <Table
                    tableHeads={headStore}
                    tableBody={listStores}
                    onClickRow={handleViewDetail}
                    isShowId
                  />
                </Col>
              )}
            </Row>
          </Container>
        </div>
        {totalRows > dataFilter.pageRecord && (
          <Col sm={12} className="wrapper-pagination">
            <ReactPaginate
              previousLabel="←"
              nextLabel="→"
              breakLabel={<span className="gap">...</span>}
              pageCount={Math.ceil(totalRows / dataFilter.pageRecord)}
              onPageChange={eventKey => handleSelectPagination(eventKey)}
              forcePage={paginationIndex}
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

export default memo<Props>(StoreManagement);

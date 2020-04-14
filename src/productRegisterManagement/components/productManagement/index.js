// @flow

import React, { memo, useEffect, useState } from 'react';
import Immutable from 'seamless-immutable';
import ReactPaginate from 'react-paginate';
import { Row, Col, Container } from 'react-bootstrap';
import ProductSearch from 'components/Form/ProductSearch';
import Button from 'components/Button';
import Table from 'components/Table';
import Loading from 'components/Loading';
import { headProduct } from '../../../constants/headerTable';
import listAddress from '../../../mockData/listAddress';
import TitleHeader from '../../../components/TitleHeader';
import MainLayout from '../../../layout/MainLayout';
import { listKeyProduct } from '../../../constants/listKey';
import listPage from '../../../constants/listPageSize';

type Props = {
  isProcessing: boolean,
  history: {
    push: Function
  },
  getListProduct: Function,
  listProduct: Array<{}>,
  totalRows: number,
  getListCategories: Function,
  categoriesOption: Array<{}>,
  isOpenNotify: boolean,
  notifyAccountDenied: Function
};
const RroductManagement = ({
  isProcessing,
  history,
  getListProduct,
  listProduct,
  totalRows,
  getListCategories,
  categoriesOption,
  isOpenNotify,
  notifyAccountDenied
}: Props) => {
  const [params, setParams] = useState({
    numberRows: 10,
    category: '',
    productCode: '',
    productName: '',
    currentPage: '',
    branch: ''
  });
  useEffect(() => {
    getListProduct(params);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    getListCategories();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (isOpenNotify) {
      notifyAccountDenied();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpenNotify]);

  const handleSubmitSearch = value => {
    setParams(value);
    getListProduct(value);
  };

  const handleViewRegister = () => {
    history.push(`/products/register`);
  };
  const handleSelectPagination = eventKey => {
    setParams({ ...params, currentPage: eventKey.selected });
    const paramsRequest = { ...params, currentPage: eventKey.selected };
    getListProduct(paramsRequest);
  };

  const handleViewDetail = item => {
    history.push(`/products/${item.id}`);
  };
  return (
    <>
      <MainLayout>
        <div className="store-management">
          <Container fluid>
            <TitleHeader title="상품관리" />
            <Row>
              <Col sm={12}>
                <ProductSearch
                  listAddress={listAddress}
                  listKey={listKeyProduct}
                  categoryProduct={
                    categoriesOption && categoriesOption.length
                      ? Immutable.asMutable(categoriesOption)
                      : []
                  }
                  listPage={listPage}
                  handleSubmitSearch={handleSubmitSearch}
                />
              </Col>
              <Col sm={12}>
                <div className="text-right my-3">
                  <Button
                    type="submit"
                    variant="primary"
                    onClick={() => {
                      handleViewRegister();
                    }}
                  >
                    상품등록
                  </Button>
                </div>
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
                <Col sm={12} className="table-product">
                  <Table
                    tableHeads={headProduct}
                    tableBody={listProduct}
                    onClickRow={handleViewDetail}
                    isShowId
                  />
                </Col>
              )}
            </Row>
          </Container>
        </div>
        {totalRows > params.numberRows && (
          <Col sm={12} className="wrapper-pagination">
            <ReactPaginate
              previousLabel="←"
              nextLabel="→"
              breakLabel={<span className="gap">...</span>}
              pageCount={Math.ceil(totalRows / params.numberRows)}
              onPageChange={eventKey => handleSelectPagination(eventKey)}
              forcePage={params.currentPage || 0}
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

export default memo<Props>(RroductManagement);

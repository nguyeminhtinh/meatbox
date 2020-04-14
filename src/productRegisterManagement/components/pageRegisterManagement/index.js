// @flow

import React, { memo, useState, useEffect } from 'react';
import Immutable from 'seamless-immutable';
import ReactPaginate from 'react-paginate';
import { Row, Col, Container } from 'react-bootstrap';
import ProductLanding from 'components/Form/ProductLanding';
import Button from 'components/Button';
import TableProduct from 'components/Table/TableProduct';
import Loading from 'components/Loading';
import { headImagesProduct } from '../../../constants/headerTable';
import listAddress from '../../../mockData/listAddress';
import TitleHeader from '../../../components/TitleHeader';
import MainLayout from '../../../layout/MainLayout';
import listPage from '../../../constants/listPageSize';
import ModalPrimary from '../../../components/Modal';
import ERROR_MESSAGE from '../../../constants/errorMsg';
import { Types } from '../../redux';

type Props = {
  isProcessing: boolean,
  registerLandingProduct: Function,
  getListLandingProduct: Function,
  listLandingProduct: Array<{}>,
  totalRows: number,
  deleteListLandingProduct: Function,
  type: string,
  categoriesOptions: Array<{}>,
  getListCategories: Function,
  isOpenNotify: boolean,
  notifyAccountDenied: Function
};
const LandingRegisterManagement = ({
  isProcessing,
  registerLandingProduct,
  getListLandingProduct,
  listLandingProduct,
  deleteListLandingProduct,
  totalRows,
  type,
  categoriesOptions,
  getListCategories,
  isOpenNotify,
  notifyAccountDenied
}: Props) => {
  const handleSubmitAdd = dataObj => {
    registerLandingProduct(dataObj);
  };
  const [popupClose, setPopupClose] = useState({
    isShow: false,
    content: ''
  });
  const [isValueDefault, setIsValueDefault] = useState(false);
  const [dataFilter, setDataFilter] = useState({
    numberRows: 10,
    currentPage: 0
  });
  useEffect(() => {
    switch (type) {
      case Types.DELETE_LIST_LANDING_PRODUCT_SUCCESS:
        getListLandingProduct(dataFilter);
        break;
      case Types.REGISTER_LANDING_PRODUCT_SUCCESS:
        getListLandingProduct({
          numberRows: 10,
          currentPage: 0
        });
        setIsValueDefault(true);
        break;
      default:
        break;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [type]);

  const [popupConfirmRemove, setPopupConfirmRemove] = useState({
    isShow: false
  });

  const [listId, setListId] = useState([]);

  useEffect(() => {
    getListLandingProduct(dataFilter);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [listLandingProduct && listLandingProduct.length]);

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

  const handleCheckBox = id => {
    let dataSubmit = [];

    if (listId.includes({ ...id }[0])) {
      dataSubmit = listId.filter(item => item !== { ...id }[0]);
    } else {
      dataSubmit = [...listId, ...id];
    }
    setListId(dataSubmit);
  };

  const handleSubmitForm = () => {
    setPopupConfirmRemove({
      ...popupConfirmRemove,
      isShow: false
    });
    deleteListLandingProduct(listId);
  };
  const handleRemoveProduct = () => {
    if (listId && listId.length > 0) {
      setPopupConfirmRemove({
        isShow: true,
        content: ERROR_MESSAGE.CONFIRM_REMOVE
      });
    } else {
      setPopupClose({
        isShow: true,
        content: ERROR_MESSAGE.VALIDATE_CATEGORY
      });
    }
  };
  const handleSelectPagination = eventKey => {
    setDataFilter({ ...dataFilter, currentPage: eventKey.selected });
    const paramsRequest = { ...dataFilter, currentPage: eventKey.selected };
    getListLandingProduct(paramsRequest);
  };
  return (
    <>
      <MainLayout>
        <div className="list-images-management">
          <Container fluid className="border-wrapper">
            <TitleHeader title="랜딩페이지 등록관리" />
            <Row>
              <Col sm={12}>
                <ProductLanding
                  listAddress={listAddress}
                  categoryProduct={Immutable.asMutable(categoriesOptions)}
                  listPage={listPage}
                  handleSubmitAdd={handleSubmitAdd}
                  isValueDefault={isValueDefault}
                />
              </Col>
              <Col sm={12}>
                <div className="text-right my-3">
                  <Button
                    type="submit"
                    variant="secondary"
                    onClick={() => {
                      handleRemoveProduct();
                    }}
                  >
                    선택삭제
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
                <Col sm={12}>
                  <TableProduct
                    tableHeads={headImagesProduct}
                    tableBody={listLandingProduct}
                    isShowImage
                    handleCheckBox={handleCheckBox}
                    isShowId
                  />
                </Col>
              )}
            </Row>
          </Container>
        </div>
        {totalRows > dataFilter.numberRows && (
          <Col sm={12} className="wrapper-pagination">
            <ReactPaginate
              previousLabel="←"
              nextLabel="→"
              breakLabel={<span className="gap">...</span>}
              pageCount={Math.ceil(totalRows / dataFilter.numberRows)}
              onPageChange={eventKey => handleSelectPagination(eventKey)}
              forcePage={0}
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
        <ModalPrimary
          title="알림"
          content={popupConfirmRemove.content}
          isOpen={popupConfirmRemove.isShow}
          handleClose={() => {
            handleSubmitForm();
          }}
        />
        {/* /Check validate */}
        <ModalPrimary
          title="알림"
          content={popupClose.content}
          isOpen={popupClose.isShow}
          handleClose={() => {
            setPopupClose(false);
          }}
        />
      </MainLayout>
    </>
  );
};

export default memo<Props>(LandingRegisterManagement);

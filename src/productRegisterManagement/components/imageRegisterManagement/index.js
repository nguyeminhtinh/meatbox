// @flow

import React, { memo, useState, useEffect } from 'react';
import Immutable from 'seamless-immutable';
import ReactPaginate from 'react-paginate';
import { Row, Col, Container } from 'react-bootstrap';
import ProductImageSearch from 'components/Form/ProductImageSearch';
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
  registerImageProduct: Function,
  getListImageProduct: Function,
  listImageProduct: Array<{}>,
  totalRows: number,
  deleteListImageProduct: Function,
  type: string,
  getListCategories: Function,
  categoriesOptions: Array<{}>,
  isOpenNotify: boolean,
  notifyAccountDenied: Function,
  errorServer: string
};
const ImageRegisterManagement = ({
  isProcessing,
  registerImageProduct,
  getListImageProduct,
  listImageProduct,
  deleteListImageProduct,
  totalRows,
  getListCategories,
  type,
  categoriesOptions,
  isOpenNotify,
  notifyAccountDenied,
  errorServer
}: Props) => {
  const handleSubmitAdd = dataObj => {
    registerImageProduct(dataObj);
  };
  const [popupClose, setPopupClose] = useState({
    categoryLabel: '',
    content: ''
  });
  const [dataFilter, setDataFilter] = useState({
    numberRows: 10,
    currentPage: 0
  });
  const [isValueDefault, setIsValueDefault] = useState(false);
  const [listId, setListId] = useState([]);

  // get list category options
  useEffect(() => {
    getListCategories();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    getListImageProduct(dataFilter);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [listImageProduct && listImageProduct.length]);

  useEffect(() => {
    switch (type) {
      case Types.DELETE_LIST_IMAGE_PRODUCT_SUCCESS:
        setPopupClose({
          isShow: true,
          content: '삭제되었습니다'
        });
        setDataFilter({
          numberRows: 10,
          currentPage: 0
        });
        getListImageProduct({
          numberRows: 10,
          currentPage: 0
        });
        setListId([]);
        break;
      case Types.REGISTER_IMAGE_PRODUCT_SUCCESS:
        setDataFilter({
          numberRows: 10,
          currentPage: 0
        });
        getListImageProduct({
          numberRows: 10,
          currentPage: 0
        });
        setIsValueDefault(true);
        break;
      case Types.REGISTER_IMAGE_PRODUCT_FAILED:
        setPopupClose({
          isShow: true,
          content: errorServer
        });
        break;
      default:
        break;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [type]);

  const [popupConfirmRemove, setPopupConfirmRemove] = useState({
    isShow: false
  });

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
    deleteListImageProduct(listId);
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
        content: ERROR_MESSAGE.VALIDATE_DELETE_IMG
      });
    }
  };
  const handleSelectPagination = eventKey => {
    setDataFilter({ ...dataFilter, currentPage: eventKey.selected });
    const paramsRequest = { ...dataFilter, currentPage: eventKey.selected };
    getListImageProduct(paramsRequest);
  };
  return (
    <>
      <MainLayout>
        <div className="list-images-management">
          <Container fluid className="border-wrapper">
            <TitleHeader title="상품 이미지 등록관리" />
            <Row>
              <Col sm={12}>
                <ProductImageSearch
                  listAddress={listAddress}
                  categoryProduct={Immutable.asMutable(categoriesOptions)}
                  listPage={listPage}
                  isValueDefault={isValueDefault}
                  handleSubmitAdd={handleSubmitAdd}
                />
              </Col>
              <Col sm={12}>
                <div className="text-right my-3">
                  <Button
                    type="submit"
                    variant="secondary"
                    onClick={handleRemoveProduct}
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
                <Col sm={12} className="table">
                  <TableProduct
                    tableHeads={headImagesProduct}
                    tableBody={listImageProduct}
                    isShowImage
                    handleCheckBox={handleCheckBox}
                    isShowId
                    listId={listId}
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
              forcePage={dataFilter.currentPage}
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
          isShowCloseIco
          handleCloseIco={() => {
            setPopupConfirmRemove({ isShow: false });
          }}
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

export default memo<Props>(ImageRegisterManagement);

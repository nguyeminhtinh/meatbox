// @flow
// libs
/* eslint-disable react-hooks/exhaustive-deps */
import React, { memo, useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { Row, Container } from 'react-bootstrap';
import Loading from 'components/Loading';
import InputChange from 'components/Input/InputChange';
import { validator } from 'utils/Validators';
import SelectDropdown from 'components/Select';
import ImageViewer from 'components/ImageViewer';
import { getCategoryNameById } from 'utils/helpers';
import appConfig from '../../../config/appConfig';
import MainLayout from '../../../layout/MainLayout';
import TitleHeader from '../../../components/TitleHeader';
import Radio from '../../../components/Radio';
import Button from '../../../components/Button';
import ModalPrimary from '../../../components/Modal';
import ERROR_MESSAGE from '../../../constants/errorMsg';
import ModalPopUpImage from './popupImage';
import { isNumberKey, isOnPasteNumber } from '../../../constants/validate';

import {
  categoryRegisterProduct,
  listRanking
} from '../../../constants/listKey';

type Props = {
  history: {
    push: Function
  },
  error: Object,
  imageList: Array<{}>,
  productDetail: Object,
  updateProduct: Function,

  getProductDetail: Function,
  match: {
    params: {
      id: number
    }
  },
  getImageCategory: Function,
  type: string,
  isProcessing: boolean,
  isProcessingDetail: boolean,
  categoriesOptions: Array<{}>,
  getListCategories: Function,
  isOpenNotify: boolean,
  notifyAccountDenied: Function,
  getListNameByCategory: Function,
  imageListAuthor: Array<{}>,
  getImageCategoryAuthor: Function
};
export const EditProduct = ({
  getProductDetail,
  match,
  productDetail,
  getImageCategory,
  imageList,
  updateProduct,
  isProcessing,
  type,
  history,
  categoriesOptions,
  getListCategories,
  isProcessingDetail,
  error,
  isOpenNotify,
  notifyAccountDenied,
  getListNameByCategory,
  imageListAuthor,
  getImageCategoryAuthor
}: Props) => {
  const [dataDetail, setDataDetail] = useState({});
  const [statusTax, setStatusTax] = useState(
    productDetail && productDetail.taxType
  );
  const [isPreviewImage, setIsPreviewImage] = useState(false);
  const [statusOrigin, setStatusOrigin] = useState(
    (productDetail && productDetail.productOrigin) || ''
  );
  const [types, setTypes] = useState(productDetail && productDetail.type);
  const [popupConfirmModify, setPopupConfirmModify] = useState({
    isShow: false
  });
  const [popupConfirmCancel, setPopupConfirmCancel] = useState({
    isShow: false
  });
  const [imgPreview, setImgPreview] = useState('');
  const [isChange, setIsChange] = useState(false);

  const initCategory = getCategoryNameById(
    categoriesOptions,
    productDetail.categoryId
  );

  const [categoryOption, setCategoryOption] = useState({
    value: productDetail && productDetail.categoryId,
    label: initCategory && initCategory.label
  });
  const [isOpenPopupImage, setIsOpenPopupImage] = useState(false);

  const [fileName, setFileName] = useState({
    landing1Path:
      productDetail && productDetail.landing1Path
        ? productDetail.landing1Path
        : '',
    landing2Path:
      productDetail && productDetail.landing2Path
        ? productDetail.landing2Path
        : '',
    landing3Path:
      productDetail && productDetail.landing3Path
        ? productDetail.landing3Path
        : '',
    landing4Path:
      productDetail && productDetail.landing4Path
        ? productDetail.landing4Path
        : '',
    landing5Path:
      productDetail && productDetail.landing5Path
        ? productDetail.landing5Path
        : ''
  });
  const [imageUpload, setImageUpload] = useState(fileName);
  const [urlImage, setUrlImage] = useState(fileName);
  const [nameProduct, setNameProduct] = useState(dataDetail.nameProduct);
  const [codeProductValue, setCodeProductValue] = useState(
    dataDetail.codeProduct
  );
  const [manufacturer, setManufacturer] = useState(dataDetail.manufacturer);
  const [massValue, setMassValue] = useState(dataDetail.mass);
  const [priceCostValue, setPriceCostValue] = useState(dataDetail.priceCost);
  const [textErrorStatusOrigin, setTextErrorStatusOrigin] = useState('');
  const [popupConfirmAdd, setPopupConfirmAdd] = useState({
    isShow: false
  });
  const [textError, setTextError] = useState({});
  const [ranking, setRanking] = useState({
    value: productDetail && productDetail.level,
    label: productDetail && productDetail.level
  });

  const clickModify = () => {
    if (productDetail && productDetail.type !== types) {
      setIsChange(true);
    } else {
      setPopupConfirmModify({
        isShow: true,
        content: ERROR_MESSAGE.CONFIRM_MODIFY
      });
    }
  };
  const clickCancel = () => {
    setPopupConfirmCancel({
      isShow: true,
      content: ERROR_MESSAGE.CONFIRM_CANNEL
    });
  };

  const rules = {
    nameProduct: ['required'],
    codeProduct: ['required', 'codeProduct'],
    manufacturer: ['required'],
    priceCost: ['required', 'notNumber', 'priceNumberOtherThan0'],
    mass: ['required', 'notNumber', 'priceNumberOtherThan0'],
    imagePath: ['required']
  };

  const handleSubmitForm = () => {
    let validation = {};
    const dataUpdate = {
      codeProduct: dataDetail && dataDetail.codeProduct,
      manufacturer: dataDetail && dataDetail.manufacturer,
      priceCost: dataDetail && dataDetail.priceCost,
      mass: dataDetail && dataDetail.mass,
      imagePath: dataDetail && dataDetail.imagePath,
      nameProduct: dataDetail && dataDetail.nameProduct
    };
    validation = validator(dataUpdate, rules);

    if (Object.keys(validation).length > 0) {
      setTextError(validation);
      setPopupConfirmModify({
        ...popupConfirmModify,
        isShow: false
      });
      return;
    }

    if (!statusOrigin || !statusOrigin.trim()) {
      console.log(statusOrigin);

      setTextErrorStatusOrigin('이 필드는 필수입니다.');
      setPopupConfirmModify({
        ...popupConfirmModify,
        isShow: false
      });
      return;
    }
    const formData = new window.FormData();
    formData.append('categoryId', dataDetail && dataDetail.categoryId);
    formData.append('code', codeProductValue);
    formData.append('cost100g', 100);
    formData.append('manufacturer', manufacturer);
    formData.append('id', parseInt(match.params.id, 10));
    formData.append('imagePath', dataDetail && dataDetail.imagePath);
    if (typeof imageUpload.landing1Path !== 'string') {
      if (imageUpload && imageUpload.landing1Path) {
        formData.append('landing1Path', imageUpload.landing1Path);
      }
    }
    if (typeof imageUpload.landing2Path !== 'string') {
      if (imageUpload && imageUpload.landing2Path) {
        formData.append('landing2Path', imageUpload.landing2Path);
      }
    }
    if (typeof imageUpload.landing3Path !== 'string') {
      if (imageUpload && imageUpload.landing3Path) {
        formData.append('landing3Path', imageUpload.landing3Path);
      }
    }
    if (typeof imageUpload.landing4Path !== 'string') {
      if (imageUpload && imageUpload.landing4Path) {
        formData.append('landing4Path', imageUpload.landing4Path);
      }
    }
    if (typeof imageUpload.landing5Path !== 'string') {
      if (imageUpload && imageUpload.landing5Path) {
        formData.append('landing5Path', imageUpload.landing5Path);
      }
    }
    formData.append('name', nameProduct);
    formData.append('productOrigin', statusOrigin || '');
    formData.append('productLevel', ranking.value);
    formData.append('tax', statusTax);
    formData.append(
      'mass',
      massValue
        .toString()
        .replace(/g/gi, '')
        .replace(/,/gi, '')
    );
    formData.append(
      'priceCost',
      priceCostValue
        .toString()
        .replace(/원/gi, '')
        .replace(/,/gi, '')
    );
    formData.append('type', types);
    updateProduct(formData, parseInt(match.params.id, 10));

    setPopupConfirmModify({
      ...popupConfirmModify,
      isShow: false
    });
    setPopupConfirmCancel({
      ...popupConfirmCancel,
      isShow: false
    });
  };

  const handleSelectImage = item => {
    setIsOpenPopupImage(false);
    if (item) {
      setDataDetail({
        ...dataDetail,
        imagePath: item && item.img
      });
    }
  };

  const handleChangeFile = (e, name) => {
    if (e.target.validity.valid && e.target.files[0]) {
      if (e.target.files[0].size > 4000000) {
        setPopupConfirmAdd({
          ...popupConfirmAdd,
          isShow: true,
          content: '이 파일은 너무 큽니다'
        });
        return;
      }
      setUrlImage({
        ...urlImage,
        [name]: (window.URL || window.webkitURL).createObjectURL(
          e.target.files[0]
        )
      });
      setImageUpload({
        ...imageUpload,
        [name]: e.target.files[0]
      });
      setFileName({
        ...fileName,
        [name]: e.target.files[0].name
      });
    }
  };

  useEffect(() => {
    const { id } = match.params;
    getProductDetail(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [match.params.id]);

  useEffect(() => {
    switch (type) {
      case 'UPDATE_PRODUCT_SUCCESS':
        if (error && error.code === 404) {
          setPopupConfirmAdd({
            ...popupConfirmAdd,
            isShow: true,
            content: error.message
          });
        } else {
          history.push('/products');
        }
        break;
      case 'UPDATE_PRODUCT_FAILED':
        setPopupConfirmAdd({
          ...popupConfirmAdd,
          isShow: true,
          content: '업데이트 실패'
        });
        break;
      default:
        break;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [type, error]);
  useEffect(() => {
    getListCategories();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (productDetail && productDetail.categoryId) {
      getListNameByCategory(productDetail && productDetail.categoryId);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [productDetail && productDetail.categoryId]);

  useEffect(() => {
    setDataDetail(productDetail);
    setRanking({
      value: productDetail && productDetail.level,
      label: productDetail && productDetail.level
    });

    setStatusOrigin((productDetail && productDetail.productOrigin) || '');
    setCategoryOption({
      value: productDetail && productDetail.categoryId,
      label: initCategory && initCategory.label
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
    setCodeProductValue(productDetail && productDetail.codeProduct);
    setManufacturer(productDetail && productDetail.manufacturer);
    setMassValue(productDetail && productDetail.mass);
    setPriceCostValue(productDetail && productDetail.priceCost);
    setNameProduct(productDetail && productDetail.nameProduct);
    setStatusTax(productDetail && productDetail.taxType);
    setTypes(productDetail && productDetail.type);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    productDetail.id,
    productDetail.codeProduct,
    productDetail.categoryName,
    productDetail.nameProduct,
    productDetail.branch,
    productDetail.categoryId,
    productDetail.taxType,
    productDetail.origin,
    productDetail.level,
    productDetail.commonPrice,
    productDetail.imagePath,
    productDetail.productOrigin,
    productDetail.type,
    productDetail.mass,
    productDetail.priceCost,
    productDetail.manufacturer
  ]);

  useEffect(() => {
    setFileName({
      landing1Path:
        productDetail && productDetail.landing1Path
          ? productDetail.landing1Path
          : '',
      landing2Path:
        productDetail && productDetail.landing2Path
          ? productDetail.landing2Path
          : '',
      landing3Path:
        productDetail && productDetail.landing3Path
          ? productDetail.landing3Path
          : '',
      landing4Path:
        productDetail && productDetail.landing4Path
          ? productDetail.landing4Path
          : '',
      landing5Path:
        productDetail && productDetail.landing5Path
          ? productDetail.landing5Path
          : ''
    });
    setUrlImage({
      landing1Path:
        productDetail && productDetail.landing1Path
          ? appConfig.IMG_URL + productDetail.landing1Path
          : '',
      landing2Path:
        productDetail && productDetail.landing2Path
          ? appConfig.IMG_URL + productDetail.landing2Path
          : '',
      landing3Path:
        productDetail && productDetail.landing3Path
          ? appConfig.IMG_URL + productDetail.landing3Path
          : '',
      landing4Path:
        productDetail && productDetail.landing4Path
          ? appConfig.IMG_URL + productDetail.landing4Path
          : '',
      landing5Path:
        productDetail && productDetail.landing5Path
          ? appConfig.IMG_URL + productDetail.landing5Path
          : ''
    });
    setImageUpload({
      landing1Path:
        productDetail && productDetail.landing1Path
          ? appConfig.IMG_URL + productDetail.landing1Path
          : null,
      landing2Path:
        productDetail && productDetail.landing2Path
          ? appConfig.IMG_URL + productDetail.landing2Path
          : null,
      landing3Path:
        productDetail && productDetail.landing3Path
          ? appConfig.IMG_URL + productDetail.landing3Path
          : null,
      landing4Path:
        productDetail && productDetail.landing4Path
          ? appConfig.IMG_URL + productDetail.landing4Path
          : null,
      landing5Path:
        productDetail && productDetail.landing5Path
          ? appConfig.IMG_URL + productDetail.landing5Path
          : null
    });
  }, [
    productDetail.id,
    productDetail.landing1Path,
    productDetail.landing2Path,
    productDetail.landing3Path,
    productDetail.landing4Path,
    productDetail.landing5Path,
    productDetail
  ]);

  useEffect(() => {
    if (isOpenNotify) {
      notifyAccountDenied();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpenNotify]);

  const handleSelectChange = (option, name) => {
    switch (name) {
      case 'level':
        setRanking(option);
        break;
      default:
    }
  };
  const handleChangeInput = (value, name) => {
    setTextError({
      ...textError,
      [name]: ''
    });
    switch (name) {
      case 'nameProduct':
        setDataDetail({
          ...dataDetail,
          nameProduct: value.trim()
        });
        setNameProduct(value.trim());
        break;
      case 'codeProduct':
        setDataDetail({
          ...dataDetail,
          codeProduct: value.trim()
        });
        setCodeProductValue(value.trim());
        break;
      case 'manufacturer':
        setDataDetail({
          ...dataDetail,
          manufacturer: value.trim()
        });
        setManufacturer(value.trim());
        break;
      case 'statusOrigin':
        setDataDetail({
          ...dataDetail,
          statusOrigin: value
        });
        setStatusOrigin(value.trim());
        setTextErrorStatusOrigin();
        break;
      case 'mass':
        setDataDetail({
          ...dataDetail,
          mass: value
        });
        setMassValue(value.trim());
        break;
      case 'priceCost':
        setDataDetail({
          ...dataDetail,
          priceCost: value
        });
        setPriceCostValue(value.trim());
        break;
      default:
    }
  };

  const handlePreviewImage = (url, name) => {
    setIsPreviewImage(true);

    switch (name) {
      case 'imagePath':
        setImgPreview(url);
        break;
      case 'landing1Path':
        setImgPreview(url);
        break;
      case 'landing2Path':
        setImgPreview(url);
        break;
      case 'landing3Path':
        setImgPreview(url);
        break;
      case 'landing4Path':
        setImgPreview(url);
        break;
      case 'landing5Path':
        setImgPreview(url);
        break;
      default:
        break;
    }
  };

  const handleOnchangeInformation = e => {
    const { name } = e.target;
    setTypes(name);
  };

  const formatUnit = (elm, unit, name) => {
    const item = elm;
    let number = '';
    switch (name) {
      case 'mass':
        number =
          item && item.value && item.value.toString().includes('.')
            ? item.value
            : `${item.value.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}`;
        break;
      case 'priceCost':
        number =
          item && item.value && item.value.toString().includes('.')
            ? item.value
            : `${item.value.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}`;
        break;
      default:
        number = item && item.value;
        break;
    }
    item.value = number + unit;
  };

  const handleOnBlur = (elm, unit, name) => {
    formatUnit(elm, unit, name);
  };

  const removeUnit = (elm, replace, unit) => {
    const item = elm;
    const number = item.value.replace(replace, '');
    if (item.value.includes(unit)) {
      item.value = number;
    }
  };

  return (
    // eslint-disable-next-line react/jsx-fragments
    <React.Fragment>
      {isProcessingDetail ? (
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
        <MainLayout>
          <Container fluid className="py-3 edit-product border-wrapper">
            <TitleHeader title="상품정보" />
            <div className="wrapper__info mb-5">
              <div className="card-header edit-store">상품등록 </div>
              <Row className="row__custom">
                <div className="col-md-2 d-flex align-items-center py-2">
                  <div className="title">카테고리</div>
                </div>
                <div className="col-md-4 py-2 right-none">
                  <SelectDropdown
                    listItem={categoryRegisterProduct || []}
                    value={categoryOption.label}
                    noOptionsMessage={() => '옵션 없음'}
                    disabled
                  />
                </div>
                <div className="col-md-2 d-flex align-items-center py-2">
                  <div className="title">상품명</div>
                </div>
                <div className="col-md-4 py-2 input-block">
                  <InputChange
                    type="text"
                    value={nameProduct}
                    placeholder=""
                    onChange={e => handleChangeInput(e, 'nameProduct')}
                    errorMsg={textError.nameProduct}
                  />
                </div>
              </Row>
            </div>
            <div className="wrapper__info">
              <div className="card-header edit-store">상품정보입력</div>
              <Row className="row__custom">
                <div className="col-md-2 d-flex align-items-center py-2">
                  <div className="title">상품코드</div>
                </div>
                <div className="col-md-10 py-2  wrapper-100 input-block">
                  <InputChange
                    type="text"
                    value={codeProductValue}
                    placeholder="상품코드를 입력하세요."
                    onChange={e => handleChangeInput(e, 'codeProduct')}
                    errorMsg={textError.codeProduct}
                    maxLength="45"
                  />
                </div>
              </Row>
              <Row className="row__custom">
                <div className="col-md-2 d-flex align-items-center py-2">
                  <div className="title">매입처 상호</div>
                </div>
                <div className="col-md-10 py-2  wrapper-100 input-block">
                  <InputChange
                    type="text"
                    value={manufacturer}
                    placeholder="매입처 상호 입력하세요."
                    onChange={e => handleChangeInput(e, 'manufacturer')}
                    errorMsg={textError.manufacturer}
                    maxLength="45"
                  />
                </div>
              </Row>
              <Row className="row__custom">
                <div className="col-md-2 d-flex align-items-center py-2">
                  <div className="title">과세/비과세</div>
                </div>
                <div className="col-md-10 py-3 wrapper-radio d-flex align-items-center">
                  <Radio
                    id="tax"
                    isChecked={statusTax === 'tax'}
                    labelRadio="과세"
                    name="tax"
                    onChange={() => {
                      setStatusTax('tax');
                    }}
                  />
                  <Radio
                    id="free"
                    isChecked={statusTax === 'free'}
                    labelRadio="비과세"
                    name="free"
                    onChange={() => {
                      setStatusTax('free');
                    }}
                  />
                </div>
              </Row>
              <Row className="row__custom">
                <div className="col-md-2 d-flex align-items-center py-2">
                  <div className="title">원산지</div>
                </div>
                <div className="col-md-7 py-2 input-block">
                  <InputChange
                    value={statusOrigin}
                    type="text"
                    onChange={e => handleChangeInput(e, 'statusOrigin')}
                    placeholder=""
                    errorMsg={textErrorStatusOrigin}
                    customClassName={`${textErrorStatusOrigin ? 'red' : ''} `}
                  />
                </div>
              </Row>
              <Row className="row__custom">
                <div className="col-md-2 d-flex align-items-center py-2">
                  <div className="title">등급</div>
                </div>
                <div className="col-md-4 py-2">
                  <SelectDropdown
                    listItem={listRanking}
                    value={ranking.label}
                    onChange={e => handleSelectChange(e, 'level')}
                    noOptionsMessage={() => '옵션 없음'}
                  />
                </div>
              </Row>
              <Row className="row__custom">
                <div className="col-md-2 d-flex align-items-center py-2">
                  <div className="title">상품 이미지</div>
                </div>
                <div className="col-md-10 py-2">
                  <div className="wrapper-input-res d-flex align-items-start input-block">
                    <InputChange
                      type="text"
                      value={
                        dataDetail && dataDetail.imagePath
                          ? dataDetail.imagePath
                          : ''
                      }
                      onChange={() => {}}
                      readOnly
                      errorMsg={textError.imagePath}
                    />
                    <div className="group-btn-file">
                      <Button
                        type="submit"
                        variant="secondary"
                        onClick={() => {
                          setIsOpenPopupImage(true);
                        }}
                      >
                        상품이미지선택
                      </Button>
                    </div>
                    <Button
                      type="submit"
                      variant="primary"
                      onClick={() =>
                        handlePreviewImage(
                          appConfig.IMG_URL + dataDetail.imagePath,
                          'imagePath'
                        )
                      }
                      disabled={dataDetail.imagePath === ''}
                    >
                      미리보기
                    </Button>
                  </div>
                </div>
              </Row>
              <Row className="row__custom">
                <div className="col-md-2 d-flex align-items-center py-2">
                  <div className="title">랜딩 페이지</div>
                </div>
                <div className="col-md-10  px-0 bd-column">
                  <div className="wrapper-input-res mobile-btn d-flex align-items-center px-3">
                    <InputChange
                      type="text"
                      value={fileName.landing1Path}
                      readOnly
                      onChange={() => {}}
                      disabled={categoryOption.label === '자체상품'}
                    />
                    <div className="group-btn-file">
                      <input
                        type="file"
                        className="custom-file-input"
                        lang="ko"
                        onChange={e => handleChangeFile(e, 'landing1Path')}
                        accept="image/jpg, image/jpeg, image/png"
                        disabled={categoryOption.label === '자체상품'}
                      />
                      <Button
                        type="submit"
                        variant="secondary"
                        onClick={() => {}}
                        disabled={categoryOption.label === '자체상품'}
                      >
                        파일찾기
                      </Button>
                    </div>
                    <Button
                      type="submit"
                      variant="primary"
                      onClick={() =>
                        handlePreviewImage(
                          urlImage.landing1Path,
                          'landing1Path'
                        )
                      }
                      disabled={urlImage.landing1Path === ''}
                    >
                      미리보기
                    </Button>
                  </div>
                  <div className="wrapper-input-res mobile-btn d-flex align-items-center px-3">
                    <InputChange
                      type="text"
                      value={fileName.landing2Path}
                      readOnly
                      onChange={() => {}}
                      disabled={categoryOption.label === '자체상품'}
                    />
                    <div className="group-btn-file">
                      <input
                        type="file"
                        className="custom-file-input"
                        lang="ko"
                        onChange={e => handleChangeFile(e, 'landing2Path')}
                        accept="image/jpg, image/jpeg, image/png"
                        disabled={categoryOption.label === '자체상품'}
                      />
                      <Button
                        type="submit"
                        variant="secondary"
                        onClick={() => {}}
                        disabled={categoryOption.label === '자체상품'}
                      >
                        파일찾기
                      </Button>
                    </div>
                    <Button
                      type="submit"
                      variant="primary"
                      onClick={() =>
                        handlePreviewImage(
                          urlImage.landing2Path,
                          'landing2Path'
                        )
                      }
                      disabled={urlImage.landing2Path === ''}
                    >
                      미리보기
                    </Button>
                  </div>
                  <div className="wrapper-input-res mobile-btn d-flex align-items-center px-3">
                    <InputChange
                      type="text"
                      value={fileName.landing3Path}
                      readOnly
                      onChange={() => {}}
                      disabled={categoryOption.label === '자체상품'}
                    />
                    <div className="group-btn-file">
                      <input
                        type="file"
                        className="custom-file-input"
                        lang="ko"
                        onChange={e => handleChangeFile(e, 'landing3Path')}
                        accept="image/jpg, image/jpeg, image/png"
                        disabled={categoryOption.label === '자체상품'}
                      />
                      <Button
                        type="submit"
                        variant="secondary"
                        onClick={() => {}}
                        disabled={categoryOption.label === '자체상품'}
                      >
                        파일찾기
                      </Button>
                    </div>
                    <Button
                      type="submit"
                      variant="primary"
                      onClick={() =>
                        handlePreviewImage(
                          urlImage.landing3Path,
                          'landing3Path'
                        )
                      }
                      disabled={urlImage.landing3Path === ''}
                    >
                      미리보기
                    </Button>
                  </div>
                  <div className="wrapper-input-res mobile-btn d-flex align-items-center px-3">
                    <InputChange
                      type="text"
                      value={fileName.landing4Path}
                      readOnly
                      onChange={() => {}}
                      disabled={categoryOption.label === '자체상품'}
                    />
                    <div className="group-btn-file">
                      <input
                        type="file"
                        className="custom-file-input"
                        lang="ko"
                        onChange={e => handleChangeFile(e, 'landing4Path')}
                        accept="image/jpg, image/jpeg, image/png"
                        disabled={categoryOption.label === '자체상품'}
                      />
                      <Button
                        type="submit"
                        variant="secondary"
                        onClick={() => {}}
                        disabled={categoryOption.label === '자체상품'}
                      >
                        파일찾기
                      </Button>
                    </div>
                    <Button
                      type="submit"
                      variant="primary"
                      onClick={() =>
                        handlePreviewImage(
                          urlImage.landing4Path,
                          'landing4Path'
                        )
                      }
                      disabled={urlImage.landing4Path === ''}
                    >
                      미리보기
                    </Button>
                  </div>
                  <div className="wrapper-input-res mobile-btn d-flex align-items-center px-3">
                    <InputChange
                      type="text"
                      value={fileName.landing5Path}
                      readOnly
                      onChange={() => {}}
                      disabled={categoryOption.label === '자체상품'}
                    />
                    <div className="group-btn-file">
                      <input
                        type="file"
                        className="custom-file-input"
                        lang="ko"
                        onChange={e => handleChangeFile(e, 'landing5Path')}
                        accept="image/jpg, image/jpeg, image/png"
                        disabled={categoryOption.label === '자체상품'}
                      />
                      <Button
                        type="submit"
                        variant="secondary"
                        onClick={() => {}}
                        disabled={categoryOption.label === '자체상품'}
                      >
                        파일찾기
                      </Button>
                    </div>
                    <Button
                      type="submit"
                      variant="primary"
                      onClick={() =>
                        handlePreviewImage(
                          urlImage.landing5Path,
                          'landing5Path'
                        )
                      }
                      disabled={urlImage.landing5Path === ''}
                    >
                      미리보기
                    </Button>
                  </div>
                </div>
              </Row>
            </div>
            <div className="wrapper__info mb-3 mt-3 bg-table">
              <div className="card-header edit-store">매입 상품 정보</div>
              <Row className="row__custom ">
                <div className="col-md-2 d-flex align-items-center py-2 ">
                  <div className="title">
                    규격(g)
                    <span className="text-red">*</span>
                  </div>
                </div>
                <div className="col-md-4 py-2 input-block">
                  <InputChange
                    type="text"
                    placeholder="g"
                    onChange={e => {
                      handleChangeInput(e, 'mass');
                    }}
                    onKeyPress={e => isNumberKey(e)}
                    onPaste={e => isOnPasteNumber(e)}
                    inputMode="numeric"
                    pattern="[0-9]*"
                    onBlur={e => handleOnBlur(e.currentTarget, 'g', 'mass')}
                    onFocus={e => removeUnit(e.currentTarget, /g|,/gi, 'g')}
                    value={massValue}
                    errorMsg={textError.mass}
                    maxLength="6"
                    customClassName={`text-right ${
                      textError && textError.mass ? 'red' : ''
                    } `}
                  />
                </div>
                <div className="col-md-2 d-flex align-items-center py-2 ">
                  <div className="title d-flex">
                    상품매입단가(원)
                    <span className="text-red">*</span>
                  </div>
                </div>
                <div className="col-md-4 py-2 input-block">
                  <InputChange
                    value={priceCostValue}
                    placeholder="무게 입력"
                    onKeyPress={e => isNumberKey(e)}
                    onPaste={e => isOnPasteNumber(e)}
                    inputMode="numeric"
                    pattern="[0-9]*"
                    onBlur={e =>
                      handleOnBlur(e.currentTarget, '원', 'priceCost')
                    }
                    onFocus={e => removeUnit(e.currentTarget, /원|,/gi, '원')}
                    onChange={e => handleChangeInput(e, 'priceCost')}
                    errorMsg={textError.priceCost}
                    customClassName="text-right"
                    maxLength="6"
                  />
                </div>
              </Row>
            </div>

            <div className="wrapper__info mt-5 bg-table">
              <Row className="row__custom">
                <div className="col-md-2 d-flex align-items-center py-2">
                  <div className="title">기본정보 선택</div>
                </div>
                <div className="col-md-10 py-3 ">
                  <div className="wrapper-radio w-30 d-flex align-items-center">
                    <Radio
                      onChange={e => handleOnchangeInformation(e)}
                      id="livestock"
                      isChecked={types === 'livestock'}
                      labelRadio="축산물"
                      name="livestock"
                      disabled
                    />
                    <Radio
                      onChange={e => handleOnchangeInformation(e)}
                      id="product"
                      isChecked={types === 'product'}
                      labelRadio="가공품"
                      name="product"
                      disabled
                    />
                  </div>
                </div>
              </Row>
            </div>
            <div className="wrapper-btn d-flex justify-content-end mt-3">
              <Button
                type="button"
                variant="secondary btn-custom "
                onClick={() => {
                  clickCancel();
                }}
              >
                취소
              </Button>
              <Button
                type="button"
                variant="secondary btn-custom ml-3"
                onClick={clickModify}
              >
                수정
              </Button>
            </div>
            <ModalPrimary
              title="상품 이미지 선택"
              isConfirm
              isShowFooter={false}
              content={
                // eslint-disable-next-line react/jsx-wrap-multilines
                <ModalPopUpImage
                  getImageCategory={getImageCategory}
                  categoryId={productDetail.categoryId}
                  imageList={imageList}
                  getImageCategoryAuthor={getImageCategoryAuthor}
                  imageListAuthor={imageListAuthor}
                  handleSelectImage={handleSelectImage}
                  isProcessing={isProcessing}
                  categoriesOptions={categoriesOptions}
                />
              }
              isOpen={isOpenPopupImage}
              handleClose={() => {
                setIsOpenPopupImage(false);
              }}
            />
            <ModalPrimary
              title="알림"
              content={popupConfirmModify.content}
              isOpen={popupConfirmModify.isShow}
              handleCloseIco={() => {
                setPopupConfirmModify({ isShow: false });
              }}
              isShowCloseIco
              handleClose={() => {
                handleSubmitForm();
              }}
            />

            <ModalPrimary
              title="알림"
              content={popupConfirmCancel.content}
              isShowCloseIco
              isOpen={popupConfirmCancel.isShow}
              handleCloseIco={() => {
                setPopupConfirmCancel({ isShow: false });
              }}
              handleClose={() => {
                history.push('/products');
              }}
            />
            <ImageViewer
              handleClose={() => {
                setIsPreviewImage(false);
              }}
              isVisible={isPreviewImage}
              imageSrc={imgPreview}
            />
            {/* /Check validate */}
            <ModalPrimary
              title="알림"
              content={popupConfirmAdd.content}
              isOpen={popupConfirmAdd.isShow}
              handleClose={() => {
                setPopupConfirmAdd({
                  isShow: false
                });
              }}
            />
            <ModalPrimary
              title="알림"
              content="기본정보 선택 수정 시, 매장관리자가 입력한 기본정보도 사라집니다.
수정하시겠습니까? "
              isOpen={isChange}
              handleClose={() => {
                handleSubmitForm();
              }}
              isShowCloseIco
              handleCloseIco={() => {
                setIsChange(false);
              }}
            />
          </Container>
        </MainLayout>
      )}
    </React.Fragment>
  );
};

export default withRouter(memo<Props>(EditProduct));

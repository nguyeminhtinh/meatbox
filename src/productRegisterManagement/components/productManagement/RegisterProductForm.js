// @flow
// libs
/* eslint-disable react-hooks/exhaustive-deps */
import React, { memo, useState, useRef, useEffect } from 'react';
import Immutable from 'seamless-immutable';

import { validator } from 'utils/Validators';
import { Row, Container } from 'react-bootstrap';
import Input from 'components/Input';
import InputChange from 'components/Input/InputChange';
import ImageViewer from 'components/ImageViewer';
import appConfig from '../../../config/appConfig';
import MainLayout from '../../../layout/MainLayout';
import Radio from '../../../components/Radio';
import Button from '../../../components/Button';
import SelectCustom from '../../../components/Select/SelectCustom';
import ModalPrimary from '../../../components/Modal';
import ERROR_MESSAGE from '../../../constants/errorMsg';
import ModalPopUpImage from './popupImage';
import { isNumberKey, isOnPasteNumber } from '../../../constants/validate';

import { listRanking } from '../../../constants/listKey';

type Props = {
  history: {
    push: Function
  },
  imageList: Array<{}>,
  getImageCategory: Function,
  type: string,
  registerProduct: Function,
  getListNameByCategory: Function,
  listProductName: Array<{}>,
  isProcessing: boolean,
  categoriesOptions: Array<{}>,
  getListCategories: Function,
  errorServer: string,
  isOpenNotify: boolean,
  notifyAccountDenied: Function,
  getProductSelecting: Function,
  productSelecting: Object
};
export const RegisterProductForm = ({
  registerProduct,
  getImageCategory,
  getListNameByCategory,
  listProductName,
  imageList,
  type,
  history,
  isProcessing,
  categoriesOptions,
  getListCategories,
  errorServer,
  isOpenNotify,
  notifyAccountDenied,
  getProductSelecting,
  productSelecting
}: Props) => {
  const [isPreviewImage, setIsPreviewImage] = useState(false);
  const [statusTax, setStatusTax] = useState('tax');
  const [statusOrigin, setStatusOrigin] = useState('');
  const [types, setTypes] = useState('livestock');
  const [popupConfirmApply, setPopupConfirmApply] = useState(false);
  const [imagesPopup, setImagesPopup] = useState({
    isShow: false
  });
  const [popupConfirmCancel, setPopupConfirmCancel] = useState({
    isShow: false
  });

  const [errorServerRes, setErrorServerRes] = useState('');
  const [isOpenPopupImage, setIsOpenPopupImage] = useState(false);
  const [inputFileActive, setInputFileActive] = useState('');
  const productCodeRef = useRef(null);
  const manufacturerRef = useRef(null);
  const massRef = useRef(null);
  const priceCostRef = useRef(null);
  const productImages = useRef(null);
  const statusOriginRef = useRef(null);
  const [productOriginRef, setProductOriginRef] = useState('');
  const [imagePath, setImagePath] = useState('');

  const [error, setError] = useState({});
  const [imgPreview, setImgPreview] = useState('');

  const [isSelectCategory, setIsSelectCategory] = useState(false);
  const [category, setCategory] = useState(null);
  const [nameProduct, setNameProduct] = useState(null);
  const [Ranking, setListRanking] = useState(null);
  const [fileName, setFileName] = useState({
    landing1Path: '',
    landing2Path: '',
    landing3Path: '',
    landing4Path: '',
    landing5Path: ''
  });

  const [imageUpload, setImageUpload] = useState({});
  const [urlImage, setUrlImage] = useState({
    landing1Path: '',
    landing2Path: '',
    landing3Path: '',
    landing4Path: '',
    landing5Path: ''
  });
  const [popupConfirmAdd, setPopupConfirmAdd] = useState({
    isShow: false
  });
  const [codeProductValue, setCodeProductValue] = useState('');

  const [mass, setMass] = useState('');
  const [priceCost, setPriceCost] = useState('');
  const [manufacturer, setManufacturer] = useState('');
  const handleOnchangeTax = e => {
    const { name } = e.target;

    setStatusTax(name);
  };

  const clickCancel = () => {
    setPopupConfirmCancel({
      isShow: true,
      content: ERROR_MESSAGE.CONFIRM_CANNEL
    });
  };

  useEffect(() => {
    switch (type) {
      case 'REGISTER_PRODUCT_SUCCESS':
        setPopupConfirmApply({
          isShow: true,
          content: ERROR_MESSAGE.CONFIRM_APPLY
        });
        break;
      case 'REGISTER_PRODUCT_FAILED':
        setErrorServerRes(errorServer);
        break;
      default:
        break;
    }
  }, [type, errorServer]);

  useEffect(() => {
    if (isOpenNotify) {
      notifyAccountDenied();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpenNotify]);

  useEffect(() => {
    setCodeProductValue(productSelecting && productSelecting.productCode);
    setManufacturer(productSelecting && productSelecting.manufacturer);
    setMass(productSelecting && productSelecting.mass);
    setPriceCost(
      productSelecting &&
        productSelecting.priceCost.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
    );
    setStatusTax(productSelecting && productSelecting.tax);
    setStatusOrigin(productSelecting && productSelecting.origin);
  }, [
    productSelecting && productSelecting.productCode,
    productSelecting && productSelecting.manufacturer,
    productSelecting && productSelecting.mass,
    productSelecting && productSelecting.priceCost,
    productSelecting && productSelecting.tax,
    productSelecting && productSelecting.origin
  ]);

  const rules = {
    categoryId: ['required'],
    code: ['code', 'required'],
    manufacturer: ['required'],
    priceCost: ['required', 'notNumber', 'priceNumberOtherThan0'],
    mass: ['required', 'notNumber', 'priceNumberOtherThan0'],
    name: ['name', 'required'],
    productLevel: ['productLevel', 'required'],
    origin: ['required'],
    createdAt: [],
    deletedAt: [],
    id: [],
    imagePath: ['required'],
    landing1Path: [],
    landing2Path: [],
    landing3Path: [],
    landing4Path: [],
    landing5Path: [],
    productOrigin: [],
    tax: ['tax', 'required'],
    updatedAt: [],
    type: []
  };

  const handleSubmitForm = () => {
    let validation = {};
    const dataSubmit = {
      categoryId: category && category.value ? category.value : '',
      code: codeProductValue,
      manufacturer,
      imagePath,
      name: nameProduct && nameProduct.value ? nameProduct.value : '',
      origin: statusOrigin,
      productOrigin: productOriginRef,
      productLevel: Ranking && Ranking.value ? Ranking.value : '',
      tax: statusTax,
      type: types,
      mass,
      priceCost
    };

    validation = validator(dataSubmit, rules);
    if (Object.keys(validation).length > 0) {
      setError(validation);
      return;
    }
    const formData = new window.FormData();
    formData.append(
      'categoryId',
      category && category.value ? category.value : ''
    );
    formData.append('code', codeProductValue);
    formData.append('manufacturer', manufacturer);
    formData.append('imagePath', imagePath);

    if (imageUpload && imageUpload.landing1Path) {
      formData.append('landing1Path', imageUpload.landing1Path);
    }
    if (imageUpload && imageUpload.landing2Path) {
      formData.append('landing2Path', imageUpload.landing2Path);
    }
    if (imageUpload && imageUpload.landing3Path) {
      formData.append('landing3Path', imageUpload.landing3Path);
    }
    if (imageUpload && imageUpload.landing4Path) {
      formData.append('landing4Path', imageUpload.landing4Path);
    }
    if (imageUpload && imageUpload.landing5Path) {
      formData.append('landing5Path', imageUpload.landing5Path);
    }
    formData.append(
      'name',
      nameProduct && nameProduct.label ? nameProduct.label : ''
    );
    formData.append('origin', statusOrigin);
    formData.append('productOrigin', statusOrigin.trim());
    formData.append(
      'productLevel',
      Ranking && Ranking.value ? Ranking.value : ''
    );
    formData.append('tax', statusTax);
    formData.append('type', types);
    formData.append(
      'mass',
      mass
        .toString()
        .replace(/g/gi, '')
        .replace(/,/gi, '')
    );
    formData.append(
      'priceCost',
      priceCost
        .toString()
        .replace(/원/gi, '')
        .replace(/,/gi, '')
    );
    registerProduct(formData);

    setPopupConfirmCancel({
      ...popupConfirmCancel,
      isShow: false
    });
    setImagesPopup({
      ...imagesPopup,
      isShow: false
    });
  };

  const handleChangeInput = (value, name) => {
    switch (name) {
      case 'codeProduct':
        setCodeProductValue(value.trim());
        setError({
          ...error,
          code: ''
        });
        break;
      case 'manufacturer':
        setManufacturer(value.trim());
        setError({
          ...error,
          manufacturer: ''
        });
        break;
      case 'statusOrigin':
        setStatusOrigin(value.trim());
        setError({
          ...error,
          origin: ''
        });
        break;
      case 'mass':
        setMass(value.trim());
        setError({
          ...error,
          mass: ''
        });
        break;
      case 'priceCost':
        setPriceCost(value.trim());
        setError({
          ...error,
          priceCost: ''
        });
        break;
      case 'productOrigin':
        if (statusOrigin === 'imported') {
          setProductOriginRef(value.trim());
          setError({
            ...error,
            productOrigin: ''
          });
        }
        break;
      default:
        break;
    }
  };

  const handleOnchangeInformation = e => {
    const { name } = e.target;

    setTypes(name);
  };

  const handleChange = (option, name) => {
    const { value } = option;
    switch (name) {
      case 'name':
        setNameProduct(option);
        getProductSelecting(value);

        setError({
          ...error,
          name: ''
        });
        break;
      case 'category':
        setCategory(option);
        setIsSelectCategory(true);
        setNameProduct(null);
        setError({
          ...error,
          categoryId: ''
        });
        break;
      case 'level':
        setListRanking(option);
        setError({
          ...error,
          productLevel: ''
        });
        break;
      default:
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

  useEffect(() => {
    if (category && category.value) {
      getListNameByCategory(category && category.value);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [category && category.value]);

  useEffect(() => {
    getListCategories();
    // listProductName = null;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSelectImage = item => {
    setIsOpenPopupImage(false);
    switch (inputFileActive) {
      case 'imagePath':
        if (item) {
          setImagePath(item && item.img);
          setError({
            ...error,
            imagePath: ''
          });
        }
        break;
      default:
        break;
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

  return (
    <MainLayout>
      <Container fluid className="py-3 register-page border-wrapper">
        <div className="title__header">
          <h1>상품등록</h1>
        </div>
        <div className="wrapper__info mb-5">
          <Row className="row__custom">
            <div className="col-md-2 d-flex align-items-center py-2">
              <div className="title">카테고리</div>
            </div>
            <div className="col-md-4 py-2 right-none">
              <SelectCustom
                listItem={
                  categoriesOptions
                    ? Immutable.asMutable(categoriesOptions)
                    : []
                }
                option={category}
                onChange={e => handleChange(e, 'category')}
                noOptionsMessage={() => '옵션 없음'}
                placeholder="카테고리 선택"
                errorMsg={error.categoryId}
              />
            </div>
            <div className="col-md-2 d-flex align-items-center py-2">
              <div className="title">상품명</div>
            </div>
            <div className="col-md-4 py-2">
              <SelectCustom
                listItem={Immutable.asMutable(listProductName)}
                option={nameProduct}
                onChange={e => handleChange(e, 'name')}
                noOptionsMessage={() => '옵션 없음'}
                placeholder="상품이름 선택"
                errorMsg={error.name}
                disabled={category === null}
              />
            </div>
          </Row>
        </div>
        {category && nameProduct !== null && (
          <>
            <div className="wrapper__info">
              <div className="card-header edit-store">상품정보입력</div>
              <Row className="row__custom">
                <div className="col-md-2 d-flex align-items-center py-2">
                  <div className="title">상품코드</div>
                </div>
                <div className="col-md-10 py-2  wrapper-100">
                  <InputChange
                    value={codeProductValue}
                    type="text"
                    onChange={e => handleChangeInput(e, 'codeProduct')}
                    innerRef={productCodeRef}
                    placeholder="상품코드를 입력하세요."
                    errorMsg={error.code}
                    customClassName={`${error && error.code ? 'red' : ''} `}
                    maxLength="45"
                  />
                </div>
              </Row>
              <Row className="row__custom">
                <div className="col-md-2 d-flex align-items-center py-2">
                  <div className="title">매입처 상호</div>
                </div>
                <div className="col-md-10 py-2  wrapper-100">
                  <InputChange
                    value={manufacturer}
                    type="text"
                    onChange={e => handleChangeInput(e, 'manufacturer')}
                    innerRef={manufacturerRef}
                    placeholder="매입처 상호 입력하세요."
                    errorMsg={error.manufacturer}
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
                    onChange={event => handleOnchangeTax(event)}
                    id="tax"
                    isChecked={statusTax === 'tax'}
                    labelRadio="과세"
                    name="tax"
                  />
                  <Radio
                    onChange={event => handleOnchangeTax(event)}
                    id="free"
                    isChecked={statusTax === 'free'}
                    labelRadio="비과세"
                    name="free"
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
                    innerRef={statusOriginRef}
                    placeholder=""
                    errorMsg={error.origin}
                    customClassName={`${
                      error && error.statusOrigin ? 'red' : ''
                    } `}
                  />
                </div>
              </Row>
              <Row className="row__custom">
                <div className="col-md-2 d-flex align-items-center py-2">
                  <div className="title">등급</div>
                </div>
                <div className="col-md-4 py-2">
                  <SelectCustom
                    listItem={listRanking}
                    option={Ranking}
                    onChange={e => handleChange(e, 'level')}
                    noOptionsMessage={() => '옵션 없음'}
                    errorMsg={error.productLevel}
                    placeholder="등급 선택"
                  />
                </div>
              </Row>
              <Row className="row__custom">
                <div className="col-md-2 d-flex align-items-center py-2">
                  <div className="title">상품 이미지</div>
                </div>
                <div className="col-md-10 py-2">
                  <div className="wrapper-input-res d-flex align-items-start">
                    <Input
                      type="text"
                      // value={imagePath && appConfig.IMG_URL + imagePath}
                      value={imagePath}
                      onChange={() => {}}
                      readOnly
                      innerRef={productImages}
                      errorMsg={error.imagePath}
                    />
                    <div className="group-btn-file">
                      <Button
                        type="submit"
                        variant="secondary"
                        onClick={() => {
                          setIsOpenPopupImage(true);
                          setInputFileActive('imagePath');
                        }}
                        disabled={!isSelectCategory}
                      >
                        상품이미지선택
                      </Button>
                    </div>
                    <Button
                      type="submit"
                      variant="primary"
                      onClick={() =>
                        handlePreviewImage(
                          imagePath && appConfig.IMG_URL + imagePath,
                          'imagePath'
                        )
                      }
                      disabled={!isSelectCategory || imagePath === ''}
                    >
                      미리보기
                    </Button>
                  </div>
                </div>
              </Row>
              <Row className="row__custom">
                <div className="col-md-2 d-flex align-items-center py-2">
                  <div className="title">랜딩 페이지 이미지</div>
                </div>
                <div className="col-md-10  px-0 bd-column">
                  <div className="wrapper-input-res mobile-btn d-flex align-items-center px-3">
                    <Input type="text" value={fileName.landing1Path} readOnly />
                    <div className="group-btn-file">
                      <input
                        type="file"
                        className="custom-file-input"
                        lang="ko"
                        disabled={
                          !isSelectCategory ||
                          (category && category.value === 9999)
                        }
                        onChange={e => handleChangeFile(e, 'landing1Path')}
                        accept="image/jpg, image/jpeg, image/png"
                      />
                      <Button
                        type="submit"
                        variant="secondary"
                        onClick={() => {}}
                        disabled={
                          !isSelectCategory ||
                          (category && category.value === 9999)
                        }
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
                      disabled={
                        !isSelectCategory ||
                        urlImage.landing1Path === '' ||
                        (category && category.value === 9999)
                      }
                    >
                      미리보기
                    </Button>
                  </div>
                  <div className="wrapper-input-res mobile-btn d-flex align-items-center px-3">
                    <Input type="text" value={fileName.landing2Path} readOnly />
                    <div className="group-btn-file">
                      <input
                        type="file"
                        className="custom-file-input"
                        lang="ko"
                        disabled={
                          !isSelectCategory ||
                          (category && category.value === 9999)
                        }
                        onChange={e => handleChangeFile(e, 'landing2Path')}
                        accept="image/jpg, image/jpeg, image/png"
                      />
                      <Button
                        type="submit"
                        variant="secondary"
                        onClick={() => {}}
                        disabled={
                          !isSelectCategory ||
                          (category && category.value === 9999)
                        }
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
                      disabled={
                        !isSelectCategory ||
                        urlImage.landing2Path === '' ||
                        (category && category.value === 9999)
                      }
                    >
                      미리보기
                    </Button>
                  </div>
                  <div className="wrapper-input-res mobile-btn d-flex align-items-center px-3">
                    <Input type="text" value={fileName.landing3Path} readOnly />
                    <div className="group-btn-file">
                      <input
                        type="file"
                        className="custom-file-input"
                        lang="ko"
                        disabled={
                          !isSelectCategory ||
                          (category && category.value === 9999)
                        }
                        onChange={e => handleChangeFile(e, 'landing3Path')}
                        accept="image/jpg, image/jpeg, image/png"
                      />
                      <Button
                        type="submit"
                        variant="secondary"
                        onClick={() => {}}
                        disabled={
                          !isSelectCategory ||
                          (category && category.value === 9999)
                        }
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
                      disabled={
                        !isSelectCategory ||
                        urlImage.landing3Path === '' ||
                        (category && category.value === 9999)
                      }
                    >
                      미리보기
                    </Button>
                  </div>
                  <div className="wrapper-input-res mobile-btn d-flex align-items-center px-3">
                    <Input type="text" value={fileName.landing4Path} readOnly />
                    <div className="group-btn-file">
                      <input
                        type="file"
                        className="custom-file-input"
                        lang="ko"
                        disabled={
                          !isSelectCategory ||
                          (category && category.value === 9999)
                        }
                        onChange={e => handleChangeFile(e, 'landing4Path')}
                        accept="image/jpg, image/jpeg, image/png"
                      />
                      <Button
                        type="submit"
                        variant="secondary"
                        onClick={() => {}}
                        disabled={
                          !isSelectCategory ||
                          (category && category.value === 9999)
                        }
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
                      disabled={
                        !isSelectCategory ||
                        urlImage.landing4Path === '' ||
                        (category && category.value === 9999)
                      }
                    >
                      미리보기
                    </Button>
                  </div>
                  <div className="wrapper-input-res mobile-btn d-flex align-items-center px-3">
                    <Input type="text" value={fileName.landing5Path} readOnly />
                    <div className="group-btn-file">
                      <input
                        type="file"
                        className="custom-file-input"
                        lang="ko"
                        disabled={
                          !isSelectCategory ||
                          (category && category.value === 9999)
                        }
                        onChange={e => handleChangeFile(e, 'landing5Path')}
                        accept="image/jpg, image/jpeg, image/png"
                      />
                      <Button
                        type="submit"
                        variant="secondary"
                        onClick={() => {}}
                        disabled={
                          !isSelectCategory ||
                          (category && category.value === 9999)
                        }
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
                      disabled={
                        !isSelectCategory ||
                        urlImage.landing5Path === '' ||
                        (category && category.value === 9999)
                      }
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
                <div className="col-md-2 d-flex align-items-center py-2">
                  <div className="title">
                    규격(g)
                    <span className="text-red">*</span>
                  </div>
                </div>
                <div className="col-md-4 py-2">
                  <InputChange
                    type="text"
                    placeholder="g"
                    onChange={e => {
                      handleChangeInput(e, 'mass');
                    }}
                    onBlur={e => handleOnBlur(e.currentTarget, 'g', 'mass')}
                    onFocus={e => removeUnit(e.currentTarget, /g|,/gi, 'g')}
                    value={mass}
                    innerRef={massRef}
                    errorMsg={error.mass}
                    onKeyPress={e => isNumberKey(e)}
                    onPaste={e => isOnPasteNumber(e)}
                    inputMode="numeric"
                    pattern="[0-9]*"
                    customClassName="text-right"
                    maxLength="6"
                  />
                </div>
                <div className="col-md-2 d-flex align-items-center py-2">
                  <div className="title d-flex">
                    상품매입단가(원)
                    <span className="text-red">*</span>
                  </div>
                </div>
                <div className="col-md-4 py-2">
                  <InputChange
                    value={priceCost}
                    placeholder="원"
                    onBlur={e =>
                      handleOnBlur(e.currentTarget, '원', 'priceCost')
                    }
                    onFocus={e => removeUnit(e.currentTarget, /원|,/gi, '원')}
                    onChange={e => handleChangeInput(e, 'priceCost')}
                    innerRef={priceCostRef}
                    errorMsg={error.priceCost}
                    customClassName="text-right"
                    onKeyPress={e => isNumberKey(e)}
                    onPaste={e => isOnPasteNumber(e)}
                    inputMode="numeric"
                    pattern="[0-9]*"
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
                    />
                    <Radio
                      onChange={e => handleOnchangeInformation(e)}
                      id="product"
                      isChecked={types === 'product'}
                      labelRadio="가공품"
                      name="product"
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
                onClick={() => handleSubmitForm()}
              >
                등록
              </Button>
            </div>
          </>
        )}
        <ModalPrimary
          title="알림"
          content={popupConfirmApply.content}
          isOpen={popupConfirmApply.isShow}
          isShowCloseIco
          handleCloseIco={() => {
            setPopupConfirmApply({ isShow: false });
          }}
          handleClose={() => {
            history.push('/products');
          }}
          isProcessing={isProcessing}
        />
        <ModalPrimary
          title="알림"
          content={popupConfirmCancel.content}
          handleCloseIco={() => {
            setPopupConfirmCancel({ isShow: false });
          }}
          isOpen={popupConfirmCancel.isShow}
          isShowCloseIco
          textLeft="확인"
          textRight="취소"
          status
          handleClose={() => {
            history.push(`/products`);
          }}
          handleSubmit={() => setPopupConfirmCancel({ isShow: false })}
        />

        <ModalPrimary
          title="상품 이미지 선택"
          isConfirm
          isShowFooter={false}
          content={
            // eslint-disable-next-line react/jsx-wrap-multilines
            <ModalPopUpImage
              getImageCategory={getImageCategory}
              categoryId={category && category.value}
              imageList={imageList}
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
          title="등록 오류"
          isConfirm
          isShowFooter={false}
          content={errorServerRes}
          size="md"
          animation={false}
          isOpen={errorServerRes !== ''}
          handleClose={() => {
            setErrorServerRes('');
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
      </Container>
    </MainLayout>
  );
};

export default memo<Props>(RegisterProductForm);

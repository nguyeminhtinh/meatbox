/* eslint-disable react/jsx-wrap-multilines */
// @flow
// libs
import React, { useState, useRef, useEffect } from 'react';
import { Row, Col, Container } from 'react-bootstrap';
import ReactPaginate from 'react-paginate';
import Radio from 'components/Radio';
import Input from 'components/Input';
import InputChange from 'components/Input/InputChange';
import PrimaryButton from 'components/Button';
import TableData from 'components/Table';
import TitleHeader from 'components/TitleHeader';
import Loading from 'components/Loading';
import SelectDropdown from 'components/Select';
import ModalPrimary from 'components/Modal';
import ListConditions from 'constants/listCondition';
import { formatValue, validator } from 'utils/Validators';
import MainLayout from '../../../layout/MainLayout';
import TableMerchantSearch from '../Device/TableMerchantSearch';
import { headMaintenanceHistory } from '../../../constants/headerTable';
import ERROR_MESSAGE from '../../../constants/errorMsg';
import { Types } from '../../redux';

type Props = {
  checkDeviceByModel: Function,
  getMerchantByName: Function,
  merchantList: Array<{}>,
  getMerchantSelected: Function,
  isProcessing: boolean,
  getDeviceDetail: Function,
  deviceDetail: Object,
  maintenances: Array<{}>,
  updateDevice: Function,
  type: string,
  addMaintain: Function,
  message: String,
  handleResetType: Function,
  resetPassword: Function,
  history: {
    push: Function
  },
  match: {
    params: {
      id: any
    }
  },
  totalRows: number,
  isOpenNotify: boolean,
  notifyAccountDenied: Function
};

export const FormDetailDevice = ({
  checkDeviceByModel,
  getMerchantByName,
  getMerchantSelected,
  merchantList,
  isProcessing,
  getDeviceDetail,
  deviceDetail,
  maintenances,
  updateDevice,
  addMaintain,
  message,
  handleResetType,
  resetPassword,
  type,
  history,
  match,
  totalRows,
  isOpenNotify,
  notifyAccountDenied
}: Props) => {
  const [model, setModel] = useState(deviceDetail && deviceDetail.modelDevice);
  const [pageIndex, setPageIndex] = useState(0);
  const [frozen, setFrozen] = useState(
    deviceDetail && deviceDetail.statusDevice
  );

  const [listCondition, setListCondition] = useState(
    deviceDetail && deviceDetail.status
  );
  const [other, setOther] = useState(deviceDetail && deviceDetail.other);
  const [isOpenConfirmCheckDevice, setIsOpenConfirmCheckDevice] = useState(
    false
  );
  const [isResetPassword, setIsResetPassword] = useState(false);
  const [codeProductValue, setCodeProductValue] = useState({
    deviceCodeRef: deviceDetail && deviceDetail.deviceCodeRef,
    deviceTimeRef: deviceDetail && deviceDetail.deviceTimeRef,
    deviceOrderRef: deviceDetail && deviceDetail.deviceOrderRef
  });

  const handleResetPassword = () => {
    resetPassword(parseInt(match.params.id, 10));
  };

  useEffect(() => {
    setModel(deviceDetail && deviceDetail.modelDevice);
    setFrozen(deviceDetail && deviceDetail.statusDevice);
    setListCondition(deviceDetail && deviceDetail.status);
    setOther(deviceDetail && deviceDetail.other);
    setCodeProductValue({
      deviceCodeRef: deviceDetail && deviceDetail.deviceCodeRef,
      deviceTimeRef: deviceDetail && deviceDetail.deviceTimeRef,
      deviceOrderRef: deviceDetail && deviceDetail.deviceOrderRef
    });
  }, [deviceDetail]);
  useEffect(() => {
    const { id } = match.params;
    getDeviceDetail({ pageIndex: 1, numberRows: 10, id: parseInt(id, 10) });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [match.params.id]);

  useEffect(() => {
    if (isOpenNotify) {
      notifyAccountDenied();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpenNotify]);

  const handleSelectPagination = eventKey => {
    const { id } = match.params;
    getDeviceDetail({
      pageIndex: eventKey.selected + 1,
      numberRows: 10,
      id: parseInt(id, 10)
    });
    setPageIndex(eventKey.selected);
  };
  useEffect(() => {
    const { id } = match.params;
    switch (type) {
      case Types.CHECK_DEVICE_BY_MODEL_SUCCESS:
        setIsOpenConfirmCheckDevice(true);
        break;
      case Types.CHECK_DEVICE_BY_MODEL_FAILED:
        setIsOpenConfirmCheckDevice(true);
        break;
      case Types.RESET_PASSWORD_SUCCESS:
        setIsResetPassword(true);
        break;
      case Types.UPDATE_DEVICE_SUCCESS:
        history.push('/device');
        break;
      case Types.ADD_MAINTAIN_SUCCESS:
        getDeviceDetail({ pageIndex: 1, numberRows: 10, id: parseInt(id, 10) });
        setPageIndex(0);
        break;
      default:
        break;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [type]);

  const [isOpenModalMerchant, setIsOpenModalMerchant] = useState(false);
  const [isShowMess1, setIsShowMess1] = useState(false);
  const [isShowMess2, setIsShowMess2] = useState(false);
  const [isShowMess3, setIsShowMess3] = useState(false);
  const [isShowMess4, setIsShowMess4] = useState(false);
  const messError = {
    down1: '',
    up1: '',
    down2: '',
    up2: '',
    down3: '',
    up3: '',
    down4: '',
    up4: ''
  };

  const merchantNameRef = useRef('');
  const temperatureMinRef = useRef(1);
  const temperatureMaxRef = useRef(4);
  const temperatureMinRightRef = useRef(1);
  const temperatureMaxRightRef = useRef(4);
  const setTemperatureMinRef = useRef(1);
  const setTemperatureMaxRef = useRef(4);
  const setTemperatureMinRightRef = useRef(1);
  const setTemperatureMaxRightRef = useRef(4);
  const passwordRef = useRef('');
  const otherRef = useRef('');
  const inputContent = useRef(null);
  const deviceCodeRef = useRef(null);

  let deviceType = '';
  if (model === 'single') {
    deviceType = 'single';
  } else if (model === 'slim') {
    deviceType = 'slim';
  } else {
    deviceType = 'double';
  }

  let frozenType = '';
  if (frozen === 'frozen') {
    frozenType = 'frozen';
  } else {
    frozenType = 'cold';
  }

  let deviceStatus = '';
  if (listCondition === '사용중') {
    deviceStatus = 'use';
  } else {
    deviceStatus = 'stop';
  }

  // validate

  const nameDevice = merchantNameRef.current
    ? merchantNameRef.current.value
    : '';
  const deviceCode = `${
    deviceCodeRef.current ? deviceCodeRef.current.value : ''
  }-${codeProductValue.deviceTimeRef}-${codeProductValue.deviceOrderRef}`;
  const temperatureMin =
    temperatureMinRef.current && temperatureMinRef.current.value
      ? temperatureMinRef.current.value.toString().replace(/ºC/gi, '')
      : '';
  const temperatureMax =
    temperatureMaxRef.current && temperatureMaxRef.current.value
      ? temperatureMaxRef.current.value.toString().replace(/ºC/gi, '')
      : '';
  const temperatureMinRight =
    temperatureMinRightRef.current && temperatureMinRightRef.current.value
      ? temperatureMinRightRef.current.value.replace(/ºC/gi, '')
      : '';
  // const temperatureMinRight = 1;
  const temperatureMaxRight =
    temperatureMaxRightRef.current && temperatureMaxRightRef.current.value
      ? temperatureMaxRightRef.current.value.replace(/ºC/gi, '')
      : '';
  // const temperatureMaxRight = 5;
  const setTemperatureMin =
    setTemperatureMinRef.current && setTemperatureMinRef.current.value
      ? setTemperatureMinRef.current.value.toString().replace(/ºC/gi, '')
      : '';
  const setTemperatureMax =
    setTemperatureMaxRef.current && setTemperatureMaxRef.current.value
      ? setTemperatureMaxRef.current.value.toString().replace(/ºC/gi, '')
      : '';
  const setTemperatureMinRight =
    setTemperatureMinRightRef.current && setTemperatureMinRightRef.current.value
      ? setTemperatureMinRightRef.current.value.replace(/ºC/gi, '')
      : '';
  // const setTemperatureMinRight = 1;
  const setTemperatureMaxRight =
    setTemperatureMaxRightRef.current && setTemperatureMaxRightRef.current.value
      ? setTemperatureMaxRightRef.current.value.replace(/ºC/gi, '')
      : '';
  // const setTemperatureMaxRight = 5;
  const devicePassword = passwordRef.current ? passwordRef.current.value : '';
  const deviceMemo = otherRef.current ? otherRef.current.value : '';

  // end validate

  // Handle Check device Model
  const [errorDeviceCode, setErrorDeviceCode] = useState({});
  const rules = {
    deviceType: ['deviceType', 'required'],
    deviceTime: ['deviceTime', 'required'],
    deviceOrder: ['deviceOrder', 'required']
  };
  const handleCheckDeviceModel = () => {
    let validation: {
      deviceType?: string,
      deviceTime?: string,
      deviceOrder?: string
    } = {};

    const objSubmit = {
      deviceType: deviceCodeRef.current ? deviceCodeRef.current.value : '',
      deviceTime: codeProductValue.deviceTimeRef,
      deviceOrder: codeProductValue.deviceOrderRef
    };

    validation = validator(objSubmit, rules);

    if (Object.keys(validation).length > 0) {
      setErrorDeviceCode(validation);
      return;
    }
    setErrorDeviceCode({});
    const valueCheck = formatValue(
      'XXX-XXXX-XXXX',
      `${objSubmit.deviceType}${objSubmit.deviceTime}${objSubmit.deviceOrder}`
    );

    checkDeviceByModel(valueCheck);
  };

  const [textError, setTextError] = useState(messError);
  const [popupConfirm, setPopupConfirm] = useState({
    isShow: false,
    content: ''
  });
  const [popupCancel, setPopupCancel] = useState({
    isShow: false,
    content: ''
  });
  const clickCancel = () => {
    setPopupCancel({
      isShow: true,
      content: ERROR_MESSAGE.CANCEL_EDIT_DRIVE
    });
  };
  const clickModified = () => {
    setPopupConfirm({
      isShow: true,
      content: ERROR_MESSAGE.CONFIRM_EDIT_DRIVE
    });
  };
  const closePopupCancel = () => {
    setPopupCancel({
      ...popupCancel,
      isShow: false
    });
    // history.push('/device');
    setPopupConfirm({
      ...popupConfirm,
      isShow: false
    });
  };
  const handleError = (element, name) => {
    if (!element.value) {
      setTextError({
        ...textError,
        [name]: '온도값이 필수값입니다'
      });
    } else {
      setTextError({
        ...textError,
        [name]: ''
      });
    }
  };
  /**
   *
   * Add unit ºC
   */
  const formatUnit = unit => {
    const unitTem = unit;
    if (!Number.isNaN(Number.parseFloat(unitTem.value))) {
      unitTem.value = `${parseFloat(unitTem.value)}ºC`;
    } else {
      unitTem.value = '';
    }
  };
  /**
   *
   * Remove ºC
   */
  const removeUnit = unit => {
    const unitTem = unit;
    if (unitTem.value.includes('ºC')) {
      unitTem.value = unitTem.value.replace(/ºC/gi, '');
    }
  };

  /**
   *
   * Compare row 1 ºC
   */
  const functionCompare11 = temUp1 => {
    if (temUp1) {
      temperatureMinRef.current.value = `${parseInt(temUp1, 10) - 3}ºC`;
      if (parseInt(temUp1, 10) <= 18 && parseInt(temUp1, 10) >= -15) {
        setIsShowMess1(false);
      } else {
        setIsShowMess1(true);
      }
    }
  };
  const functionCompare22 = temUp2 => {
    if (temUp2) {
      temperatureMinRightRef.current.value = `${parseInt(temUp2, 10) - 3}ºC`;
      if (parseInt(temUp2, 10) <= 18 && parseInt(temUp2, 10) >= -15) {
        setIsShowMess2(false);
      } else {
        setIsShowMess2(true);
      }
    }
  };
  const functionCompare33 = temUp3 => {
    if (temUp3) {
      setTemperatureMinRef.current.value = `${parseInt(temUp3, 10) - 3}ºC`;
      if (parseInt(temUp3, 10) <= 18 && parseInt(temUp3, 10) >= -15) {
        setIsShowMess3(false);
      } else {
        setIsShowMess3(true);
      }
    }
  };

  const functionCompare44 = temUp4 => {
    if (temUp4) {
      setTemperatureMinRightRef.current.value = `${parseInt(temUp4, 10) - 3}ºC`;
      if (parseInt(temUp4, 10) <= 18 && parseInt(temUp4, 10) >= -15) {
        setIsShowMess4(false);
      } else {
        setIsShowMess4(true);
      }
    }
  };

  const handleOnBlur = (element, name) => {
    formatUnit(element);
    const temUp1 =
      temperatureMaxRef.current &&
      temperatureMaxRef.current.value &&
      temperatureMaxRef.current.value.toString().replace(/ºC/gi, '');
    const temUp2 =
      temperatureMaxRightRef.current &&
      temperatureMaxRightRef.current.value &&
      temperatureMaxRightRef.current.value.toString().replace(/ºC/gi, '');
    const temUp3 =
      setTemperatureMaxRef.current &&
      setTemperatureMaxRef.current.value &&
      setTemperatureMaxRef.current.value.toString().replace(/ºC/gi, '');
    const temUp4 =
      setTemperatureMaxRightRef.current &&
      setTemperatureMaxRightRef.current.value &&
      setTemperatureMaxRightRef.current.value.toString().replace(/ºC/gi, '');
    functionCompare22(temUp2);
    functionCompare11(temUp1);
    functionCompare33(temUp3);
    functionCompare44(temUp4);
    handleError(element, name);
    handleError(element, name);
  };

  // create maintain
  const handleCreateMaintain = e => {
    const { id } = match.params;
    const dataCreate = {
      deviceId: parseInt(id, 10),
      content: inputContent.current ? inputContent.current.value : ''
    };
    if (dataCreate.content.trim() === '') {
      e.preventDefault();
    } else {
      addMaintain(dataCreate);
    }
  };

  /**
   * Handle Update device
   */
  const handleSubmitForm = () => {
    /**
     * Data update
     */

    const rulesValidate = {
      password: ['validatePass'],
      deviceType: ['deviceType', 'required'],
      deviceTime: ['deviceTime', 'required'],
      deviceOrder: ['deviceOrder', 'required']
    };
    let validationPass = {};
    const tem1 = temperatureMin ? parseInt(temperatureMin, 10) : 1;
    const tem2 = temperatureMax ? parseInt(temperatureMax, 10) : 5;
    const tem3 = temperatureMinRight ? parseInt(temperatureMinRight, 10) : 1;
    const tem4 = temperatureMaxRight ? parseInt(temperatureMaxRight, 10) : 5;
    const tem5 = setTemperatureMin ? parseInt(setTemperatureMin, 10) : 1;
    const tem6 = setTemperatureMax ? parseInt(setTemperatureMax, 10) : 5;
    const tem7 = setTemperatureMinRight
      ? parseInt(setTemperatureMinRight, 10)
      : 1;
    const tem8 = setTemperatureMaxRight
      ? parseInt(setTemperatureMaxRight, 10)
      : 5;
    const dataForm = {
      deviceType,
      frozenType,
      deviceCode,
      temperatureMin: tem1,
      temperatureMax: tem2,
      temperatureMinRight: tem3,
      temperatureMaxRight: tem4,
      setTemperatureMin: tem5,
      setTemperatureMax: tem6,
      setTemperatureMinRight: tem7,
      setTemperatureMaxRight: tem8,
      devicePassword,
      deviceStatus,
      deviceMemo,
      storeId: deviceDetail.storeId,
      contents: ''
    };

    const dataValidate = {
      deviceType: deviceCodeRef.current ? deviceCodeRef.current.value : '',
      deviceTime: codeProductValue.deviceTimeRef,
      deviceOrder: codeProductValue.deviceOrderRef
    };
    validationPass = validator(dataValidate, rulesValidate);
    if (Object.keys(validationPass).length > 0) {
      setErrorDeviceCode(validationPass);
      setPopupConfirm({
        ...popupConfirm,
        isShow: false
      });
      return;
    }
    if (Types.CHECK_DEVICE_BY_MODEL_SUCCESS) {
      const { id } = match.params;
      updateDevice(parseInt(id, 10), dataForm);
    }
    setPopupConfirm({
      ...popupConfirm,
      isShow: false
    });
  };

  const handleChangeInput = (value, name) => {
    switch (name) {
      default:
        setCodeProductValue({
          ...codeProductValue,
          [name]: value
        });
        break;
    }
  };

  return (
    <>
      <ModalPrimary
        title="가맹점 선택"
        size="lg"
        content={
          <TableMerchantSearch
            getMerchantByName={getMerchantByName}
            merchantName={nameDevice}
            merchantList={merchantList}
            getMerchantSelected={getMerchantSelected}
            isShowId
          />
        }
        animation={false}
        isOpen={isOpenModalMerchant}
        handleClose={() => {
          setIsOpenModalMerchant(false);
        }}
      />
      <MainLayout>
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
          <Container fluid className="pb-3 home-main">
            <Row>
              <Col xs={12}>
                <div className="register-device">
                  <div className="wrapper__info ">
                    <div className="reset-password">
                      <TitleHeader title="기기정보" />
                      <PrimaryButton
                        type="button"
                        variant="primary"
                        onClick={handleResetPassword}
                      >
                        키오스크 비밀번호 초기화
                      </PrimaryButton>
                    </div>
                    <Row className="row__custom">
                      <div className="col-md-3 py-2 d-flex align-items-center">
                        <div className="title">
                          기기모델명
                          <span>*</span>
                        </div>
                      </div>
                      <div className="col-md-9 py-2">
                        <div className="d-flex">
                          <Radio
                            name="model"
                            labelRadio="싱글"
                            isChecked={model === 'single'}
                            id="modelSingle"
                            onChange={() => {
                              setModel('single');
                            }}
                          />
                          <Radio
                            name="model"
                            labelRadio="슬림"
                            isChecked={model === 'slim'}
                            id="modelSlim"
                            onChange={() => {
                              setModel('slim');
                            }}
                          />
                          <Radio
                            name="model"
                            labelRadio="더블"
                            isChecked={model === 'double'}
                            id="modelDouble"
                            onChange={() => {
                              setModel('double');
                            }}
                          />
                        </div>
                      </div>
                    </Row>
                    <Row className="row__custom">
                      <div className="col-md-3 py-2 d-flex align-items-center">
                        <div className="title">
                          기기 식별 코드
                          <span>*</span>
                        </div>
                      </div>
                      <div className="col-md-9 py-2 ">
                        <div className="row">
                          <div className="col-12 col-md-3 ">
                            {model === 'single' && (
                              <Input
                                innerRef={deviceCodeRef}
                                value="MB0"
                                readOnly
                              />
                            )}
                            {model === 'slim' && (
                              <Input
                                innerRef={deviceCodeRef}
                                value="MB1"
                                readOnly
                              />
                            )}
                            {model === 'double' && (
                              <Input
                                innerRef={deviceCodeRef}
                                value="MB2"
                                readOnly
                              />
                            )}
                          </div>
                          <span className="d-none d-md-block">-</span>
                          <div className="col-12 col-md-3 line-space mt-3 mt-md-0">
                            <InputChange
                              onChange={e =>
                                handleChangeInput(e, 'deviceTimeRef')
                              }
                              value={
                                codeProductValue &&
                                codeProductValue.deviceTimeRef
                              }
                              errorMsg={errorDeviceCode.deviceTime}
                              maxLength="4"
                              onFocus={() => {
                                setErrorDeviceCode({
                                  ...errorDeviceCode,
                                  deviceTime: ''
                                });
                              }}
                            />
                          </div>
                          <span className="d-none d-md-block">-</span>
                          <div className="col-12 col-md-3 mt-3 mt-md-0">
                            <InputChange
                              onChange={e =>
                                handleChangeInput(e, 'deviceOrderRef')
                              }
                              value={
                                codeProductValue &&
                                codeProductValue.deviceOrderRef
                              }
                              errorMsg={errorDeviceCode.deviceOrder}
                              maxLength="4"
                              onFocus={() => {
                                setErrorDeviceCode({
                                  ...errorDeviceCode,
                                  deviceOrder: ''
                                });
                              }}
                            />
                          </div>
                          <div className="col-12 col-md-2 mt-3 mt-md-0">
                            <PrimaryButton
                              type="button"
                              variant="secondary btn-custom"
                              onClick={handleCheckDeviceModel}
                              // disabled
                            >
                              중복 확인
                            </PrimaryButton>
                          </div>
                        </div>
                      </div>
                    </Row>
                    <Row className="row__custom">
                      <div className="col-md-3 py-2 d-flex align-items-center">
                        <div className="title">
                          냉동/냉장
                          <span>*</span>
                        </div>
                      </div>
                      <div className="col-md-9 py-2">
                        <div className="d-flex">
                          <Radio
                            name="frozen"
                            labelRadio="냉동"
                            isChecked={frozen === 'frozen'}
                            id="frozen"
                            onChange={() => {
                              setFrozen('frozen');
                            }}
                          />
                          <Radio
                            name="frozen"
                            labelRadio="냉장"
                            isChecked={frozen === 'cold'}
                            id="cold"
                            onChange={() => {
                              setFrozen('cold');
                            }}
                          />
                        </div>
                      </div>
                    </Row>
                    <Row className="row__custom">
                      <div className="col-md-3 py-2 d-flex align-items-center">
                        <div className="title">
                          매장명
                          <span>*</span>
                        </div>
                      </div>
                      <div className="col-md-9 py-2">
                        <div className="row">
                          <div className="col-12 col-md-6">
                            <Input
                              value={deviceDetail && deviceDetail.nameStore}
                              disabled
                            />
                          </div>
                        </div>
                      </div>
                    </Row>
                    <Row className="row__custom">
                      <div className="col-md-3 py-2 d-flex align-items-center">
                        <div className="title">매장 전화번호</div>
                      </div>
                      <div className="col-md-9 py-2">
                        <div className="row">
                          <div className="col-12 col-md-3">
                            <Input
                              value={
                                deviceDetail &&
                                deviceDetail.phone &&
                                deviceDetail.phone.slice(0, 3)
                              }
                              disabled
                            />
                          </div>
                          <span className="d-none d-md-block">-</span>
                          <div className="col-12 col-md-3 mt-3 mt-md-0">
                            <Input
                              value={
                                deviceDetail &&
                                deviceDetail.phone &&
                                deviceDetail.phone.slice(3, 7)
                              }
                              disabled
                            />
                          </div>
                          <span className="d-none d-md-block">-</span>
                          <div className="col-12 col-md-3 mt-3 mt-md-0">
                            <Input
                              value={
                                deviceDetail &&
                                deviceDetail.phone &&
                                deviceDetail.phone.slice(7, 11)
                              }
                              disabled
                            />
                          </div>
                        </div>
                      </div>
                    </Row>
                    <Row className="row__custom">
                      <div className="col-md-3 py-2 d-flex align-items-center">
                        <div className="title">매장주소</div>
                      </div>
                      <div className="col-md-9 py-2">
                        <div className="row">
                          <div className="col-6 col-sm-5">
                            <Input
                              value={deviceDetail && deviceDetail.address}
                              disabled
                            />
                          </div>
                          <div className="col-6 col-sm-5">
                            <Input
                              onChange={() => {}}
                              value={deviceDetail && deviceDetail.layer}
                              disabled
                            />
                          </div>
                        </div>
                      </div>
                    </Row>
                    <Row className="row__custom">
                      <div className="col-md-3 py-2 d-flex align-items-center">
                        <div className="title"> 표시온도</div>
                      </div>
                      <div className="col-md-9 py-2">
                        <Row>
                          <div className="col-12 col-sm-8 temperature">
                            <div className="row">
                              <div className="col-12 col-sm-6 d-flex ">
                                <div className="title mr-2 double-label mt-2">
                                  {model === 'double' && <b>좌 &nbsp;</b>}
                                  최저온도
                                </div>
                                <Input
                                  value={
                                    deviceDetail &&
                                    deviceDetail.temperatureDown1
                                  }
                                  onBlur={e =>
                                    handleOnBlur(e.currentTarget, 'down1')
                                  }
                                  onFocus={e => removeUnit(e.currentTarget)}
                                  innerRef={temperatureMinRef}
                                  customClassName={textError.down1 ? 'red' : ''}
                                  errorMsg={textError.down1}
                                  disabled
                                />
                              </div>
                              <div className="col-12 col-sm-6 d-flex  mt-3 mt-md-0">
                                <div className="title mr-2 double-label mt-2">
                                  최고온도
                                </div>
                                <Input
                                  value={
                                    deviceDetail && deviceDetail.temperatureUp1
                                  }
                                  onBlur={e =>
                                    handleOnBlur(e.currentTarget, 'up1')
                                  }
                                  onFocus={e => removeUnit(e.currentTarget)}
                                  innerRef={temperatureMaxRef}
                                  customClassName={textError.up1 ? 'red' : ''}
                                  errorMsg={textError.up1}
                                />
                              </div>

                              {model === 'double' && (
                                <>
                                  <div className="col-12 col-sm-6 d-flex mt-2">
                                    <div className="title mr-2 double-label mt-2">
                                      <b>우 &nbsp;</b>
                                      최저온도
                                    </div>
                                    <Input
                                      value={
                                        deviceDetail &&
                                        deviceDetail.temperatureDown3
                                      }
                                      disabled
                                      onBlur={e =>
                                        handleOnBlur(e.currentTarget, 'down3')
                                      }
                                      onFocus={e => removeUnit(e.currentTarget)}
                                      innerRef={temperatureMinRightRef}
                                      customClassName={
                                        textError.down3 ? 'red' : ''
                                      }
                                      errorMsg={textError.down3}
                                    />
                                  </div>
                                  <div className="col-12 col-sm-6 d-flex mt-2">
                                    <div className="title mr-2 double-label mt-2">
                                      최고온도
                                    </div>
                                    <Input
                                      value={
                                        deviceDetail &&
                                        deviceDetail.temperatureUp3
                                      }
                                      disabled={!model === 'double'}
                                      onBlur={e =>
                                        handleOnBlur(e.currentTarget, 'up3')
                                      }
                                      onFocus={e => removeUnit(e.currentTarget)}
                                      innerRef={temperatureMaxRightRef}
                                      customClassName={
                                        textError.up3 ? 'red' : ''
                                      }
                                      errorMsg={textError.up3}
                                    />
                                  </div>
                                </>
                              )}
                            </div>
                          </div>
                          <div className="col-12 col-sm-4 d-flex align-items-center">
                            <div>
                              <div className="text-error pt-mobile">
                                ※ 최저온도와 최고온도의 온도차는 3º입니다.
                              </div>

                              {(isShowMess1 || isShowMess2) && (
                                <div className="text-error pt-mobile">
                                  ※ 18ºc내에서 입력해주세요.
                                </div>
                              )}
                            </div>
                          </div>
                        </Row>
                      </div>
                    </Row>
                    <Row className="row__custom">
                      <div className="col-md-3 py-2 d-flex align-items-center">
                        <div className="title"> 설정온도</div>
                      </div>
                      <div className="col-md-9 py-2">
                        <Row>
                          <div className="col-12 col-sm-8 temperature">
                            <div className="row">
                              <div className="col-12 col-sm-6 d-flex mt-2">
                                <div className="title mr-2 double-label mt-2">
                                  최저온도
                                </div>
                                <Input
                                  value={
                                    deviceDetail &&
                                    deviceDetail.temperatureDown2
                                  }
                                  disabled
                                  onBlur={e =>
                                    handleOnBlur(e.currentTarget, 'down2')
                                  }
                                  onFocus={e => removeUnit(e.currentTarget)}
                                  innerRef={setTemperatureMinRef}
                                  customClassName={textError.down2 ? 'red' : ''}
                                  errorMsg={textError.down2}
                                />
                              </div>
                              <div className="col-12 col-sm-6 d-flex mt-2">
                                <div className="title mr-2 double-label mt-2">
                                  최고온도
                                </div>
                                <Input
                                  value={
                                    deviceDetail && deviceDetail.temperatureUp2
                                  }
                                  disabled={!model === 'double'}
                                  onBlur={e =>
                                    handleOnBlur(e.currentTarget, 'up2')
                                  }
                                  onFocus={e => removeUnit(e.currentTarget)}
                                  innerRef={setTemperatureMaxRef}
                                  customClassName={textError.up2 ? 'red' : ''}
                                  errorMsg={textError.up2}
                                />
                              </div>

                              {model === 'double' && (
                                <>
                                  <div className="col-12 col-sm-6 d-flex mt-2">
                                    <div className="title mr-2 double-label mt-2">
                                      <b>우 &nbsp;</b>
                                      최저온도
                                    </div>
                                    <Input
                                      value={
                                        deviceDetail &&
                                        deviceDetail.temperatureDown4
                                      }
                                      onBlur={e =>
                                        handleOnBlur(e.currentTarget, 'down4')
                                      }
                                      onFocus={e => removeUnit(e.currentTarget)}
                                      innerRef={setTemperatureMinRightRef}
                                      customClassName={
                                        textError.down4 ? 'red' : ''
                                      }
                                      errorMsg={textError.down4}
                                      disabled
                                    />
                                  </div>
                                  <div className="col-12 col-sm-6 d-flex mt-2">
                                    <div className="title mr-2 double-label mt-2">
                                      최고온도
                                    </div>
                                    <Input
                                      value={
                                        deviceDetail &&
                                        deviceDetail.temperatureUp4
                                      }
                                      onBlur={e =>
                                        handleOnBlur(e.currentTarget, 'up4')
                                      }
                                      onFocus={e => removeUnit(e.currentTarget)}
                                      innerRef={setTemperatureMaxRightRef}
                                      customClassName={
                                        textError.up4 ? 'red' : ''
                                      }
                                      errorMsg={textError.up4}
                                    />
                                  </div>
                                </>
                              )}
                            </div>
                          </div>
                          <div className="col-12 col-sm-4 d-flex align-items-center">
                            <div>
                              <div className="text-error pt-mobile">
                                ※ 최저온도와 최고온도의 온도차는 3º입니다.
                              </div>

                              {(isShowMess3 || isShowMess4) && (
                                <div className="text-error pt-mobile">
                                  ※ 18ºc내에서 입력해주세요.
                                </div>
                              )}
                            </div>
                          </div>
                        </Row>
                      </div>
                    </Row>
                    <Row className="row__custom">
                      <div className="col-md-3 py-2 d-flex align-items-center">
                        <div className="title">상태</div>
                      </div>
                      <div className="col-md-6 py-2">
                        <SelectDropdown
                          value={listCondition}
                          placeholder="전체"
                          listItem={ListConditions}
                          onChange={option => {
                            setListCondition(option.value);
                          }}
                          noOptionsMessage={() => '옵션 없음'}
                        />
                      </div>
                    </Row>
                    <Row className="row__custom">
                      <div className="col-md-3 py-2 d-flex align-items-center">
                        <div className="title">기타 특이사항</div>
                      </div>
                      <div className="col-md-9 py-2">
                        <textarea
                          className="form-control"
                          rows="4"
                          ref={otherRef}
                          value={other}
                          onChange={() => {
                            setOther();
                          }}
                        />
                      </div>
                    </Row>
                  </div>
                  <Row className="py-3">
                    <Col className="d-flex justify-content-end button-custom">
                      <PrimaryButton
                        type="button"
                        variant="secondary"
                        onClick={() => {
                          clickCancel();
                        }}
                      >
                        취소
                      </PrimaryButton>
                      <PrimaryButton
                        type="button"
                        variant="secondary"
                        onClick={() => {
                          clickModified();
                        }}
                        disabled={
                          isShowMess1 ||
                          isShowMess2 ||
                          isShowMess3 ||
                          isShowMess4
                        }
                      >
                        수정
                      </PrimaryButton>
                    </Col>
                  </Row>
                  <h5 className="title-custom">유지보수이력</h5>
                  {/* <MaintenanceHistory /> */}
                  <div className="register-device__maintenance-history w-100">
                    <Row>
                      <Col xs={12}>
                        <TableData
                          tableHeads={headMaintenanceHistory}
                          tableBody={maintenances}
                          isShowId
                        />
                      </Col>
                    </Row>
                    <div className="form-update">
                      <Input
                        onChange={() => {}}
                        className="input-update"
                        innerRef={inputContent}
                      />
                      <PrimaryButton
                        type="button"
                        size="md"
                        variant="secondary"
                        onClick={handleCreateMaintain}
                      >
                        등록
                      </PrimaryButton>
                    </div>
                  </div>
                </div>
              </Col>
            </Row>
            {/* Popup register */}
            <ModalPrimary
              title="알림"
              content={popupConfirm.content}
              isOpen={popupConfirm.isShow}
              handleCloseIco={() => {
                closePopupCancel();
              }}
              isShowCloseIco
              handleClose={() => {
                handleSubmitForm();
              }}
            />
            {/* Popup cancel register */}
            <ModalPrimary
              title="알림"
              content={popupCancel.content}
              isOpen={popupCancel.isShow}
              handleCloseIco={() => {
                closePopupCancel();
              }}
              isShowCloseIco
              handleClose={() => {
                closePopupCancel();
                history.push('/device');
              }}
            />
            {/* Popup Confirm Check Code */}
            <ModalPrimary
              title="알림"
              content={message}
              isOpen={isOpenConfirmCheckDevice}
              handleClose={() => {
                setIsOpenConfirmCheckDevice(false);
                handleResetType();
              }}
            />
            {/* Popup resetPassword */}
            <ModalPrimary
              title="알림"
              content="비밀번호는 초기화 되었습니다"
              isOpen={isResetPassword}
              handleClose={() => {
                setIsResetPassword(false);
                history.push('/device');
              }}
            />
          </Container>
        )}
        {totalRows > 10 && (
          <Col sm={12} className="wrapper-pagination">
            <ReactPaginate
              previousLabel="←"
              nextLabel="→"
              breakLabel={<span className="gap">...</span>}
              pageCount={Math.ceil(totalRows / 10)}
              onPageChange={eventKey => handleSelectPagination(eventKey)}
              forcePage={pageIndex}
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

export default FormDetailDevice;

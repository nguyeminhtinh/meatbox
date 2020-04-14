/* eslint-disable react/jsx-wrap-multilines */
// @flow
// libs
import React, { useState, useRef, useEffect } from 'react';
import { Row, Col, Container } from 'react-bootstrap';
import Radio from 'components/Radio';
import Input from 'components/Input';
// import InputChange from 'components/Input/InputChange';
import PrimaryButton from 'components/Button';
import TitleHeader from 'components/TitleHeader';
import { formatValueTemperature } from 'utils/helpers';
import ModalPrimary from 'components/Modal';
import { formatValue, validator } from 'utils/Validators';
import MainLayout from '../../../layout/MainLayout';
import TableMerchantSearch from '../Device/TableMerchantSearch';
import ERROR_MESSAGE from '../../../constants/errorMsg';
import { Types } from '../../redux';

type Props = {
  checkDeviceByModel: Function,
  isProcessing: boolean,
  storeList: Array<{}>,
  type: string,
  message: string,
  handleResetType: Function,
  getStoresByName: Function,
  addDevice: Function,
  history: {
    push: Function
  },
  isOpenNotify: boolean,
  notifyAccountDenied: Function
};

export const FormRegisterDevice = ({
  checkDeviceByModel,
  storeList,
  type,
  message,
  handleResetType,
  getStoresByName,
  addDevice,
  history,
  isProcessing,
  isOpenNotify,
  notifyAccountDenied
}: Props) => {
  const [model, setModel] = useState('single');
  const [frozen, setFrozen] = useState('frozen');
  const [isOpenModalMerchant, setIsOpenModalMerchant] = useState(false);
  const [isOpenConfirmCheckDevice, setIsOpenConfirmCheckDevice] = useState(
    false
  );
  const [merchantSelected, getMerchantSelected] = useState({});
  const [errorDeviceCode, setErrorDeviceCode] = useState({});
  const [errorDataSubmit, setErrorDataSubmit] = useState({});

  const [isShowMess1, setIsShowMess1] = useState(false);
  const [isShowMess2, setIsShowMess2] = useState(false);
  const [isShowMess3, setIsShowMess3] = useState(false);
  const [isShowMess4, setIsShowMess4] = useState(false);
  const [storeName, setStoreName] = useState('');
  const [storeObj, setStoreObj] = useState({});
  const messError = {
    down1: '',
    up1: '',
    down2: '',
    up2: '',
    down3: '',
    up3: '',
    down4: '',
    up4: ''
    // confirmPassword: ''
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

  // const [isClass, setIsClass] = useState({
  //   classOff: 'd-none',
  //   classStar: 'd-block',
  //   classOffCom: 'd-none',
  //   classStarCom: 'd-block'
  // });

  // const [valueDefault, setValueDefault] = useState({
  //   password: '',
  //   passwordHide: '',
  //   confirmPassword: '',
  //   confirmPasswordHide: ''
  // });

  const clickCancel = () => {
    setPopupCancel({
      isShow: true,
      content: ERROR_MESSAGE.CANCEL_EDIT_DRIVE
    });
  };
  const closePopupCancel = () => {
    setPopupCancel({
      ...popupCancel,
      isShow: false
    });
    setPopupConfirm({
      ...popupConfirm,
      isShow: false
    });
  };

  useEffect(() => {
    switch (type) {
      case Types.CHECK_DEVICE_BY_MODEL_SUCCESS:
        setIsOpenConfirmCheckDevice(true);
        break;
      case Types.CHECK_DEVICE_BY_MODEL_FAILED:
        setIsOpenConfirmCheckDevice(true);
        break;
      case Types.ADD_DEVICE_SUCCESS:
        setIsOpenConfirmCheckDevice(false);
        setPopupCancel({
          ...popupCancel,
          content: '등록되었습니다.',
          isShow: true
        });
        break;
      default:
        break;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [type]);

  useEffect(() => {
    if (isOpenNotify) {
      notifyAccountDenied();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpenNotify]);

  /**
   * Example MB0-1942-0001
   * MB meatbox
   * 0 = Slim 1 = Single 2 = Double
   * 1942 (Week 42 of 2019)
   * 0001 the order device
   */
  const deviceTypeRef = useRef(null);
  const deviceTimeRef = useRef(null);
  const deviceOrderRef = useRef(null);
  const minTemperatureRef = useRef(1);
  const maxTemperatureRef = useRef(4);
  const minTemperatureSecondRef = useRef(1);
  const maxTemperatureSecondRef = useRef(4);

  const minTemperatureThirdRef = useRef(1);
  const maxTemperatureThirdRef = useRef(4);
  const minTemperatureFourRef = useRef(1);
  const maxTemperatureFourRef = useRef(4);
  const otherRef = useRef('');

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
      deviceType: deviceTypeRef.current ? deviceTypeRef.current.value : '',
      deviceTime: deviceTimeRef.current ? deviceTimeRef.current.value : '',
      deviceOrder: deviceOrderRef.current ? deviceOrderRef.current.value : ''
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
  const handleSearchMerchantByName = () => {
    setIsOpenModalMerchant(true);
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
      minTemperatureRef.current.value = `${parseInt(temUp1, 10) - 3}ºC`;
      if (parseInt(temUp1, 10) <= 18 && parseInt(temUp1, 10) >= -15) {
        setIsShowMess1(false);
      } else {
        setIsShowMess1(true);
      }
    }
  };
  const functionCompare22 = temUp2 => {
    if (temUp2) {
      minTemperatureSecondRef.current.value = `${parseInt(temUp2, 10) - 3}ºC`;
      if (parseInt(temUp2, 10) <= 18 && parseInt(temUp2, 10) >= -15) {
        setIsShowMess2(false);
      } else {
        setIsShowMess2(true);
      }
    }
  };
  const functionCompare33 = temUp3 => {
    if (temUp3) {
      minTemperatureThirdRef.current.value = `${parseInt(temUp3, 10) - 3}ºC`;
      if (parseInt(temUp3, 10) <= 18 && parseInt(temUp3, 10) >= -15) {
        setIsShowMess3(false);
      } else {
        setIsShowMess3(true);
      }
    }
  };

  const functionCompare44 = temUp4 => {
    if (temUp4) {
      minTemperatureFourRef.current.value = `${parseInt(temUp4, 10) - 3}ºC`;
      if (parseInt(temUp4, 10) <= 18 && parseInt(temUp4, 10) >= -15) {
        setIsShowMess4(false);
      } else {
        setIsShowMess4(true);
      }
    }
  };
  /**
   *
   * Compare row 2 Set Temperature ºC
   */

  const handleOnBlur = (element, name) => {
    formatUnit(element);
    const temUp1 =
      maxTemperatureRef.current &&
      maxTemperatureRef.current.value &&
      maxTemperatureRef.current.value.toString().replace(/ºC/gi, '');
    const temUp2 =
      maxTemperatureSecondRef.current &&
      maxTemperatureSecondRef.current.value &&
      maxTemperatureSecondRef.current.value.toString().replace(/ºC/gi, '');
    const temUp3 =
      maxTemperatureThirdRef.current &&
      maxTemperatureThirdRef.current.value.toString().replace(/ºC/gi, '');
    const temUp4 =
      maxTemperatureFourRef.current &&
      maxTemperatureFourRef.current.value &&
      maxTemperatureFourRef.current.value.toString().replace(/ºC/gi, '');
    functionCompare22(temUp2);
    functionCompare11(temUp1);
    functionCompare33(temUp3);
    functionCompare44(temUp4);
    handleError(element, name);
  };

  /**
   * Handle regiter device
   */
  /**
   * Data update
   */
  const deviceType = deviceTypeRef.current ? deviceTypeRef.current.value : '';
  const deviceTime = deviceTimeRef.current ? deviceTimeRef.current.value : '';
  const deviceOrder = deviceOrderRef.current
    ? deviceOrderRef.current.value
    : '';

  const temDown1 =
    minTemperatureRef.current && minTemperatureRef.current.value
      ? minTemperatureRef.current.value
      : '';
  const temUp1 =
    maxTemperatureRef.current && maxTemperatureRef.current.value
      ? maxTemperatureRef.current.value
      : '';
  const temDown2 =
    minTemperatureSecondRef.current && minTemperatureSecondRef.current.value
      ? minTemperatureSecondRef.current.value
      : '';
  const temUp2 =
    maxTemperatureSecondRef.current && maxTemperatureSecondRef.current.value
      ? maxTemperatureSecondRef.current.value
      : '';
  const temDown3 =
    minTemperatureThirdRef.current && minTemperatureThirdRef.current.value
      ? minTemperatureThirdRef.current.value
      : '';
  const temUp3 =
    maxTemperatureThirdRef.current && maxTemperatureThirdRef.current.value
      ? maxTemperatureThirdRef.current.value
      : '';
  const temDown4 =
    minTemperatureFourRef.current && minTemperatureFourRef.current.value
      ? minTemperatureFourRef.current.value
      : '';
  const temUp4 =
    maxTemperatureFourRef.current && maxTemperatureFourRef.current.value
      ? maxTemperatureFourRef.current.value
      : '';
  // const deviceMemo = otherRef.current ? otherRef.current.value : '';
  const handleSubmitForm = () => {
    let validation = {};
    const ruleDevices = {
      address: ['required'],
      frozenType: ['frozenType', 'required'],
      phone: ['required'],
      deviceType: ['deviceType', 'required'],
      deviceTime: ['deviceTime', 'required'],
      deviceOrder: ['deviceOrder', 'required']
      // devicePassword: ['required', 'validatePass'],
      // confirmPassword: ['required']
    };

    const dataSubmitValidate = {
      deviceType: deviceTypeRef.current ? deviceTypeRef.current.value : '',
      deviceTime: deviceTimeRef.current ? deviceTimeRef.current.value : '',
      deviceOrder: deviceOrderRef.current ? deviceOrderRef.current.value : '',
      frozenType: frozen,
      phone: merchantSelected && merchantSelected.phone,
      address: merchantSelected && merchantSelected.address
      // devicePassword: valueDefault.password,
      // confirmPassword: valueDefault.confirmPassword
    };

    const dataSubmit = {
      address: merchantSelected && merchantSelected.address,
      contents: '',
      deviceCode: formatValue(
        'XXX-XXXX-XXXX',
        `${deviceType}${deviceTime}${deviceOrder}`
      ),
      deviceMemo: otherRef.current.value,
      devicePassword: `fs${merchantSelected.businessReg}`,
      deviceStatus: 'use',
      deviceType: model,
      frozenType: frozen,
      phone: merchantSelected && merchantSelected.phone,
      setTemperatureMin: temDown3
        ? parseInt(formatValueTemperature(temDown3), 10)
        : 1,
      setTemperatureMax: temUp3
        ? parseInt(formatValueTemperature(temUp3), 10)
        : 5,
      setTemperatureMinRight: temDown2
        ? parseInt(formatValueTemperature(temDown2), 10)
        : 1,
      setTemperatureMaxRight: temUp2
        ? parseInt(formatValueTemperature(temUp2), 10)
        : 5,
      temperatureMax: temUp1 ? parseInt(formatValueTemperature(temUp1), 10) : 5,
      temperatureMaxRight: temUp4
        ? parseInt(formatValueTemperature(temUp4), 10)
        : 5,
      temperatureMin: temDown1
        ? parseInt(formatValueTemperature(temDown1), 10)
        : 1,
      temperatureMinRight: temDown4
        ? parseInt(formatValueTemperature(temDown4), 10)
        : 1,
      storeId: merchantSelected.id,
      userId: parseInt(storeObj.userId, 10)
    };

    validation = validator(dataSubmitValidate, ruleDevices);
    if (Object.keys(validation).length > 0) {
      setErrorDataSubmit(validation);
      return;
    }
    setErrorDataSubmit({});

    handleCheckDeviceModel();
    if (Types.CHECK_DEVICE_BY_MODEL_SUCCESS) {
      addDevice(dataSubmit);
    }
    setPopupConfirm({
      ...popupConfirm,
      isShow: false
    });
  };

  const handleSelectStore = store => {
    getMerchantSelected(store);
    setStoreName(store.name);
    setStoreObj(store);
    setErrorDataSubmit({
      ...errorDataSubmit,
      address: '',
      phone: ''
    });
  };
  // const handleChangeInput = (value, name) => {
  //   const passwordFirst = value && value.slice(0, 1);
  //   let star = '';
  //   switch (name) {
  //     case 'password':
  //       for (let i = 0; i < value.length; i += 1) {
  //         if (i > 0) {
  //           star += '●';
  //         }
  //       }
  //       setValueDefault({
  //         ...valueDefault,
  //         password: value,
  //         passwordHide: passwordFirst + star
  //       });
  //       break;
  //     case 'confirmPassword':
  //       for (let i = 0; i < value.length; i += 1) {
  //         if (i > 0) {
  //           star += '●';
  //         }
  //       }
  //       setValueDefault({
  //         ...valueDefault,
  //         confirmPassword: value,
  //         confirmPasswordHide: passwordFirst + star
  //       });
  //       break;
  //     default:
  //       break;
  //   }
  // };
  // const handleChangeStar = name => {
  //   switch (name) {
  //     case 'password':
  //       setIsClass({
  //         ...isClass,
  //         classStar: 'd-none',
  //         classOff: 'd-block'
  //       });
  //       break;
  //     case 'confirmPassword':
  //       setIsClass({
  //         ...isClass,
  //         classStarCom: 'd-none',
  //         classOffCom: 'd-block'
  //       });
  //       break;
  //     default:
  //       break;
  //   }
  // };

  // const handleChangeBlur = name => {
  //   const { password, confirmPassword } = valueDefault;
  //   switch (name) {
  //     case 'password':
  //       setIsClass({
  //         ...isClass,
  //         classStar: 'd-block',
  //         classOff: 'd-none'
  //       });
  //       break;
  //     case 'confirmPassword':
  //       setIsClass({
  //         ...isClass,
  //         classStarCom: 'd-block',
  //         classOffCom: 'd-none'
  //       });
  //       break;
  //     default:
  //       break;
  //   }
  //   if (confirmPassword && password !== confirmPassword) {
  //     setTextError({
  //       ...textError,
  //       confirmPassword: '※ 입력한 비밀번호가 맞지 않습니다.'
  //     });
  //   } else {
  //     setTextError({
  //       ...textError,
  //       confirmPassword: ''
  //     });
  //   }
  // };
  // const handleChangeOff = name => {
  //   switch (name) {
  //     case 'password':
  //       setIsClass({
  //         ...isClass,
  //         classStar: 'd-none',
  //         classOff: 'd-block'
  //       });
  //       setTextError({
  //         ...textError,
  //         password: ''
  //       });
  //       setErrorDataSubmit({
  //         ...errorDataSubmit,
  //         devicePassword: ''
  //       });
  //       break;
  //     case 'confirmPassword':
  //       setIsClass({
  //         ...isClass,
  //         classStarCom: 'd-none',
  //         classOffCom: 'd-block'
  //       });
  //       setErrorDataSubmit({
  //         ...errorDataSubmit,
  //         confirmPassword: ''
  //       });
  //       break;
  //     default:
  //       break;
  //   }
  // };

  return (
    <MainLayout>
      <ModalPrimary
        title="매장 선택"
        size="lg"
        content={
          <TableMerchantSearch
            getStoresByName={getStoresByName}
            storeName={storeName}
            storeList={storeList}
            getMerchantSelected={handleSelectStore}
            isProcessing={isProcessing}
          />
        }
        animation={false}
        isOpen={isOpenModalMerchant}
        handleCloseIco={() => {
          getMerchantSelected({});
          setStoreName('');
          setStoreObj({});
          setIsOpenModalMerchant(false);
        }}
        isShowCloseIco
        handleClose={() => {
          setIsOpenModalMerchant(false);
        }}
        customClass="custom-popup-detail popup-list-store"
      />
      <Container fluid className="pb-3 home-main">
        <Row>
          <Col xs={12}>
            <div className="register-device">
              <div className="wrapper__info ">
                <TitleHeader title="기기등록" />
                <Row className="row__custom">
                  <div className="col-md-3 py-2 d-flex align-items-center ">
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
                  <div className="col-md-3 py-2 d-flex align-items-center ">
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
                            innerRef={deviceTypeRef}
                            errorMsg={
                              errorDeviceCode.deviceType ||
                              errorDataSubmit.deviceType
                            }
                            onFocus={() => {
                              setErrorDataSubmit({
                                ...errorDataSubmit,
                                deviceType: ''
                              });
                              setErrorDeviceCode({
                                ...setErrorDeviceCode,
                                deviceType: ''
                              });
                            }}
                            value="MB0"
                            readOnly
                          />
                        )}
                        {model === 'slim' && (
                          <Input
                            innerRef={deviceTypeRef}
                            errorMsg={
                              errorDeviceCode.deviceType ||
                              errorDataSubmit.deviceType
                            }
                            onFocus={() => {
                              setErrorDataSubmit({
                                ...errorDataSubmit,
                                deviceType: ''
                              });
                              setErrorDeviceCode({
                                ...setErrorDeviceCode,
                                deviceType: ''
                              });
                            }}
                            value="MB1"
                            readOnly
                          />
                        )}
                        {model === 'double' && (
                          <Input
                            innerRef={deviceTypeRef}
                            errorMsg={
                              errorDeviceCode.deviceType ||
                              errorDataSubmit.deviceType
                            }
                            onFocus={() => {
                              setErrorDataSubmit({
                                ...errorDataSubmit,
                                deviceType: ''
                              });
                              setErrorDeviceCode({
                                ...setErrorDeviceCode,
                                deviceType: ''
                              });
                            }}
                            value="MB2"
                            readOnly
                          />
                        )}
                      </div>
                      <span className="d-none d-md-block">-</span>
                      <div className="col-12 col-md-2 line-space mt-3 mt-md-0">
                        <Input
                          innerRef={deviceTimeRef}
                          errorMsg={
                            errorDeviceCode.deviceTime ||
                            errorDataSubmit.deviceTime
                          }
                          onFocus={() => {
                            setErrorDataSubmit({
                              ...errorDataSubmit,
                              deviceTime: ''
                            });
                            setErrorDeviceCode({
                              ...setErrorDeviceCode,
                              deviceTime: ''
                            });
                          }}
                        />
                      </div>
                      <span className="d-none d-md-block">-</span>
                      <div className="col-12 col-md-2 mt-3 mt-md-0">
                        <Input
                          innerRef={deviceOrderRef}
                          errorMsg={
                            errorDeviceCode.deviceOrder ||
                            errorDataSubmit.deviceOrder
                          }
                          onFocus={() => {
                            setErrorDataSubmit({
                              ...errorDataSubmit,
                              deviceOrder: ''
                            });
                            setErrorDeviceCode({
                              ...setErrorDeviceCode,
                              deviceOrder: ''
                            });
                          }}
                        />
                      </div>
                      <div className="col-12 col-md-4 mt-3 mt-md-0">
                        <PrimaryButton
                          type="button"
                          variant="secondary btn-custom"
                          onClick={handleCheckDeviceModel}
                        >
                          중복 확인
                        </PrimaryButton>
                      </div>
                    </div>
                  </div>
                </Row>
                <Row className="row__custom">
                  <div className="col-md-3 py-2 d-flex align-items-center ">
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
                          onChange={value => {
                            setStoreName(value);
                          }}
                          value={storeName}
                        />
                      </div>
                      <div className="col-12 col-md-6 mt-3 mt-md-0">
                        <PrimaryButton
                          type="button"
                          variant="secondary btn-custom"
                          onClick={handleSearchMerchantByName}
                        >
                          매장 선택
                        </PrimaryButton>
                      </div>
                    </div>
                  </div>
                </Row>
                <Row className="row__custom">
                  <div className="col-md-3 py-2 d-flex align-items-center ">
                    <div className="title">매장 전화번호</div>
                  </div>
                  <div className="col-md-9 py-2">
                    <div className="row">
                      <div className="col-12 col-md-3">
                        <Input
                          value={
                            merchantSelected &&
                            merchantSelected.phone &&
                            merchantSelected.phone.slice(0, 3)
                          }
                          disabled
                          customClassName={errorDataSubmit.phone ? 'red' : ''}
                          errorMsg={errorDataSubmit.phone}
                        />
                      </div>
                      <span className="d-none d-md-block">-</span>
                      <div className="col-12 col-md-3 mt-3 mt-md-0">
                        <Input
                          value={
                            merchantSelected &&
                            merchantSelected.phone &&
                            merchantSelected.phone.slice(4, 8)
                          }
                          disabled
                          customClassName={errorDataSubmit.phone ? 'red' : ''}
                          errorMsg={errorDataSubmit.phone}
                        />
                      </div>
                      <span className="d-none d-md-block">-</span>
                      <div className="col-12 col-md-3 mt-3 mt-md-0">
                        <Input
                          value={
                            merchantSelected &&
                            merchantSelected.phone &&
                            merchantSelected.phone.slice(9, 13)
                          }
                          disabled
                          customClassName={errorDataSubmit.phone ? 'red' : ''}
                          errorMsg={errorDataSubmit.phone}
                        />
                      </div>
                    </div>
                  </div>
                </Row>
                <Row className="row__custom">
                  <div className="col-md-3 py-2 d-flex align-items-center ">
                    <div className="title">매장주소</div>
                  </div>
                  <div className="col-md-9 py-2">
                    <div className="row">
                      <div className="col-6 col-sm-5">
                        <Input
                          value={merchantSelected && merchantSelected.address}
                          disabled
                          customClassName={errorDataSubmit.address ? 'red' : ''}
                          errorMsg={errorDataSubmit.address}
                        />
                      </div>
                      <div className="col-6 col-sm-5">
                        <Input
                          onChange={() => {}}
                          placeholder="상세주소"
                          value={
                            merchantSelected && merchantSelected.addressDetail
                          }
                          disabled
                          customClassName={errorDataSubmit.address ? 'red' : ''}
                          errorMsg={errorDataSubmit.address}
                        />
                      </div>
                    </div>
                  </div>
                </Row>
                <Row className="row__custom">
                  <div className="col-md-3 py-2 d-flex align-items-center ">
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
                              value="1ºC"
                              onBlur={e =>
                                handleOnBlur(e.currentTarget, 'down1')
                              }
                              onFocus={e => removeUnit(e.currentTarget)}
                              innerRef={minTemperatureRef}
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
                              value="4ºC"
                              onBlur={e => handleOnBlur(e.currentTarget, 'up1')}
                              onFocus={e => removeUnit(e.currentTarget)}
                              innerRef={maxTemperatureRef}
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
                                  value="1ºC"
                                  onBlur={e =>
                                    handleOnBlur(e.currentTarget, 'down4')
                                  }
                                  onFocus={e => removeUnit(e.currentTarget)}
                                  innerRef={minTemperatureFourRef}
                                  customClassName={textError.down4 ? 'red' : ''}
                                  errorMsg={textError.down4}
                                  disabled
                                />
                              </div>
                              <div className="col-12 col-sm-6 d-flex mt-2">
                                <div className="title mr-2 double-label mt-2">
                                  최고온도
                                </div>
                                <Input
                                  value="4ºC"
                                  onBlur={e =>
                                    handleOnBlur(e.currentTarget, 'up4')
                                  }
                                  onFocus={e => removeUnit(e.currentTarget)}
                                  innerRef={maxTemperatureFourRef}
                                  customClassName={textError.up4 ? 'red' : ''}
                                  errorMsg={textError.up4}
                                  disabled={!model === 'double'}
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
                          {(isShowMess1 || isShowMess4) && (
                            <div className="text-error ">
                              ※ 18ºc내에서 입력해주세요.
                            </div>
                          )}
                        </div>
                      </div>
                    </Row>
                  </div>
                </Row>
                <Row className="row__custom">
                  <div className="col-md-3 py-2 d-flex align-items-center ">
                    <div className="title"> 설정온도</div>
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
                              value="1ºC"
                              onBlur={e =>
                                handleOnBlur(e.currentTarget, 'down3')
                              }
                              onFocus={e => removeUnit(e.currentTarget)}
                              innerRef={minTemperatureThirdRef}
                              customClassName={textError.down3 ? 'red' : ''}
                              errorMsg={textError.down3}
                              disabled
                            />
                          </div>
                          <div className="col-12 col-sm-6 d-flex mt-3 mt-md-0">
                            <div className="title mr-2 double-label mt-2">
                              최고온도
                            </div>
                            <Input
                              value="4ºC"
                              onBlur={e => handleOnBlur(e.currentTarget, 'up3')}
                              onFocus={e => removeUnit(e.currentTarget)}
                              innerRef={maxTemperatureThirdRef}
                              customClassName={textError.up3 ? 'red' : ''}
                              errorMsg={textError.up3}
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
                                  value="1ºC"
                                  onBlur={e =>
                                    handleOnBlur(e.currentTarget, 'down2')
                                  }
                                  onFocus={e => removeUnit(e.currentTarget)}
                                  innerRef={minTemperatureSecondRef}
                                  customClassName={textError.down2 ? 'red' : ''}
                                  errorMsg={textError.down2}
                                  disabled
                                />
                              </div>
                              <div className="col-12 col-sm-6 d-flex mt-2">
                                <div className="title mr-2 double-label mt-2">
                                  최고온도
                                </div>
                                <Input
                                  value="4ºC"
                                  onBlur={e =>
                                    handleOnBlur(e.currentTarget, 'up2')
                                  }
                                  onFocus={e => removeUnit(e.currentTarget)}
                                  innerRef={maxTemperatureSecondRef}
                                  customClassName={textError.up2 ? 'red' : ''}
                                  errorMsg={textError.up2}
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
                          {(isShowMess2 || isShowMess3) && (
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
                  <div className="col-md-3 py-2 d-flex align-items-center ">
                    <div className="title">상태</div>
                  </div>
                  <div className="col-md-6 py-2">
                    <Input disabled value="사용중" />
                  </div>
                </Row>
                {/* <Row className="row__custom">
                  <div className="col-md-3 py-2 d-flex align-items-center">
                    <div className="title">
                      키오스크 비밀번호
                      <span>*</span>
                    </div>
                  </div>
                  <div className="col-md-6 py-2">
                    <div className={isClass && isClass.classOff}>
                      <InputChange
                        onChange={e => handleChangeInput(e, 'password')}
                        type="text"
                        value={valueDefault && valueDefault.password}
                        customClassName={isClass && isClass.classOff}
                        onBlur={() => handleChangeBlur('password')}
                        errorMsg={errorDataSubmit.devicePassword}
                        onFocus={() => handleChangeOff('password')}
                      />
                    </div>
                    <div className={isClass && isClass.classStar}>
                      <InputChange
                        onChange={() => {}}
                        onFocus={() => handleChangeStar('password')}
                        type="text"
                        errorMsg={errorDataSubmit.devicePassword}
                        customClassName={isClass && isClass.classStar}
                        value={valueDefault && valueDefault.passwordHide}
                      />
                    </div>
                  </div>
                </Row>
                <Row className="row__custom">
                  <div className="col-md-3 py-2 d-flex align-items-center">
                    <div className="title">
                      키오스크 초기 비밀번호 확인
                      <span>*</span>
                    </div>
                  </div>
                  <div className="col-md-6 py-2">
                    <div className={isClass && isClass.classOffCom}>
                      <InputChange
                        onChange={e => handleChangeInput(e, 'confirmPassword')}
                        type="text"
                        value={valueDefault && valueDefault.confirmPassword}
                        customClassName={isClass && isClass.classOffCom}
                        onBlur={() => handleChangeBlur('confirmPassword')}
                        errorMsg={errorDataSubmit.confirmPassword}
                        onFocus={() => handleChangeOff('confirmPassword')}
                      />
                    </div>
                    <div className={isClass && isClass.classStarCom}>
                      <InputChange
                        onChange={() => {}}
                        onFocus={() => handleChangeStar('confirmPassword')}
                        type="text"
                        errorMsg={errorDataSubmit.confirmPassword}
                        customClassName={isClass && isClass.classStarCom}
                        value={valueDefault && valueDefault.confirmPasswordHide}
                      />
                    </div>
                  </div>
                  {textError.confirmPassword && (
                    <div className="col-md-3 py-2 d-flex align-items-center">
                      <p className="text-error mb-0">
                        {textError.confirmPassword}
                      </p>
                    </div>
                  )}
                </Row> */}
                <Row className="row__custom">
                  <div className="col-md-3 py-2 d-flex align-items-center ">
                    <div className="title">기타 특이사항</div>
                  </div>
                  <div className="col-md-9 py-2">
                    <textarea
                      className="form-control"
                      rows="4"
                      ref={otherRef}
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
                      handleSubmitForm();
                    }}
                    disabled={
                      isShowMess1 ||
                      isShowMess2 ||
                      isShowMess3 ||
                      isShowMess4 ||
                      textError.confirmPassword
                    }
                  >
                    등록
                  </PrimaryButton>
                </Col>
              </Row>
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
            history.push('/device');
          }}
        />

        {/* Popup Confirm Check Code */}
        <ModalPrimary
          title="알림"
          content={message}
          isOpen={isOpenConfirmCheckDevice}
          handleCloseIco={() => {
            closePopupCancel();
            setIsOpenConfirmCheckDevice(false);
          }}
          isShowCloseIco
          handleClose={() => {
            setIsOpenConfirmCheckDevice(false);
            handleResetType();
          }}
        />
      </Container>
    </MainLayout>
  );
};

export default FormRegisterDevice;

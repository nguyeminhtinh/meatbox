// import libs
import { createActions, createReducer } from 'reduxsauce';
import Immutable from 'seamless-immutable';
import {
  formatTypeDevice,
  formatPreservationType,
  formatValueStatus,
  formatValuesStatus
} from 'utils/helpers';
// Define action creators
export const { Types, Creators } = createActions({
  getListDevices: ['params'],
  getListDevicesSuccess: null,
  getListDevicesFailed: null,
  checkDeviceByModel: ['deviceModel'],
  checkDeviceByModelSuccess: null,
  checkDeviceByModelFailed: null,
  getMerchantSelected: ['item'],
  getDeviceDetail: ['params'],
  getDeviceDetailSuccess: null,
  getDeviceDetailFailed: null,
  resetPassword: ['id'],
  resetPasswordSuccess: null,
  resetPasswordFailed: null,
  getStoresByName: ['params'],
  getStoresByNameSuccess: null,
  getStoresByNameFailed: null,
  handleResetType: null,
  addDevice: ['data'],
  addDeviceSuccess: null,
  addDeviceFailed: null,
  updateDevice: ['id', 'body'],
  updateDeviceSuccess: null,
  updateDeviceFailed: null,
  addMaintain: ['data'],
  addMaintainSuccess: null,
  addMaintainFailed: null
});

// Initial state
export const INITIAL_STATE = Immutable({
  isProcessing: false,
  error: '',
  merchantList: [],
  maintenances: []
});

const getListDevices = (state, action) => {
  return state.merge({
    type: action.type,
    isProcessing: true
  });
};

const getListDevicesSuccess = (state, action) => {
  const { data } = action;
  const dataDevice =
    data &&
    data.devices.map((item, index) => ({
      rowId: `${data.totalRows - data.currentPage * action.pageSize - index}`,
      id: item.id,
      model: formatTypeDevice(item && item.deviceType),
      preservationType: formatPreservationType(item && item.frozenType),
      code: item.deviceCode,
      temperature: `최저: ${
        item.temperatureMin ? item.temperatureMin : 0
      }ºC 최고: ${item.temperatureMax ? item.temperatureMax : 0}ºC`,
      storeName: item.storeName,
      address: item.address,
      status: formatValueStatus(item && item.state)
    }));
  return state.merge({
    listDevices: dataDevice,
    isProcessing: false,
    devicesInfo: {
      countAll: data.countAll,
      countStandBy: data.countStandBy,
      countInUse: data.countInUse,
      countUsed: data.countUsed
    },
    totalRows: data.totalRows
  });
};

const getListDevicesFailed = (state, action) => {
  return state.merge({
    error: action.error,
    isProcessing: false
  });
};

const checkDeviceByModel = (state, action) => {
  return state.merge({
    isProcessing: true,
    type: action.type
  });
};

const checkDeviceByModelSuccess = (state, action) => {
  return state.merge({
    isProcessing: false,
    message: action.message,
    type: action.type
  });
};

const checkDeviceByModelFailed = (state, action) => {
  return state.merge({
    isProcessing: false,
    statusDevice: action.error,
    message: action.message,
    type: action.type
  });
};

const getMerchantSelected = (state, action) => {
  return state.merge({
    merchantSelected: action.item
  });
};
// Device Detail
const getDeviceDetail = (state, action) => {
  return state.merge({
    type: action.type,
    isProcessing: true
  });
};

const getDeviceDetailSuccess = (state, action) => {
  const { data } = action;
  const dataDevice = action.data;
  const dataDetail = {
    // nameDevice: data.device.deviceCode || '',
    deviceCodeRef:
      (dataDevice.device &&
        dataDevice.device.deviceCode &&
        dataDevice.device.deviceCode.slice(0, 3)) ||
      '',
    deviceTimeRef:
      (dataDevice.device &&
        dataDevice.device.deviceCode &&
        dataDevice.device.deviceCode.slice(4, 8)) ||
      '',
    deviceOrderRef:
      (dataDevice.device &&
        dataDevice.device.deviceCode &&
        dataDevice.device.deviceCode.slice(9, 13)) ||
      '',
    modelDevice: (dataDevice.device && dataDevice.device.deviceType) || '',
    statusDevice: (dataDevice.device && dataDevice.device.frozenType) || '',
    nameStore: (dataDevice.store && dataDevice.store.companyName) || '',
    phone: (dataDevice.store && dataDevice.store.tel) || '',
    address: (dataDevice.store && dataDevice.store.address) || '',
    layer: (dataDevice.store && dataDevice.store.addressDetail) || '',
    temperatureDown1:
      (dataDevice.device && `${dataDevice.device.temperatureMin}ºC`) || '',
    temperatureUp1:
      (dataDevice.device && `${dataDevice.device.temperatureMax}ºC`) || '',
    temperatureDown2:
      (dataDevice.device && `${dataDevice.device.setTemperatureMin}ºC`) || '',
    temperatureUp2:
      (dataDevice.device && `${dataDevice.device.setTemperatureMax}ºC`) || '',
    temperatureDown3:
      (dataDevice.device && `${dataDevice.device.temperatureMinRight}ºC`) || '',
    temperatureUp3:
      (dataDevice.device && `${dataDevice.device.temperatureMaxRight}ºC`) || '',
    temperatureDown4:
      (dataDevice.device && `${dataDevice.device.setTemperatureMinRight}ºC`) ||
      '',
    temperatureUp4:
      (dataDevice.device && `${dataDevice.device.setTemperatureMaxRight}ºC`) ||
      '',
    status: formatValuesStatus(
      dataDevice.device && dataDevice.device.deviceStatus
    ),
    password: (dataDevice.device && dataDevice.device.devicePassword) || '',
    other: (dataDevice.device && dataDevice.device.deviceMemo) || '',
    storeId: (dataDevice.device && dataDevice.device.storeId) || ''
  };

  const dataHistory =
    data &&
    data.maintainances.map((item, index) => ({
      rowId:
        action.data.totalRows -
        action.numberRows * (action.pageIndex - 1) -
        index,
      id: item.id,
      writer: item.writer,
      content: item.content,
      time: item.time
    }));
  return state.merge({
    deviceDetail: dataDetail,
    isProcessing: false,
    maintenances: data.maintainances && dataHistory,
    totalRows: data.totalRows
  });
};

const getDeviceDetailFailed = (state, action) => {
  return state.merge({
    isProcessing: false,
    error: action.error
  });
};

// resetPassword
const resetPassword = (state, action) => {
  return state.merge({
    type: action.type,
    isProcessing: true
  });
};

const resetPasswordSuccess = (state, action) => {
  return state.merge({
    type: action.type,
    isProcessing: false,
    error: action
  });
};

const resetPasswordFailed = (state, action) => {
  return state.merge({
    type: action.type,
    isProcessing: false,
    error: action.error
  });
};

const getStoresByName = (state, action) => {
  return state.merge({
    isProcessing: true,
    type: action.type
  });
};

const getStoresByNameSuccess = (state, action) => {
  const { stores } = action.data;

  const storesData = stores.map((item, index) => ({
    rowId: stores.length - index,
    id: item.traderNo,
    name: item.storeName,
    address: item.storeAdress,
    phone:
      item.storePhone &&
      `${item.storePhone.slice(0, 3)}-${item.storePhone.slice(
        3,
        7
      )}-${item.storePhone.slice(7, 11)}`,
    userId: item.userId,
    addressDetail: item.addressDetail,
    businessReg: item.businessReg
  }));
  return state.merge({
    type: action.type,
    isProcessing: false,
    storeList: storesData
  });
};

const getStoresByNameFailed = (state, action) => {
  return state.merge({
    type: action.type,
    isProcessing: false
  });
};

const handleResetType = state => {
  return state.merge({
    type: ''
  });
};

const addDevice = (state, action) => {
  return state.merge({
    type: action.type
  });
};

const addDeviceSuccess = (state, action) => {
  return state.merge({
    type: action.type
  });
};

const addDeviceFailed = (state, action) => {
  return state.merge({
    type: action.type
  });
};

/*
Update Device
*/
const updateDevice = (state, action) => {
  return state.merge({
    type: action.type
  });
};
const updateDeviceSuccess = (state, action) => {
  return state.merge({
    type: action.type,
    error: action
  });
};
const updateDeviceFailed = (state, action) => {
  return state.merge({
    type: action.type
  });
};

// add maintain
const addMaintain = (state, action) => {
  return state.merge({
    type: action.type,
    isProcessing: true
  });
};

const addMaintainSuccess = (state, action) => {
  // const data = {
  //   rowId: state.maintenances.length + 1,
  //   id: action.data.id,
  //   writer: action.data.userNo,
  //   content: action.data.content,
  //   time: action.data.createdAt
  //   //     id: 436
  //   // userNo: 49489
  //   // deviceId: 290
  //   // content: "1235345"
  //   // createdAt: 1582862059084
  //   // updatedAt: null
  //   // deletedAt: null
  // };

  return state.merge({
    type: action.type,
    error: action,
    isProcessing: false
  });
};

const addMaintainFailed = (state, action) => {
  return state.merge({
    type: action.type,
    isProcessing: false
  });
};

// Assign handler to types.
const HANDLERS = {
  [Types.GET_LIST_DEVICES]: getListDevices,
  [Types.GET_LIST_DEVICES_SUCCESS]: getListDevicesSuccess,
  [Types.GET_LIST_DEVICES_FAILED]: getListDevicesFailed,
  [Types.CHECK_DEVICE_BY_MODEL]: checkDeviceByModel,
  [Types.CHECK_DEVICE_BY_MODEL_SUCCESS]: checkDeviceByModelSuccess,
  [Types.CHECK_DEVICE_BY_MODEL_FAILED]: checkDeviceByModelFailed,
  [Types.GET_MERCHANT_SELECTED]: getMerchantSelected,
  [Types.GET_DEVICE_DETAIL]: getDeviceDetail,
  [Types.GET_DEVICE_DETAIL_SUCCESS]: getDeviceDetailSuccess,
  [Types.GET_DEVICE_DETAIL_FAILED]: getDeviceDetailFailed,
  [Types.RESET_PASSWORD]: resetPassword,
  [Types.RESET_PASSWORD_SUCCESS]: resetPasswordSuccess,
  [Types.RESET_PASSWORD_FAILED]: resetPasswordFailed,
  [Types.GET_STORES_BY_NAME]: getStoresByName,
  [Types.GET_STORES_BY_NAME_SUCCESS]: getStoresByNameSuccess,
  [Types.GET_STORES_BY_NAME_FAILED]: getStoresByNameFailed,
  [Types.HANDLE_RESET_TYPE]: handleResetType,
  [Types.ADD_DEVICE]: addDevice,
  [Types.ADD_DEVICE_SUCCESS]: addDeviceSuccess,
  [Types.ADD_DEVICE_FAILED]: addDeviceFailed,
  [Types.UPDATE_DEVICE]: updateDevice,
  [Types.UPDATE_DEVICE_SUCCESS]: updateDeviceSuccess,
  [Types.UPDATE_DEVICE_FAILED]: updateDeviceFailed,
  [Types.ADD_MAINTAIN]: addMaintain,
  [Types.ADD_MAINTAIN_SUCCESS]: addMaintainSuccess,
  [Types.ADD_MAINTAIN_FAILED]: addMaintainFailed
};

// Create reducers by pass state and handlers
export const devicesReducer = createReducer(INITIAL_STATE, HANDLERS);

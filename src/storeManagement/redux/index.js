// import libs
import { createActions, createReducer } from 'reduxsauce';
import Immutable from 'seamless-immutable';
import moment from 'moment';
import { getFormatBlock } from '../../constants/validate';
import { formatValue } from '../../utils/Validators';

// Define action creators
export const { Types, Creators } = createActions({
  getAddressOptions: null,
  getAddressOptionsSuccess: null,
  getAddressOptionsFailed: null,
  getCityOptions: ['label'],
  getCityOptionsSuccess: null,
  getCityOptionsFailed: null,
  getListStores: ['params'],
  getListStoresSuccess: null,
  getListStoresFailed: null,
  getStoreDetail: ['traderNo'],
  getStoreDetailSuccess: null,
  getStoreDetailFailed: null
});

// Initial state
export const INITIAL_STATE = Immutable({
  isProcessing: false,
  error: '',
  listStores: [],
  dataDetail: {
    password: '',
    businessReg: '',
    userId: '',
    erpTraderCode: '',
    companyName: '',
    address: '',
    addressDetail: '',
    phoneFirst: '',
    phoneSecond: '',
    phoneEnd: '',
    ceoName: '',
    taxBusinessType: '',
    taxEmail: '',
    taxBusinessCategory: '',
    traderMemo: '',
    niceYN: ''
  },
  listDevice: [
    {
      id: '',
      deviceType: '',
      deviceCode: '',
      frozen: ''
    }
  ]
});

const getAddressOptions = (state, action) => {
  return state.merge({
    type: action.type
  });
};

const getAddressOptionsSuccess = (state, action) => {
  const listAddress = action.data && action.data.data;
  const addressObj =
    listAddress &&
    listAddress.map((address, index) => {
      return {
        id: index + 1,
        value: address.level1,
        label: address.level1
      };
    });
  const defaultCodeOption = {
    id: 0,
    value: '',
    label: '선택'
  };
  return state.merge({
    addressOptions: [defaultCodeOption, ...addressObj]
  });
};

const getAddressOptionsFailed = (state, action) => {
  return state.merge({
    error: action.error
  });
};

const getCityOptions = (state, action) => {
  return state.merge({
    type: action.type
  });
};

const getCityOptionsSuccess = (state, action) => {
  const listCity = action.data && action.data.data;
  const cityObj =
    listCity &&
    listCity.address.map((city, index) => {
      return {
        id: index + 1,
        value: city.level2,
        label: city.level2
      };
    });
  return state.merge({
    cityOptions: cityObj
  });
};

const getCityOptionsFailed = (state, action) => {
  return state.merge({
    error: action.error
  });
};

const getListStores = state => {
  return state.merge({
    isProcessing: true
  });
};

const getListStoresSuccess = (state, action) => {
  const { data } = action;
  const dataStores =
    data &&
    data.stores.map((item, index) => ({
      rowId: `${data.totalRows -
        (action.pageIndex - 1) * action.pageRecord -
        index}`,
      id: item.traderNo,
      storeName: item.companyName,
      ceoName: item.ceoName,
      phone: formatValue('XXX-XXXX-XXXX', item.tel),
      address: item.address,
      // numberDevice: item.numberDevices,
      regDate: moment.utc(item.regDate).format('YYYY.MM.DD')
    }));
  return state.merge({
    isProcessing: false,
    listStores: dataStores,
    totalRows: data.totalRows
  });
};

const getListStoresFailed = (state, action) => {
  return state.merge({
    isProcessing: false,
    error: action.error
  });
};

const getStoreDetail = state => {
  return state.merge({
    isProcessing: true
  });
};

const getStoreDetailSuccess = (state, action) => {
  const dataObj = action.data;
  const niceYN = dataObj.store.niceYn === 'Y' ? '자동발행' : '수동발행';
  const dataDetail = {
    password: dataObj.store.password || '',
    businessReg:
      (dataObj.store &&
        getFormatBlock(dataObj.store.businessReg, 4, 8, 13, '-')) ||
      '',
    erpTraderCode: (dataObj.store && dataObj.store.erpTraderCode) || '',
    userId: (dataObj.store && dataObj.store.userId) || '',
    companyName: (dataObj.store && dataObj.store.companyName) || '',
    address: (dataObj.store && dataObj.store.address) || '',
    addressDetail: (dataObj.store && dataObj.store.addressDetail) || '',
    phoneFirst:
      (dataObj.store && dataObj.store.tel && dataObj.store.tel.slice(0, 3)) ||
      '',
    phoneSecond:
      (dataObj.store && dataObj.store.tel && dataObj.store.tel.slice(3, 7)) ||
      '',
    phoneEnd:
      (dataObj.store && dataObj.store.tel && dataObj.store.tel.slice(7, 11)) ||
      '',
    ceoName: (dataObj.store && dataObj.store.ceoName) || '',
    taxBusinessType: (dataObj.store && dataObj.store.taxBusinessType) || '',
    taxEmail: (dataObj.store && dataObj.store.taxEmail) || '',
    taxBusinessCategory:
      (dataObj.store && dataObj.store.taxBusinessCategory) || '',
    traderMemo: (dataObj.store && dataObj.store.traderMemo) || '',
    niceYN: niceYN || ''
  };

  const storeDetail = dataObj.store ? dataDetail : '';
  const listDevice = dataObj.devices.map((device, index) => ({
    stt: index + 1,
    id: device.id,
    deviceType:
      // eslint-disable-next-line no-nested-ternary
      device.deviceType && device.deviceType === 'single'
        ? '싱글'
        : device.deviceType === 'slim'
        ? '슬림'
        : '더블',
    deviceCode: device.deviceCode,
    frozen: device.frozenType === 'frozen' ? '냉동' : '냉장'
  }));

  return state.merge({
    isProcessing: false,
    dataStoreDetail: action.data && storeDetail,
    listDevice: action.data && listDevice,
    type: action.type
  });
};

const getStoreDetailFailed = (state, action) => {
  return state.merge({
    isProcessing: false,
    type: action.type,
    error: action.error
  });
};
// Assign handler to types.
const HANDLERS = {
  [Types.GET_ADDRESS_OPTIONS]: getAddressOptions,
  [Types.GET_ADDRESS_OPTIONS_SUCCESS]: getAddressOptionsSuccess,
  [Types.GET_ADDRESS_OPTIONS_FAILED]: getAddressOptionsFailed,
  [Types.GET_LIST_STORES]: getListStores,
  [Types.GET_CITY_OPTIONS]: getCityOptions,
  [Types.GET_CITY_OPTIONS_SUCCESS]: getCityOptionsSuccess,
  [Types.GET_CITY_OPTIONS_FAILED]: getCityOptionsFailed,
  [Types.GET_LIST_STORES]: getListStores,
  [Types.GET_LIST_STORES_SUCCESS]: getListStoresSuccess,
  [Types.GET_LIST_STORES_FAILED]: getListStoresFailed,
  [Types.GET_STORE_DETAIL]: getStoreDetail,
  [Types.GET_STORE_DETAIL_FAILED]: getStoreDetailFailed,
  [Types.GET_STORE_DETAIL_SUCCESS]: getStoreDetailSuccess
};

// Create reducers by pass state and handlers
export const storesReducer = createReducer(INITIAL_STATE, HANDLERS);

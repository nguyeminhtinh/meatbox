// import libs
import { createActions, createReducer } from 'reduxsauce';
import Immutable from 'seamless-immutable';
import moment from 'moment';
import {
  formatTypeDevice,
  formatPreservationType,
  formatValuesStatusPayment,
  formatValuesPayment,
  formatValuesPayType
} from 'utils/helpers';

export const { Types, Creators } = createActions({
  getDeviceCode: null,
  getDeviceCodeSuccess: null,
  getDeviceCodeFailed: null,
  getListRevenueTime: ['params'],
  getListRevenueTimeSuccess: null,
  getListRevenueTimeFailed: null,
  getListRevenueDay: ['params'],
  getListRevenueDaySuccess: null,
  getListRevenueDayFailed: null,
  getListYear: ['params'],
  getListYearSuccess: null,
  getListYearFailed: null,
  getListRevenueProduct: ['params'],
  getListRevenueProductSuccess: null,
  getListRevenueProductFailed: null,
  getListRevenueStore: ['params'],
  getListRevenueStoreSuccess: null,
  getListRevenueStoreFailed: null,
  getListStoreByName: ['params'],
  getListStoreByNameSuccess: null,
  getListStoreByNameFailed: null,
  getListRevenueStoreDetail: ['params'],
  getListRevenueStoreDetailSuccess: null,
  getListRevenueStoreDetailFailed: null,
  getListPaymentHistory: ['params'],
  getListPaymentHistorySuccess: null,
  getListPaymentHistoryFailed: null,
  getPaymentHistoryDetail: ['orderId'],
  getPaymentHistoryDetailSuccess: null,
  getPaymentHistoryDetailFailed: null,
  getPaymentHistoryCancel: ['orderId'],
  getPaymentHistoryCancelSuccess: null,
  getPaymentHistoryCancelFailed: null,
  getAllListPaymentHistory: ['params'],
  getAllListPaymentHistorySuccess: null,
  getAllListPaymentHistoryFailed: ['params']
});

// Initial state
export const INITIAL_STATE = Immutable({
  isProcessing: false,
  error: '',
  deviceCodes: [],
  listRevenueTime: [],
  listRevenueDay: [],
  GetListYear: [],
  getListRevenueProduct: [],
  getListStoreByName: [],
  getListRevenueStore: [],
  getListRevenueStoreDetail: [],
  getListPaymentHistory: [],
  getListPaymentHistorySuccess: [],
  getListPaymentHistoryFailed: [],
  getPaymentHistoryDetail: [],
  getPaymentHistoryCancel: []
});

// Action Device Code

const getDeviceCode = (state, action) => {
  return state.merge({
    type: action.type
  });
};
const getDeviceCodeSuccess = (state, action) => {
  const { deviceCodes } = action.data;
  const dataDeviceCode = deviceCodes.map((deviceCode, index) => {
    return {
      id: index + 1,
      value: deviceCode.id,
      label: deviceCode.code
    };
  });
  const defaultDeviceCodeOption = {
    id: 0,
    value: '',
    label: '전체'
  };
  return state.merge({
    type: action.type,
    deviceCodes: [defaultDeviceCodeOption, ...dataDeviceCode]
  });
};
const getDeviceCodeFailed = (state, action) => {
  return state.merge({
    type: action.type,
    error: action.error
  });
};
/**
 *End Action Device Code
 */

/**
 *Action Revenue Time
 */
const getListRevenueTime = (state, action) => {
  return state.merge({
    type: action.type,
    isProcessing: true
  });
};

const getListRevenueTimeSuccess = (state, action) => {
  const { data } = action;
  const dataRevenueTime = [];
  // eslint-disable-next-line no-plusplus
  for (let index = 0; index <= 24; index++) {
    // eslint-disable-next-line no-unused-expressions
    data &&
      data.data &&
      data.data.charts &&
      // eslint-disable-next-line no-loop-func
      data.data.charts.forEach(item => {
        if (parseInt(item.house, 10) === index) {
          dataRevenueTime.push({
            id: index,
            value: item.totalMoney,
            label: parseInt(item.house, 10)
          });
        }
      });
    if (!dataRevenueTime[index]) {
      dataRevenueTime.push({
        id: index,
        value: 0,
        label: index
      });
    }
  }
  const dataRevenueHistories =
    data &&
    data.data &&
    data.data.table.map((item, index) => ({
      id: `${data.data.totalRows - 10 * data.data.currentPage - index}`,
      date: item.createdAt,
      total: item.totalMoney && item.totalMoney.toLocaleString('en'),
      profit: item.profit && item.profit.toLocaleString('en')
    }));
  return state.merge({
    listRevenueTime: dataRevenueTime,
    isProcessing: false,
    dataRevenueHistories,
    totalRows: data && data.data && data.data.totalRows
  });
};

const getListRevenueTimeFailed = (state, action) => {
  return state.merge({
    error: action.error,
    isProcessing: false,
    isOpenModal: false
  });
};

/**
 *End Action Revenue Time
 */

/**
 *Action Revenue Day
 */
const getListRevenueDay = (state, action) => {
  return state.merge({
    type: action.type,
    isProcessing: true
  });
};

const getListRevenueDaySuccess = (state, action) => {
  const { data } = action;
  const days = moment(
    // eslint-disable-next-line no-useless-concat
    `${action.year}` + '-' + `${action.month}`,
    'YYYY-MM'
  ).daysInMonth();

  let dataRevenueDay = [];
  switch (action.types) {
    case 'day':
      // eslint-disable-next-line no-plusplus
      for (let index = 1; index < days + 1; index++) {
        // eslint-disable-next-line no-unused-expressions
        data &&
          data.data &&
          data.data.charts &&
          // eslint-disable-next-line no-loop-func
          data.data.charts.forEach(item => {
            if (parseInt(item.date, 10) === index) {
              dataRevenueDay.push({
                id: index,
                value: item.total,
                label: `${item.date}일`
              });
            }
          });
        if (!dataRevenueDay[index - 1]) {
          dataRevenueDay.push({
            id: index,
            value: 0,
            label: `${index}일`
          });
        }
      }
      break;
    case 'month':
      // eslint-disable-next-line no-plusplus
      for (let index = 1; index < 12 + 1; index++) {
        // eslint-disable-next-line no-unused-expressions
        data &&
          data.data &&
          data.data.charts &&
          // eslint-disable-next-line no-loop-func
          data.data.charts.forEach(item => {
            if (parseInt(item.date, 10) === index) {
              dataRevenueDay.push({
                id: index,
                value: item.total,
                label: `${parseInt(item.date, 10)}월`
              });
            }
          });
        if (!dataRevenueDay[index - 1]) {
          dataRevenueDay.push({
            id: index,
            value: 0,
            label: `${index}월`
          });
        }
      }
      break;
    case 'year':
      dataRevenueDay =
        data &&
        data.data &&
        data.data.charts.map((item, index) => ({
          id: index,
          value: item.total,
          label: `${item.date}년`
        }));
      break;
    default:
      break;
  }

  const dataRevenueHistories =
    data &&
    data.data &&
    data.data.revenueHistories.map((item, index) => ({
      id: index,
      date: item.date,
      total: item.total && item.total.toLocaleString('en'),
      profit: item.profit && item.profit.toLocaleString('en')
    }));
  return state.merge({
    listRevenueDay: dataRevenueDay,
    isProcessing: false,
    dataRevenueHistories
  });
};

const getListRevenueDayFailed = (state, action) => {
  return state.merge({
    error: action.error,
    isProcessing: false
  });
};

/**
 *End Action Revenue Day
 */

/**
 *Action getListYear
 */
const getListYear = (state, action) => {
  return state.merge({
    type: action.type,
    isProcessing: true
  });
};

const getListYearSuccess = (state, action) => {
  const { data } = action;

  const dataYear =
    data &&
    data.data &&
    data.data.charts.map((item, index) => ({
      id: index,
      value: parseInt(item.date, 10),
      label: `${item.date}년`
    }));
  return state.merge({
    listYear: [...dataYear],
    isProcessing: false
  });
};

const getListYearFailed = (state, action) => {
  return state.merge({
    error: action.error,
    isProcessing: false
  });
};

/**
 *End Action getListYear
 */

/**
 *Action Revenue Product
 */
const getListRevenueProduct = (state, action) => {
  return state.merge({
    type: action.type,
    isProcessing: true
  });
};

const getListRevenueProductSuccess = (state, action) => {
  const { data } = action;
  const dataRevenueProduct =
    data &&
    data.data &&
    data.data.revenues &&
    data.data.revenues.map((item, index) => ({
      id: `${10 * data.data.currentPage + index + 1}`,
      nameProduct: item && item.nameProduct,
      countSell: item && item.countSell.toLocaleString('en'),
      totalMonneySell: item && item.totalMonneySell.toLocaleString('en'),
      totalProfit:
        item && item.totalProfit && item.totalProfit.toLocaleString('en')
    }));
  return state.merge({
    listRevenueProduct: dataRevenueProduct,
    isProcessing: false,
    dataCount: {
      totalAmount:
        data &&
        data.data &&
        data.data.dataRevenue &&
        data.data.dataRevenue.totalAmount,
      totalProfit:
        data &&
        data.data &&
        data.data.dataRevenue &&
        data.data.dataRevenue.totalProfit
    },
    totalRows: data && data.data && data.data.totalRows
  });
};

const getListRevenueProductFailed = (state, action) => {
  return state.merge({
    error: action.error,
    isProcessing: false
  });
};

/**
 *End Action Revenue Product
 */

/**
 *Action Revenue Store
 */
const getListRevenueStore = (state, action) => {
  return state.merge({
    type: action.type,
    isProcessing: true
  });
};

const getListRevenueStoreSuccess = (state, action) => {
  const { data } = action;
  const dataRevenueStore =
    data &&
    data.data &&
    data.data.table &&
    data.data.table.map((item, index) => ({
      id: `${10 * data.data.currentPage + index + 1}`,
      storeName: item.storeName,
      address: item.address,
      sales: item.sales && item.sales.toLocaleString('en'),
      totalMoney: item.totalMoney && item.totalMoney.toLocaleString('en'),
      profit: item.profit && item.profit.toLocaleString('en'),
      storeId: item.storeId
    }));
  return state.merge({
    listRevenueStore: dataRevenueStore,
    isProcessing: false,
    dataRevenue: {
      totalStore:
        data &&
        data.data &&
        data.data.totalStores &&
        data.data.totalStores.totalStore,
      totalMoney:
        data &&
        data.data &&
        data.data.totalStores &&
        data.data.totalStores.totalMoney
    },
    totalRows: data && data.data && data.data.totalRows
  });
};

const getListRevenueStoreFailed = (state, action) => {
  return state.merge({
    error: action.error,
    isProcessing: false
  });
};

/**
 *End Action Revenue Product
 */

/**
 *Action Store By Name
 */

const getListStoreByName = (state, action) => {
  return state.merge({
    isProcessing: true,
    type: action.type
  });
};

const getListStoreByNameSuccess = (state, action) => {
  const { stores } = action.data;

  const dataStoreName = stores.map(item => ({
    id: item.traderNo,
    value: item.traderNo,
    label: item.storeName
  }));
  const defaultStoreNameOption = {
    id: 0,
    value: '',
    label: '전체'
  };
  return state.merge({
    type: action.type,
    isProcessing: false,
    storeName: [defaultStoreNameOption, ...dataStoreName]
  });
};

const getListStoreByNameFailed = (state, action) => {
  return state.merge({
    type: action.type,
    isProcessing: false
  });
};

/**
 *End Action Store By Name
 */

/**
 *Action Revenue Store Detail
 */
const getListRevenueStoreDetail = (state, action) => {
  return state.merge({
    type: action.type,
    isProcessing: true
  });
};

const getListRevenueStoreDetailSuccess = (state, action) => {
  const { data } = action;
  const dataRevenueStoreDetail =
    data &&
    data.data &&
    data.data.data &&
    data.data.data.map((item, index) => ({
      id: index,
      deviceCode: item.deviceCode,
      deviceType: formatTypeDevice(item.deviceType),
      frozenType: formatPreservationType(item.frozenType),
      package: item.package && item.package.toLocaleString('en'),
      monneySell: item.monneySell && item.monneySell.toLocaleString('en'),
      totalProfit: item.totalProfit && item.totalProfit.toLocaleString('en')
    }));
  return state.merge({
    listRevenueStoreDetail: dataRevenueStoreDetail,
    isProcessing: false
  });
};

const getListRevenueStoreDetailFailed = (state, action) => {
  return state.merge({
    error: action.error,
    isProcessing: false
  });
};

/**
 *End Action Revenue Store Detail
 */

/**
 *Action Payment History
 */
const getListPaymentHistory = (state, action) => {
  return state.merge({
    type: action.type,
    isProcessing: true
  });
};

const getAllListPaymentHistory = (state, action) => {
  return state.merge({
    type: action.type,
    isProcessing: true
  });
};

const getAllListPaymentHistorySuccess = (state, action) => {
  const { data } = action;
  const dataPayments =
    data &&
    data.data &&
    data.data.table &&
    data.data.table.map((item, index) => ({
      순서: `${data.data.totalRows - 10 * data.data.currentPage - index}`,
      구분: formatValuesPayType(item.payType),
      결제시간: item.createdAt,
      결제금액: item.totalMoney && item.totalMoney.toLocaleString('en'),
      결제상태: item.orderStatus === 'paid' ? '결제완료' : '결제취소',
      적립금: item.point && item.point.toLocaleString('en')
    }));
  return state.merge({
    type: action.type,
    isProcessing: false,
    listAllPayment: dataPayments
  });
};

const getAllListPaymentHistoryFailed = (state, action) => {
  return state.merge({
    type: action.type,
    isProcessing: false
  });
};
const getListPaymentHistorySuccess = (state, action) => {
  const { data } = action;
  const dataPayment =
    data &&
    data.data &&
    data.data.table &&
    data.data.table.map((item, index) => ({
      rowId: `${data.data.totalRows - 10 * data.data.currentPage - index}`,
      id: index,
      payType: formatValuesPayType(item.payType),
      createdAt: item.createdAt,
      totalMoney: item.totalMoney && item.totalMoney.toLocaleString('en'),
      status: formatValuesStatusPayment(item.orderStatus),
      point: item.point && item.point.toLocaleString('en'),
      orderId: item.orderId
    }));
  return state.merge({
    listPayment: dataPayment,
    isProcessing: false,
    totalRows: data && data.data && data.data.totalRows
  });
};

const getListPaymentHistoryFailed = (state, action) => {
  return state.merge({
    error: action.error,
    isProcessing: false
  });
};

/**
 *End Action Payment History
 */

/**
 *Action Payment History
 */
const getPaymentHistoryDetail = (state, action) => {
  return state.merge({
    type: action.type,
    isProcessing: true
  });
};

const getPaymentHistoryDetailSuccess = (state, action) => {
  const { data } = action;
  const dataDetail = {
    payTime: (data.data && data.data.data && data.data.data.payTime) || '',
    payType:
      formatValuesPayType(
        data.data && data.data.data && data.data.data.payType
      ) || '',
    orderStatus:
      formatValuesPayment(
        data.data && data.data.data && data.data.data.orderStatus
      ) || '',
    totalMoney:
      (data.data &&
        data.data.data &&
        data.data.data.totalMoney.toLocaleString('en')) ||
      '',
    productName:
      (data.data && data.data.data && data.data.data.productName) || '',
    point:
      (data.data &&
        data.data.data &&
        data.data.data.point &&
        data.data.data.point.toLocaleString('en')) ||
      '',
    phoneNumber: data.data && data.data.data && data.data.data.phoneNumber,
    storeName: (data.data && data.data.data && data.data.data.storeName) || '',
    address: (data.data && data.data.data && data.data.data.address) || '',
    storePhoneNumber:
      data.data && data.data.data && data.data.data.storePhoneNumber,
    deviceCode: (data.data && data.data.data && data.data.data.deviceCode) || ''
  };

  return state.merge({
    paymentDetail: dataDetail,
    isProcessing: false
  });
};

const getPaymentHistoryDetailFailed = (state, action) => {
  return state.merge({
    error: action.error,
    isProcessing: false
  });
};

/**
 *End Action Payment History
 */

const getPaymentHistoryCancel = (state, action) => {
  return state.merge({
    type: action.type,
    isProcessing: true
  });
};
const getPaymentHistoryCancelSuccess = (state, action) => {
  return state.merge({
    type: action.type,
    isProcessing: false,
    data: action.data
  });
};

const getPaymentHistoryCancelFailed = (state, action) => {
  return state.merge({
    isProcessing: false,
    error: action.error
  });
};

// Assign handler to types.
const HANDLERS = {
  [Types.GET_DEVICE_CODE]: getDeviceCode,
  [Types.GET_DEVICE_CODE_SUCCESS]: getDeviceCodeSuccess,
  [Types.GET_DEVICE_CODE_FAILED]: getDeviceCodeFailed,
  [Types.GET_LIST_REVENUE_TIME]: getListRevenueTime,
  [Types.GET_LIST_REVENUE_TIME_SUCCESS]: getListRevenueTimeSuccess,
  [Types.GET_LIST_REVENUE_TIME_FAILED]: getListRevenueTimeFailed,
  [Types.GET_LIST_REVENUE_DAY]: getListRevenueDay,
  [Types.GET_LIST_REVENUE_DAY_SUCCESS]: getListRevenueDaySuccess,
  [Types.GET_LIST_REVENUE_DAY_FAILED]: getListRevenueDayFailed,
  [Types.GET_LIST_YEAR]: getListYear,
  [Types.GET_LIST_YEAR_SUCCESS]: getListYearSuccess,
  [Types.GET_LIST_YEAR_FAILED]: getListYearFailed,
  [Types.GET_LIST_REVENUE_PRODUCT]: getListRevenueProduct,
  [Types.GET_LIST_REVENUE_PRODUCT_SUCCESS]: getListRevenueProductSuccess,
  [Types.GET_LIST_REVENUE_PRODUCT_FAILED]: getListRevenueProductFailed,
  [Types.GET_LIST_REVENUE_STORE]: getListRevenueStore,
  [Types.GET_LIST_REVENUE_STORE_SUCCESS]: getListRevenueStoreSuccess,
  [Types.GET_LIST_REVENUE_STORE_FAILED]: getListRevenueStoreFailed,
  [Types.GET_LIST_STORE_BY_NAME]: getListStoreByName,
  [Types.GET_LIST_STORE_BY_NAME_SUCCESS]: getListStoreByNameSuccess,
  [Types.GET_LIST_STORE_BY_NAME_FAILED]: getListStoreByNameFailed,
  [Types.GET_LIST_REVENUE_STORE_DETAIL]: getListRevenueStoreDetail,
  [Types.GET_LIST_REVENUE_STORE_DETAIL_SUCCESS]: getListRevenueStoreDetailSuccess,
  [Types.GET_LIST_REVENUE_STORE_DETAIL_FAILED]: getListRevenueStoreDetailFailed,
  [Types.GET_LIST_PAYMENT_HISTORY]: getListPaymentHistory,
  [Types.GET_LIST_PAYMENT_HISTORY_SUCCESS]: getListPaymentHistorySuccess,
  [Types.GET_LIST_PAYMENT_HISTORY_FAILED]: getListPaymentHistoryFailed,
  [Types.GET_PAYMENT_HISTORY_DETAIL]: getPaymentHistoryDetail,
  [Types.GET_PAYMENT_HISTORY_DETAIL_SUCCESS]: getPaymentHistoryDetailSuccess,
  [Types.GET_PAYMENT_HISTORY_DETAIL_FAILED]: getPaymentHistoryDetailFailed,
  [Types.GET_PAYMENT_HISTORY_CANCEL]: getPaymentHistoryCancel,
  [Types.GET_PAYMENT_HISTORY_CANCEL_SUCCESS]: getPaymentHistoryCancelSuccess,
  [Types.GET_PAYMENT_HISTORY_CANCEL_FAILED]: getPaymentHistoryCancelFailed,
  [Types.GET_ALL_LIST_PAYMENT_HISTORY]: getAllListPaymentHistory,
  [Types.GET_ALL_LIST_PAYMENT_HISTORY_SUCCESS]: getAllListPaymentHistorySuccess,
  [Types.GET_ALL_LIST_PAYMENT_HISTORY_FAILED]: getAllListPaymentHistoryFailed
};

// Create reducers by pass state and handlers
export const revenuesReducer = createReducer(INITIAL_STATE, HANDLERS);

// import libs
import { createActions, createReducer } from 'reduxsauce';
import moment from 'moment';
import Immutable from 'seamless-immutable';

// Define action creators
export const { Types, Creators } = createActions({
  getListReserve: ['params'],
  getListReserveSuccess: null,
  getListReserveFailed: null,
  registerEventDay: ['params'],
  registerEventDaySuccess: null,
  registerEventDayFailed: null,
  getListReserveUse: null,
  getListReserveUseSuccess: null,
  getListReserveUseFailed: null
});

// Initial state
export const INITIAL_STATE = Immutable({
  isProcessing: false,
  error: '',
  getListReserve: [],
  getListReserveSuccess: [],
  getListReserveFailed: []
});

/**
 *Action Reserve
 */
const getListReserve = (state, action) => {
  return state.merge({
    type: action.type,
    isProcessing: true
  });
};

const getListReserveSuccess = (state, action) => {
  const { data } = action;
  const listReserve =
    data && data.data && data.data.bonusPolicies
      ? data.data.bonusPolicies.map((item, index) => ({
          id: data.data.totalRows - data.data.currentPage * 10 - index,
          beforeChange: item.bonusRate ? `${item.bonusRate}%` : `0%`,
          type: item.type && item.type === 'temporary' ? '수시' : '상시',
          createBy: item.createBy && item.createBy,
          date:
            // eslint-disable-next-line no-nested-ternary
            item.type && item.type === 'constant'
              ? ''
              : item.validFrom
              ? `시작일 : ${item.validFrom} \n 종료일 : ${item.validTill}`
              : '',
          dateModify:
            item.createdAt &&
            moment(item.createdAt).format('YYYY-MM-DD HH:mm:ss')
        }))
      : [];
  return state.merge({
    listReserve,
    isProcessing: false,
    totalRows: data.data.totalRows
  });
};

const getListReserveFailed = (state, action) => {
  return state.merge({
    error: action.error,
    isProcessing: false
  });
};

/**
 *End Action Reserve
 */

/** registerEventDay */
const registerEventDay = (state, action) => {
  return state.merge({
    type: action.type,
    isProcessing: true
  });
};

const registerEventDaySuccess = (state, action) => {
  return state.merge({
    type: action.type,
    isProcessing: false
  });
};

const registerEventDayFailed = (state, action) => {
  return state.merge({
    isProcessing: false,
    error: action.error
  });
};

/** registerEventDay */
const getListReserveUse = (state, action) => {
  return state.merge({
    type: action.type,
    isProcessing: true
  });
};

const getListReserveUseSuccess = (state, action) => {
  const { data } = action;
  const reserveUse = {
    type:
      data &&
      data.data &&
      data.data.bonusPolicyUse &&
      data.data.bonusPolicyUse.type,
    bonusRate:
      data &&
      data.data &&
      data.data.bonusPolicyUse &&
      data.data.bonusPolicyUse.bonusRate,
    validFrom:
      data &&
      data.data &&
      data.data.bonusPolicyUse &&
      data.data.bonusPolicyUse.validFrom
        ? data.data.bonusPolicyUse.validFrom
        : '',
    validTill:
      data &&
      data.data &&
      data.data.bonusPolicyUse &&
      data.data.bonusPolicyUse.validTill
        ? data.data.bonusPolicyUse.validTill
        : ''
  };
  return state.merge({
    type: action.type,
    isProcessing: false,
    reserveUse
  });
};

const getListReserveUseFailed = (state, action) => {
  return state.merge({
    isProcessing: false,
    error: action.error
  });
};

// Assign handler to types.
const HANDLERS = {
  [Types.GET_LIST_RESERVE]: getListReserve,
  [Types.GET_LIST_RESERVE_SUCCESS]: getListReserveSuccess,
  [Types.GET_LIST_RESERVE_FAILED]: getListReserveFailed,
  [Types.REGISTER_EVENT_DAY]: registerEventDay,
  [Types.REGISTER_EVENT_DAY_SUCCESS]: registerEventDaySuccess,
  [Types.REGISTER_EVENT_DAY_FAILED]: registerEventDayFailed,
  [Types.GET_LIST_RESERVE_USE]: getListReserveUse,
  [Types.GET_LIST_RESERVE_USE_SUCCESS]: getListReserveUseSuccess,
  [Types.GET_LIST_RESERVE_USE_FAILED]: getListReserveUseFailed
};
// Create reducers by pass state and handlers
export const reserveReducer = createReducer(INITIAL_STATE, HANDLERS);

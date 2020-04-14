// import libs
import { createActions, createReducer } from 'reduxsauce';
import Immutable from 'seamless-immutable';
import { formatValue } from '../../utils/Validators';
// Define action creators
export const { Types, Creators } = createActions({
  getListMembers: ['params'],
  getListMembersSuccess: null,
  getListMembersFailed: null,
  getMembersDetail: ['params'],
  getMembersDetailSuccess: null,
  getMembersDetailFailed: null
});

// Initial state
export const INITIAL_STATE = Immutable({
  isProcessing: false,
  error: '',
  listMembers: []
});

const getListMembers = (state, action) => {
  return state.merge({
    type: action.type,
    isProcessing: true
  });
};

const getListMembersSuccess = (state, action) => {
  const { data } = action;
  const dataMembers =
    data &&
    data.userPoints &&
    data.userPoints.map((item, index) => ({
      rowId: `${data.totalRows -
        action.numberRows * action.currentPage -
        index}`,
      id: index,
      userPhone: formatValue('XXX-XXXX-XXXX', item.userPhone.replace(/-/g, '')),
      totalPricePayUser:
        item.totalpricePayUser && item.totalpricePayUser.toLocaleString('en'),
      totalPointUser:
        item.totalPointUser && item.totalPointUser.toLocaleString('en'),
      time: item.createdAt
    }));
  return state.merge({
    isProcessing: false,
    listMembers: dataMembers,
    totalRows: data && data.totalRows,
    totalCustomer: data.totalCustomer
  });
};

const getListMembersFailed = (state, action) => {
  return state.merge({
    isProcessing: false,
    error: action.error
  });
};

// Members Detail
const getMembersDetail = (state, action) => {
  return state.merge({
    type: action.type,
    isProcessing: true
  });
};

const getMembersDetailSuccess = (state, action) => {
  const { data } = action;
  const dataDetail =
    data &&
    data.userPoints &&
    data.userPoints.map((item, index) => ({
      rowId: `${data.totalRows - data.currentPage * action.numberRows - index}`,
      id: index,
      productName: item.productName,
      pricePay: item.pricePay && item.pricePay.toLocaleString('en'),
      point: item.point && item.point.toLocaleString('en'),
      createdAt: item.createdAt
    }));
  return state.merge({
    membersDetail: dataDetail,
    totalRows: data.totalRows,
    isProcessing: false,
    point: data.point && data.point.toLocaleString('en')
  });
};

const getMembersDetailFailed = (state, action) => {
  return state.merge({
    isProcessing: false,
    error: action.error
  });
};

// Assign handler to types.
const HANDLERS = {
  [Types.GET_LIST_MEMBERS]: getListMembers,
  [Types.GET_LIST_MEMBERS_SUCCESS]: getListMembersSuccess,
  [Types.GET_LIST_MEMBERS_FAILED]: getListMembersFailed,
  [Types.GET_MEMBERS_DETAIL]: getMembersDetail,
  [Types.GET_MEMBERS_DETAIL_SUCCESS]: getMembersDetailSuccess,
  [Types.GET_MEMBERS_DETAIL_FAILED]: getMembersDetailFailed
};

// Create reducers by pass state and handlers
export const membersReducer = createReducer(INITIAL_STATE, HANDLERS);

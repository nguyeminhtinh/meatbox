// import libs
import { createActions, createReducer } from 'reduxsauce';
import Immutable from 'seamless-immutable';

// Define action creators
export const { Types, Creators } = createActions({
  getAdvList: ['typeSearch'],
  getAdvListSuccess: null,
  getAdvListFailed: null,
  saveAdvertings: ['data'],
  saveAdvertingsSuccess: null,
  saveAdvertingsFailed: null,
  deleteAllAdverting: ['typeDelete'],
  deleteAllAdvertingSuccess: null,
  deleteAllAdvertingFailed: null,
  updateStatus: ['typeSearch'],
  updateStatusSuccess: null,
  updateStatusFailed: null,
  getStatusAdverting: null,
  getStatusAdvertingSuccess: null,
  getStatusAdvertingFailed: null
});

// Initial state
export const INITIAL_STATE = Immutable({
  listAdverting: [],
  isProcessing: false
});

export const getAdvList = (state, action) => {
  return state.merge({
    isProcessing: true,
    type: action.type
  });
};

export const getAdvListSuccess = (state, action) => {
  return state.merge({
    isProcessing: false,
    type: action.type,
    listAdverting: action.data.map(item => ({
      ...item,
      idx: Math.random(),
      path: item.path ? `${process.env.REACT_APP_IMG_URL}${item.path}` : null
    }))
  });
};

export const getAdvListFailed = (state, action) => {
  return state.merge({
    isProcessing: false,
    type: action.type
  });
};

export const saveAdvertings = (state, action) => {
  return state.merge({
    isProcessing: true,
    type: action.type
  });
};

export const saveAdvertingsSuccess = (state, action) => {
  return state.merge({
    isProcessing: false,
    type: action.type
  });
};

export const saveAdvertingsFailed = (state, action) => {
  return state.merge({
    isProcessing: false,
    type: action.type
  });
};

export const deleteAllAdverting = (state, action) => {
  return state.merge({
    isProcessing: true,
    type: action.type
  });
};

export const deleteAllAdvertingSuccess = (state, action) => {
  return state.merge({
    isProcessing: false,
    type: action.type
  });
};

export const deleteAllAdvertingFailed = (state, action) => {
  return state.merge({
    isProcessing: false,
    type: action.type
  });
};

export const updateStatus = (state, action) => {
  return state.merge({
    // isProcessing: false,
    type: action.type
  });
};

export const updateStatusSuccess = (state, action) => {
  return state.merge({
    // isProcessing: false,
    type: action.type
  });
};

export const updateStatusFailed = (state, action) => {
  return state.merge({
    // isProcessing: false,
    type: action.type
  });
};

export const getStatusAdverting = (state, action) => {
  return state.merge({
    // isProcessing: false,
    type: action.type
  });
};

export const getStatusAdvertingSuccess = (state, action) => {
  return state.merge({
    statusResponse: action.status,
    type: action.type
  });
};

export const getStatusAdvertingFailed = (state, action) => {
  return state.merge({
    // isProcessing: false,
    type: action.type
  });
};

// Assign handler to types.
const HANDLERS = {
  [Types.GET_ADV_LIST]: getAdvList,
  [Types.GET_ADV_LIST_SUCCESS]: getAdvListSuccess,
  [Types.GET_ADV_LIST_FAILED]: getAdvListFailed,
  [Types.SAVE_ADVERTINGS]: saveAdvertings,
  [Types.SAVE_ADVERTINGS_SUCCESS]: saveAdvertingsSuccess,
  [Types.SAVE_ADVERTINGS_FAILED]: saveAdvertingsFailed,
  [Types.DELETE_ALL_ADVERTING]: deleteAllAdverting,
  [Types.DELETE_ALL_ADVERTING_SUCCESS]: deleteAllAdvertingSuccess,
  [Types.DELETE_ALL_ADVERTING_FAILED]: deleteAllAdvertingFailed,
  [Types.UPDATE_STATUS]: updateStatus,
  [Types.UPDATE_STATUS_SUCCESS]: updateStatusSuccess,
  [Types.UPDATE_STATUS_FAILED]: updateStatusFailed,
  [Types.GET_STATUS_ADVERTING]: getStatusAdverting,
  [Types.GET_STATUS_ADVERTING_SUCCESS]: getStatusAdvertingSuccess,
  [Types.GET_STATUS_ADVERTING_FAILED]: getStatusAdvertingFailed
};

// Create reducers by pass state and handlers
export const advertingReducer = createReducer(INITIAL_STATE, HANDLERS);

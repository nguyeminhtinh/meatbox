// import libs
import { createActions, createReducer } from 'reduxsauce';
import Immutable from 'seamless-immutable';
import moment from 'moment';
import { formatNegativeDay } from 'utils/helpers';
// Define action creators
export const { Types, Creators } = createActions({
  getRevenues: null,
  getRevenuesSuccess: null,
  getRevenuesFailed: null,
  handleClickMenu: ['itemClicking']
});

// Initial state
export const INITIAL_STATE = Immutable({
  isProcessing: false,
  error: ''
});

const getRevenues = (state, action) => {
  return state.merge({
    isProcessing: true,
    Types: action.type
  });
};

const getRevenuesSuccess = (state, action) => {
  const { data } = action;
  const days = moment(new Date()).get('date');
  const topRevenuesDay = [];
  const topRevenuesTime =
    data &&
    data.revenuestime &&
    data.revenuestime.map((item, index) => ({
      id: index,
      value: item.value,
      label: item.title
    }));
  const topProducts =
    data &&
    data.topProducts &&
    data.topProducts.map((item, index) => ({
      id: index,
      value: item.monney,
      label: item.name
    }));

  // const topRevenuesDay =
  //   data &&
  //   data.revenuesDay &&
  //   data.revenuesDay.map((item, index) => ({
  //     id: index,
  //     value: item.totalMoney,
  //     label: `${item.day}일`
  //   }));
  // eslint-disable-next-line no-plusplus
  for (let index = days - 6; index <= days; index++) {
    // eslint-disable-next-line no-unused-expressions
    data &&
      data.revenuesDay &&
      // eslint-disable-next-line no-loop-func
      data.revenuesDay.forEach(item => {
        if (
          parseInt(item.day, 10) === formatNegativeDay(index) ||
          parseInt(item.day, 10) === index
        ) {
          topRevenuesDay.push({
            id: index,
            value: item.totalMoney,
            label: `${parseInt(item.day, 10)}일`
          });
        }
      });

    if (!topRevenuesDay[index - (days - 6)]) {
      topRevenuesDay.push({
        id: index,
        value: 0,
        label: `${index <= 0 ? formatNegativeDay(index) : index}일`
      });
    }
  }
  return state.merge({
    data: action.data,
    isProcessing: false,
    topRevenuesTime,
    topProducts,
    topRevenuesDay,
    countShop: data.totalStore,
    countDevice: data.totalDevice,
    countUser: data.totalUser
  });
};

const getRevenuesFailed = (state, action) => {
  return state.merge({
    error: action.error,
    isProcessing: false
  });
};

const handleClickMenu = (state, action) => {
  return state.merge({
    activeItem: action.itemClicking
  });
};

// Assign handler to types.
const HANDLERS = {
  [Types.GET_REVENUES]: getRevenues,
  [Types.GET_REVENUES_SUCCESS]: getRevenuesSuccess,
  [Types.GET_REVENUES_FAILED]: getRevenuesFailed,
  [Types.HANDLE_CLICK_MENU]: handleClickMenu
};

// Create reducers by pass state and handlers
export const homeReducer = createReducer(INITIAL_STATE, HANDLERS);

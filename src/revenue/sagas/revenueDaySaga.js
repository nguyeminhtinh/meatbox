import { call, put, takeLatest } from 'redux-saga/effects';

import { ROUTES, API } from 'utils/Apis';
import { Types as CommonTypes } from 'commons/redux';
import { Types } from '../redux';

// worker Saga: will be fired on SEND_INVITE actions
function* getListRevenueDay(action) {
  try {
    /**
     * Example data
     * url: /revenues/store
     *
     */
    const response = yield call(() =>
      API.post(ROUTES.GET_REVENUES_DAY, JSON.stringify(action.params))
    );

    if (response.status === 403) {
      yield put({ type: CommonTypes.ACCOUNT_DENIED });
    }

    if (response.ok) {
      // In case: request success
      yield put({
        type: Types.GET_LIST_REVENUE_DAY_SUCCESS,
        data: response.data,
        month: action.params.month,
        year: action.params.year,
        types: action.params.type
      });
    } else {
      // In case: request failed
      yield put({
        type: Types.GET_LIST_REVENUE_DAY_FAILED,
        error: response.error
      });
    }
  } catch (error) {
    // in case: server error
    yield put({ type: Types.GET_LIST_REVENUE_DAY_FAILED, error });
  }
}

/*
  Starts get revenues list on each dispatched `GET_REVENUES_DAY` action.
*/
function* getListRevenueDaySaga() {
  yield takeLatest(Types.GET_LIST_REVENUE_DAY, getListRevenueDay);
}

export default getListRevenueDaySaga;

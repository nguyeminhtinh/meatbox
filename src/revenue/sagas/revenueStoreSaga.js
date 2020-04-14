import { call, put, takeLatest } from 'redux-saga/effects';

import { ROUTES, API } from 'utils/Apis';
import { Types as CommonTypes } from 'commons/redux';
import { Types } from '../redux';

// worker Saga: will be fired on SEND_INVITE actions
function* getListRevenueStore(action) {
  try {
    /**
     * Example data
     * url: /revenues/store
     *
     */
    const response = yield call(() =>
      API.post(ROUTES.GET_REVENUES_STORE, JSON.stringify(action.params))
    );

    if (response.status === 403) {
      yield put({ type: CommonTypes.ACCOUNT_DENIED });
    }

    if (response.ok) {
      // In case: request success
      yield put({
        type: Types.GET_LIST_REVENUE_STORE_SUCCESS,
        data: response.data
      });
    } else {
      // In case: request failed
      yield put({
        type: Types.GET_LIST_REVENUE_STORE_FAILED,
        error: response.error
      });
    }
  } catch (error) {
    // in case: server error
    yield put({ type: Types.GET_LIST_REVENUE_STORE_FAILED, error });
  }
}

/*
  Starts get revenues list on each dispatched `GET_REVENUES_STORE` action.
*/
function* getListRevenueStoreSaga() {
  yield takeLatest(Types.GET_LIST_REVENUE_STORE, getListRevenueStore);
}

export default getListRevenueStoreSaga;

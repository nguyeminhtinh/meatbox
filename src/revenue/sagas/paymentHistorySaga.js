import { call, put, takeLatest } from 'redux-saga/effects';

import { ROUTES, API } from 'utils/Apis';
import { Types as CommonTypes } from 'commons/redux';
import { Types } from '../redux';

// worker Saga: will be fired on SEND_INVITE actions
function* getListPaymentHistory(action) {
  try {
    /**
     * Example data
     * url: /revenues/store
     *
     */
    const response = yield call(() =>
      API.post(ROUTES.GET_PAYMENT, JSON.stringify(action.params))
    );

    if (response.status === 403) {
      yield put({ type: CommonTypes.ACCOUNT_DENIED });
    }

    if (response.ok) {
      // In case: request success
      yield put({
        type: Types.GET_LIST_PAYMENT_HISTORY_SUCCESS,
        data: response.data
      });
    } else {
      // In case: request failed
      yield put({
        type: Types.GET_LIST_PAYMENT_HISTORY_FAILED,
        error: response.error
      });
    }
  } catch (error) {
    // in case: server error
    yield put({ type: Types.GET_LIST_PAYMENT_HISTORY_FAILED, error });
  }
}

/*
  Starts get revenues list on each dispatched `GET_PAYMENT_HISTORY` action.
*/
function* getListPaymentHistorySaga() {
  yield takeLatest(Types.GET_LIST_PAYMENT_HISTORY, getListPaymentHistory);
}

export default getListPaymentHistorySaga;

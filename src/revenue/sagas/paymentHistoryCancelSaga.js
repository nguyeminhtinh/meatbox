import { call, put, takeLatest } from 'redux-saga/effects';

import { ROUTES, API } from 'utils/Apis';
import { Types as CommonTypes } from 'commons/redux';
import { Types } from '../redux';

// worker Saga: will be fired on SEND_INVITE actions
function* getPaymentHistoryCancel(action) {
  try {
    /**
     * Example data
     * url: /revenues/store
     *
     */
    const response = yield call(() =>
      API.get(ROUTES.GET_PAYMENT_CANCEL(action.orderId))
    );

    if (response.status === 403) {
      yield put({ type: CommonTypes.ACCOUNT_DENIED });
    }

    if (response.ok) {
      // In case: request success
      yield put({
        type: Types.GET_PAYMENT_HISTORY_CANCEL_SUCCESS,
        data: response.data
      });
    } else {
      // In case: request failed
      yield put({
        type: Types.GET_PAYMENT_HISTORY_CANCEL_FAILED,
        error: response.error
      });
    }
  } catch (error) {
    // in case: server error
    yield put({ type: Types.GET_PAYMENT_HISTORY_CANCEL_FAILED, error });
  }
}

/*
  Starts get revenues list on each dispatched `GET_PAYMENT_HISTORY_CANCEL` action.
*/
function* getPaymentHistoryCancelSaga() {
  yield takeLatest(Types.GET_PAYMENT_HISTORY_CANCEL, getPaymentHistoryCancel);
}

export default getPaymentHistoryCancelSaga;

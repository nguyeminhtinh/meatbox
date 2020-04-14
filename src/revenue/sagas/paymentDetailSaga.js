import { call, put, takeLatest } from 'redux-saga/effects';

import { ROUTES, API } from 'utils/Apis';
import { Types as CommonTypes } from 'commons/redux';
import { Types } from '../redux';

// worker Saga: will be fired on GET_PAYMENT_DETAIL actions
function* getPaymentHistoryDetail(action) {
  try {
    /**
     * Example data
     * url: endpoint/payment/{id}
     *
     */
    const response = yield call(() =>
      API.get(ROUTES.GET_PAYMENT_DETAIL(action.orderId))
    );

    if (response.status === 403) {
      yield put({ type: CommonTypes.ACCOUNT_DENIED });
    }

    if (response.ok) {
      // In case: request success
      yield put({
        type: Types.GET_PAYMENT_HISTORY_DETAIL_SUCCESS,
        data: response.data
      });
    } else {
      // In case: request failed
      yield put({
        type: Types.GET_PAYMENT_HISTORY_DETAIL_FAILED,
        error: response.error
      });
    }
  } catch (error) {
    // in case: server error
    yield put({ type: Types.GET_PAYMENT_HISTORY_DETAIL_FAILED, error });
  }
}

/*
  Starts get revenues list on each dispatched `GET_PAYMENT_DETAIL` action.
*/

function* getPaymentDetailHistorySaga() {
  yield takeLatest(Types.GET_PAYMENT_HISTORY_DETAIL, getPaymentHistoryDetail);
}

export default getPaymentDetailHistorySaga;

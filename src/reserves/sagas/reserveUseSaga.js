import { call, put, takeLatest } from 'redux-saga/effects';

import { ROUTES, API } from 'utils/Apis';
import { Types as CommonTypes } from 'commons/redux';
import { Types } from '../redux';

// worker Saga: will be fired on SEND_INVITE actions
function* getListReserveUse() {
  try {
    /**
     * Example data
     * url: /reserve
     *
     */
    const response = yield call(() =>
      API.post(ROUTES.API_GET_LIST_RESERVE_USE)
    );

    if (response.status === 403) {
      yield put({ type: CommonTypes.ACCOUNT_DENIED });
    }

    if (response.ok) {
      // In case: request success
      yield put({
        type: Types.GET_LIST_RESERVE_USE_SUCCESS,
        data: response.data
      });
    } else {
      // In case: request failed
      yield put({
        type: Types.GET_LIST_RESERVE_USE_FAILED,
        error: response.error
      });
    }
  } catch (error) {
    // in case: server error
    yield put({ type: Types.GET_LIST_RESERVE_USE_FAILED, error });
  }
}

/*
  Starts get revenues list on each dispatched `GET_RESERVE` action.
*/
function* getListReserveUseSaga() {
  yield takeLatest(Types.GET_LIST_RESERVE_USE, getListReserveUse);
}

export default getListReserveUseSaga;

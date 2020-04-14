import { call, put, takeLatest } from 'redux-saga/effects';

import { ROUTES, API } from 'utils/Apis';
import { Types as CommonTypes } from 'commons/redux';
import { Types } from '../redux';

// worker Saga: will be fired on SEND_INVITE actions
function* checkModelDevice(action) {
  try {
    /**
     * Example data
     * url: enpoint/check-device
     *
     */
    const response = yield call(() =>
      API.post(ROUTES.CHECK_DEVICE(action.deviceModel))
    );

    if (response.status === 403) {
      yield put({ type: CommonTypes.ACCOUNT_DENIED });
    }

    if (response.ok) {
      // In case: request success
      const { message } = response.data;
      yield put({
        type: Types.CHECK_DEVICE_BY_MODEL_SUCCESS,
        message
      });
    } else {
      // In case: request failed
      const { message } = response.data;
      yield put({
        type: Types.CHECK_DEVICE_BY_MODEL_FAILED,
        message
      });
    }
  } catch (error) {
    // in case: server error
    yield put({ type: Types.CHECK_DEVICE_BY_MODEL_FAILED });
  }
}

/*
  Starts get revenues list on each dispatched `GET_REVENUES` action.
*/
function* checkModelDeviceSaga() {
  yield takeLatest(Types.CHECK_DEVICE_BY_MODEL, checkModelDevice);
}

export default checkModelDeviceSaga;

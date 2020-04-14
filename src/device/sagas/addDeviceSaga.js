import { call, put, takeLatest } from 'redux-saga/effects';

import { ROUTES, API } from 'utils/Apis';
import { Types as CommonTypes } from 'commons/redux';
import { Types } from '../redux';

// worker Saga: will be fired on SEND_INVITE actions
function* addDevice(action) {
  try {
    /**
     * Example data
     * url: /get-device/{id}
     *
     */
    const response = yield call(() =>
      API.post(ROUTES.ADD_DEVICE, JSON.stringify(action.data))
    );

    if (response.status === 403) {
      yield put({ type: CommonTypes.ACCOUNT_DENIED });
    }

    if (response.ok) {
      // In case: request success
      yield put({
        type: Types.ADD_DEVICE_SUCCESS,
        data: response.data
      });
    } else {
      // In case: request failed
      yield put({
        type: Types.ADD_DEVICE_FAILED,
        error: response.error
      });
    }
  } catch (error) {
    // in case: server error
    yield put({ type: Types.ADD_DEVICE_FAILED, error });
  }
}

/*
  Starts get revenues list on each dispatched `ADD_DEVICE` action.
*/
function* getDeviceDetailSaga() {
  yield takeLatest(Types.ADD_DEVICE, addDevice);
}

export default getDeviceDetailSaga;

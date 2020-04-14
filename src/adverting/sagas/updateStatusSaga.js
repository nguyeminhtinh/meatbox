import { call, put, takeLatest } from 'redux-saga/effects';

import { ROUTES, API } from 'utils/Apis';

import { Types } from '../redux';

// worker Saga: will be fired on UPDATE_STATUS actions
function* updateStatus(action) {
  try {
    /**
     * Example data
     * url: enpoint/members
     *
     */

    const response = yield call(() =>
      API.get(ROUTES.UPDATE_STATUS_ADVS, { type: action.typeSearch })
    );
    if (response.ok) {
      // In case: request success
      const { data } = response.data;
      yield put({
        type: Types.UPDATE_STATUS_SUCCESS,
        data
      });
    } else {
      // In case: request failed
      yield put({
        type: Types.UPDATE_STATUS_FAILED,
        error: response.error
      });
    }
  } catch (error) {
    // in case: server error
    yield put({ type: Types.UPDATE_STATUS_FAILED, error });
  }
}

/*
  Starts get revenues list on each dispatched `UPDATE_STATUS` action.
*/
function* updateStatusSaga() {
  yield takeLatest(Types.UPDATE_STATUS, updateStatus);
}

export default updateStatusSaga;

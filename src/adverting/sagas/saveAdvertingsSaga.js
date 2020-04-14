import { call, put, takeLatest } from 'redux-saga/effects';

import { ROUTES, API } from 'utils/Apis';
import { Types as CommonTypes } from 'commons/redux';
import { Types } from '../redux';

// worker Saga: will be fired on GET_ADV_LIST actions
function* saveAdvertings(action) {
  try {
    /**
     * Example data
     * url: enpoint/members
     *
     */
    const response = yield call(() => API.post(ROUTES.SAVE_ADVS, action.data));

    if (response.status === 403) {
      yield put({ type: CommonTypes.ACCOUNT_DENIED });
    }

    if (response.ok) {
      // In case: request success
      const { data } = response.data;
      yield put({
        type: Types.SAVE_ADVERTINGS_SUCCESS,
        data
      });
    } else {
      // In case: request failed
      yield put({
        type: Types.SAVE_ADVERTINGS_FAILED,
        error: response.error
      });
    }
  } catch (error) {
    // in case: server error
    yield put({ type: Types.SAVE_ADVERTINGS_FAILED, error });
  }
}

/*
  Starts get revenues list on each dispatched `GET_ADV_LIST` action.
*/
function* getAdvertingsSaga() {
  yield takeLatest(Types.SAVE_ADVERTINGS, saveAdvertings);
}

export default getAdvertingsSaga;

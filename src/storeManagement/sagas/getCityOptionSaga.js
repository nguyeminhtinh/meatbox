import { call, put, takeLatest } from 'redux-saga/effects';

import { ROUTES, API } from 'utils/Apis';
import { Types as CommonTypes } from 'commons/redux';
import { Types } from '../redux';

// worker Saga: will be fired on SEND_INVITE actions
function* getCityOptions(action) {
  try {
    /**
     * Example data
     * url: enpoint/CITY-options
     *
     */
    const response = yield call(() =>
      API.post(ROUTES.GET_CITY_OPTIONS, action && action.label)
    );

    if (response.status === 403) {
      yield put({ type: CommonTypes.ACCOUNT_DENIED });
    }

    if (response.ok) {
      // In case: request success
      yield put({
        type: Types.GET_CITY_OPTIONS_SUCCESS,
        data: response.data
      });
    } else {
      // In case: request failed
      yield put({
        type: Types.GET_CITY_OPTIONS_FAILED,
        error: response.error
      });
    }
  } catch (error) {
    // in case: server error
    yield put({ type: Types.GET_CITY_OPTIONS_FAILED, error });
  }
}

/*
  Starts get revenues list on each dispatched `GET_REVENUES` action.
*/
function* getCityOptionsSaga() {
  yield takeLatest(Types.GET_CITY_OPTIONS, getCityOptions);
}

export default getCityOptionsSaga;

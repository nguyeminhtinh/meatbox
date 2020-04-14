import { call, put, takeLatest } from 'redux-saga/effects';

import { ROUTES, API } from 'utils/Apis';
import { Types as CommonTypes } from 'commons/redux';
import { Types } from '../redux';

function* resetPassword(action) {
  try {
    /**
     * Example data
     * url: enpoint/address-options
     *
     */

    const response = yield call(() =>
      API.get(ROUTES.RESET_PASSWORD(action.id))
    );

    if (response.status === 403) {
      yield put({ type: CommonTypes.ACCOUNT_DENIED });
    }

    if (response.ok) {
      // In case: request success
      const { data } = response.data;
      yield put({
        type: Types.RESET_PASSWORD_SUCCESS,
        data
      });
    } else {
      // In case: request failed
      yield put({
        type: Types.RESET_PASSWORD_FAILED,
        error: response.error
      });
    }
  } catch (error) {
    // in case: server error
    yield put({ type: Types.RESET_PASSWORD_FAILED, error });
  }
}

/*
  Starts get revenues list on each dispatched `RESET_PASSWORD` action.
*/
function* resetPasswordSaga() {
  yield takeLatest(Types.RESET_PASSWORD, resetPassword);
}

export default resetPasswordSaga;

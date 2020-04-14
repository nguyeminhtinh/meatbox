import { call, put, takeLatest } from 'redux-saga/effects';

import { ROUTES, API } from 'utils/Apis';
import { Types as CommonTypes } from 'commons/redux';
import { Types } from '../redux';

function* addMaintain(action) {
  try {
    /**
     * Example data
     * url: enPoint/address-options
     *
     */

    const response = yield call(() =>
      API.post(ROUTES.ADD_MAINTAIN, JSON.stringify(action.data))
    );

    if (response.status === 403) {
      yield put({ type: CommonTypes.ACCOUNT_DENIED });
    }

    if (response.ok) {
      const { data } = response.data;
      // In case: request success
      yield put({
        type: Types.ADD_MAINTAIN_SUCCESS,
        data: data.maintenance
      });
    } else {
      // In case: request failed
      yield put({
        type: Types.ADD_MAINTAIN_FAILED,
        error: response.error
      });
    }
  } catch (error) {
    // in case: server error
    yield put({ type: Types.ADD_MAINTAIN_FAILED, error });
  }
}

/*
  Starts get revenues list on each dispatched `ADD_MAINTAIN` action.
*/
function* addMaintainSaga() {
  yield takeLatest(Types.ADD_MAINTAIN, addMaintain);
}

export default addMaintainSaga;

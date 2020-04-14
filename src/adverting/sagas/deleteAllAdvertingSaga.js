import { call, put, takeLatest } from 'redux-saga/effects';

import { ROUTES, API } from 'utils/Apis';
import { Types as CommonTypes } from 'commons/redux';
import { Types } from '../redux';

// worker Saga: will be fired on DELETE_ALL_ADVERTING actions
function* deleteAllAdverts(action) {
  try {
    /**
     * Example data
     * url: enpoint/members
     *
     */
    const response = yield call(() =>
      API.delete(ROUTES.DELETE_ALL, action.typeDelete)
    );

    if (response.status === 403) {
      yield put({ type: CommonTypes.ACCOUNT_DENIED });
    }

    if (response.ok) {
      // In case: request success
      // const { data } = response.data;
      yield put({
        type: Types.DELETE_ALL_ADVERTING_SUCCESS
      });
    } else {
      // In case: request failed
      yield put({
        type: Types.DELETE_ALL_ADVERTING_FAILED,
        error: response.error
      });
    }
  } catch (error) {
    // in case: server error
    yield put({ type: Types.DELETE_ALL_ADVERTING_FAILED, error });
  }
}

/*
  Starts get revenues list on each dispatched `DELETE_ALL_ADVERTING` action.
*/
function* deleteAllAdvertingSaga() {
  yield takeLatest(Types.DELETE_ALL_ADVERTING, deleteAllAdverts);
}

export default deleteAllAdvertingSaga;

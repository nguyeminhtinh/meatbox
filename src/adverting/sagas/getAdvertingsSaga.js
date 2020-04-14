import { call, put, takeLatest } from 'redux-saga/effects';

import { ROUTES, API } from 'utils/Apis';
import { Types as CommonTypes } from 'commons/redux';
import { Types } from '../redux';

// worker Saga: will be fired on GET_ADV_LIST actions
function* getAdvertingList(action) {
  try {
    /**
     * Example data
     * url: enpoint/members
     *
     */
    const response = yield call(() =>
      API.get(ROUTES.GET_ADVERTING, { type: action.typeSearch })
    );

    if (response.status === 403) {
      yield put({ type: CommonTypes.ACCOUNT_DENIED });
    }

    if (response.ok) {
      // In case: request success
      const { data } = response.data;
      yield put({
        type: Types.GET_ADV_LIST_SUCCESS,
        data
      });
    } else {
      // In case: request failed
      yield put({
        type: Types.GET_ADV_LIST_FAILED,
        error: response.error
      });
    }
  } catch (error) {
    // in case: server error
    yield put({ type: Types.GET_ADV_LIST_FAILED, error });
  }
}

/*
  Starts get revenues list on each dispatched `GET_ADV_LIST` action.
*/
function* getAdvertingsSaga() {
  yield takeLatest(Types.GET_ADV_LIST, getAdvertingList);
}

export default getAdvertingsSaga;

import { call, put, takeLatest } from 'redux-saga/effects';

import { ROUTES, API } from 'utils/Apis';
import { Types as CommonTypes } from 'commons/redux';
import { Types } from '../redux';

// worker Saga: will be fired on SEND_INVITE actions
function* getRegisterEventDay(action) {
  try {
    /**
     * Example data
     * url: /reserve
     *
     */
    const response = yield call(() =>
      API.post(ROUTES.API_REGISTER_EVENT_DAY, action.params)
    );

    if (response.status === 403) {
      yield put({ type: CommonTypes.ACCOUNT_DENIED });
    }

    if (response.ok) {
      // In case: request success
      yield put({
        type: Types.REGISTER_EVENT_DAY_SUCCESS,
        data: response.data
      });
    } else {
      // In case: request failed
      yield put({
        type: Types.REGISTER_EVENT_DAY_FAILED,
        error: response.error
      });
    }
  } catch (error) {
    // in case: server error
    yield put({ type: Types.REGISTER_EVENT_DAY_FAILED, error });
  }
}

/*
  Starts get revenues list on each dispatched `GET_RESERVE` action.
*/
function* getRegisterEventDaySaga() {
  yield takeLatest(Types.REGISTER_EVENT_DAY, getRegisterEventDay);
}

export default getRegisterEventDaySaga;

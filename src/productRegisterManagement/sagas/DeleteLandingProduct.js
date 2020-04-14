import { call, put, takeLatest } from 'redux-saga/effects';

import { ROUTES, API } from 'utils/Apis';
import { Types as CommonTypes } from 'commons/redux';
import { Types } from '../redux';

// worker Saga: will be fired on DELETE_LIST_LANDING_PRODUCT actions
function* deleteListLandingProduct(action) {
  try {
    /**
     * Example data
     * url: enpoint/members
     *
     */
    const response = yield call(() =>
      API.post(
        ROUTES.DELETE_LIST_LANDING_PRODUCT_API,
        JSON.stringify(action.params)
      )
    );

    if (response.status === 403) {
      yield put({ type: CommonTypes.ACCOUNT_DENIED });
    }

    if (response.ok) {
      // In case: request success
      const { data } = response.data;
      yield put({
        type: Types.DELETE_LIST_LANDING_PRODUCT_SUCCESS,
        data
      });
    } else {
      // In case: request failed
      yield put({
        type: Types.DELETE_LIST_LANDING_PRODUCT_FAILED,
        error: response.error
      });
    }
  } catch (error) {
    // in case: server error
    yield put({ type: Types.DELETE_LIST_LANDING_PRODUCT_FAILED, error });
  }
}

/*
  Starts DELETE revenues list on each dispatched `DELETE_LIST_Landing_PRODUCT` action.
*/
function* deleteListLandingProductSaga() {
  yield takeLatest(Types.DELETE_LIST_LANDING_PRODUCT, deleteListLandingProduct);
}

export default deleteListLandingProductSaga;

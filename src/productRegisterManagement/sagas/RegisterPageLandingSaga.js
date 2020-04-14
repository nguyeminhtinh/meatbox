import { call, put, takeLatest } from 'redux-saga/effects';

import { ROUTES, API } from 'utils/Apis';
import { Types as CommonTypes } from 'commons/redux';
import { Types } from '../redux';

// worker Saga: will be fired on REGISTER_LANDING_PRODUCT actions
function* registerLandingProduct(action) {
  try {
    /**
     * Example data
     * url:
     *
     */
    const response = yield call(() =>
      API.post(ROUTES.REGISTER_LANDING_PRODUCT_API, action.params, {
        headers: { 'Content-Type': 'multipart/form-data' }
      })
    );

    if (response.status === 403) {
      yield put({ type: CommonTypes.ACCOUNT_DENIED });
    }

    // Reset response
    if (response) {
      API.addRequestTransform(request => {
        request.headers['Content-Type'] = 'application/json';
      });
    }
    if (response.ok) {
      // In case: request success
      const { data } = response.data;
      yield put({
        type: Types.REGISTER_LANDING_PRODUCT_SUCCESS,
        data
      });
    } else {
      // In case: request failed
      yield put({
        type: Types.REGISTER_LANDING_PRODUCT_FAILED,
        error: response.error
      });
    }
  } catch (error) {
    // in case: server error
    yield put({ type: Types.REGISTER_LANDING_PRODUCT_FAILED, error });
  }
}

/*
  Starts get revenues list on each dispatched `REGISTER_LANDING_PRODUCT` action.
*/
function* registerLandingProductSaga() {
  yield takeLatest(Types.REGISTER_LANDING_PRODUCT, registerLandingProduct);
}

export default registerLandingProductSaga;

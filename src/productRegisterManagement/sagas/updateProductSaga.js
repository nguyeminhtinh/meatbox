import { call, put, takeLatest } from 'redux-saga/effects';

import { ROUTES, API } from 'utils/Apis';
import { Types as CommonTypes } from 'commons/redux';
import { Types } from '../redux';

// worker Saga: will be fired on GET_LIST_STORES actions
function* updateProduct(action) {
  try {
    /**
     * Example data
     * url: enpoint/stores
     *
     */
    const response = yield call(() =>
      API.post(ROUTES.UPDATE_PRODUCT(action.id), action.data, {
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
      const { data } = response.data;
      // In case: request success
      yield put({
        type: Types.UPDATE_PRODUCT_SUCCESS,
        data,
        error: response.data
      });
    } else {
      // In case: request failed
      yield put({
        type: Types.UPDATE_PRODUCT_FAILED,
        error: response.error
      });
    }
  } catch (error) {
    // in case: server error
    yield put({ type: Types.UPDATE_PRODUCT_FAILED, error });
  }
}

/*
  Starts get revenues list on each dispatched `GET_LIST_STORES` action.
*/
function* updateProductSaga() {
  yield takeLatest(Types.UPDATE_PRODUCT, updateProduct);
}

export default updateProductSaga;

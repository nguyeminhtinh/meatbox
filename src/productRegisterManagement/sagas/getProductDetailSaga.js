import { call, put, takeLatest } from 'redux-saga/effects';

import { ROUTES, API } from 'utils/Apis';
import { Types as CommonTypes } from 'commons/redux';
import { Types } from '../redux';

// worker Saga: will be fired on GET_LIST_STORES actions
function* getProductDetail(action) {
  try {
    /**
     * Example data
     * url: enpoint/stores
     *
     */

    const response = yield call(() =>
      API.get(ROUTES.GET_PRODUCT_DETAIL(action.id))
    );

    if (response.status === 403) {
      yield put({ type: CommonTypes.ACCOUNT_DENIED });
    }

    if (response.ok) {
      const { data } = response.data;
      // In case: request success
      yield put({
        type: Types.GET_PRODUCT_DETAIL_SUCCESS,
        data
      });
    } else {
      // In case: request failed
      yield put({
        type: Types.GET_PRODUCT_DETAIL_FAILED,
        error: response.error
      });
    }
  } catch (error) {
    // in case: server error
    yield put({ type: Types.GET_PRODUCT_DETAIL_FAILED, error });
  }
}

/*
  Starts get revenues list on each dispatched `GET_LIST_STORES` action.
*/
function* getProductDetailSaga() {
  yield takeLatest(Types.GET_PRODUCT_DETAIL, getProductDetail);
}

export default getProductDetailSaga;

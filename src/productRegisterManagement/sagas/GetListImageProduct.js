import { call, put, takeLatest } from 'redux-saga/effects';

import { ROUTES, API } from 'utils/Apis';
import { Types as CommonTypes } from 'commons/redux';
import { Types } from '../redux';

// worker Saga: will be fired on GET_LIST_IMAGE_PRODUCT actions
function* getListImageProduct(action) {
  try {
    /**
     * Example data
     * url: enpoint/members
     *
     */
    const response = yield call(() =>
      API.post(ROUTES.GET_LIST_IMAGE_PRODUCT_API, JSON.stringify(action.params))
    );

    if (response.status === 403) {
      yield put({ type: CommonTypes.ACCOUNT_DENIED });
    }

    if (response.ok) {
      // In case: request success
      const { data } = response.data;
      yield put({
        type: Types.GET_LIST_IMAGE_PRODUCT_SUCCESS,
        data,
        numberRows: action.params.numberRows
      });
    } else {
      // In case: request failed
      yield put({
        type: Types.GET_LIST_IMAGE_PRODUCT_FAILED,
        error: response.error
      });
    }
  } catch (error) {
    // in case: server error
    yield put({ type: Types.GET_LIST_IMAGE_PRODUCT_FAILED, error });
  }
}

/*
  Starts get revenues list on each dispatched `GET_LIST_IMAGE_PRODUCT` action.
*/
function* getListImageProductSaga() {
  yield takeLatest(Types.GET_LIST_IMAGE_PRODUCT, getListImageProduct);
}

export default getListImageProductSaga;

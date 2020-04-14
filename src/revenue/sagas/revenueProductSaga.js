import { call, put, takeLatest } from 'redux-saga/effects';

import { ROUTES, API } from 'utils/Apis';
import { Types as CommonTypes } from 'commons/redux';
import { Types } from '../redux';

// worker Saga: will be fired on SEND_INVITE actions
function* getListRevenueProduct(action) {
  try {
    /**
     * Example data
     * url: /revenues/product
     *
     */
    const response = yield call(() =>
      API.post(ROUTES.GET_REVENUES_PRODUCT, JSON.stringify(action.params))
    );

    if (response.status === 403) {
      yield put({ type: CommonTypes.ACCOUNT_DENIED });
    }

    if (response.ok) {
      // In case: request success
      yield put({
        type: Types.GET_LIST_REVENUE_PRODUCT_SUCCESS,
        data: response.data,
        pageSize: action.params.page
      });
    } else {
      // In case: request failed
      yield put({
        type: Types.GET_LIST_REVENUE_PRODUCT_FAILED,
        error: response.error
      });
    }
  } catch (error) {
    // in case: server error
    yield put({ type: Types.GET_LIST_REVENUE_PRODUCT_FAILED, error });
  }
}

/*
  Starts get revenues list on each dispatched `GET_REVENUES_PRODUCT` action.
*/
function* getListRevenueProductSaga() {
  yield takeLatest(Types.GET_LIST_REVENUE_PRODUCT, getListRevenueProduct);
}

export default getListRevenueProductSaga;

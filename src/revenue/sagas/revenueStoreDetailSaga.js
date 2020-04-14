import { call, put, takeLatest } from 'redux-saga/effects';

import { ROUTES, API } from 'utils/Apis';
import { Types as CommonTypes } from 'commons/redux';
import { Types } from '../redux';

// worker Saga: will be fired on SEND_INVITE actions
function* getListRevenueStoreDetail(action) {
  try {
    /**
     * Example data
     * url: /revenues/store/{id}
     *
     */
    const dataBody = {
      pageIndex: action.params.pageIndex,
      pageSize: action.params.pageSize,
      startDay: action.params.startDay,
      endDay: action.params.endDay
    };

    const response = yield call(() =>
      API.post(
        ROUTES.GET_REVENUES_STORE_DETAIL(action.params.storeId),
        dataBody
      )
    );

    if (response.status === 403) {
      yield put({ type: CommonTypes.ACCOUNT_DENIED });
    }

    if (response.ok) {
      // In case: request success
      yield put({
        type: Types.GET_LIST_REVENUE_STORE_DETAIL_SUCCESS,
        data: response.data,
        pageIndex: action.params.pageIndex,
        pageSize: action.params.pageSize
      });
    } else {
      // In case: request failed
      yield put({
        type: Types.GET_LIST_REVENUE_STORE_DETAIL_FAILED,
        error: response.error
      });
    }
  } catch (error) {
    // in case: server error
    yield put({ type: Types.GET_LIST_REVENUE_STORE_DETAIL_FAILED, error });
  }
}

/*
  Starts get revenues list on each dispatched `GET_REVENUES_STORE_DETAIL` action.
*/
function* getListRevenueStoreDetailSaga() {
  yield takeLatest(
    Types.GET_LIST_REVENUE_STORE_DETAIL,
    getListRevenueStoreDetail
  );
}

export default getListRevenueStoreDetailSaga;

// import libs
import { all } from 'redux-saga/effects';

/** login */
import getImageCategorySaga from 'productRegisterManagement/sagas/getImageCategorySaga';
import LoginSaga from 'account/sagas/LoginSaga';
import LogOutSaga from 'account/sagas/LogOutSaga';
import getRevenuesSaga from 'home/sagas/getRevenuesSaga';
import getAddressOptionsSaga from 'storeManagement/sagas/getAddressOptionsSaga';
import getStoreListSaga from 'storeManagement/sagas/getStoreListSaga';
import getStoreDetailSaga from 'storeManagement/sagas/getStoreDetailSaga';
import getListMemberSaga from 'memberManagement/sagas/getListMembersSaga';
import getProductDetailSaga from 'productRegisterManagement/sagas/getProductDetailSaga';
import checkModalDeviceSaga from 'device/sagas/checkModelDeviceSaga';
import addDeviceSaga from 'device/sagas/addDeviceSaga';
import getStoreByName from 'device/sagas/getStoreByNameSaga';
import registerProductSaga from 'productRegisterManagement/sagas/registerProductSaga';
import getListNameByCategorySaga from 'productRegisterManagement/sagas/getListNameByCategorySaga';
// import getMerchantByNameSaga from 'device/sagas/getMerchantByNameSaga';
// import getStoreDetailSaga from 'storeManagement/sagas/getStoreDetailSaga';
import getListCategories from 'productRegisterManagement/sagas/getListCategoriesSaga';
import updateProductSaga from 'productRegisterManagement/sagas/updateProductSaga';
import getDeviceCodeSaga from 'revenue/sagas/getDeviceCodeSaga';
import getListDevicesSaga from '../device/sagas/getListDevicesSaga';
import getListRevenueTimeSaga from '../revenue/sagas/revenueTimeSaga';
import getListRevenueStoreSaga from '../revenue/sagas/revenueStoreSaga';
import getListRevenueDaySaga from '../revenue/sagas/revenueDaySaga';
import getListYearSaga from '../revenue/sagas/getYearSaga';
import getListRevenueStoreDetailSaga from '../revenue/sagas/revenueStoreDetailSaga';
import getListPaymentHistorySaga from '../revenue/sagas/paymentHistorySaga';
import getListStoreByNameSaga from '../revenue/sagas/getStoreByNameSaga';
import getDeviceDetailSaga from '../device/sagas/getDetailDeviceSaga';
import resetPasswordSaga from '../device/sagas/resetPasswordSaga';
import getListReserveSaga from '../reserves/sagas/reserveSaga';
import getListReserveUseSaga from '../reserves/sagas/reserveUseSaga';
import getRegisterEventDaySaga from '../reserves/sagas/registerDayEventSaga';
import getPaymentHistoryDetailSaga from '../revenue/sagas/paymentDetailSaga';
import getPaymentHistoryCancelSaga from '../revenue/sagas/paymentHistoryCancelSaga';
import getAllListPaymentHistorySaga from '../revenue/sagas/getAllListPaymentHistorySaga';
import getListRevenueProductSaga from '../revenue/sagas/revenueProductSaga';
import getMembersDetailSaga from '../memberManagement/sagas/getMembersDetailSaga';
import getCityOptionSaga from '../storeManagement/sagas/getCityOptionSaga';
import updateDeviceSaga from '../device/sagas/updateDeviceSaga';
import registerImageProductSaga from '../productRegisterManagement/sagas/RegisterPageImageSaga';
import getListImageProductSaga from '../productRegisterManagement/sagas/GetListImageProduct';
import deleteListImageProductSaga from '../productRegisterManagement/sagas/DeleteImageProduct';
import registerLandingProductSaga from '../productRegisterManagement/sagas/RegisterPageLandingSaga';
import getListLandingProductSaga from '../productRegisterManagement/sagas/getListLandingProductSaga';
import deleteListLandingProductSaga from '../productRegisterManagement/sagas/DeleteLandingProduct';
import getProductListSaga from '../productRegisterManagement/sagas/getProductListSaga';
import addMaintain from '../device/sagas/addMaintainSaga';
import getAdvertingsSaga from '../adverting/sagas/getAdvertingsSaga';
import saveAdvertingsSaga from '../adverting/sagas/saveAdvertingsSaga';
import getStatusAdvSaga from '../adverting/sagas/getStatusAdvSaga';
import deleteAllAdvertingSaga from '../adverting/sagas/deleteAllAdvertingSaga';
import updateStatusSaga from '../adverting/sagas/updateStatusSaga';
import getImageCategoryAuthorSaga from '../productRegisterManagement/sagas/getImageCategoryAuthorSaga';

export default function* RootSagas() {
  yield all([
    // account sagas
    LoginSaga(),
    LogOutSaga(),
    // home sagas
    getRevenuesSaga(),
    // store
    getAddressOptionsSaga(),
    getStoreDetailSaga(),
    // device
    getListDevicesSaga(),
    getDeviceDetailSaga(),
    addDeviceSaga(),
    getStoreByName(),
    resetPasswordSaga(),
    // revenue Time
    getListRevenueTimeSaga(),
    // revenue Store
    getListRevenueStoreSaga(),
    getListRevenueStoreDetailSaga(),
    getListPaymentHistorySaga(),
    getListRevenueDaySaga(),
    getListYearSaga(),
    getDeviceCodeSaga(),
    getListRevenueProductSaga(),
    getListStoreByNameSaga(),
    getPaymentHistoryCancelSaga(),
    // stores
    getStoreListSaga(),
    getListMemberSaga(),
    checkModalDeviceSaga(),
    getStoreDetailSaga(),
    // reserve
    getListReserveSaga(),
    getListReserveUseSaga(),
    getRegisterEventDaySaga(),
    getPaymentHistoryDetailSaga(),
    getMembersDetailSaga(),
    getCityOptionSaga(),
    updateDeviceSaga(),
    registerImageProductSaga(),
    getListImageProductSaga(),
    deleteListImageProductSaga(),
    updateProductSaga(),
    registerProductSaga(),
    registerLandingProductSaga(),
    getListLandingProductSaga(),
    deleteListLandingProductSaga(),
    getAllListPaymentHistorySaga(),

    // product management
    getProductListSaga(),
    addMaintain(),
    getProductDetailSaga(),
    getImageCategorySaga(),
    getListNameByCategorySaga(),
    getListCategories(),
    getImageCategoryAuthorSaga(),

    // adverting
    getAdvertingsSaga(),
    saveAdvertingsSaga(),
    deleteAllAdvertingSaga(),
    updateStatusSaga(),
    getStatusAdvSaga()
  ]);
}

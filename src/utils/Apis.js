// import libs
import { create } from 'apisauce';

// import App's config
import AppConfig from 'config/appConfig';

export const ROUTES = {
  // Auths
  LOGIN: `/api/login`,
  LOG_OUT: `/api/logout`,
  GET_REVENUES: `api/admin/home`,
  GET_ADDRESS_OPTIONS: `/api/store-owner/address`,
  GET_CITY_OPTIONS: `/api/store-owner/address`,
  GET_REVENUES_NAME: `/revenues-name`,
  GET_REVENUES_TIME: `api/admin/revenues-times`,
  GET_REVENUES_STORE: `api/admin/revenues-store`,
  GET_DEVICE_CODE: `api/admin/getCodeDevice`,
  GET_REVENUES_DAY: `api/admin/revenues`,
  GET_REVENUES_PRODUCT: `api/admin/revenues-product`,
  GET_REVENUES_STORE_DETAIL: storeId => `api/admin/revenues-store/${storeId}`,
  GET_STORES: '/api/admin/stores',
  GET_DEVICE_DETAIL: id => `api/admin/devices/${id}`,
  RESET_PASSWORD: id => `api/admin/device/reset-password/${id}`,
  UPDATE_DEVICE: id => `api/admin/devices/${id}`,
  ADD_MAINTAIN: `api/admin/device/mainenace/create`,
  GET_STORES_DETAIL: traderNo => `/api/admin/store/${traderNo}`,
  REGISTER_IMAGE_PRODUCT_API: '/api/admin/category-image/upload',
  GET_LIST_IMAGE_PRODUCT_API: '/api/admin/category-images',
  DELETE_LIST_IMAGE_PRODUCT_API: '/api/admin/category-image/delete',
  REGISTER_LANDING_PRODUCT_API: '/api/admin/category-image/upload',
  GET_LIST_LANDING_PRODUCT_API: '/api/admin/category-images',
  DELETE_LIST_LANDING_PRODUCT_API: '/api/admin/category-image/delete',
  GET_MEMBERS: '/members',
  CHECK_DEVICE: deviceCode => `/api/admin/checkDeviceCode/?code=${deviceCode}`,
  GET_LIST_DEVICES: '/api/admin/devices',
  GET_STORE_BY_NAME: '/api/admin/getListUserStore',
  GET_LIST_STORE_BY_NAME: `/api/admin/getListUserStore`,
  ADD_DEVICE: '/api/admin/device/create',
  GET_LIST_MEMBERS: 'api/admin/product-users',
  GET_MEMBERS_DETAIL: `api/admin/product-user`,
  SEARCH_MERCHANT_BY_NAME: '/search-merchant',
  GET_PAYMENT: `/api/admin/revenues-payment-history`,
  GET_PAYMENT_DETAIL: orderId =>
    `/api/admin/revenues-payment-history/${orderId}`,
  GET_PAYMENT_CANCEL: orderId =>
    `/api/admin/revenues-payment-history/${orderId}/cancel`,
  GET_RESERVE: `/api/admin/bonus-policies`,
  API_REGISTER_EVENT_DAY: `/api/admin/bonus-policy`,
  GET_PRODUCTS: `/api/admin/products`,
  GET_PRODUCT_DETAIL: id => `/api/admin/product/${id}`,
  GET_IMAGES_BY_CATEGORY_ID: id => `/api/admin/category-image/${id}`,
  UPDATE_PRODUCT: id => `/api/admin/product/${id}`,
  REGISTER_PRODUCT: `/api/admin/product/register`,
  GET_NAMES_BY_CATEGORY_ID: id => `/api/admin/fcCategories/${id}`,
  GET_LIST_CATEGORY: `/api/admin/fcCategories`,
  GET_ADVERTING: `api/admin/advertisement/search`,
  SAVE_ADVS: `/api/admin/advertisement/save`,
  UPDATE_STATUS_ADVS: `/api/admin/advertisement/status/update`,
  GET_STATUS_ADVS: `/api/admin/advertisement/status/fetch`,
  DELETE_ALL: `/api/admin/advertisement/deleteAll`,
  API_GET_LIST_RESERVE_USE: `/api/admin/bonus-policy/use`,
  GET_IMAGES_BY_CATEGORY_AUTHOR: `/api/admin/category-image/admin/`
};

export const API = create({
  baseURL: AppConfig.API_URL
});

// import libs
import { createActions, createReducer } from 'reduxsauce';
import Immutable from 'seamless-immutable';
import appConfig from 'config/appConfig';
import { categoryProduct } from 'constants/listKey';

// Define action creators
export const { Types, Creators } = createActions({
  getListProduct: ['params'],
  getListProductSuccess: null,
  getListProductFailed: null,
  /** Image Profuct */
  registerImageProduct: ['params'],
  registerImageProductSuccess: null,
  registerImageProductFailed: null,
  getListImageProduct: ['params'],
  getListImageProductSuccess: null,
  getListImageProductFailed: null,
  deleteListImageProduct: ['params'],
  deleteListImageProductSuccess: null,
  deleteListImageProductFailed: null,
  /** Landing product */
  registerLandingProduct: ['params'],
  registerLandingProductSuccess: null,
  registerLandingProductFailed: null,
  getListLandingProduct: ['params'],
  getListLandingProductSuccess: null,
  getListLandingProductFailed: null,
  deleteListLandingProduct: ['params'],
  deleteListLandingProductSuccess: null,
  deleteListLandingProductFailed: null,
  /** End */
  getProductDetail: ['id'],
  getProductDetailSuccess: null,
  getProductDetailFailed: null,
  getImageCategory: ['id'],
  getImageCategorySuccess: null,
  getImageCategoryFailed: null,
  updateProduct: ['data', 'id'],
  updateProductSuccess: null,
  updateProductFailed: null,
  registerProduct: ['data'],
  registerProductSuccess: null,
  registerProductFailed: null,
  getListNameByCategory: ['id'],
  getListNameByCategorySuccess: null,
  getListNameByCategoryFailed: null,
  getListCategories: null,
  getListCategoriesSuccess: null,
  getListCategoriesFailed: null,
  getProductSelecting: ['id'],
  getImageCategoryAuthor: null,
  getImageCategoryAuthorSuccess: null,
  getImageCategoryAuthorFailed: null
});

// Initial state
export const INITIAL_STATE = Immutable({
  isProcessing: false,
  isProcessingDetail: false,
  error: '',
  listProduct: [],
  productDetail: {},
  listProductName: [],
  categoriesOptions: [],
  imageList: [],
  productSelecting: null
});

/** Image Product */
const registerImageProduct = (state, action) => {
  return state.merge({
    type: action.type,
    isProcessing: true
  });
};

const registerImageProductSuccess = (state, action) => {
  const textCategory = categoryProduct.find(
    item => item.value === action.data.category
  );

  const formatData = {
    id: action.data.id,
    image: (action.data && action.data.image) || '',
    category: textCategory && textCategory.label,
    url: action.data.image && (appConfig.IMG_URL + action.data.image || '')
  };
  return state.merge({
    type: action.type,
    listImageProduct: [formatData, ...state.listImageProduct],
    isProcessing: false
  });
};

const registerImageProductFailed = (state, action) => {
  return state.merge({
    isProcessing: false,
    type: action.type,
    errorServer: action.error
  });
};

// Members Detail
const getListImageProduct = (state, action) => {
  return state.merge({
    type: action.type,
    isProcessing: true
  });
};

const getListImageProductSuccess = (state, action) => {
  const { data } = action;
  const listImage =
    data &&
    data.productImages.map((item, index) => ({
      rowId: `${data.totalRows - data.currentPage * action.numberRows - index}`,
      id: item.id,
      image: item.image && (appConfig.IMG_URL + item.image || ''),
      category: item.category || '',
      imageName: item.imageName || '',
      url: item.image || ''
    }));
  return state.merge({
    listImageProduct: listImage,
    totalRows: data.totalRows,
    isProcessing: false
  });
};

const getListImageProductFailed = (state, action) => {
  return state.merge({
    isProcessing: false,
    error: action.error
  });
};

const deleteListImageProduct = (state, action) => {
  return state.merge({
    type: action.type,
    isProcessing: true
  });
};
const deleteImageProductSuccess = (state, action) => {
  return state.merge({
    type: action.type,
    listImageProduct: state.listImageProduct,
    isProcessing: false
  });
};

const deleteImageProductFailed = (state, action) => {
  return state.merge({
    isProcessing: false,
    error: action.error
  });
};

/** Landing Product */
const registerLandingProduct = (state, action) => {
  return state.merge({
    type: action.type,
    isProcessing: true
  });
};

const registerLandingProductSuccess = (state, action) => {
  const textCategory = categoryProduct.find(
    item => item.value === action.data.category
  );
  const formatData = {
    id: action.data.id,
    image: appConfig.IMG_URL + action.data.image || '',
    category: textCategory.label,
    url: appConfig.IMG_URL + action.data.image || ''
  };
  return state.merge({
    type: action.type,
    listImageProduct: [formatData, ...state.listLandingProduct],
    isProcessing: false
  });
};

const registerLandingProductFailed = (state, action) => {
  return state.merge({
    isProcessing: false,
    error: action.error
  });
};

const getListLandingProduct = (state, action) => {
  return state.merge({
    type: action.type,
    isProcessing: true
  });
};

const getListLandingProductSuccess = (state, action) => {
  const { data } = action;
  const listImage =
    data &&
    data.productImages.map((item, index) => ({
      rowId: `${data.totalRows - data.currentPage * action.numberRows - index}`,
      id: item.id,
      image: appConfig.IMG_URL + item.image || '',
      category: item.category || '',
      url: item.image && (appConfig.IMG_URL + item.image || '')
    }));
  return state.merge({
    listLandingProduct: listImage,
    totalRows: data.totalRows,
    isProcessing: false
  });
};

const getListLandingProductFailed = (state, action) => {
  return state.merge({
    isProcessing: false,
    error: action.error
  });
};

const deleteListLandingProduct = (state, action) => {
  return state.merge({
    type: action.type,
    isProcessing: true
  });
};
const deleteLandingProductSuccess = (state, action) => {
  return state.merge({
    type: action.type,
    listLandingProduct: state.listLandingProduct,
    isProcessing: false
  });
};

const deleteLandingProductFailed = (state, action) => {
  return state.merge({
    isProcessing: false,
    error: action.error
  });
};

// Assign handler to types.
// Define action creators

export const getListProduct = (state, action) => {
  return state.merge({
    isProcessing: true,
    type: action.type
  });
};

export const getListProductSuccess = (state, action) => {
  const { products, totalRows, currentPage } = action.data;
  const dataProducts = products.map((product, index) => {
    const categoryName =
      product && product.categoryId === 9999
        ? '자체상품'
        : product.categoryName;
    return {
      rowId: `${totalRows - currentPage * action.numberRows - index}`,
      id: product.id,
      code: product.codeProduct,
      category: categoryName,
      name: product.nameProduct
      // branch: product.branch
    };
  });
  return state.merge({
    isProcessing: false,
    type: action.type,
    listProduct: dataProducts,
    totalRows
  });
};

export const getListProductFailed = (state, action) => {
  return state.merge({
    isProcessing: false,
    type: action.type
  });
};

export const getProductDetail = (state, action) => {
  return state.merge({
    isProcessingDetail: true,
    type: action.type
  });
};

export const getProductDetailSuccess = (state, action) => {
  const { data } = action;
  const productDetail = {
    id: data && data.id,
    codeProduct: data && data.codeProduct,
    manufacturer: (data && data.manufacturer) || '',
    categoryName: data && data.categoryName,
    nameProduct: data && data.nameProduct,
    branch: data && data.branch,
    categoryId: data && data.categoryId,
    taxType: data && data.taxType,
    origin: data && data.origin,
    productOrigin: data && data.productOrigin,
    level: data && data.level,
    commonPrice: data && data.commonPrice,
    imagePath: data && data.imagePath,
    landing1Path: data && data.landing1Path,
    landing2Path: data && data.landing2Path,
    landing3Path: data && data.landing3Path,
    landing4Path: data && data.landing4Path,
    landing5Path: data && data.landing5Path,
    type: data && data.type,
    priceCost: data && `${data.priceCost.toLocaleString('en')}원`,
    mass: data && `${data.mass.toLocaleString('en')}g`
  };
  return state.merge({
    isProcessingDetail: false,
    type: action.type,
    productDetail
  });
};
export const getProductDetailFailed = (state, action) => {
  return state.merge({
    isProcessingDetail: false,
    type: action.type
  });
};

export const getImageCategory = (state, action) => {
  return state.merge({
    isProcessing: true,
    type: action.type
  });
};

export const getImageCategorySuccess = (state, action) => {
  const { data } = action;
  const imageList = data
    ? data.map(item => ({
        id: item.id,
        value: item.image && `${appConfig.IMG_URL}${item.image}`,
        img: item.image && (item.image || ''),
        imageName: item.imageName || '',
        category: item.category
      }))
    : [];
  return state.merge({
    isProcessing: false,
    type: action.type,
    imageList
  });
};

export const getImageCategoryFailed = (state, action) => {
  return state.merge({
    // isProcessing: false,
    type: action.type
  });
};

export const updateProduct = (state, action) => {
  return state.merge({
    isProcessing: true,
    type: action.type
  });
};

export const updateProductSuccess = (state, action) => {
  return state.merge({
    isProcessing: false,
    type: action.type,
    error: action.error
  });
};

export const updateProductFailed = (state, action) => {
  return state.merge({
    isProcessing: false,
    type: action.type
  });
};

export const registerProduct = (state, action) => {
  return state.merge({
    isProcessing: true,
    type: action.type
  });
};

export const registerProductSuccess = (state, action) => {
  return state.merge({
    isProcessing: false,
    type: action.type
  });
};

export const registerProductFailed = (state, action) => {
  return state.merge({
    isProcessing: false,
    type: action.type,
    errorServer: action.error
  });
};

export const getListNameByCategory = (state, action) => {
  return state.merge({
    isProcessing: true,
    type: action.type
  });
};

export const getListNameByCategorySuccess = (state, action) => {
  const { fcProducts } = action.data;

  const productNameList =
    fcProducts &&
    fcProducts.map(item => ({
      id: item.productNo,
      value: item.productNo,
      label: item.productName
    }));
  return state.merge({
    isProcessing: false,
    type: action.type,
    listProductName: productNameList,
    productListOptions: fcProducts
  });
};

export const getListNameByCategoryFailed = (state, action) => {
  return state.merge({
    isProcessing: false,
    type: action.type
  });
};

export const getListCategories = (state, action) => {
  return state.merge({
    // isProcessing: false,
    type: action.type
  });
};

export const getListCategoriesSuccess = (state, action) => {
  const { Categories } = action.data;
  const data = {
    id: 9999,
    value: 9999,
    label: '자체상품'
  };

  const defaultCategoriesOptions = {
    id: 0,
    value: '',
    label: '전체'
  };

  const categoriesOptions =
    Categories &&
    Categories.map(item => ({
      id: item.id,
      value: item.id,
      label: item.categoryName
    }));

  const categoryOptionWithData = [...categoriesOptions, data];
  return state.merge({
    // isProcessing: false,
    type: action.type,
    categoriesOptions: [defaultCategoriesOptions, ...categoryOptionWithData],
    categoriesOption: categoriesOptions,
    categoriesSelect: [defaultCategoriesOptions, ...categoriesOptions]
  });
};

export const getListCategoriesFailed = (state, action) => {
  return state.merge({
    // isProcessing: false,
    type: action.type
  });
};

const getProductSelecting = (state, action) => {
  const dataProductSelecting =
    state.productListOptions &&
    state.productListOptions.find(item => item.productNo === action.id);

  const formatDataProduct = {
    categoryNo: dataProductSelecting && dataProductSelecting.categoryId,
    id: action.id,
    productCode: dataProductSelecting && dataProductSelecting.erpProductCode,
    manufacturer: dataProductSelecting && dataProductSelecting.sellCompanyName,
    tax:
      dataProductSelecting && dataProductSelecting.taxYn === 'N'
        ? 'free'
        : 'tax',
    mass: dataProductSelecting && dataProductSelecting.unitDetail,
    priceCost: dataProductSelecting && `${dataProductSelecting.unitPrice}원`,
    origin: dataProductSelecting && dataProductSelecting.origin
  };
  return state.merge({
    type: action.type,
    productSelecting: formatDataProduct
  });
};

export const getImageCategoryAuthor = (state, action) => {
  return state.merge({
    isProcessing: true,
    type: action.type
  });
};

export const getImageCategoryAuthorSuccess = (state, action) => {
  const { data } = action;
  const imageListAuthor = data
    ? data.map(item => ({
        id: item.id,
        value: item.image && `${appConfig.IMG_URL}${item.image}`,
        img: item.image && (item.image || ''),
        category: item.category,
        imageName: item.imageName
      }))
    : [];
  return state.merge({
    isProcessing: false,
    type: action.type,
    imageListAuthor
  });
};

export const getImageCategoryAuthorFailed = (state, action) => {
  return state.merge({
    // isProcessing: false,
    type: action.type
  });
};
// Assign handler to types.
const HANDLERS = {
  [Types.GET_LIST_PRODUCT]: getListProduct,
  [Types.GET_LIST_PRODUCT_SUCCESS]: getListProductSuccess,
  [Types.GET_LIST_PRODUCT_FAILED]: getListProductFailed,
  /** Image Product */
  [Types.REGISTER_IMAGE_PRODUCT]: registerImageProduct,
  [Types.REGISTER_IMAGE_PRODUCT_SUCCESS]: registerImageProductSuccess,
  [Types.REGISTER_IMAGE_PRODUCT_FAILED]: registerImageProductFailed,
  [Types.GET_LIST_IMAGE_PRODUCT]: getListImageProduct,
  [Types.GET_LIST_IMAGE_PRODUCT_SUCCESS]: getListImageProductSuccess,
  [Types.GET_LIST_IMAGE_PRODUCT_FAILED]: getListImageProductFailed,
  [Types.DELETE_LIST_IMAGE_PRODUCT]: deleteListImageProduct,
  [Types.DELETE_LIST_IMAGE_PRODUCT_SUCCESS]: deleteImageProductSuccess,
  [Types.DELETE_LIST_IMAGE_PRODUCT_FAILED]: deleteImageProductFailed,
  /** landing Product */
  [Types.REGISTER_LANDING_PRODUCT]: registerLandingProduct,
  [Types.REGISTER_LANDING_PRODUCT_SUCCESS]: registerLandingProductSuccess,
  [Types.REGISTER_LANDING_PRODUCT_FAILED]: registerLandingProductFailed,
  [Types.GET_LIST_LANDING_PRODUCT]: getListLandingProduct,
  [Types.GET_LIST_LANDING_PRODUCT_SUCCESS]: getListLandingProductSuccess,
  [Types.GET_LIST_LANDING_PRODUCT_FAILED]: getListLandingProductFailed,
  [Types.DELETE_LIST_LANDING_PRODUCT]: deleteListLandingProduct,
  [Types.DELETE_LIST_LANDING_PRODUCT_SUCCESS]: deleteLandingProductSuccess,
  [Types.DELETE_LIST_LANDING_PRODUCT_FAILED]: deleteLandingProductFailed,
  /* end */
  [Types.GET_PRODUCT_DETAIL]: getProductDetail,
  [Types.GET_PRODUCT_DETAIL_SUCCESS]: getProductDetailSuccess,
  [Types.GET_PRODUCT_DETAIL_FAILED]: getProductDetailFailed,
  [Types.GET_IMAGE_CATEGORY]: getImageCategory,
  [Types.GET_IMAGE_CATEGORY_SUCCESS]: getImageCategorySuccess,
  [Types.GET_IMAGE_CATEGORY_FAILED]: getImageCategoryFailed,
  [Types.UPDATE_PRODUCT]: updateProduct,
  [Types.UPDATE_PRODUCT_SUCCESS]: updateProductSuccess,
  [Types.UPDATE_PRODUCT_FAILED]: updateProductFailed,
  [Types.REGISTER_PRODUCT]: registerProduct,
  [Types.REGISTER_PRODUCT_SUCCESS]: registerProductSuccess,
  [Types.REGISTER_PRODUCT_FAILED]: registerProductFailed,
  [Types.GET_LIST_NAME_BY_CATEGORY]: getListNameByCategory,
  [Types.GET_LIST_NAME_BY_CATEGORY_SUCCESS]: getListNameByCategorySuccess,
  [Types.GET_LIST_NAME_BY_CATEGORY_FAILED]: getListNameByCategoryFailed,
  [Types.GET_LIST_CATEGORIES]: getListCategories,
  [Types.GET_LIST_CATEGORIES_SUCCESS]: getListCategoriesSuccess,
  [Types.GET_LIST_CATEGORIES_FAILED]: getListCategoriesFailed,
  [Types.GET_PRODUCT_SELECTING]: getProductSelecting,
  [Types.GET_IMAGE_CATEGORY_AUTHOR]: getImageCategoryAuthor,
  [Types.GET_IMAGE_CATEGORY_AUTHOR_SUCCESS]: getImageCategoryAuthorSuccess,
  [Types.GET_IMAGE_CATEGORY_AUTHOR_FAILED]: getImageCategoryAuthorFailed
};

// Create reducers by pass state and handlers
export const productReducer = createReducer(INITIAL_STATE, HANDLERS);

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Creators as CommonCreator } from 'commons/redux';
import EditProduct from '../components/productManagement/editProduct';

import { Creators } from '../redux';

const mapStateToProps = state => {
  return {
    isProcessing: state.productReducer.isProcessing,
    isProcessingDetail: state.productReducer.isProcessingDetail,
    type: state.productReducer.type,
    productDetail: state.productReducer.productDetail,
    imageList: state.productReducer.imageList,
    categoriesOptions: state.productReducer.categoriesOptions,
    error: state.productReducer.error,
    isOpenNotify: state.commonReducer.isOpenNotify,
    listProductName: state.productReducer.listProductName,
    productSelecting: state.productReducer.productSelecting,
    imageListAuthor: state.productReducer.imageListAuthor
  };
};

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      ...Creators,
      getProductDetail: Creators.getProductDetail,
      getImageCategory: Creators.getImageCategory,
      updateProduct: Creators.updateProduct,
      getListCategories: Creators.getListCategories,
      notifyAccountDenied: CommonCreator.notifyAccountDenied,
      getListNameByCategory: Creators.getListNameByCategory,
      getProductSelecting: Creators.getProductSelecting,
      getImageCategoryAuthor: Creators.getImageCategoryAuthor
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditProduct);

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Creators as CommonCreator } from 'commons/redux';
import RegisterProductForm from '../components/productManagement/RegisterProductForm';

import { Creators } from '../redux';

const mapStateToProps = state => {
  return {
    isProcessing: state.productReducer.isProcessing,
    type: state.productReducer.type,
    listProductName: state.productReducer.listProductName,
    imageList: state.productReducer.imageList,
    categoriesOptions: state.productReducer.categoriesOption,
    errorServer: state.productReducer.errorServer,
    isOpenNotify: state.commonReducer.isOpenNotify,
    productSelecting: state.productReducer.productSelecting
  };
};

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      ...Creators,
      registerProduct: Creators.registerProduct,
      getImageCategory: Creators.getImageCategory,
      getListNameByCategory: Creators.getListNameByCategory,
      getListCategories: Creators.getListCategories,
      notifyAccountDenied: CommonCreator.notifyAccountDenied,
      getProductSelecting: Creators.getProductSelecting
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RegisterProductForm);

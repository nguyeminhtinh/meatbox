import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Creators as CommonCreator } from 'commons/redux';
import { Creators } from '../redux';
import ImageRegisterManagement from '../components/imageRegisterManagement';

const mapStateToProps = state => {
  return {
    isProcessing: state.productReducer.isProcessing,
    type: state.productReducer.type,
    listImageProduct: state.productReducer.listImageProduct,
    totalRows: state.productReducer.totalRows,
    getListCategories: Creators.getListCategories,
    categoriesOptions: state.productReducer.categoriesOptions,
    isOpenNotify: state.commonReducer.isOpenNotify,
    errorServer: state.productReducer.errorServer
  };
};

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      ...Creators,
      registerImageProduct: Creators.registerImageProduct,
      getListImageProduct: Creators.getListImageProduct,
      deleteListImageProduct: Creators.deleteListImageProduct,
      getListCategories: Creators.getListCategories,
      notifyAccountDenied: CommonCreator.notifyAccountDenied
    },
    dispatch
  );
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ImageRegisterManagement);

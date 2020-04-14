import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Creators as CommonCreator } from 'commons/redux';
import productManagement from '../components/productManagement';

import { Creators } from '../redux';

const mapStateToProps = state => {
  return {
    isProcessing: state.productReducer.isProcessing,
    listProduct: state.productReducer.listProduct,
    totalRows: state.productReducer.totalRows,
    categoriesOption: state.productReducer.categoriesOptions,
    isOpenNotify: state.commonReducer.isOpenNotify
  };
};

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      ...Creators,
      getListProduct: Creators.getListProduct,
      getListCategories: Creators.getListCategories,
      notifyAccountDenied: CommonCreator.notifyAccountDenied
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(productManagement);

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Creators as CommonCreator } from 'commons/redux';
import { Creators } from '../redux';
import LandingRegisterManagement from '../components/pageRegisterManagement';

const mapStateToProps = state => {
  return {
    isProcessing: state.productReducer.isProcessing,
    type: state.productReducer.type,
    listLandingProduct: state.productReducer.listLandingProduct,
    totalRows: state.productReducer.totalRows,
    isOpenNotify: state.commonReducer.isOpenNotify
  };
};

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      ...Creators,
      registerLandingProduct: Creators.registerLandingProduct,
      getListLandingProduct: Creators.getListLandingProduct,
      deleteListLandingProduct: Creators.deleteListLandingProduct,
      notifyAccountDenied: CommonCreator.notifyAccountDenied
    },
    dispatch
  );
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LandingRegisterManagement);

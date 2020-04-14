import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Creators as CommonCreator } from 'commons/redux';
import StoreDetail from '../components/MerchantInfo';

import { Creators } from '../redux';

const mapStateToProps = state => {
  return {
    dataStoreDetail: state.storesReducer.dataStoreDetail,
    isProcessing: state.storesReducer.isProcessing,
    listDevice: state.storesReducer.listDevice,
    isOpenNotify: state.commonReducer.isOpenNotify
  };
};

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      ...Creators,
      getStoreDetail: Creators.getStoreDetail,
      notifyAccountDenied: CommonCreator.notifyAccountDenied
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(StoreDetail);

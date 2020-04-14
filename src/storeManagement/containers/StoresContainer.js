import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Creators as CommonCreator } from 'commons/redux';
import Stores from '../components';

import { Creators } from '../redux';

const mapStateToProps = state => {
  return {
    addressOptions: state.storesReducer.addressOptions,
    listStores: state.storesReducer.listStores,
    isProcessing: state.storesReducer.isProcessing,
    totalRows: state.storesReducer.totalRows,
    cityOptions: state.storesReducer.cityOptions,
    isOpenNotify: state.commonReducer.isOpenNotify
  };
};

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      ...Creators,
      getListStores: Creators.getListStores,
      getAddressOptions: Creators.getAddressOptions,
      getCityOptions: Creators.getCityOptions,
      notifyAccountDenied: CommonCreator.notifyAccountDenied
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Stores);

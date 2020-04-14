import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Creators as StoreCreator } from 'storeManagement/redux';
import { Creators as CommonCreator } from 'commons/redux';
import Devices from '../components/Device';

import { Creators } from '../redux';

const mapStateToProps = state => {
  return {
    addressOptions: state.storesReducer.addressOptions,
    listDevices: state.devicesReducer.listDevices,
    isProcessing: state.devicesReducer.isProcessing,
    totalRows: state.devicesReducer.totalRows,
    devicesInfo: state.devicesReducer.devicesInfo,
    cityOptions: state.storesReducer.cityOptions,
    isOpenNotify: state.commonReducer.isOpenNotify
  };
};

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      ...Creators,
      getAddressOptions: StoreCreator.getAddressOptions,
      getCityOptions: StoreCreator.getCityOptions,
      notifyAccountDenied: CommonCreator.notifyAccountDenied
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Devices);

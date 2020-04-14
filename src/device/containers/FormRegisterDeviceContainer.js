import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Creators as CommonCreator } from 'commons/redux';
import FormRegisterDevice from '../components/form/FormRegisterDevice';

import { Creators } from '../redux';

const mapStateToProps = state => {
  return {
    listDevices: state.devicesReducer.listDevices,
    merchantList: state.devicesReducer.merchantList,
    // merchantSelected: state.devicesReducer.merchantSelected,
    isProcessing: state.devicesReducer.isProcessing,
    type: state.devicesReducer.type,
    message: state.devicesReducer.message,
    storeList: state.devicesReducer.storeList,
    isOpenNotify: state.commonReducer.isOpenNotify
  };
};

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      ...Creators,
      checkDeviceByModel: Creators.checkDeviceByModel,
      getMerchantSelected: Creators.getMerchantSelected,
      handleResetType: Creators.handleResetType,
      getStoresByName: Creators.getStoresByName,
      addDevice: Creators.addDevice,
      notifyAccountDenied: CommonCreator.notifyAccountDenied
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FormRegisterDevice);

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Creators as CommonCreator } from 'commons/redux';
import FormDetailDevice from '../components/form/FormDetailDevice';

import { Creators } from '../redux';

const mapStateToProps = state => {
  return {
    deviceDetail: state.devicesReducer.deviceDetail,
    isProcessing: state.devicesReducer.isProcessing,
    maintenances: state.devicesReducer.maintenances,
    message: state.devicesReducer.message,
    type: state.devicesReducer.type,
    totalRows: state.devicesReducer.totalRows,
    isOpenNotify: state.commonReducer.isOpenNotify
  };
};
const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      ...Creators,
      checkDeviceByModel: Creators.checkDeviceByModel,
      handleResetType: Creators.handleResetType,
      getDeviceDetail: Creators.getDeviceDetail,
      resetPassword: Creators.resetPassword,
      updateDevice: Creators.updateDevice,
      addMaintain: Creators.addMaintain,
      notifyAccountDenied: CommonCreator.notifyAccountDenied
    },
    dispatch
  );
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FormDetailDevice);

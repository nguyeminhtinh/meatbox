import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Creators as CommonCreator } from 'commons/redux';
import RevenueTime from '../components/revenueTime';
import { Creators } from '../redux';

const mapStateToProps = state => {
  return {
    deviceCodes: state.revenuesReducer.deviceCodes,
    listRevenueTime: state.revenuesReducer.listRevenueTime,
    dataRevenueHistories: state.revenuesReducer.dataRevenueHistories,
    totalRows: state.revenuesReducer.totalRows,
    isProcessing: state.revenuesReducer.isProcessing,
    isOpenNotify: state.commonReducer.isOpenNotify
  };
};
const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      ...Creators,
      getDeviceCode: Creators.getDeviceCode,
      notifyAccountDenied: CommonCreator.notifyAccountDenied
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RevenueTime);

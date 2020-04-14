import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Creators as CommonCreator } from 'commons/redux';
import RevenueProduct from '../components/revenueProduct';
import { Creators } from '../redux';

const mapStateToProps = state => {
  return {
    listRevenueProduct: state.revenuesReducer.listRevenueProduct,
    dataCount: state.revenuesReducer.dataCount,
    deviceCodes: state.revenuesReducer.deviceCodes,
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
)(RevenueProduct);

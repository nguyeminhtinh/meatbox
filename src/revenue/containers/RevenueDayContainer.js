import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Creators as CommonCreator } from 'commons/redux';
import RevenueDay from '../components/revenueDay';
import { Creators } from '../redux';

const mapStateToProps = state => {
  return {
    listRevenueDay: state.revenuesReducer.listRevenueDay,
    listYear: state.revenuesReducer.listYear,
    dataRevenueHistories: state.revenuesReducer.dataRevenueHistories,
    isProcessing: state.revenuesReducer.isProcessing,
    isOpenNotify: state.commonReducer.isOpenNotify
  };
};

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      ...Creators,
      getListRevenueDay: Creators.getListRevenueDay,
      getListYear: Creators.getListYear,
      notifyAccountDenied: CommonCreator.notifyAccountDenied
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RevenueDay);

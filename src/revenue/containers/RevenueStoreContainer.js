import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Creators as CommonCreator } from 'commons/redux';
import RevenueTime from '../components/revenueStore';
import { Creators } from '../redux';

const mapStateToProps = state => {
  return {
    listRevenueStore: state.revenuesReducer.listRevenueStore,
    dataRevenue: state.revenuesReducer.dataRevenue,
    listRevenueStoreDetail: state.revenuesReducer.listRevenueStoreDetail,
    isOpenModal: state.revenuesReducer.isOpenModal,
    totalRows: state.revenuesReducer.totalRows,
    isProcessing: state.revenuesReducer.isProcessing,
    isOpenNotify: state.commonReducer.isOpenNotify
  };
};

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      ...Creators,
      openModal: Creators.openModal,
      closeModal: Creators.closeModal,
      getListRevenueStoreDetail: Creators.getListRevenueStoreDetail,
      notifyAccountDenied: CommonCreator.notifyAccountDenied
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RevenueTime);

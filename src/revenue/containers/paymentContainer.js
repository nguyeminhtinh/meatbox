import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Creators as CommonCreator } from 'commons/redux';
import HistoryPayment from '../components/payment';
import { Creators } from '../redux';

const mapStateToProps = state => {
  return {
    listPayment: state.revenuesReducer.listPayment,
    isOpenModal: state.revenuesReducer.isOpenModal,
    isProcessing: state.revenuesReducer.isProcessing,
    deviceCodes: state.revenuesReducer.deviceCodes,
    storeName: state.revenuesReducer.storeName,
    totalRows: state.revenuesReducer.totalRows,
    paymentDetail: state.revenuesReducer.paymentDetail,
    isOpenNotify: state.commonReducer.isOpenNotify,
    listAllPayment: state.revenuesReducer.listAllPayment
  };
};

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      ...Creators,
      openModal: Creators.openModal,
      closeModal: Creators.closeModal,
      getDeviceCode: Creators.getDeviceCode,
      getListStoreByName: Creators.getListStoreByName,
      getPaymentHistoryDetail: Creators.getPaymentHistoryDetail,
      getPaymentHistoryCancel: Creators.getPaymentHistoryCancel,
      notifyAccountDenied: CommonCreator.notifyAccountDenied,
      getAllListPaymentHistory: Creators.getAllListPaymentHistory
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HistoryPayment);

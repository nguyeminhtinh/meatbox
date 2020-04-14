import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Creators as CommonCreator } from 'commons/redux';
import PaymentHistory from '../components/payment/TableHistory';
import { Creators } from '../redux';

const mapStateToProps = state => {
  return {
    listPaymentDetail: state.revenuesReducer.listPaymentDetail,
    isProcessing: state.revenuesReducer.isProcessing,
    isOpenNotify: state.commonReducer.isOpenNotify
  };
};

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      Creators,
      notifyAccountDenied: CommonCreator.notifyAccountDenied
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PaymentHistory);

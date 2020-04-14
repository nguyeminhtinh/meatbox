import { connect } from 'react-redux';
import RevenueDay from '../components/revenueDay';

const mapStateToProps = state => {
  return {
    userInfo: state.accountReducer.userInfo,
    type: state.accountReducer.type,
    isProcessing: state.accountReducer.isProcessing
  };
};

export default connect(mapStateToProps)(RevenueDay);

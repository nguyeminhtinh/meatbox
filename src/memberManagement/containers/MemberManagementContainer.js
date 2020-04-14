import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Creators as CommonCreator } from 'commons/redux';
import { Creators } from '../redux';
import MemberManagement from '../components';

const mapStateToProps = state => {
  return {
    listMembers: state.membersReducer.listMembers,
    isProcessing: state.membersReducer.isProcessing,
    totalRows: state.membersReducer.totalRows,
    totalCustomer: state.membersReducer.totalCustomer,
    isOpenNotify: state.commonReducer.isOpenNotify
  };
};

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    { ...Creators, notifyAccountDenied: CommonCreator.notifyAccountDenied },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MemberManagement);

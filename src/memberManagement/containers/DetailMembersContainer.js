import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Creators as CommonCreator } from 'commons/redux';
import MemberDetailManagement from '../components/memberInfo';
import { Creators } from '../redux';

const mapStateToProps = state => {
  return {
    membersDetail: state.membersReducer.membersDetail,
    isProcessing: state.membersReducer.isProcessing,
    totalRows: state.membersReducer.totalRows,
    point: state.membersReducer.point,
    isOpenNotify: state.commonReducer.isOpenNotify
  };
};
const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      ...Creators,
      getMembersDetail: Creators.getMembersDetail,
      notifyAccountDenied: CommonCreator.notifyAccountDenied
    },
    dispatch
  );
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MemberDetailManagement);

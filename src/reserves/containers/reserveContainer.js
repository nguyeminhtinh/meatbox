// Create reducers by pass state and handlers
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Creators as CommonCreator } from 'commons/redux';
import ReserveManagement from '../components';
import { Creators } from '../redux';

const mapStateToProps = state => {
  return {
    listReserve: state.reserveReducer.listReserve,
    isProcessing: state.reserveReducer.isProcessing,
    totalRows: state.reserveReducer.totalRows,
    type: state.reserveReducer.type,
    reserveUse: state.reserveReducer.reserveUse,
    isOpenNotify: state.commonReducer.isOpenNotify
  };
};

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      ...Creators,
      getListReserve: Creators.getListReserve,
      registerEventDay: Creators.registerEventDay,
      getListReserveUse: Creators.getListReserveUse,
      notifyAccountDenied: CommonCreator.notifyAccountDenied
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ReserveManagement);

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Creators as CommonCreator } from 'commons/redux';
import advertingPage from '../components/registerAd';

import { Creators } from '../redux';

const mapStateToProps = state => {
  return {
    isProcessing: state.advertingReducer.isProcessing,
    type: state.advertingReducer.type,
    listAdverting: state.advertingReducer.listAdverting,
    isOpenNotify: state.commonReducer.isOpenNotify,
    statusResponse: state.advertingReducer.statusResponse
  };
};

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      ...Creators,
      getAdvList: Creators.getAdvList,
      saveAdvertings: Creators.saveAdvertings,
      deleteAllAdverting: Creators.deleteAllAdverting,
      updateStatus: Creators.updateStatus,
      notifyAccountDenied: CommonCreator.notifyAccountDenied,
      getStatusAdverting: Creators.getStatusAdverting
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(advertingPage);

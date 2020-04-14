import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Creators as CommonCreator } from 'commons/redux';
import Home from '../components';

import { Creators } from '../redux';

const mapStateToProps = state => {
  return {
    isProcessing: state.homeReducer.isProcessing,
    topRevenuesTime: state.homeReducer.topRevenuesTime,
    topProducts: state.homeReducer.topProducts,
    topRevenuesDay: state.homeReducer.topRevenuesDay,
    countShop: state.homeReducer.countShop,
    countDevice: state.homeReducer.countDevice,
    countUser: state.homeReducer.countUser,
    isOpenNotify: state.commonReducer.isOpenNotify
  };
};

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      ...Creators,
      getRevenues: Creators.getRevenues,
      notifyAccountDenied: CommonCreator.notifyAccountDenied
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);

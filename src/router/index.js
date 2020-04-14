import React from 'react';
import { API } from 'utils/Apis';

// Components
import ModalPrimary from 'components/Modal';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { Creators } from 'commons/redux';
import { Creators as AccountCreators } from 'account/redux';
import { bindActionCreators } from 'redux';
import ROUTERS from 'constants/routers';
import PrivateRoute from 'utils/PrivateRoute';
import HomepageContainer from 'home/containers/HomeContainer';
import MerchantInfo from 'storeManagement/containers/StoreDetailContainer';
import SigninContainer from 'account/containers/SignInContainer';
import AddDevice from 'device/containers/FormRegisterDeviceContainer';
import DetailDevice from 'device/containers/detailDeviceContainer';
// import { API } from 'utils/Apis';
import StoresContainer from 'storeManagement/containers/StoresContainer';
import Device from '../device/containers/DeviceContainer';
import RevenueTime from '../revenue/containers/revenueTimeContainer';

// Constants
import MemberManagementContainer from '../memberManagement/containers/MemberManagementContainer';
import RevenueDay from '../revenue/containers/RevenueDayContainer';
import HistoryPayment from '../revenue/containers/paymentContainer';
import MemberInfo from '../memberManagement/containers/DetailMembersContainer';
import RevenueProduct from '../revenue/containers/revenueProductContainer';
import RevenueStoreContainer from '../revenue/containers/RevenueStoreContainer';
import AdvertingRegisterAdContainer from '../adverting/containers/AdvertingPage';
import AdvertingApprovalAdContainer from '../adverting/components/approvalAd';
import AdvertingApprovalInfoContainer from '../adverting/components/approvalAd/Form/approvalAdInfo';
import ReserveManagement from '../reserves/containers/reserveContainer';
import ProductManagement from '../productRegisterManagement/containers/productManagementContainer';
import RegisterProduct from '../productRegisterManagement/containers/RegisterProductContainer';
import ImageRegisterManagement from '../productRegisterManagement/containers/RegisterPageImagesContainer';
import EditProduct from '../productRegisterManagement/containers/productDetailContainer';
// import ImageRegisterManagement from '../productRegisterManagement/components/imageRegisterManagement';
import LandingRegisterManagement from '../productRegisterManagement/containers/RegisterPageLandingContainer';

type Props = {
  token: string,
  isOpenNotify: boolean,
  closeNotifyAccountDenied: Function,
  logOut: Function
};
const Router = ({
  token,
  isOpenNotify,
  closeNotifyAccountDenied,
  logOut
}: Props) => {
  const isAuthenticated = token !== '';

  if (token) {
    API.setHeader('Authorization', token);
  }
  return (
    <BrowserRouter>
      <main>
        <Switch>
          <Route exact path={ROUTERS.LOGIN} component={SigninContainer} />
          {/* private routers */}
          <PrivateRoute
            exact
            path={ROUTERS.ROOT}
            component={HomepageContainer}
            isAuthenticated={isAuthenticated}
          />
          <PrivateRoute
            exact
            path={ROUTERS.DEVICE}
            component={Device}
            isAuthenticated={isAuthenticated}
          />
          <PrivateRoute
            exact
            path={ROUTERS.STORES_DETAIL}
            component={MerchantInfo}
            isAuthenticated={isAuthenticated}
          />
          <PrivateRoute
            exact
            path={ROUTERS.ADD_DEVICE}
            component={AddDevice}
            isAuthenticated={isAuthenticated}
          />
          <PrivateRoute
            exact
            path={ROUTERS.DETAIL_DEVICE}
            component={DetailDevice}
            isAuthenticated={isAuthenticated}
          />
          <PrivateRoute
            exact
            path={ROUTERS.STORES}
            component={StoresContainer}
            isAuthenticated={isAuthenticated}
          />
          <PrivateRoute
            exact
            path={ROUTERS.REVENUE_TIME}
            component={RevenueTime}
            isAuthenticated={isAuthenticated}
          />
          <PrivateRoute
            exact
            path={ROUTERS.MEMBER}
            component={MemberManagementContainer}
            isAuthenticated={isAuthenticated}
          />
          <PrivateRoute
            exact
            path={ROUTERS.ADVERTING_REGISTER}
            component={AdvertingRegisterAdContainer}
            isAuthenticated={isAuthenticated}
          />
          <PrivateRoute
            exact
            path={ROUTERS.ADVERTING_INFO}
            component={AdvertingApprovalInfoContainer}
            isAuthenticated={isAuthenticated}
          />
          <PrivateRoute
            exact
            path={ROUTERS.ADVERTING_APPROVAL}
            component={AdvertingApprovalAdContainer}
            isAuthenticated={isAuthenticated}
          />

          <PrivateRoute
            exact
            path={ROUTERS.REVENUEDAY_DAY}
            component={RevenueDay}
            isAuthenticated={isAuthenticated}
          />
          <PrivateRoute
            exact
            path={ROUTERS.PAYMENT}
            component={HistoryPayment}
            isAuthenticated={isAuthenticated}
          />
          <PrivateRoute
            exact
            path={ROUTERS.MEMBER_DETAIL}
            component={MemberInfo}
            isAuthenticated={isAuthenticated}
          />
          <PrivateRoute
            exact
            path={ROUTERS.REVENUE_PRODUCT}
            component={RevenueProduct}
            isAuthenticated={isAuthenticated}
          />
          <PrivateRoute
            exact
            path={ROUTERS.REVENUE_STORE}
            component={RevenueStoreContainer}
            isAuthenticated={isAuthenticated}
          />
          <PrivateRoute
            exact
            path={ROUTERS.RESERVE}
            component={ReserveManagement}
            isAuthenticated={isAuthenticated}
          />
          <PrivateRoute
            exact
            path={ROUTERS.PRODUCT_MANAGEMENT}
            component={ProductManagement}
            isAuthenticated={isAuthenticated}
          />
          <PrivateRoute
            exact
            path={ROUTERS.REGISTER_PRODUCT}
            component={RegisterProduct}
            isAuthenticated={isAuthenticated}
          />
          <PrivateRoute
            exact
            path={ROUTERS.EDIT_PRODUCT}
            component={EditProduct}
            isAuthenticated={isAuthenticated}
          />
          <PrivateRoute
            exact
            path={ROUTERS.IMAGES_MANAGEMENT}
            component={ImageRegisterManagement}
            isAuthenticated={isAuthenticated}
          />
          <PrivateRoute
            exact
            path={ROUTERS.LANDING_MANAGEMENT}
            component={LandingRegisterManagement}
            isAuthenticated={isAuthenticated}
          />
        </Switch>
      </main>
      <ModalPrimary
        isOpen={isOpenNotify}
        content="해당 계정은 다른 기기에서 로그인 되었습니다. 다시 로그인 해주세요."
        handleClose={() => {
          closeNotifyAccountDenied();
          logOut();
        }}
        title="알림"
        textBtnLeft="확인"
        customClass="redirectLogin"
      />
    </BrowserRouter>
  );
};

const mapStateToProps = state => {
  return {
    token: state.accountReducer.token,
    isOpenNotify: state.commonReducer.isOpenNotify
  };
};

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      ...Creators,
      closeNotifyAccountDenied: Creators.closeNotifyAccountDenied,
      logOut: AccountCreators.logOut
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  null
)(Router);

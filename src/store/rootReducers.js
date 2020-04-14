import { combineReducers } from 'redux';
import { homeReducer } from 'home/redux';
import { accountReducer } from 'account/redux';
import { storesReducer } from 'storeManagement/redux';
import { devicesReducer } from 'device/redux';
import { revenuesReducer } from 'revenue/redux';
import { membersReducer } from 'memberManagement/redux';
import { productReducer } from 'productRegisterManagement/redux';
import { reserveReducer } from 'reserves/redux';
import { advertingReducer } from 'adverting/redux';
import { commonReducer } from 'commons/redux';

const appReducer = combineReducers({
  homeReducer,
  accountReducer,
  storesReducer,
  devicesReducer,
  revenuesReducer,
  membersReducer,
  reserveReducer,
  productReducer,
  advertingReducer,
  commonReducer
});

export default appReducer;

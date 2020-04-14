// @flow
// libs
import React, { memo } from 'react';
import { connect } from 'react-redux';
import { Button } from 'react-bootstrap';
import { bindActionCreators } from 'redux';
import { Creators } from '../../account/redux';

type Props = {
  logOut: Function,
  accountInfo: {
    userName: string
  }
};
export const Header = ({ accountInfo, logOut }: Props) => {
  const handleLogout = () => {
    logOut();
  };
  return (
    <div className="wrapper__header">
      <div className="text-right">
        <ul className="d-flex justify-content-end align-items-center">
          <li>
            <div>{`${accountInfo && accountInfo.userName} 님 안녕하세요`}</div>
          </li>
          <li className="ml-3">
            <Button variant="secondary" size="sm" onClick={handleLogout}>
              로그아웃
            </Button>
          </li>
        </ul>
      </div>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    accountInfo: state.accountReducer.accountInfo,
    type: state.accountReducer.type
  };
};

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      ...Creators,
      logOut: Creators.logOut
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(memo<Props>(Header));

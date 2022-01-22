import React from 'react';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { USER_TYPES } from './consts';

const RoleWrapper = ({ component, userTypes, redirectTo }) => {
  const user = useSelector((state) => state.userReducer.user || {});

  if (userTypes && (userTypes.includes(user.accountType) || userTypes.includes(USER_TYPES.UNREGISTERED))) {
    if (typeof component === 'function') {
      return component();
    }
    return component;
  }
  return (
    <Redirect to={redirectTo || '*'} />
  );
};

export default RoleWrapper;

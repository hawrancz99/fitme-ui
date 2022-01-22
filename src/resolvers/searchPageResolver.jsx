import React from 'react';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { route } from '../routes';
import SearchPage from '../pages/searchPage';
import RoleWrapper from '../roleWrapper';
import { USER_TYPES } from '../consts';

const SearchPageResolver = () => {
  const location = useSelector((state) => state.filterReducer.location);

  if (!location || location.length < 1) {
    return <Redirect to={route.home()} />;
  }

  return <RoleWrapper component={SearchPage} userTypes={[USER_TYPES.USER, USER_TYPES.UNREGISTERED]} redirectTo={route.home()} />;
};

export default SearchPageResolver;

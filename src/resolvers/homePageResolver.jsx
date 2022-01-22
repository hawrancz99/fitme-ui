import React from 'react';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import HomePage from '../pages/homePage';
import { route } from '../routes';

const HomePageResolver = () => {
  const user = useSelector((state) => state.userReducer.user || {});

  if (user.accountType === 'trainer') {
    return <Redirect to={route.trainerAdministration()} />;
  } if (user.accountType === 'gym') {
    return <Redirect to={route.sportsGroundAdministration()} />;
  }
  return <HomePage />;
};

export default HomePageResolver;

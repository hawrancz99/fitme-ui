import React from 'react';
import { Route, Switch } from 'react-router-dom';

import SportsGroundAdministrationPage from './pages/sportsGroundAdministrationPage';
import TrainerAdministrationPage from './pages/trainerAdministrationPage';
import LostPasswordPage from './pages/lostPasswordPage';
import ChangePasswordPage from './pages/changePasswordPage';
import RegistrationPage from './pages/registrationPage';
import LoginPage from './pages/loginPage';
import UserProfilePage from './pages/userProfilePage';
import PageNotFound from './pages/pageNotFound';
import SportsGroundDetailPage from './pages/sportsGroundDetailPage';
import Detail from './pages/sportsGroundDetailPage';
import RoleWrapper from './roleWrapper';
import { USER_TYPES } from './consts';
import HomePageResolver from './resolvers/homePageResolver';
import SearchPageResolver from './resolvers/searchPageResolver';
import TrainerDetailPage from './pages/trainerDetailPage';

export const route = {
  home: () => '/',
  registration: () => '/registration',
  login: () => '/login',
  passwordReset: () => '/password-reset',
  sportsGroundAdministration: () => '/gym-administration',
  trainerAdministration: () => '/trainer-administration',
  myProfile: () => '/my-profile',
  search: () => '/search',
  changePassword: () => '/pwHash',
  sportsGroundDetail: (gymId) => `/sports-ground/${gymId}`,
  trainerDetail: (trainerId) => `/trainer/${trainerId}`,
};

export function Routes() {
  return (
    <Switch>
      <Route path={route.home()} exact component={HomePageResolver} />
      <Route path={route.registration()} exact component={RegistrationPage} />
      <Route path={route.login()} exact component={LoginPage} />
      <Route path={route.passwordReset()} exact component={LostPasswordPage} />
      <Route path={route.search()} exact component={SearchPageResolver} />
      <Route path={route.myProfile()} exact>
        <RoleWrapper component={UserProfilePage} userTypes={[USER_TYPES.USER]} redirectTo={route.home()} />
      </Route>
      <Route path={route.sportsGroundAdministration()} exact>
        <RoleWrapper component={SportsGroundAdministrationPage} userTypes={[USER_TYPES.SPORTS_GROUND]} redirectTo={route.home()} />
      </Route>
      <Route path={route.trainerAdministration()} exact>
        <RoleWrapper component={TrainerAdministrationPage} userTypes={[USER_TYPES.TRAINER]} redirectTo={route.home()} />
      </Route>
      <Route path={route.changePassword()} exact component={ChangePasswordPage} />
      <Route path="/detail" exact component={Detail} />
      <Route path={route.sportsGroundDetail(':gymId')} exact component={SportsGroundDetailPage} />
      <Route path={route.trainerDetail(':trainerId')} exact component={TrainerDetailPage} />
      <Route path="*" component={PageNotFound} />
    </Switch>
  );
}

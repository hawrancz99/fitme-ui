import React, { useEffect } from 'react';
import { useLazyQuery, useMutation } from '@apollo/client';
import { useDispatch, useSelector } from 'react-redux';
import { CHANGE_PASSWORD_MUTATION, GET_USER_EVENTS, UPDATE_USER_MUTATION } from '../graphql/graphql';
import { fireTriggerBackdrop } from '../actions/alert/alertActions';
import { fireUserEventsLoaded, fireUserLoaded } from '../actions/user/userActions';
import UserProfileTemplate from '../templates/userProfileTemplate';
import { afterApolloCallAction } from '../actions/common';

function UserProfilePage() {
  const dispatch = useDispatch();
  const storeToken = useSelector((state) => state.userReducer.token || null);
  const originUser = useSelector((state) => state.userReducer.user || null);
  const userEvents = useSelector((state) => state.userReducer.events || []);

  const [updateUserProfile, { error: updateProfileError }] = useMutation(UPDATE_USER_MUTATION, {
    onCompleted: ({ updateUser: { user, token } }) => {
      localStorage.setItem('token', token);
      dispatch(fireUserLoaded(user, token));
      dispatch(afterApolloCallAction('success', 'Údaje úspěšně změněny'));
    },
    onError: () => {
      dispatch(afterApolloCallAction('error', 'Nepovedlo se změnit údaje'));
    },
  });

  const [changePassword, { error: changePasswordError, data }] = useMutation(CHANGE_PASSWORD_MUTATION, {
    onCompleted: () => {
      dispatch(afterApolloCallAction('sucess', 'Heslo úspěšně změněno'));
    },
    onError: () => {
      dispatch(afterApolloCallAction('error', 'Heslo se nepodařilo změnit'));
    },
  });

  const [getUserEvents] = useLazyQuery(GET_USER_EVENTS, {
    variables: { userId: parseInt(originUser.id, 10) },
    onCompleted: ({ getEventsForUser }) => {
      dispatch(fireUserEventsLoaded(getEventsForUser));
      dispatch(fireTriggerBackdrop(false));
    },
    onError: () => {
      dispatch(fireTriggerBackdrop(false));
    },
  });

  useEffect(() => {
    if (originUser.id) {
      getUserEvents();
    }
  }, [originUser]);

  const handleChangePassword = (form) => {
    dispatch(fireTriggerBackdrop(true));
    return changePassword({ variables: { oldPassword: form.oldPassword, newPassword: form.newPassword, token: storeToken } });
  };

  const handleUpdateProfileLocal = (req) => {
    dispatch(fireTriggerBackdrop(true));
    return updateUserProfile({ variables: { userRequest: { ...req, token: storeToken } } });
  };

  return (
    <UserProfileTemplate
      handleChangePassword={handleChangePassword}
      changePasswordError={changePasswordError}
      data={data}
      updateProfileError={updateProfileError}
      handleUpdateProfile={handleUpdateProfileLocal}
      originUser={originUser}
      events={userEvents}
      refreshFn={getUserEvents}
    />
  );
}

export default UserProfilePage;

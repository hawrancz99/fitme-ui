import React from 'react';
import { useMutation } from '@apollo/client';
import { useDispatch, useSelector } from 'react-redux';
import { sportsGroundLoaded, } from '../actions/sportsGround/sportsGroundActions';
import { CHANGE_PASSWORD_MUTATION, UPDATE_GYM_MUTATION, } from '../graphql/graphql';
import { fireTriggerBackdrop } from '../actions/alert/alertActions';
import SportsGroundTemplate from '../templates/sportsGround/sportsGroundTemplate';
import { removeChecked } from '../utils/utils';
import { fireUserLoaded } from '../actions/user/userActions';
import { afterApolloCallAction } from '../actions/common';

const SportsGroundAdministrationPage = () => {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.userReducer.token || null);
  const originEmail = useSelector((state) => state.userReducer.user?.email || null);
  const mySportsGround = useSelector((state) => state.sportsGroundReducer.mySportsGround || {});
  const sportTypes = mySportsGround?.sportTypes?.map((st) => removeChecked(st));

  const [changePassword, { error: changePasswordError, data: changePasswordData }] = useMutation(CHANGE_PASSWORD_MUTATION, {
    onCompleted: () => {
      dispatch(afterApolloCallAction('success', 'Heslo úspěšně změněno'));
    },
    onError: () => {
      dispatch(afterApolloCallAction('error', 'Heslo se nepodařilo změnit'));
    },
  });

  const handleChangePassword = (form) => {
    dispatch(fireTriggerBackdrop(false));
    return changePassword({ variables: { oldPassword: form.oldPassword, newPassword: form.newPassword, token } });
  };

  const [updateSportsGround, { error: updateGymError }] = useMutation(UPDATE_GYM_MUTATION, {
    onCompleted: ({ updateGym: { user, token } }) => {
      localStorage.setItem('token', token);
      dispatch(fireUserLoaded(user, token));
      dispatch(afterApolloCallAction('success', 'Údaje úspěšně změněny'));
      dispatch(sportsGroundLoaded(user.sportsGrounds.length > 0 ? user.sportsGrounds[0] : []))
    },
    onError: () => {
      dispatch(afterApolloCallAction('error', 'Nepovedlo se změnit údaje'));
    },
  });

  const updateSportsGroundLocal = ({reviews, ...request}) => {
    dispatch(fireTriggerBackdrop(true));
    return updateSportsGround({variables: { sportsGround: {...request, originEmail: originEmail, token: token}}});
  };

  return (
    <SportsGroundTemplate
      updateSportsGroundLocal={updateSportsGroundLocal}
      error={updateGymError}
      mySportsGround={mySportsGround}
      gymSportTypes={sportTypes}
      handleChangePassword={handleChangePassword}
      changePasswordError={changePasswordError}
      changePasswordData={changePasswordData}
    />
  );
};

export default SportsGroundAdministrationPage;

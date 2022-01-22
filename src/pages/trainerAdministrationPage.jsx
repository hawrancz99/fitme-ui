import React from 'react';
import { useMutation } from '@apollo/client';
import { useDispatch, useSelector } from 'react-redux';

import { fireTrainerLoaded } from '../actions/trainer/trainerActions';
import { CHANGE_PASSWORD_MUTATION, UPDATE_TRAINER_MUTATION, } from '../graphql/graphql';
import { fireTriggerBackdrop } from '../actions/alert/alertActions';
import TrainerTemplate from '../templates/trainerTemplate/trainerTemplate';
import { removeChecked } from '../utils/utils';
import { fireUserLoaded } from '../actions/user/userActions';
import { afterApolloCallAction } from '../actions/common';

const TrainerAdministrationPage = () => {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.userReducer.token || null);
  const originEmail = useSelector((state) => state.userReducer.user?.email || null);
  const trainer = useSelector((state) => state.trainerReducer.trainer || {});
  const photos = trainer.images;
  const allSportTypes = useSelector((state) => state.filterReducer.sportTypes || []);
  const sportTypes = trainer?.sportTypes?.map((st) => removeChecked(st));

  const [changePassword, { error: changePasswordError, data: changePasswordData }] = useMutation(CHANGE_PASSWORD_MUTATION, {
    onCompleted: () => {
      dispatch(afterApolloCallAction('success', 'Heslo úspěšně změněno'));
    },
    onError: () => {
      dispatch(afterApolloCallAction('error', 'Heslo se nepodařilo změnit'));
    },
  });

  const [updateTrainer, { error: updateTrainerError }] = useMutation(UPDATE_TRAINER_MUTATION, {
    onCompleted: ({ updateTrainer: { user, token } }) => {
      localStorage.setItem('token', token);
      dispatch(fireUserLoaded(user, token));
      dispatch(afterApolloCallAction('success', 'Údaje úspěšně změněny'));
      dispatch(fireTrainerLoaded(user.trainer));
    },
    onError: () => {
      dispatch(afterApolloCallAction('error', 'Nepovedlo se změnit údaje'));
    },
  });

  const handleChangePassword = (form) => {
    dispatch(fireTriggerBackdrop(true));
    return changePassword({
      variables: {
        oldPassword: form.oldPassword,
        newPassword: form.newPassword,
        token
      }
    });
  };

  const updateTrainerLocal = ({reviews, ...request}) => {
    dispatch(fireTriggerBackdrop(true));
    return updateTrainer({
      variables: {
        trainerRequest: {
          ...request,
          originEmail: originEmail,
          token: token
        }
      }
    });
  };

  return (
    <TrainerTemplate
      updateTrainer={updateTrainerLocal}
      error={updateTrainerError}
      trainer={trainer}
      allSportTypes={allSportTypes}
      trainerSportTypes={sportTypes}
      photos={photos}
      handleChangePassword={handleChangePassword}
      changePasswordError={changePasswordError}
      changePasswordData={changePasswordData}
    />
  );
};

export default TrainerAdministrationPage;

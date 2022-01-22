import React, { useEffect, useState } from 'react';
import { useLazyQuery, useMutation } from '@apollo/client';
import { useDispatch } from 'react-redux';
import NewPasswordForm from '../organisms/newPasswordForm';
import { CHANGE_LOST_PASSWORD, CHECK_TOKEN_VALIDITY } from '../graphql/graphql';
import FitmeLoader from '../atoms/fitmeLoader';
import { fireTriggerAlert, fireTriggerBackdrop } from '../actions/alert/alertActions';
import PasswordChangedConfirmation from '../organisms/passwordChangedConfirmation';
import { afterApolloCallAction } from '../actions/common';

const ChangePasswordPage = () => {
  const dispatch = useDispatch();
  const [canChangePassword, setCanChangePassword] = useState(true);
  const [stateToken, setStateToken] = useState('');
  const [checking, setChecking] = useState(true);
  const [passwordChanged, setPasswordChanged] = useState(false);
  const [checkTokenValidityCall] = useLazyQuery(CHECK_TOKEN_VALIDITY, {
    onCompleted: ({ checkTokenValidity }) => {
      setChecking(false);
      setCanChangePassword(checkTokenValidity);
    },
    onError: () => {
      setChecking(false);
      setCanChangePassword(false);
    },
  });
  const [changePw] = useMutation(CHANGE_LOST_PASSWORD, {
    onCompleted: ({ changeLostPassword }) => {
      if (changeLostPassword) {
        dispatch(fireTriggerAlert('sucess', 'Heslo úspěšně změněno'));
        setPasswordChanged(true);
      } else {
        dispatch(afterApolloCallAction('error', 'Heslo se nepodařilo změnit'));
      }
      dispatch(fireTriggerBackdrop(false));
    },
    onError: () => {
      dispatch(afterApolloCallAction('error', 'Heslo se nepodařilo změnit'));
    },
  });

  useEffect(() => {
    const token = new URLSearchParams(window.location.search).get('t');
    if (!token || token.length < 16) {
      setCanChangePassword(false);
    } else {
      checkTokenValidityCall({ variables: { token } });
      setStateToken(token);
    }
  }, []);

  const handlePwChange = (form) => {
    dispatch(fireTriggerBackdrop(true));
    return changePw({ variables: { token: stateToken, newPassword: form.newPassword } });
  };

  const getComp = () => {
    if (passwordChanged) {
      return <PasswordChangedConfirmation />;
    } if (checking) {
      return <FitmeLoader color="secondary" loading />;
    } if (!canChangePassword) {
      return <p className="text-center">Odkaz pro změnu hesla je neplatný.</p>;
    }
    return <NewPasswordForm handleChangePassword={handlePwChange} error={false} noOldPassowrd />;
  };

  return getComp();
};

export default ChangePasswordPage;

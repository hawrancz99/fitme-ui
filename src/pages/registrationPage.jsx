import React from 'react';
import { useMutation } from '@apollo/client';
import { useDispatch, useSelector } from 'react-redux';
import { REGISTRATION_MUTATION } from '../graphql/graphql';
import { registrationStepChanged } from '../actions/user/userActions';
import { scrollToTopSinglePage } from '../utils/scrollToTop';
import RegistrationTemplate from '../templates/registrationTemplate';
import { afterApolloCallAction } from '../actions/common';

function RegistrationPage() {
  const accountType = useSelector((state) => state.registrationReducer.accountType || null);
  const activeStep = useSelector((state) => state.registrationReducer.activeStep || 0);

  const dispatch = useDispatch();
  const handleNext = () => {
    dispatch(registrationStepChanged(activeStep + 1));
  };
  const [fetchRegister, registrationState] = useMutation(REGISTRATION_MUTATION, {
    onCompleted: () => {
      scrollToTopSinglePage();
      handleNext();
      dispatch(afterApolloCallAction('success', 'Jste úspěšně zaregistrováni'));
    },
    onError: () => {
      dispatch(afterApolloCallAction('error', 'Registrace se nezdařila'));
    },
  });

  const handleSubmit = ({ passwordConfirmation, ...form }) => {
    const request = { input: { ...form, accountType } };
    return fetchRegister({ variables: request });
  };

  return (
    <RegistrationTemplate
      isLoading={registrationState.loading}
      error={registrationState.error}
      activeStep={activeStep}
      accountType={accountType}
      handleNext={handleNext}
      onSubmit={handleSubmit}
    />
  );
}

export default RegistrationPage;

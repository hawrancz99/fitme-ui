import * as React from 'react';
import RegistrationForm from '../organisms/registrationForm';

function RegistrationTemplate({
  isLoading, error, onSubmit, handleNext, activeStep, accountType,
}) {
  return (
    <RegistrationForm handleCompleted={onSubmit} error={error} loading={isLoading} handleNext={handleNext} accountType={accountType} activeStep={activeStep} />
  );
}

export default RegistrationTemplate;

import React from 'react';
import Box from '@mui/material/Box';
import { useDispatch } from 'react-redux';
import Paper from '@mui/material/Paper';
import { Typography } from '@mui/material';
import SetProfileForm from './setProfileForm';
import FitmeStepper from '../molecules/fitmeStepper';
import RegistrationConfirmation from './registrationConfirmation';
import GymRegistrationForm from './gymRegistrationForm';
import { registrationFormFilled, registrationStepChanged } from '../actions/user/userActions';
import { scrollToTopSinglePage } from '../utils/scrollToTop';
import './RegistrationForm.css';
import TrainerRegistrationForm from './registration/trainerRegistrationForm';
import AccountTypeSelect from './accountTypeSelect';

const steps = ['Zvolte typ účtu', 'Vyplňte údaje', 'Potvrzení'];

function RegistrationForm({
  handleCompleted,
  error,
  loading,
  handleNext,
  activeStep,
  accountType,
}) {
  const dispatch = useDispatch();

  const handleCompletedLocal = (formType, form) => {
    dispatch(registrationFormFilled(formType, form));
    handleCompleted(form);
  };

  const handleBack = (formType, form) => {
    if (activeStep === 1) {
      dispatch(registrationFormFilled(formType, form));
    }
    scrollToTopSinglePage();
    dispatch(registrationStepChanged(activeStep - 1));
  };

  const resolveComp = () => {
    switch (activeStep) {
      case 0: {
        return <AccountTypeSelect handleNextFn={handleNext} />;
      }
      case 1: {
        if (accountType === 'gym') {
          return (
            <GymRegistrationForm
              error={error}
              loading={loading}
              handleCompleted={handleCompletedLocal}
              handlePrevFn={handleBack}
              handleNextFn={handleNext}
            />
          );
        } if (accountType === 'trainer') {
          return (
            <TrainerRegistrationForm
              error={error}
              loading={loading}
              handleCompleted={handleCompletedLocal}
              handlePrevFn={handleBack}
              handleNextFn={handleNext}
            />
          );
        }
        return (
          <SetProfileForm
            error={error}
            loading={loading}
            handleCompleted={handleCompletedLocal}
            handlePrevFn={handleBack}
            handleNextFn={handleNext}
          />
        );
      }
      case 2: {
        return <RegistrationConfirmation />;
      }
      default:
        return null;
    }
  };

  return (
    <Box className="registration-box">
      <Paper elevation={24} className="registration-paper">
        <Typography variant="h4" component="div" style={{ marginBottom: '0.5em' }}>
          Registrace
        </Typography>
        <FitmeStepper activeStep={activeStep} steps={steps} />
        <div style={{ marginTop: '0.5em' }}>
          {resolveComp()}
        </div>
      </Paper>
    </Box>
  );
}

export default RegistrationForm;

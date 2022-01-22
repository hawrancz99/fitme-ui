import {
  REGISTRATION_ACCOUNT_TYPE_SELECTED,
  REGISTRATION_DATA_CLEARED,
  REGISTRATION_FORM_FILLED,
  REGISTRATION_STEP_CHANGED,
  USER_EVENTS_LOADED,
  USER_LOADED,
} from "../../consts";

export const fireUserLoaded = (user, token) => ({
  type: USER_LOADED,
  user,
  token,
});

export const registrationStepChanged = (activeStep) => ({
  type: REGISTRATION_STEP_CHANGED,
  activeStep,
});

export const registrationAccountTypeSelected = (accountType) => ({
  type: REGISTRATION_ACCOUNT_TYPE_SELECTED,
  accountType,
});

export const registrationFormFilled = (formType, form) => ({
  type: REGISTRATION_FORM_FILLED,
  formType,
  form,
});

export const clearRegistrationData = () => ({
  type: REGISTRATION_DATA_CLEARED,
});

export const fireUserEventsLoaded = (events) => ({
  type: USER_EVENTS_LOADED,
  events,
});

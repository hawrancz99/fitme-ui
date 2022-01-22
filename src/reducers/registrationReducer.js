import {
  REGISTRATION_ACCOUNT_TYPE_SELECTED,
  REGISTRATION_DATA_CLEARED,
  REGISTRATION_FORM_FILLED,
  REGISTRATION_STEP_CHANGED,
} from "../consts";

const initialState = {
  gymForm: {
    name: "",
    registrationNumber: "",
    phoneNumber: "",
    email: "",
    password: "",
    passwordConfirmation: "",
  },
  personalForm: {
    firstName: "",
    lastName: "",
    phoneNumber: "",
    email: "",
    password: "",
    passwordConfirmation: "",
  },
  trainerForm: {
    firstName: "",
    lastName: "",
    phoneNumber: "",
    email: "",
    password: "",
    passwordConfirmation: "",
  },
  accountType: "personal",
  activeStep: 0,
};

const RegistrationReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case REGISTRATION_ACCOUNT_TYPE_SELECTED: {
      return { ...state, accountType: action.accountType };
    }
    case REGISTRATION_FORM_FILLED: {
      if (action.formType === "gym") {
        return { ...state, gymForm: action.form };
      }
      if (action.formType === "trainer") {
        return { ...state, trainerForm: action.form };
      }
      return { ...state, personalForm: action.form };
    }
    case REGISTRATION_STEP_CHANGED: {
      return { ...state, activeStep: action.activeStep };
    }
    case REGISTRATION_DATA_CLEARED: {
      return initialState;
    }
    default:
      return state;
  }
};

export default RegistrationReducer;

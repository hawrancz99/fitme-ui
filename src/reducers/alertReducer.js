import { ALERT_OPEN, BACKDROP_OPEN } from "../consts";

const initialState = {
  fitmeAlert: {
    open: false,
    message: "",
    severity: "success",
  },
  fitmeBackdrop: {
    open: false,
  },
};

const AlertReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case ALERT_OPEN:
      return {
        ...state,
        fitmeAlert: {
          ...state.fitmeAlert,
          severity: action.severity,
          message: action.message,
          open: !state.fitmeAlert.open,
        },
      };
    case BACKDROP_OPEN:
      return {
        ...state,
        fitmeBackdrop: { ...state.fitmeBackdrop, open: action.boolean },
      };
    default:
      return state;
  }
};

export default AlertReducer;

import { fireTriggerAlert, fireTriggerBackdrop } from "./alert/alertActions";

export function afterApolloCallAction(severity, message) {
  return function (dispatch) {
    dispatch(fireTriggerBackdrop(false));
    dispatch(fireTriggerAlert(severity, message));
  };
}

import { ALERT_OPEN, BACKDROP_OPEN } from "../../consts";

export const fireTriggerAlert = (severity, message) => ({
  type: ALERT_OPEN,
  severity,
  message,
});

export const fireTriggerBackdrop = (boolean) => ({
  type: BACKDROP_OPEN,
  boolean,
});

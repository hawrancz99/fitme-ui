import { combineReducers } from "redux";
import userReducer from "./reducers/userReducer";
import registrationReducer from "./reducers/registrationReducer";
import sportsGroundReducer from "./reducers/sportsGroundReducer";
import alertReducer from "./reducers/alertReducer";
import filterReducer from "./reducers/filterReducer";
import trainerReducer from "./reducers/trainerReducer";

const rootReducer = combineReducers({
  registrationReducer,
  userReducer,
  sportsGroundReducer,
  alertReducer,
  filterReducer,
  trainerReducer,
});

export default rootReducer;

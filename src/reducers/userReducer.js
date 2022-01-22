import { USER_EVENTS_LOADED, USER_LOADED, USER_LOGGED_OUT } from "../consts";

const initialState = {
  user: null,
  token: null,
  events: [],
};

const UserReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case USER_LOADED:
      return { ...state, user: action.user, token: action.token };
    case USER_LOGGED_OUT:
      return { ...state, user: null, token: null };
    case USER_EVENTS_LOADED: {
      return { ...state, events: action.events };
    }
    default:
      return state;
  }
};

export default UserReducer;

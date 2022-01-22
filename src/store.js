import { applyMiddleware, createStore } from "redux";
import thunk from "redux-thunk";
import rootReducer from "./reducers";

const options = applyMiddleware(thunk);

const store = createStore(rootReducer, options);

export default store;

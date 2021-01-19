import { combineReducers } from "redux";
import home from "./home";
const appReducer = combineReducers({
  home
});

const rootReducer = (state, action) => {
  if (action.type === "USER_LOGOUT") {
    state = undefined;
  }

  return appReducer(state, action);
};

export default rootReducer;

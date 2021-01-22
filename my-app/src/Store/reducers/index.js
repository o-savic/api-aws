import { combineReducers } from "redux";
import home from "./home";
import user from "./user";
const appReducer = combineReducers({
  home,
  user

});

const rootReducer = (state, action) => {
  if (action.type === "USER_LOGOUT") {
    state = undefined;
  }

  return appReducer(state, action);
};

export default rootReducer;

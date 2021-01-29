import { combineReducers } from "redux";
import home from "./home";
import user from "./user";
import credentials from "./credentials"
const appReducer = combineReducers({
  home,
  user,
  credentials
});

const rootReducer = (state, action) => {
  if (action.type === "USER_LOGOUT") {
    state = undefined;
  }

  return appReducer(state, action);
};

export default rootReducer;

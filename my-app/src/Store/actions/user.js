import {
  REGISTERED_USER
} from "../actionTypes";
import axios from "axios";

export const registerUser = (user) => async (dispatch) => {
  try {
    const registeredUser = await axios.post("http://localhost:8081/api/users", user);
    dispatch(setRegisteredUser(registeredUser.data));
    return registeredUser;
  } catch (err) {
    console.log(err);
  }
};

export const setRegisteredUser = (registeredUser) => ({
  type: REGISTERED_USER,
  registeredUser,
});

import {
  REGISTERED_USER,
  EDITED_USER,
  SET_USER_DATA
} from "../actionTypes";
import axios from "axios";
import { userPath } from "../../properties/path-properites"


export const registerUser = (user) => async (dispatch) => {
  try {
    const registeredUser = await axios.post(userPath, user);
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

export const editUser = (user) => async (dispatch) => {
  try {
    const editedUser = await axios.put(userPath + `/${user.id}`, user);
    dispatch(setEditedUser(editedUser.data));
    return editedUser;
  } catch (err) {
    console.log(err);
  }
};

export const setEditedUser = (editedUser) => ({
  type: EDITED_USER,
  editedUser,
});

export const getUserData = (email) => async (dispatch) => {
  try {
    const userData = await axios.get(userPath + `/${email}`);
    console.log(userData.data);
    localStorage.setItem("firstName", userData.data.firstName);
    localStorage.setItem("lastName", userData.data.lastName);
    localStorage.setItem("username", userData.data.username);
    localStorage.setItem("id", userData.data.id);
    return userData;
  } catch (err) {
    console.log(err);
    return err.response;
  }
};

export const setUserData = (userData) => ({
  type: SET_USER_DATA,
  userData,
});

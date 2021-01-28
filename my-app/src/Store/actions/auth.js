import { SET_CURRENT_USER, USER_LOGOUT } from "../actionTypes";
import axios from "axios";
import jwtDecode from "jwt-decode";
import { authPath } from "../../properties/path-properites"

export const setUser = (user) => ({
  type: SET_CURRENT_USER,
  user,
});

export const setAuthorizationToken = (token) => {
  if (token) {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    axios.defaults.headers.common["Access-Control-Allow-Origin"] = `*`;
  } else {
    delete axios.defaults.headers.common["Authorization"];
  }
};

export function logout() {
  return (dispatch) => {
    localStorage.clear();
    setAuthorizationToken(false);
    dispatch(setUser({}));
    dispatch({ type: USER_LOGOUT });
  };
}

export const login = (userData) => async (dispatch) => {
  try {
    const jwt = await axios.post(authPath + "/signin", userData);
    console.log(jwt.data);
    const pureJwt = jwt.data.accessToken;
    localStorage.setItem("jwtToken", pureJwt);
    localStorage.setItem("username", jwt.data.email);
    setAuthorizationToken(pureJwt);
    const decodedToken = jwtDecode(pureJwt);
    dispatch(setUser(decodedToken));
    return jwt;
  } catch (err) {
    console.log(err);
    return err.response;
  }
};



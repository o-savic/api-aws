import {
    CREDENTIALS_LIST, 
    ADDED_CREDENTIALS,
    UPDATED_CREDENTIALS 
  } from "../actionTypes";
  import axios from "axios";
  import { credentialsPath } from "../../properties/path-properites";

export const addUserCredentials = (email, credentials) => async (dispatch) => {
    try {
      const addedCredentials = await axios.post(credentialsPath + "/user/" + `${email}`, credentials, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("jwtToken"),
        },
      });
      dispatch(setAddedCredentials(addedCredentials.data));
      return addedCredentials;
    } catch (err) {
      console.log(err);
    }
  };
  
  export const setAddedCredentials = (addedCredentials) => ({
    type: ADDED_CREDENTIALS,
    addedCredentials,
  });
  
  export const getCredentialsList = (email) => async (dispatch) => {
    try {
      const credentialsList = await axios.get(credentialsPath + "/user/" + `${email}`, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("jwtToken"),
        },
      });
      dispatch(setCredentialsList(credentialsList.data));
    } catch (err) {
      console.log(err);
    }
  };
  
  export const setCredentialsList = (credentialsList) => ({
    type: CREDENTIALS_LIST,
    credentialsList,
  });

  export const deleteCredentials = (id) => async (dispatch) => {
    try {
      await axios.delete(credentialsPath + `/${id}`);
    } catch (err) {
      console.log(err);
    }
  };
  
  export const updateCredentials = (credentials) => async (dispatch) => {
    try {
      const updatedCredentials = await axios.put(credentialsPath + `/${credentials.id}`, credentials);
      dispatch(setUpdatedCredentials(updatedCredentials.data));
      return updatedCredentials;
    } catch (err) {
      console.log(err);
    }
  };
  
  export const setUpdatedCredentials = (updatedCredentials) => ({
    type: UPDATED_CREDENTIALS,
    updatedCredentials,
  });
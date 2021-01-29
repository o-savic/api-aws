import {
    ADDED_CREDENTIALS,
    CREDENTIALS_LIST
  } from "../actionTypes";
  
  const DEFAULT_STATE = {
    addedCredentials: {},
    credentialsList : {}
  };
  
  export default (state = DEFAULT_STATE, action) => {
    switch (action.type) {
      case ADDED_CREDENTIALS:
        return {
          ...state,
          addedCredentials: action.addedCredentials,
        };
      case CREDENTIALS_LIST:
        return {
          ...state,
          credentialsList: action.credentialsList,
        };      
      default:
        return state;
    }
  };
  
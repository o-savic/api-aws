import {
GIT_REPOSITORY,
COMMAND_LINE
  } from "../actionTypes";
  
  const DEFAULT_STATE = {
    
  };
  
  export default (state = DEFAULT_STATE, action) => {
    switch (action.type) {
      case GIT_REPOSITORY:
        return {
          ...state,
          gitRepository: action.gitRepository,
        };
      case COMMAND_LINE:
        return {
          ...state,
          commandLine: action.commandLine,
        };
      default:
        return state;
    }
  };
  
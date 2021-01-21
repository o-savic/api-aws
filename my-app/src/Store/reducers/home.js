import {
GIT_REPOSITORY,
COMMAND_LINE,
USER_REPOSITORIES
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
        case USER_REPOSITORIES:
          return {
            ...state,
            repositories: action.repositories,
          };  
      default:
        return state;
    }
  };
  
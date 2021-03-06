import {
  GIT_REPOSITORY,
  COMMAND_LINE,
  USER_REPOSITORIES,
  EDITED_REPO,
  WORKSPACE
} from "../actionTypes";

const DEFAULT_STATE = {
  gitRepository: {},
  commandLine: {},
  repositories: {},
  editedRepo: {},
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
    case EDITED_REPO:
      return {
        ...state,
        editedRepo: action.editedRepo,
      };   
    case WORKSPACE:
      return {
        ...state, 
        workspace: action.workspace
      }
    default:
      return state;
  }
};

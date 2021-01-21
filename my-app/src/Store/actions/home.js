import {
    GIT_REPOSITORY,
    COMMAND_LINE,
    USER_REPOSITORIES
  } from "../actionTypes";
  import axios from "axios";

  export const cloneRepository = (git) => async (dispatch) => {
    try {
      const gitRepository = await axios.post("http://localhost:8081/api/git/repository", git, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("jwtToken"),
      },
    });
      dispatch(setGitRepository(gitRepository.data));
      return gitRepository;
    } catch (err) {
      console.log(err);
    }
  };
  
  export const setGitRepository = (gitRepository) => ({
    type: GIT_REPOSITORY,
    gitRepository,
  });
  
  export const executeShell = (command) => async (dispatch) => {
    try {
      const commandLine = await axios.post("http://localhost:8081/api/git/writeShellCommands", command, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("jwtToken"),
      },
    });
      dispatch(setShellCommand(commandLine.data));
      return commandLine;
    } catch (err) {
      console.log(err);
    }
  };
  
  export const setShellCommand = (commandLine) => ({
    type: COMMAND_LINE,
    commandLine,
  });

  export const getUserRepositories = () => async (dispatch) => {
    try {
      const repositories = await axios.get("http://localhost:8081/api/git/repositories", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("jwtToken"),
      },
    });
      dispatch(setUserRepositories(repositories.data));
    } catch (err) {
      console.log(err);
    }
  };
  
  export const setUserRepositories = (repositories) => ({
    type: USER_REPOSITORIES,
    repositories,
  });
  
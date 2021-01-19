import {
    GIT_REPOSITORY,
    COMMAND_LINE
  } from "../actionTypes";
  import axios from "axios";

  export const cloneRepository = (git) => async (dispatch) => {
    try {
      const gitRepository = await axios.post("http://localhost:8081/api/git/repository", git);
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
      const commandLine = await axios.post("http://localhost:8081/api/git/writeShellCommands", command);
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
  
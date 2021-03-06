import {
  GIT_REPOSITORY,
  COMMAND_LINE,
  USER_REPOSITORIES,
  EDITED_REPO,
  WORKSPACE
} from "../actionTypes";
import axios from "axios";
import { gitPath } from "../../properties/path-properites";

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

export const executeShell = () => async (dispatch) => {
  try {
    const commandLine = await axios.post(gitPath + "/execute", {
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
    const repositories = await axios.get(gitPath + "/repositories", {
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

export const editRepo = (repository) => async (dispatch) => {
  try {
    const editedRepo = await axios.put(gitPath + `/${repository.id}`, repository, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwtToken"),
      },
    });
    dispatch(setEditedRepo(editedRepo.data));
    return editedRepo;
  } catch (err) {
    console.log(err);
  }
};

export const setEditedRepo = (editedRepo) => ({
  type: EDITED_REPO,
  editedRepo,
});

export const deleteRepo = (id) => async (dispatch) => {
  try {
    await axios.delete(gitPath + `/${id}`);
  } catch (err) {
    console.log(err);
  }
};

export const getWorkspace = (id) => async (dispatch) => {
  try {
    const workspace = await axios.get(gitPath + `/${id}` +"/workspace");
    console.log(workspace.data);
    dispatch(setWorkspace(workspace.data));
    return workspace;
  } catch (err) {
    console.log(err);
    return err.response;
  }
};

export const setWorkspace = (workspace) => ({
  type: WORKSPACE,
  workspace,
});


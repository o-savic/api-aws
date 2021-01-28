import logo from './logo.svg';
import './App.css';
import React from "react";
import GitPage from "./components/Git/GitPage";
import CommandPage from "./components/Git/CommandPage";
import LoginPage from "./components/User/LoginPage";
import RegistrationPage from "./components/User/RegistrationPage"
import NavigationBar from "./components/NavigationBar"
import UserProfilePage from "./components/User/UserProfilePage"
import SucccessfullyUpdatedPage from "./components/User/SuccessfullyUpdatedPage"

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { configureStore } from "./Store/index";
import RepositoryListPage from './components/Git/RepositoryListPage';
import { setAuthorizationToken, setUser } from "./Store/actions/auth";
import jwtDecode from "jwt-decode";
import { Redirect } from 'react-router';

const store = configureStore();
if (localStorage.jwtToken) {
  const decodedToken = jwtDecode(localStorage.jwtToken);
  const now = new Date();
  if (Date.parse(now) / 1000 >= decodedToken.exp) {
    try {
      setAuthorizationToken(false);
      store.dispatch(setUser({}));
    } catch (err) {
      console.log(err);
    }
  } else {
    try {
      setAuthorizationToken(localStorage.jwtToken);
      store.dispatch(setUser(decodedToken));
    } catch (err) {
      store.dispatch(setUser({}));
    }
  }
}

function App() {
  return (
    <Provider store={store}>
      <Router className="App">
        <Switch>
          <Route exact path="/" component={LoginPage} />
          <Route exact path="/login" component={LoginPage} />
          <Route exact path="/registration" component={RegistrationPage} />

          <Route exact path="/repositories" render={() => (
            localStorage.getItem("jwtToken") == null ? (
              <Redirect to="/login" />
            ) : (
                <RepositoryListPage />
              )
          )} />
          <Route exact path="/profile" render={() => (
            localStorage.getItem("jwtToken") == null ? (
              <Redirect to="/login" />
            ) : (
                <UserProfilePage />
              )
          )} />
          <Route exact path="/success" render={() => (
            localStorage.getItem("jwtToken") == null ? (
              <Redirect to="/login" />
            ) : (
                <SucccessfullyUpdatedPage />
              )
          )} />
          <Route exact path="/command" render={() => (
            localStorage.getItem("jwtToken") == null ? (
              <Redirect to="/login" />
            ) : (
                <CommandPage />
              )
          )} />
          <Route exact path="/git" render={() => (
            localStorage.getItem("jwtToken") == null ? (
              <Redirect to="/login" />
            ) : (
                <GitPage />
              )
          )} />
        </Switch>
      </Router>
    </Provider>
  );
}

export default App;

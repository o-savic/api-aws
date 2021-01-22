import logo from './logo.svg';
import './App.css';
import React from "react";
import HomePage from "./components/HomePage";
import CommandPage from "./components/CommandPage";
import LoginPage from "./components/LoginPage";
import RegistrationPage from "./components/RegistrationPage"

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { configureStore } from "./Store/index";
import SuccessPage from './components/SuccessPage';
import RepositoryListPage from './components/RepositoryListPage';
import { setAuthorizationToken, setUser } from "./Store/actions/auth";
import jwtDecode from "jwt-decode";

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
          <Route exact path="/home" component={HomePage} />
          <Route exact path="/command" component={CommandPage} />
          <Route exact path="/success" component={SuccessPage} />
          <Route exact path="/login" component={LoginPage} />
          <Route exact path="/registration" component={RegistrationPage} />
          <Route exact path="/repositories" component={RepositoryListPage} />


        </Switch>
      </Router>
    </Provider>
  );
}

export default App;

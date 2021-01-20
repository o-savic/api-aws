import logo from './logo.svg';
import './App.css';
import React from "react";
import HomePage from "./components/HomePage";
import CommandPage from "./components/CommandPage";
import LoginPage from "./components/LoginPage";
import RegistrationPage from "./components/RegistrationPage"

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Provider } from "react-redux";
import {configureStore} from "./Store/index";
import SuccessPage from './components/SuccessPage';

function App() {
  const store = configureStore();
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


      </Switch>
    </Router>
  </Provider>
  );
}

export default App;

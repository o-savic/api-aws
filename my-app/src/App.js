import logo from './logo.svg';
import './App.css';
import React from "react";
import HomePage from "./components/HomePage";
import CommandPage from "./components/CommandPage";

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
        <Route exact path="/" component={HomePage} />
        <Route exact path="/home" component={HomePage} />
        <Route exact path="/command" component={CommandPage} />
        <Route exact path="/success" component={SuccessPage} />

      </Switch>
    </Router>
  </Provider>
  );
}

export default App;

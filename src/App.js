import "./App.css";
import Header from "./components/Header";
import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Login from './components/Login.js';
import Register from './components/Register.js';

function App() {
  return (
    <Router>
      <div className="app__main">
        <Header />
        <Switch>
          <Route path='/register' component={Register}/>
        </Switch>
      </div>
    </Router>
  );
}

export default App;

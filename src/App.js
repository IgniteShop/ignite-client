import "./App.css";
import Header from "./components/Header";
import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Login from './screens/Login.js';
import Register from './screens/Register.js';

function App() {
  return (
        <Router>
          <div className="app__main">
            <Header />
            <Switch>
              <Route path='/register' component={Register}/>
              <Route path='/login' component={Login}/>  
            </Switch>
          </div>
        </Router>
  );
}

export default App;

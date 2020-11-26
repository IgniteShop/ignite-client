import "./App.css";
import Header from "./components/Header";
import React, { Suspense } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Login from './screens/Login.js';
import Register from './screens/Register.js';
import { AuthCheck } from "reactfire";
import Shop from './screens/Shop.js';
import Product from './screens/Product.js';
import Cart from './screens/Cart.js';

function App() {
  return (
        <Router>
          <div className="app__main">
            <Header />
            <Switch>
              <Route exact path='/register' component={Register}/>
              <Route exact path='/login' component={Login}/>  
              <Route exact path='/shop' component={Shop}/>
              <Route exact path='/product' component={Product}/>
              <Route exact path='/cart' component={Cart}/>
            </Switch>
          </div>
        </Router>
  );
}

export default App;

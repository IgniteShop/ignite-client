import "./App.css";
import Header from './components/Header';
import React, { Suspense } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Login from './screens/Login.js';
import Register from './screens/Register.js';
import Generate from './screens/Generate.js';
import Shop from './screens/Shop.js';
import AboutUs from './screens/AboutUs.js';
import Account from './screens/Account.js';
import Product from './screens/Product.js';
import Cart from './screens/Cart.js';
import Stock from './screens/Stock.js';
import Home from './screens/Home.js';
import Page404 from './screens/404.js';
import PrivateRoute from './PrivateRoute';

function App() {
  return (
	<Router>
		<Suspense fallback={<p>Loading...</p>}>
			<div className="app__main">
				<Header />
				<Switch>
					<Route exact path='/' component={Home}/>
					<Route exact path='/register' component={Register}/>
					<Route exact path='/login' component={Login}/>  
					<Route exact path='/shop' component={Shop}/>
					<Route exact path='/aboutus' component={AboutUs}/>
					<PrivateRoute exact path='/generate' component={Generate}/>
					<PrivateRoute exact path='/account' component={Account}/>
					<PrivateRoute exact path='/product' component={Product}/>
					<PrivateRoute exact path='/cart' component={Cart}/>
					<PrivateRoute exact path='/generateStock' component={Stock}/>
					<Route component={Page404}/>
				</Switch>
			</div>
		</Suspense>
	</Router>
  );
}

export default App;

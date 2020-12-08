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

function App() {
  return (
	<Router>
		<Suspense fallback={<p>Loading...</p>}>
			<div className="app__main">
				<Header />
				<Switch>
					<Route path='/register' component={Register}/>
					<Route path='/login' component={Login}/>  
					<Route path='/generate' component={Generate}/>
					<Route path='/shop' component={Shop}/>
					<Route path='/account' component={Account}/>
					<Route path='/product' component={Product}/>
					<Route path='/cart' component={Cart}/>
					<Route path='/aboutus' component={AboutUs}/>
					<Route path='/generateStock' component={Stock}/>
				</Switch>
			</div>
		</Suspense>
	</Router>
  );
}

export default App;

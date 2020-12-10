import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import UserContext from './UserContextProvider';

const PrivateRoute = ({ component: RouteComponent, ...rest }) => {
	const { user } = useContext(UserContext)
	let isAuth = true;

	console.log(user)
	console.log(isAuth)
	
	if(JSON.stringify(user) === "{}") {
		isAuth = false
	}
	
	return (
		<Route 
			{...rest}	
			render={routeProps => 
				isAuth ? (
					<RouteComponent {...routeProps} />
				) : (
					<Redirect to={"/login"} />
				)
			}
		/>
	)
}

export default PrivateRoute
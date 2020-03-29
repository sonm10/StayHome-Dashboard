import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { getToken } from './Common.js';
 
// handle the private routes
function PrivateRoute({ component: Component, ...rest }) {
  return (
    <Route
      {...rest}
      render={(props) => getToken() ? <Component {...props} /> : <Redirect to={{ pathname: '/auth/login', state: { from: props.location } }} />}
    />
  )
}
export default PrivateRoute;
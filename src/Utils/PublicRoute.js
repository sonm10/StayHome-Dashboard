import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { getToken } from './Common.js';
 
// handle the public routes
function PublicRoute({ component: Component, ...rest }) {
  return (
    <Route
      {...rest}
      render={(props) => !getToken() ? <Component {...props} /> : <Redirect to={{ pathname: '/admin/dashboard' }} />}
    />
  )
}
export default PublicRoute;
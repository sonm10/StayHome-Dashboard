import React, { useState, useEffect } from 'react';
import { createBrowserHistory } from "history";
import { Router, Route, Switch, Redirect } from "react-router-dom";
import AuthLayout from "layouts/Auth.js";
import AdminLayout from "layouts/Admin.js";
import PublicRoute from "Utils/PublicRoute.js";
import PrivateRoute from "Utils/PrivateRoute.js";
import axios from "axios";

import { getToken, removeUserSession, setUserSession, getUser } from './Utils/Common.js';

import "assets/scss/material-dashboard-pro-react.scss?v=1.8.0";

const hist = createBrowserHistory();

function App() {
  const [authLoading, setAuthLoading] = useState(true);

  useEffect(() => {
    const token = getToken();
    if (!token) {
      return;
    }
    axios.get("/api/method/frappe.auth.get_loggedin_user_details").then(res=>{
      console.log(res.status);
      // if(res.status == 200){
      //     if(res.login_id == getUser()){
      //        // setUserSession(res.api_key, res.api_secret, res.login_id);
      //         setUserSession(res.api_key, res.api_secret, res.login_id);
      //     }
      //     else{
      //         removeUserSession();
      //     }
      // }
      // else{
      //   removeUserSession();
      //   setAuthLoading(false);
      // }
  });
    // fetch('http://45.64.248.155/api/method/frappe.auth.get_loggedin_user_details', {
    //     method: 'GET',
    //     credentials: "same-origin",
    //     crossdomain:true
    // }).then((res) => res.json().then(data => {
    //     if(data.login_id == getUser()){
    //         console.log(data.dzongkhag);
    //         setUserSession(data.api_key, data.api_secret, data.login_id, data.dzongkhag);
    //     }
    //     else{
    //         removeUserSession();
    //     }
    // }).catch((error) => {
    //     removeUserSession();
    //     setAuthLoading(false);
    // }));
}, []);

  return (
    <div className="App">
        <Router history={hist}>
            <Switch>
                <PublicRoute path="/auth" component={AuthLayout} />
                <PrivateRoute path="/admin" component={AdminLayout} />
                <Redirect from="/" to="/auth/login" />
            </Switch>
        </Router>
    </div>
  );
}
export default App;
/*!

=========================================================
* Material Dashboard PRO React - v1.8.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-pro-react
* Copyright 2019 Creative Tim (https://www.creative-tim.com)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from "react";
import ReactDOM from "react-dom";
import { createBrowserHistory } from "history";
import { Router, Route, Switch, Redirect } from "react-router-dom";
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import App from './App';

import "assets/scss/material-dashboard-pro-react.scss?v=1.8.0";
import axios from 'axios';

//axios.defaults.baseURL = process.env.REACT_APP_API_ENDPOINT;


ReactDOM.render(
  <App />,
  document.getElementById("root")
);

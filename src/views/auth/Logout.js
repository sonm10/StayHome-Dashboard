import React, { useState } from "react";
import { setUserSession } from 'Utils/Common.js';

import { getUser, removeUserSession } from '../../Utils/Common.js';

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import { Router, Route, Switch, Redirect } from "react-router-dom";

//import SweetAlert from "react-bootstrap-sweetalert";

import styles from "assets/jss/material-dashboard-pro-react/views/loginPageStyle.js";

const useStyles = makeStyles(styles);



export default function Logout(props) {

    const classes = useStyles();

    removeUserSession();
    console.log(getUser());
    return (
        <>
            <Switch>
                <Redirect from="/auth/logout" to="/auth/login" />
            </Switch>
        </>
    );
}
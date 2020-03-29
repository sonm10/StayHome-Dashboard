import React, { useState } from "react";
import { getUser, setUserSession, setUserDzongkhagSession } from 'Utils/Common.js';

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

// import LockOutline from "@material-ui/icons/LockOutline";

// core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CardHeader from "components/Card/CardHeader.js";
import CardFooter from "components/Card/CardFooter.js";
import axios from "axios";

//import SweetAlert from "react-bootstrap-sweetalert";

import styles from "assets/jss/material-dashboard-pro-react/views/loginPageStyle.js";

const useStyles = makeStyles(styles);

export default function Login(props) {

    const [loginUsername, setloginUsername] = React.useState("");
    const [loginUsernameState, setloginUsernameState] = React.useState("");
    const [loginPassword, setloginPassword] = React.useState("");
    const [loginPasswordState, setloginPasswordState] = React.useState("");
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    // function that verifies if a string has a given length or not
    const verifyLength = (value, length) => {
        if (value.length >= length) {
            return true;
        }
        return false;
    };
    //Page login validation
    const loginClick = () => {

        if (loginUsernameState === "") {
            setloginUsernameState("error");
        }
        if (loginPasswordState === "") {
            setloginPasswordState("error");
        }
        if(loginUsername == "" || loginPasswordState ==""){
            return;
        }

        axios.post("/api/method/login",{
            "usr":loginUsername,
            "pwd":loginPassword
        }).then(function (response) {
                //get user api key and secret and store in local session storage
                axios.get("/api/method/frappe.auth.get_loggedin_user_details").then(res=>{
                    setUserSession(res.data.api_key, res.data.api_secret, res.data.login_id);
                    //Dzongkhag for the logged in user
                    console.log(res.data.login_id);
                    var url = `/api/resource/User%20Account/`+res.data.login_id;
                    console.log(url);
                    axios.get(url).then(resp=>{
                        console.log(resp.data);
                        // console.log(res.data.login_id);
                        setUserDzongkhagSession(resp.data.data.dzongkhag);
                        props.history.push('/admin/dashboard');
                    }).catch(function (error){
                        setLoading(false);
                        setError(error.response.data.message);
                    }).then(function(){
                        
                    });
                }).catch(function (error){
                    setLoading(false);
                    setError(error.response.data.message);
                }).then(function(){
                    
                });
          })
          .catch(function (error) {
            // handle error
            setLoading(false);
            setError(error.response.data.message);
          })
          .then(function () {
           
          });
    }

    const [cardAnimaton, setCardAnimation] = React.useState("cardHidden");
    setTimeout(function () {
        setCardAnimation("");
    }, 700);

    const classes = useStyles();
    return (
        <div className={classes.container}>
            <h3 className={classes.textCenter}>COVID-19 Quarantine Monitoring System</h3>
            <GridContainer justify="center">
                <GridItem xs={12} sm={6} md={4}>
                        {}
                        <Card login className={classes[cardAnimaton]}>
                            <CardHeader
                                className={`${classes.cardHeader} ${classes.textCenter}`}
                                color="info"
                            >
                                <h4 className={classes.cardTitle}>Log in</h4>
                            </CardHeader>
                            <CardBody>
                                <form>
                                    <CustomInput
                                        success={loginUsernameState === "success"}
                                        error={loginUsernameState === "error"}
                                        labelText="Username *"
                                        id="loginusername"
                                        formControlProps={{
                                            fullWidth: true
                                        }}
                                        inputProps={{
                                            onFocus: e => {
                                                setError(false);
                                            },
                                            onChange: event => {

                                                if (verifyLength(event.target.value, 1)) {
                                                    setloginUsernameState("success");
                                                    setError(false);
                                                } else {
                                                    setloginUsernameState("error");
                                                }
                                                setloginUsername(event.target.value);
                                            },
                                            type: "text"
                                        }}
                                    />
                                    <CustomInput
                                        success={loginPasswordState === "success"}
                                        error={loginPasswordState === "error"}
                                        labelText="Password *"
                                        id="loginpassword"
                                        formControlProps={{
                                            fullWidth: true
                                        }}
                                        inputProps={{
                                            onFocus: e => {
                                                setError(false);
                                            },
                                            onChange: event => {
                                                if (verifyLength(event.target.value, 1)) {
                                                    setloginPasswordState("success");
                                                } else {
                                                    setloginPasswordState("error");
                                                }
                                                setloginPassword(event.target.value);
                                            },
                                            type: "password",
                                            autoComplete: "off"
                                        }}
                                    />
                                    <small>*</small> Required fields
                                    {error && <><small style={{ color: 'red' }}><br />{error}</small></>}
                                </form>
                            </CardBody>
                            <CardFooter className={classes.justifyContentCenter}>
                                <div className={classes.center}>
                                    <Button color="info" value={loading ? 'Loading...' : 'Login'} size="lg" block onClick={loginClick} disabled={loading}>
                                        LOGIN IN
                                </Button>
                                </div>
                            </CardFooter>
                        </Card>
                </GridItem>
            </GridContainer>
        </div>
    );
}
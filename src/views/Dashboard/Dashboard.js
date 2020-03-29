import React, { useState, useEffect } from "react";


// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import Icon from "@material-ui/core/Icon";
import ReactNotification from 'react-notifications-component';
import Divider from '@material-ui/core/Divider';
import Badge from "components/Badge/Badge.js";

// @material-ui/icons
// import ContentCopy from "@material-ui/icons/ContentCopy";
import Store from "@material-ui/icons/Store";
import DateRange from "@material-ui/icons/DateRange";
import LocalOffer from "@material-ui/icons/LocalOffer";
import Update from "@material-ui/icons/Update";
import Grid from '@material-ui/core/Grid';

// core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";

import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardIcon from "components/Card/CardIcon.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";
import SuspectCases from "./SuspectCases.js";
import ManualCase from "./ManualCase.js";


import styles from "assets/jss/material-dashboard-pro-react/views/dashboardStyle.js";

const useStyles = makeStyles(styles);

export default function Dashboard() {
  const classes = useStyles();

  const [data, setData] = useState([]);
  const [cases, setCases] = useState({});

  const [showLoading, setShowLoading] = useState(true);
  const [suspectCasesList, setSuspectCasesList] = React.useState([]);
  const [spacing, setSpacing] = React.useState(2);


  return (
    <div>
      <GridContainer>
        <GridItem xs={12}>
          <Card>
            <CardHeader color="danger" icon>
              <CardIcon color="danger">
                <Icon>info_outline</Icon>
              </CardIcon>
                <h4 className={classes.cardIconTitle}>
                  Alert Cases
                </h4>
            </CardHeader>
            <CardBody>
            <br />
            <Divider variant="middle" />
            <br />
            <br />
              <GridContainer justify="space-between">
                <GridItem xs={12} sm={12} md={12}>
                  
                  <SuspectCases />
                </GridItem>
              </GridContainer>
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>

       <GridContainer>
        <GridItem xs={12} sm={6} md={6} lg={3}>
          <Card>
            <CardHeader color="info" stats icon>
              <CardIcon color="info">
                <Icon>content_copy</Icon>
              </CardIcon>
              <p className={classes.cardCategory}>Cases</p>
              <h3 className={classes.cardTitle}>
                200 <small></small>
              </h3>
            </CardHeader>
            <CardFooter stats>
              <div className={classes.stats}>
                <DateRange />
                Updated in last 2 hours
              </div>
            </CardFooter>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={6} md={6} lg={3}>
          <Card>
            <CardHeader color="primary" stats icon>
              <CardIcon color="primary">
                <Store />
              </CardIcon>
              <p className={classes.cardCategory}>Home Quarantine</p>
              <h3 className={classes.cardTitle}>4,245</h3>
            </CardHeader>
            <CardFooter stats>
              <div className={classes.stats}>
                <DateRange />
                Last 24 Hours
              </div>
            </CardFooter>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={6} md={6} lg={3}>
          <Card>
            <CardHeader color="warning" stats icon>
              <CardIcon color="warning">
                <Icon>info_outline</Icon>
              </CardIcon>
              <p className={classes.cardCategory}>Quarantine Facility</p>
              <h3 className={classes.cardTitle}>175</h3>
            </CardHeader>
            <CardFooter stats>
              <div className={classes.stats}>
                <LocalOffer />
                Tracked from Github
              </div>
            </CardFooter>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={6} md={6} lg={3}>
          <Card>
            <CardHeader color="danger" stats icon>
              <CardIcon color="danger">
                <Icon>info_outline</Icon>
              </CardIcon>
              <p className={classes.cardCategory}>On Alert</p>
              <h3 className={classes.cardTitle}>8</h3>
            </CardHeader>
            <CardFooter stats>
              <div className={classes.stats}>
                <Update />
                Just Updated
              </div>
            </CardFooter>
          </Card>
        </GridItem>
      </GridContainer>

      <ReactNotification />

    </div >
  );
}

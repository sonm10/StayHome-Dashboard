import React, { Component, useEffect } from "react";

// react plugin for creating charts
import ChartistGraph from "react-chartist";
// react plugin for creating vector maps
import { VectorMap } from "react-jvectormap";
import CardAvatar from "components/Card/CardAvatar.js";
import avatar from "assets/img/faces/marc.jpg";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import Tooltip from "@material-ui/core/Tooltip";
import Icon from "@material-ui/core/Icon";

// @material-ui/icons
// import ContentCopy from "@material-ui/icons/ContentCopy";
import Store from "@material-ui/icons/Store";
// import InfoOutline from "@material-ui/icons/InfoOutline";


// core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardIcon from "components/Card/CardIcon.js";
import CardBody from "components/Card/CardBody.js";

import SelfieCase from './SelfieCase.js';
import styles from "assets/jss/material-dashboard-pro-react/views/dashboardStyle.js";
const useStyles = makeStyles(styles);




export default function SelfieVerification() {
  const classes = useStyles();
  return (
    <div>
      <GridContainer>
        <GridItem xs={12}>
          <Card>
            <CardHeader color="success" icon>
              <CardIcon color="success">
                <Icon>person_outline</Icon>
              </CardIcon>
              <h4 className={classes.cardIconTitle}>
                Selfie Verifications
              </h4>
            </CardHeader>
            <CardBody>

              <SelfieCase />
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>
    </div>)
};

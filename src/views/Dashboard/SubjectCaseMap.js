import React, { useState } from "react";
// react components used to create a google map
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker
} from "react-google-maps";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// @material-ui/icons
import AddLocation from "@material-ui/icons/AddLocation";
import Place from "@material-ui/icons/Place";

// core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CardIcon from "components/Card/CardIcon.js";
import CardHeader from "components/Card/CardHeader.js";

import { cardTitle } from "assets/jss/material-dashboard-pro-react.js";

const styles = {
  cardIconTitle: {
    ...cardTitle,
    marginTop: "15px",
    marginBottom: "0px"
  }
};

const useStyles = makeStyles(styles);


const BaseLocationMap = withScriptjs(
  withGoogleMap(props => (
    <GoogleMap
      defaultZoom={16}
      defaultCenter={{ lat: parseFloat(props.latitude), lng: parseFloat(props.longitude) }}
      defaultOptions={{
        scrollwheel: false
      }}
    >
        <Marker id="base_location" position={{ lat: parseFloat(props.latitude), lng: parseFloat(props.longitude) }} />
    </GoogleMap>
  ))
);


const CurrentLocationMap = withScriptjs(
    withGoogleMap(props => (
      <GoogleMap
        defaultZoom={16}
        defaultCenter={{ lat: parseFloat(props.latitude), lng: parseFloat(props.longitude) }}
        defaultOptions={{
          scrollwheel: false
        }}
      >
        <Marker id="current_location" position={{ lat: parseFloat(props.latitude), lng: parseFloat(props.longitude) }} />
      </GoogleMap>
    ))
  );

export default function SubjectCaseMap(props) {
  const classes = useStyles();

  const [currentLatitude, setCurrentLatitude] = useState(props.current_latitude);
  const [currentLongitude, setCurrentLongitude] = useState(props.current_longitude);

  const [baseLatitude, setBaseLatitude] = useState(props.base_latitude);
  const [baseLongitude, setBaseLongitude] = useState(props.base_longitude);

//   const [baseLatitude, setBaseLatitude] = useState(40.748817);
//   const [baseLongitude, setBaseLongitude] = useState(-73.985428);

//   const [currentLatitude, setCurrentLatitude] = useState(40.748817);
//   const [currentLongitude, setCurrentLongitude] = useState(-73.985428);
 console.log(props.current_latitude,props.current_longitude);
  return (
    <GridContainer>
        <GridItem xs={12} sm={6} md={6}>
            <Card>
                <CardHeader color="rose" icon>
                    <CardIcon color="rose">
                    <AddLocation />
                    </CardIcon>
                    <h4 className={classes.cardIconTitle}>Base Location</h4>
                </CardHeader>
                <CardBody>
                    <BaseLocationMap
                        latitude = {props.base_latitude}
                        longitude = {props.base_longitude}
                        googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyCkEqv8zumrdxjRDQjILywjaqFSY76qWS4"
                        loadingElement={<div style={{ height: `100%` }} />}
                        containerElement={
                        <div
                        style={{
                            height: `280px`,
                            borderRadius: "6px",
                            overflow: "hidden"
                        }}
                        />
                    }
                    mapElement={<div style={{ height: `100%` }} />}
                    />
                </CardBody>
            </Card>
        </GridItem>
        <GridItem xs={12} sm={6} md={6}>
            <Card>
            <CardHeader color="rose" icon>
                <CardIcon color="rose">
                <Place />
                </CardIcon>
                <h4 className={classes.cardIconTitle}>
                Current Location
                </h4>
            </CardHeader>
            <CardBody>
                <CurrentLocationMap
                        latitude = {props.current_latitude}
                        longitude = {props.current_longitude}
                        googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyCkEqv8zumrdxjRDQjILywjaqFSY76qWS4"
                        loadingElement={<div style={{ height: `100%` }} />}
                        containerElement={
                            <div
                            style={{
                                height: `280px`,
                                borderRadius: "6px",
                                overflow: "hidden"
                            }}
                            />
                        }
                        mapElement={<div style={{ height: `100%` }} />}
                    />
                </CardBody>
            </Card>
        </GridItem>
    </GridContainer>
  );
}

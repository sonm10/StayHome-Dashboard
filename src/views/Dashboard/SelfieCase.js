import React, { useState, useEffect } from "react";
import ReactTable from "react-table";
import { Modal } from 'react-bootstrap';
import GridItem from "components/Grid/GridItem.js";
import CardBody from "components/Card/CardBody.js";
import CardHeader from "components/Card/CardHeader.js";
import Card from "components/Card/Card.js";
import { useFetch } from "./hooks";
import GridContainer from "components/Grid/GridContainer.js";
import DoneAll from "@material-ui/icons/DoneAll";
import HighlightOff from "@material-ui/icons/HighlightOff";
import SweetAlert from "react-bootstrap-sweetalert";

import Loader from 'react-loader-spinner';
import Dvr from "@material-ui/icons/Dvr";
import Button from "components/CustomButtons/Button.js";
import { makeStyles } from "@material-ui/core/styles";
import styles from "assets/jss/material-dashboard-pro-react/views/dashboardStyle.js";
const useStyles = makeStyles(styles);


function SelfieCase() {

    const classes = useStyles();

    const [data, loading] = useFetch(
        "/api/resource/Selfie?limit_page_length=*&fields=[%22*%22]&filters=[[%22status%22,%22=%22,%22Pending%22]]"
    );

    const [modalShow, setModalShow] = React.useState(false);
    const [imageURL, setImageURL] = React.useState();
    const [selfieImageURL, setselfieImageURL] = React.useState();
    const [selfieId, setSelfieId] = React.useState();
    const [alert, setAlert] = React.useState(null);

    const hideAlert = () => {
        setAlert(null);
    };

    function MyVerticallyCenteredModal(props) {
        return (
            <Modal
                {...props}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Selfie Verifications
          </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <GridContainer>
                        <GridItem xs={12} sm={12} lg={6}>
                            <Card>
                                <CardHeader
                                    className={`${classes.cardHeader} ${classes.textCenter}`}
                                    color="info"
                                    plain={true}
                                >
                                    <h4 className={classes.cardTitle}>ORIGINAL PHOTOGRAPH</h4>
                                </CardHeader>
                                <CardBody width="335px" height="200px">
                                    <img src={imageURL} width="50%" height="40%" align="center"></img>
                                </CardBody>
                            </Card>
                        </GridItem>

                        <GridItem xs={12} sm={12} lg={6}>
                            <Card pricing>
                                <CardHeader
                                    className={`${classes.cardHeader} ${classes.textCenter}`}
                                    color="info"
                                    plain={true}
                                >
                                    <h4 className={classes.cardTitle}>SELFIE PHOTOGRAPH</h4>
                                </CardHeader>
                                <CardBody width="335px" height="200px">
                                    <img src={selfieImageURL} width="50%" height="40%" align="center"></img>
                                </CardBody>
                            </Card>
                        </GridItem>
                        {alert}
                    </GridContainer>
                </Modal.Body>
                <Modal.Footer>
                    <Button round color="success" onClick={() => {
                        if (typeof selfieId != 'undefined') {
                            fetch('/api/resource/Selfie/' + selfieId, {
                                method: 'PUT',
                                body: JSON.stringify({ 'status': "Match" }),
                                credentials: "same-origin",
                            }).then((response) => {
                                setAlert(true);
                                setModalShow(false);
                            }).catch(function (error) {
                                console.log(error)
                            });
                        }

                    }}>
                        <DoneAll className={classes.icons} />
                        Match
                     </Button>
                    <Button round color="rose" onClick={() => {
                        if (typeof selfieId != 'undefined') {
                            fetch('/api/resource/Selfie/' + selfieId, {
                                method: 'PUT',
                                body: JSON.stringify({ 'status': "No Match" }),
                                credentials: "same-origin",
                            }).then((response) => {
                                setAlert(true);
                                setModalShow(false);
                            }).catch(function (error) {
                                console.log(error)
                            });
                        }

                    }}>
                        <HighlightOff className={classes.icons} />
                        Mis Match
                     </Button>
                </Modal.Footer>
            </Modal >
        );
    }
    const filterMethod = (filter, row, column) => {
        const id = filter.pivotId || filter.id
        return row[id] !== undefined ? String(row[id].toLowerCase()).startsWith(filter.value.toLowerCase()) : true
    }
    return (
        <>
            {loading ? (
                <div styles="text-align:center">
                    <Loader
                        type="Bars"
                        color="#00BFFF"
                        height={50}
                        width={50}
                    />
                </div>
            ) : (
                    <ReactTable
                        data={data}
                        showFilters={true}
                        filterable
                        defaultFilterMethod={filterMethod}
                        columns={[
                            {
                                Header: "Selfie ID",
                                accessor: "name"
                            },
                            {
                                Header: "Suspect ID",
                                accessor: "suspect_id"
                            },
                            {
                                Header: "Suspect Name",
                                accessor: "suspect_name"
                            },
                            {
                                Header: "Creation Date",
                                accessor: "creation"
                            },
                            {
                                Header: "Actions",
                                Cell: (props) => (
                                    <>
                                        <Button
                                            justIcon
                                            round
                                            simple
                                            color="warning"
                                            className="edit"
                                            onClick={(e) => {
                                                fetch("/api/resource/Subject/" + props.original.suspect_id, {
                                                    method: 'GET',
                                                    credentials: "same-origin"
                                                }).then((response) => {
                                                    return response.json();
                                                }).then((data) => {
                                                    setSelfieId(props.original.name);

                                                    if (data.data.initial_image != "None") {
                                                        fetch(data.data.initial_image, {
                                                            method: 'GET',
                                                            credentials: "same-origin",
                                                        }).then(res => res.blob())
                                                            .then(blob => {
                                                                var reader = new FileReader();
                                                                reader.readAsDataURL(blob);
                                                                reader.onloadend = function () {
                                                                    setImageURL(reader.result);
                                                                }
                                                            });
                                                    }

                                                    if (data.data.latest_image != "None") {
                                                        fetch(data.data.initial_image, {
                                                            method: 'GET',
                                                            credentials: "same-origin",
                                                        }).then(res => res.blob())
                                                            .then(blob => {
                                                                var reader = new FileReader();
                                                                reader.readAsDataURL(blob);
                                                                reader.onloadend = function () {
                                                                    setselfieImageURL(reader.result);
                                                                    setModalShow(true);
                                                                }
                                                            });
                                                    }
                                                });
                                            }
                                            }
                                        >
                                            <Dvr />
                                        </Button>{" "}
                                        <MyVerticallyCenteredModal
                                            show={modalShow}
                                            onHide={() => setModalShow(false)}
                                        />
                                    </>
                                ),
                                sortable: false,
                                filterable: false
                            }
                        ]}
                        defaultPageSize={5}
                        showPaginationTop={false}
                        showPaginationBottom={true}
                        className="-striped -highlight"
                    />
                )}
            {!alert ? (<span></span>) : (
                <SweetAlert
                    success
                    style={{ display: "block", marginTop: "-100px" }}
                    title="Successfully update."
                    onConfirm={() => hideAlert()}
                    onCancel={() => hideAlert()}
                    confirmBtnCssClass={classes.button + " " + classes.success}
                >
                    You clicked the button!
                </SweetAlert>
            )}
        </>
    );
}
export default SelfieCase;
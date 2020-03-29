import React, { useReducer, useRef } from "react";
import { useFetch } from "./hooks";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import Slide from "@material-ui/core/Slide";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import SnackbarContent from "components/Snackbar/SnackbarContent.js";

import FormLabel from "@material-ui/core/FormLabel";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import InputAdornment from "@material-ui/core/InputAdornment";

// @material-ui/icons
import AddAlert from "@material-ui/icons/AddAlert";
import Close from "@material-ui/icons/Close";

import Loader from 'react-loader-spinner';

// @material-ui/icons
import Table from "components/Table/Table.js";
import Check from "@material-ui/icons/Check";

// core components
import Grid from "@material-ui/core/Grid";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Button from "components/CustomButtons/Button.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import Clearfix from "components/Clearfix/Clearfix.js";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CardHeader from "components/Card/CardHeader.js";
import CardIcon from "components/Card/CardIcon.js";
import Icon from "@material-ui/core/Icon";

import styles from "assets/jss/material-dashboard-pro-react/views/notificationsStyle.js";
import styles1 from "assets/jss/material-dashboard-pro-react/views/validationFormsStyle.js";

import SubjectCaseMap from "./SubjectCaseMap.js";

const useStyles = makeStyles(styles, styles1);

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

export default function SubjectCaseDetails(props) {



const classes = useStyles();
const [subjectId, setSubjectId] = React.useState(props.match.params.subjectid);
const [caseStatus, setCaseStatus] = React.useState(false);
const [caseId, setCaseId] = React.useState(props.match.params.caseid);

const [classicModal, setClassicModal] = React.useState(false);
const [remarks, setRemarks] = React.useState("");
const [remarksState, setRemarksState] = React.useState("");
const [requiredState, setrequiredState] = React.useState("");
const [submittingRemarks, setSubmittingRemarks] = React.useState(false);
const [submittedRemarks, setSubmittedRemarks] = React.useState(false);
const [updateSuccess, setupdateSuccess] = React.useState(false);
const [updateFailed, setupdateFailed] = React.useState(false);
const [newCaseData, setnewCaseData] = React.useState([]);

const [subjectData, subjectLoading] = useFetch(
  "/api/resource/Subject/" + subjectId
);
const [caseData, caseLoading] = useFetch(
  "/api/resource/Case/" + caseId
);


  // function that verifies if a string has a given length or not
  const verifyLength = (value, length) => {
    if (value.length >= length) {
      return true;
    }
    return false;
  };

  let countref = useRef(0);

  const [, forceUpdate] = useReducer(x => x + 1, 0);

  const confirmCloseCase = () => {
    if (remarksState === "") {
      setRemarksState("error");
      return;
    }
    if (remarksState === "error") {
      setRemarksState("error");
      return;
    }

    setSubmittingRemarks(true);
    setupdateSuccess(false);
    setSubmittedRemarks(false);

    fetch("/api/resource/Case/" + caseId, {
      method: 'PUT',
      body: JSON.stringify({ 'status': "Close", 'remarks': remarks })
    }).then((response) =>
      response.json().then(data => {
        setSubmittingRemarks(false);
        setSubmittedRemarks(true);
        console.log(response.status);
        if (response.status == 200) {
          setupdateSuccess(true);
          setnewCaseData(data.data);
          console.log(data.data.status);
        }
        else {
          setupdateFailed(true);
          setupdateSuccess(false);
        }
      }
      )).catch(err => {
        setupdateFailed(true);
        setupdateSuccess(false);
        setSubmittingRemarks(false);
        console.error(err)
      });
    //  fetch()
  };

  const closeDialog = () => {
    setSubmittingRemarks(false);
    setClassicModal(false);
  }

  const closeOkDialog = () => {
    setClassicModal(false);
    countref.current++;
    console.log("Count = ", countref.current);
    forceUpdate();
  }

  return (
    <>
      <h4 className={classes.cardTitle}>
        Case Subject Details<small> - On Alert</small>
      </h4>
      <Grid container alignItems="flex-start" justify="flex-end" direction="row">
        <Button color="info" onClick={() => props.history.goBack()}>
          Back to Cases
          </Button>
        {((!caseLoading && (caseData.status == "Open"))) ? (

          <Button color="warning" onClick={() => setClassicModal(true)}>
            Close Case
          </Button>

        ) : (
            <Button color="success">
              Case Closed
            </Button>
          )}
        <Dialog
          classes={{
            root: classes.center + " " + classes.modalRoot,
            paper: classes.modal
          }}
          open={classicModal}
          TransitionComponent={Transition}
          keepMounted
          onClose={() => setClassicModal(false)}
          aria-labelledby="classic-modal-slide-title"
          aria-describedby="classic-modal-slide-description"
        >
          <DialogTitle
            id="classic-modal-slide-title"
            disableTypography
            className={classes.modalHeader}
          >
            <Button
              justIcon
              className={classes.modalCloseButton}
              key="close"
              aria-label="Close"
              color="transparent"
              onClick={() => setClassicModal(false)}
            >
              <Close className={classes.modalClose} />
            </Button>
            <h4 className={classes.modalTitle}>Close Case</h4>
          </DialogTitle>
          <DialogContent
            id="classic-modal-slide-description"
            className={classes.modalBody}
          >
            You are about the close the following case. Add remarks and confirm!
                {caseLoading ? (
              <div styles="text-align:center">
                <br />
                <Loader
                  type="Bars"
                  color="#00BFFF"
                  height={50}
                  width={50}
                />
              </div>
            ) : (
                <>
                  <GridContainer>
                    <GridItem xs={12}>
                      <br />
                      <Table
                        tableHeaderColor="primary"
                        tableData={[
                          ["Case ID", caseData.name],
                          ["Status", caseData.status],
                          ["Type", caseData.case_type]
                        ]}
                        coloredColls={[3]}
                        colorsColls={["primary"]}
                      />
                    </GridItem>
                  </GridContainer>
                  <GridContainer>
                    <GridItem xs={12}>
                      <CustomInput
                        success={remarksState === "success"}
                        error={remarksState === "error"}
                        labelText="Remarks * required"
                        id="remarks"
                        formControlProps={{
                          fullWidth: true
                        }}
                        inputProps={{
                          onChange: event => {
                            if (verifyLength(event.target.value, 0)) {
                              setRemarksState("success");
                            } else {
                              setRemarksState("error");
                            }
                            setRemarks(event.target.value);
                          },
                          type: "text",
                          endAdornment:
                            requiredState === "error" ? (
                              <InputAdornment position="end">
                                <Close className={classes.danger} />
                              </InputAdornment>
                            ) : (
                                undefined
                              )
                        }}
                      />
                    </GridItem>
                  </GridContainer>
                  {submittingRemarks ? (<div styles="text-align:center">
                    <Loader
                      type="Bars"
                      color="#00BFFF"
                      height={50}
                      width={50}
                    />
                  </div>
                  ) : (<></>)}

                  {(submittedRemarks && updateSuccess) ? (<div styles="text-align:center">
                    <SnackbarContent
                      message={"Case closed successfully"}
                      close
                      color="success"
                    />
                  </div>
                  ) : (
                      <>
                        {updateFailed && (
                          <SnackbarContent
                            message={"Could not close the case. Please try again"}
                            close
                            color="warning"
                          />
                        )}
                      </>)}
                </>
              )}
          </DialogContent>
          <DialogActions className={classes.modalFooter}>
            {!updateSuccess &&
              <>
                <Button color="success"
                  onClick={() => confirmCloseCase()}
                >Confirm</Button>
                <Button
                  onClick={() => closeDialog()}
                  color="danger"
                  simple
                >
                  Cancel
                </Button>
              </>
            }
            {updateSuccess &&
              <Button
                onClick={() => closeOkDialog()}
                color="info"
                simple
              >
                Okay
              </Button>
            }
          </DialogActions>
        </Dialog>
      </Grid>
      <GridContainer>
        <GridItem xs={12} sm={4} md={4}>
          <Card>
            <CardHeader>
              <CardIcon color="info">
                <Icon>person_outline</Icon>
              </CardIcon>
              <p></p>
              <h4 className={classes.cardTitle}>
                Profile Details <small></small>
              </h4>
            </CardHeader>
            <CardBody>
              {subjectLoading ? (
                <div styles="text-align:center">
                  <Loader
                    type="Bars"
                    color="#00BFFF"
                    height={50}
                    width={50}
                  />
                </div>
              ) : (
                  <>
                    <Table
                      tableHeaderColor="primary"
                      tableData={[
                        ["Subject ID", subjectData.name],
                        ["Name", subjectData.suspect_name],
                        ["Mobile No", subjectData.mobile_no],
                        ["Gender", subjectData.gender],
                        ["Quarantine Date", subjectData.quarantine_date],
                        ["Quarantine Status", subjectData.status],
                        ["Address", subjectData.current_address],
                        ["Dzongkhag", subjectData.current_dzongkhag],
                        ["Country", subjectData.country]
                      ]}
                      coloredColls={[3]}
                      colorsColls={["primary"]}
                    />
                  </>
                )}

            </CardBody>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={4} md={4}>
          <Card>
            <CardHeader>
              <CardIcon color="warning">
                <Icon>ticket_outline</Icon>
              </CardIcon>
              <p></p>
              <h4 className={classes.cardTitle}>
                Case Details
              </h4>
            </CardHeader>
            <CardBody>
              {caseLoading ? (
                <div styles="text-align:center">
                  <Loader
                    type="Bars"
                    color="#00BFFF"
                    height={50}
                    width={50}
                  />
                </div>
              ) : (
                  <>
                    {(updateSuccess && newCaseData) ? (
                      <Table
                        tableHeaderColor="primary"
                        tableData={[
                          ["Case ID", caseData.name],
                          ["Status", newCaseData.status],
                          ["Case Token", caseData.token_no],
                          ["Case Type", caseData.case_type],
                          ["Dzongkhag", caseData.dzongkhag],
                          ["Date", caseData.creation],
                          ["Description", caseData.description],
                          ["Last Update", caseData.last_updated_on]
                        ]}
                        coloredColls={[3]}
                        colorsColls={["primary"]}
                      />
                    ) : (
                        <Table
                          tableHeaderColor="primary"
                          tableData={[
                            ["Case ID", caseData.name],
                            ["Status", caseData.status],
                            ["Case Token", caseData.token_no],
                            ["Type", caseData.case_type],
                            ["Dzongkhag", caseData.dzongkhag],
                            ["Date", caseData.creation],
                            ["Description", caseData.description],
                            ["Last Update", caseData.last_updated_on]
                          ]}
                          coloredColls={[3]}
                          colorsColls={["primary"]}
                        />)}
                  </>
                )}
            </CardBody>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={4} md={4}>
          <Card>
            <CardHeader>
              <CardIcon color="danger">
                <Icon>person_outline</Icon>
              </CardIcon>
              <p></p>
              <h4 className={classes.cardTitle}>
                Symptoms <small></small>
              </h4>
            </CardHeader>
            <CardBody>
              {caseLoading ? (
                <div styles="text-align:center">
                  <Loader
                    type="Bars"
                    color="#00BFFF"
                    height={50}
                    width={50}
                  />
                </div>
              ) : (
                  <Table
                    tableHeaderColor="primary"
                    tableData={[
                      ["Cough", caseData.cough],
                      ["Fever", caseData.fever],
                      ["Shortness of Breath", caseData.shortness_of_breath]
                    ]}
                    coloredColls={[3]}
                    colorsColls={["primary"]}
                  />)}
            </CardBody>
          </Card>
          <Card>
            <CardHeader>
              <CardIcon color="success">
                <Icon>person_outline</Icon>
              </CardIcon>
              <p></p>
              <h4 className={classes.cardTitle}>
                Assignee Details <small></small>
              </h4>
            </CardHeader>
            <CardBody>
              {caseLoading ? (
                <div styles="text-align:center">
                  <Loader
                    type="Bars"
                    color="#00BFFF"
                    height={50}
                    width={50}
                  />
                </div>
              ) : (
                  <Table
                    tableHeaderColor="primary"
                    tableData={[
                      ["Name", caseData.assignee_name],
                      ["Contact No", caseData.assignee_mobile_no],
                      ["Dzongkhag", caseData.dzongkhag]

                    ]}
                    coloredColls={[3]}
                    colorsColls={["primary"]}
                  />)}
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>
      {caseLoading ? (
        <div styles="text-align:center">
          <Loader
            type="Bars"
            color="#00BFFF"
            height={50}
            width={50}
          />
        </div>
      ) : (
          <SubjectCaseMap
            base_longitude={subjectData.home_gps_long}
            base_latitude={subjectData.home_gps_lat}
            current_longitude={subjectData.current_gps_long}
            current_latitude={subjectData.current_gps_lat}
          />
        )
      }
    </>
  )
  // var url = "/api/resource/Suspect/"+props.suspectid;

  //alert(props.suspectid);

  // const [suspectData, suspectLoading] = useFetch("/api/resource/Suspect/S00014"+props.suspectid);

  // console.log(suspectData);

  // return (
  //   <Modal
  //     {...props}
  //     size="lg"
  //     aria-labelledby="contained-modal-title-vcenter"
  //     centered
  //   >
  //     <Modal.Header closeButton>
  //       <Modal.Title id="contained-modal-title-vcenter">
  //         Suspect Alert Details
  //       </Modal.Title>
  //     </Modal.Header>
  //     <Modal.Body>
  //     {suspectLoading ? (
  //             <div styles="text-align:center">
  //                 <Loader
  //                     type="Bars"
  //                     color="#00BFFF"
  //                     height={50}
  //                     width={50}
  //                 />
  //             </div>
  //         ) : (
  //             <NavPills
  //             color="warning"
  //             tabs={[
  //               {
  //                 tabButton: "Personal Details",
  //                 tabContent: (
  //                   <span>
  //                     <p>
  //                       {suspectData.name}
  //                     </p>
  //                     <br />
  //                     <p>
  //                    asdf
  //                     </p>
  //                     <br />
  //                     <p>This is very nice.</p>
  //                   </span>
  //                 )
  //               },
  //               {
  //                 tabButton: "Settings",
  //                 tabContent: (
  //                   <span>
  //                     <p>
  //                       Efficiently unleash cross-media information without
  //                       cross-media value. Quickly maximize timely
  //                       deliverables for real-time schemas.
  //                     </p>
  //                     <br />
  //                     <p>
  //                       Dramatically maintain clicks-and-mortar solutions
  //                       without functional solutions.
  //                     </p>
  //                   </span>
  //                 )
  //               },
  //               {
  //                 tabButton: "Options",
  //                 tabContent: (
  //                   <span>
  //                     <p>
  //                       Completely synergize resource taxing relationships via
  //                       premier niche markets. Professionally cultivate
  //                       one-to-one customer service with robust ideas.{" "}
  //                     </p>
  //                     <br />
  //                     <p>
  //                       Dynamically innovate resource-leveling customer
  //                       service for state of the art customer service.
  //                     </p>
  //                   </span>
  //                 )
  //               }
  //             ]}
  //           />
  //         )}
  //     </Modal.Body>
  //     <Modal.Footer>
  //       <Button onClick={props.onHide}>Close</Button>
  //     </Modal.Footer>
  //   </Modal>
  // );
}
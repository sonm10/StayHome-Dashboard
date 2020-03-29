import Dashboard from "views/Dashboard/Dashboard.js";

import SelfieVerification from "views/Dashboard/SelfieVerification.js";
import SubjectCaseDetails from "views/Dashboard/SubjectCaseDetails.js";
import Login from "views/auth/Login.js";
import Logout from "views/auth/Logout.js";

import DashboardIcon from "@material-ui/icons/Dashboard";


var dashRoutes = [
  {
    path: "/login",
    name: "Login",
    component: Login,
    layout: "/auth"
  },
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: DashboardIcon,
    component: Dashboard,
    layout: "/admin"
  },
  {
    path: "/selfieverification",
    name: "Selfie Verification",
    mini: "PP",
    component: SelfieVerification,
    layout: "/admin"
  },
  {
    path: "/subject-case-details/:caseid/:subjectid",
    name: "Subject Case Details",
    mini: "PP",
    component: SubjectCaseDetails,
    layout: "/admin"
  },
  {
    path: "/auth/logout",
    name: "Logout",
    component: Logout,
    layout: "/auth"
  }
];
export default dashRoutes;

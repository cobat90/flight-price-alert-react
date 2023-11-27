
import Dashboard from "layouts/dashboard";
import SignIn from "layouts/authentication/sign-in";
import SignUp from "layouts/authentication/sign-up";

import UserProfile from "layouts/user-profile";
import UserManagement from "layouts/user-management";
import FlightIcon from '@mui/icons-material/Flight';
import Login from "auth/login";
import Register from "auth/register";
import ForgotPasswordInit from "auth/forgot-password-init";
import ForgotPasswordFinish from "auth/forgot-password-finish";
import ResetPassword from "auth/reset-password";

// @mui icons
import Icon from "@mui/material/Icon";

const routes = [
  {
    type: "collapse",
    name: "Flights",
    key: "dashboard",
    icon: <FlightIcon />,
    route: "/dashboard",
    component: <Dashboard />,
  },
  {
    type: "examples",
    name: "User Management",
    key: "user-management",
    icon: <Icon fontSize="small">list</Icon>,
    route: "/user-management",
    component: <UserManagement />,
  },
];

export default routes;


import Dashboard from "layouts/dashboard";
import UserManagement from "layouts/user-management";
import FlightIcon from '@mui/icons-material/Flight';


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


import Dashboard from "layouts/dashboard";
import FlightIcon from '@mui/icons-material/Flight';

const routes = [
  {
    type: "collapse",
    name: "Flights",
    key: "dashboard",
    icon: <FlightIcon />,
    route: "/dashboard",
    component: <Dashboard />,
  },
];

export default routes;

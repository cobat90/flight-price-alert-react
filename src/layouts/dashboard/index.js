// @mui material components
import Grid from "@mui/material/Grid";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import Icon from "@mui/material/Icon";

import {
  Container,
  Card,
  CardHeader,
  CardContent,
  Divider,
  styled
} from '@mui/material';
import CardActions from '@mui/material/CardActions';

import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import CardMedia from '@mui/material/CardMedia';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';



// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import ReportsBarChart from "examples/Charts/BarCharts/ReportsBarChart";
import ReportsLineChart from "examples/Charts/LineCharts/ReportsLineChart";
import ComplexStatisticsCard from "examples/Cards/StatisticsCards/ComplexStatisticsCard";


// Data
import reportsLineChartData from "layouts/dashboard/data/reportsLineChartData";

// Dashboard components
import Projects from "layouts/dashboard/components/Projects";
import OrdersOverview from "layouts/dashboard/components/OrdersOverview";

import FlightPriceAlertService from "../../services/flight-price-alert-service";

import { useState, useEffect } from "react";

function Dashboard() {
  const { sales, tasks } = reportsLineChartData;
  const userId = localStorage.getItem("userId");

  const [alerts, setAlerts] = useState([
    {
      flightPriceAlertId: 1,
      alertName: 'Alert 1',
    },
    {
      flightPriceAlertId: 2,
      alertName: 'Alert 2',
    },
  ]);

  const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest
  })
}));

const bull = (
  <Box
    component="span"
    sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
  >
    •
  </Box>
);

  const [expanded, setExpanded] = useState(false);

  const handleExpandClick = () => {
  setExpanded(!expanded);
  };

  const getAlertsData = async () => {
    try {
      const response = await FlightPriceAlertService.findAllAlerts(userId);
      if (Array.isArray(response)) {
        // Extract flightPriceAlertIds and alertNames
        const flightPriceAlertIds = response.map((item) => item.flightPriceAlertId);
        const alertNames = response.map((item) => item.alert.alertName);
  
        // Update the alerts state as an array
        setAlerts(response);
      } else {
        console.error("Invalid data format in response:", response.data);
      }
    } catch (error) {
      console.error("Error fetching alerts:", error);
    }
  };
  

  useEffect(() => {
    getAlertsData();
  }, []);


  const [menu, setMenu] = useState(null);
  const openMenu = (event) => { setMenu(event.currentTarget); };
  const closeMenu = () => setMenu(null);

  const dropdownMenu = (
    <Menu
      anchorEl={menu}
      anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
      transformOrigin={{ vertical: "top", horizontal: "left" }}
      open={Boolean(menu)}
      onClose={closeMenu}
    >
      <MenuItem onClick={closeMenu}>Action</MenuItem>
      <MenuItem onClick={closeMenu}>Another action</MenuItem>
      <MenuItem onClick={closeMenu}>Something else here</MenuItem>
    </Menu>
  );

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox py={3}>
        <Grid container spacing={3}>
        {alerts.map((alert, index) => (
          <Grid item xs={16} md={8} lg={4} key={index}>
            <MDBox mb={3}>
              <Card sx={{ maxWidth: 345 }}>
                <CardHeader
                  avatar={
                    <Icon>flight</Icon>
                  }
                  action={
                    <div>
                      <IconButton aria-label="settings" onClick={() => openMenu(alert)}>
                        <MoreVertIcon />
                      </IconButton>
                      {dropdownMenu === alert ? (
                        // Render the dropdown menu for the specific card
                        <div>
                          {/* Your menu items here */}
                        </div>
                      ) : null}
                    </div>
                  }
                  title={alert.alertName}
                  subheader={alert.flightPriceAlertId}
                />
                <ReportsLineChart
                  color="success"
                  title="daily sales"
                  description={
                    <>
                      (<strong>+15%</strong>) increase in today sales.
                    </>
                  }
                  date="updated 4 min ago"
                  chart={sales}
                />
                <CardContent>
                  <Typography variant="body2" color="text.secondary">
                    This impressive paella is a perfect party dish and a fun                   
                  </Typography>
                </CardContent>
                <CardActions disableSpacing>
                  <IconButton aria-label="add to favorites">
                    <FavoriteIcon />
                  </IconButton>
                  <IconButton aria-label="share">
                    <ShareIcon />
                  </IconButton>
                  <ExpandMore
                    expand={expanded}
                    onClick={handleExpandClick}
                    aria-expanded={expanded}
                    aria-label="show more"
                  >
                    <ExpandMoreIcon />
                  </ExpandMore>
                </CardActions>
                <Collapse in={expanded} timeout="auto" unmountOnExit>
                  <CardContent>
                    <Typography paragraph>Method:</Typography>
                    <Typography paragraph>
                      Heat 1/2 cup of the broth in a pot until simmering, add
                      saffron and set aside for 10 minutes.
                    </Typography>                 
                  </CardContent>
                </Collapse>
              </Card>
            </MDBox>
          </Grid>
          ))}
        </Grid>    
        <MDBox>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6} lg={8}>
              <Projects />
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <OrdersOverview />
            </Grid>
          </Grid>
        </MDBox>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Dashboard;

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
  styled,
  List
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
import CloseIcon from '@mui/icons-material/Close';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Modal from '@mui/material/Modal';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import Autocomplete from "@mui/material/Autocomplete";


// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import ReportsLineChart from "examples/Charts/LineCharts/ReportsLineChart";
import FormField from "components/FormField";
import selectData from "components/FormField/data/selectData";

import MDButton from "components/MDButton";
import MDTypography from "components/MDTypography";

// Data
import reportsLineChartData from "layouts/dashboard/data/reportsLineChartData";

// Dashboard components
import Projects from "layouts/dashboard/components/Projects";
import OrdersOverview from "layouts/dashboard/components/OrdersOverview";

import FlightPriceAlertService from "../../services/flight-price-alert-service";

import { useState, useEffect, React } from "react";

function Dashboard() {
  const { sales, tasks } = reportsLineChartData;
  const userId = localStorage.getItem("userId");

  const [alerts, setAlerts] = useState([
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
  </Box>
);

  const [expanded, setExpanded] = useState(false);

  const handleExpandClick = () => {
  setExpanded(!expanded);
  };


  function formatDate(inputDate) {
    const date = new Date(inputDate); // Parse the input date string
    const day = String(date.getDate()).padStart(2, '0'); // Get the day and format it with leading zero
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Get the month (0-based) and format it with leading zero
    const year = date.getFullYear(); // Get the year
  
    return `${day}/${month}/${year}`; // Format the date as "dd/mm/yyyy"
  }

  const [modalMenu, setModalMenu] = useState(null);
  const openModalEditAlert = (event, alert) => { 
    setModalMenu(event.currentTarget);
    
  };
  const closeModalMenu = () => {
    setModalMenu(null);
    closeDropdownMenu();
  }

  const modalEditAlert = ( 
    <Modal
    open={Boolean(modalMenu)}
    onClose={closeModalMenu}
    aria-labelledby="parent-modal-title"
    aria-describedby="parent-modal-description"
    >
      <Card id="basic-info" sx={{ overflow: "visible" }}>
        <IconButton sx={{  marginLeft: 'auto'}} onClick={closeModalMenu}>
          <CloseIcon />
        </IconButton>
        <MDBox p={3}>
          <MDTypography variant="h5">Basic Info</MDTypography>
        </MDBox>
        <MDBox component="form" pb={3} px={3}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <FormField label="First Name" placeholder="Alec" />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormField label="Last Name" placeholder="Thompson" />
            </Grid>
            <Grid item xs={12}>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={4}>
                  <Autocomplete
                    defaultValue="Male"
                    options={selectData.gender}
                    renderInput={(params) => (
                      <FormField {...params} label="I'm" InputLabelProps={{ shrink: true }} />
                    )}
                  />
                </Grid>
                <Grid item xs={12} sm={8}>
                  <Grid container spacing={3}>
                    <Grid item xs={12} sm={5}>
                      <Autocomplete
                        defaultValue="February"
                        options={selectData.birthDate}
                        renderInput={(params) => (
                          <FormField
                            {...params}
                            label="Birth Date"
                            InputLabelProps={{ shrink: true }}
                          />
                        )}
                      />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                      <Autocomplete
                        defaultValue="1"
                        options={selectData.days}
                        renderInput={(params) => (
                          <FormField {...params} InputLabelProps={{ shrink: true }} />
                        )}
                      />
                    </Grid>
                    <Grid item xs={12} sm={3}>
                      <Autocomplete
                        defaultValue="2021"
                        options={selectData.years}
                        renderInput={(params) => (
                          <FormField {...params} InputLabelProps={{ shrink: true }} />
                        )}
                      />
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormField
                label="Email"
                placeholder="example@email.com"
                inputProps={{ type: "email" }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormField
                label="confirmation email"
                placeholder="example@email.com"
                inputProps={{ type: "email" }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormField label="your location" placeholder="Sydney, A" />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormField
                label="Phone Number"
                placeholder="+40 735 631 620"
                inputProps={{ type: "number" }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <FormField label="Language" placeholder="English" />
            </Grid>
            <Grid item xs={12} md={6}>
              <Autocomplete
                multiple
                defaultValue={["react", "angular"]}
                options={selectData.skills}
                renderInput={(params) => <FormField {...params} InputLabelProps={{ shrink: true }} />}
              />
            </Grid>
          </Grid>
        </MDBox>
      </Card>
    </Modal>
  );
  
  const [menu, setMenu] = useState(null);
  const openMenu = (event, alert) => { 
    setMenu(event.currentTarget);
  };
  const closeDropdownMenu = () => setMenu(null);

  const dropdownMenu = (
    <Menu
      anchorEl={menu}
      anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
      transformOrigin={{ vertical: "top", horizontal: "left" }}
      open={Boolean(menu)}
      onClose={closeDropdownMenu}
    >
      <MenuItem onClick={openModalEditAlert}>Edit</MenuItem>
      {modalMenu && (
        <div>
          {modalEditAlert}
        </div>
      )}
      <MenuItem onClick={closeDropdownMenu}>Disable</MenuItem>
      <MenuItem onClick={closeDropdownMenu}>Delete</MenuItem>
    </Menu>
  );
 
  const getAlertsData = async () => {
    try {
      const response = await FlightPriceAlertService.findAllAlerts(userId);
      if (Array.isArray(response)) {

        setAlerts(response);
      } else {
        console.error("Invalid data format in response:", response);
      }
    } catch (error) {
      console.error("Error fetching alerts:", error);
    }
  };

  useEffect(() => {
    getAlertsData();
  }, []);

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox py={3}>
        <Grid container spacing={3}>
        {alerts.map((alert, index) => (
          <Grid item xs={16} md={8} lg={4} key={index}>
            <MDBox mb={3}>
              <Card sx={{ maxWidth: 345, opacity: alert.alert?.alertDisabled ? 0.6 : 1 }} id={`menu-${index}`}>
                <CardHeader
                  avatar={
                    <Icon>flight</Icon>
                  }
                  action={
                    <div>
                      <IconButton aria-label="settings" onClick={(event) => openMenu(event, alert)}>
                        <MoreVertIcon />
                      </IconButton>
                      {menu && (
                        <div>
                          {dropdownMenu}
                        </div>
                      )}
                    </div>
                  }
                  title={alert.alert?.alertName}
                  subheader={"Created: " + formatDate(alert.alert?.alertDateCreated)}
                />
                <ReportsLineChart
                  color="success"
                  title="monthly prices"
                  description={
                    <>
                      (<strong>+15%</strong>) increase in today prices.
                    </>
                  }
                  date="updated 5 min ago"
                  chart={sales}
                />
                <CardContent>
                  <Typography variant="body2" color="text.secondary" height="200">
                  <Box sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>                 
                    <List>
                      <ListItem disablePadding>
                          <ListItemText primary={"Type: " + alert.alert?.alertType} />
                          <ListItemText primary={"Duration: " + alert.alert?.alertDurationTime} />
                      </ListItem>
                      {alert.alert?.alertDisabled === true ? (
                        <ListItem disablePadding>
                            <ListItemText primary={"Disabled: " + formatDate(alert.alert?.alertDateDisabled)} />
                        </ListItem>
                        ) : null}
                    </List>
                  </Box>
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
                    <List>
                      <ListItem disablePadding>
                        <div style={{ display: 'flex', justifyContent: 'space-between', margin: '10px' }}>
                        <ListItemText primary={<span style={{ fontSize: '16px', marginRight: '8px' }}>{"Adults: " + alert.mainFilter?.adults}</span>} />
                        <ListItemText primary={<span style={{ fontSize: '16px', marginRight: '8px' }}>{"Children: " + alert.mainFilter?.children}</span>} />
                        <ListItemText primary={<span style={{ fontSize: '16px'}}>{"Cabin Class: " + alert.mainFilter?.cabinClassType}</span>} />
                        </div>
                      </ListItem>
                      <ListItem disablePadding>
                        <div style={{ display: 'flex', justifyContent: 'space-between', margin: '10px' }}>
                          <ListItemText primary={<span style={{ fontSize: '16px', marginRight: '8px' }}>{"Flight: " + alert.mainFilter?.flight.flightType}</span>} />
                          <ListItemText primary={<span style={{ fontSize: '16px', marginRight: '8px' }}>{"Depart: " + alert.mainFilter?.flight.departDate}</span>} />
                          <ListItemText primary={<span style={{ fontSize: '16px'}}>{"Return: " + alert.mainFilter?.flight.returnDate}</span>} />
                        </div>
                      </ListItem>
                      <ListItem disablePadding>
                        <div style={{ display: 'flex', justifyContent: 'space-between', margin: '10px' }}>
                          <ListItemText primary={<span style={{ fontSize: '16px', marginRight: '15px' }}>{"From: " + (alert.mainFilter?.flight.airports[0].airportFrom || "N/A")}</span>} />
                          <ListItemText primary={<span style={{ fontSize: '16px', marginRight: '15px'  }}>{"To: " + (alert.mainFilter?.flight.airports[0].airportTo || "N/A")}</span>} />
                          <ListItemText primary={<span style={{ fontSize: '16px'  }}>{"Scales: " + (alert.mainFilter?.flight.airports[0].airportScales || "N/A")}</span>} />
                        </div>
                      </ListItem>
                      </List>
                  </CardContent>
                </Collapse>
              </Card>
            </MDBox>
          </Grid>
          ))}
          
          <Grid item xs={16} md={8} lg={4}>
            <MDBox display="flex" justifyContent="center" mb={3}>
              <Card >
                <MDButton
                  variant="gradient"
                  color="info"
                  fullWidth
                  type="button"
                  onClick={openModalEditAlert}
                >
                  Create New Alert
                </MDButton>
              </Card>
            </MDBox>
          </Grid>
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

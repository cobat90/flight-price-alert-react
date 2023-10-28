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
import Tooltip from "@mui/material/Tooltip";


// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import ReportsLineChart from "examples/Charts/LineCharts/ReportsLineChart";
import FormField from "components/FormField";
import selectData from "components/FormField/data/selectData";

import MDButton from "components/MDButton";
import MDTypography from "components/MDTypography";
import MDDatePicker from "components/MDDatePicker";
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { TimeField } from '@mui/x-date-pickers/TimeField';

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
  const [alerts, setAlerts] = useState([]);
  
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

  const [expandedAlertCard, setCardExpanded] = useState(false);
  const [expandedAlertModal, setModalExpanded] = useState(false);

  const handleExpandCardClick = () => {
    setCardExpanded(!expandedAlertCard);
  };

  const handleExpandModalClick = () => {
    setModalExpanded(!expandedAlertModal);
  };

  const [flightType, setFlightType] = useState("One Way");

  const handleFlightTypeChange = (event, value) => {
    setFlightType(value);
  };

  function formatDate(inputDate) {
    const date = new Date(inputDate); // Parse the input date string
    const day = String(date.getDate()).padStart(2, '0'); // Get the day and format it with leading zero
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Get the month (0-based) and format it with leading zero
    const year = date.getFullYear(); // Get the year
  
    return `${day}/${month}/${year}`; // Format the date as "dd/mm/yyyy"
  }

  const [modalEditAlert, setModalEditAlert] = useState(null);
  const openModalEditAlert = (event, alert) => { 
    setModalEditAlert(event.currentTarget);
  };
  const closeModalEditAlert = () => {
    setModalEditAlert(null);
    closeCardAlertMenu();
  }

  const modalEditAlertContent = ( 
    <Modal
    open={Boolean(modalEditAlert)}
    onClose={closeModalEditAlert}
    aria-labelledby="parent-modal-title"
    aria-describedby="parent-modal-description"
    disableScrollLock={ true }
    >
      <Card id="flight-alert-info" sx={{ 
        overflow: "visible",
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 800, // Default width for larger screens
        maxWidth: "90%", // Set maximum width for smaller screens
        border: '2px solid #000',
         }}>
        <IconButton sx={{  marginLeft: 'auto'}} onClick={closeModalEditAlert}>
          <CloseIcon />
        </IconButton>
        <MDBox p={3}>
          <MDTypography variant="h5">Flight Alert Info</MDTypography>
        </MDBox>
        <MDBox component="form" pb={3} px={3}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={7}>
              <FormField name="alertName" label="Flight Alert Name" placeholder="Bahamas 2024" />
            </Grid>
            <Grid item xs={12} sm={3}>
              <Autocomplete
                defaultValue="Telegram"
                options={selectData.alertType}
                renderInput={(params) => (
                  <FormField {...params} name="alerType" label="Alert Types" InputLabelProps={{ shrink: true }} />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={2}>
              <Autocomplete
                defaultValue="15"
                options={selectData.days}
                renderInput={(params) => (
                  <FormField {...params} name="alertDurationTime" label="Duration(Days)" InputLabelProps={{ shrink: true }} />
                )}
              />
            </Grid>
            <Grid item xs={12}>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={2.5}>
                  <Autocomplete
                    value={flightType}
                    options={selectData.flightType}
                    onChange={handleFlightTypeChange}
                    renderInput={(params) => (
                      <FormField
                        {...params}
                        name="flightType"
                        label="Flight Type"
                        InputLabelProps={{ shrink: true }}/>                    
                    )}/>                                
                </Grid>
                <Grid item xs={12} sm={3}>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker name="departDate" label="Depart Date"/>
                  </LocalizationProvider>
                </Grid>
                <Grid item xs={12} sm={3}>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                      name="returnDate"
                      label="Return Date"
                      disabled={flightType === "One Way"} 
                    />
                  </LocalizationProvider>
                </Grid>
                <Grid item xs={12} sm={3.5}>
                  <Autocomplete
                    defaultValue="Economy"
                    options={selectData.cabinClassType}
                    renderInput={(params) => (
                      <FormField {...params} name="cabinClassType" label="Cabin Class" InputLabelProps={{ shrink: true }} />
                  )}/>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={4.5}>
                  <FormField name="aiportFrom" label="From" placeholder="Rio de Janeiro(Todos)"  />              
                </Grid>
                <Grid item xs={12} sm={4.5}>
                  <FormField name="aiportTo" label="To" placeholder="Bahamas" />
                </Grid>
                <Grid item xs={12} sm={1.5}>
                  <Autocomplete
                      defaultValue="1"
                      options={selectData.passagers}
                      renderInput={(params) => (
                        <FormField {...params} name="adults" label="Adults" InputLabelProps={{ shrink: true }} />
                  )}/>     
                </Grid>
                <Grid item xs={12} sm={1.5}>
                  <Autocomplete
                        defaultValue="0"
                        options={selectData.passagers}
                        renderInput={(params) => (
                          <FormField {...params} name="children" label="Children" InputLabelProps={{ shrink: true }} />
                    )}/>    
                </Grid>
              </Grid>
            </Grid>
            <MDBox p={3}>
              <MDTypography variant="h5">Preferences
                <ExpandMore
                  expand={expandedAlertModal}
                  onClick={handleExpandModalClick}
                  aria-expanded={expandedAlertModal}
                  aria-label="show more">                           
                  <ExpandMoreIcon />
                </ExpandMore>
              </MDTypography>  
            </MDBox>
            <Collapse in={expandedAlertModal} timeout="auto" unmountOnExit px={3}>
              <MDBox pb={3} px={3}>
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={1.75}>
                    <FormField name="rangePrice" label="$ Range Start" placeholder="200" />
                  </Grid>
                  <Grid item xs={12} sm={1.75}>
                    <FormField name="rangePrice" label="$ Range End" placeholder="500" />        
                  </Grid>
                  <Grid item xs={12} sm={1.5}>
                    <Autocomplete
                      defaultValue="0"
                      options={selectData.passagers}
                      renderInput={(params) => (
                        <FormField {...params} name="scalesQuantity" label="Scales" InputLabelProps={{ shrink: true }} />
                     )}/>     
                  </Grid>
                  <Grid item xs={12} sm={3.5}>
                    <Tooltip title="End Date of the Departure Range. The first Departure Date is the Start of the Range." placement="bottom">
                      <div>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                          <DatePicker name="departRangeDate" label="Depart Range Date"/>
                        </LocalizationProvider>  
                      </div>
                    </Tooltip>
                  </Grid>
                  <Grid item xs={12} sm={3.5}>
                    <Tooltip title="End Date of the Return Range. The first Return Date is the Start of the Range." placement="bottom">
                      <div>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                          <DatePicker name="returnRangeDate" label="Return Range Date"/>
                        </LocalizationProvider>  
                      </div>
                    </Tooltip>
                  </Grid>
                  <Grid item xs={12}>
                    <Grid container spacing={3}>
                      <Grid item xs={12} sm={3}>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                          <TimeField name="departRangeTimeStart" label="Depart Range Time Start" format="HH:mm" />
                        </LocalizationProvider>              
                      </Grid>
                      <Grid item xs={12} sm={3}>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                          <TimeField name="departRangeTimeEnd" label="Depart Range Time End" format="HH:mm" />
                        </LocalizationProvider>
                      </Grid>
                      <Grid item xs={12} sm={3}>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                          <TimeField name="returnRangeTimeEnd" label="Return Range Time End" format="HH:mm" />
                        </LocalizationProvider>
                      </Grid>
                      <Grid item xs={12} sm={3}>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                          <TimeField name="returnRangeTimeEnd" label="Return Range Time End" format="HH:mm" />
                        </LocalizationProvider>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item xs={12}>
                    <Grid container spacing={3}>
                      <Grid item xs={12} sm={3}>
                        <Autocomplete
                            defaultValue="Credit Card"
                            options={selectData.paymentType}
                            renderInput={(params) => (
                              <FormField {...params} name="paymentMethod" label="Payment Method" InputLabelProps={{ shrink: true }} />
                        )}/>                     
                      </Grid>
                      <Grid item xs={12} sm={1.5}>
                        <Autocomplete
                          defaultValue="0"
                          options={selectData.passagers}
                          renderInput={(params) => (
                            <FormField {...params} name="paymentParcels" label="Parcels" InputLabelProps={{ shrink: true }} />
                        )}/> 
                      </Grid>
                      <Grid item xs={12} sm={3}>
                        <Autocomplete
                            defaultValue="Wifi Flights"
                            options={selectData.otherPreferences}
                            renderInput={(params) => (
                              <FormField {...params} name="otherPreferences" label="Others Preferences" InputLabelProps={{ shrink: true }} />
                          )}/> 
                      </Grid>
                      <Grid item xs={12} sm={1.5}>
                        <Autocomplete
                            defaultValue="GOL"
                            options={selectData.airlines}
                            renderInput={(params) => (
                              <FormField {...params} name="airline" label="Airlines" InputLabelProps={{ shrink: true }} />
                          )}/> 
                      </Grid>
                      <Grid item xs={12} sm={3}>
                        <Autocomplete
                            defaultValue="Skyscanner"
                            options={selectData.searchSites}
                            renderInput={(params) => (
                              <FormField {...params} name="searchSites" label="Search Motors" InputLabelProps={{ shrink: true }} />
                          )}/> 
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </MDBox>
            </Collapse>
          </Grid>
          <MDBox pb={3} px={3} display="flex" justifyContent="center" mb={3}>
            <Grid item xs={12} md={11} >
              <MDButton
                variant="gradient"
                color="info"
                type="button">                   
                Save
                </MDButton>
            </Grid>
            <Grid item xs={12} md={1} >
              <MDButton
                variant="gradient"
                color="info"
                type="button">                      
                Clear
                </MDButton>
            </Grid>
          </MDBox>
        </MDBox>
      </Card>
    </Modal>
  );
  
  const [cardAlertMenu, setCardAlertMenu] = useState(null);
  const openCardAlertMenu = (event, alert) => { 
    setCardAlertMenu(event.currentTarget);
  };
  const closeCardAlertMenu = () => setCardAlertMenu(null);

  const cardAlertMenuContent = (
    <Menu
      anchorEl={cardAlertMenu}
      transformOrigin={{ vertical: "top", horizontal: "left" }}
      open={Boolean(cardAlertMenu)}
      onClose={closeCardAlertMenu}
      keepMounted
      disableAutoFocusItem
      disableScrollLock={ true }
    >
      <MenuItem onClick={openModalEditAlert}>Edit</MenuItem>
      {modalEditAlert && (
        <div>
          {modalEditAlertContent}
        </div>
      )}
      <MenuItem onClick={closeCardAlertMenu}>Disable</MenuItem>
      <MenuItem onClick={closeCardAlertMenu}>Delete</MenuItem>
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
              <Card sx={{ maxWidth: 345, opacity: alert.alert?.alertDisabled ? 0.6 : 1 }} id={`cardAlertMenu-${index}`}>
                <CardHeader
                  avatar={
                    <Icon>flight</Icon>
                  }
                  action={
                    <div>
                      <IconButton aria-label="settings" onClick={(event) => openCardAlertMenu(event, alert)}>
                        <MoreVertIcon />
                      </IconButton>
                      {cardAlertMenu && (
                        <div>
                          {cardAlertMenuContent}
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
                </CardContent>
                <CardActions disableSpacing>
                  <IconButton aria-label="add to favorites">
                    <FavoriteIcon />
                  </IconButton>
                  <IconButton aria-label="share">
                    <ShareIcon />
                  </IconButton>
                  <ExpandMore
                    expand={expandedAlertCard}
                    onClick={handleExpandCardClick}
                    aria-expanded={expandedAlertCard}
                    aria-label="show more"
                  >
                    <ExpandMoreIcon />
                  </ExpandMore>
                </CardActions>
                <Collapse in={expandedAlertCard} timeout="auto" unmountOnExit>
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
                  onClick={openModalEditAlert}>         
                  Create New Alert
                </MDButton>
                {modalEditAlert && (
                  <div>
                    {modalEditAlertContent}
                  </div>
                )}
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

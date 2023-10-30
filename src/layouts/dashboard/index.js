// @mui material components
import Grid from "@mui/material/Grid";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import Icon from "@mui/material/Icon";

import { Card, CardHeader,  CardContent, styled, List } from '@mui/material';
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
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { TimeField } from '@mui/x-date-pickers/TimeField';
import dayjs from "dayjs";
import "dayjs/locale/en-gb";

// Data
import reportsLineChartData from "layouts/dashboard/data/reportsLineChartData";
import FlightPriceAlertService from "../../services/flight-price-alert-service";

import { useState, useEffect, useRef, React } from "react";

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
  
  const [cleared, setCleared] = useState(false);
  useEffect(() => {
    if (cleared) {
      const timeout = setTimeout(() => {
        setCleared(false);
      }, 1500);

      return () => clearTimeout(timeout);
    }
    return () => {};
  }, [cleared]);

  const formRef = useRef();

  const handleClearForm = () => {
    setCleared(true);
    formRef.current.reset();   
  };

  const [cardAlertMenu, setCardAlertMenu] = useState(null);
  const openCardAlertMenu = (event, alert) => { 
    setCardAlertMenu(event.currentTarget);
  };
  const closeCardAlertMenu = () => setCardAlertMenu(null);
 
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

  const updateAlertData = async (formData) => {
    try {
      const response = await FlightPriceAlertService.updateAlert(alert);
      if (Array.isArray(response)) {

        setAlerts(response);
      } else {
        console.error("Invalid data format in response:", response);
      }
    } catch (error) {
      console.error("Error fetching alert:", error);
    }
  };

  useEffect(() => {
    getAlertsData();
  }, []);

  const handleSubmit = (action) => {
    if (formData) {
      if (action === 'update') {
        // Call the updateAlertData function and pass the updated 'alert' object
        updateAlertData(alert);
      } else if (action === 'create') {
        // Create a new alert here if needed
      }
    }

    // Clear the form if needed
    setFormData({
      alertName: '',
      alertType: 'Telegram',
      alertDurationTime: '15',
      // Reset other form fields as well
    });

    setCleared(true);
  };

  const [modalEditAlert, setModalEditAlert] = useState(null);
  const [alert, setAlert] = useState(null);
  
  const openModalEditAlert = (event) => {
    setModalEditAlert(event.currentTarget);
  };
  const closeModalEditAlert = () => {
    setModalEditAlert(null);
    closeCardAlertMenu();
  }

  const modalEditAlertContent = (alert) => {
    return ( 
      <Modal
      open={Boolean(modalEditAlert)}
      onClose={closeModalEditAlert}
      aria-labelledby="parent-modal-title"
      aria-describedby="parent-modal-description"
      disableScrollLock={ true }>    
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
          <MDBox pb={3} px={3}>
            <MDTypography variant="h5">Flight Alert Info</MDTypography>
          </MDBox>
          <MDBox component="form" pb={3} px={3} ref={formRef}>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={7}>
                <FormField name="alertName" label="Flight Alert Name" placeholder="Bahamas 2024" defaultValue={alert.alert?.alertName} />
              </Grid>
              <Grid item xs={12} sm={3}>
                <Autocomplete
                  defaultValue="Telegram"
                  options={selectData.alertType}
                  renderInput={(params) => (
                    <FormField {...params} name="alerType" label="Alert Types" InputLabelProps={{ shrink: true }} defaultValue={alert.alert?.alertType} />
                  )}
                />
              </Grid>
              <Grid item xs={12} sm={2}>
                <Autocomplete
                  defaultValue="15"
                  options={selectData.days}
                  renderInput={(params) => (
                    <FormField {...params} name="alertDurationTime" label="Duration(Days)" 
                    InputLabelProps={{ shrink: true }} defaultValue={alert.alert?.alertDurationTime}/>
                  )}/>          
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
                          InputLabelProps={{ shrink: true }} defaultValue={alert.mainFilter?.flight?.flightType}/>                    
                      )}/>                                
                  </Grid>
                  <Grid item xs={12} sm={3.3}>
                    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="en-gb">
                      <DatePicker name="departDate" label="Depart Date" defaultValue={dayjs(alert.mainFilter?.flight?.departDate)}
                      slotProps={{
                        field: { clearable: true, onClear: () => setCleared(true) },
                      }}/>
                    </LocalizationProvider>
                  </Grid>
                  <Grid item xs={12} sm={3.3}>
                    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="en-gb">
                      <DatePicker
                        name="returnDate"
                        label="Return Date"
                        defaultValue={dayjs(alert.mainFilter?.flight?.returnDate)}
                        disabled={flightType === "One Way"}
                        slotProps={{
                          field: { clearable: true, onClear: () => setCleared(true) },
                        }}/> 
                    </LocalizationProvider>
                  </Grid>
                  <Grid item xs={12} sm={2.9}>
                    <Autocomplete
                      options={selectData.cabinClassType}
                      defaultValue={alert.mainFilter?.cabinClassType}
                      renderInput={(params) => (
                        <FormField {...params} name="cabinClassType" label="Cabin Class" InputLabelProps={{ shrink: true }} />
                    )}/>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12}>
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={4.5}>
                    <FormField name="aiportFrom" label="From" placeholder="Rio de Janeiro(Todos)" defaultValue={alert.mainFilter?.flight?.airports[0].airportFrom}  />              
                  </Grid>
                  <Grid item xs={12} sm={4.5}>
                    <FormField name="aiportTo" label="To" placeholder="Bahamas" defaultValue={alert.mainFilter?.flight?.airports[0].aiportTo} />
                  </Grid>
                  <Grid item xs={12} sm={1.5}>
                    <Autocomplete
                        defaultValue="1"
                        options={selectData.passagers}
                        renderInput={(params) => (
                          <FormField {...params} name="adults" label="Adults" InputLabelProps={{ shrink: true }} defaultValue={alert.mainFilter?.adults} />
                    )}/>     
                  </Grid>
                  <Grid item xs={12} sm={1.5}>
                    <Autocomplete
                          defaultValue="0"
                          options={selectData.passagers}
                          renderInput={(params) => (
                            <FormField {...params} name="children" label="Children" InputLabelProps={{ shrink: true }} defaultValue={alert.mainFilter?.children}/>
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
                      <FormField name="rangePrice" label="$ Range Start" placeholder="200" defaultValue={alert.preferencesFilter?.rangePrice?.rangeStart} />
                    </Grid>
                    <Grid item xs={12} sm={1.75}>
                      <FormField name="rangePrice" label="$ Range End" placeholder="500" defaultValue={alert.preferencesFilter?.rangePrice?.rangeEnd}/>        
                    </Grid>
                    <Grid item xs={12} sm={1.5}>
                      <Autocomplete
                        defaultValue="0"
                        options={selectData.passagers}
                        renderInput={(params) => (
                          <FormField {...params} name="scalesQuantity" label="Scales" InputLabelProps={{ shrink: true }} defaultValue={alert.preferencesFilter?.scalesQuantity} />
                      )}/>     
                    </Grid>
                    <Grid item xs={12} sm={3.5}>
                      <Tooltip title="End Date of the Departure Range. The first Departure Date is the Start of the Range." placement="bottom">
                        <div>
                          <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="en-gb">
                            <DatePicker name="departRangeDate" label="Depart Range Date" defaultValue={dayjs(alert.preferencesFilter?.departRangeDate)}
                              slotProps={{
                                field: { clearable: true, onClear: () => setCleared(true) },
                              }}/> 
                          </LocalizationProvider>  
                        </div>
                      </Tooltip>
                    </Grid>
                    <Grid item xs={12} sm={3.5}>
                      <Tooltip title="End Date of the Return Range. The first Return Date is the Start of the Range." placement="bottom">
                        <div>
                          <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="en-gb">
                            <DatePicker name="returnRangeDate" label="Return Range Date" defaultValue={dayjs(alert.preferencesFilter?.returnRangeDate)}
                              slotProps={{
                                field: { clearable: true, onClear: () => setCleared(true) },
                              }}/> 
                          </LocalizationProvider>  
                        </div>
                      </Tooltip>
                    </Grid>
                    <Grid item xs={12}>
                      <Grid container spacing={3}>
                        <Grid item xs={12} sm={3}>
                          <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <TimeField name="departRangeTimeStart" label="Start Depart Range Time" format="HH:mm" />
                          </LocalizationProvider>              
                        </Grid>
                        <Grid item xs={12} sm={3}>
                          <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <TimeField name="departRangeTimeEnd" label="End Depart Range Time" format="HH:mm" />
                          </LocalizationProvider>
                        </Grid>
                        <Grid item xs={12} sm={3}>
                          <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <TimeField name="returnRangeTimeEnd" label="End Return Range Time" format="HH:mm" />
                          </LocalizationProvider>
                        </Grid>
                        <Grid item xs={12} sm={3}>
                          <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <TimeField name="returnRangeTimeEnd" label="End Return Range Time" format="HH:mm" />
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
                  type="button"
                  onClick={handleSubmit}>                   
                  Save
                  </MDButton>
              </Grid>
              <Grid item xs={12} md={1} >
                <MDButton
                  variant="gradient"
                  color="info"
                  type="button"
                  onClick={handleClearForm}>                      
                  Clear
                  </MDButton>
              </Grid>
            </MDBox>
          </MDBox>
        </Card>
      </Modal>
    );
  };

  const cardAlertMenuContent = (alert) => (
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
          {modalEditAlertContent(alert)}
        </div>
      )}
      <MenuItem onClick={closeCardAlertMenu}>Disable</MenuItem>
      <MenuItem onClick={closeCardAlertMenu}>Delete</MenuItem>
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
              <Card sx={{ maxWidth: 345, opacity: alert.alert?.alertDisabled ? 0.6 : 1 }} id={`cardAlertMenu-${index}`}>
                <CardHeader
                  avatar={<Icon>flight</Icon>}            
                  action={
                    <div>
                      <IconButton aria-label="settings" onClick={(event) => openCardAlertMenu(event, alert)}>
                        <MoreVertIcon />
                      </IconButton>
                      {cardAlertMenu && (
                        <div>
                          {cardAlertMenuContent(alert)}
                        </div>
                      )}
                    </div>
                  }
                  title={alert.alert?.alertName}
                  subheader={"Created: " + dayjs(alert.alert?.alertDateCreated).format("DD/MM/YYYY")}
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
                  <MDBox>
                    <input type="hidden" name="flightPriceAlertId" value={alert.flightPriceAlertId} />                 
                    <List>
                      <ListItem disablePadding >
                          <ListItemText >
                            <MDTypography variant="h6">{"Type: " + alert.alert?.alertType}</MDTypography>
                          </ListItemText>
                          {alert.alert?.alertDisabled === true ? (
                            <ListItemText>
                              <MDTypography variant="h6">{"Disabled: " + dayjs(alert.alert?.alertDateDisabled).format("DD/MM/YYYY")}</MDTypography>
                            </ListItemText>                 
                          ) : null}
                      </ListItem>
                      <ListItem disablePadding>
                        <ListItemText>
                          <MDTypography variant="h6">{"Active Days: " + alert.alert?.alertDurationTime}</MDTypography>
                        </ListItemText>
                        <ListItemText>
                          <MDTypography variant="h6">{"Left Days: " + dayjs().diff(alert.alert?.alertDateCreated, "days") }</MDTypography>
                        </ListItemText>
                        </ListItem>
                    </List>
                  </MDBox>
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
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
                   
}

export default Dashboard;

import { Card, CardHeader,  CardContent, styled, List } from '@mui/material';
import CardActions from '@mui/material/CardActions';
import Grid from "@mui/material/Grid";
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import CardMedia from '@mui/material/CardMedia';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Icon from "@mui/material/Icon";
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
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import ReportsLineChart from "examples/Charts/LineCharts/ReportsLineChart";
import FormField from "components/FormField";
import selectData from "components/FormField/data/selectData";

import MDBox from "components/MDBox";
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
import { convertRequest } from '../../services/convert-flight-price-alert-service';

import React, { useState, useEffect, useRef } from "react";

const Notification = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="standard" {...props} />;
});

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

  const [flightType, setFlightType] = useState(null);

  const formRef = useRef();

  const handleClearForm = () => {
    setCleared(true);
    formRef.current.reset();   
  };

  const [cardAlertMenu, setCardAlertMenu] = useState(null);
  const [cardAlertIndex, setCardAlertIndex] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const openCardAlertMenu = (event, index) => { 
    setCardAlertMenu(event.currentTarget);
    setCardAlertIndex(index);
  };
  const closeCardAlertMenu = () => {
    setCardAlertMenu(null);
    setCardAlertIndex(null);
    setModalExpanded(null);
    setIsEditing(false);
  }

  const [snackBarState, setSnackBarState] = useState({
    open: false,
    vertical: 'top',
    horizontal: 'center',
  });
 
  const { vertical, horizontal, open } = snackBarState;

  const handleSnackBarOpen = (newState) => {
    setSnackBarState({ ...newState, open: true });
  };

  const handleSnackBarClose = () => {
    setSnackBarState({ ...snackBarState, open: false });
  };
 
  const getAlertsData = async () => {
    try {
      const response = await FlightPriceAlertService.findAllAlerts(userId);
      if (response.status === 200 && Array.isArray(response.data)) {
        console.info("getAlertsData");
        setAlerts(response.data);

      } else {
        console.error("Invalid data format in response:", response);
      }
    } catch (error) {
      console.error("Error fetching alerts:", error);
    }
  };

  const createAlertData = async (payload) => {
    try {
      const response = await FlightPriceAlertService.createAlert(payload);
      if (response.status === 201) {

        console.info("Alert " + payload.alert.alertName +  " created with sucess");
        closeModalEditAlert();
        handleSnackBarOpen({ vertical: 'top', horizontal: 'center' });
        getAlertsData();
   
      } else {
        console.error("Invalid data format in response:", response.status + response);
      }
    } catch (error) {
      console.error("Error fetching alert:", error);
    }
  };

  const updateAlertData = async (alertData) => {
    try {
      const response = await FlightPriceAlertService.updateAlert(alertData);
      if (response.status === 200) {

        console.info("Alert " + alertData.alert.alertName +  " updated with sucess");

        getAlertsData();

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

  const [departDate, setDepartDate] = useState(null);
  const [returnDate, setReturnDate] = useState(null);
  const [departRangeDate, setDepartRangeDate] = useState(null);
  const [returnRangeDate, setReturnRangeDate] = useState(null);

  const handleSubmit = (event) => {
    event.preventDefault(); // Prevent the form from actually submitting

    const formData = new FormData(event.target); // Create a FormData object from the form

    formData.append('userId', userId)
    formData.append('departDate', departDate ? dayjs(departDate).format("YYYY-MM-DD") : "");
    formData.append('returnDate', returnDate && flightType !== 'One Way' ? dayjs(returnDate).format("YYYY/MM/DD") : "");
    formData.append('departRangeDate', departRangeDate ? dayjs(departRangeDate).format("YYYY-MM-DD") : "");
    formData.append('returnRangeDate', returnRangeDate && flightType !== 'One Way' ? dayjs(returnRangeDate).format("YYYY/MM/DD") : "");

    const alertData = {};
    formData.forEach((value, key) => {
      alertData[key] = value;
    });
    console.info(alertData);

    if (isEditing) {
      const requestPayload = convertRequest(alertData);
      updateAlertData(requestPayload);
    }
    else{
      const requestPayload = convertRequest(alertData);
      createAlertData(requestPayload);
    }

    
  };

  const [modalEditAlert, setModalEditAlert] = useState(null);
  const [alert, setAlert] = useState(null);
  
  const openModalEditAlert = (event) => {
    setModalEditAlert(event.currentTarget);
  };
  
  const closeModalEditAlert = () => {
    setModalEditAlert(null);
    setDepartDate(null);
    setReturnDate(null);
    setDepartRangeDate(null);
    setReturnRangeDate(null);
    setFlightType(null);
    closeCardAlertMenu();
  }

  const modalEditAlertContent = (index) => {
    const currentAlert = alerts[index];
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
          <MDBox component="form" pb={3} px={3} ref={formRef} onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={7}>
                <FormField name="alertName" label="Flight Alert Name" placeholder="Bahamas 2024" 
                  defaultValue={(isEditing ? (currentAlert?.alert?.alertName|| "").toString() : "")} />                                   
              </Grid>
              <Grid item xs={12} sm={3}>
                <Autocomplete
                  defaultValue={(isEditing
                    ? (currentAlert?.alert?.alertType|| "").toString()
                    : "")}
                  
                  options={selectData.alertType} 
                  renderInput={(params) => (
                    <FormField {...params} name="alerType" label="Alert Types"
                     InputLabelProps={{ shrink: true }}  />                      
                  )}
                />
              </Grid>
              <Grid item xs={12} sm={2}>
                <Autocomplete
                  defaultValue={(isEditing
                    ? (currentAlert?.alert?.alertDurationTime || '').toString()
                    : '')}
                  options={selectData.days}
                  renderInput={(params) => (
                    <FormField
                      {...params}
                      name="alertDurationTime"
                      label="Duration(Days)"
                      InputLabelProps={{ shrink: true }}
                      
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12}>
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={2.5}>
                    <Autocomplete
                      defaultValue={(isEditing
                        ? (currentAlert?.mainFilter?.flight?.flightType || '').toString()
                        : '')}
                      options={selectData.flightType}
                      onChange={(event, value) => setFlightType(value)}
                      renderInput={(params) => (
                        <FormField
                          {...params}
                          name="flightType"
                          label="Flight Type"
                          InputLabelProps={{ shrink: true }}
                        />
                      )}
                    />
                  </Grid>
                  <Grid item xs={12} sm={3.3}>
                    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="en-gb">
                      <DatePicker
                        name="departDate"
                        label="Depart Date"
                        defaultValue={(isEditing
                          ? dayjs(currentAlert?.mainFilter?.flight?.departDate)
                          : null)}
                        disablePast  
                        onChange={date => setDepartDate(date)}
                        slotProps={{
                          field: {clearable: true, onClear: () => setCleared(true) },
                        }}
                      />
                    </LocalizationProvider>
                  </Grid>
                  <Grid item xs={12} sm={3.3}>
                    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="en-gb">
                      <DatePicker
                        name="returnDate"
                        label="Return Date"
                        defaultValue={(isEditing
                          ? dayjs(currentAlert?.mainFilter?.flight?.returnDate)
                          : null)}
                        disablePast
                        value={flightType === 'One Way'? '' : null}
                        onChange={date => setReturnDate(date)}
                        disabled={flightType === 'One Way'}
                        slotProps={{
                          field: { clearable: true, onClear: () => setCleared(true) },
                        }}
                      />
                    </LocalizationProvider>
                  </Grid>
                  <Grid item xs={12} sm={2.9}>
                    <Autocomplete
                      defaultValue={(isEditing
                        ? (currentAlert?.mainFilter?.cabinClassType || '').toString()
                        : '')}
                      options={selectData.cabinClassType}
                      renderInput={(params) => (
                        <FormField
                          {...params}
                          name="cabinClassType"
                          label="Cabin Class"
                          InputLabelProps={{ shrink: true }}
                          
                        />
                      )}
                    />
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12}>
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={4.5}>
                    <FormField name="aiportFrom" label="From" placeholder="Rio de Janeiro(Todos)" 
                     defaultValue={(isEditing
                      ? (currentAlert?.mainFilter?.flight?.airports[0]?.airportFrom || "").toString()
                      : "")}  />              
                  </Grid>
                  <Grid item xs={12} sm={4.5}>
                    <FormField name="aiportTo" label="To" placeholder="Bahamas" 
                    defaultValue={(isEditing
                      ? (currentAlert?.mainFilter?.flight?.airports[0]?.airportTo || "").toString()
                      : "")} />
                  </Grid>
                  <Grid item xs={12} sm={1.5}>
                    <Autocomplete
                        defaultValue={(isEditing
                          ? currentAlert?.mainFilter?.adults || 0
                          : "")}
                        options={selectData.passagers}
                        renderInput={(params) => (
                          <FormField {...params} name="adults" label="Adults" InputLabelProps={{ shrink: true }}   />
                    )}/>     
                  </Grid>
                  <Grid item xs={12} sm={1.5}>
                    <Autocomplete
                          defaultValue={(isEditing
                            ? currentAlert?.mainFilter?.children || 0
                            : "")}
                          options={selectData.passagers}
                          renderInput={(params) => (
                            <FormField {...params} name="children" label="Children" InputLabelProps={{ shrink: true }}  />
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
                      <FormField name="rangePriceStart" label="$ Range Start" placeholder="200" 
                        defaultValue={(isEditing
                        ? (currentAlert?.preferencesFilter?.rangePrice?.rangeStart || "").toString()
                        : "")} />
                    </Grid>
                    <Grid item xs={12} sm={1.75}>
                      <FormField name="rangePriceEnd" label="$ Range End" placeholder="500" 
                      defaultValue={(isEditing
                        ? (currentAlert?.preferencesFilter?.rangePrice?.rangeEnd || "").toString()
                        : "")}/>        
                    </Grid>
                    <Grid item xs={12} sm={1.5}>
                      <Autocomplete
                        defaultValue={(isEditing
                          ? currentAlert?.preferencesFilter?.scalesQuantity || 0
                          : "")}
                        options={selectData.passagers}
                        renderInput={(params) => (
                          <FormField {...params} name="scalesQuantity" label="Scales" InputLabelProps={{ shrink: true }} />
                      )}/>     
                    </Grid>
                    <Grid item xs={12} sm={3.5}>                  
                      <Tooltip title="End Date of the Departure Range. The first Departure Date is the Start of the Range." placement="bottom">
                        <div>
                          <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="en-gb">
                            <DatePicker name="departRangeDate" label="Depart Range Date" 
                              defaultValue={(isEditing
                                ? dayjs(currentAlert?.preferencesFilter?.departRangeDate)
                                : null)}
                              disablePast
                              onChange={date => setDepartRangeDate(date)}
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
                            <DatePicker name="returnRangeDate" label="Return Range Date" 
                              defaultValue={(isEditing
                                ? dayjs(currentAlert?.preferencesFilter?.returnRangeDate)
                                : null)}
                              disablePast
                              value={flightType === 'One Way'? '' : null}
                              onChange={date => setReturnRangeDate(date)}
                              disabled={flightType === 'One Way'}
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
                            <TimeField name="departRangeTimeStart" label="Start Depart Range Time" format="HH:mm" 
                              defaultValue={(isEditing
                                ? dayjs(currentAlert?.preferencesFilter?.departRangeTime?.rangeStart, "hh:mm")
                                : null)} />
                          </LocalizationProvider>              
                        </Grid>
                        <Grid item xs={12} sm={3}>
                          <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <TimeField name="departRangeTimeEnd" label="End Depart Range Time" format="HH:mm" 
                              defaultValue={(isEditing
                                ? dayjs(currentAlert?.preferencesFilter?.departRangeTime?.rangeEnd, "hh:mm")
                                : null)} />
                          </LocalizationProvider>
                        </Grid>
                        <Grid item xs={12} sm={3}>
                          <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <TimeField name="returnRangeTimeStart" label="Start Return Range Time" format="HH:mm" 
                              defaultValue={(isEditing
                                ? dayjs(currentAlert?.preferencesFilter?.returnRangeTime?.rangeStart, "hh:mm")
                                : null)} />
                          </LocalizationProvider>
                        </Grid>
                        <Grid item xs={12} sm={3}>
                          <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <TimeField name="returnRangeTimeEnd" label="End Return Range Time" format="HH:mm" 
                              defaultValue={(isEditing
                                ? dayjs(currentAlert?.preferencesFilter?.returnRangeTime?.rangeEnd, "hh:mm")
                                : null)} /> 
                          </LocalizationProvider>
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid item xs={12}>
                      <Grid container spacing={3}>
                        <Grid item xs={12} sm={3}>
                        <Autocomplete
                          defaultValue={(isEditing
                            ? (currentAlert?.preferencesFilter?.payment?.method || '').toString()
                            : '')}
                          options={selectData.paymentType}
                          renderInput={(params) => (
                            <FormField {...params} name="paymentMethod" label="Payment Method" InputLabelProps={{ shrink: true }} />
                          )}
                        />                
                        </Grid>
                        <Grid item xs={12} sm={1.5}>
                          <Autocomplete
                            defaultValue={(isEditing
                              ? (currentAlert?.preferencesFilter?.payment?.parcels || '').toString()
                              : '')}
                            options={selectData.passagers}
                            renderInput={(params) => (
                              <FormField {...params} name="paymentParcels" label="Parcels" InputLabelProps={{ shrink: true }} />
                          )}/> 
                        </Grid>
                        <Grid item xs={12} sm={3}>
                          <Autocomplete
                            defaultValue={(isEditing
                              ? (currentAlert?.preferencesFilter?.otherPreferences || '').toString()
                              : '')}
                            options={selectData.otherPreferences}
                            renderInput={(params) => (
                              <FormField {...params} name="otherPreferences" label="Others Preferences" InputLabelProps={{ shrink: true }} />
                            )}/> 
                        </Grid>
                        <Grid item xs={12} sm={1.5}>
                          <Autocomplete
                            defaultValue={(isEditing
                              ? (currentAlert?.preferencesFilter?.airline || '').toString()
                              : '')}
                            options={selectData.airlines}
                            renderInput={(params) => (
                              <FormField {...params} name="airline" label="Airlines" InputLabelProps={{ shrink: true }} />
                            )}/> 
                        </Grid>
                        <Grid item xs={12} sm={3}>
                          <Autocomplete
                            defaultValue={(isEditing
                              ? (currentAlert?.preferencesFilter?.searchSites || '').toString()
                              : '')}
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
                  type="submit"
                  >                   
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
      <MenuItem onClick={(e) => {
        e.stopPropagation(); // Prevent the event from propagating further if necessary
        openModalEditAlert(e);
        setIsEditing(true);
        }}>Edit
      </MenuItem>
      {modalEditAlert && (
        <div>
          {modalEditAlertContent(alert, cardAlertIndex)}
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
              <Card sx={{ maxWidth: 345, opacity: alert?.alert?.alertDisabled ? 0.6 : 1 }} id={`cardAlertMenu-${index}`}>
                <CardHeader
                  avatar={<Icon>flight</Icon>}            
                  action={
                    <div>
                      <IconButton aria-label="settings" onClick={(event) => openCardAlertMenu(event, index)}>
                        <MoreVertIcon />
                      </IconButton>
                      {cardAlertMenu && (
                        <div>
                          {cardAlertMenuContent(alert)}
                        </div>
                      )}
                    </div>
                  }
                  title={alert?.alert?.alertName}
                  subheader={"Created: " + dayjs(alert?.alert?.alertDateCreated).format("DD/MM/YYYY")}
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
                    <input type="hidden" name="flightPriceAlertId" value={alert?.flightPriceAlertId} />                 
                    <List>
                      <ListItem disablePadding >
                          <ListItemText >
                            <MDTypography variant="h6">{"Type: " + alert?.alert?.alertType}</MDTypography>
                          </ListItemText>
                          {alert?.alert?.alertDisabled === true ? (
                            <ListItemText>
                              <MDTypography variant="h6">{"Disabled: " + dayjs(alert?.alert?.alertDateDisabled).format("DD/MM/YYYY")}</MDTypography>
                            </ListItemText>                 
                          ) : null}
                      </ListItem>
                      <ListItem disablePadding>
                        <ListItemText>
                          <MDTypography variant="h6">{"Duration: " + alert?.alert?.alertDurationTime}</MDTypography>
                        </ListItemText>
                        <ListItemText>
                          <MDTypography variant="h6">{"Active Days: " +
                            (dayjs().diff(alert?.alert?.alertDateCreated, "days") >= alert?.alert?.alertDurationTime
                              ? alert?.alert?.alertDurationTime
                              : dayjs().diff(alert?.alert?.alertDateCreated, "days"))}
                          </MDTypography>
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
                          {alert.mainFilter?.flight.returnDate != null && (
                            <ListItemText
                              primary={<span style={{ fontSize: '16px' }}>{"Return: " + alert.mainFilter.flight.returnDate}</span>}
                            /> 
                          )}                       
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
                    {modalEditAlertContent(alert, cardAlertIndex)}
                  </div>
                )}
              </Card>
            </MDBox>
          </Grid>
        </Grid>    
      </MDBox>
      <Box sx={{ width: 500 }}>
        <Snackbar
          anchorOrigin={{ vertical, horizontal }}
          open={open}
          key={vertical + horizontal}
          autoHideDuration={2000}
          onClose={handleSnackBarClose}>     
          <Notification  onClose={handleSnackBarClose} severity="success" sx={{ width: '100%' }}>
            Flight Price Alert Saved!
          </Notification >
        </Snackbar>
      </Box>
      <Footer />
    </DashboardLayout>
  );
                   
}

export default Dashboard;
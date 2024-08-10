import { Card, CardHeader,  CardContent, styled, List } from '@mui/material';
import CardActions from '@mui/material/CardActions';
import Grid from "@mui/material/Grid";
import Button from '@mui/material/Button';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import AirplanemodeActiveIcon from '@mui/icons-material/AirplanemodeActive';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import CloseIcon from '@mui/icons-material/Close';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Modal from '@mui/material/Modal';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Autocomplete from "@mui/material/Autocomplete";
import Tooltip from "@mui/material/Tooltip";
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import { useLocation, useNavigate } from "react-router-dom";
import MDBox from "components/MDBox";
import MDButton from "components/MDButton";
import MDTypography from "components/MDTypography";
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { TimeField } from '@mui/x-date-pickers/TimeField';
import FormField from "components/FormField";
import selectData from "components/FormField/data/selectData";
import selectDataMapping from "components/FormField/data/selectDataMapping";
import AutoCompleteAirports  from "components/AutoCompleteAirports";
import dayjs from "dayjs";
import "dayjs/locale/en-gb";

import AuthService from "services/auth-service";
import FlightPriceAlertService from "../../services/flight-price-alert-service";
import { convertFlightRequest} from '../../services/convert-flight-price-alert-service';
import { getAttributeValue} from '../../services/convert-user-service';

import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import ReportsLineChart from "examples/Charts/LineCharts/ReportsLineChart";
import reportsLineChartData from "layouts/dashboard/data/reportsLineChartData";

import React, { useState, useEffect, useRef } from "react";

const Notification = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="standard" {...props} />;
});

function Dashboard() {

  const { sales } = reportsLineChartData;
  const userAttributes = JSON.parse(localStorage.getItem('userAttributes'));
  const userAttributesCount = userAttributes ? Object.keys(userAttributes).length : 0;
  const userId = getAttributeValue(userAttributes, 'sub');
  const [alerts, setAlerts] = useState([]);
  const airportRefTo = useRef(null);
  const airportRefFrom = useRef(null);
  const [submitAlertError, setSubmitAlertError] = useState(null);
  const navigate = useNavigate();

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
  const handleExpandCardClick = () => {setCardExpanded(!expandedAlertCard); };
  const handleExpandModalClick = () => {setModalExpanded(!expandedAlertModal); };
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
  const [cardAlertMenu, setCardAlertMenu] = useState(null);
  const [cardAlertIndex, setCardAlertIndex] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const formRef = useRef();

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
  const { vertical, horizontal, open, msg } = snackBarState;
  const handleSnackBarOpen = (newState) => {setSnackBarState({ ...newState, open: true });  };
  const handleSnackBarClose = () => { setSnackBarState({ ...snackBarState, open: false }); };

  const [snackBarErrorState, setSnackBarErrorState] = useState({
    openE: false,
    verticalE: 'top',
    horizontalE: 'center',
  });
  const { openE, verticalE, horizontalE, msgE } = snackBarErrorState;
  const handleSnackBarErrorOpen = (newState) => {  setSnackBarErrorState({ ...newState, openE: true });  };
  const handleSnackBarErrorClose = () => { setSnackBarErrorState({ ...snackBarErrorState, openE: false });  };

  const [openDialogConfirm, setOpenDialogConfirm] = useState(false);
  const [dialogConfirmAlertName, setDialogConfirmAlertName] = useState();
  const [dialogConfirmAction, setDialogConfirmAction] = useState();
  const [openDialogLetStart, setOpenDialogLetStart] = useState(false);
  const [openDialogActiveAlert, setOpenDialogActiveAlert] = useState(false);

  const handleDialogConfirmOpen = (event, action, alertId, alertName, alertDurationTime) => {   
    setFlightPriceAlertId(alertId);
    setDialogConfirmAction(action);
    setDialogConfirmAlertName(alertName);
    action === "Active" && alertDurationTime < 1 ? setOpenDialogActiveAlert(true) : setOpenDialogConfirm(true); setActiveAlertDurationTime(alertDurationTime);
  };

  const handleDialogConfirmClose = () => { setOpenDialogConfirm(false);   };
  const handleDialogLetStartClose = () => { setOpenDialogLetStart(false); };

  const handleDialogActiveAlertClose = () => {
    setOpenDialogActiveAlert(false);
    setActiveAlertDurationTime(null);
  };

  const handleDialogConfirmSubmit = () => {
    if (dialogConfirmAction === "Active"){
      const alertData = {
        alertDisabled: false,
        alertDurationTime: activeAlertDurationTime
      };
      activateAlertData(alertData);
    }
    if (dialogConfirmAction === "Disable"){
      const alertData = {
        alertDisabled: true
      };
      disableAlertData(alertData);
    }
    if (dialogConfirmAction === "Delete"){ deleteAlertData(flightPriceAlertId); }
    handleDialogConfirmClose();
  };

  const handleDialogConfirmUpdateUser = () => { navigate("/user-profile");}
 
  const getAlertsData = async () => {
    try {
      const response = await FlightPriceAlertService.findAllAlerts(userId);
      if (response.status === 200 && Array.isArray(response.data)) {
        setAlerts(response.data);
        console.info("Alerts fetched successfully", response.data);
      } else if  (response.status === 404) {
        handleSnackBarErrorOpen({ vertical: 'top', horizontal: 'center', msg: "No Alerts Found" });
        console.info("None Alert Found");
      }
    } catch (error) {
      if (error.response && error.response.data && error.response.data.message) { 
        handleSnackBarErrorOpen({ vertical: 'top', horizontal: 'center', msg: error.response.data.message });
      }
      else{ console.error("Error fetching alerts:", error);}     
    }
  };

  const getUpdatedProfile = async () => {
    try {
      let userData={
        AccessToken: localStorage.getItem("token"),
      }
      const response = await AuthService.getProfile(userData);
    
      if (response && response.status === 200) {
        if (response.data && response.data.UserAttributes) {
          const userAttributes = response.data.UserAttributes;
          localStorage.setItem('userAttributes', JSON.stringify(userAttributes));          
          localStorage.setItem("alert_time", getAttributeValue(userAttributes, 'custom:alert_time'));
          navigate("/dashboard");
        }       
      }
    } catch (error) {
      if (error.response && error.response.data && error.response.data.message) { 
        handleSnackBarErrorOpen({ vertical: 'top', horizontal: 'center', msg: error.response.data.message });
      }
      else{ console.error("Error fetching profile:", error);}     
    }
  };

  const createAlertData = async (alertData) => {
    try {
      const response = await FlightPriceAlertService.createAlert(alertData);
      if (response.status === 201) {
        closeModalEditAlert();
        handleSnackBarOpen({ vertical: 'top', horizontal: 'center', msg: 'Created' });
        getAlertsData();
        localStorage.setItem("alert_time", localStorage.getItem('alert_time') - alertData.alert.alertDurationTime);
      }
    } catch (error) {
        if (error.response && error.response.data && error.response.data.parameters && error.response.data.parameters.fieldErrors) {
          handleSnackBarErrorOpen({ vertical: 'top', horizontal: 'center', msgE: error.response.data.parameters.fieldErrors[0].field + " " + error.response.data.parameters.fieldErrors[0].message });
        }
        else if (error.response && error.response.data && error.response.data.message) { 
          handleSnackBarErrorOpen({ vertical: 'top', horizontal: 'center', msgE:  error.response.data.message });
        } else { console.error("Error creating alert", error); }
      }
  };

  const updateAlertData = async (flightPriceAlertId, alertData) => {
    try {
      const response = await FlightPriceAlertService.updateAlert(flightPriceAlertId, userId, alertData);
      if (response.status === 200) {
        closeModalEditAlert();
        handleSnackBarOpen({ vertical: 'top', horizontal: 'center', msg: 'Updated' });
        getUpdatedProfile();
      }
    } catch (error) {
        if (error.response && error.response.data && error.response.data.parameters && error.response.data.parameters.fieldErrors) {
          handleSnackBarErrorOpen({ vertical: 'top', horizontal: 'center', msgE: error.response.data.parameters.fieldErrors[0].field + " " + error.response.data.parameters.fieldErrors[0].message });
        }
        else if (error.response && error.response.data && error.response.data.message) { 
          handleSnackBarErrorOpen({ vertical: 'top', horizontal: 'center', msgE:  error.response.data.message });
        } else { console.error("Error updating alert", error); }
      }
  };

  const activateAlertData = async (alertData) => {
    try {
      const response = await FlightPriceAlertService.activateAlert(flightPriceAlertId, userId, alertData);
      if (response.status === 200) {
        handleSnackBarOpen({ vertical: 'top', horizontal: 'center', msg: 'Activated' });
        getAlertsData();
        getUpdatedProfile();
        handleDialogActiveAlertClose();
      }
    } catch (error) {
      if (error.response && error.response.data && error.response.data.parameters && error.response.data.parameters.fieldErrors) {
        handleSnackBarErrorOpen({ vertical: 'top', horizontal: 'center', msgE: error.response.data.parameters.fieldErrors[0].field + " " + error.response.data.parameters.fieldErrors[0].message });
        handleDialogConfirmClose();
      } else if (error.response && error.response.data && error.response.data.message){
        handleSnackBarErrorOpen({ vertical: 'top', horizontal: 'center', msgE:  error.response.data.message });
      }
      else { console.error("Error activating alert", error); }
    }
  };

  const disableAlertData = async (alertData) => {
    try {
      const response = await FlightPriceAlertService.disableAlert(flightPriceAlertId, userId, alertData);
      if (response.status === 200) {
        handleSnackBarOpen({ vertical: 'top', horizontal: 'center', msg: 'Disabled' });
        getAlertsData();
      } 
    } catch (error) {
      if (error.response && error.response.data && error.response.data.message) { 
        handleSnackBarErrorOpen({ vertical: 'top', horizontal: 'center', msgE:  error.response.data.message });
      }
      else { console.error("Error disabling alert", error); }
    }
  };

  const deleteAlertData = async (flightPriceAlertId) => {
    try {
      const response = await FlightPriceAlertService.deleteAlert(flightPriceAlertId, userId);
      if (response.status === 204) {
        handleSnackBarOpen({ vertical: 'top', horizontal: 'center', msg: 'Deleted' });
        getAlertsData();
        getUpdatedProfile();
      }
    } catch (error) {
      if (error.response && error.response.data && error.response.data.message) { 
        handleSnackBarErrorOpen({ vertical: 'top', horizontal: 'center', msgE:  error.response.data.message });
      }
      else { console.error("Error deleting alert", error); }
    }
  };

  useEffect(() => {
    getAlertsData();
    if (userAttributesCount < 10){ setOpenDialogConfirm(true); }   
  }, []);

  const [flightPriceAlertId, setFlightPriceAlertId] = useState(null);
  const [activeAlertDurationTime, setActiveAlertDurationTime] = useState(null);
  const [departDate, setDepartDate] = useState(null);
  const [isSubmitting, setSubmitting] = useState(false);

  const IconContainer = ({ backgroundColor, children }) => (
    <div
      style={{
        backgroundColor,
        borderRadius: '50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '40px', // Adjust the width and height as needed
        height: '40px',
      }}
    >
      {children}
    </div>
  );

  const [modalEditAlert, setModalEditAlert] = useState(null);
  const [alert, setAlert] = useState(null);
  
  const openModalEditAlert = (event) => { setModalEditAlert(event.currentTarget); };
      
  const closeModalEditAlert = () => {
    setModalEditAlert(null);
    setDepartDate(null);
    setFlightType(null);
    setSubmitAlertError(null);
    closeCardAlertMenu();
  }

  const modalEditAlertContent = (alert, index) => {
    const currentAlert = alerts[index];

    const handleSubmit = (event) => {
      event.preventDefault();
      const formData = new FormData(event.target);
      formData.append('userId', userId);
      formData.append('departDate', currentAlert?.mainFilter?.flight?.departDate ? dayjs(currentAlert.mainFilter.flight.departDate).format("YYYY-MM-DD") : dayjs(departDate).format("YYYY-MM-DD"));

      const alertData = {};
      formData.forEach((value, key) => {
        alertData[key] = value;
      });
      setFlightPriceAlertId(alertData.flightPriceAlertId);
      const requestPayload = convertFlightRequest(alertData);
  
      if (isEditing) { updateAlertData(alertData.flightPriceAlertId, requestPayload);  }   
      else{ createAlertData(requestPayload); }
    };

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
            <input type="hidden" name="flightPriceAlertId" value={currentAlert?.flightPriceAlertId}  readOnly/>  
            <Grid container spacing={3}>
              <Grid item xs={12} sm={4.5}>
                <FormField name="alertName" label="Flight Alert Name" placeholder="Bahamas 2024" 
                  defaultValue={(isEditing ? (currentAlert?.alert?.alertName || "").toString() : "")} required />                                   
              </Grid>
              <Grid item xs={12} sm={3}>
                <Autocomplete
                  defaultValue={(isEditing
                    ? (selectDataMapping.alertType[currentAlert?.alert?.alertType] || "").toString()
                    : "")}          
                  options={selectData.alertType}
                  renderInput={(params) => (
                    <FormField {...params} name="alerType" label="Alert Type"
                     InputLabelProps={{ shrink: true }} required/>                      
                  )}
                />
              </Grid>
              <Grid item xs={12} sm={2.5}>
                <Autocomplete
                  defaultValue={(isEditing
                    ? (selectDataMapping.priceType[currentAlert?.alert?.priceType] || "").toString()
                    : "")}          
                  options={selectData.priceType}
                  renderInput={(params) => (
                    <FormField {...params} name="priceType" label="Price Types"
                     InputLabelProps={{ shrink: true }} required/>                      
                  )}
                />
              </Grid>
              <Grid item xs={12} sm={2}>
                <FormField name="alertDurationTime"                   
                  label="Duration(Points)"
                  defaultValue={(isEditing
                    ? String(currentAlert?.alert?.alertDurationTime) || "0"
                    : "0")}            
                  max={localStorage.getItem('alert_time')}
                  InputLabelProps={{ shrink: true }} required />                                                                                        
              </Grid>
              <Grid item xs={12}>
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={2.5}>
                    <Autocomplete
                      defaultValue={(isEditing
                        ? (selectDataMapping.flightType[currentAlert?.mainFilter?.flight?.flightType] || '').toString()
                        : '')}
                      options={selectData.flightType}
                      onChange={(event, value) => setFlightType(value)}
                      renderInput={(params) => (
                        <FormField  {...params} name="flightType"      
                          label="Flight Type" InputLabelProps={{ shrink: true }} required                      
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
                        onChange={date => (isEditing
                          ?  currentAlert.mainFilter.flight.departDate = date: setDepartDate(date))}
                        slotProps={{
                        field: {required: true, clearable: true, onClear: () => setCleared(true) },
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
                        onChange={date => currentAlert.mainFilter.flight.returnDate = date}
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
                        ? (selectDataMapping.cabinClassType[currentAlert?.mainFilter?.cabinClassType] || 'Economy').toString()
                        : 'Economy')}
                      options={selectData.cabinClassType}
                      renderInput={(params) => (
                        <FormField
                          {...params}
                          name="cabinClassType"
                          label="Cabin Class"
                          InputLabelProps={{ shrink: true }} required                        
                        />
                      )}
                    />
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12}>
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={4.5}>
                    <AutoCompleteAirports 
                      ref={airportRefFrom}
                      name="aiportFrom"
                      label="Airpot From"
                      placeholder="GIG"
                      defaultValue={(isEditing
                          ? (currentAlert?.mainFilter?.flight?.airports[0]?.airportFrom || "").toString()
                          : "")}
                        required
                    />       
                  </Grid>
                  <Grid item xs={12} sm={4.5}>
                    <AutoCompleteAirports 
                      ref={airportRefTo}
                      name="aiportTo" 
                      label="Airpot To" 
                      placeholder="FLN" 
                      defaultValue={(isEditing
                        ? (currentAlert?.mainFilter?.flight?.airports[0]?.airportTo || "").toString()
                        : "")} required/>
                  </Grid>
                  <Grid item xs={12} sm={1.5}>
                    <Autocomplete
                        defaultValue={(isEditing
                          ? String(currentAlert?.mainFilter?.adults) || "1"
                          : "1")}
                        options={selectData.passagers}
                        renderInput={(params) => (
                          <FormField {...params} name="adults" label="Adults" InputLabelProps={{ shrink: true }}  required />
                    )}/>     
                  </Grid>
                  <Grid item xs={12} sm={1.5}>
                    <Autocomplete
                          defaultValue={(isEditing
                            ? String(currentAlert?.mainFilter?.children) || "0"
                            : "0")}
                          options={selectData.passagers}
                          renderInput={(params) => (
                            <FormField {...params} name="children" label="Children" InputLabelProps={{ shrink: true }}  required/>
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
                        defaultValue={(isEditing && currentAlert?.preferencesFilter && currentAlert?.preferencesFilter?.priceType === "Range"
                        ? (currentAlert.preferencesFilter.rangePrice?.rangeStart).toString()  || null
                        : null)} required={currentAlert?.preferencesFilter?.priceType === "Range"} />
                    </Grid>
                    <Grid item xs={12} sm={1.75}>
                      <FormField name="rangePriceEnd" label="$ Range End" placeholder="500" 
                      defaultValue={(isEditing && currentAlert?.preferencesFilter && currentAlert?.preferencesFilter?.priceType === "Range"
                        ? (currentAlert.preferencesFilter.rangePrice?.rangeEnd).toString() || null
                        : null)} required={currentAlert?.preferencesFilter?.priceType === "Range"} />        
                    </Grid>
                    <Grid item xs={12} sm={1.5}>
                      <Autocomplete
                        defaultValue={(isEditing && currentAlert?.preferencesFilter
                          ? String(currentAlert.preferencesFilter?.scalesQuantity) || null
                          : null)}
                        options={selectData.passagers}
                        renderInput={(params) => (
                          <FormField {...params} name="scalesQuantity" label="Scales" InputLabelProps={{ shrink: true }} 
                          disabled />
                      )}/>     
                    </Grid>
                    <Grid item xs={12} sm={3.5}>                  
                      <Tooltip title="End Date of the Departure Range. The first Departure Date is the Start of the Range." placement="bottom">
                        <div>
                          <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="en-gb">
                            <DatePicker name="departRangeDate" label="Depart Range Date" 
                              defaultValue={(isEditing && currentAlert?.preferencesFilter
                                ? dayjs(currentAlert.preferencesFilter.departRangeDate) || null
                                : null)}
                              disablePast
                              onChange={date => currentAlert.preferencesFilter.departRangeDate = date}
                              slotProps={{
                                field: { clearable: true, onClear: () => setCleared(true) },
                              }} disabled/> 
                          </LocalizationProvider>  
                        </div>
                      </Tooltip>                  
                    </Grid>
                    <Grid item xs={12} sm={3.5}>
                      <Tooltip title="End Date of the Return Range. The first Return Date is the Start of the Range." placement="bottom">
                        <div>
                          <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="en-gb">
                            <DatePicker name="returnRangeDate" label="Return Range Date" 
                              defaultValue={(isEditing && currentAlert?.preferencesFilter
                                ? dayjs(currentAlert.preferencesFilter.returnRangeDate) || null
                                : null)}
                              disablePast
                              value={flightType === 'One Way'? '' : null}
                              onChange={date => currentAlert.preferencesFilter.returnRangeDate = date}
                              slotProps={{
                                field: { clearable: true, onClear: () => setCleared(true) },
                              }} disabled/> 
                          </LocalizationProvider>  
                        </div>            
                      </Tooltip>
                    </Grid>
                    <Grid item xs={12}>
                      <Grid container spacing={3}>
                        <Grid item xs={12} sm={3}>
                          <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <TimeField name="departRangeTimeStart" label="Start Depart Range Time" format="HH:mm" 
                              defaultValue={(isEditing && currentAlert?.preferencesFilter
                                ? dayjs(currentAlert.preferencesFilter.departRangeTime?.rangeStart, "hh:mm") || null
                                : null)} disabled/>
                          </LocalizationProvider>              
                        </Grid>
                        <Grid item xs={12} sm={3}>
                          <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <TimeField name="departRangeTimeEnd" label="End Depart Range Time" format="HH:mm" 
                              defaultValue={(isEditing && currentAlert?.preferencesFilter
                                ? dayjs(currentAlert.preferencesFilter.departRangeTime?.rangeEnd, "hh:mm") || null
                                : null)} disabled/>
                          </LocalizationProvider>
                        </Grid>
                        <Grid item xs={12} sm={3}>
                          <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <TimeField name="returnRangeTimeStart" label="Start Return Range Time" format="HH:mm" 
                              defaultValue={(isEditing && currentAlert?.preferencesFilter
                                ? dayjs(currentAlert.preferencesFilter.returnRangeTime?.rangeStart, "hh:mm") || null
                                : null)} disabled/>
                          </LocalizationProvider>
                        </Grid>
                        <Grid item xs={12} sm={3}>
                          <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <TimeField name="returnRangeTimeEnd" label="End Return Range Time" format="HH:mm" 
                              defaultValue={(isEditing && currentAlert?.preferencesFilter
                                ? dayjs(currentAlert.preferencesFilter.returnRangeTime?.rangeEnd, "hh:mm") || null
                                : null)} disabled/> 
                          </LocalizationProvider>
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid item xs={12}>
                      <Grid container spacing={3}>
                        <Grid item xs={12} sm={3}>
                        <Autocomplete
                          defaultValue={(isEditing && currentAlert?.preferencesFilter
                            ? (selectDataMapping.paymentMethod[currentAlert.preferencesFilter.payment?.method]).toString() || null
                            : null)}
                          options={selectData.paymentMethod}
                          renderInput={(params) => (
                            <FormField {...params} name="paymentMethod" label="Payment Method" InputLabelProps={{ shrink: true }} 
                            disabled />
                          )}
                        />                
                        </Grid>
                        <Grid item xs={12} sm={1.5}>
                          <Autocomplete
                            defaultValue={(isEditing && currentAlert?.preferencesFilter
                              ? (currentAlert.preferencesFilter.payment?.parcels).toString() || null
                              : null)}
                            options={selectData.passagers}
                            renderInput={(params) => (
                              <FormField {...params} name="paymentParcels" label="Parcels" InputLabelProps={{ shrink: true }} 
                              disabled />
                          )}/> 
                        </Grid>
                        <Grid item xs={12} sm={3}>
                          <Autocomplete
                            defaultValue={(isEditing && currentAlert?.preferencesFilter
                              ? (selectDataMapping.otherPreferences[currentAlert.preferencesFilter.otherPreferences]).toString() || null
                              : null)}
                            options={selectData.otherPreferences}
                            renderInput={(params) => (
                              <FormField {...params} name="otherPreferences" label="Others Preferences" InputLabelProps={{ shrink: true }} 
                              disabled />
                            )}/> 
                        </Grid>
                        <Grid item xs={12} sm={1.5}>
                          <Autocomplete
                            defaultValue={(isEditing && currentAlert?.preferencesFilter
                              ? (currentAlert.preferencesFilter.airline).toString() || null
                              : null)}
                            options={selectData.airlines}
                            renderInput={(params) => (
                              <FormField {...params} name="airline" label="Airlines" InputLabelProps={{ shrink: true }} disabled />
                            )}/> 
                        </Grid>
                        <Grid item xs={12} sm={3}>
                          <Autocomplete
                            defaultValue={(isEditing && currentAlert?.preferencesFilter
                              ? (selectDataMapping.searchSites[currentAlert.preferencesFilter.searchSites]).toString() || null
                              : null)}
                            options={selectData.searchSites}
                            renderInput={(params) => (
                              <FormField {...params} name="searchSites" label="Search Motors" InputLabelProps={{ shrink: true }} 
                              disabled />
                            )}/> 
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                </MDBox>
              </Collapse>
            </Grid>
            <MDBox pb={1} px={1} display="flex" justifyContent="center" mb={1}>
              <Grid item xs={12}  >
                {submitAlertError && (
                  <MDTypography variant="caption" color="error" fontWeight="medium" >
                    {submitAlertError}
                  </MDTypography>
                )}
              </Grid>             
            </MDBox>
            <MDBox pb={3} px={3} display="flex" justifyContent="center" mb={3}>
              <Grid item xs={12}  >
                    <MDButton
                variant="gradient"
                color="info"
                type="submit"
                disabled={isSubmitting}
                onClick={(e) => {
                  e.preventDefault();
                  setSubmitting(true);
                  setTimeout(() => setSubmitting(false), 1000);
                  formRef.current.dispatchEvent(new Event('submit', { cancelable: true, bubbles: true }));
                }}>             
                  Save
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
        e.stopPropagation(); 
        openModalEditAlert(e);
        setIsEditing(true);
        }}>Edit </MenuItem>    
      {modalEditAlert && (
        <div>
          {modalEditAlertContent(alert, cardAlertIndex)}
        </div>
      )}
      { alerts[cardAlertIndex].alert.alertDisabled  ? 
        (
          <MenuItem onClick={(e) => {
            e.stopPropagation(); 
            handleDialogConfirmOpen(e, "Active", alerts[cardAlertIndex].flightPriceAlertId, alerts[cardAlertIndex].alert?.alertName, alerts[cardAlertIndex].alert?.alertDurationTime);
            closeCardAlertMenu();
            }}> Active</MenuItem>
        ) : (
          <MenuItem onClick={(e) => {
            e.stopPropagation(); 
            handleDialogConfirmOpen(e, "Disable", alerts[cardAlertIndex].flightPriceAlertId, alerts[cardAlertIndex].alert?.alertName, alerts[cardAlertIndex].alert?.alertDurationTime);
            closeCardAlertMenu();
            }}> Disable</MenuItem>
          )
      }
      <MenuItem onClick={(e) => {
        e.stopPropagation(); 
        handleDialogConfirmOpen(e, "Delete", alerts[cardAlertIndex].flightPriceAlertId, alerts[cardAlertIndex].alert?.alertName, alerts[cardAlertIndex].alert?.alertDurationTime);
        closeCardAlertMenu();
        }}> Delete</MenuItem>
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
                  avatar={alert?.alert?.alertDisabled ? 
                  <IconContainer backgroundColor="gray">
                    <AirplanemodeActiveIcon style={{ color: 'black' }} />
                  </IconContainer>
                  : 
                  <IconContainer backgroundColor="#4169e1">
                    <AirplanemodeActiveIcon style={{ color: 'white' }}/>
                  </IconContainer> }           
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
                  subheader=
                  {alert?.alert?.alertDisabled === false ? (
                    "Created: " + dayjs(alert?.alert?.alertDateCreated).format("DD/MM/YYYY HH:mm")                      
                    ) : <MDTypography variant="h6" color="primary">
                          {"Disabled: " + dayjs(alert?.alert?.alertDateDisabled).format("DD/MM/YYYY HH:mm")}
                        </MDTypography>                  
                  }
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
                    <List>
                      <ListItem disablePadding >
                          <ListItemText >
                            <MDTypography variant="h6">{"Price: " + alert?.alert?.priceType}</MDTypography>
                          </ListItemText>     
                          <ListItemText >
                            <MDTypography variant="h6">{"Type: " + selectDataMapping.alertType[alert?.alert?.alertType]}</MDTypography>
                          </ListItemText>                        
                      </ListItem>
                      <ListItem disablePadding>
                        <ListItemText>
                          <MDTypography variant="h6">{"Duration: " + alert?.alert?.alertDurationTime}</MDTypography>
                        </ListItemText>
                        <ListItemText>
                          <MDTypography variant="h6">{"Duration Used: " + (alert?.alert?.alertDurationTimeCreated - alert?.alert?.alertDurationTime)}</MDTypography>    
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
                        <ListItemText primary={<span style={{ fontSize: '16px'}}>{"Cabin Class: " + selectDataMapping.cabinClassType[alert.mainFilter?.cabinClassType]}</span>} />
                        </div>
                      </ListItem>
                      <ListItem disablePadding>
                        <div style={{ display: 'flex', justifyContent: 'space-between', margin: '10px' }}>
                          <ListItemText primary={<span style={{ fontSize: '16px', marginRight: '8px' }}>{"Flight: " + selectDataMapping.flightType[alert.mainFilter?.flight?.flightType]}</span>} />
                          <ListItemText primary={<span style={{ fontSize: '16px', marginRight: '8px' }}>{"Depart: " + alert.mainFilter?.flight.departDate}</span>} />
                          {alert.mainFilter?.flight?.returnDate != null && (
                            <ListItemText
                              primary={<span style={{ fontSize: '16px' }}>{"Return: " + alert.mainFilter.flight.returnDate}</span>}/>        
                          )}
                        </div>
                      </ListItem>
                      <ListItem disablePadding>
                        <div style={{ display: 'flex', justifyContent: 'space-between', margin: '10px' }}>
                          <ListItemText primary={<span style={{ fontSize: '16px', marginRight: '15px' }}>{"From: " + (alert.mainFilter?.flight.airports[0].airportFrom || "N/A")}</span>} />
                          <ListItemText primary={<span style={{ fontSize: '16px', marginRight: '15px'  }}>{"To: " + (alert.mainFilter?.flight.airports[0].airportTo || "N/A")}</span>} />
                          {alert.mainFilter?.flight?.airports[0]?.airportScales != null && (
                            <ListItemText primary={<span style={{ fontSize: '16px'  }}>{"Scales: " + (alert.mainFilter.flight.airports[0].airportScales || "N/A")}</span>} />
                          )}
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
                  disabled={userAttributesCount < 10} >                          
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
      <MDBox sx={{ width: 500 }}>
        <Snackbar
          anchorOrigin={{ vertical, horizontal }}
          open={open}
          key={vertical + horizontal}
          autoHideDuration={4000}
          onClose={handleSnackBarClose}
          disableScrollLock={ true }>     
          <Notification  onClose={handleSnackBarClose} severity="success" sx={{ width: '100%' }}>
            Flight Price Alert {msg} Successfully!
          </Notification >
        </Snackbar>
      </MDBox>
      <MDBox sx={{ width: 500 }}>
        <Snackbar
          anchorOrigin={{ vertical, horizontal }}
          open={openE}
          key={verticalE + horizontalE}
          autoHideDuration={5000}
          onClose={handleSnackBarErrorClose}
          disableScrollLock={ true }>     
          <Notification onClose={handleSnackBarErrorClose} severity="error" sx={{ width: '100%' }}>
            {msgE}
          </Notification >
        </Snackbar>
      </MDBox>
      <Dialog
        open={openDialogConfirm}
        onClose={handleDialogConfirmClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        disableScrollLock={ true } >             
        <DialogTitle id="alert-dialog-title">
          {"Are you sure ?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            You're about to{' '}
            <Typography component="span" variant="inherit" color="primary">
              {dialogConfirmAction}
            </Typography>{' '}
            the Alert{' '}
            <Typography component="span" variant="inherit" color="primary">
              {dialogConfirmAlertName}
            </Typography>. 
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogConfirmClose}> Disagree </Button>
          <Button onClick={handleDialogConfirmSubmit} autoFocus> Agree </Button>        
        </DialogActions>
      </Dialog>
      <Dialog
        open={openDialogLetStart}
        onClose={handleDialogConfirmClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        disableScrollLock={ true } >             
        <DialogTitle id="alert-dialog-title">
          {"Let's get started!"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Before we start, please update your user profile for better accuracy when you create your Alerts.
            <br/>
            <br/>
            <Typography component="span" variant="inherit" color="info">
              <b>To use Ittent in Telegram:</b>
              </Typography>
              <br/>
              <br/>
              In Telegram look for "Ittent" or "@ittent_bot" and chat /username (To get your Telegram Username) and /chatId (To get your Telegram ChatId).
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogLetStartClose}> Disagree </Button>
          <Button onClick={handleDialogConfirmUpdateUser} autoFocus> Agree </Button>        
        </DialogActions>
      </Dialog>
      <Dialog
        open={openDialogActiveAlert}
        onClose={handleDialogConfirmClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        disableScrollLock={ true } >             
        <DialogTitle id="alert-dialog-title">
          {"Before active your Alert"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            You have to add Alert Time.
            <br/>
            <Typography component="span" variant="inherit" color="info">
              <b>To use your Account Alert Time, please type here:</b>
              </Typography>
              <br/>
              <Grid item xs={12} sm={2}>
                <FormField name="activeAlertDurationTime"                   
                  label="Duration(Points)"
                  defaultValue={(localStorage.getItem('alert_time')
                    ? localStorage.getItem('alert_time') : "0")}                           
                  onChange={(e) => setActiveAlertDurationTime(e.target.value)}                                                                                        
                  max={localStorage.getItem('alert_time')}
                  InputLabelProps={{ shrink: true }} required />                                                                                        
              </Grid>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogActiveAlertClose}> Disagree </Button>
          <Button onClick={handleDialogConfirmSubmit} autoFocus> Confirm </Button>        
        </DialogActions>
      </Dialog>
      
      <Footer />
    </DashboardLayout>
  );
                   
}
export default Dashboard;
import React, { useState, useEffect, useRef, useContext } from "react";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";
import Grid from "@mui/material/Grid";
import Snackbar from '@mui/material/Snackbar';
import FormField from "components/FormField";
import MDInput from "components/MDInput";
import MuiAlert from '@mui/material/Alert';
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import Tooltip from "@mui/material/Tooltip";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useLocation, useNavigate } from "react-router-dom";
import FlightPriceAlertService from "../../services/flight-price-alert-service";
import { getAttributeValue} from '../../services/convert-user-service'; 
import CheckIcon from "@mui/icons-material/Check";
import { Card, CardHeader, CardContent, CardActions, Typography } from "@mui/material";


import { convertUserUpdateRequest, convertUserResponse, convertGetVerificationCodeRequest, convertVerifyCodeRequest } from '../../services/convert-user-service';
import AuthService from "../../services/auth-service";
import AutoCompleteCountries  from "components/AutoCompleteCountries";
import AutoCompleteCurrencies  from "components/AutoCompleteCurrencies";
import AutoCompleteLanguages from "components/AutoCompleteLanguages";
import { AuthContext } from "context";

const Notification = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="standard" {...props} />;
});

const PlanSelection = () => {
  
  const [selectedPlan, setSelectedPlan] = useState("");
  const userAttributes = JSON.parse(localStorage.getItem('userAttributes'));
  const userId = getAttributeValue(userAttributes, 'sub');
  const [snackBarState, setSnackBarState] = useState({
    open: false,
    vertical: 'top',
    horizontal: 'center',
  });
  const { vertical, horizontal, open, msg } = snackBarState;
  const handleSnackBarOpen = (newState) => {
    setSnackBarState({ ...newState, open: true });
  };
  const handleSnackBarClose = () => {
    setSnackBarState({ ...snackBarState, open: false });
  };
  const [snackBarErrorState, setSnackBarErrorState] = useState({
    openE: false,
    verticalE: 'top',
    horizontalE: 'center',
  });
  const { openE, verticalE, horizontalE, msgE } = snackBarErrorState;
  const handleSnackBarErrorOpen = (newState) => {  setSnackBarErrorState({ ...newState, openE: true });  };
  const handleSnackBarErrorClose = () => { setSnackBarErrorState({ ...snackBarErrorState, openE: false });  };


  const [snackBarMessage, setSnackBarMessage] = useState(null);
  const countryRef = useRef(null);
  const currencyRef = useRef(null);
  const phoneFormat = /^\+(?:[0-9] ?){7,25}[0-9]$/;
  const [errors, setErrors] = useState({});
  const authContext = useContext(AuthContext);
  const navigate = useNavigate();

  
  const submitConfirmSelection = (planSelected) => {
      const planPayload = {
        plan: planSelected
      };
      selectPlan(planPayload);
  };

  const selectPlan = async (planPayload) => {
    try {
      const response = await FlightPriceAlertService.selectPlan(userId, planPayload);
      if (response.status === 200) {
        handleSnackBarOpen({ vertical: 'top', horizontal: 'center', msg: 'Activated' });
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

  const plans = [
    {
      name: "500 Balance",
      price: "R$ 9,90",
      features: ["Alert for 10 days", "SMS", "Telegram", "Email"],
    },
    {
      name: "1000 Balance",
      price: "R$ 17,90",
      features: ["Alert for 21 days","SMS", "Telegram", "Email"],
    },
    {
      name: "3000 Balance",
      price: "R$ 49.90",
      features: ["Alert for 63 days" ,"SMS", "Telegram", "Email"],
    },
  ]

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox mb={2}>
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "16px" }}>
      <Typography variant="h4" align="center" gutterBottom>
        Choose One:
      </Typography>
      <Grid container spacing={4}>
        {plans.map((plan) => (
          <Grid item xs={12} md={4} key={plan.name}>
            <Card
              style={{
                border: selectedPlan === plan.name ? "2px solid #3f51b5" : "1px solid #ccc",
                position: "relative",
                minHeight: "380px", // Ensures a consistent minimum height
                maxHeight: "380px", // Prevents cards from growing too tall
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between", // Ensures content and button are spaced properly

              }}
            >
              <CardHeader
                title={plan.name}
                titleTypographyProps={{ variant: "h6" }}
              />
              <CardContent style={{ flexGrow: 1, overflow: "hidden" }}>
                <Typography variant="h5" color="textPrimary" gutterBottom>
                  {plan.price}
                </Typography>
                <ul style={{ paddingLeft: "16px" }}>
                  {plan.features.map((feature) => (
                    <li key={feature} style={{ display: "flex", alignItems: "center", marginBottom: "8px" }}>
                      <CheckIcon style={{ color: "green", marginRight: "8px" }} />
                      {feature}
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardActions>
                <MDButton 
                  fullWidth
                  variant="contained"
                  color="info"
                  onClick={() => setSelectedPlan(plan.name)}
                >
                  Select {plan.name}
                </MDButton>
              </CardActions>
              {selectedPlan === plan.name && (
                <CheckIcon
                  style={{
                    position: "absolute",
                    top: "8px",
                    right: "8px",
                    color: "#3f51b5",
                  }}
                />
              )}
            </Card>
          </Grid>
        ))}
      </Grid>
      <div style={{ textAlign: "center", marginTop: "24px" }}>
        <MDButton
          variant="contained"
          color="primary"
          size="large"
          disabled={!selectedPlan}
          onClick={() => submitConfirmSelection(selectedPlan)}
        >
          Confirm Selection
        </MDButton>
      </div>
    </div>
    </MDBox>
    <MDBox sx={{ width: 500 }}>
        <Snackbar
          anchorOrigin={{ vertical, horizontal }}
          open={open}
          key={vertical + horizontal}
          autoHideDuration={4000}
          onClose={handleSnackBarClose}
          disablescrolllock="true">     
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
          disablescrolllock="true">     
          <Notification onClose={handleSnackBarErrorClose} severity="error" sx={{ width: '100%' }}>
            {msgE}
          </Notification >
        </Snackbar>
      </MDBox>       
    </DashboardLayout>
  );
};

export default PlanSelection;

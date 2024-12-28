import React, { useState, useEffect, useRef, useContext } from "react";
import MDBox from "components/MDBox";
import MDButton from "components/MDButton";
import Grid from "@mui/material/Grid";
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import { useLocation } from "react-router-dom";
import FlightPriceAlertService from "../../services/flight-price-alert-service";
import { convertSelectPlanRequest} from '../../services/convert-flight-price-alert-service';
import { getAttributeValue} from '../../services/convert-user-service'; 
import CheckIcon from "@mui/icons-material/Check";
import { Card, CardHeader, CardContent, CardActions, Typography } from "@mui/material";

const Notification = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="standard" {...props} />;
});

const PlanSelection = () => {
  
  const [selectedPlan, setSelectedPlan] = useState("");
  const userAttributes = JSON.parse(localStorage.getItem('userAttributes'));
  const userId = getAttributeValue(userAttributes, 'sub');
  const location = useLocation();
  const [snackBarState, setSnackBarState] = useState({
    open: false,
    vertical: 'top',
    horizontal: 'center',
  });
  const { vertical, horizontal, open, msg, color } = snackBarState;
  const handleSnackBarOpen = (newState) => {
    setSnackBarState({ ...newState, open: true });
  };
  const handleSnackBarClose = () => {
    setSnackBarState({ ...snackBarState, open: false });
  };

  useEffect(() => {
      const queryParams = new URLSearchParams(location.search);
      const status = queryParams.get("status");
      if (status === "success") {
        handleSnackBarOpen({ vertical: 'top', horizontal: 'center', msg: 'Payment successful! Balance added!', color: 'success' });
      } else if (status === "failure") {
        handleSnackBarOpen({ vertical: 'top', horizontal: 'center', msg: 'Payment failed! Please try another payment method or contact support: ittent.flightalert@gmail.com', color: 'error' });
      } else if (status === "pending") {
        handleSnackBarOpen({ vertical: 'top', horizontal: 'center', msg: 'Payment pending! Please wait some minutes or contact support: ittent.flightalert@gmail.com', color: 'info' });
      }
      getUserData();
  }, [location]);

  const submitConfirmSelection = (planSelected) => {
      const planPayload = {
        userId: userId,
        email: getAttributeValue(userAttributes, 'email'),
        plan: planSelected
      };
      selectPlan(convertSelectPlanRequest(planPayload));
  };

  const selectPlan = async (planPayload) => {
    try {
      const response = await FlightPriceAlertService.selectPlan(userId, planPayload);
      if (response.status === 201) {
        console.info("response: ", response);
        window.location.href = response.data.redirectUrl;
      }
    } catch (error) {
      if (error.response && error.response.data && error.response.data.parameters && error.response.data.parameters.fieldErrors) {
        handleSnackBarOpen({ vertical: 'top', horizontal: 'center', msgE: error.response.data.parameters.fieldErrors[0].field + " " + error.response.data.parameters.fieldErrors[0].message, color: 'error' });
      } else if (error.response && error.response.data && error.response.data.message){
        handleSnackBarOpen({ vertical: 'top', horizontal: 'center', msgE:  error.response.data.message, color: 'error' });
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

  const getUserData = async () => {
    try {
      let userData={
        AccessToken: localStorage.getItem("token"),
      }
      const response = await AuthService.getProfile(userData);
      if (response.status === 200 && response.data) {
        setErrors(null);
        setUser(convertUserResponse(response.data));
        if (response.data.UserAttributes) {
          const userAttributes = response.data.UserAttributes;
          localStorage.setItem('userAttributes', JSON.stringify(userAttributes));          
          localStorage.setItem("alert_time", getAttributeValue(userAttributes, 'custom:alert_time'));
        }    
      } 
    } catch (error) {
      if (error.response && error.response.data && error.response.data.message) { 
        console.error(error.response.data.message);
        if (error.response.data.message == "Access Token has expired") {
          authContext.logout();
        }
        else {
          console.error("Error fetching user");
        }
      } 
    }
  };

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
                minHeight: "380px", 
                maxHeight: "380px", 
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between", 

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
          autoHideDuration={30000}
          onClose={handleSnackBarClose}
          disablescrolllock="true">     
          <Notification  onClose={handleSnackBarClose} severity={color} sx={{ width: '100%' }}>
            {msg}
          </Notification >
        </Snackbar>
      </MDBox>
    </DashboardLayout>
  );
};

export default PlanSelection;

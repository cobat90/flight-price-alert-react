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

"use client";

import { Button } from "@mui/material";
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
  const [selectedPlan, setSelectedPlan] = useState("")

  const [user, setUser] = useState(null);
  const [snackBarState, setSnackBarState] = useState({
    open: false,
    vertical: 'top',
    horizontal: 'center',
  });
  const { vertical, horizontal, open } = snackBarState;
  const [snackBarMessage, setSnackBarMessage] = useState(null);
  const countryRef = useRef(null);
  const currencyRef = useRef(null);
  const langKeyRef = useRef(null);
  const phoneFormat = /^\+(?:[0-9] ?){7,25}[0-9]$/;
  const phoneNumberRef = useRef(null);
  const [errors, setErrors] = useState({});
  const authContext = useContext(AuthContext);
  const navigate = useNavigate();
  const [openDialogConfirm, setOpenDialogConfirm] = useState(false);
  const verificationCodeRef = useRef(null);

  const handleDialogConfirmClose = () => {
    setOpenDialogConfirm(false);
  };

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

  useEffect(() => {
    setErrors(null);
    getUserData();
  }, []);

  const handleSnackBarOpen = (newState) => {
    setSnackBarState({ ...newState, open: true });
  };

  const handleSnackBarClose = () => {
    setSnackBarState({ ...snackBarState, open: false });
  };

  const formRef = useRef();

  const handleClearForm = () => {
    const inputs =  formRef.current.querySelectorAll('input');
    inputs.forEach((input) => {
      input.value = '';
    });   
  };

  const handleSubmit = (event) => {
    event.preventDefault(); 
    const formData = new FormData(event.target); 
    formData.append('userId', user.userId);
    let userData = {};
    let validationErrors = {};
  
    formData.forEach((value, key) => {
      userData[key] = value;
  
      if (key === 'country' && value.length > 2) {
        validationErrors[key] = 'Country must be 2 characters';
      }
      if (key === 'langKey' && value.length > 2) {
        validationErrors[key] = 'Language must be 2 characters';
      }
      if (key === 'currency' && value.length > 3) {
        validationErrors[key] = 'Currency must be 3 characters';
      }
      if (key === 'phoneNumber' && value.trim().length > 0) {
        if (value.trim().length === 0 || !value.trim().match(phoneFormat)) {
          validationErrors[key] = 'Invalid Phone Number, example: +99 99 99999 9999';
        }
      }
    });
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    updateUserData(convertUserUpdateRequest(userData));
  };

  const plans = [
    {
      name: "Simple",
      price: "R$ 9,90",
      features: ["500 Alert Balance (10 days)", "SMS", "Telegram", "Email"],
    },
    {
      name: "Advanced",
      price: "R$ 17,90",
      features: ["1000 Alert Balance (20 days)","SMS", "Telegram", "Email"],
    },
    {
      name: "Ultra",
      price: "R$ 29.90",
      features: ["3000 Alert Balance (40 days)","SMS", "Telegram", "Email"],
    },
  ]

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox mb={2}>
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "16px" }}>
      <Typography variant="h4" align="center" gutterBottom>
        Choose Your Plan
      </Typography>
      <Grid container spacing={4}>
        {plans.map((plan) => (
          <Grid item xs={12} md={4} key={plan.name}>
            <Card
              style={{
                border: selectedPlan === plan.name ? "2px solid #3f51b5" : "1px solid #ccc",
                position: "relative",
              }}
            >
              <CardHeader
                title={plan.name}
                titleTypographyProps={{ variant: "h6" }}
              />
              <CardContent>
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
          onClick={() => alert(`You selected the ${selectedPlan} plan!`)}
        >
          Confirm Selection
        </MDButton>
      </div>
    </div>
    </MDBox>
            
    </DashboardLayout>
  );
};

export default PlanSelection;

import React, { useState, useEffect, useRef, useContext } from "react";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import Snackbar from '@mui/material/Snackbar';
import FormField from "components/FormField";
import MuiAlert from '@mui/material/Alert';
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import { useLocation, useNavigate } from "react-router-dom";

import { convertUserUpdateRequest, convertUserResponse } from '../../services/convert-user-service';
import AuthService from "../../services/auth-service";
import AutoCompleteCountries  from "components/AutoCompleteCountries";
import AutoCompleteCurrencies  from "components/AutoCompleteCurrencies";
import AutoCompleteLanguages from "components/AutoCompleteLanguages";
import { AuthContext } from "context";

const Notification = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="standard" {...props} />;
});

const UserProfile = () => {
  const [user, setUser] = useState(null);
  const [snackBarState, setSnackBarState] = useState({
    open: false,
    vertical: 'top',
    horizontal: 'center',
  });
  const { vertical, horizontal, open } = snackBarState;
  const countryRef = useRef(null);
  const currencyRef = useRef(null);
  const langKeyRef = useRef(null);
  const [errors, setErrors] = useState({});
  const authContext = useContext(AuthContext);
  const navigate = useNavigate();

  const [openDialogConfirm, setOpenDialogConfirm] = useState(false);

  const handleDialogConfirmOpen = () => {   
    setOpenDialogConfirm(true);
  };

  const handleDialogConfirmClose = () => {
    setOpenDialogConfirm(false);
  };

  const handleResendConfirmationCode = () => {
    let userData = {
      email: localStorage.getItem("login"),
    }
    resendConfirmationCodeForUserEmail(convertResendConfirmationCode(userData));
  };

  const openOneMinuteTimer = () => {
    const interval = setInterval(() => {
      setResendTimer(prevTimer => {
        if (prevTimer === 0) {
          clearInterval(interval);
          return prevTimer;
        }
        return prevTimer - 1;
      });

    }, 1000);
  };

  const getUserData = async () => {
    try {
      let userData={
        AccessToken: localStorage.getItem("token"),
      }
      const response = await AuthService.getProfile(userData);
      if (response.status === 200 && response.data) {
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
      } else {
        console.error("Error fetching user");
      }
    }
  };

  const updateUserData = async (userData) => {
    try {
      const response = await AuthService.updateProfile(userData);
      if (response.status === 200) {
        handleSnackBarOpen({ vertical: 'top', horizontal: 'center' });
        getUserData();
      } else {
        console.error("Invalid data format in response:", response);
        setErrors("Invalid data format in response");
      }
    } catch (error) {
      if (error.response && error.response.data && error.response.data.message) { 
        if (error.response.data.message == "Access Token has expired") {
          localStorage.removeItem("token");
          navigate("/auth/login");
        }
        else{
          setErrors(error.response.data.message);
        }
      } else {
        console.error("Error fetching user");
      }
    }
  };

  useEffect(() => {
    getUserData();
    setErrors(null);
  }, []);

  const changeHandler = (e) => {
    setUser({
      ...user,
      email: e.target.value,
    });
  };

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
        validationErrors[key] = 'Country must be less than 2 characters';
      }
      if (key === 'langKey' && value.length > 2) {
        validationErrors[key] = 'Language must be less than 2 characters';
      }
      if (key === 'currency' && value.length > 3) {
        validationErrors[key] = 'Currency must be less than 3 characters';
      }

    });
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    const requestPayload = convertUserUpdateRequest(userData);
    updateUserData(requestPayload);
  
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox mb={2} />
      {user ? (  
        <Card id="profile-info" sx={{ overflow: "visible" }}>
          <MDBox p={3}>
            <MDTypography variant="h5">Profile Info</MDTypography>
          </MDBox>
          <MDBox component="form" pb={3} px={3} ref={formRef} onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <FormField name="firstName"  defaultValue={(user?.firstName ? (user.firstName || "").toString() : "")}
                  label="First Name" placeholder="Fernando" inputProps={{ type: "text" }} required/>
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormField name="lastName"  defaultValue={(user?.lastName ? (user.lastName || "").toString() : "")}
                label="Last Name" placeholder="Silva" inputProps={{ type: "text" }}/>
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormField name="login" defaultValue={(user?.login ? (user.login || "").toString() : "")}
                  label="Login"
                  placeholder="User"
                  inputProps={{ type: "text" }}
                  disabled
                />
              </Grid>
              <Grid item xs={12} sm={6}>
              <AutoCompleteCountries
                  ref={countryRef}
                  name="country"
                  label="Country"
                  placeholder="BR"
                  inputProps={{ type: "text" }}
                  defaultValue={(user?.country ? (user.country || "").toString() : "")}
                  required
                />       
              </Grid>
              <Grid item xs={12} md={6}>
              <AutoCompleteCurrencies
                  ref={currencyRef}
                  name="currency"
                  label="Currency"
                  placeholder="BRL"
                  inputProps={{ type: "text" }}
                  defaultValue={(user?.currency ? (user.currency || "").toString() : "")}
                  required
                />       
              </Grid>
              <Grid item xs={12} md={6}>
                <AutoCompleteLanguages
                    ref={langKeyRef}
                    name="langKey"
                    label="Language"
                    placeholder="PT"
                    inputProps={{ type: "text" }}
                    defaultValue={(user?.langKey ? (user.langKey || "").toString() : "")}
                    required
                  />       
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormField name="phoneNumber" defaultValue={(user?.phoneNumber ? (user.phoneNumber || "").toString() : "")}
                  label="Phone Number"
                  placeholder="+55 99765 4646"
                  inputProps={{ type: "text" }}
                  required
                />
                <Tooltip title="For receving notifications by SMS, it's necessary to validate your phone number" placement="bottom">
                  <Grid item xs={12} md={6}>
                    <MDButton
                      variant="gradient"
                      color="info"
                      type="button"
                      onClick={openDialogConfirm}>                  
                      Verify
                    </MDButton>
                  </Grid>    
                </Tooltip>
              </Grid>
              <Grid item xs={12} md={6}>
                <FormField name="telegramUserName" defaultValue={(user?.telegramUserName ? (user.telegramUserName || "").toString() : "")}
                label="Telegram UserName" placeholder="telegramUsername" inputProps={{ type: "text" }} required/>
              </Grid>
              <Grid item xs={12} md={6}>
                <FormField name="telegramChatId" defaultValue={(user?.telegramChatId ? (user.telegramChatId || "").toString() : "")}
                label="Telegram ChatId" placeholder="123456" inputProps={{ type: "text" }} required/>
              </Grid>
              <Grid item xs={12}>
                {errors && Object.keys(errors).length > 0 && (
                  Object.keys(errors).map((key) => (
                    <Grid item xs={12} key={key}>
                      <MDTypography variant="caption" color="error" fontWeight="medium">
                        {errors[key]}
                      </MDTypography>
                    </Grid>
                  ))
                )}
              </Grid>
              <Grid item xs={12} md={6}>
                <MDButton
                  variant="gradient"
                  color="info"
                  type="submit"
                  >                   
                  Save
                  </MDButton>
              </Grid>    
              <Grid item xs={12} md={6}>
                <MDButton
                  variant="gradient"
                  color="info"
                  type="button"
                  onClick={handleClearForm}>                  
                  Clear
                </MDButton>
              </Grid>    
            </Grid>
          </MDBox>
        </Card>
        ) : (
        null    
      )}
      <MDBox sx={{ width: 500 }}>
        <Snackbar
          anchorOrigin={{ vertical, horizontal }}
          open={open}
          key={vertical + horizontal}
          autoHideDuration={2000}
          onClose={handleSnackBarClose}
          disablescrolllock="true">     
          <Notification  onClose={handleSnackBarClose} severity="success" sx={{ width: '100%' }}>
            User Profile Saved!
          </Notification >
        </Snackbar>
      </MDBox>
      <Footer />
      <Dialog
        open={openDialogConfirm}
        onClose={handleDialogConfirmClose}
        aria-labelledby="verify-dialog-title"
        aria-describedby="verify-dialog-description"
        disableScrollLock={true}
      >
        <DialogTitle id="verify-dialog-title">
          {"Check your phone"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="verify-dialog-description">
            An SMS was sent for verify your phone number. Wait here until you receive it.
          </DialogContentText>
          {resendTimer > 0 && (
            <DialogContentText id="resend-timer">
              To resend the SMS, please wait <b>{resendTimer}</b> seconds.
            </DialogContentText>
          )}
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              handleResendConfirmationCode();
              setResendTimer(60);
            }}
            disabled={resendTimer > 0}
          >
            Resend
          </Button>
          <Button
            onClick={handleDialogConfirmClose}
          >
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </DashboardLayout>
  );
};

export default UserProfile;

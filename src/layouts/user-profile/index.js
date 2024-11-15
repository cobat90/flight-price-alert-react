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
import Tooltip from "@mui/material/Tooltip";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import { useLocation, useNavigate } from "react-router-dom";

import { convertUserUpdateRequest, convertUserResponse, convertGetVerificationCodeRequest, convertVerifyCodeRequest } from '../../services/convert-user-service';
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
    message: '',
  });
  const { vertical, horizontal, open, message } = snackBarState;
  const countryRef = useRef(null);
  const currencyRef = useRef(null);
  const langKeyRef = useRef(null);
  const phoneFormat = /^\+(?:[0-9] ?){7,25}[0-9]$/;
  const [errors, setErrors] = useState({});
  const authContext = useContext(AuthContext);
  const navigate = useNavigate();
  const [openDialogConfirm, setOpenDialogConfirm] = useState(false);
  const verificationCodeRef = useRef(null);

  const handleDialogConfirmClose = () => {
    setOpenDialogConfirm(false);
    verificationCodeRef.current.value = null;
  };

  const [resendTimer, setResendTimer] = useState(null);
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

  const handleGetVerificationCode = (attribute) => {
    if (userData.phoneNumber){
        if (userData.phoneNumber.trim().length === 0 || !userData.phoneNumber.trim().match(phoneFormat)) {
          setErrors({ ...errors, phoneNumberError: true });
          return;
        }
      }
    getVerificationCode(convertGetVerificationCodeRequest(attribute));
  };

  const getVerificationCode = async (userData) => {
    try {
      const response = await AuthService.getUserAttributeVerificationCode(userData);
      if (response.status === 200) {
        setResendTimer(60);
        openOneMinuteTimer();
      } 
    } catch (error) {
      if (error.response && error.response.data && error.response.data.message) { 
        setErrors({ ...errors, error: true, errorText: error.response.data.message });
      } else {
        console.error("Error Get Verification Code");
      }
    }
  }

  const handleVerifyCode = (attribute, code) => {
    verifyCode(convertVerifyCodeRequest(attribute, code));
  };

  const verifyCode = async (userData) => {
    try {
      const response = await AuthService.verifyUserAttribute(userData);
      if (response.status === 200) {
        handleSnackBarOpen({ vertical: 'top', horizontal: 'center', message: 'Phone Number Verified!' });
      } 
    } catch (error) {
      if (error.response && error.response.data && error.response.data.message) { 
        setErrors({ ...errors, error: true, errorText: error.response.data.message });
      } else {
        console.error("Error Verifying Code");
      }
    }
  }

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
        handleSnackBarOpen({ vertical: 'top', horizontal: 'center', message: 'User Profile Saved!' });
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

  const handleSnackBarOpen = (newState, message) => {
    setSnackBarState({ ...newState, message, open: true });
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
          <MDBox p={3}>
            <Grid container spacing={3}>
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
              </Grid>
              </MDBox>
              <MDBox>
                <MDTypography variant="h6">SMS Notifications</MDTypography>
              </MDBox>
              <MDBox p={3}>
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={6}>
                    <FormField name="phoneNumber" defaultValue={(user?.phoneNumber ? (user.phoneNumber || "").toString() : "")}
                      label="Phone Number"
                      placeholder="+55 99765 4646"
                      inputProps={{ type: "text" }}
                      required
                    />
                    </Grid>
                    <Tooltip title="For receving notifications by SMS, it's necessary to validate your Phone Number." placement="bottom">
                      <Grid item xs={12} md={2}>
                        <MDButton
                          variant="gradient"
                          color="error"
                          type="button"
                          onClick={() => {
                            handleGetVerificationCode("phone_number");
                            setResendTimer(60);
                          }}
                          disabled={resendTimer > 0}>                  
                          Verify
                        </MDButton>
                      </Grid>    
                    </Tooltip>
                  </Grid>
              </MDBox>
              <MDBox>
                <MDTypography variant="h6">Telegram Notifications</MDTypography>
              </MDBox>
              <MDBox p={3}>
                <Grid container spacing={3}>
                  <Grid item xs={12} md={6}>
                    <FormField name="telegramUserName" defaultValue={(user?.telegramUserName ? (user.telegramUserName || "").toString() : "")}
                    label="Telegram UserName" placeholder="telegramUsername" inputProps={{ type: "text" }} required/>
                  </Grid>
                  <Tooltip title="It's necessary to look for ittent_bot and text '/chatId' in Telegram." placement="bottom">
                    <Grid item xs={12} md={6}>
                      <FormField name="telegramChatId" defaultValue={(user?.telegramChatId ? (user.telegramChatId || "").toString() : "")}
                      label="Telegram ChatId" placeholder="123456" inputProps={{ type: "text" }} required/>
                    </Grid>
                  </Tooltip>
                </Grid>
              </MDBox>
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
              <MDBox p={3}>
              <Grid container spacing={3}>
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
            {message}
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
          <Grid item xs={12} sm={6}>
          <FormField name="verificationCode"
            label="Verification Code"
            inputProps={{ type: "text" }}
            required
            ref={verificationCodeRef}
            maxLength={6}
          />
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={verificationCodeRef.current.value ? handleVerifyCode("phone_number", verificationCodeRef.current.value) : null}>
            Verify Code
          </Button>
          <Button
            onClick={() => {
              handleResendConfirmationCode();
              setResendTimer(60);
              openOneMinuteTimer();
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

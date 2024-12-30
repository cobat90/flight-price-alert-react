import React, { useState, useEffect, useRef, useContext } from "react";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";
import Card from "@mui/material/Card";
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

  const handleGetVerificationCode = (attributeName, attributeValue, attributeCurrentValue) => {
    if (attributeValue && attributeValue === attributeCurrentValue) {
      getVerificationCode(convertGetVerificationCodeRequest(attributeName));
    }
    else{
      setErrors({ ...errors, errorText: "Please save profile with a new phone number first." });
    }
  };

  const getVerificationCode = async (userData) => {
    try {
      const response = await AuthService.getUserAttributeVerificationCode(userData);
      if (response.status === 200) {
        setErrors(null);
        setResendTimer(60);
        openOneMinuteTimer();
        setOpenDialogConfirm(true);
      } 
    } catch (error) {
      if (error.response && error.response.data && error.response.data.message) { 
        setErrors({ ...errors, errorText: error.response.data.message });
      } else {
        setErrors({ ...errors, errorText: "Error Get Verification Code" });
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
        setErrors(null);
        setSnackBarMessage("Phone Number Verified!");
        handleSnackBarOpen({ vertical: 'top', horizontal: 'center'});
        setOpenDialogConfirm(false);
      } 
    } catch (error) {
      if (error.response && error.response.data && error.response.data.message) {
        setSnackBarMessage(error.response.data.message);
        handleSnackBarOpen({ vertical: 'top', horizontal: 'center'});
        setErrors({ ...errors, errorText: error.response.data.message });
      } else {
        setErrors({ ...errors, errorText: "Error Verifying Code" });
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

  const updateUserData = async (userData) => {
    try {
      const response = await AuthService.updateProfile(userData);
      if (response.status === 200) {
        getUserData();
        setErrors(null);
        setSnackBarMessage("User Profile Saved!");
        handleSnackBarOpen({ vertical: 'top', horizontal: 'center' });
      } 
    } catch (error) {
      if (error.response && error.response.data && error.response.data.message) { 
        if (error.response.data.message == "Access Token has expired") {
          localStorage.removeItem("token");
          navigate("/auth/login");
        }
        else{
          setErrors({ ...errors, errorText: error.response.data.message });
        }
      } else {
        setErrors({ ...errors, errorText: "Error updateUserData" });
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
                <MDTypography variant="h6"><b>SMS</b> Notifications</MDTypography>
              </MDBox>
              <MDBox p={3}>
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={6}>
                    <FormField name="phoneNumber" defaultValue={(user?.phoneNumber ? (user.phoneNumber || "").toString() : "")}
                      label="Phone Number"
                      placeholder="+55 99765 4646"
                      inputProps={{ type: "text", ref: phoneNumberRef }}
                    />
                    </Grid>
                    <Tooltip title="For receving notifications by SMS, it's necessary to validate your Phone Number." placement="bottom">
                      <Grid item xs={12} md={2}>
                        <MDButton
                          variant="gradient"
                          color="error"
                          type="button"
                          onClick={() => {
                            handleGetVerificationCode("phone_number", (user?.phoneNumber || "").toString(), phoneNumberRef?.current?.value);
                          }}
                            disabled={resendTimer > 0}>                  
                          Verify
                        </MDButton>
                      </Grid>    
                    </Tooltip>
                  </Grid>
              </MDBox>
              <MDBox>
                <MDTypography variant="h6"><b translate="no">Telegram</b>&nbsp;Notifications</MDTypography>
              </MDBox>
              <MDBox p={3}>
                <Grid container spacing={3}>
  {/*                 <Grid item xs={12} md={6}>
                    <FormField name="telegramUserName" defaultValue={(user?.telegramUserName ? (user.telegramUserName || "").toString() : "")}
                    label="Telegram UserName" placeholder="telegramUsername" inputProps={{ type: "text" }}/>
                  </Grid> */}
                  <Tooltip title="It's necessary to look for ittent_bot and text '/chatId' in Telegram." placement="bottom">
                    <Grid item xs={12} md={6}>
                      <FormField name="telegramChatId" defaultValue={(user?.telegramChatId ? (user.telegramChatId || "").toString() : "")}
                      label="Telegram ChatId" placeholder="123456" inputProps={{ type: "text" }} translate="no"/>
                    </Grid>
                  </Tooltip>
                </Grid>
              </MDBox>
              {/* <MDBox>
                <MDTypography variant="h6">Email Notifications</MDTypography>
              </MDBox>
              <MDBox p={3}>
                <Grid container spacing={3}>
                  <Grid item xs={12} md={6}>
                    <FormField name="email" defaultValue={(user?.email ? (user.email || "").toString() : "")} label="Email" disabled/>     
                  </Grid>
                  <Tooltip title="For receving notifications by Email, it's necessary to validate the subscrition." placement="bottom">
                      <Grid item xs={12} md={2}>
                        <MDButton
                          variant="gradient"
                          color="error"
                          type="button"
                          onClick={() => {
                            handleGetVerificationCode("phone_number", (user?.phoneNumber || "").toString(), phoneNumberRef?.current?.value);
                          }}
                            disabled={resendTimer > 0}>                  
                          Verify
                        </MDButton>
                      </Grid>    
                    </Tooltip>
                </Grid>
              </MDBox> */}
              <Grid item xs={12}>
                {errors && Object.keys(errors).length > 0 && (
                  Object.keys(errors).map((key) => (
                    <Grid item xs={12} key={key}>
                      <MDTypography variant="caption" color="error" fontWeight="medium">
                      {errors[key].toString()}
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
                  onClick={handleClearForm} translate="no">                  
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
          autoHideDuration={5000}
          onClose={handleSnackBarClose}
          disablescrolllock="true">
          <Notification
            onClose={handleSnackBarClose}
            severity={errors && Object.keys(errors).length > 0 ? "error" : "success"}
            sx={{ width: '100%' }}
          >
            {snackBarMessage}
          </Notification>
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
            An SMS was sent for verify your phone number.
            <br/> 
            Wait here until you receive it.
            <br/> 
          </DialogContentText>
          {resendTimer > 0 && (
            <DialogContentText id="resend-timer">
              To resend the SMS, please wait <b>{resendTimer}</b> seconds.
            </DialogContentText>
          )}
          <br/>
          <Grid item xs={12} sm={6}>
          <MDInput name="verificationCode"
            label="Verification Code"
            inputProps={{ type: "text", ref: verificationCodeRef, maxLength: 6 }}
            required
          />
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button  onClick={() => {
            if (verificationCodeRef.current) {
              handleVerifyCode("phone_number", verificationCodeRef?.current?.value);
            }}}>
            Verify Code
          </Button>
          <Button
            onClick={() => {
              handleGetVerificationCode("phone_number", (user?.phoneNumber || "").toString(), phoneNumberRef?.current?.value);
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

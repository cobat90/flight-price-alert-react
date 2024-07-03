import React, { useState, useEffect, useRef } from "react";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import Typography from '@mui/material/Typography';
import MDButton from "components/MDButton";
import Button from '@mui/material/Button';
import MDInput from "components/MDInput";
import Snackbar from '@mui/material/Snackbar';
import FormField from "components/FormField";
import MuiAlert from '@mui/material/Alert';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer"

import AuthService from "../../services/auth-service";

function Settings() {
  const passwordRequirements = [
    "Min 8 characters",
    "One special character",
    "One number",
    "Contains at least 1 uppercase letter",
    "Contains at least 1 lowercase letter"
  ];

  const renderPasswordRequirements = passwordRequirements.map((item, key) => {
    const itemKey = `element-${key}`;
    return (
      <MDBox key={itemKey} component="li" color="text" fontSize="1.25rem" lineHeight={1}>
        <MDTypography variant="button" color="text" fontWeight="regular" verticalAlign="middle">
          {item}
        </MDTypography>
      </MDBox>
    );
  });

  const Notification = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="standard" {...props} />;
  });

  const [snackBarState, setSnackBarState] = useState({
    open: false,
    vertical: 'top',
    horizontal: 'center',
  });
  const { vertical, horizontal, open } = snackBarState;

  const [errors, setErrors] = useState({
    newPassError: false,
    confirmPassError: false,
  });

  const [credentialsErros, setCredentialsError] = useState(null);

  const handleSnackBarOpen = (newState) => {
    setSnackBarState({ ...newState, open: true });
  };

  const handleSnackBarClose = () => {
    setSnackBarState({ ...snackBarState, open: false });
  };

  const [dialogConfirmAction, setDialogConfirmAction] = useState();
  const [openDialogConfirm, setOpenDialogConfirm] = useState(false);

  const handleDialogConfirmOpen = (event, action) => {   
    setDialogConfirmAction(action);
    setOpenDialogConfirm(true);
  };

  const handleDialogConfirmClose = () => {
    setOpenDialogConfirm(false);
  };

  const formRef = useRef();

  const handleClearForm = () => {
    const inputs =  formRef.current.querySelectorAll('input');
    inputs.forEach((input) => {
      input.value = '';
    });   
  };

  const handleDialogConfirmSubmit = () => {
    if (dialogConfirmAction === "Disable"){
      disableAccount();
    }
    if (dialogConfirmAction === "Delete"){
      deleteAccount();
    }

    handleDialogConfirmClose();
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target); 
    let userData = {};
    formData.forEach((value, key) => {
      userData[key] = value;
    });
    
    if (userData.confirmPassword || userData.newPassword) {
      if (userData.confirmPassword.trim() !== userData.newPassword.trim()) {
        setErrors({ ...errors, confirmPassError: true, newPassError: false});
        return;
       
      }
      if (userData.currentPassword.trim() === userData.newPassword.trim()) {
        setErrors({ ...errors, newPassError: true,  confirmPassError: false});
        return;
      }
    }

    if (userData.newPassword.length > 0 && userData.confirmPassword.length > 0 ) {
      const passData = {
        PreviousPassword: userData.currentPassword,
        ProposedPassword: userData.newPassword,
        AccessToken: localStorage.getItem("token"),
      };
      changePassword(passData);
    }
    setErrors({
      newPassError: false,
      confirmPassError: false,
    });
    setCredentialsError(null);
  };

  const changePassword = async (userData) => {
    try {
      const response = await AuthService.changePassword(userData);
      if (response.status === 200) {
        handleSnackBarOpen({ vertical: 'top', horizontal: 'center' });
        handleClearForm();
        setCredentialsError(null);
      } else {
        console.error("Invalid data format in response:", response);
      }
    } catch (error) {
      if (error.response.data.hasOwnProperty("detail")) {
        setCredentialsError(extractTextOutsideParentheses(error.response.data.detail));
      } else {
        setCredentialsError(error.response.data.error);
      }
    }
  };

  function extractTextOutsideParentheses(inputString) {
    const regex = /\(([^)]+)\)/;
    const matches = regex.exec(inputString);
    return matches ? inputString.replace(matches[0], '').trim() : inputString;
  }

  const deleteAccount = async () => {
    let userData = {
      Username: localStorage.getItem("login"),
      UserPoolId: process.env.COGNITO_USERPOOLID,
      AccessToken: localStorage.getItem("token"),
    }
    try {
      const response = await AuthService.deleteAccount(userData);
      if (response.status === 200) {
        handleSnackBarOpen({ vertical: 'top', horizontal: 'center' });
      } else {
        console.error("Invalid data format in response:", response);
      }
    } catch (error) {
      console.error(error.response.data.error);
    }
  };

  const disableAccount = async () => {
    try {
      let userData = {
        Username: localStorage.getItem("login"),
        UserPoolId: process.env.COGNITO_USERPOOLID,
        AccessToken: localStorage.getItem("token"),
      }
      const response = await AuthService.disableAccount(userData);
      if (response.status === 200) {
        handleSnackBarOpen({ vertical: 'top', horizontal: 'center' });
      } else {
        console.error("Invalid data format in response:", response);
      }
    } catch (error) {
      console.error(error.response.data.error);
    }
  };

  return (
    <DashboardLayout>
      < DashboardNavbar />
      <MDBox mb={2} >
        <Card id="change-password">
          <MDBox p={3}>
            <MDTypography variant="h5">Change Password</MDTypography>
          </MDBox>
            <MDBox component="form" pb={3} px={3} ref={formRef} onSubmit={handleSubmit}>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <FormField
                    fullWidth
                    name="currentPassword"
                    label="Current Password"
                    required
                    inputProps={{ type: "password", autoComplete: "", minLength: 8 }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormField
                    fullWidth
                    name="newPassword"
                    label="New Password"
                    required
                    error={errors.newPassError}
                    inputProps={{ type: "password", autoComplete: "", minLength: 8 }}
                  />
                  {errors.newPassError && (
                          <MDTypography variant="caption" color="error" fontWeight="light">
                            The password must be different from the current password
                          </MDTypography>
                        )}
                </Grid>
                <Grid item xs={12}>
                  <FormField
                    fullWidth
                    name="confirmPassword"
                    label="Confirm New Password"
                    required
                    error={errors.confirmPassError}
                    inputProps={{ type: "password", autoComplete: "", minLength: 8 }}
                  />
                  {errors.confirmPassError && (
                          <MDTypography variant="caption" color="error" fontWeight="light">
                            The password confirmation must match the current password
                          </MDTypography>
                        )}
                </Grid>
              </Grid>
              {credentialsErros && (
              <MDTypography variant="caption" color="error" fontWeight="medium" >
                {credentialsErros}
              </MDTypography>
            )}
              <MDBox mt={6} mb={1}>
                <MDTypography variant="h5">Password requirements</MDTypography>
              </MDBox>
              <MDBox mb={1}>
                <MDTypography variant="body2" color="text">
                  Please follow this guide for a strong password
                </MDTypography>
              </MDBox>
              <MDBox display="flex" justifyContent="space-between" alignItems="flex-end" flexWrap="wrap">
                <MDBox component="ul" m={0} pl={3.25} mb={{ xs: 1, sm: 0 }}>
                  {renderPasswordRequirements}
                </MDBox>
                <MDBox display="flex" flexDirection={{ xs: "column", sm: "row" }} justifyContent="flex-end">
                  <MDButton variant="gradient" color="error" sx={{ height: "100%" }} type="submit">
                    Change Password
                  </MDButton>
                  <MDBox ml={{ xs: 0, sm: 0.5 }} mt={{ xs: 1, sm: 0 }}>
                    <MDButton
                      variant="gradient"
                      color="info"
                      type="button"
                      onClick={handleClearForm}
                    >
                      Clear
                    </MDButton>
                  </MDBox>
                </MDBox>
              </MDBox>
            </MDBox>
        </Card>
      </MDBox>
    <MDBox mb={2} >
    <Card id="delete-account">
      <MDBox
        pr={3}
        display="flex"
        justifyContent="space-between"
        alignItems={{ xs: "flex-start", sm: "center" }}
        flexDirection={{ xs: "column", sm: "row" }}
      >
        <MDBox p={3} lineHeight={1}>
          <MDBox mb={1}>
            <MDTypography variant="h5">Disable or Delete Account</MDTypography>
          </MDBox>
          <MDTypography variant="button" color="text">
            Once you delete your account, there is no going back. Please be certain.
          </MDTypography>
        </MDBox>
        <MDBox display="flex" flexDirection={{ xs: "column", sm: "row" }}>
          <MDButton variant="gradient" color="error" sx={{ height: "100%" }} onClick={(e) => {
            e.stopPropagation(); 
            handleDialogConfirmOpen(e, "Delete");
            }}>
              Delete
          </MDButton>
          <MDBox ml={{ xs: 0, sm: 1 }} mt={{ xs: 1, sm: 0 }}>
          <MDButton variant="outlined" color="secondary" onClick={(e) => {
            e.stopPropagation(); 
            handleDialogConfirmOpen(e, "Disable");
          }}>
            Disable
          </MDButton>
          </MDBox>
        </MDBox>
      </MDBox>
    </Card>
    </MDBox>
    <MDBox sx={{ width: 500 }}>
      <Snackbar
        anchorOrigin={{ vertical, horizontal }}
        open={open}
        key={vertical + horizontal}
        autoHideDuration={2000}
        onClose={handleSnackBarClose}
        disablescrolllock="true">     
        <Notification  onClose={handleSnackBarClose} severity="success" sx={{ width: '100%' }}>
          User Settings Saved!
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
          Account?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleDialogConfirmClose}> Disagree </Button>
        <Button onClick={handleDialogConfirmSubmit} autoFocus> Agree </Button>        
      </DialogActions>
    </Dialog>
    <Footer />
  </DashboardLayout>
  );
}

export default Settings;

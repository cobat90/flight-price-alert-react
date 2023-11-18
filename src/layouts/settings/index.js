import React, { useState, useEffect, useRef } from "react";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";
import MDInput from "components/MDInput";
import Snackbar from '@mui/material/Snackbar';
import FormField from "components/FormField";
import MuiAlert from '@mui/material/Alert';
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer"

import AuthService from "../../services/auth-service";

function Settings() {
  const passwordRequirements = [
    "One special character",
    "Min 6 characters",
    "One number (2 are recommended)",
    "Change it often",
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

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target); 
    let userData = {};
    formData.forEach((value, key) => {
      userData[key] = value;
    });
    console.info("userData", userData);
    
    if (userData.confirmPassword || userData.newPassword) {
      if (userData.confirmPassword.trim() !== userData.newPassword.trim()) {
        setErrors({ ...errors, confirmPassError: true, newPassError: false,});
        return;
       
      }
      if (userData.currentPassword === userData.newPassword) {
        setErrors({ ...errors, newPassError: true,  confirmPassError: false});
        return;
      }
    }

    if (userData.newPassword.length > 0 && userData.confirmPassword.length > 0 ) {
      const passData = {
        currentPassword: userData.currentPassword,
        newPassword: userData.newPassword,
      };
      console.info(passData);
      changePassword(passData);
    }

    setErrors({
      passwordError: false,
      newPassError: false,
      confirmPassError: false,
    });
  };

  const changePassword = async (userData) => {
    try {
      const response = await AuthService.changePassword(userData);
      if (response.status === 200) {
        handleSnackBarOpen({ vertical: 'top', horizontal: 'center' });
      } else {
        console.error("Invalid data format in response:", response);
      }
    } catch (error) {
      console.error("Error fetching alert:", error);
    }
  };

  const deleteAccount = async (login) => {
    try {
      const response = await AuthService.deleteAccount(login);
      if (response.status === 200) {
        handleSnackBarOpen({ vertical: 'top', horizontal: 'center' });
      } else {
        console.error("Invalid data format in response:", response);
      }
    } catch (error) {
      console.error("Error fetching alerts:", error);
    }
  };

  const updateUserData = async (userData) => {
    try {
      const response = await AuthService.updateProfile(userData);
      if (response.status === 200) {
        handleSnackBarOpen({ vertical: 'top', horizontal: 'center' });
      } else {
        console.error("Invalid data format in response:", response);
      }
    } catch (error) {
      console.error("Error fetching alert:", error);
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
        <MDBox mt={6} mb={1}>
          <MDTypography variant="h5">Password requirements</MDTypography>
        </MDBox>
        <MDBox mb={1}>
          <MDTypography variant="body2" color="text">
            Please follow this guide for a strong password
          </MDTypography>
        </MDBox>
        <MDBox display="flex" justifyContent="space-between" alignItems="flex-end" flexWrap="wrap">
          <MDBox component="ul" m={0} pl={3.25} mb={{ xs: 8, sm: 0 }}>
            {renderPasswordRequirements}
          </MDBox>
          <MDBox ml="auto">
            <MDButton variant="gradient" color="dark" size="small" type="submit">
              Update Password
            </MDButton>
          </MDBox>
          <MDButton
            variant="gradient"
            color="info"
            type="button"
            onClick={handleClearForm}>                  
            Clear
          </MDButton>
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
            <MDTypography variant="h5">Delete Account</MDTypography>
          </MDBox>
          <MDTypography variant="button" color="text">
            Once you delete your account, there is no going back. Please be certain.
          </MDTypography>
        </MDBox>
        <MDBox display="flex" flexDirection={{ xs: "column", sm: "row" }}>
          <MDButton variant="outlined" color="secondary">
            Deactivate
          </MDButton>
          <MDBox ml={{ xs: 0, sm: 1 }} mt={{ xs: 1, sm: 0 }}>
            <MDButton variant="gradient" color="error" sx={{ height: "100%" }}>
              Delete Account
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
    <Footer />
  </DashboardLayout>
  );
}

export default Settings;

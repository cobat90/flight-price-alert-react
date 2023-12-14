import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import FormField from "components/FormField";

import CoverLayout from "layouts/authentication/components/CoverLayout";
import queryString from 'query-string';
import bgImage from "assets/images/bg-reset-cover.jpeg";
import authService from "services/auth-service";

function ForgotPasswordFinish() {
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

  const [errors, setErrors] = useState({
    newPassError: false,
    confirmPassError: false,
  });

  const [credentialsErros, setCredentialsError] = useState(null);
  const [resetKey, setResetKey] = useState(null);
  const location = useLocation();
  const parsedQueryString = queryString.parse(location.search);
  
  useEffect(() => {
    if (Object.keys(parsedQueryString).length > 0) {
      setResetKey(parsedQueryString.key);
    }
  }, [parsedQueryString]); // Add parsedQueryString as a dependency to useEffect

  
  const [openDialogConfirm, setOpenDialogConfirm] = useState(false);

  const handleDialogConfirmOpen = () => {   
    setOpenDialogConfirm(true);
  };

  const handleDialogConfirmClose = () => {
    setOpenDialogConfirm(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target); 
    let userData = {};
    formData.forEach((value, key) => {
      userData[key] = value;
    });
    
    if (userData.confirmPassword || userData.newPassword) {
      if (userData.confirmPassword.trim() !== userData.newPassword.trim()) {
        setErrors({ ...errors, confirmPassError: true, newPassError: false});
        return;     
      }
    }

    if (userData.newPassword.length > 0 && userData.confirmPassword.length > 0 ) {
      const newPassData = {
        key: resetKey,
        newPassword: userData.newPassword,
      };
      handleForgotPasswordFinish(newPassData);
    }
    setErrors({
      newPassError: false,
      confirmPassError: false,
    });
  };

  const handleForgotPasswordFinish = async (newPassData) => {
    try {
      const response = await authService.forgotPasswordFinish(newPassData);
      if (response.status === 200) {
        handleDialogConfirmOpen();
        setErrors({ err: false, textError: "" });     
      } 
    } catch (error) {
      if (error.response.data.hasOwnProperty("error")) {
        setCredentialsError(error.response.data.error);
      } else {
        setCredentialsError("An unexpected error occurred", error);
      }
    }
  }

  return (
    <CoverLayout coverHeight="50vh" image={bgImage}>
      <Card>
        <MDBox
          variant="gradient"
          bgColor="info"
          borderRadius="lg"
          coloredShadow="success"
          mx={2}
          mt={-3}
          py={2}
          mb={1}
          textAlign="center"
        >
          <MDTypography variant="h3" fontWeight="medium" color="white" mt={1}>
            Change Password
          </MDTypography>
          <MDTypography display="block" variant="button" color="white" my={1}>
            You can change your Password
          </MDTypography>
        </MDBox>
        <MDBox pt={4} pb={3} px={3}>
          <MDBox component="form" role="form" method="POST" onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <FormField
                  fullWidth
                  name="newPassword"
                  label="New Password"
                  required
                  inputProps={{ type: "password", minLength: 8 }}
                />

              </Grid>
              <Grid item xs={12}>
                <FormField
                  fullWidth
                  name="confirmPassword"
                  label="Confirm New Password"
                  required
                  error={errors.confirmPassError}
                  inputProps={{ type: "password", minLength: 8 }}
                />
                {errors.confirmPassError && (
                  <MDTypography variant="caption" color="error" fontWeight="medium">
                    The password confirmation must match
                  </MDTypography>
                )}
                {credentialsErros && (
                  <MDBox mt={2} mb={1} display="flex" alignItems="center" >
                    <MDTypography variant="caption" color="error" fontWeight="medium"  >
                      {credentialsErros}
                    </MDTypography>
                  </MDBox>
                )}
              </Grid>
            </Grid>
            <MDBox mt={2} mb={2}>
              <MDBox display="flex" justifyContent="space-between" alignItems="flex-end" flexWrap="wrap">
                <MDBox component="ul" m={0} pl={3.25} mb={3}>
                  {renderPasswordRequirements}
                </MDBox>
                  <MDButton variant="gradient" color="error" sx={{ height: "100%" }} fullWidth type="submit">
                    Change Password
                  </MDButton>       
              </MDBox>
            </MDBox>          
          </MDBox>
        </MDBox>
      </Card>
      <Dialog
      open={openDialogConfirm}
      onClose={handleDialogConfirmClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      disableScrollLock={ true } >             
      <DialogTitle id="alert-dialog-title">
        {"Password updated"}
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
           Your new password has been changed!
        </DialogContentText>
      </DialogContent>
      <DialogActions>
      <Button
          component={Link}
          to="/auth/login"
          onClick={handleDialogConfirmClose}
        >
          Sign in
        </Button>
      </DialogActions>
    </Dialog>
    </CoverLayout>
  );
}

export default ForgotPasswordFinish;

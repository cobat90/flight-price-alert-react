import { useState, useEffect } from "react";
import Card from "@mui/material/Card";
import { Link } from "react-router-dom";

// Material Dashboard 2 React components
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


// Authentication layout components
import CoverLayout from "layouts/authentication/components/CoverLayout";

// Images
import bgImage from "assets/images/bg-reset-cover.jpeg";
import authService from "services/auth-service";

function ForgotPassword() {
  const [input, setEmail] = useState({
    email: "",
  });
  const [errors, setError] = useState({
    error: false,
    textError: "",
  });

  const [openDialogConfirm, setOpenDialogConfirm] = useState(false);

  const handleDialogConfirmOpen = () => {   
    setOpenDialogConfirm(true);
  };

  const handleDialogConfirmClose = () => {
    setOpenDialogConfirm(false);
  };

  const changeHandler = (e) => {
    setEmail({
      [e.target.name]: e.target.value,
    });
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();

    const mailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    if (input.email.trim().length === 0 || !input.email.trim().match(mailFormat)) {
      setError({ ...errors, error: true, textError: "The email must be valid" });
      return;
    }

    const email = input.email.trim();

    const passwordForgotData = {
      email
    };

    try {
      const response = await authService.forgotPasswordInit(passwordForgotData);
      if (response.status === 200) {
        handleDialogConfirmOpen();
        setError({ ...errors, error: false, textError: "" });     
      } 

    } catch (error) {
        if (error.response.data.hasOwnProperty("error")) {
          setError({ ...errors, error: true, textError: error.response.data.error });
        }
        else if (error.response.data.hasOwnProperty("detail")) 
        {
          setError({ ...errors, error: true, textError: extractTextOutsideParentheses(error.response.data.detail) });
        } 
        else {
          setError({ ...errors, error: true, textError: "An unexpected error occurred" });
        }
      return null;
    }
  };

  function extractTextOutsideParentheses(inputString) {
    const regex = /\(([^)]+)\)/;
    const matches = regex.exec(inputString);
    return matches ? inputString.replace(matches[0], '').trim() : inputString;
  };

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
            Reset Password
          </MDTypography>
          <MDTypography display="block" variant="button" color="white" my={1}>
            You will receive an e-mail for Reset Password
          </MDTypography>
        </MDBox>
        <MDBox pt={4} pb={3} px={3}>
          <MDBox component="form" role="form" method="POST" onSubmit={handleSubmit}>
            <MDBox mb={4}>
              <MDInput
                type="email"
                label="Email"
                variant="standard"
                fullWidth
                value={input.email}
                name="email"
                onChange={changeHandler}
                error={errors.error}
              />
            </MDBox>
            {errors.error && (
              <MDTypography variant="caption" color="error" fontWeight="medium">
                {errors.textError}
              </MDTypography>
            )}
            <MDBox mt={6} mb={1}>
              <MDButton variant="gradient" color="info" fullWidth type="submit">
                reset
              </MDButton>
            </MDBox>
            <MDBox mt={3} mb={1} textAlign="center">
              <MDTypography variant="button" color="text">
                Already reseted password? Login in{" "}
                <MDTypography
                  component={Link}
                  to="/auth/login"
                  variant="button"
                  color="info"
                  fontWeight="medium"
                  textGradient
                >
                  here
                </MDTypography>
              </MDTypography>
            </MDBox>
            <MDBox mb={1} textAlign="center">
              <MDTypography variant="button" color="text">
                Don&apos;t have an account?{" "}
                <MDTypography
                  component={Link}
                  to="/auth/register"
                  variant="button"
                  color="info"
                  fontWeight="medium"
                  textGradient
                >
                  Sign up
                </MDTypography>
              </MDTypography>
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
        {"Check your email"}
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
           An email was sent for active your account.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
      <Button
        onClick={handleDialogConfirmClose}
        >
          Ok
        </Button>
      </DialogActions>
    </Dialog>
    </CoverLayout>
  );
}

export default ForgotPassword;

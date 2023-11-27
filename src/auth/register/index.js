import { useContext, useState } from "react";
// react-router-dom components
import { Link } from "react-router-dom";

// @mui material components
import Card from "@mui/material/Card";
import Checkbox from "@mui/material/Checkbox";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';


// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";

// Authentication layout components
import CoverLayout from "layouts/authentication/components/CoverLayout";

// Images
import bgImage from "assets/images/bg-sign-up-cover.jpeg";

import AuthService from "services/auth-service";
import { AuthContext } from "context";
import { InputLabel } from "@mui/material";
import { convertRequest } from '../../services/convert-user-price-alert-service';

function Register() {
  const authContext = useContext(AuthContext);

  const [inputs, setInputs] = useState({
    agree: false,
  });

  const [errors, setErrors] = useState({
    firstNameError: false,
    emailError: false,
    emailExistsError: false,
    phoneNumberError: false,
    phoneNumberExistsError: false,
    loginExistsError: false,
    passwordError: false,
    confirmPasswordError: false,
    agreeError: false,
    error: false,
    errorText: "",
  });

  const [openDialogConfirm, setOpenDialogConfirm] = useState(false);

  const handleDialogConfirmOpen = () => {   
    setOpenDialogConfirm(true);
  };

  const handleDialogConfirmClose = () => {
    setOpenDialogConfirm(false);
  };

  const changeHandler = (e) => {
    setInputs({
      ...inputs,
      [e.target.name]: e.target.value,
    });
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    const mailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    const phoneFormat = /^\+(?:[0-9] ?){7,25}[0-9]$/;

    const formData = new FormData(e.target); 
    let userData = {};
    formData.forEach((value, key) => {
      userData[key] = value;
    });

    if (userData.email){
      if (userData.email.trim().length === 0 || !userData.email.trim().match(mailFormat)) {
        setErrors({ ...errors, emailError: true });
        return;
      }
    }
    if (userData.phoneNumber){
      if (userData.phoneNumber.trim().length === 0 || !userData.phoneNumber.trim().match(phoneFormat)) {
        setErrors({ ...errors, phoneNumberError: true });
        return;
      }
    }
    if (inputs.agree === false) {
      setErrors({ ...errors, agreeError: true });
      return;
    }
    if (userData.confirmPassword || userData.password) {     
      if (userData.password.trim().length < 8) {
        setErrors({ ...errors, passwordError: true });
        return;
      }
      if (userData.confirmPassword.trim() !== userData.password.trim()) {
        setErrors({ ...errors, confirmPasswordError: true, passwordError: false,});
        return;
      }

      if (userData.password.length > 0 && userData.confirmPassword.length > 0 ) {
        const requestPayload = convertRequest(userData);
        console.info("requestPayload: ",requestPayload);
        registerUserData(requestPayload);
        
        setErrors({
          firstNameError: false,
          emailError: false,
          emailExistsError: false,
          phoneNumberError: false,
          phoneNumberExistsError: false,
          loginExistsError: false,
          passwordError: false,
          confirmPasswordError: false,
          agreeError: false,
          error: false,
          errorText: "",
        });     
      }
    }
  };

  const registerUserData = async (userData) => {
    try {
      const response = await AuthService.register(userData);
      if (response.status === 201) {
        handleDialogConfirmOpen();
      } 
      else {
        console.error("Invalid data format in response:", response);
      }
    } catch (error) {
      if (error.response.data.message === "error.emailexists"){
        setErrors({
          emailError: true,
          emailExistsError: true,
        })
      }
      else if (error.response.data.message === "error.userexists"){
        setErrors({
          loginExistsError: true,
        })
      }
      else if (error.response.data.message === "error.phonenumberexists"){
        setErrors({
          phoneNumberError: true,
          phoneNumberExistsError: true,
        })
      }
      console.error("Error fetching alert:", error);
    }
  };

  return (
    <CoverLayout image={bgImage}>
      <Card>
        <MDBox
          variant="gradient"
          bgColor="info"
          borderRadius="lg"
          coloredShadow="success"
          mx={2}
          mt={-3}
          p={3}
          mb={1}
          textAlign="center"
        >
          <MDTypography variant="h4" fontWeight="medium" color="white" mt={1}>
            Sing up
          </MDTypography>
          <MDTypography display="block" variant="button" color="white" my={1}>
            Join now and receive free 10 alert days
          </MDTypography>
        </MDBox>
        <MDBox pt={4} pb={3} px={3}>
          <MDBox component="form" role="form" method="POST" onSubmit={submitHandler}>
            <MDBox mb={2}>
              <MDInput
                type="text"
                label="First Name"
                variant="standard"
                fullWidth
                name="firstName"
                error={errors.firstNameError}
                required
                minLength={3}
                maxLength={45}
              />
              {errors.firstNameError && (
                <MDTypography variant="caption" color="error" fontWeight="light">
                  The name can not be empty
                </MDTypography>
              )}
            </MDBox>
            <MDBox mb={2}>
              <MDInput
                type="email"
                label="Email"
                variant="standard"
                fullWidth
                name="email"
                error={errors.emailError}
                required
                minLength={5}
                maxLength={100}
              />
              {errors.emailError && (
                <MDTypography variant="caption" color="error" fontWeight="light">
                  {errors.emailExistsError ? 'The Login already in use' : 'Email must be valid.'}
                </MDTypography>
              )}
            </MDBox>
            <MDBox mb={2}>
              <MDInput
                type="text"
                label="Phone Number"
                variant="standard"
                fullWidth
                name="phoneNumber"
                error={errors.phoneNumberError}
                required
                minLength={7}
                maxLength={25}
              />
              {errors.phoneNumberError && (
                <MDTypography variant="caption" color="error" fontWeight="light">
                  {errors.phoneNumberExistsError ? 'The Phone Number already in use' : 'Invalid Phone Number. Ex: +99 99 9999 9999.'}
                </MDTypography>
              )}
            </MDBox>
            <MDBox mb={2}>
              <MDInput
                type="text"
                label="Login"
                variant="standard"
                fullWidth
                name="login"
                error={errors.loginExistsError}
                required
                minLength={3}
                maxLength={50}
              />
              {errors.loginExistsError && (
                <MDTypography variant="caption" color="error" fontWeight="light">
                  The Login already in use
                </MDTypography>
              )}
            </MDBox>
            <MDBox mb={2}>
              <MDInput
                type="password"
                label="Password"
                variant="standard"
                fullWidth
                name="password"
                error={errors.passwordError}
                required
                minLength={8}
                maxLength={50}
              />
              {errors.passwordError && (
                <MDTypography variant="caption" color="error" fontWeight="light">
                  The password must be of at least 8 characters
                </MDTypography>
              )}
            </MDBox>
            <MDBox mb={2}>
              <MDInput
                type="password"
                label="Confirm Password"
                variant="standard"
                fullWidth
                name="confirmPassword"
                error={errors.confirmPasswordError}
                required
                minLength={8}
                maxLength={50}
              />
              {errors.confirmPasswordError && (
                <MDTypography variant="caption" color="error" fontWeight="light">
                  The pass confirmation must match the current password
                </MDTypography>
              )}
            </MDBox>
            <MDBox display="flex" alignItems="center" ml={-1}>
              <Checkbox name="agree" id="agree" onChange={changeHandler} />
              <InputLabel
                variant="standard"
                fontWeight="regular"
                color="text"
                sx={{ lineHeight: "1.5", cursor: "pointer" }}
                htmlFor="agree"
              >
                &nbsp;&nbsp;I agree to the&nbsp;
              </InputLabel>
              <MDTypography
                component={Link}
                to="/auth/login"
                variant="button"
                fontWeight="bold"
                color="info"
                textGradient
              >
                Terms and Conditions
              </MDTypography>
            </MDBox>
            {errors.agreeError && (
              <MDTypography variant="caption" color="error" fontWeight="light">
                You must agree to the Terms and Conditions
              </MDTypography>
            )}
            {errors.error && (
              <MDTypography variant="caption" color="error" fontWeight="light">
                {errors.errorText}
              </MDTypography>
            )}
            <MDBox mt={4} mb={1}>
              <MDButton variant="gradient" color="info" fullWidth type="submit">
                sign in
              </MDButton>
            </MDBox>
            <MDBox mt={3} mb={1} textAlign="center">
              <MDTypography variant="button" color="text">
                Already have an account?{" "}
                <MDTypography
                  component={Link}
                  to="/auth/login"
                  variant="button"
                  color="info"
                  fontWeight="medium"
                  textGradient
                >
                  Sign In
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

export default Register;

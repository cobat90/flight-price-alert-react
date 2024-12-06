import { useContext, useState } from "react";
import { Link } from "react-router-dom";

import Card from "@mui/material/Card";
import Checkbox from "@mui/material/Checkbox";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';

import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";
import CoverLayout from "layouts/authentication/components/CoverLayout";
// Images
import bgImage from "assets/images/bg-sign-up-cover.jpg";

import AuthService from "services/auth-service";
import { InputLabel } from "@mui/material";
import { convertUserSignupRequest, convertResendConfirmationCode } from '../../services/convert-user-service';

function Register() {

  const [inputs, setInputs] = useState({
    agree: false,
  });

  const [errors, setErrors] = useState({
    emailError: false,
    emailExistsError: false,
    passwordError: false,
    //agreeError: false,
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

  const handleResendConfirmationCode = () => {
    let userData = {
      email: localStorage.getItem("login"),
    }
    resendConfirmationCodeForUserEmail(convertResendConfirmationCode(userData));
  };
  
  const changeHandler = (e) => {
    setInputs({
      ...inputs,
      [e.target.name]: e.target.checked,
    });
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    const mailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
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

 /*    if (inputs.agree === false) {
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
*/
      if (userData.password.length > 0 ) {
        setErrors({
          emailError: false,
          passwordError: false,
          //agreeError: false,
          error: false,
          errorText: "",
          emailExistsError: false,
        });  
        registerUserData(convertUserSignupRequest(userData));
      }
  
  };

  const registerUserData = async (userData) => {
    try {
      const response = await AuthService.register(userData);
      if (response.status === 200) {
        handleDialogConfirmOpen();
        setResendTimer(60);
        openOneMinuteTimer();
        localStorage.setItem("login", userData.Username);
      } 
    } catch (error) {
        if (error.response && error.response.data && error.response.data.__type){
          if (error.response.data.__type === "EmailExistsException"){
            setErrors({
              emailError: true,
              emailExistsError: true,
            });
          }
          else if (error.response.data.__type === "UsernameExistsException"){
            setErrors({
              emailError: true,
              emailExistsError: true,
            });
          }
          else if (error.response.data.message) 
          {
            setErrors({ ...errors,error: true, errorText: extractTextOutsideParentheses(error.response.data.message) });
          } 
          else if (error.response.data.__type) 
          {
            setErrors({ ...errors,error: true, errorText: extractTextOutsideParentheses(error.response.data.__type) });
          } 
        }
    }
  };

  const resendConfirmationCodeForUserEmail = async (userData) => {
    try {
      const response = await AuthService.resendConfirmationCode(userData);
      if (response.status === 200) {
        setResendTimer(60);
        openOneMinuteTimer();
      } 
    } catch (error) {
      if (error.response && error.response.data && error.response.data.message) { 
        setErrors({ ...errors, error: true, errorText: extractTextOutsideParentheses(error.response.data.message) });
      } else {
        console.error("Error sending email");
      }
    }
  }

  function extractTextOutsideParentheses(inputString) {
    const regex = /\(([^)]+)\)/;
    const matches = regex.exec(inputString);
    return matches ? inputString.replace(matches[0], '').trim() : inputString;
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
            Sign up now and get 1000 free balance 
          </MDTypography>
        </MDBox>
        <MDBox pt={4} pb={3} px={3}>
          <MDBox component="form" role="form" method="POST" onSubmit={submitHandler}>
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
                  {errors.emailExistsError ? 'The Email already in use' : 'Email must be valid.'}
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
                <MDTypography variant="caption" color="error" fontWeight="medium">
                  The password must be of at least 8 characters
                </MDTypography>
              )}
            </MDBox>
 {/*            <MDBox mb={2}>
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
                <MDTypography variant="caption" color="error" fontWeight="medium">
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
             {errors.agreeError ? (
              <MDTypography variant="caption" color="error" fontWeight="medium">
                You must agree to the Terms and Conditions
              </MDTypography>
            ) : null} */}
            <MDBox mt={4} mb={1}>
              <MDButton variant="gradient" color="info" fullWidth type="submit" disabled={resendTimer > 0}>
                sign up
              </MDButton>
            </MDBox>
            {errors.error && (
              <MDTypography variant="caption" color="error" fontWeight="medium">
                {errors.errorText}
              </MDTypography>
            )}
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
        disableScrollLock={true}
      >
        <DialogTitle id="alert-dialog-title">
          {"Check your email"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            An email was sent for active your account. Wait here until you receive it.
          </DialogContentText>
          {resendTimer > 0 && (
            <DialogContentText id="resend-timer">
              To resend the email, please wait <b>{resendTimer}</b> seconds.
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

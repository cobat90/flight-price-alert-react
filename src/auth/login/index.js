import { useContext, useState } from "react";

// react-router-dom components
import { Link } from "react-router-dom";

// @mui material components
import Card from "@mui/material/Card";

import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";
import BasicLayoutLanding from "layouts/authentication/components/BasicLayoutLanding";
import bgImage from "assets/images/bg-sign-in-flight.png";
import { convertUserLoginRequest } from '../../services/convert-user-service';
import AuthService from "services/auth-service";
import { AuthContext } from "context";

function Login() {
  const authContext = useContext(AuthContext);

  const [credentialsErros, setCredentialsError] = useState(null);

  const [inputs, setInputs] = useState({
    username: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    usernameError: false,
    passwordError: false,
  });


  const changeHandler = (e) => { 
    setInputs({
      ...inputs,
      [e.target.name]: e.target.value,
    });
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    if (inputs.username.trim().length === 0) {
      setErrors({ ...errors, usernameError: true });
      return;
    }

    if (inputs.password.trim().length < 3) {
      setErrors({ ...errors, passwordError: true });
      return;
    }

    const userData = {
      username: inputs.username,
      password: inputs.password,
    };
   
    try {
      const response = await AuthService.login(convertUserLoginRequest(userData));
      if (response && response.data && response.data.AuthenticationResult && response.data.AuthenticationResult.AccessToken) {
        const accessToken = response.data.AuthenticationResult.AccessToken;
        authContext.login(accessToken);
      } else {
        console.error("AuthenticationResult or AccessToken missing in the response");
        setCredentialsError("Invalid login response");
      }
    } catch (error) {
      console.error("Login error: ", error);
      if (error.response && error.response.data && error.response.data.message) {
        setCredentialsError(error.response.data.message);
      } else {
        setCredentialsError("An unexpected error occurred", error);
      }
    }
  
    return () => {
      setInputs({
        username: "",
        password: "",
      });

      setErrors({
        usernameError: false,
        passwordError: false,
      });
    };
  };

  function extractTextOutsideParentheses(inputString) {
    const regex = /\(([^)]+)\)/;
    const matches = regex.exec(inputString);
    return matches ? inputString.replace(matches[0], '').trim() : inputString;
  }

  return (
    <BasicLayoutLanding image={bgImage}>
      <Card>
        <MDBox
          variant="gradient"
          bgColor="info"
          borderRadius="lg"
          coloredShadow="info"
          mx={2}
          mt={-3}
          p={2}
          mb={1}
          textAlign="center"
        >
          <MDTypography variant="h4" fontWeight="medium" color="white" mt={1}>
            Sign in
          </MDTypography>
        </MDBox>
        <MDBox pt={4} pb={3} px={3}>
          <MDBox component="form" role="form" method="POST" onSubmit={submitHandler}>
          <MDBox mb={2}>
              <MDInput
                type="username"
                label="Email"
                fullWidth
                value={inputs.username}
                name="username"
                onChange={changeHandler}
                error={errors.usernameError}
                autoComplete="username"
              />
            </MDBox>
            <MDBox mb={2}>
              <MDInput
                type="password"
                label="Password"
                fullWidth
                name="password"
                value={inputs.password}
                onChange={changeHandler}
                error={errors.passwordError}
                autoComplete="current-password"
              />
            </MDBox>
            <MDBox mt={4} mb={1}>
              <MDButton variant="gradient" color="info" fullWidth type="submit">
                Sign in
              </MDButton>
            </MDBox>
            {credentialsErros && (
              <MDTypography variant="caption" color="error" fontWeight="medium" >
                {credentialsErros}
              </MDTypography>
            )}
            <MDBox mt={3} mb={1} textAlign="center">
              <MDTypography variant="button" color="text">
                Forgot your password? Reset it{" "}
                <MDTypography
                  component={Link}
                  to="/auth/forgot-password-init"
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
    </BasicLayoutLanding>
  );
}

export default Login;

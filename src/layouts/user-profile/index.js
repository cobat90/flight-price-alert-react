import React, { useState, useEffect, useRef } from "react";
// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import Snackbar from '@mui/material/Snackbar';
// Settings page components
import FormField from "components/FormField";
import MuiAlert from '@mui/material/Alert';

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";

// Overview page components
import { convertUserUpdateRequest, convertUserResponse } from '../../services/convert-user-service';
import AuthService from "../../services/auth-service";

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

  const getUserData = async () => {
    try {
      let userData={
        AccessToken: localStorage.getItem("token"),
      }
      const response = await AuthService.getProfile(userData);
      if (response.status === 200 && response.data) {
        setUser(convertUserResponse(response.data));
      } else {
        console.error("Invalid data format in response: ", response);
      }
    } catch (error) {
      console.error("Error fetching user data: ", error);
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

  useEffect(() => {
    getUserData();
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
    let userData = {
    };
    formData.forEach((value, key) => {
      userData[key] = value;
    });
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
                  label="First Name" placeholder="Fernando" inputProps={{ type: "text" }}/>
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
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormField name="phoneNumber" defaultValue={(user?.phoneNumber ? (user.phoneNumber || "").toString() : "")}
                  label="Phone Number"
                  placeholder="+55 99765 4646"
                  inputProps={{ type: "text" }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormField name="email" defaultValue={(user?.email ? (user.email || "").toString() : "")}
                  label="Email"
                  placeholder="example@email.com"
                  onChange={changeHandler}
                  inputProps={{ type: "email" }}
                />  
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormField name="emailConfirmation" defaultValue={(user?.email ? (user.email || "").toString() : "")}
                  label="Confirmation Email"
                  placeholder="example@email.com"
                  inputProps={{ type: "email", pattern: user.email }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormField name="country"  defaultValue={(user?.country ? (user.country || "").toString() : "")}
                label="Country" placeholder="Brazil" inputProps={{ type: "text" }}/>
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormField name="city"  defaultValue={(user?.city ? (user.city || "").toString() : "")}
                label="City" placeholder="Rio de Janeiro" inputProps={{ type: "text" }}/>
              </Grid>
              <Grid item xs={12} md={6}>
                <FormField name="currency" defaultValue={(user?.currency ? (user.currency || "").toString() : "")}
                label="Currency" placeholder="USD" inputProps={{ type: "text" }}/>
              </Grid>
              <Grid item xs={12} md={6}>
                <FormField name="langKey" defaultValue={(user?.langKey ? (user.langKey || "").toString() : "")}
                label="Language" placeholder="PT" inputProps={{ type: "text" }}/>
              </Grid>
              <Grid item xs={12} md={6}>
                <FormField name="telegramUserName" defaultValue={(user?.telegramUserName ? (user.telegramUserName || "").toString() : "")}
                label="Telegram UserName" placeholder="telegramUsername" inputProps={{ type: "text" }}/>
              </Grid>
              <Grid item xs={12} md={6}>
                <FormField name="telegramChatId" defaultValue={(user?.telegramChatId ? (user.telegramChatId || "").toString() : "")}
                label="Telegram ChatId" placeholder="123456" inputProps={{ type: "text" }}/>
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
    </DashboardLayout>
  );
};

export default UserProfile;

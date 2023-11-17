import { useState, useEffect } from "react";
// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";
import MDAlert from "components/MDAlert";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import Autocomplete from "@mui/material/Autocomplete";

// Settings page components
import FormField from "components/FormField";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";

// Overview page components
import selectData from "components/FormField/data/selectData";

import AuthService from "../../services/auth-service";

const UserProfile = () => {
  const [notification, setNotification] = useState(false);
  const [user, setUser] = useState({
    email: "",
  });

  const [errors, setErrors] = useState({
    firstNameError: false,
    emailError: false,
  });
  
  const getUserData = async () => {
    try {
      const response = await AuthService.getProfile();
      if (response.status === 200 && response.data !== null) {
        setUser((prevUser) => ({
          ...prevUser,
          ...response,
        }));
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



  useEffect(() => {
    getUserData();
  }, []);

  const changeHandler = (e) => {
    setUser({
      ...user,
      [e.target.firstName]: e.target.value,
    });
  };

  useEffect(() => {
    if (notification === true) {
      setTimeout(() => {
        setNotification(false);
      }, 5000);
    }
  }, [notification]);

  const submitHandler = async (e) => {
    e.preventDefault();

    const mailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    if (user.email.trim().length === 0 || !user.email.trim().match(mailFormat)) {
      setErrors({ ...errors, emailError: true });
      return;
    }

    let userData = {
      firstName: user.firstName,
      email: user.email,
    };
    // set new user data for call

    // call api for update
    const response = await AuthService.updateProfile(JSON.stringify(userData));

    // reset errors
    setErrors({
      firstNameError: false,
      emailError: false,
      passwordError: false,
      newPassError: false,
      confirmPassError: false,
    });

    setNotification(true);
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox mb={2} />
        <Card id="profile-info" sx={{ overflow: "visible" }}>
          <MDBox p={3}>
            <MDTypography variant="h5">Profile Info</MDTypography>
          </MDBox>
          <MDBox component="form" pb={3} px={3}>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <FormField label="First Name" placeholder="Fernando" />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormField label="Last Name" placeholder="Silva" />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormField label="Country" placeholder="Brazil" />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormField label="City" placeholder="Rio de Janeiro" />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormField
                  label="Email"
                  placeholder="example@email.com"
                  inputProps={{ type: "email" }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormField
                  label="Confirmation Email"
                  placeholder="example@email.com"
                  inputProps={{ type: "email" }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormField
                  label="Phone Number"
                  placeholder="+40 735 631 620"
                  inputProps={{ type: "number" }}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <FormField label="Currency" placeholder="USD" />
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
                  >                   
                  Clear
                </MDButton>
              </Grid>    
            </Grid>
          </MDBox>
        </Card>
        <Footer />
    </DashboardLayout>
  );
};

export default UserProfile;

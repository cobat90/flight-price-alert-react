import React from 'react';
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import Autocomplete from "@mui/material/Autocomplete";
import MDButton from "components/MDButton";


// Material Dashboard 2 PRO React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

// Settings page components
import FormField from "components/FormField";

// Data
import selectData from "components/FormField/data/selectData";

function Header() {
  return (
    <Card id="basic-info" sx={{ overflow: "visible" }}>
      <MDBox p={3}>
        <MDTypography variant="h5">Basic Info</MDTypography>
      </MDBox>
      <MDBox component="form" pb={3} px={3}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <FormField label="First Name" placeholder="Alec" />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormField label="Last Name" placeholder="Thompson" />
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
    
  );
}

export default Header;

// @mui material components
import Grid from "@mui/material/Grid";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import Icon from "@mui/material/Icon";

import {
  Container,
  Card,
  CardHeader,
  CardContent,
  Divider,
  styled,
  List
} from '@mui/material';
import {
  Button as StrapButton,
  Card as StrapCard,
  CardHeader as StrapCardHeader,
  CardBody as StrapCardBody,
  CardFooter as StrapCardFooter,
  CardText as StrapCardText,
  FormGroup as StrapFormGroup,
  Form as StrapForm,
  Input as StrapInput,
  Row as StrapRow,
  Col as StrapCol,
} from "reactstrap";
import CardActions from '@mui/material/CardActions';

import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import CardMedia from '@mui/material/CardMedia';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Modal from '@mui/material/Modal';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';


// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import ReportsBarChart from "examples/Charts/BarCharts/ReportsBarChart";
import ReportsLineChart from "examples/Charts/LineCharts/ReportsLineChart";
import ComplexStatisticsCard from "examples/Cards/StatisticsCards/ComplexStatisticsCard";

import MDButton from "components/MDButton";
// Data
import reportsLineChartData from "layouts/dashboard/data/reportsLineChartData";

// Dashboard components
import Projects from "layouts/dashboard/components/Projects";
import OrdersOverview from "layouts/dashboard/components/OrdersOverview";

import FlightPriceAlertService from "../../services/flight-price-alert-service";

import { useState, useEffect } from "react";

function Dashboard() {
  const { sales, tasks } = reportsLineChartData;
  const userId = localStorage.getItem("userId");

  const [alerts, setAlerts] = useState([
  ]);

  const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest
  })
}));

const bull = (
  <Box
    component="span"
    sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
  >
  </Box>
);

  const [expanded, setExpanded] = useState(false);

  const handleExpandClick = () => {
  setExpanded(!expanded);
  };


  function formatDate(inputDate) {
    const date = new Date(inputDate); // Parse the input date string
    const day = String(date.getDate()).padStart(2, '0'); // Get the day and format it with leading zero
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Get the month (0-based) and format it with leading zero
    const year = date.getFullYear(); // Get the year
  
    return `${day}/${month}/${year}`; // Format the date as "dd/mm/yyyy"
  }

  const [modalMenu, setModalMenu] = useState(null);
  const openModalMenu = (event, alert) => { 
    setModalMenu(event.currentTarget);
  };
  const closeModalMenu = () => setModalMenu(null);

  const modalCreateAlertMenu = ( 
    <>
        <div className="content">
          <StrapRow>
            <StrapCol md="8">
              <StrapCard>
                <CardHeader>
                  <h5 className="title">Edit Profile</h5>
                </CardHeader>
                <StrapCardBody>
                  <StrapForm>
                    <StrapRow>
                      <StrapCol className="pr-md-1" md="5">
                        <StrapFormGroup>
                          <label>Company (disabled)</label>
                          <StrapInput
                            defaultValue="Creative Code Inc."
                            disabled
                            placeholder="Company"
                            type="text"
                          />
                        </StrapFormGroup>
                      </StrapCol>
                      <StrapCol className="px-md-1" md="3">
                        <StrapFormGroup>
                          <label>Username</label>
                          <StrapInput
                            defaultValue="michael23"
                            placeholder="Username"
                            type="text"
                          />
                        </StrapFormGroup>
                      </StrapCol>
                      <StrapCol className="pl-md-1" md="4">
                        <StrapFormGroup>
                          <label htmlFor="exampleInputEmail1">
                            Email address
                          </label>
                          <StrapInput placeholder="mike@email.com" type="email" />
                        </StrapFormGroup>
                      </StrapCol>
                    </StrapRow>
                    <StrapRow>
                      <StrapCol className="pr-md-1" md="6">
                        <StrapFormGroup>
                          <label>First Name</label>
                          <StrapInput
                            defaultValue="Mike"
                            placeholder="Company"
                            type="text"
                          />
                        </StrapFormGroup>
                      </StrapCol>
                      <StrapCol className="pl-md-1" md="6">
                        <StrapFormGroup>
                          <label>Last Name</label>
                          <StrapInput
                            defaultValue="Andrew"
                            placeholder="Last Name"
                            type="text"
                          />
                        </StrapFormGroup>
                      </StrapCol>
                    </StrapRow>
                    <StrapRow>
                      <StrapCol md="12">
                        <StrapFormGroup>
                          <label>Address</label>
                          <StrapInput
                            defaultValue="Bld Mihail Kogalniceanu, nr. 8 Bl 1, Sc 1, Ap 09"
                            placeholder="Home Address"
                            type="text"
                          />
                        </StrapFormGroup>
                      </StrapCol>
                    </StrapRow>
                    <StrapRow>
                      <StrapCol className="pr-md-1" md="4">
                        <StrapFormGroup>
                          <label>City</label>
                          <StrapInput
                            defaultValue="Mike"
                            placeholder="City"
                            type="text"
                          />
                        </StrapFormGroup>
                      </StrapCol>
                      <StrapCol className="px-md-1" md="4">
                        <StrapFormGroup>
                          <label>Country</label>
                          <StrapInput
                            defaultValue="Andrew"
                            placeholder="Country"
                            type="text"
                          />
                        </StrapFormGroup>
                      </StrapCol>
                      <StrapCol className="pl-md-1" md="4">
                        <StrapFormGroup>
                          <label>Postal Code</label>
                          <StrapInput placeholder="ZIP Code" type="number" />
                        </StrapFormGroup>
                      </StrapCol>
                    </StrapRow>
                    <StrapRow>
                      <StrapCol md="8">
                        <StrapFormGroup>
                          <label>About Me</label>
                          <StrapInput
                            cols="80"
                            defaultValue="Lamborghini Mercy, Your chick she so thirsty, I'm in
                              that two seat Lambo."
                            placeholder="Here can be your description"
                            rows="4"
                            type="textarea"
                          />
                        </StrapFormGroup>
                      </StrapCol>
                    </StrapRow>
                  </StrapForm>
                </StrapCardBody>
                <StrapCardFooter>
                  <Button className="btn-fill" color="primary" type="submit">
                    Save
                  </Button>
                </StrapCardFooter>
              </StrapCard>
            </StrapCol>
            <StrapCol md="4">
              <StrapCard className="card-user">
                <StrapCardBody>
                  <StrapCardText />
                  <div className="author">
                    <div className="block block-one" />
                    <div className="block block-two" />
                    <div className="block block-three" />
                    <div className="block block-four" />
                    <a href="#pablo" onClick={(e) => e.preventDefault()}>

                      <h5 className="title">Mike Andrew</h5>
                    </a>
                    <p className="description">Ceo/Co-Founder</p>
                  </div>
                  <div className="card-description">
                    Do not be scared of the truth because we need to restart the
                    human foundation in truth And I love you like Kanye loves
                    Kanye I love Rick Owens’ bed design but the back is...
                  </div>
                </StrapCardBody>
                <StrapCardFooter>
                  <div className="button-container">
                    <StrapButton className="btn-icon btn-round" color="facebook">
                      <i className="fab fa-facebook" />
                    </StrapButton>
                    <StrapButton className="btn-icon btn-round" color="twitter">
                      <i className="fab fa-twitter" />
                    </StrapButton>
                    <StrapButton className="btn-icon btn-round" color="google">
                      <i className="fab fa-google-plus" />
                    </StrapButton>
                  </div>
                </StrapCardFooter>
              </StrapCard>
            </StrapCol>
          </StrapRow>
        </div>
        </>
  );
  
  const [menu, setMenu] = useState(null);
  const openMenu = (event, alert) => { 
    setMenu(event.currentTarget);
  };
  const closeMenu = () => setMenu(null);

  const dropdownMenu = (
    <Menu
      anchorEl={menu}
      anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
      transformOrigin={{ vertical: "top", horizontal: "left" }}
      open={Boolean(menu)}
      onClose={closeMenu}
    >
      <MenuItem onClick={openModalMenu}>Edit</MenuItem>
      {modalMenu && (
        <div>
          {modalCreateAlertMenu}
        </div>
      )}
      <MenuItem onClick={closeMenu}>Disable</MenuItem>
      <MenuItem onClick={closeMenu}>Delete</MenuItem>
    </Menu>
  );

 
  const getAlertsData = async () => {
    try {
      const response = await FlightPriceAlertService.findAllAlerts(userId);
      if (Array.isArray(response)) {

        setAlerts(response);
      } else {
        console.error("Invalid data format in response:", response);
      }
    } catch (error) {
      console.error("Error fetching alerts:", error);
    }
  };

  useEffect(() => {
    getAlertsData();
  }, []);

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox py={3}>
        <Grid container spacing={3}>
        {alerts.map((alert, index) => (
          <Grid item xs={16} md={8} lg={4} key={index}>
            <MDBox mb={3}>
              <Card sx={{ maxWidth: 345, opacity: alert.alert?.alertDisabled ? 0.6 : 1 }} id={`menu-${index}`}>
                <CardHeader
                  avatar={
                    <Icon>flight</Icon>
                  }
                  action={
                    <div>
                      <IconButton aria-label="settings" onClick={(event) => openMenu(event, alert)}>
                        <MoreVertIcon />
                      </IconButton>
                      {menu && (
                        <div>
                          {dropdownMenu}
                        </div>
                      )}
                    </div>
                  }
                  title={alert.alert?.alertName}
                  subheader={"Created: " + formatDate(alert.alert?.alertDateCreated)}
                />
                <ReportsLineChart
                  color="success"
                  title="monthly prices"
                  description={
                    <>
                      (<strong>+15%</strong>) increase in today prices.
                    </>
                  }
                  date="updated 5 min ago"
                  chart={sales}
                />
                <CardContent>
                  <Typography variant="body2" color="text.secondary" height="200">
                  <Box sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>                 
                    <List>
                      <ListItem disablePadding>
                          <ListItemText primary={"Type: " + alert.alert?.alertType} />
                      </ListItem>
                      <ListItem disablePadding>
                          <ListItemText primary={"Duration: " + alert.alert?.alertDurationTime} />
                      </ListItem>
                      {alert.alert?.alertDisabled === true ? (
                        <ListItem disablePadding>
                            <ListItemText primary={"Disabled: " + formatDate(alert.alert?.alertDateDisabled)} />
                        </ListItem>
                        ) : null}
                    </List>
                  </Box>
                  </Typography>
                </CardContent>
                <CardActions disableSpacing>
                  <IconButton aria-label="add to favorites">
                    <FavoriteIcon />
                  </IconButton>
                  <IconButton aria-label="share">
                    <ShareIcon />
                  </IconButton>
                  <ExpandMore
                    expand={expanded}
                    onClick={handleExpandClick}
                    aria-expanded={expanded}
                    aria-label="show more"
                  >
                    <ExpandMoreIcon />
                  </ExpandMore>
                </CardActions>
                <Collapse in={expanded} timeout="auto" unmountOnExit>
                  <CardContent>
                    <Typography paragraph>
                    <List>
                      <ListItem disablePadding>
                        <div style={{ display: 'flex', justifyContent: 'space-between', margin: '10px' }}>
                        <ListItemText primary={<span style={{ fontSize: '16px', marginRight: '8px' }}>{"Adults: " + alert.mainFilter?.adults}</span>} />
                        <ListItemText primary={<span style={{ fontSize: '16px', marginRight: '8px' }}>{"Children: " + alert.mainFilter?.children}</span>} />
                        <ListItemText primary={<span style={{ fontSize: '16px'}}>{"Cabin Class: " + alert.mainFilter?.cabinClassType}</span>} />
                        </div>
                      </ListItem>
                      <ListItem disablePadding>
                        <div style={{ display: 'flex', justifyContent: 'space-between', margin: '10px' }}>
                          <ListItemText primary={<span style={{ fontSize: '16px', marginRight: '8px' }}>{"Flight: " + alert.mainFilter?.flight.flightType}</span>} />
                          <ListItemText primary={<span style={{ fontSize: '16px', marginRight: '8px' }}>{"Depart: " + alert.mainFilter?.flight.departDate}</span>} />
                          <ListItemText primary={<span style={{ fontSize: '16px'}}>{"Return: " + alert.mainFilter?.flight.returnDate}</span>} />
                        </div>
                      </ListItem>
                      <ListItem disablePadding>
                        <div style={{ display: 'flex', justifyContent: 'space-between', margin: '10px' }}>
                          <ListItemText primary={<span style={{ fontSize: '16px', marginRight: '15px' }}>{"From: " + (alert.mainFilter?.flight.airports[0].airportFrom || "N/A")}</span>} />
                          <ListItemText primary={<span style={{ fontSize: '16px', marginRight: '15px'  }}>{"To: " + (alert.mainFilter?.flight.airports[0].airportTo || "N/A")}</span>} />
                          <ListItemText primary={<span style={{ fontSize: '16px'  }}>{"Scales: " + (alert.mainFilter?.flight.airports[0].airportScales || "N/A")}</span>} />
                        </div>
                      </ListItem>
                      </List>
                    </Typography>                 
                  </CardContent>
                </Collapse>
              </Card>
            </MDBox>
          </Grid>
          ))}
          
          <Grid item xs={16} md={8} lg={4}>
            <MDBox display="flex" justifyContent="center" mb={3}>
              <Card >
                <MDButton
                  variant="gradient"
                  color="info"
                  fullWidth
                  type="button"
                  onClick={openModalMenu}
                >
                  Create New Alert
                </MDButton>
              </Card>
            </MDBox>
          </Grid>
        </Grid>    
        <MDBox>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6} lg={8}>
              <Projects />
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <OrdersOverview />
            </Grid>
          </Grid>
        </MDBox>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Dashboard;

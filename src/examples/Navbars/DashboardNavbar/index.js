import { useState, useEffect, useContext } from "react";

// react-router components
import { useLocation, Link, useNavigate } from "react-router-dom";

// prop-types is a library for typechecking of props.
import PropTypes from "prop-types";

// @material-ui core components
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import Icon from "@mui/material/Icon";
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import ShoppingCart from '@mui/icons-material/ShoppingCart';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import HomeIcon from '@mui/icons-material/Home';
import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import MDBadge from "components/MDBadge";
import MDBox from "components/MDBox";
import Breadcrumbs from "examples/Breadcrumbs";
import NotificationItem from "examples/Items/NotificationItem";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Typography from '@mui/material/Typography';
import botChatIdImage from "assets/images/bot-chatid.png";
import botSearchImage from "assets/images/bot-search.png";
import Button from '@mui/material/Button';
import Tooltip from "@mui/material/Tooltip";

import {
  navbar,
  navbarContainer,
  navbarRow,
  navbarIconButton,
  navbarMobileMenu,
} from "examples/Navbars/DashboardNavbar/styles";

import {
  useMaterialUIController,
  setTransparentNavbar,
  setMiniSidenav,
} from "context";
import { AuthContext } from "context";

function DashboardNavbar({ absolute, light, isMini }) {
  const authContext = useContext(AuthContext);
  const [navbarType, setNavbarType] = useState();
  const [controller, dispatch] = useMaterialUIController();
  const { miniSidenav, transparentNavbar, fixedNavbar, darkMode } = controller;
  const [openMenu, setOpenMenu] = useState(false);
  const [openDialogTutorial, setOpenDialogTutorial] = useState(false);
  const route = useLocation().pathname.split("/").slice(1);
  const navigate = useNavigate();

  useEffect(() => {

    if (fixedNavbar) {
      setNavbarType("sticky");
    } else {
      setNavbarType("static");
    }

    function handleTransparentNavbar() {
      setTransparentNavbar(dispatch, (fixedNavbar && window.scrollY === 0) || !fixedNavbar);
    }

    window.addEventListener("scroll", handleTransparentNavbar);
    handleTransparentNavbar();

    return () => window.removeEventListener("scroll", handleTransparentNavbar);
  }, [dispatch, fixedNavbar]);

  const handleOpenMenu = (event) => setOpenMenu(event.currentTarget);
  const handleCloseMenu = () => setOpenMenu(false);
  const handleDialogTutorialClose = () => { setOpenDialogTutorial(false); };

  const renderMenu = () => (
    <Menu
      anchorEl={openMenu}
      anchorReference={null}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "left",
      }}
      open={Boolean(openMenu)}
      onClose={handleCloseMenu}
      sx={{ mt: 2 }}
      disableScrollLock={ true }
    >
      <NotificationItem icon={<Icon>person</Icon>} title={localStorage.getItem('login')} link="/user-profile" />
      <NotificationItem icon={<Icon>settings</Icon>} title="Settings" link='/settings' />
      <NotificationItem icon={<ShoppingCart sx={iconsStyle} />} title="Add Balance" link='/plan-selection' />
      <NotificationItem icon={<Icon>logout</Icon>} title="Logout" onClick={handleLogOut}/>
    </Menu>
  );

  const iconsStyle = ({ palette: { dark, white, text }, functions: { rgba } }) => ({
    color: () => {
      let colorValue = light || darkMode ? white.main : dark.main;

      if (transparentNavbar && !light) {
        colorValue = darkMode ? rgba(text.main, 0.6) : text.main;
      }

      return colorValue;
    },
  });

  const handleLogOut = async () => {
    authContext.logout();
  };

  return (
    
    <AppBar
      position={absolute ? "absolute" : navbarType}
      color="inherit"
      sx={(theme) => navbar(theme, { transparentNavbar, absolute, light, darkMode })}
    >
      <Toolbar sx={(theme) => navbarContainer(theme)}>
        <MDBox color="inherit" mb={{ xs: 1, md: 0 }} sx={(theme) => navbarRow(theme, { isMini })}>
          <Breadcrumbs icon="home" title={route[route.length - 1]} route={route} light={light} />
        </MDBox>
        {isMini ? null : (
          <MDBox sx={(theme) => navbarRow(theme, { isMini })}>
            <MDBox display="flex" alignItems="center" color={light ? "white" : "inherit"}>
              <Tooltip title="Home page" placement="bottom">
                <IconButton
                  size="medium"
                  disableRipple
                  color="inherit"
                  sx={navbarIconButton}
                  aria-controls="notification-menu"
                  aria-haspopup="true"
                  variant="contained"
                  onClick={() => navigate('/dashboard')}
                >
                  <HomeIcon sx={iconsStyle} />
                </IconButton>
              </Tooltip>
              <Tooltip title="Tutorial" placement="bottom">
                <IconButton
                  size="medium"
                  disableRipple
                  color="inherit"
                  sx={navbarIconButton}
                  aria-controls="notification-menu"
                  aria-haspopup="true"
                  variant="contained"
                  onClick={() => setOpenDialogTutorial(true)}
                >
                  <AutoStoriesIcon sx={iconsStyle} />
                </IconButton>
              </Tooltip>
                <IconButton
                  size="medium"
                  disableRipple
                  color="inherit"
                  sx={navbarIconButton}
                  onClick={handleOpenMenu}
                >                
                <AccountCircleIcon sx={iconsStyle}/>
              </IconButton>
              {renderMenu()}
              <Tooltip title="Available Balance" placement="bottom">
                <IconButton
                  size="medium"
                  disableRipple
                  color="inherit"
                  sx={navbarIconButton}
                  aria-controls="notification-menu"
                  aria-haspopup="true"
                  variant="contained"
                >
                  <MDBadge badgeContent={localStorage.getItem('alert_time')} max={9999} color="error" size="xs" circular>
                    <AccessTimeIcon sx={iconsStyle} />
                  </MDBadge>
                </IconButton>
              </Tooltip>
            </MDBox>
          </MDBox>
        )}
      </Toolbar>
      <Dialog
      open={openDialogTutorial}
      onClose={handleDialogTutorialClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      disableScrollLock={ true } >             
      <DialogTitle id="alert-dialog-title">
        {"Tutorial"}
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          <Typography component="span" variant="inherit" color="info">
            <b>Alerts Balance</b>
          </Typography>
          <br/>
          For each alert is verified on the interval of 30 minutes. The duration of each alert is counted for each time the price is verified and added in history.
          You can verify how much balance your alert or how much balance available for use on the right top corner of the page.
          <br/>
          <br/>
          <Typography component="span" variant="inherit" color="info">
          <b>Price Types</b>
          </Typography>          
          <br/>
          Every: Receive an alert every price found.
          <br/>
          Lowest: Receive an alert every time a price lower than the previous was found.
          <br/>
          Range: Define the range of prices or dates to receive an alert.
          <br/>
          <br/>
          <Typography component="span" variant="inherit" color="info">
          <b>Flight Types</b>
          </Typography>
          <br/>
          One Way: For defined date one way flights.
          <br/>
          Roundtrip: For defined dates round-trip flights.
          <br/>
          Cheapest: For flexible dates and can be used with range of dates and prices on preferences filter.
          <br/>
          Month: For flexible dates for one month and can be used with range preferences filter too.
          <br/>
          Multicity: For multi destinations and defined dates for each one. Up to 3 destinations.
          <br/>
          <br/>
          <Typography component="span" variant="inherit" color="info">
          <b>Alert types</b>
          </Typography>
          <br/>
          Email: The notification you be sent in your registered email.
          <br/>
          SMS: Only is necessary to verify your phone number in User Profile.
          <br/>
          Telegram:
          <br/>
          In Telegram app look for <b>"Ittent"</b> or <b>"@ittent_bot"</b>. 
          <br/>
          <img src={botSearchImage} alt="Bot Search" />
          <br/>
          Type <b>/username</b> (To get your Telegram Username) and <b>/chatId</b> (To get your Telegram ChatId).
          <br/>
          <img src={botChatIdImage} alt="Bot ChatId" />       
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleDialogTutorialClose} autoFocus> Ok </Button>             
      </DialogActions>
    </Dialog>
    </AppBar>    
  );
}

// Setting default values for the props of DashboardNavbar
DashboardNavbar.defaultProps = {
  absolute: false,
  light: false,
  isMini: false,
};

// Typechecking props for the DashboardNavbar
DashboardNavbar.propTypes = {
  absolute: PropTypes.bool,
  light: PropTypes.bool,
  isMini: PropTypes.bool,
};

export default DashboardNavbar;

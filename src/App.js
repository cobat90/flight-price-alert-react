import { useState, useEffect, useMemo, useContext } from "react";
import { Routes, Route, Navigate, useLocation, useNavigate } from "react-router-dom";

// @mui material components
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Sidenav from "examples/Sidenav";
import theme from "assets/theme";
import themeDark from "assets/theme-dark";

import routes from "routes";

import { useMaterialUIController, setMiniSidenav } from "context";

// Images
import brandWhite from "assets/images/logos/logo_ittent_big.png";
import brandDark from "assets/images/logos/logo_ittent_big.png";

import { setupAxiosInterceptors } from "./services/interceptor";
import ProtectedRoute from "examples/ProtectedRoute";
import Login from "auth/login";
import ForgotPasswordInit from "auth/forgot-password-init";
import ForgotPasswordFinish from "auth/forgot-password-finish";
import Callback from "auth/google/callback";
import Register from "auth/register";
import { AuthContext } from "context";
import UserProfile from "layouts/user-profile";
import Settings from "layouts/settings";
import PlanSelection from "layouts/plan-selection";
import LandingPage from "layouts/landing-page";
import AboutUsPage from "layouts/about-us-page";

export default function App() {
  const authContext = useContext(AuthContext);
  const [controller, dispatch] = useMaterialUIController();
  const {
    miniSidenav,
    direction,
    layout, // Used to determine when to render the Sidenav
    sidenavColor,
    transparentSidenav,
    whiteSidenav,
    darkMode,
  } = controller;
  const [onMouseEnter, setOnMouseEnter] = useState(false);
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const handleOnMouseEnter = () => {
    if (miniSidenav && !onMouseEnter) {
      setMiniSidenav(dispatch, false);
      setOnMouseEnter(true);
    }
  };

  const handleOnMouseLeave = () => {
    if (onMouseEnter) {
      setMiniSidenav(dispatch, true);
      setOnMouseEnter(false);
    }
  };

  // Logout and navigate to login page if token expires
  setupAxiosInterceptors(() => {
    authContext.logout();
    navigate("/auth/login");
  });

  // Set document direction
  useEffect(() => {
    document.body.setAttribute("dir", direction);
  }, [direction]);

  // Scroll to top when route changes
  useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
  }, [pathname]);

  const getRoutes = (allRoutes) =>
    
    allRoutes.map((route) => {
      if (route.collapse) {
        return getRoutes(route.collapse);
      }
      if (route.route && route.type !== "auth") {
        return (
          <Route
            exact
            path={route.route}
            element={
              <ProtectedRoute isAuthenticated={authContext.isAuthenticated}>
                {route.component}
              </ProtectedRoute>
            }
            key={route.key}
          />
        );
      }
      return null;
    });

  return (
    <ThemeProvider theme={darkMode ? themeDark : theme}>
      <CssBaseline />
      {layout === "dashboard" && (
        <Sidenav
          color={sidenavColor}
          brand={(transparentSidenav && !darkMode) || whiteSidenav ? brandDark : brandWhite}
          brandName="Ittent"
          routes={routes}
          onMouseEnter={handleOnMouseEnter}
          onMouseLeave={handleOnMouseLeave}
        />
      )}
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/about-us" element={<AboutUsPage />} />
        <Route path="/auth/login" element={<Login />} />
        <Route path="/auth/register" element={<Register />} />
        <Route path="/auth/forgot-password-init" element={<ForgotPasswordInit />} />
        <Route path="/auth/forgot-password-finish" element={<ForgotPasswordFinish />} />
        <Route path="/auth/google/callback" element={<Callback />} />
        <Route exact path="/settings"
          element={
            <ProtectedRoute isAuthenticated={authContext.isAuthenticated}>
              <Settings />
            </ProtectedRoute>
          }
        /> 
        <Route exact path="/plan-selection"
          element={
              <PlanSelection />
          }
          /> 
        <Route
          exact
          path="/user-profile"
          element={
            <ProtectedRoute isAuthenticated={authContext.isAuthenticated}>
              <UserProfile />
            </ProtectedRoute>
          }
        />
        {getRoutes(routes)}
        <Route path="*" element={<Navigate to="/dashboard" />} />
      </Routes>
    </ThemeProvider>
  );
}
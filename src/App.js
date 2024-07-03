import { useState, useEffect, useMemo, useContext } from "react";

// react-router components
import { Routes, Route, Navigate, useLocation, useNavigate } from "react-router-dom";

// @mui material components
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Icon from "@mui/material/Icon";

import MDBox from "components/MDBox";

import Sidenav from "examples/Sidenav";
import theme from "assets/theme";
import themeDark from "assets/theme-dark";

import routes from "routes";

import { useMaterialUIController, setMiniSidenav } from "context";

// Images
import brandWhite from "assets/images/logo-ct.png";
import brandDark from "assets/images/logo-ct-dark.png";

import { setupAxiosInterceptors } from "./services/interceptor";
import ProtectedRoute from "examples/ProtectedRoute";
import ForgotPasswordInit from "auth/forgot-password-init";
import ForgotPasswordFinish from "auth/forgot-password-finish";
import Login from "auth/login";
import Register from "auth/register";
import { AuthContext } from "context";
import UserProfile from "layouts/user-profile";
import UserManagement from "layouts/user-management";
import Settings from "layouts/settings";
import { Helmet } from "react-helmet";

export default function App() {

  const authContext = useContext(AuthContext);

  const [controller, dispatch] = useMaterialUIController();
  const {
    miniSidenav,
    direction,
    layout,
    sidenavColor,
    transparentSidenav,
    whiteSidenav,
    darkMode,
  } = controller;
  const [onMouseEnter, setOnMouseEnter] = useState(false);
  const { pathname } = useLocation();

  // Open sidenav when mouse enter on mini sidenav
  const handleOnMouseEnter = () => {
    if (miniSidenav && !onMouseEnter) {
      setMiniSidenav(dispatch, false);
      setOnMouseEnter(true);
    }
  };

  // Close sidenav when mouse leave mini sidenav
  const handleOnMouseLeave = () => {
    if (onMouseEnter) {
      setMiniSidenav(dispatch, true);
      setOnMouseEnter(false);
    }
  };

  // if the token expired or other errors it logs out and goes to the login page
  const navigate = useNavigate();
  setupAxiosInterceptors(() => {
      let userData= {
        AccessToken: localStorage.getItem("token"),
      }
      authContext.logout(userData);
      navigate("/auth/login");
  });

  // Setting the dir attribute for the body element
  useEffect(() => {
    document.body.setAttribute("dir", direction);
  }, [direction]);

  // Setting page scroll to 0 when changing the route
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
    <>
      {
        <ThemeProvider theme={darkMode ? themeDark : theme}>
          <CssBaseline />
          {layout === "dashboard" && (
            <>
              <Sidenav
                color={sidenavColor}
                brand={(transparentSidenav && !darkMode) || whiteSidenav ? brandDark : brandWhite}
                brandName="Ittent"
                routes={routes}
                onMouseEnter={handleOnMouseEnter}
                onMouseLeave={handleOnMouseLeave}
              />
            </>
          )}
          {layout === "vr"}
          <Routes>
            <Route path="/auth/login" element={<Login />} />
            <Route path="/auth/register" element={<Register />} />
            <Route path="/auth/forgot-password-init" element={<ForgotPasswordInit />} />
            <Route path="/auth/forgot-password-finish" element={<ForgotPasswordFinish />} />           
            <Route exact path="/settings" element={<Settings />} />
            <Route
              exact
              path="user-profile"
              element={
                <ProtectedRoute isAuthenticated={authContext.isAuthenticated}>
                  <UserProfile />
                </ProtectedRoute>
              }
              key="user-profile"
            />
            <Route
              exact
              path="user-management"
              element={
                <ProtectedRoute isAuthenticated={authContext.isAuthenticated}>
                  <UserManagement />
                </ProtectedRoute>
              }
              key="user-management"
            />
            {getRoutes(routes)}
            <Route path="*" element={<Navigate to="/dashboard" />} />
          </Routes>
        </ThemeProvider>
      }
    </>
  );
}

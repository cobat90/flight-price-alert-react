import { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "context";

const Callback = () => {
  const navigate = useNavigate();
  const authContext = useContext(AuthContext);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get("code");
    const error = urlParams.get("error");

    if (code) {
      exchangeAuthorizationCode(code);
      navigate("/dashboard");
    } else if (error) {
      console.error("Error during login:", urlParams.get("error_description"));
      navigate("/login");
    }
  }, [navigate]);


  const exchangeAuthorizationCode = async (code) => {
    try {
      const response = await fetch(
        "https://ittent-alert.auth.us-east-2.amazoncognito.com/oauth2/token",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: new URLSearchParams({
            grant_type: "authorization_code",
            client_id: process.env.REACT_APP_COGNITO_CLIENTID,
            code: code,
            redirect_uri: "https://ittent.net/auth/google/callback",
          }),
        }
      );
      if (!response.ok) {
        const errorResponse = await response.json();
        console.error("Token exchange error:", errorResponse);
        return;
      }
      const tokens = await response.json();
      authContext.login(tokens.access_token);
    } 
    catch (error) {
      if (error.response && error.response.data && error.response.data.message) {
        console.error(error.response.data.message);
      } else {
        console.error("Exchange Authorization Code failed:", error);
      }
    }
  };

  return <div>Loading...</div>;
};

export default Callback;

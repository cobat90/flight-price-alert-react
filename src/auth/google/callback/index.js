import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Callback = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Extract query parameters (e.g., authorization code or error)
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get("code");
    const error = urlParams.get("error");

    if (code) {
      // Exchange the code for tokens using your backend or directly if you use AWS Amplify
      console.log("Authorization code received:", code);
      exchangeAuthorizationCode(code);
      navigate("/dashboard");
    } else if (error) {
      console.error("Error during login:", urlParams.get("error_description"));
      // Handle error (redirect to login page, show error message, etc.)
      navigate("/login");
    }
  }, [navigate]);

  const exchangeAuthorizationCode = async (code) => {
    const response = await fetch("https://ittent-alert.auth.us-east-2.amazoncognito.com/oauth2/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        grant_type: "authorization_code",
        client_id: process.env.REACT_APP_COGNITO_CLIENTID,
        code: code,
        redirect_uri: "https://localhost:3000/auth/googlecallback",
      }),
    });
    console.log("exchangeAuthorizationCode response: ", response);
    const tokens = await response.json();
    console.log("Tokens:", tokens);
  };
  

  return <div>Loading...</div>;
};

export default Callback;

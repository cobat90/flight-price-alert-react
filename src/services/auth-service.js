import { userAxiosInstance } from "./http.service";
const API_COGNITO_URL = process.env.REACT_APP_API_URL_USER;

class AuthService {

  login = async (payload) => {
    const headers= { 'Content-Type': 'application/x-amz-json-1.1',
      'X-Amz-Target': 'AWSCognitoIdentityProviderService.InitiateAuth' };
    return await userAxiosInstance.post(API_COGNITO_URL, payload, { headers });
  };

  register = async (payload) => {
    const headers= { 'Content-Type': 'application/x-amz-json-1.1',
      'X-Amz-Target': 'AWSCognitoIdentityProviderService.SignUp' };
    return await userAxiosInstance.post(API_COGNITO_URL, payload, { headers });
  };

  logout = async (payload) => {
    const headers= { 'Content-Type': 'application/x-amz-json-1.1',
      'X-Amz-Target': 'AWSCognitoIdentityProviderService.GlobalSignOut' };
    return await userAxiosInstance.post(API_COGNITO_URL, payload, { headers });
  };

  forgotPasswordInit = async (payload) => {
    const headers= { 'Content-Type': 'application/x-amz-json-1.1',
      'X-Amz-Target': 'AWSCognitoIdentityProviderService.ForgotPassword' };
    return await userAxiosInstance.post(API_COGNITO_URL, payload, { headers });
  }

  forgotPasswordFinish = async (payload) => {
    const headers= { 'Content-Type': 'application/x-amz-json-1.1',
      'X-Amz-Target': 'AWSCognitoIdentityProviderService.ConfirmForgotPassword' };
    return await userAxiosInstance.post(API_COGNITO_URL, payload, { headers });
  }

  changePassword = async (payload) => {
    const headers= { 'Content-Type': 'application/x-amz-json-1.1',
      'X-Amz-Target': 'AWSCognitoIdentityProviderService.ChangePassword' };
    return await userAxiosInstance.post(API_COGNITO_URL, payload, { headers });
  }

  getProfile = async(payload) => {
    const headers= { 'Content-Type': 'application/x-amz-json-1.1',
      'X-Amz-Target': 'AWSCognitoIdentityProviderService.GetUser' };
    return await userAxiosInstance.post(API_COGNITO_URL, payload, { headers });
  }

  updateProfile = async (payload) => {
    const headers= { 'Content-Type': 'application/x-amz-json-1.1',
      'X-Amz-Target': 'AWSCognitoIdentityProviderService.UpdateUserAttributes' };
    return await userAxiosInstance.post(API_COGNITO_URL, payload, { headers });
  }

  deleteAccount = async (payload) => {
    const headers= { 'Content-Type': 'application/x-amz-json-1.1',
      'X-Amz-Target': 'AWSCognitoIdentityProviderService.DeleteUser' };
    return await userAxiosInstance.post(API_COGNITO_URL, payload, { headers });
  }

  disableAccount = async (payload) => {
    const headers= { 'Content-Type': 'application/x-amz-json-1.1',
      'X-Amz-Target': 'AWSCognitoIdentityProviderService.AdminDisableUser' };
    return await userAxiosInstance.post(API_COGNITO_URL, payload, { headers });
  }

  resendConfirmationCode = async (payload) => {
    const headers= { 'Content-Type': 'application/x-amz-json-1.1',
      'X-Amz-Target': 'AWSCognitoIdentityProviderService.ResendConfirmationCode' };
    return await userAxiosInstance.post(API_COGNITO_URL, payload, { headers });
  }

}

export default new AuthService();

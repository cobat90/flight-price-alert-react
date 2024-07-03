import { userAxiosInstance } from "./http.service";
const API_COGNITO_URL = process.env.COGNITO_URL;

class AuthService {

  login = async (payload) => {
    const headers= { 'Content-Type': 'application/x-amz-json-1.1', 'Access-Control-Allow-Credentials': true,
       'X-Amz-Target': 'AWSCognitoIdentityProviderService.InitiateAuth' };
    return await userAxiosInstance.post(API_COGNITO_URL, headers, payload);
  };

  register = async (credentials) => {
    const headers= { 'Content-Type': 'application/x-amz-json-1.1', 'Access-Control-Allow-Credentials': true,
      'X-Amz-Target': 'AWSCognitoIdentityProviderService.SignUp' };
    return await userAxiosInstance.post(API_COGNITO_URL, headers, credentials);
  };

  logout = async (payload) => {
    const headers= { 'Content-Type': 'application/x-amz-json-1.1', 'Access-Control-Allow-Credentials': true,
      'X-Amz-Target': 'AWSCognitoIdentityProviderService.GlobalSignOut' };
    return await userAxiosInstance.post(API_COGNITO_URL, headers, payload);
  };

  forgotPasswordInit = async (payload) => {
    const headers= { 'Content-Type': 'application/x-amz-json-1.1', 'Access-Control-Allow-Credentials': true,
      'X-Amz-Target': 'AWSCognitoIdentityProviderService.ForgotPassword' };
    return await userAxiosInstance.post(API_COGNITO_URL, headers, payload);
  }

  forgotPasswordFinish = async (payload) => {
    const headers= { 'Content-Type': 'application/x-amz-json-1.1', 'Access-Control-Allow-Credentials': true,
      'X-Amz-Target': 'AWSCognitoIdentityProviderService.ConfirmForgotPassword' };
    return await userAxiosInstance.post(API_COGNITO_URL, headers, payload);
  }

  changePassword = async (payload) => {
    const headers= { 'Content-Type': 'application/x-amz-json-1.1', 'Access-Control-Allow-Credentials': true,
      'X-Amz-Target': 'AWSCognitoIdentityProviderService.ChangePassword' };
    return await userAxiosInstance.post(API_COGNITO_URL, headers, payload);
  }

  getProfile = async(payload) => {
    const headers= { 'Content-Type': 'application/x-amz-json-1.1', 'Access-Control-Allow-Credentials': true,
      'X-Amz-Target': 'AWSCognitoIdentityProviderService.GetUser' };
    return await userAxiosInstance.post(API_COGNITO_URL, headers, payload);
  }

  updateProfile = async (payload) => {
    const headers= { 'Content-Type': 'application/x-amz-json-1.1', 'Access-Control-Allow-Credentials': true,
      'X-Amz-Target': 'AWSCognitoIdentityProviderService.UpdateUserAttributes' };
    return await userAxiosInstance.put(API_COGNITO_URL, headers, payload);
  }

  deleteAccount = async (payload) => {
    const headers= { 'Content-Type': 'application/x-amz-json-1.1', 'Access-Control-Allow-Credentials': true,
      'X-Amz-Target': 'AWSCognitoIdentityProviderService.DeleteUser' };
    return await userAxiosInstance.delete(API_COGNITO_URL, headers, payload);
  }

  disableAccount = async (payload) => {
    const headers= { 'Content-Type': 'application/x-amz-json-1.1', 'Access-Control-Allow-Credentials': true,
      'X-Amz-Target': 'AWSCognitoIdentityProviderService.AdminDisableUser' };
    return await userAxiosInstance.get(API_COGNITO_URL, headers, payload);
  }

  resendConfirmationCode = async (payload) => {
    const headers= { 'Content-Type': 'application/x-amz-json-1.1', 'Access-Control-Allow-Credentials': true,
      'X-Amz-Target': 'AWSCognitoIdentityProviderService.ResendConfirmationCode' };
    return await userAxiosInstance.get(API_COGNITO_URL, headers, payload);
  }

}

export default new AuthService();

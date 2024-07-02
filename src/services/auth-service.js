import { userAxiosInstance } from "./http.service";

class AuthService {

  login = async (payload) => {
    const loginEndpoint = '';
    const loginHeader = { 'X-Amz-Target': 'AWSCognitoIdentityProviderService.InitiateAuth' };
    return await userAxiosInstance.post(loginEndpoint, payload, loginHeader);
  };

  register = async (credentials) => {
    const registerEndpoint = '';
    const registerHeader = { 'X-Amz-Target': 'AWSCognitoIdentityProviderService.SignUp' };
    return await userAxiosInstance.post(registerEndpoint, credentials, registerHeader);
  };

  logout = async () => {
    const logoutEndpoint = '';
    const logoutHeader = { 'X-Amz-Target': 'AWSCognitoIdentityProviderService.GlobalSignOut' };
    return await userAxiosInstance.post(logoutEndpoint, logoutHeader);
  };

  forgotPasswordInit = async (payload) => {
    const forgotPasswordInit = '';
    const forgotPasswordHeader = { 'X-Amz-Target': 'AWSCognitoIdentityProviderService.ForgotPassword' };
    return await userAxiosInstance.post(forgotPasswordInit, payload, forgotPasswordHeader);
  }

  forgotPasswordFinish = async (payload) => {
    const forgotPasswordFinish = '';
    const forgotPasswordFinishHeader = { 'X-Amz-Target': 'AWSCognitoIdentityProviderService.ConfirmForgotPassword' };
    return await userAxiosInstance.post(forgotPasswordFinish, forgotPasswordFinishHeader, payload);
  }

  changePassword = async (payload) => {
    const changePassword = '';
    const changePasswordHeader = { 'X-Amz-Target': 'AWSCognitoIdentityProviderService.ChangePassword' };
    return await userAxiosInstance.post(changePassword, changePasswordHeader, payload);
  }

  getProfile = async() => {
    const getProfile = '';
    const getProfileHeader = { 'X-Amz-Target': 'AWSCognitoIdentityProviderService.GetUser' };
    return await userAxiosInstance.get(getProfile, getProfileHeader);
  }

  updateProfile = async (newInfo) => {
    const updateProfile = '';
    const updateProfileHeader = { 'X-Amz-Target': 'AWSCognitoIdentityProviderService.AdminUpdateUserAttributes' };
    return await userAxiosInstance.put(updateProfile, updateProfileHeader, newInfo);
  }

  deleteAccount = async () => {
    const deleteAccount = '';
    const deleteAccountHeader = { 'X-Amz-Target': 'AWSCognitoIdentityProviderService.DeleteUser' };
    return await userAxiosInstance.delete(deleteAccount, deleteAccountHeader);
  }

  disableAccount = async () => {
    const disableAccount = '';
    const disableAccountHeader = { 'X-Amz-Target': 'AWSCognitoIdentityProviderService.AdminDisableUser' };
    return await userAxiosInstance.get(disableAccount, disableAccountHeader);
  }

}

export default new AuthService();

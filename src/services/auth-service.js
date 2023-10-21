import HttpService from "./htttp.service";

class AuthService {
  authEndpoint = process.env.API_URL;

  login = async (payload) => {
    const loginEndpoint = 'api/authenticate';
    return await HttpService.post(loginEndpoint, payload);
  };

  register = async (credentials) => {
    const registerEndpoint = 'api/register';
    return await HttpService.post(registerEndpoint, credentials);
  };

  logout = async () => {
    const logoutEndpoint = 'api/account/logout';
    return await HttpService.post(logoutEndpoint);
  };

  forgotPassword = async (payload) => {
    const forgotPassword = '/api/account/reset-password/init';
    return await HttpService.post(forgotPassword, payload);
  }

  resetPassword = async (credentials) => {
    const resetPassword = 'api/account/change-password';
    return await HttpService.post(resetPassword, credentials);
  }

  getProfile = async() => {
    const getProfile = 'api/account';
    return await HttpService.get(getProfile);
  }

  updateProfile = async (newInfo) => {
    const updateProfile = "/api/admin/users";
    return await HttpService.put(updateProfile, newInfo);
  }
}

export default new AuthService();

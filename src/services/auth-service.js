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
    const forgotPassword = 'api/account/reset-password/init';
    return await HttpService.post(forgotPassword, payload);
  }

  changePassword = async (payload) => {
    const changePassword = 'api/account/change-password';
    return await HttpService.post(changePassword, payload);
  }

  getProfile = async() => {
    const getProfile = 'api/account';
    return await HttpService.get(getProfile);
  }

  updateProfile = async (newInfo) => {
    const updateProfile = "api/account";
    return await HttpService.post(updateProfile, newInfo);
  }

  deleteAccount = async (login) => {
    const deleteAccount = `api/admin/users/${login}`;
    return await HttpService.delete(deleteAccount);
  }

}

export default new AuthService();

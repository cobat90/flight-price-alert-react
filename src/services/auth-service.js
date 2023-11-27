import { userAxiosInstance } from "./http.service";

class AuthService {

  login = async (payload) => {
    const loginEndpoint = 'api/authenticate';
    return await userAxiosInstance.post(loginEndpoint, payload);
  };

  register = async (credentials) => {
    const registerEndpoint = 'api/register';
    return await userAxiosInstance.post(registerEndpoint, credentials);
  };

  logout = async () => {
    const logoutEndpoint = 'api/account/logout';
    return await userAxiosInstance.post(logoutEndpoint);
  };

  forgotPassword = async (payload) => {
    const forgotPassword = 'api/account/reset-password/init';
    return await userAxiosInstance.post(forgotPassword, payload);
  }

  changePassword = async (payload) => {
    const changePassword = 'api/account/change-password';
    return await userAxiosInstance.post(changePassword, payload);
  }

  getProfile = async() => {
    const getProfile = 'api/account';
    console.info(getProfile);
    return await userAxiosInstance.get(getProfile);
  }

  updateProfile = async (newInfo) => {
    const updateProfile = "api/account";
    return await userAxiosInstance.post(updateProfile, newInfo);
  }

  deleteAccount = async (login) => {
    const deleteAccount = `api/admin/users/${login}`;
    return await userAxiosInstance.delete(deleteAccount);
  }

}

export default new AuthService();

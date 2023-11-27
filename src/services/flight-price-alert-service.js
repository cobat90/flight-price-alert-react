import { flightAxiosInstance } from "./http.service";

class FlightPriceAlertService {
  
  createAlert = async (payload) => {
    const createAlertEndpoint = `api/alerts`;
    return await flightAxiosInstance.post(createAlertEndpoint, payload);
  };

  findAllAlerts = async (userId) => {
    const findAllAlertsEndpoint = `api/alerts/users/${userId}`;
    return await flightAxiosInstance.get(findAllAlertsEndpoint);
  };

  findAlert = async (alertId, userId) => {
    const findAlertEndpoint = `api/alerts/${alertId}/users/${userId}`;
    return await flightAxiosInstance.get(findAlertEndpoint);
  };

  updateAlert = async (alertId, userId, payload) => {
    const updateAlertEndpoint = `api/alerts/${alertId}/users/${userId}`;
    return await flightAxiosInstance.put(updateAlertEndpoint, payload);
  }

  disableAlert = async (alertId, userId, payload) => {
    const updateAlertEndpoint = `api/alerts/${alertId}/users/${userId}/disable`;
    return await flightAxiosInstance.patch(updateAlertEndpoint, payload);
  }

  deleteAlert = async (alertId, userId) => {
    const deleteAlertEndpoint = `api/alerts/${alertId}/users/${userId}`;
    return await flightAxiosInstance.delete(deleteAlertEndpoint);
  };
}

export default new FlightPriceAlertService();

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

  activateAlert = async (alertId, userId, payload) => {
    const activateAlertEndpoint = `api/alerts/${alertId}/users/${userId}/activate`;
    return await flightAxiosInstance.patch(activateAlertEndpoint, payload);
  }

  disableAlert = async (alertId, userId, payload) => {
    const disableAlertEndpoint = `api/alerts/${alertId}/users/${userId}/disable`;
    return await flightAxiosInstance.patch(disableAlertEndpoint, payload);
  }

  deleteAlert = async (alertId, userId) => {
    const deleteAlertEndpoint = `api/alerts/${alertId}/users/${userId}`;
    return await flightAxiosInstance.delete(deleteAlertEndpoint);
  };

  selectPlan = async (userId, payload) => {
    const selectPlanEndpoint = `api/plans/users/${userId}`;
    return await flightAxiosInstance.post(selectPlanEndpoint, payload);
  };
}

export default new FlightPriceAlertService();

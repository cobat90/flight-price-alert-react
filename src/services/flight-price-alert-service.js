import HttpService from "./htttp.service";

class FlightPriceAlertService {
  flightPriceAlertEndpoint = process.env.API_URL;

  createAlert = async (payload) => {
    const createAlertEndpoint = `api/alerts`;
    return await HttpService.post(createAlertEndpoint, payload);
  };

  findAllAlerts = async (userId) => {
    const findAllAlertsEndpoint = `api/alerts/users/${userId}`;
    return await HttpService.get(findAllAlertsEndpoint);
  };

  findAlert = async (alertId, userId) => {
    const findAlertEndpoint = `api/alerts/${alertId}/users/${userId}`;
    return await HttpService.get(findAlertEndpoint);
  };

  updateAlert = async (alertId, userId, payload) => {
    const updateAlertEndpoint = `api/alerts/${alertId}/users/${userId}`;
    return await HttpService.put(updateAlertEndpoint, payload);
  }

  disableAlert = async (alertId, userId, payload) => {
    const updateAlertEndpoint = `api/alerts/${alertId}/users/${userId}/disable`;
    return await HttpService.patch(updateAlertEndpoint, payload);
  }

  deleteAlert = async (alertId, userId) => {
    const deleteAlertEndpoint = `api/alerts/${alertId}/users/${userId}`;
    return await HttpService.delete(deleteAlertEndpoint);
  };
}

export default new FlightPriceAlertService();

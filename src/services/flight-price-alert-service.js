import HttpService from "./htttp.service";

class FlightPriceAlertService {
  flightPriceAlertEndpoint = process.env.API_URL;

  createAlert = async (payload) => {
    const createAlertEndpoint = 'api/alerts';
    return await HttpService.post(createAlertEndpoint, payload);
  };

  findAlert = async () => {
    const findAlertEndpoint = 'api/alerts';
    return await HttpService.get(findAlertEndpoint);
  };

  updateAlert = async (newInfo) => {
    const updateAlertEndpoint = "api/alerts";
    return await HttpService.patch(updateAlertEndpoint, newInfo);
  }

  deleteAlert = async () => {
    const deleteAlertEndpoint = 'api/alerts';
    return await HttpService.delete(deleteAlertEndpoint);
  };
}

export default new FlightPriceAlertService();

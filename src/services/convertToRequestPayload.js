function convertToRequestPayload(alertData) {
    // Extract fields from initialAlertData
    const {
      alertName,
      alertType,
      alertDurationTime,
      flightType,
      departDate,
      returnDate,
      cabinClassType,
      aiportFrom,
      aiportTo,
      adults,
      children,
      rangePriceStart,
      rangePriceEnd,
      scalesQuantity,
      departRangeDate,
      returnRangeDate,
      departRangeTimeStart,
      departRangeTimeEnd,
      returnRangeTimeStart,
      returnRangeTimeEnd,
      paymentMethod,
      paymentParcels,
      otherPreferences,
      airline,
      searchSites,
    } = alertData;
  
    // Create the payload structure
    const payload = {
      userId: 1,
      alert: {
        alertName: alertName,
        alertType: [alertType], // Convert alertType to an array
        alertDurationTime: parseInt(alertDurationTime), // Convert to an integer
        alertDisabled: false,
      },
      mainFilter: {
        flight: {
          flightType: flightType,
          departDate: departDate ? departDate.toISOString() : null,
          returnDate: returnDate ? returnDate.toISOString() : null,
          airports: [
            {
              aiportFrom: aiportFrom,
              aiportTo: aiportTo,
              aiportScales: [aiportFrom], // You might need to adjust this based on your data
            },
          ],
        },
        adults: parseInt(adults), // Convert to an integer
        children: parseInt(children), // Convert to an integer
        cabinClassType: cabinClassType,
      },
      preferencesFilter: {
        scalesQuantity: parseInt(scalesQuantity), // Convert to an integer
        departRangeDate: departRangeDate ? departRangeDate.toISOString() : null,
        returnRangeDate: returnRangeDate ? returnRangeDate.toISOString() : null,
        departRangeTime: {
          rangeStart: departRangeTimeStart ? departRangeTimeStart.toISOString() : null,
          rangeEnd: departRangeTimeEnd ? departRangeTimeEnd.toISOString() : null,
        },
        returnRangeTime: {
          rangeStart: returnRangeTimeStart ? returnRangeTimeStart.toISOString() : null,
          rangeEnd: returnRangeTimeEnd ? returnRangeTimeEnd.toISOString() : null,
        },
        travelDuration: {
          total: '40:00', // You might need to calculate this based on your data
          scales: '40:00', // You might need to calculate this based on your data
        },
        rangePrice: {
          rangeStart: parseFloat(rangePriceStart), // Convert to a float
          rangeEnd: parseFloat(rangePriceEnd), // Convert to a float
        },
        payment: {
          method: paymentMethod,
          parcels: parseInt(paymentParcels), // Convert to an integer
        },
        airplaneModel: 'BOEING_737', // You might need to adjust this based on your data
        otherPreferences: otherPreferences,
        airline: airline,
        searchSites: searchSites,
        lowerCO2: true, // You might need to adjust this based on your data
      },
      alertUser: {
        name: 'Fernando', // You might need to adjust this based on your data
        cellphone: '55219934534643', // You might need to adjust this based on your data
        email: 'email@email.com', // You might need to adjust this based on your data
        currency: 'BRL', // You might need to adjust this based on your data
        country: 'BRA', // You might need to adjust this based on your data
      },
    };
  
    return payload;
  }

  module.exports = convertToRequestPayload;




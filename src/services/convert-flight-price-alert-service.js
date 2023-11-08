export const convertRequest = (alertData) => {
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
      userId,
      alertDisabled,
      userName,
      userEmail,
      userCellphone,
      userCurrency,
      userCountry,
    } = alertData;
  
    // Create the payload structure
    const payload = {
      userId: userId,
      alert: {
        alertName: alertName,
        alertType: alertType, // Convert alertType to an array
        alertDurationTime: parseInt(alertDurationTime), // Convert to an integer
        alertDisabled: alertDisabled,
      },
      mainFilter: {
        flight: {
          flightType: flightType === 'One Way' ? 'ONE_WAY' : flightType,
          departDate: departDate ? departDate : null,
          returnDate: returnDate ? returnDate : null,
          airports: [
            {
              aiportFrom: aiportFrom,
              aiportTo: aiportTo,
              aiportScales: aiportFrom, // You might need to adjust this based on your data
            },
          ],
        },
        adults: parseInt(adults), // Convert to an integer
        children: parseInt(children), // Convert to an integer
        cabinClassType: cabinClassType,
      },
      preferencesFilter: {
        scalesQuantity: parseInt(scalesQuantity), // Convert to an integer
        departRangeDate: departRangeDate ? departRangeDate : null,
        returnRangeDate: returnRangeDate ? returnRangeDate : null,
        departRangeTime: {
          rangeStart: departRangeTimeStart ? departRangeTimeStart : null,
          rangeEnd: departRangeTimeEnd ? departRangeTimeEnd : null,
        },
        returnRangeTime: {
          rangeStart: returnRangeTimeStart ? returnRangeTimeStart : null,
          rangeEnd: returnRangeTimeEnd ? returnRangeTimeEnd : null,
        },
        travelDuration: {
          total: null, // You might need to calculate this based on your data
          scales: null, // You might need to calculate this based on your data
        },
        rangePrice: {
          rangeStart: parseFloat(rangePriceStart), // Convert to a float
          rangeEnd: parseFloat(rangePriceEnd), // Convert to a float
        },
        payment: {
          method: paymentMethod,
          parcels: parseInt(paymentParcels), // Convert to an integer
        },
        airplaneModel: null, // You might need to adjust this based on your data
        otherPreferences: otherPreferences,
        airline: airline,
        searchSites: searchSites,
        lowerCO2: null, // You might need to adjust this based on your data
      },
      alertUser: {
        name: "Fernando", //userName You might need to adjust this based on your data
        cellphone: "55219934534643", //userCellphone You might need to adjust this based on your data
        email: "email@email.com", //userEmail You might need to adjust this based on your data
        currency: "BRL", //userCurrency You might need to adjust this based on your data
        country: "BRA", //userCountry You might need to adjust this based on your data
      },
    };
  
    return payload;
  }





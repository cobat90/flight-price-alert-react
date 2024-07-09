export const convertFlightRequest = (alertData) => {
    const {
      alertName,
      alertType,
      alertDurationTime,
      alertDisabled,
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
      total,
      scales,
      airplaneModel,
      lowerCO2,
    } = alertData;
  
    const userAttributes = JSON.parse(localStorage.getItem('userAttributes'));

    const payload = {
      userId: userId,
      alert: {
        alertName: alertName,
        alertType: [alertType === 'Telegram' ? 'TELEGRAM': 'TELEGRAM'],
        alertDurationTime: parseInt(alertDurationTime),
        alertDisabled: alertDisabled ? alertDisabled : false,
      },
      mainFilter: {
        flight: {
          flightType: flightType === 'One Way' ? 'ONE_WAY' : flightType,
          departDate: departDate ? departDate : null,
          returnDate: returnDate ? returnDate : null,
          airports: [
            {
              airportFrom: aiportFrom ? aiportFrom : null,
              airportTo: aiportTo ? aiportTo : null,
              airportScales: null, 
            },
          ],
        },
        adults: parseInt(adults), 
        children: parseInt(children) === 0 ? null : parseInt(children),
        cabinClassType: cabinClassType === 'Economy' ? 'ECONOMY' : cabinClassType,
      },
      preferencesFilter: {
        scalesQuantity: parseInt(scalesQuantity),
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
          total: total ? total : null, 
          scales: scales ? scales : null,
        },
        rangePrice: {
          rangeStart: rangePriceStart ? parseFloat(rangePriceStart) : null, 
          rangeEnd: rangePriceEnd ? parseFloat(rangePriceEnd) : null,
        },
        payment: {
          method: paymentMethod ? paymentMethod : null,
          parcels: paymentParcels ?  parseInt(paymentParcels) : null, 
        },
        airplaneModel: airplaneModel ? airplaneModel : null,
        otherPreferences: otherPreferences ? otherPreferences : null,
        airline: airline ? airline : null,
        searchSites: searchSites ? searchSites : null,
        lowerCO2: lowerCO2 ? lowerCO2 : null, 
      },
      alertUser: {
        name: userAttributes.name, 
        cellphone: userAttributes.phone_number, 
        email:  userAttributes.email, 
        currency: userAttributes["custom:currency"] ? userAttributes["custom:currency"] : "BRL", 
        country: userAttributes["custom:country"] ? userAttributes["custom:country"] : "BR",
      },
    };
  
    return payload;
  }





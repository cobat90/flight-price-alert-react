export const convertFlightRequest = (alertData) => {
  const {
    alertName,
    alertType,
    priceType,
    alertDurationTime,
    alertDisabled,
    flightType,
    departDate,
    departDate_0,
    departDate_1,
    departDate_2,
    returnDate,
    airportFrom,
    airportFrom_0,
    airportFrom_1,
    airportFrom_2,
    airportTo,
    airportTo_0,
    airportTo_1,
    airportTo_2,
    cabinClassType,
    adults,
    children,
    infants,
    rangePriceStart,
    rangePriceEnd,
    alertEqualPrices,
    scalesQuantity,
    includeOriginNearbyAirports,
    includeDestinationNearbyAirports,
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
  const userData = {};

  userAttributes.forEach(attr => {
    switch (attr.Name) {
      case 'name':
        userData.firstName = attr.Value;
        break;
      case 'family_name':
        userData.lastName = attr.Value;
        break;
      case 'email':
        userData.email = attr.Value;
        break;
      case 'phone_number':
        userData.phoneNumber = attr.Value;
        break;
      case 'custom:country':
        userData.country = attr.Value;
        break;
      case 'custom:city':
        userData.city = attr.Value;
        break;
      case 'custom:currency':
        userData.currency = attr.Value;
        break;
      case 'custom:lang_key':
        userData.langKey = attr.Value;
        break;
      case 'custom:telegramUserName':
        userData.telegramUserName = attr.Value;
        break;
      case 'custom:telegramChatId':
        userData.telegramChatId = attr.Value;
        break;
      default:
        break;
    }
  });

  const payload = {
    userId: userId,
    alert: {
      alertName: alertName,
      alertType: [alertType ? alertType.toUpperCase() : 'TELEGRAM'],
      priceType: priceType ? priceType.toUpperCase() : "EVERY",
      alertDurationTime: parseInt(alertDurationTime),
      alertDisabled: alertDisabled ? alertDisabled : false,
    },
    mainFilter: {
      flightType: flightType === 'One Way' ? 'ONE_WAY' : flightType.toUpperCase(),
      cabinClassType: cabinClassType ? cabinClassType.toUpperCase() : 'ECONOMY',
      adults: adults ? parseInt(adults) : 1,
      children: children ? parseInt(children) : 0,
      infants: infants ? parseInt(infants) : 0,
      flights: [
        // Only add index 0 if no other _0, _1, or _2 fields are filled
        ...(departDate && !departDate_0 && !departDate_1 && !departDate_2
          ? [{
              departDate: departDate || null,
              returnDate: returnDate || null,
              airports: {
                airportFrom: airportFrom && flightType !== 'Multicity' ? airportFrom : null,
                airportTo: airportTo && flightType !== 'Multicity' ? airportTo : null,
              },
            }]
          : []
        ),
        {
          departDate: departDate_0 && flightType === 'Multicity' ? departDate_0 : null,
          airports: {
            airportFrom: airportFrom_0 && flightType === 'Multicity' ? airportFrom_0 : null,
            airportTo: airportTo_0 && flightType === 'Multicity' ? airportTo_0 : null,
          },
        },
        {
          departDate: departDate_1 && flightType === 'Multicity' ? departDate_1 : null,
          airports: {
            airportFrom: airportFrom_1 && flightType === 'Multicity' ? airportFrom_1 : null,
            airportTo: airportTo_1 && flightType === 'Multicity' ? airportTo_1 : null,
          },
        },
        {
          departDate: departDate_2 && flightType === 'Multicity' ? departDate_2 : null,
          airports: {
            airportFrom: airportFrom_2 && flightType === 'Multicity' ? airportFrom_2 : null,
            airportTo: airportTo_2 && flightType === 'Multicity' ? airportTo_2 : null,
          },
        },
      ].filter(flight => Object.values(flight).some(value => value !== null)),
    },
    preferencesFilter: {
      scalesQuantity: scalesQuantity ? parseInt(scalesQuantity) : null,
      departRangeDate: departRangeDate || null,
      returnRangeDate: returnRangeDate || null,
      departRangeTime: {
        rangeStart: departRangeTimeStart || null,
        rangeEnd: departRangeTimeEnd || null,
      },
      rangePrice: {
        rangeStart: rangePriceStart ? parseFloat(rangePriceStart) : null,
        rangeEnd: rangePriceEnd ? parseFloat(rangePriceEnd) : null,
      },
      alertEqualPrices: alertEqualPrices || null,
      includeOriginNearbyAirports: includeOriginNearbyAirports || null,
      includeDestinationNearbyAirports: includeDestinationNearbyAirports || null,
      returnRangeTime: {
        rangeStart: returnRangeTimeStart || null,
        rangeEnd: returnRangeTimeEnd || null,
      },
      travelDuration: {
        total: total || null,
        scales: scales || null,
      },
      airline: airline || null,
      payment: {
        method: paymentMethod || null,
        parcels: paymentParcels ? parseInt(paymentParcels) : null,
      },
      airplaneModel: airplaneModel || null,
      otherPreferences: otherPreferences || null,
      searchSites: searchSites || null,
      lowerCO2: lowerCO2 || null,
    },
    alertUser: {
      name: userData.firstName,
      cellphone: userData.phoneNumber,
      email: userData.email,
      currency: userData.currency || "BRL",
      country: userData.country || "BR",
      langKey: userData.langKey || "pt",
      telegramUserName: userData.telegramUserName,
      telegramChatId: userData.telegramChatId,
    },
  };

  const cleanObject = (obj) => {
    Object.keys(obj).forEach(key => {
      if (obj[key] && typeof obj[key] === 'object') {
        cleanObject(obj[key]);
        if (Object.keys(obj[key]).length === 0) {
          delete obj[key];
        }
      } else if (obj[key] == null || obj[key] === 'null') {
        delete obj[key];
      }
    });
  };

  cleanObject(payload);
  return payload;
};

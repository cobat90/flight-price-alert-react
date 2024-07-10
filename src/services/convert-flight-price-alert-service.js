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

    console.info("userAttributes 2: ", userAttributes);

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
        adults: adults ? parseInt(adults): 1, 
        children: children ? parseInt(children): 0,
        cabinClassType: cabinClassType === 'Economy' ? 'ECONOMY' : cabinClassType,
      },
      preferencesFilter: {
        scalesQuantity: scalesQuantity ? parseInt(scalesQuantity): 0,
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
        name: userData.firstName, 
        cellphone: userData.phoneNumber, 
        email:  userData.email, 
        currency: userData.currency ? userData.currency : "BRLAA", 
        country: userData.country ? userData.country : "BRAEE",
        telegramUserName: userData.telegramUserName,
        telegramChatId: userData.telegramChatId,
      },
    };
  
    return payload;
  }





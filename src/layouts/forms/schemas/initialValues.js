/**
=========================================================
* Material Dashboard 2 PRO React TS - v1.0.1
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-2-pro-react-ts
* Copyright 2022 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

import checkout from "layouts/forms/schemas/form";

const {
  formField: {
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
  },
}  = checkout;

const initialAlertData = {
  [alertName.name]: "",
  [alertType.name]: "",
  [alertDurationTime.name]: "",
  [flightType.name]: "",
  [departDate.name]: "",
  [returnDate.name]: "",
  [cabinClassType.name]: "",
  [aiportFrom.name]: "",
  [aiportTo.name]: "",
  [adults.name]: "",
  [children.name]: "",
  [rangePriceStart.name]: "",
  [rangePriceEnd.name]: "",
  [scalesQuantity.name]: "",
  [departRangeDate.name]: "",
  [returnRangeDate.name]: "",
  [departRangeTimeStart.name]: "",
  [departRangeTimeEnd.name]: "",
  [returnRangeTimeStart.name]: "",
  [returnRangeTimeEnd.name]: "",
  [paymentMethod.name]: "",
  [paymentParcels.name]: "",
  [otherPreferences.name]: "",
  [airline.name]: "",
  [searchSites.name]: "",
  [userId.name]: "",
  [alertDisabled.name]: "",
  [userName.name]: "",
  [userEmail.name]: "",
  [userCellphone.name]: "",
  [userCurrency.name]: "",
  [userCountry.name]: "",
};

export default initialAlertData;

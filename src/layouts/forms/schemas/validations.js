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

import * as Yup from "yup";
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
  },
}  = checkout;

const validations = [
  Yup.object().shape({
    [alertName.name]: Yup.string().required(alertName.errorMsg),
    [alertType.name]: Yup.string().required(alertType.errorMsg),
    [alertDurationTime.name]: Yup.string().required(alertDurationTime.errorMsg),
    [flightType.name]: Yup.string().required(flightType.errorMsg),
    [departDate.name]: Yup.string().required(departDate.errorMsg),
  }),
];

export default validations;

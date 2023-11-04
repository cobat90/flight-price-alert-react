const form = {
  formId: "alert-form",
  formField: {
    alertName: {
      name: "alertName",
      label: "Alert Name",
      type: "text",
      errorMsg: "Alert name is required.",
    },
    alertType: {
      name: "alertType",
      label: "Alert Type",
      type: "text",
      errorMsg: "Alert type is required.",
    },
    alertDurationTime: {
      name: "alertDurationTime",
      label: "Alert Duration Time",
      type: "text",
      errorMsg: "Alert Duration Time is required.",
    },
    flightType: {
      name: "flightType",
      label: "Flight Type",
      type: "text",
      errorMsg: "Flight Type is required.",
    },
    departDate: {
      name: "departDate",
      label: "Depart Date",
      type: "date",
      errorMsg: "Depart Date is required.",
    },
    returnDate: {
      name: "returnDate",
      label: "Return Date",
      type: "date",
      errorMsg: "Return Date is required.",
    },
    cabinClassType: {
      name: "cabinClassType",
      label: "Cabin Class Type",
      type: "text",
      errorMsg: "Cabin Class Type is required.",
    },
    aiportFrom: {
      name: "aiportFrom",
      label: "Aiport From",
      type: "text",
      errorMsg: "Aiport From is required.",
    },
    aiportTo: {
      name: "aiportTo",
      label: "Aiport To",
      type: "text",
      errorMsg: "Aiport To is required.",
    },
    adults: {
      name: "adults",
      label: "Adults Quantity",
      type: "number",
      errorMsg: "Adults Quantity is required.",
    },
    children: {
      name: "children",
      label: "Children Quantity",
      type: "number",
      errorMsg: "Children Quantity is required.",
    },
  },
};

export default form;

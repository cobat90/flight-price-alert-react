import React from "react";  // Import React
import MDInput from "components/MDInput";  // Import MDInput from the correct path

// Declaring default props for FormField
function FormField({ label, ...rest }) {
  return (
    <MDInput
      variant="standard"
      readonly={false}
      label={label || " "}  // Default label value is a space if not provided
      fullWidth
      InputLabelProps={{ shrink: true }}
      {...rest}
      />
    );
}

export default FormField;

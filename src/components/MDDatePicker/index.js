import React from "react";
import Flatpickr from "react-flatpickr";
import "flatpickr/dist/flatpickr.css";
import MDInput from "components/MDInput";

function MDDatePicker({ input, ...rest }) {
  return (
    <Flatpickr
      {...rest}
      render={({ defaultValue }, ref) => (
        <MDInput {...input} defaultValue={defaultValue} inputRef={ref} />
      )}
    />
  );
}

MDDatePicker.defaultProps = {
  input: {},
};

export default MDDatePicker;
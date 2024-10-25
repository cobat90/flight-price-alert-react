import React, { useState, useImperativeHandle, forwardRef } from 'react';
import { Grid, Button, IconButton } from '@mui/material';
import AutoCompleteAirports from "components/AutoCompleteAirports";
import DeleteIcon from '@mui/icons-material/Delete';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import MDBox from "components/MDBox";


const MAX_DESTINATIONS = 2;

const AirportFields = forwardRef(({ isEditing, currentAlert, flightType }, ref) => {
  const [airportFields, setAirportFields] = useState(
    isEditing && currentAlert?.mainFilter?.flight?.airports?.length
      ? currentAlert.mainFilter.flight.airports
      : [] 
  );

  useImperativeHandle(ref, () => ({
    addAirportField: handleAddAirportField
  }));

  const handleAddAirportField = () => {
    if (airportFields.length < MAX_DESTINATIONS) {
      setAirportFields((prevFields) => [
        ...prevFields,
        { departDate: '', airportFrom: '', airportTo: '' }, 
      ]);
    }
  };

  const handleRemoveAirportField = (index) => {
    setAirportFields((prevFields) => prevFields.filter((_, i) => i !== index));
  };

  return (
    <div>
      {airportFields.map((field, index) => (
                        <MDBox pt={3} px={3}>

        <Grid item xs={12}>
          <Grid container spacing={3} key={index}>
            <Grid item xs={12} sm={3.5}>
              <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="en-gb">
                <DatePicker
                  name={`departDate_${index}`}
                  label={`Depart Date ${index + 1}`}
                  format="DD/MM/YY"
                  defaultValue={(isEditing
                    ? dayjs(currentAlert?.mainFilter?.flight?.departDate)
                    : null)}
                  disablePast
                  disabled={flightType ? flightType === 'Cheapest' : currentAlert?.mainFilter?.flight?.flightType === 'CHEAPEST'}
                  onChange={date => {
                    if (isEditing) {
                      currentAlert.mainFilter.flight.departDate = date;
                    } else {
                      setDepartDate(date);
                    }
                  }}
                  slotProps={{
                    field: { clearable: true, onClear: () => setCleared(true) },
                  }} 
                />
              </LocalizationProvider>
            </Grid>
            <Grid item xs={12} sm={3}>
              <AutoCompleteAirports
                name={`airportFrom_${index}`}
                label={`Airport From ${index + 1}`}
                placeholder="GIG"
              />
            </Grid>
            <Grid item xs={12} sm={3}>
              <AutoCompleteAirports
                name={`airportTo_${index}`}
                label={`Airport To ${index + 1}`}
                placeholder="FLN"
              />
            </Grid>
            <Grid item xs={12} sm={1}>
              <IconButton aria-label="delete" onClick={() => handleRemoveAirportField(index)}>
                <DeleteIcon />
              </IconButton>
            </Grid>
          </Grid>
        </Grid>
        </MDBox>
      ))}
    </div>
  );
});

export default AirportFields;

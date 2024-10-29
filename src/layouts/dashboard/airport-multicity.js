import React, { useState, useImperativeHandle, forwardRef, useRef } from 'react';
import { Grid, Button, IconButton } from '@mui/material';
import AutoCompleteAirports from "components/AutoCompleteAirports";
import DeleteIcon from '@mui/icons-material/Delete';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import MDBox from "components/MDBox";

const MAX_DESTINATIONS = 3;

const AirportFields = forwardRef(({ isEditing, currentAlert, flightType }, ref) => {
  const [airportFields, setAirportFields] = useState(
    isEditing && currentAlert?.mainFilter?.flight?.airports?.length
      ? currentAlert.mainFilter.flight[0].airports
      : [] 
  );

  const [dates, setDates] = useState(
    airportFields.map(field => field.departDate || null)
  );

  // Method to update date for each index
  const handleDateChange = (index, date) => {
    setDates(prevDates => {
      const newDates = [...prevDates];
      newDates[index] = date;
      return newDates;
    });
  };

  // Add the new field and date
  const handleAddAirportField = (departDate = '', airportFrom = '', airportTo = '') => {
    if (airportFields.length < MAX_DESTINATIONS) {
      setAirportFields(prevFields => [
        ...prevFields,
        { departDate, airportFrom, airportTo },
      ]);
      setDates(prevDates => [...prevDates, departDate || null]);
    }
  };

  useImperativeHandle(ref, () => ({
    addAirportField: handleAddAirportField,
    getFormData: () => ({
      dates,
      airportFields,
    }),
  }));

  const handleRemoveAirportField = index => {
    console.info('Removing airport field:', index);
    setAirportFields(prevFields => prevFields.filter((_, i) => i !== index));
    setDates(prevDates => prevDates.filter((_, i) => i !== index));
  };

  return (
    <div>
      {airportFields.map((field, index) => (
        <MDBox pt={3} px={3} key={index}>
          <Grid item xs={12}>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={3.5}>
                <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="en-gb">
                  <DatePicker
                    name={`departDate_${index}`}
                    label={`${index + 1}º Depart Date`}
                    format="DD/MM/YY"
                    value={dates[index] || null} // Use value instead of defaultValue
                    disablePast
                    disabled={
                      flightType ? flightType !== 'Multicity' : currentAlert?.mainFilter?.flightType !== 'MULTICITY'
                    }
                    onChange={date => handleDateChange(index, date)}
                    slotProps={{
                      field: { clearable: true },
                    }} 
                  />
                </LocalizationProvider>
              </Grid>
              <Grid item xs={12} sm={2.9}>
                <AutoCompleteAirports
                  name={`airportFrom_${index}`}
                  label={`${index + 1}º Airport From`}
                  placeholder="GIG"
                  defaultValue={field.airportFrom}
                  disabled={flightType ? flightType !== 'Multicity' : currentAlert?.mainFilter?.flightType !== 'MULTICITY'}
                />
              </Grid>
              <Grid item xs={12} sm={2.9}>
                <AutoCompleteAirports
                  name={`airportTo_${index}`}
                  label={`${index + 1}º Airport To`}
                  placeholder="FLN"
                  defaultValue={field.airportTo}
                  disabled={flightType ? flightType !== 'Multicity' : currentAlert?.mainFilter?.flightType !== 'MULTICITY'}
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


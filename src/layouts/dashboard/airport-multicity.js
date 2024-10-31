import React, { forwardRef, useEffect, useImperativeHandle, useState } from 'react';
import { Grid, Button, IconButton } from '@mui/material';
import AutoCompleteAirports from "components/AutoCompleteAirports";
import DeleteIcon from '@mui/icons-material/Delete';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import MDBox from "components/MDBox";

import dayjs from 'dayjs';

const MAX_DESTINATIONS = 5;

const AirportFields = forwardRef(({ isEditing, currentAlert, flightType }, ref) => {
  const [airportFields, setAirportFields] = useState([]);
  const [dates, setDates] = useState([]);

  // Populate fields from currentAlert if in editing mode
  useEffect(() => {
    if (isEditing && currentAlert?.mainFilter?.flights?.length) {
      const initialFields = currentAlert.mainFilter.flights.map(flight => ({
        departDate: flight.departDate ? dayjs(flight.departDate) : null, // Convert to dayjs
        airportFrom: flight.airports?.airportFrom || '',
        airportTo: flight.airports?.airportTo || '',
      }));
      setAirportFields(initialFields);
      setDates(initialFields.map(field => field.departDate || null));
    }
  }, [isEditing, currentAlert]);

  const handleDateChange = (index, date) => {
    setDates(prevDates => {
      const newDates = [...prevDates];
      newDates[index] = dayjs(date); // Ensure date is a dayjs object
      return newDates;
    });
  };

  const handleAddAirportField = (departDate = dayjs(), airportFrom = '', airportTo = '') => {
    if (airportFields.length < MAX_DESTINATIONS) {
      const newField = {
        departDate,  // Ensure it's a dayjs object, received directly or as dayjs()
        airportFrom,
        airportTo,
      };
      setAirportFields(prevFields => [...prevFields, newField]);
      setDates(prevDates => [...prevDates, newField.departDate]);
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
                    value={dates[index] || null} // Ensure this is a Day.js object or null
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
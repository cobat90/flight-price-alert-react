import React, { useState } from 'react';
import { Grid, Button, IconButton } from '@mui/material';
import AutoCompleteAirports  from "components/AutoCompleteAirports";
import DeleteIcon from '@mui/icons-material/Delete';
import Add from '@mui/icons-material/AddLocationAlt';
import Tooltip from "@mui/material/Tooltip";


const AirportFields = () => {
  const [airportFields, setAirportFields] = useState([]);

  const handleAddAirportField = () => {
    setAirportFields((prevFields) => [
      ...prevFields,
      { airportFrom: '', airportTo: '' }, 
    ]);
  };

  const handleRemoveAirportField = (index) => {
    setAirportFields((prevFields) => prevFields.filter((_, i) => i !== index));
  };

  return (
    <div>
      {/* Render each airport field */}
      {airportFields.map((field, index) => (
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
                disabled={flightType ?  flightType === 'Cheapest' : currentAlert?.mainFilter?.flight?.flightType ?
                  currentAlert?.mainFilter?.flight?.flightType === 'CHEAPEST' : false }
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
          <Grid item xs={12} sm={4.5}>
            <AutoCompleteAirports
              name={`airportFrom_${index}`}
              label={`Airport From ${index + 1}`}
              placeholder="GIG"
            />
          </Grid>
          <Grid item xs={12} sm={4.5}>
            <AutoCompleteAirports
              name={`airportTo_${index}`}
              label={`Airport To ${index + 1}`}
              placeholder="FLN"
            />
          </Grid>
          <Grid item xs={12} sm={3}>
            <IconButton aria-label="delete" onClick={() => handleRemoveAirportField(index)}>
              <DeleteIcon />
            </IconButton>
          </Grid>
        </Grid>
      ))}
      <Grid item xs={12} sm={3}>
        <Tooltip title="Add up to six legs of your journey. Only for Multicity Flight Type." placement="bottom">
          <IconButton aria-label="Add New Destination" onClick={handleAddAirportField}>
            <Add />
          </IconButton>
        </Tooltip>
      </Grid>
    </div>
  );
};

export default AirportFields;
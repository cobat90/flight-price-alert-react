import Grid from "@mui/material/Grid";
import Modal from '@mui/material/Modal';
import { Card, CardHeader, CardContent, List } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import Icon from "@mui/material/Icon";
import Autocomplete from "@mui/material/Autocomplete";
import Tooltip from "@mui/material/Tooltip";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import FormField from "layouts/pages/users/new-user/components/FormField";

function FlightAlertInfo(alert, index, { formData }) {
  const { formField, values, errors, touched } = formData;
  const { firstName, lastName, company, email, password, repeatPassword } = formField;
  const {
    firstName: firstNameV,
    lastName: lastNameV,
    company: companyV,
    email: emailV,
    password: passwordV,
    repeatPassword: repeatPasswordV,
  } = values;

  const currentAlert = alerts[index];

    return ( 
      <Modal
      open={Boolean(modalEditAlert)}
      onClose={closeModalEditAlert}
      aria-labelledby="parent-modal-title"
      aria-describedby="parent-modal-description"
      disableScrollLock={ true }>    
        <Card id="flight-alert-info" sx={{ 
          overflow: "visible",
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 800, // Default width for larger screens
          maxWidth: "90%", // Set maximum width for smaller screens
          border: '2px solid #000',
          }}>
          <IconButton sx={{  marginLeft: 'auto'}} onClick={closeModalEditAlert}>
            <CloseIcon />
          </IconButton>
          <MDBox pb={3} px={3}>
            <MDTypography variant="h5">Flight Alert Info</MDTypography>
          </MDBox>
          <MDBox component="form" pb={3} px={3} ref={formRef}>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={7}>
                <FormField name="alertName" label="Flight Alert Name" placeholder="Bahamas 2024" required
                  onChange={(e) => handleFieldChange('alertName', e.target.value)}
                  defaultValue={(isEditing ? (currentAlert?.alert?.alertName|| "").toString() : "")} />                                   
              </Grid>
              <Grid item xs={12} sm={3}>
                <Autocomplete
                  defaultValue={(isEditing
                    ? (currentAlert?.alert?.alertType|| "").toString()
                    : "")}
                  options={selectData.alertType} required
                  renderInput={(params) => (
                    <FormField {...params} name="alerType" label="Alert Types" InputLabelProps={{ shrink: true }}
                      onChange={(e, newValue) => handleFieldChange('alertType', newValue)}  />
                  )}
                />
              </Grid>
              <Grid item xs={12} sm={2}>
                <Autocomplete
                  defaultValue={(isEditing
                    ? (currentAlert?.alert?.alertDurationTime || '').toString()
                    : '')}
                  options={selectData.days}
                  renderInput={(params) => (
                    <FormField
                      {...params}
                      name="alertDurationTime"
                      label="Duration(Days)"
                      InputLabelProps={{ shrink: true }}
                      onChange={(e, newValue) => handleFieldChange('alertDurationTime', newValue)} // Add onChange handler
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12}>
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={2.5}>
                    <Autocomplete
                      defaultValue={(isEditing
                        ? (currentAlert?.mainFilter?.flight?.flightType || '').toString()
                        : '')}
                      options={selectData.flightType}
                      renderInput={(params) => (
                        <FormField
                          {...params}
                          name="flightType"
                          label="Flight Type"
                          InputLabelProps={{ shrink: true }}
                          onChange={(e, newValue) => handleFieldChange('flightType', newValue)} // Add onChange handler
                        />
                      )}
                    />
                  </Grid>
                  <Grid item xs={12} sm={3.3}>
                    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="en-gb">
                      <DatePicker
                        name="departDate"
                        label="Depart Date"
                        defaultValue={(isEditing
                          ? dayjs(currentAlert?.mainFilter?.flight?.departDate)
                          : null)}
                        slotProps={{
                          field: { clearable: true, onClear: () => setCleared(true) },
                        }}
                        onChange={(date) => handleFieldChange('departDate', date)} // Add onChange handler
                      />
                    </LocalizationProvider>
                  </Grid>
                  <Grid item xs={12} sm={3.3}>
                    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="en-gb">
                      <DatePicker
                        name="returnDate"
                        label="Return Date"
                        defaultValue={(isEditing
                          ? dayjs(currentAlert?.mainFilter?.flight?.returnDate)
                          : null)}
                        disabled={flightType === 'One Way'}
                        slotProps={{
                          field: { clearable: true, onClear: () => setCleared(true) },
                        }}
                        onChange={(date) => handleFieldChange('returnDate', date)} // Add onChange handler
                      />
                    </LocalizationProvider>
                  </Grid>
                  <Grid item xs={12} sm={2.9}>
                    <Autocomplete
                      defaultValue={(isEditing
                        ? (currentAlert?.mainFilter?.cabinClassType || '').toString()
                        : '')}
                      options={selectData.cabinClassType}
                      renderInput={(params) => (
                        <FormField
                          {...params}
                          name="cabinClassType"
                          label="Cabin Class"
                          InputLabelProps={{ shrink: true }}
                          onChange={(e, newValue) => handleFieldChange('cabinClassType', newValue)} // Add onChange handler
                        />
                      )}
                    />
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12}>
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={4.5}>
                    <FormField name="aiportFrom" label="From" placeholder="Rio de Janeiro(Todos)"
                     defaultValue={(isEditing
                      ? (currentAlert?.mainFilter?.flight?.airports[0]?.airportFrom || "").toString()
                      : "")}  />              
                  </Grid>
                  <Grid item xs={12} sm={4.5}>
                    <FormField name="aiportTo" label="To" placeholder="Bahamas" 
                    defaultValue={(isEditing
                      ? (currentAlert?.mainFilter?.flight?.airports[0]?.airportTo || "").toString()
                      : "")} />
                  </Grid>
                  <Grid item xs={12} sm={1.5}>
                    <Autocomplete
                        defaultValue={(isEditing
                          ? currentAlert?.mainFilter?.adults || 0
                          : "")}
                        options={selectData.passagers}
                        renderInput={(params) => (
                          <FormField {...params} name="adults" label="Adults" InputLabelProps={{ shrink: true }}  />
                    )}/>     
                  </Grid>
                  <Grid item xs={12} sm={1.5}>
                    <Autocomplete
                          defaultValue={(isEditing
                            ? currentAlert?.mainFilter?.children || 0
                            : "")}
                          options={selectData.passagers}
                          renderInput={(params) => (
                            <FormField {...params} name="children" label="Children" InputLabelProps={{ shrink: true }} />
                      )}/>    
                  </Grid>
                </Grid>
              </Grid>
              <MDBox p={3}>
                <MDTypography variant="h5">Preferences
                  <ExpandMore
                    expand={expandedAlertModal}
                    onClick={handleExpandModalClick}
                    aria-expanded={expandedAlertModal}
                    aria-label="show more">                           
                    <ExpandMoreIcon />
                  </ExpandMore>
                </MDTypography>  
              </MDBox>
              <Collapse in={expandedAlertModal} timeout="auto" unmountOnExit px={3}>
                <MDBox pb={3} px={3}>
                  <Grid container spacing={3}>
                    <Grid item xs={12} sm={1.75}>
                      <FormField name="rangePrice" label="$ Range Start" placeholder="200" 
                        defaultValue={(isEditing
                        ? (currentAlert?.preferencesFilter?.rangePrice?.rangeStart || "").toString()
                        : "")} />
                    </Grid>
                    <Grid item xs={12} sm={1.75}>
                      <FormField name="rangePrice" label="$ Range End" placeholder="500" 
                      defaultValue={(isEditing
                        ? (currentAlert?.preferencesFilter?.rangePrice?.rangeEnd || "").toString()
                        : "")}/>        
                    </Grid>
                    <Grid item xs={12} sm={1.5}>
                      <Autocomplete
                        defaultValue={(isEditing
                          ? currentAlert?.preferencesFilter?.scalesQuantity || 0
                          : "")}
                        options={selectData.passagers}
                        renderInput={(params) => (
                          <FormField {...params} name="scalesQuantity" label="Scales" InputLabelProps={{ shrink: true }} />
                      )}/>     
                    </Grid>
                    <Grid item xs={12} sm={3.5}>
                      <Tooltip title="End Date of the Departure Range. The first Departure Date is the Start of the Range." placement="bottom">
                        <div>
                          <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="en-gb">
                            <DatePicker name="departRangeDate" label="Depart Range Date" 
                              defaultValue={(isEditing
                                ? dayjs(currentAlert?.preferencesFilter?.departRangeDate)
                                : null)}
                              slotProps={{
                                field: { clearable: true, onClear: () => setCleared(true) },
                              }}/> 
                          </LocalizationProvider>  
                        </div>
                      </Tooltip>
                    </Grid>
                    <Grid item xs={12} sm={3.5}>
                      <Tooltip title="End Date of the Return Range. The first Return Date is the Start of the Range." placement="bottom">
                        <div>
                          <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="en-gb">
                            <DatePicker name="returnRangeDate" label="Return Range Date" 
                              defaultValue={(isEditing
                                ? dayjs(currentAlert?.preferencesFilter?.returnRangeDate)
                                : null)}
                              slotProps={{
                                field: { clearable: true, onClear: () => setCleared(true) },
                              }}/> 
                          </LocalizationProvider>  
                        </div>
                      </Tooltip>
                    </Grid>
                    <Grid item xs={12}>
                      <Grid container spacing={3}>
                        <Grid item xs={12} sm={3}>
                          <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <TimeField name="departRangeTimeStart" label="Start Depart Range Time" format="HH:mm" 
                              defaultValue={(isEditing
                                ? dayjs(currentAlert?.preferencesFilter?.departRangeTime?.rangeStart, "hh:mm")
                                : null)} />
                          </LocalizationProvider>              
                        </Grid>
                        <Grid item xs={12} sm={3}>
                          <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <TimeField name="departRangeTimeEnd" label="End Depart Range Time" format="HH:mm" 
                              defaultValue={(isEditing
                                ? dayjs(currentAlert?.preferencesFilter?.departRangeTime?.rangeEnd, "hh:mm")
                                : null)} />
                          </LocalizationProvider>
                        </Grid>
                        <Grid item xs={12} sm={3}>
                          <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <TimeField name="returnRangeTimeStart" label="Start Return Range Time" format="HH:mm" 
                              defaultValue={(isEditing
                                ? dayjs(currentAlert?.preferencesFilter?.returnRangeTime?.rangeStart, "hh:mm")
                                : null)} />
                          </LocalizationProvider>
                        </Grid>
                        <Grid item xs={12} sm={3}>
                          <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <TimeField name="returnRangeTimeEnd" label="End Return Range Time" format="HH:mm" 
                              defaultValue={(isEditing
                                ? dayjs(currentAlert?.preferencesFilter?.returnRangeTime?.rangeEnd, "hh:mm")
                                : null)} /> 
                          </LocalizationProvider>
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid item xs={12}>
                      <Grid container spacing={3}>
                        <Grid item xs={12} sm={3}>
                        <Autocomplete
                          multiple
                          limitTags={2}
                          defaultValue={[currentAlert?.preferencesFilter?.payment?.method] || []}
                          options={selectData.paymentType}
                          getOptionLabel={(option) => option}
                          renderInput={(params) => (
                            <FormField {...params} name="paymentMethod" label="Payment Method" InputLabelProps={{ shrink: true }} />
                          )}
                        />                
                        </Grid>
                        <Grid item xs={12} sm={1.5}>
                          <Autocomplete
                            defaultValue={(currentAlert?.preferencesFilter?.payment?.parcels || "").toString()}
                            options={selectData.passagers}
                            renderInput={(params) => (
                              <FormField {...params} name="paymentParcels" label="Parcels" InputLabelProps={{ shrink: true }} />
                          )}/> 
                        </Grid>
                        <Grid item xs={12} sm={3}>
                          <Autocomplete
                              defaultValue={(currentAlert?.preferencesFilter?.otherPreferences || "").toString()}
                              options={selectData.otherPreferences}
                              renderInput={(params) => (
                                <FormField {...params} name="otherPreferences" label="Others Preferences" InputLabelProps={{ shrink: true }} />
                            )}/> 
                        </Grid>
                        <Grid item xs={12} sm={1.5}>
                          <Autocomplete
                              defaultValue={(currentAlert?.preferencesFilter?.airline || "").toString()}
                              options={selectData.airlines}
                              renderInput={(params) => (
                                <FormField {...params} name="airline" label="Airlines" InputLabelProps={{ shrink: true }} />
                            )}/> 
                        </Grid>
                        <Grid item xs={12} sm={3}>
                          <Autocomplete
                              defaultValue={(currentAlert?.preferencesFilter?.searchSites || "").toString()}
                              options={selectData.searchSites}
                              renderInput={(params) => (
                                <FormField {...params} name="searchSites" label="Search Motors" InputLabelProps={{ shrink: true }} />
                            )}/> 
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                </MDBox>
              </Collapse>
            </Grid>
            <MDBox pb={3} px={3} display="flex" justifyContent="center" mb={3}>
              <Grid item xs={12} md={11} >
                <MDButton
                  variant="gradient"
                  color="info"
                  type="button"
                  onClick={handleSubmit}>                   
                  Save
                  </MDButton>
              </Grid>
              <Grid item xs={12} md={1} >
                <MDButton
                  variant="gradient"
                  color="info"
                  type="button"
                  onClick={handleClearForm}>                      
                  Clear
                  </MDButton>
              </Grid>
            </MDBox>
          </MDBox>
        </Card>
      </Modal>
    );
  }

export default FlightAlertInfo;

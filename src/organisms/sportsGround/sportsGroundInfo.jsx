import React, { useEffect, useState } from 'react';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Chip from '@mui/material/Chip';
import useValidations from '../../validations/useValidations';
import { gymUpdateValidatedFields } from '../../consts';
import './sportsGroundAdminProfile.css';
import { useHistory } from 'react-router-dom';

const SportsGroundInfo = ({ updateFn, mySportsGround, error }) => {
  const [readOnly, setReadOnly] = useState(true);
  const [sportsGround, setSportsGround] = useState(mySportsGround);
  const [errorObject, errorActions]
= useValidations(gymUpdateValidatedFields);
  const history = useHistory();
  useEffect(() => {
    setSportsGround(mySportsGround);
  }, [mySportsGround]);

  const handleEditable = () => {
    setReadOnly(false);
  };

  const isStateValueChanged = () => {
    const stateSportsGroundString = JSON.stringify(sportsGround);
    const reducerSportsGroundString = JSON.stringify(mySportsGround);
    return stateSportsGroundString !== reducerSportsGroundString;
  };

  const handleSave = ({ __typename, sportTypes, ...sportsGround }) => {
    const formResult = errorActions.isNextDisabled(sportsGround);
    if (isStateValueChanged() && !formResult) {
      updateFn(sportsGround);
    }
    if (!formResult) {
      setReadOnly(true);
    }
  };

  useEffect(() => {
    if (error) {
      setSportsGround(mySportsGround);
    }
  }, [error]);

  const handleUserView = () => {
    history.push(`/sports-ground/${mySportsGround.id}?userView=true`);
  };

  return (
    <>
      <Grid container justifyContent="flex-end">
        <Button onClick={handleUserView} className="primaryBtn">Z pohledu uživatele</Button>
      </Grid>
      <Divider style={{ marginTop: '20px', marginBottom: '25px' }}>
        <Chip label="Základní informace" className="admin-page-chip" />
      </Divider>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Box noValidate sx={{ mt: 1 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} justifyContent="flex-end">
              {readOnly ? (
                <IconButton className="float-right" onClick={handleEditable}>
                  <ModeEditIcon color="primary" />
                </IconButton>
              ) : (
                <div style={{ float: 'right', verticalAlign: 'middle' }}>
                  <Button
                    onClick={() => handleSave(sportsGround)}
                    variant="contained"
                    style={{ padding: '6px' }}
                    className="primaryBtn"
                  >
                    Uložit změny
                  </Button>
                  <Button
                    onClick={() => {
                      setSportsGround(mySportsGround);
                      setReadOnly(true);
                      errorActions.reset();
                    }}
                    variant="contained"
                    style={{ marginLeft: '0.25em', backgroundColor: '#fff' }}
                    className="deleteBtn"
                  >
                    Zrušit
                  </Button>
                </div>
              )}

            </Grid>
            <Grid item xs={12}>
              <TextField
                autoFocus
                required={!readOnly}
                inputProps={
                  { readOnly }
                }
                name="name"
                fullWidth
                id="name"
                label="Název sportoviště"
                value={sportsGround.name || ''}
                error={errorObject.name.error}
                onBlur={() => !readOnly && errorActions.validateFnc('name', sportsGround.name)}
                onChange={(evt) => setSportsGround({ ...sportsGround, name: evt.target.value })}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                required={!readOnly}
                fullWidth
                inputProps={
                  { readOnly }
                }
                id="registrationNumber"
                label="IČO"
                type="number"
                name="registrationNumber"
                value={sportsGround.registrationNumber || ''}
                onChange={(evt) => setSportsGround({
                  ...sportsGround,
                  registrationNumber: parseInt(evt.target.value, 10),
                })}
                error={errorObject.registrationNumber.error}
                onBlur={() => !readOnly && errorActions.validateFnc('registrationNumber', sportsGround.registrationNumber)}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                inputProps={
                  { readOnly }
                }
                id="phoneNumber"
                label="Telefonní číslo"
                name="phoneNumber"
                type="number"
                value={sportsGround.phoneNumber || ''}
                onChange={(evt) => setSportsGround({
                  ...sportsGround,
                  phoneNumber: evt.target.value,
                })}
                error={errorObject.phoneNumber.error}
                onBlur={() => !readOnly && errorActions.validateFnc('phoneNumber', sportsGround.phoneNumber)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required={!readOnly}
                inputProps={
                  { readOnly }
                }
                fullWidth
                id="email"
                label="Emailová adresa"
                name="email"
                value={sportsGround.email || ''}
                onChange={(evt) => setSportsGround({ ...sportsGround, email: evt.target.value })}
                error={errorObject.email.error}
                onBlur={() => !readOnly && errorActions.validateFnc('email', sportsGround.email)}
              />
            </Grid>
            <Grid item xs={8}>
              <TextField
                required={!readOnly}
                inputProps={
                  { readOnly }
                }
                fullWidth
                id="gymStreet"
                label="Ulice"
                name="street"
                value={sportsGround.street || ''}
                onChange={(evt) => setSportsGround({ ...sportsGround, street: evt.target.value })}
                error={errorObject.street.error}
                onBlur={() => !readOnly && errorActions.validateFnc('street', sportsGround.street)}
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                required={!readOnly}
                inputProps={
                  { readOnly }
                }
                fullWidth
                name="descNumber"
                label="Číslo popisné"
                type="text"
                id="descNumber"
                value={sportsGround.descNumber || ''}
                onChange={(evt) => setSportsGround({
                  ...sportsGround,
                  descNumber: evt.target.value,
                })}
                error={errorObject.descNumber.error}
                onBlur={() => !readOnly && errorActions.validateFnc('descNumber', sportsGround.descNumber)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required={!readOnly}
                inputProps={
                  { readOnly }
                }
                fullWidth
                id="city"
                label="Město"
                name="city"
                value={sportsGround.city || ''}
                onChange={(evt) => setSportsGround({ ...sportsGround, city: evt.target.value })}
                error={errorObject.city.error}
                onBlur={() => !readOnly && errorActions.validateFnc('city', sportsGround.city)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required={!readOnly}
                inputProps={
                  { readOnly }
                }
                fullWidth
                id="zip"
                label="PSČ"
                name="zip"
                type="number"
                value={sportsGround.zip || ''}
                onChange={(evt) => setSportsGround({ ...sportsGround, zip: parseInt(evt.target.value, 10) })}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                inputProps={
                  { readOnly }
                }
                fullWidth
                id="facebook"
                label="Facebook"
                name="facebook"
                value={sportsGround.facebook || ''}
                onChange={(evt) => setSportsGround({ ...sportsGround, facebook: evt.target.value })}
                error={errorObject.facebook.error}
                onBlur={() => !readOnly && errorActions.validateFnc('facebook', sportsGround.facebook)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                inputProps={
                  { readOnly }
                }
                fullWidth
                id="instagram"
                label="Instagram"
                name="instagram"
                value={sportsGround.instagram || ''}
                onChange={(evt) => setSportsGround({ ...sportsGround, instagram: evt.target.value })}
                error={errorObject.instagram.error}
                onBlur={() => !readOnly && errorActions.validateFnc('instagram', sportsGround.instagram)}
              />
            </Grid>
            <Grid item xs={12} sm={12}>
              <TextField
                inputProps={
                  { readOnly }
                }
                fullWidth
                multiline
                rows={6}
                id="description"
                label="Popis"
                name="description"
                type="string"
                value={sportsGround.about || ''}
                onChange={(evt) => setSportsGround({
                  ...sportsGround,
                  about: evt.target.value,
                })}
              />
            </Grid>
          </Grid>
        </Box>
      </Box>
    </>
  );
};

export default SportsGroundInfo;

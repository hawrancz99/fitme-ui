import React, { useEffect, useState } from 'react';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Chip from '@mui/material/Chip';
import ErrorComponent from '../../atoms/errorComponent';
import { trainerUpdateValidatedFields } from '../../consts';
import useValidations from '../../validations/useValidations';
import { useHistory } from 'react-router-dom';

const TrainerInfo = ({ updateFn, originTrainer, error }) => {
  const [readOnly, setReadOnly] = useState(true);
  const [trainer, setTrainer] = useState(originTrainer);
  const [errorObject, errorActions] = useValidations(trainerUpdateValidatedFields);
  const history = useHistory();

  useEffect(() => {
    setTrainer(originTrainer);
  }, [originTrainer]);

  const handleEditable = () => {
    setReadOnly(false);
  };

  const isStateValueChanged = () => {
    const reduerTrainer = JSON.stringify(originTrainer);
    const reducerTrainer = JSON.stringify(trainer);
    return reduerTrainer !== reducerTrainer;
  };

  const handleSave = ({
    __typename, sportTypes, images, ...trainer
  }) => {
    const formResult = errorActions.isNextDisabled(trainer);
    if (isStateValueChanged() && !formResult) {
      updateFn(trainer);
    }
    if (!formResult) {
      setReadOnly(true);
    }
  };

  useEffect(() => {
    if (error) {
      setTrainer(originTrainer);
    }
  }, [error]);


  const handleUserView = () => {
    history.push(`/trainer/${trainer.id}?userView=true`);
  };

  return (
    <>
      <Grid container justifyContent="flex-end">
        <Button onClick={handleUserView} className="primaryBtn">Z pohledu uživatele</Button>
      </Grid>
      <Divider style={{ marginTop: '25px', marginBottom: '25px' }}>
        <Chip label="Základní informace" className="admin-page-chip"/>
      </Divider>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Box noValidate sx={{ mt: 1 }}>
          <Grid container spacing={2} className="grid-container">
            <Grid item xs={12} justifyContent="flex-end">
              {readOnly ? (
                <IconButton className="float-right" onClick={handleEditable}>
                  <ModeEditIcon color="primary"/>
                </IconButton>
              ) : (
                <div style={{
                  float: 'right',
                  verticalAlign: 'middle'
                }}>
                  <Button
                    onClick={() => handleSave(trainer)}
                    variant="contained"
                    style={{ padding: '6px' }}
                    className="primaryBtn"
                  >
                    Uložit změny
                  </Button>
                  <Button
                    onClick={() => {
                      setTrainer(originTrainer);
                      setReadOnly(true);
                      errorActions.reset();
                    }}
                    variant="contained"
                    style={{
                      marginLeft: '0.25em',
                      backgroundColor: '#fff'
                    }}
                    className="deleteBtn"
                  >
                    Zrušit
                  </Button>
                </div>
              )}

            </Grid>
            <Grid item xs={6}>
              <TextField
                autoFocus
                required={!readOnly}
                inputProps={
                  { readOnly }
                }
                autoComplete="given-name"
                name="firstName"
                fullWidth
                id="firstName"
                label="Jméno"
                value={trainer?.firstName || ''}
                error={errorObject.firstName.error}
                onBlur={() => !readOnly && errorActions.validateFnc('firstName', trainer?.firstName)}
                onChange={(evt) => setTrainer({
                  ...trainer,
                  firstName: evt.target.value
                })}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                autoFocus
                required={!readOnly}
                inputProps={
                  { readOnly }
                }
                fullWidth
                id="lastName"
                label="Příjmení"
                name="lastName"
                autoComplete="family-name"
                value={trainer?.lastName || ''}
                error={errorObject.lastName.error}
                onBlur={() => !readOnly && errorActions.validateFnc('lastName', trainer?.lastName)}
                onChange={(evt) => setTrainer({
                  ...trainer,
                  lastName: evt.target.value
                })}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                autoFocus
                inputProps={
                  { readOnly }
                }
                fullWidth
                id="phoneNumber"
                label="Telefonní číslo"
                name="phoneNumber"
                value={trainer?.phoneNumber || ''}
                error={errorObject.phoneNumber.error}
                onBlur={() => !readOnly && errorActions.validateFnc('phoneNumber', trainer?.phoneNumber)}
                onChange={(evt) => setTrainer({
                  ...trainer,
                  phoneNumber: evt.target.value
                })}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                autoFocus
                inputProps={
                  { readOnly }
                }
                required={!readOnly}
                fullWidth
                id="email"
                label="Emailová adresa"
                name="email"
                autoComplete="email"
                value={trainer?.email || ''}
                error={errorObject.email.error}
                onBlur={() => !readOnly && errorActions.validateFnc('email', trainer?.email)}
                onChange={(evt) => setTrainer({
                  ...trainer,
                  email: evt.target.value
                })}
              />
            </Grid>
            <Grid item xs={8}>
              <TextField
                required={!readOnly}
                inputProps={
                  { readOnly }
                }
                fullWidth
                id="trainerStreet"
                label="Ulice"
                name="trainerStreet"
                value={trainer.street || ''}
                onChange={(evt) => setTrainer({ ...trainer, street: evt.target.value })}
                error={errorObject.street.error}
                onBlur={() => !readOnly && errorActions.validateFnc('street', trainer.street)}
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                required={!readOnly}
                inputProps={
                  { readOnly }
                }
                fullWidth
                name="trainerDescNumber"
                label="Číslo popisné"
                type="text"
                id="trainerDescNumber"
                value={trainer.descNumber || ''}
                onChange={(evt) => setTrainer({
                  ...trainer,
                  descNumber: evt.target.value,
                })}
                error={errorObject.descNumber.error}
                onBlur={() => !readOnly && errorActions.validateFnc('descNumber', trainer.descNumber)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required={!readOnly}
                inputProps={
                  { readOnly }
                }
                fullWidth
                id="trainerCity"
                label="Město"
                name="trainerCity"
                value={trainer.city || ''}
                onChange={(evt) => setTrainer({ ...trainer, city: evt.target.value })}
                error={errorObject.city.error}
                onBlur={() => !readOnly && errorActions.validateFnc('city', trainer.city)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required={!readOnly}
                inputProps={
                  { readOnly }
                }
                fullWidth
                id="trainerZip"
                label="PSČ"
                name="trainerZip"
                type="number"
                value={trainer.zip || ''}
                onChange={(evt) => setTrainer({ ...trainer, zip: parseInt(evt.target.value, 10) })}
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
                value={trainer?.facebook || ''}
                onChange={(evt) => setTrainer({ ...trainer, facebook: evt.target.value })}
                error={errorObject.facebook.error}
                onBlur={() => !readOnly && errorActions.validateFnc('facebook', trainer.facebook)}
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
                value={trainer?.instagram || ''}
                onChange={(evt) => setTrainer({ ...trainer, instagram: evt.target.value })}
                error={errorObject.instagram.error}
                onBlur={() => !readOnly && errorActions.validateFnc('instagram', trainer.instagram)}
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
                value={trainer?.about || ''}
                onChange={(evt) => setTrainer({
                  ...trainer,
                  about: evt.target.value,
                })}
              />
              <ErrorComponent error={error}>
                {error?.message}
              </ErrorComponent>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </>
  );
};

export default TrainerInfo;

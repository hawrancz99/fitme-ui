import * as React from 'react';
import { useState } from 'react';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { Button } from '@mui/material';
import { useSelector } from 'react-redux';
import useValidations from '../../validations/useValidations';
import { trainerRegistrationValidatedFields } from '../../consts';
import FitmeLoader from '../../atoms/fitmeLoader';
import ErrorComponent from '../../atoms/errorComponent';
import '../gymRegistrationForm.css';

const TrainerRegistrationForm = ({
  handleCompleted, handlePrevFn, error, loading,
}) => {
  const filledForm = useSelector((state) => state.registrationReducer.trainerForm);
  const [form, setForm] = useState(filledForm);
  const [errorObject, errorActions] = useValidations(trainerRegistrationValidatedFields);

  const handleCompleteRegistration = () => {
    if (!errorActions.isNextDisabled(form)) {
      handleCompleted('trainer', form);
    }
  };

  const handlePrev = () => {
    handlePrevFn('trainer', form);
  };

  const validatePasswordLocal = () => {
    errorActions.validateFnc('password', form.password);
    form.passwordConfirmation.length > 0 && errorActions.validateFnc('passwordConfirmation', form.passwordConfirmation, form.password);
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography component="h1" variant="h5">
          Vyplňte své údaje
        </Typography>
        <Box noValidate sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                autoFocus
                autoComplete="given-name"
                name="firstName"
                fullWidth
                id="firstName"
                label="Jméno"
                disabled={loading}
                value={form.firstName || ''}
                onChange={(evt) => setForm({ ...form, firstName: evt.target.value })}
                error={errorObject.firstName.error}
                onBlur={() => errorActions.validateFnc('firstName', form.firstName)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                id="lastName"
                label="Příjmení"
                name="lastName"
                autoComplete="family-name"
                disabled={loading}
                value={form.lastName || ''}
                onChange={(evt) => setForm({ ...form, lastName: evt.target.value })}
                error={errorObject.lastName.error}
                onBlur={() => errorActions.validateFnc('lastName', form.lastName)}
              />
            </Grid>
            <Grid item xs={12} className="full-width-form">
              <TextField
                fullWidth
                id="phoneNumber"
                label="Telefonní číslo"
                name="phoneNumber"
                type="number"
                value={form.phoneNumber || ''}
                disabled={loading}
                helperText={errorObject.phoneNumber.error && 'Neplatný formát'}
                onChange={(evt) => setForm({ ...form, phoneNumber: evt.target.value })}
                error={errorObject.phoneNumber.error}
                onBlur={() => errorActions.validateFnc('phoneNumber', form.phoneNumber)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="email"
                label="Emailová adresa"
                name="email"
                value={form.email || ''}
                disabled={loading}
                onChange={(evt) => setForm({ ...form, email: evt.target.value })}
                error={errorObject.email.error}
                onBlur={() => errorActions.validateFnc('email', form.email)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="trainerStreet"
                label="Ulice"
                disabled={loading}
                name="street"
                value={form.street || ''}
                onChange={(evt) => setForm({ ...form, street: evt.target.value })}
                error={errorObject.street.error}
                onBlur={() => errorActions.validateFnc('street', form.street)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                id="trainerCity"
                label="Město"
                name="trainerCity"
                disabled={loading}
                value={form.city || ''}
                onChange={(evt) => setForm({ ...form, city: evt.target.value })}
                error={errorObject.city.error}
                onBlur={() => errorActions.validateFnc('city', form.city)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                id="trainerZip"
                label="PSČ"
                name="trainerZip"
                type="number"
                disabled={loading}
                value={form.zip || ''}
                onChange={(evt) => setForm({ ...form, zip: parseInt(evt.target.value, 10) })}
                error={errorObject.zip.error}
                onBlur={() => errorActions.validateFnc('zip', form.zip)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="trainerDescNumber"
                label="Číslo popisné"
                type="text"
                disabled={loading}
                id="trainerDescNumber"
                value={form.descNumber || ''}
                onChange={(evt) => setForm({ ...form, descNumber: evt.target.value })}
                error={errorObject.descNumber.error}
                onBlur={() => errorActions.validateFnc('descNumber', form.descNumber)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                helperText={errorObject.password.error && 'Heslo musí mít nejméně 8 znaků, 1 velké a malé písmeno a alespoň 1 speciální znak.'}
                required
                fullWidth
                name="password"
                disabled={loading}
                label="Heslo"
                type="password"
                id="password"
                value={form.password || ''}
                onChange={(evt) => setForm({ ...form, password: evt.target.value })}
                error={errorObject.password.error}
                onBlur={validatePasswordLocal}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                helperText={errorObject.passwordConfirmation.error && 'Potvrzovací heslo se neshoduje s uvedeným heslem.'}
                required
                fullWidth
                name="passwordConfirmation"
                label="Potvrzení hesla"
                disabled={loading}
                type="password"
                id="passwordConfirmation"
                value={form.passwordConfirmation || ''}
                onChange={(evt) => setForm({ ...form, passwordConfirmation: evt.target.value })}
                error={errorObject.passwordConfirmation.error}
                onBlur={() => errorActions.validateFnc('passwordConfirmation', form.passwordConfirmation, form.password)}
              />
            </Grid>
          </Grid>
        </Box>
      </Box>
      <Grid
        container
        spacing={2}
        direction="row"
        alignItems="center"
        justifyContent="center"
        marginTop={1}
      >
        <FitmeLoader color="secondary" loading={loading} />
        <ErrorComponent error={error}>{error?.message ? error.message : error}</ErrorComponent>
        <Grid item>
          <Button
            onClick={handlePrev}
            disabled={loading}
            variant="outlined"
            className="secondaryBtn"
          >
            Zpět
          </Button>
        </Grid>
        <Grid item>
          <Button
            onClick={handleCompleteRegistration}
            disabled={loading}
            variant="contained"
            className="primaryBtn"
          >
            Potvrdit
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
};

export default TrainerRegistrationForm;

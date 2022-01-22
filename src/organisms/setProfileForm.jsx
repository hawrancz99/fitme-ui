import * as React from 'react';
import { useState } from 'react';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Button } from '@mui/material';
import { useSelector } from 'react-redux';
import useValidations from '../validations/useValidations';
import { personalRegistrationValidatedFields } from '../consts';
import FitmeLoader from '../atoms/fitmeLoader';
import ErrorComponent from '../atoms/errorComponent';

const SetProfileForm = ({
  handleCompleted, handlePrevFn, error, loading,
}) => {
  const theme = createTheme();

  const filledForm = useSelector((state) => state.registrationReducer.personalForm);
  const [form, setForm] = useState(filledForm);
  const [errorObject, errorActions] = useValidations(personalRegistrationValidatedFields);

  const handleCompleteRegistration = () => {
    if (!errorActions.isNextDisabled(form)) {
      handleCompleted('personal', form);
    }
  };

  const handlePrev = () => {
    handlePrevFn('personal', form);
  };

  const validatePasswordLocal = () => {
    errorActions.validateFnc('password', form.password);
    form.passwordConfirmation.length > 0 && errorActions.validateFnc('passwordConfirmation', form.passwordConfirmation, form.password);
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Typography component="h1" variant="h5">
            Zadejte vaše údaje
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
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  id="phoneNumber"
                  label="Telefonní číslo"
                  name="phoneNumber"
                  disabled={loading}
                  type="number"
                  value={form.phoneNumber || ''}
                  onChange={(evt) => setForm({ ...form, phoneNumber: evt.target.value })}
                  helperText={errorObject.phoneNumber.error && 'Neplatný formát'}
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
                  autoComplete="email"
                  disabled={loading}
                  value={form.email || ''}
                  onChange={(evt) => setForm({ ...form, email: evt.target.value })}
                  error={errorObject.email.error}
                  onBlur={() => errorActions.validateFnc('email', form.email)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  helperText={errorObject.password.error && 'Heslo musí mít nejméně 8 znaků, 1 velké a malé písmeno a alespoň 1 speciální znak.'}
                  required
                  fullWidth
                  name="password"
                  label="Heslo"
                  type="password"
                  disabled={loading}
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
                  type="password"
                  disabled={loading}
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
        <FitmeLoader color="secondary" loading={loading} />
        <ErrorComponent error={error}>{error?.message ? error.message : error}</ErrorComponent>
        <Grid
          container
          spacing={2}
          direction="row"
          alignItems="center"
          justifyContent="center"
          marginTop={1}
        >
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
    </ThemeProvider>
  );
};

export default SetProfileForm;

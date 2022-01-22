import * as React from 'react';
import { useEffect, useState } from 'react';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Button } from '@mui/material';
import Divider from '@mui/material/Divider';
import Chip from '@mui/material/Chip';
import ErrorComponent from '../atoms/errorComponent';
import useValidations from '../validations/useValidations';
import { newPasswordFields, newPasswordTokenFields } from '../consts';
import newPasswordAnimation from '../utils/animations/new-password.json';
import LottieAnimation from '../atoms/lottie';

const NewPasswordForm = ({
  error, handleChangePassword, noOldPassowrd, data,
}) => {
  const theme = createTheme();
  const fields = noOldPassowrd ? newPasswordTokenFields : newPasswordFields;
  const [errorObject, errorActions] = useValidations(fields);
  const [samePassword, setSamePassword] = useState(false);
  const [form, setForm] = useState({ oldPassword: '', newPassword: '', passwordConfirmation: '' });

  useEffect(() => {
    if (data || error) {
      setForm({
        oldPassword: '',
        newPassword: '',
        passwordConfirmation: '',
      });
    }
  }, [data, error]);

  const validatePasswordLocal = () => {
    if (form.oldPassword === form.newPassword) {
      setSamePassword(true);
    } else if (samePassword) {
      setSamePassword(false);
    }
    errorActions.validateFnc('newPassword', form.newPassword);
    form.passwordConfirmation.length > 0 && errorActions.validateFnc('passwordConfirmation', form.passwordConfirmation, form.newPassword);
  };

  const handleConfirm = () => {
    if (!errorActions.isNextDisabled(form)) {
      if (form.newPassword === form.oldPassword) {
        setSamePassword(true);
      } else {
        handleChangePassword(form);
      }
    }
  };

  return (
    <ThemeProvider theme={theme}>
      {noOldPassowrd ? null
        : (
          <Divider style={{ marginTop: '25px', marginBottom: '25px' }}>
            <Chip label="Nastavení" className="admin-page-chip" />
          </Divider>
        )}
      <Container component="main" maxWidth="xs">
        <Box
          sx={{
            marginTop: '7vh',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <LottieAnimation lotti={newPasswordAnimation} width={200} height={200} />
          <Typography component="h1" variant="h5">
            Zadejte nové heslo
          </Typography>
          <Box noValidate sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              {noOldPassowrd ? null : (
                <Grid item xs={12}>
                  <TextField
                    helperText={errorObject.oldPassword.error && 'Heslo musí mít nejméně 8 znaků, 1 velké a malé písmeno a alespoň 1 speciální znak.'}
                    required
                    fullWidth
                    name="oldPassword"
                    label="Původní heslo"
                    type="password"
                    id="oldPassword"
                    value={form.oldPassword || ''}
                    onChange={(evt) => setForm({ ...form, oldPassword: evt.target.value })}
                    error={errorObject.oldPassword.error}
                    onBlur={() => errorActions.validateFnc('oldPassword', form.oldPassword)}
                  />
                </Grid>
              )}
              <Grid item xs={12}>
                <TextField
                  helperText={(errorObject.newPassword.error && 'Heslo musí mít nejméně 8 znaků, 1 velké a malé písmeno a alespoň 1 speciální znak.') || (samePassword && 'Hesla se shodují')}
                  required
                  fullWidth
                  name="newPassword"
                  label="Nové heslo"
                  type="password"
                  id="newPassword"
                  value={form.newPassword || ''}
                  onChange={(evt) => setForm({ ...form, newPassword: evt.target.value })}
                  error={errorObject.newPassword.error || samePassword}
                  onBlur={validatePasswordLocal}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  helperText={errorObject.passwordConfirmation.error && 'Potvrzovací heslo se neshoduje s novým heslem.'}
                  required
                  fullWidth
                  name="passwordConfirmation"
                  label="Potvrzení hesla"
                  type="password"
                  id="passwordConfirmation"
                  value={form.passwordConfirmation || ''}
                  onChange={(evt) => setForm({ ...form, passwordConfirmation: evt.target.value })}
                  error={errorObject.passwordConfirmation.error}
                  onBlur={() => errorActions.validateFnc('passwordConfirmation', form.passwordConfirmation, form.newPassword)}
                />
              </Grid>
            </Grid>
          </Box>
        </Box>
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
              onClick={handleConfirm}
              variant="contained"
              className="primaryBtn"
              style={{ marginBottom: '14em' }}
            >
              Potvrdit
            </Button>
          </Grid>
        </Grid>
      </Container>
    </ThemeProvider>
  );
};

export default NewPasswordForm;

import * as React from 'react';
import { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import useValidations from '../../validations/useValidations';
import { loginValidatedFields } from '../../consts';
import FitmeLoader from '../../atoms/fitmeLoader';
import ErrorComponent from '../../atoms/errorComponent';
import LottieAnimation from '../../atoms/lottie';
import warmUpGuy from '../../utils/animations/warm-up-guy.json';
import pullUpGirl from '../../utils/animations/pull-up-girl.json';
import './loginTemplate.css';
import Link from '../../atoms/link';
import { route } from '../../routes';

function Item(props) {
  const { sx, ...other } = props;
  return (
    <Box
      sx={{
        p: 1,
        m: 1,
        ...sx,
      }}
      {...other}
    />
  );
}

const LoginTemplate = ({ submitFn, error, loading }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorObject, errorActions] = useValidations(loginValidatedFields);

  const theme = createTheme();

  const handleSubmit = () => {
    if (!errorActions.isNextDisabled({ password, email })) {
      submitFn(email, password);
    }
  };

  return (
    <div style={{ minHeight: '80vh' }}>
      <ThemeProvider theme={theme}>
        <div style={{ width: '100%', marginTop: '10vh' }}>
          <Box
            className="login-box"
          >
            <Item className="login-animation">
              <div>
                <LottieAnimation lotti={pullUpGirl} />
              </div>
            </Item>
            <Item className="login-form">
              <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                  }}
                >
                  <Paper elevation={24} sx={{ padding: '1.5em' }}>
                    <Avatar
                      sx={{
                        margin: '0 auto',
                        background:
                            'linear-gradient(90deg, rgba(136,96,208,1) 0%, rgba(90,185,234,1) 100%)',
                      }}
                    >
                      <LockOutlinedIcon />
                    </Avatar>
                    <Box noValidate sx={{ mt: 1, minHeight: '30vh' }}>
                      <TextField
                        required
                        disabled={loading}
                        margin="normal"
                        fullWidth
                        id="email"
                        label="Emailová adresa"
                        name="email"
                        autoComplete="email"
                        autoFocus
                        value={email}
                        onChange={(evt) => setEmail(evt.target.value)}
                        error={errorObject.email.error}
                        onBlur={() => errorActions.validateFnc('email', email)}
                      />
                      <TextField
                        disabled={loading}
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Heslo"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        value={password}
                        onChange={(evt) => setPassword(evt.target.value)}
                        error={errorObject.password.error}
                        onBlur={() => errorActions.validateFnc('password', password)}
                      />
                      <FitmeLoader color="secondary" loading={loading} />
                      <ErrorComponent error={error}>
                        {error?.message}
                      </ErrorComponent>
                      <Button
                        onClick={handleSubmit}
                        type="button"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                        disabled={loading}
                        className="primaryBtn"
                      >
                        PŘIHLÁSIT
                      </Button>
                      {!loading ? (
                        <>
                          <Grid item xs>
                            <Link to={route.passwordReset()} variant="body2">
                              Zapomněli jste heslo?
                            </Link>
                          </Grid>
                          <Grid item sx={{ mt: 2 }}>
                            <Link to={route.registration()}>
                              Nemáte účet? Zaregistrujte se!
                            </Link>
                          </Grid>
                        </>
                      ) : (
                        ''
                      )}
                    </Box>
                  </Paper>
                </Box>
              </Container>
            </Item>
            <Item className="login-animation">
              <div>
                <LottieAnimation lotti={warmUpGuy} />
              </div>
            </Item>
          </Box>
        </div>
      </ThemeProvider>
    </div>
  );
};

export default LoginTemplate;

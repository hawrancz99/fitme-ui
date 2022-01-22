import React, { useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';
import Container from '@mui/material/Container';
import { useHistory } from 'react-router-dom';
import { validateEmail } from '../validations';

const LostPasswordForm = ({ lostPwFn, alreadySent }) => {
  const [email, setEmail] = useState('');
  const [err, setErr] = useState(false);

  const validate = () => {
    const val = validateEmail(email);
    setErr(!val);
    return val;
  };

  const onSubmit = () => {
    if (validate()) {
      lostPwFn({ variables: { userEmail: email } });
    }
  };

  const history = useHistory();

  const handleChangePath = (path) => {
    history.push(path);
  };

  return (
    <Container component="main" maxWidth="xs" style={{ textAlign: 'center' }}>
      {alreadySent ? <Button variant="outlined" className="secondaryBtn" style={{ marginBottom: '14em' }} onClick={() => handleChangePath('/login')}>Zpět</Button>
        : (
          <Box noValidate sx={{ mt: 1, minHeight: '30vh' }} onSubmit={onSubmit}>
            <TextField
              required
              margin="normal"
              fullWidth
              id="email"
              label="Emailová adresa"
              name="email"
              autoComplete="email"
              autoFocus
              value={email}
              onChange={(evt) => setEmail(evt.target.value)}
              helperText={err ? 'Musíte zadat validní email.' : null}
              error={err}
              onBlur={validate}
            />
            <Button type="submit" className="primaryBtn" variant="contained" sx={{ mt: 1, mb: 2 }} fullWidth onClick={onSubmit}>
              Odeslat
            </Button>
          </Box>
        )}

    </Container>
  );
};

export default LostPasswordForm;

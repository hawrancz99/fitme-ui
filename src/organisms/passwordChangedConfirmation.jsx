import React, { useEffect } from 'react';
import Grid from '@mui/material/Grid';
import { useHistory } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import FitmeLoader from '../atoms/fitmeLoader';
import useTimer from '../utils/useTimer';

const PasswordChangedConfirmation = () => {
  const history = useHistory();

  const timerTime = useTimer(true);

  useEffect(() => {
    if (timerTime < 1) {
      history.push('/login');
    }
  }, [history, timerTime]);

  return (
    <Grid
      container
      spacing={0}
      direction="row"
      alignItems="center"
      justifyContent="center"
      marginTop={3}
      marginBottom="65vh"
      className="password-change-confirmation"
    >
      <FitmeLoader loading color="primary">
        <Typography variant="h5">
          Budete přesměrováni zpět na přihlášení za:
          {timerTime}
        </Typography>
      </FitmeLoader>
    </Grid>

  );
};

export default PasswordChangedConfirmation;

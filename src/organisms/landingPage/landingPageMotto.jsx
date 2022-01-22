import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import peopleInGym from '../../utils/images/peopleInGym2.jpg';
import './landingPageMotto.css';

function LandingPageMotto() {
  return (
    <Box
      className="motto-box"
      style={{
        background: `linear-gradient(90deg, rgba(136,96,208,1) 0%, rgba(90,185,234,0.3) 100%), url(${peopleInGym}) no-repeat top center`,
      }}
    >
      <Typography
        variant="h3"
        component="div"
      >
        Spojujeme sportovce se sportovišti a trenéry.
      </Typography>
    </Box>
  );
}

export default LandingPageMotto;

import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import './landingPageSearch.css';
import LottieAnimation from '../../atoms/lottie';
import treadmill from '../../utils/animations/running-on-treadmill.json';
import yogaMen from '../../utils/animations/yoga.json';
import GoogleSearchField from '../../atoms/googleSearchField';

function LandingPageSearch({ fetchSearch, location }) {
  return (

    <Box className="landing-search-box">
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Typography variant="h3" component="div" style={{ fontWeight: '900' }}>
            Objevte oblíbené sportoviště a trenéry ve vašem okolí.
          </Typography>
        </Grid>
        <Grid item xs={6} className="landing-search-paper">
          <Paper elevation={8} style={{ padding: '15px' }} className="landing-search-paper">
            <GoogleSearchField handleSearch={fetchSearch} location={location} showSearchBtn />
          </Paper>
          <div className="yoga">
            <LottieAnimation lotti={yogaMen} height={300} width={344} />
          </div>
        </Grid>
        <Grid item xs={6} className="landing-search-map">
          <LottieAnimation lotti={treadmill} />
        </Grid>
      </Grid>
    </Box>
  );
}

export default LandingPageSearch;

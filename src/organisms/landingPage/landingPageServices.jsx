import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import { Button } from '@mui/material';
import vector1 from '../../utils/images/vectorGym.jpg';
import vector3 from '../../utils/images/vector3.jpg';
import './landingPageServices.css';

function LandingPageServices() {
  return (
    <Box className="services-box">
      <Grid container spacing={3}>
        <Grid item xs={8} className="services-headline1">
          <Typography variant="h3" component="div">
            Co nabízíme pro sportovce:
          </Typography>
        </Grid>
        <Grid item xs={8} className="services-sport">
          <Typography variant="h6" gutterBottom component="div" className="services-text">
            Nevíte kam zajít sportovat? Fit.me vám pomůže najít a zarezervovat
            ideální sportoviště, či trenéra ve vašem okolí.
          </Typography>
          <Button
            variant="contained"
            className="primaryBtn services-search-btn"
          >
            Hledat
          </Button>
        </Grid>
        <Grid item xs={4} className="sport-img-item">
          <img className="sport-img" alt="yoga-vector" src={vector3} />
        </Grid>
      </Grid>

      <Grid container spacing={3} sx={{ marginTop: '50px' }}>
        <Grid item xs={4} />
        <Grid item xs={8} className="services-headline2">
          <Typography variant="h3" component="div">
            Co nabízíme pro sportoviště a soukromé trenéry:
          </Typography>
        </Grid>
        <Grid item xs={4} className="sport-img-item2">
          <img className="sport-img2" alt="gym" src={vector1} />
        </Grid>
        <Grid item xs={8} className="services-sport2">
          <Typography variant="h6" gutterBottom component="div" className="services-text">
            Chcete webovou prezentaci a rezervační systém pro vaše služby?
            Vytvořte si u nás profil a nabízejte své služby jednoduše online.
          </Typography>
          <Button
            className="primaryBtn services-search-btn"
            variant="contained"
          >
            Více informací
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
}

export default LandingPageServices;

import React from 'react';
import Grid from '@mui/material/Grid';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import HomeIcon from '@mui/icons-material/Home';
import Link from '@mui/material/Link';

const SportsGroundDetailInfo = ({ entity }) => {

    return (
        <Grid container direction="row" mb={1} mt={2}>
            <Grid item ml={1}><EmailIcon style={{color:'rgba(136, 96, 208, 1)'}}/></Grid>
            <Grid item ml={1}><Link href={`mailto:${entity?.email}`} style={{textDecoration:'none', color:'rgba(136, 96, 208, 1)'}}>{entity?.email}</Link></Grid>
            <Grid item ml={1}><PhoneIcon style={{color:'rgba(136, 96, 208, 1)'}} /></Grid>
            <Grid item ml={1} style={{color:'rgba(136, 96, 208, 1)'}}>{entity?.phoneNumber}</Grid>
            <Grid item ml={1}><HomeIcon style={{color:'rgba(136, 96, 208, 1)'}} /></Grid>
            <Grid item ml={1}>
            <Link target="_blank" href={`https://www.google.com/maps/search/?api=1&query=${entity?.fullAddress?.replace(/\s+/g, '')}`} style={{textDecoration:'none', color:'rgba(136, 96, 208, 1)'}}>{entity?.fullAddress}</Link></Grid>
        </Grid>
    );
};

export default SportsGroundDetailInfo;

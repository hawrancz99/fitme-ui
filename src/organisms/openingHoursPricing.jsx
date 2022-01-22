import React from 'react';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';

const OpeningHoursPricing = () => {

    return (
        <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
                <Typography variant="h5" component="div" gutterBottom>Otevírací doba</Typography>
                <List className="ml-1">
                    <ListItem disablePadding>
                        <Grid container spacing={2}>
                            <Grid item xs={6} md={6}>
                                <ListItemText primary="Pondělí" />
                            </Grid>
                            <Grid item xs={6} md={6}>
                                <ListItemText secondary="11.00 - 22.00" />
                            </Grid>
                        </Grid>
                    </ListItem>
                    <ListItem disablePadding>
                        <Grid container spacing={2}>
                            <Grid item xs={6} md={6}>
                                <ListItemText primary="Úterý" />
                            </Grid>
                            <Grid item xs={6} md={6}>
                                <ListItemText secondary="11.00 - 22.00" />
                            </Grid>
                        </Grid>
                    </ListItem>
                    <ListItem disablePadding>
                        <Grid container spacing={2}>
                            <Grid item xs={6} md={6}>
                                <ListItemText primary="Středa" />
                            </Grid>
                            <Grid item xs={6} md={6}>
                                <ListItemText secondary="11.00 - 22.00" />
                            </Grid>
                        </Grid>
                    </ListItem>
                    <ListItem disablePadding>
                        <Grid container spacing={2}>
                            <Grid item xs={6} md={6}>
                                <ListItemText primary="Čtvrtek" />
                            </Grid>
                            <Grid item xs={6} md={6}>
                                <ListItemText secondary="11.00 - 22.00" />
                            </Grid>
                        </Grid>
                    </ListItem>
                    <ListItem disablePadding>
                        <Grid container spacing={2}>
                            <Grid item xs={6} md={6}>
                                <ListItemText primary="Pátek" />
                            </Grid>
                            <Grid item xs={6} md={6}>
                                <ListItemText secondary="11.00 - 22.00" />
                            </Grid>
                        </Grid>
                    </ListItem>
                    <ListItem disablePadding>
                        <Grid container spacing={2}>
                            <Grid item xs={6} md={6}>
                                <ListItemText primary="Sobota" />
                            </Grid>
                            <Grid item xs={6} md={6}>
                                <ListItemText secondary="11.00 - 22.00" />
                            </Grid>
                        </Grid>
                    </ListItem>
                    <ListItem disablePadding>
                        <Grid container spacing={2}>
                            <Grid item xs={6} md={6}>
                                <ListItemText primary="Neděle" />
                            </Grid>
                            <Grid item xs={6} md={6}>
                                <ListItemText secondary="11.00 - 22.00" />
                            </Grid>
                        </Grid>
                    </ListItem>
                </List>
            </Grid>
            <Grid item xs={12} md={6}>
                <Typography variant="h5" component="div" gutterBottom>Ceník</Typography>
                <List className="ml-1">
                    <ListItem disablePadding>
                        <Grid container spacing={2}>
                            <Grid item xs={6} md={6}>
                                <ListItemText primary="Permanentka/rok" />
                            </Grid>
                            <Grid item xs={6} md={6}>
                                <ListItemText secondary="2 600 Kč" />
                            </Grid>
                        </Grid>
                    </ListItem>
                    <ListItem disablePadding>
                        <Grid container spacing={2}>
                            <Grid item xs={6} md={6}>
                                <ListItemText primary="Permanentka/měsíc" />
                            </Grid>
                            <Grid item xs={6} md={6}>
                                <ListItemText secondary="800 Kč" />
                            </Grid>
                        </Grid>
                    </ListItem>
                    <ListItem disablePadding>
                        <Grid container spacing={2}>
                            <Grid item xs={6} md={6}>
                                <ListItemText primary="Jednorázový vstup" />
                            </Grid>
                            <Grid item xs={6} md={6}>
                                <ListItemText secondary="300 Kč" />
                            </Grid>
                        </Grid>
                    </ListItem>
                </List>
            </Grid>
        </Grid>
    );
};

export default OpeningHoursPricing;

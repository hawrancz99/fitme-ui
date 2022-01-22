import React, { useRef, useState } from 'react';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import moment from 'moment';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import EventCardButtons from '../../molecules/eventCardButtons';
import { USER_TYPES } from '../../consts';
import { Button } from '@mui/material';
import Card from '@mui/material/Card';
import ReactCardFlip from 'react-card-flip';

export const EventItem = ({ evt, handleCreateReservation, handleRemoveReservation, user }) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const originSideRef = useRef();

  return (
    <>
      <ReactCardFlip isFlipped={isFlipped} flipDirection="horizontal">
        {/*Front side*/}
        <Card elevation={10} ref={originSideRef}>
          <CardContent>
            <Grid container spacing={2} mb={2}>
              <Grid item md={6} className="event-name-grid">
                <Typography gutterBottom variant="h6" component="div">
                  {evt.name}
                </Typography>
              </Grid>
              <Grid item md={6} className="capacity-grid">
                <Typography variant="body2">
                  Místa: {`${evt.capacity - evt.totalUsersLogged}/${evt.capacity}`}
                </Typography>
              </Grid>
              <Grid item md={12} className="time-grid">
                <Typography variant="body2" color="text.secondary">
                  {moment(evt.dateFrom, 'YYYY-MM-DD HH:mm:ss')
                    .format('DD.MM.YYYY HH:mm')} - {moment(evt.dateTo, 'YYYY-MM-DD HH:mm:ss')
                  .format('DD.MM.YYYY HH:mm')}
                </Typography>
              </Grid>
              <Grid item md={12} className="address">
                <Typography variant="body2">
                  <LocationOnIcon/> {evt.fullAddress}
                </Typography>
              </Grid>
              <Grid item md={6} className="login-btn-grid">
                <EventCardButtons userLoggedInApp={user !== null && USER_TYPES.USER === user?.accountType}
                                  userLoggedOnEvent={evt.userLogged}
                                  visible={evt.totalUsersLogged < evt.capacity}
                                  onResCreate={() => handleCreateReservation(evt.id)}
                                  onResDelete={() => handleRemoveReservation(evt.id)}/>
              </Grid>
              <Grid item md={6} className="detail-btn-grid">
                <Button variant="outlined" className="secondaryBtn" onClick={() => setIsFlipped(!isFlipped)}>Detail</Button>
              </Grid>
            </Grid>
          </CardContent>
        </Card>

        {/*Back side*/}
        <Card elevation={10} style={{minHeight: originSideRef.current?.offsetHeight}}>
          <CardContent>
            <Grid item md={6} className="event-name-grid">
              <Typography gutterBottom variant="h6" component="div">
                Popis
              </Typography>
            </Grid>
            <Grid container spacing={2} mb={2}>
              <Grid item md={12} className="address">
                <Typography variant="body2" style={{wordBreak:'break-word', maxHeight: '81px', overflow: 'auto'}}>
                  {evt.about}
                </Typography>
              </Grid>
              <Grid item md={12} className="detail-btn-grid" style={{bottom: 0, float: "end"}}>
                <Button variant="outlined" style={{bottom: 0, float: "end"}} className="secondaryBtn" onClick={() => setIsFlipped(!isFlipped)}>Zpět</Button>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </ReactCardFlip>
    </>
  );
};

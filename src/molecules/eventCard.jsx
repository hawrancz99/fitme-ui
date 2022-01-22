import React from 'react';
import Grid from '@mui/material/Grid';
import Divider from '@mui/material/Divider';
import './eventCard.css';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import { EventItem } from '../organisms/events/eventItem';
import { useReservationLogic } from '../organisms/events/useReservationLogic';
import { fireTriggerBackdrop } from '../actions/alert/alertActions';

const EventCard = ({ events, id, refreshFn, noBackDrop }) => {
  const user = useSelector((state) => state.userReducer.user || null);
  const dispatch = useDispatch();

  const [createReservation, removeReservation] = useReservationLogic(refreshFn, noBackDrop);

  const chunkEvents = () => {
    // find last index
    // split them to new Array
    // continue on next index
    const chunkedEvents = [];
    let startingIndex = 0;
    let date;

    for (let i = 0; i < events.length; i++) {
      if (date && date < moment(events[i].dateFrom, 'YYYY-MM-DD HH:mm:ss')
        .valueOf()) {
        chunkedEvents.push({
          date: events[i - 1].dateFrom,
          events: events.slice(startingIndex, i)
        });
        startingIndex = i;
      }
      date = moment(events[i].dateFrom, 'YYYY-MM-DD HH:mm:ss')
        .valueOf();
    }

    chunkedEvents.push({
      date,
      events: events.slice(startingIndex, events.length)
    });

    return chunkedEvents;
  };

  const handleCreateReservation = (eventId) => {
    dispatch(fireTriggerBackdrop(true));
    return createReservation({
      variables: {
        userId: user.id,
        eventId
      }
    });
  };

  const handleRemoveReservation = (eventId) => {
    dispatch(fireTriggerBackdrop(true));
    return removeReservation({
      variables: {
        userId: user.id,
        eventId
      }
    });
  };

  return (
    <>
      <h2 style={{textAlign: "center"}}>Události</h2>
      {events && chunkEvents()
        .map((chunk, indx) => (
          <div key={indx}>
            <Divider variant="middle" className="divider-margin">{moment(chunk.date)
              .format('DD.MM.YYYY')}</Divider>
            <Grid key={`${chunk.date}-key`} container spacing={3} mb={2} className="event-info-grid">
              {chunk.events.map((evt) => (
                <Grid item md={4} key={evt.name + id + evt.dateFrom}>
                  <EventItem
                    evt={evt}
                    handleCreateReservation={handleCreateReservation}
                    handleRemoveReservation={handleRemoveReservation}
                    user={user}
                  />
                </Grid>
              ))}
            </Grid>
          </div>
        ))}
      {
        !events || events.length === 0 ?
          <div style={{
            minHeight: '10vh',
            textAlign: 'center'
          }}>
            <h3>Dosud žádné události</h3>
          </div> : null
      }
    </>
  );
};

export default EventCard;

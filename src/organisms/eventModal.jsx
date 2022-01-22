import { Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import Grid from '@mui/material/Grid';
import useValidations from '../validations/useValidations';
import { eventFields } from '../consts';
import TextField from '@mui/material/TextField';
import LottieAnimation from 'src/atoms/lottie';
import eventAnimation from '../utils/animations/event.json';
import Button from '@mui/material/Button';
import FitmeModal from '../molecules/fitmeModal';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { removeTypeName } from '../utils/utils';
import './eventModal.css';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 1000,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  overflowY: 'auto',
  height: '90%',
  display: 'block'
};

const EventModal = ({ event, sportTypes, publicateFn, onClose, isOpen }) => {

  const [form, setForm] = useState({});

  const handleClose = () => {
    errorActions.reset();
    onClose();
  };

  const handlePublicate = () => {
    if (!errorActions.isNextDisabled(form)) {
      publicateFn({ variables: {eventRequest: {...form, sportType: removeTypeName(form.sportType)}}});
      handleClose();
    }
  };

  useEffect(() => {
    setForm(removeTypeName(event));
  }, [event]);

  const [errorObject, errorActions] = useValidations(eventFields);

  const body = () => <>
    <Grid container direction="row" mb={1} spacing={2} className="eventGrid">
      <Grid item md={6} className="eventHeader"><Typography variant="h3" style={{
        height: '200px',
        lineHeight: '200px'
      }}>{event?.name ? 'Upravit událost' : 'Vytvořit událost'}</Typography></Grid>
      <Grid item md={6} className="eventAnimation"><LottieAnimation lotti={eventAnimation} width={300} height={200}/></Grid>
      <Grid item md={12}><TextField
        required
        margin="normal"
        fullWidth
        id="eventName"
        label="Název události"
        name="eventName"
        autoFocus
        value={form?.name || ''}
        onChange={(evt) => setForm({
          ...form,
          name: evt.target.value
        })}
        error={errorObject.name.error}
        onBlur={() => errorActions.validateFnc('name', form?.name)}
      />
      </Grid>
      <Grid item md={4} className="eventType">
        <FormControl fullWidth required error={errorObject.sportType.error} onBlur={() => errorActions.validateFnc('sportType', form?.sportType)}>
          <InputLabel id="select-label">Typ sportu</InputLabel>
          <Select
            labelId="select-label"
            id="simple-select"
            value={form?.sportType?.name || ''}
            label="Typ sportu"
            renderValue={(value) => `🏋️️  - ${value}`}
            onChange={(evt) => setForm({
              ...form,
              sportType: sportTypes.find(st => st.name === evt.target.value)
            })}
          >
            {
              sportTypes?.map(st => {
                return <MenuItem key={st.varName} value={st.name}>{st.name}</MenuItem>;
              })
            }
          </Select>
        </FormControl>
      </Grid>
      <Grid item md={4} style={{ textAlign: 'end' }} className="eventStart">
        <TextField
          label={'Čas začátku'}
          value={form?.dateFrom || ''}
          id={'eventStart'}
          onChange={(evt) => setForm({
            ...form,
            dateFrom: evt.target.value
          })}
          error={errorObject.dateFrom.error}
          onBlur={() => errorActions.validateFnc('dateFrom', form?.dateFrom)}
          type="datetime-local"
          sx={{ width: 250 }}
          InputLabelProps={{
            shrink: true,
          }}
        />
      </Grid>
      <Grid item md={4} className="eventEnd">
        <TextField
          label={'Čas konce'}
          value={form?.dateTo || ''}
          id={'eventEnd'}
          onChange={(evt) => setForm({
            ...form,
            dateTo: evt.target.value
          })}
          error={errorObject.dateTo.error}
          onBlur={() => errorActions.validateFnc('dateTo', form?.dateTo)}
          type="datetime-local"
          sx={{ width: 250 }}
          InputLabelProps={{
            shrink: true,
          }}
        />
      </Grid>
      <Grid item md={12}>
        <TextField
          id="eventDescription"
          label="Popis události"
          multiline
          rows={7}
          value={form?.about || ''}
          style={{ width: '100%' }}
          onChange={(evt) => setForm({
            ...form,
            about: evt.target.value
          })}
        />
      </Grid>
      <Grid item md={6} className="eventCapacity">
        <TextField
          required
          margin="normal"
          fullWidth
          id="eventCapacity"
          label="Maximální kapacita (počet osob)"
          name="eventCapacity"
          type="number"
          value={form?.capacity || ''}
          onChange={(evt) => setForm({
            ...form,
            capacity: parseInt(evt.target.value)
          })}
          error={errorObject.capacity.error}
          onBlur={() => errorActions.validateFnc('capacity', form?.capacity)}
        />
      </Grid>
      <Grid item md={6} className="eventPrice"><TextField
        required
        margin="normal"
        fullWidth
        id="eventPrice"
        label="Cena za osobu (Kč)"
        name="eventPrice"
        type="number"
        value={form?.price || ''}
        onChange={(evt) => setForm({
          ...form,
          price: parseInt(evt.target.value)
        })}
        error={errorObject.price.error}
        onBlur={() => errorActions.validateFnc('price', form?.price)}
      />
      </Grid>
      <Grid item md={12} style={{ textAlign: 'end' }}>
        <Button variant="outlined" onClick={handleClose} className="secondaryBtn">Zavřít</Button>
        <Button variant="contained" className="primaryBtn" style={{ marginLeft: '15px' }} onClick={handlePublicate}>Publikovat</Button>
      </Grid>
    </Grid>
  </>;

  return <FitmeModal
    style={style}
    isOpen={isOpen}
    onClose={handleClose}
    body={body()}
    type='event'
  />;

};

export default EventModal;

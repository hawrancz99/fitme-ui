import * as React from 'react';
import { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import { useDispatch } from 'react-redux';
import { fireTriggerBackdrop } from '../../actions/alert/alertActions';
import { Add } from '@mui/icons-material';
import EventModal from '../eventModal';
import Divider from '@mui/material/Divider';
import Chip from '@mui/material/Chip';
import { useEventsLogic } from './useEventsLogic';
import { columns } from '../../consts';

// eslint-disable-next-line no-unused-vars
const FitmeEvents = ({ events = [], accountType, sportTypes = [], subjectsId, location }) => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [rows, setRows] = useState([]);
  const [selectedEvents, setSelectedEvents] = useState([]);
  const [eventForEdit, setEventForEdit] = useState({});
  const [deleteEvents, addEvent, updateEvent] = useEventsLogic(accountType, selectedEvents, events);

  const handlePublicate = (req) => {
    const boostedReq = accountType === 'gym' ?
      {
        ...req,
        variables: {
          ...req.variables,
          eventRequest: {
            ...req.variables.eventRequest,
            sportsGroundId: subjectsId,
            fullAddress: location
          }
        }
      } :
      {
        ...req,
        variables: {
          ...req.variables,
          eventRequest: {
            ...req.variables.eventRequest,
            trainerId: subjectsId,
            fullAddress: location
          }
        }
      };
    dispatch(fireTriggerBackdrop(true));
    !!eventForEdit?.name ? updateEvent(boostedReq) : addEvent(boostedReq);
  };

  useEffect(() => {
    setRows(events.map(e => {
      return {
        ...e,
        id: e.id,
        name: e.name,
        price: e.price,
        sportType: e.sportType.name,
        capacity: e.capacity,
        dateFrom: e.dateFrom.replace('T', ' '),
        dateTo: e.dateTo.replace('T', ' '),
      };
    }));
  }, [events]);

  const handleEventSelected = (e) => {
    return selectedEvents.some(selected => e.includes(selected)) ? setSelectedEvents(selectedEvents.filter(s => s.id === e.id)) : setSelectedEvents(events.filter(subjectsEvent => e.includes(subjectsEvent.id)));
  };

  return (
    <>
      <Divider style={{
        marginTop: '25px',
        marginBottom: '25px'
      }}>
        <Chip label="Události" className="admin-page-chip"/>
      </Divider>
      <Container className="calendars" style={{ justifyContent: 'end' }}>
        {
          sportTypes.length === 0 ? <span style={{ color: 'red' }}>Abyste mohli přidat událost, přidejte si alespoň 1 sportovní aktivitu</span> :
            <Button
              className="primaryBtn"
              style={{
                maxHeight: '38px',
                color: 'white',
                width: '60px'
              }}
              size="small"
              onClick={() => setOpen(true)}
            >
              <Add/>
            </Button>
        }
      </Container>
      <div style={{
        height: 400,
        width: '100%'
      }}>
        <DataGrid
          rows={rows}
          columns={columns(events, setEventForEdit, setOpen)}
          checkboxSelection
          onSelectionModelChange={handleEventSelected}
          hideFooter
        />
      </div>
      <Container className="event-btns">
        <Button
          className="deleteBtn"
          size="small"
          disabled={selectedEvents.length === 0}
          onClick={() => {
            dispatch(fireTriggerBackdrop(true));
            return deleteEvents({ variables: { ids: selectedEvents.map(e => e.id) } });
          }}
        >
          {selectedEvents.length === 0 ? 'Nejdříve označte události ke smazání' : 'Smazat vybrané události'}
        </Button>
      </Container>

      <EventModal
        event={{
          ...eventForEdit,
          dateFrom: eventForEdit?.dateFrom?.replace(' ', 'T'),
          dateTo: eventForEdit?.dateTo?.replace(' ', 'T')
        }}
        subjectsId={subjectsId}
        sportTypes={sportTypes}
        isOpen={open}
        publicateFn={(req) => handlePublicate(req)}
        onClose={() => {
          setEventForEdit({});
          setOpen(false);
        }}
      />
    </>
  );
};

export default FitmeEvents;

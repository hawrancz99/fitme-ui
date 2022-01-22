import React from 'react';
import { Button } from '@mui/material';
import './eventCardButtons.css';

const EventCardButtons = ({ userLoggedInApp, userLoggedOnEvent, visible, onResDelete, onResCreate }) => {
  if (visible && userLoggedOnEvent) {
    return <Button variant="contained" className="secondaryBtn" sx={{width:122, background:'transparent', border:'1px solid #5680e9',color: '#5680e9 !important'}} onClick={onResDelete}>Odhlásit se</Button>;
  } if (visible && userLoggedInApp) {
    return <Button variant="contained" className="primaryBtn" sx={{width:122}}  onClick={onResCreate}>Přihlásit se</Button>;
  }
  return null;
};

export default EventCardButtons;

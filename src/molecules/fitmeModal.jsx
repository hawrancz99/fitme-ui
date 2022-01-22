import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import * as React from 'react';
import './fitmeModal.css';

const FitmeModal = ({ isOpen, onClose, body, style, type }) => {

  return (
    <Modal
      open={isOpen}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style} className={type === 'event' ? 'eventModal' : ''}>
        {body}
      </Box>
    </Modal>
  );
};

export default FitmeModal;

import React from 'react';
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

const FitmeAlert = ({
  open, message, severity, handleClose,
}) => {
  const getAction = () => (
    <IconButton
      size="small"
      aria-label="close"
      color="inherit"
      onClick={handleClose}
    >
      <CloseIcon fontSize="small" />
    </IconButton>
  );
  return (
    <div>
      {message
        ? (
          <Snackbar
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'right',
            }}
            open={open}
            autoHideDuration={4000}
            onClose={handleClose}
            action={getAction()}
          >
            <Alert onClose={handleClose} severity={severity === 'error' ? 'error' : 'success'} sx={{ width: '100%' }}>
              {message}
            </Alert>
          </Snackbar>
        ) : null}
    </div>
  );
};

export default FitmeAlert;

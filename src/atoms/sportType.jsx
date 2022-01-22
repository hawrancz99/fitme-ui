import React from 'react';

import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';

const SportType = ({ value, handleDelete }) => (
  <Stack style={{ margin: '5px' }} direction="row" spacing={3}>
    <Chip key={value} label={value} onDelete={handleDelete} />
  </Stack>
);

export default SportType;

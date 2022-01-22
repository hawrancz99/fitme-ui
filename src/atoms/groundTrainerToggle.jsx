import React, {useState} from 'react';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import HomeWorkIcon from '@mui/icons-material/HomeWork';
import PersonIcon from '@mui/icons-material/Person';
import { useDispatch } from 'react-redux';
import { fireFilterByChanged } from '../actions/filter/filterActions';
import { Event } from '@mui/icons-material';

export default function GroundTrainerToggle({filterBy}) {
  const dispatch = useDispatch();
  const [alignment, setAlignment] = useState(filterBy);

  const handleChange = (event, newAlignment) => {
    if (newAlignment !== null) {
      setAlignment(newAlignment);
      dispatch(fireFilterByChanged(newAlignment));
    }
  };

  return (
    <ToggleButtonGroup
      color="primary"
      value={alignment}
      exclusive
      onChange={handleChange}
    >

      <ToggleButton value="sportsGrounds">
        Sportoviště
        <HomeWorkIcon />
      </ToggleButton>
      <ToggleButton value="trainers">
        Trenéři
        <PersonIcon />
      </ToggleButton>
      <ToggleButton value="events">
        Události
        <Event />
      </ToggleButton>

    </ToggleButtonGroup>
  );
}

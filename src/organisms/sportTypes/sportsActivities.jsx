import React, { useRef, useState } from 'react';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import Chip from '@mui/material/Chip';
import Grid from '@mui/material/Grid';
import MenuItem from '@mui/material/MenuItem';
import ButtonGroup from '@mui/material/ButtonGroup';
import Button from '@mui/material/Button';
import { Add } from '@mui/icons-material';
import Grow from '@mui/material/Grow';
import Popper from '@mui/material/Popper';
import Paper from '@mui/material/Paper';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import MenuList from '@mui/material/MenuList';
import SportType from '../../atoms/sportType';
import { removeChecked } from '../../utils/utils';
import './sportsTypes.css';
import { useDispatch, useSelector } from 'react-redux';
import { fireTriggerBackdrop } from '../../actions/alert/alertActions';
import { useSportTypesLogic } from './useSportTypesLogic';

const SportsActivities = ({ subjectSportTypes, subjectId, accountType }) => {
  const dispatch = useDispatch();
  const [updateSportTypes] = useSportTypesLogic(accountType);

  const updateSportTypesLocal = (sportType, isDelete) => {
    dispatch(fireTriggerBackdrop(true));
    return updateSportTypes({
      variables: { id: subjectId, sportType: sportType, isDelete: isDelete, accountType: accountType },
    });
  };

  const allSportTypes = useSelector((state) => state.filterReducer.sportTypes || []);
  const anchorRef = useRef();
  const [open, setOpen] = useState(false);

  const handleClose = (event) => {
    if (event && anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  };

  const handleSportTypeSelected = (st) => {
    handleClose();
    return updateSportTypesLocal(removeChecked(st), false); //checked protože se berou z filterReduceru, ať se data neduplikují
  };

  const handleDeleteSportType = (sportType) => {
    return updateSportTypesLocal(sportType, true);
  };

  return (
    <>
      <Divider style={{ marginTop: '25px', marginBottom: '25px' }}>
        <Chip label="Sportovní aktivity" className="admin-page-chip" />
      </Divider>
      <Container>
        <Grid style={{ display: 'flex', flexWrap: 'wrap' }} item xs={8}>
          {subjectSportTypes?.map((st) => (
            <div className="sport-type-chip" key={st.varName}>
              <SportType key={st.varName} value={st.name} handleDelete={() => handleDeleteSportType(st)} />
            </div>
          ))}
        </Grid>

      </Container>
      <Container style={{ display: 'flex', justifyContent: 'flex-end' }}>

        <Grid style={{ float: 'right', paddingRight: '5px' }} xs={4} item>
          <ButtonGroup style={{ marginTop: '1px', float: 'right' }} variant="contained" ref={anchorRef} aria-label="split button">
            <Button
              className="primaryBtn"
              style={{ paddingTop: '6px', paddingBottom: '6px', width: '60px' }}
              disabled={subjectSportTypes?.length === allSportTypes?.length}
              size="small"
              aria-controls={open ? 'split-button-menu' : undefined}
              aria-expanded={open ? 'true' : undefined}
              aria-label="select merge strategy"
              aria-haspopup="menu"
              onClick={() => setOpen(!open)}
            >
              <Add />
            </Button>
          </ButtonGroup>
        </Grid>
      </Container>
      <Popper
        style={{ zIndex: 1 }}
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        transition
        disablePortal
      >
        {({ TransitionProps, placement }) => (
          <Grow {...TransitionProps} style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}>
            <Paper>
              <ClickAwayListener onClickAway={handleClose}>
                <MenuList style={{ display: 'flex', flexDirection: 'column' }} id="split-button-menu">
                  {
                    allSportTypes?.filter((all) => !subjectSportTypes?.some((st) => st.id === all.id)).map((st) => (
                      <MenuItem
                        style={{ margin: '3px', padding: '3px', textAlign: 'left' }}
                        key={st.varName}
                        value={st.name}
                        onClick={() => handleSportTypeSelected(st)}
                      >
                        {st.name}
                      </MenuItem>
                    ))
                  }
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </>
  );
};

export default SportsActivities;

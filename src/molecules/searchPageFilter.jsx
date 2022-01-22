import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import Button from '@mui/material/Button';
import { useDispatch } from 'react-redux';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import { fireFilterSportTypesChecked } from '../actions/filter/filterActions';
import './searchPageFilter.css';

export function SearchPageFilter({ handleRefetch, sportTypes }) {
  const dispatch = useDispatch();

  const resolveChecked = (val) => sportTypes.filter((c) => c.varName === val).some((c) => c.checked);

  const changeCheckbox = (val) => {
    dispatch(fireFilterSportTypesChecked(val));
  };

  const [expanded, setExpanded] = React.useState('panel1');
  const [expanded2, setExpanded2] = React.useState('panel2');

  const handleChange = (panel) => (event, isExpanded) => {
    switch (panel) {
      case 'panel1':
        setExpanded(isExpanded ? panel : false);
        break;
      case 'panel2':
        setExpanded2(isExpanded ? panel : false);
        break;
      default: break;
    }
  };

  return (
    <>
      <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')} style={{ background: '#7f878c0a' }}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
          className="main-filter-accordion"
        >
          <Typography variant="h5">
            Filtry
            <FilterAltIcon className="filter-icon" />
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Box component="div" className="box-subAccordions">
            <Typography variant="h4" component="div" gutterBottom className="filterHeader" style={{ paddingTop: '10px' }}>
              Filtrování
              {' '}
              <FilterAltIcon />
            </Typography>
            <Accordion expanded={expanded2 === 'panel2'} onChange={handleChange('panel2')} className="subAccordion">
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel2-content"
                id="panel2-header"
              >
                <Typography>Druh sportu</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Box component="div" my={4}>
                  <FormGroup>
                    {sportTypes?.map((c) => (
                      <FormControlLabel
                        key={c.varName}
                        control={(
                          <Checkbox
                            checked={resolveChecked(c.varName)}
                            onChange={() => changeCheckbox(c.varName)}
                            name={c.name}
                          />
                        )}
                        label={c.name}
                      />
                    ))}
                  </FormGroup>
                </Box>
              </AccordionDetails>
            </Accordion>

            <Button variant="contained" className="primaryBtn" onClick={handleRefetch}>
              Filtrovat
            </Button>
          </Box>
        </AccordionDetails>
      </Accordion>
    </>
  );
}

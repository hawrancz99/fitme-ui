import React, { useState } from 'react';
import { Typography } from '@mui/material';
import Rating from '@mui/material/Rating';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AccordionDetails from '@mui/material/AccordionDetails';
import Box from '@mui/material/Box';
import FitmeReview from './fitmeReview';

const FitmeRating = ({ value, reviews = [] }) => {
  const [expanded, setExpanded] = useState(false);

  const handleChange = (event, isExpanded) => {
    setExpanded(isExpanded ? isExpanded : false);
  };
  return (
    <>
      <div style={{ textAlign: 'center', marginBottom:'10px' }}>
        <Typography variant="h6">
         Průměrné hodnocení
        </Typography>
        <Rating name="read-only" value={value} readOnly style={{color:'rgba(136, 96, 208, 1)'}}/>
        <Accordion expanded={expanded} onChange={handleChange} className="subAccordion" style={{ background: '#7f878c0a' }}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon/>}
            aria-controls="panel2-content"
            id="panel2-header"
          >
            <Typography>Všechna hodnocení: {reviews.length}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Box component="div" my={4}>
              {
                reviews?.map(r => <FitmeReview name="read-only" value={r.value} readOnly review={r} key={r.id}/>)
              }
            </Box>
          </AccordionDetails>
        </Accordion>
      </div>
    </>
  );
};

export default FitmeRating;

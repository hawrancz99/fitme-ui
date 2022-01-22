import React, { useState } from 'react';
import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import { useDispatch, useSelector } from 'react-redux';
import { fireFilterPageChanged, fireSortChanged } from '../actions/filter/filterActions';

const SearchSorting = () => {
  const dispatch = useDispatch();
  const [value, setValue] = useState('distanceClosest');
  const data = useSelector(state => state.filterReducer.result || []);

  const handleChange = (event) => {
    setValue(event.target.value);
    dispatch(fireFilterPageChanged(1));
    dispatch(fireSortChanged(event.target.value));
  };

  const showRating = () => data && data.length > 0 && data.some(d => d.some(inner => inner.reviews && inner.reviews.length > 0));

  return (
    <Box component="div" sx={{ textAlign: 'right' }}>
      <TextField
        id="sorting"
        select
        label="Řadit dle:"
        value={value}
        onChange={handleChange}
      >
        <MenuItem value="nameAZ">Název (A-Z)</MenuItem>
        <MenuItem value="nameZA">Název (Z-A)</MenuItem>
        <MenuItem value="distanceClosest">Vzdálenost (nejbližší)</MenuItem>
        <MenuItem value="distanceFurthest">Vzdálenost (nejvzdálenější)</MenuItem>
        {showRating() && <MenuItem value="ratingBest">Hodnocení (nejvyšší)</MenuItem>}
        {showRating() && <MenuItem value="ratingWorst">Hodnocení (nejnižší)</MenuItem>}
      </TextField>

    </Box>
  );
};

export default SearchSorting;

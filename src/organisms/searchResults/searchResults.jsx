import React from 'react';
import Box from '@mui/material/Box';
import SearchResultCard from '../../molecules/searchResultCard';

const SearchResults = ({ data, getDetail, filterBy }) => (
  <Box component="div" className="search-results" sx={{ my: 5 }}>
    {data?.map((searchResult) => (
      <SearchResultCard result={searchResult} key={searchResult.id} getDetail={getDetail} filterBy={filterBy}/>
    ))}
  </Box>
);

export default SearchResults;

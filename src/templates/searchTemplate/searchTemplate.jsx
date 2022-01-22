import React from 'react';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Pagination from '@mui/material/Pagination';
import GroundTrainerToggle from '../../atoms/groundTrainerToggle';
import { SearchPageFilter } from '../../molecules/searchPageFilter';
import GoogleSearchField from '../../atoms/googleSearchField';
import './searchTemplate.css';
import SearchSorting from '../../molecules/searchPageSorting';
import SearchResults from '../../organisms/searchResults/searchResults';

const SearchTemplate = ({
  data, handleRefetch, sportTypes, location, handleLocationChanged, currentPage, handleChangePage, getDetail, filterBy = "sportsGrounds"
}) => (
  <Box mt={4} className="search-template">
    <Grid container spacing={2}>
      <Grid item xs={12} style={{ marginBottom: '30px' }}>
        <Box className="search-input">
          <Paper elevation={8} className="search-input-paper">
            <GoogleSearchField
              handleSearch={handleLocationChanged}
              location={location}
              showSearchBtn={false}
            />
          </Paper>
        </Box>
      </Grid>

      <Grid item xs={3} className="filtering">
        <SearchPageFilter
          handleRefetch={handleRefetch}
          sportTypes={sportTypes}
        />
      </Grid>

      <Grid item xs={9} className="results">
        <div className="search-toggle-sorting">
          <GroundTrainerToggle filterBy={filterBy}/>
          <SearchSorting className="sorting" />
        </div>
        <SearchResults data={data[currentPage - 1]} getDetail={getDetail} filterBy={filterBy}/>
        {
          data?.length > 1
            ? (
              <Grid
                item
                xs={12}
                style={{
                  marginBottom: '30px',
                  marginTop: '20px',
                  paddingRight: '16px',
                }}
              >
                <Box component="div" sx={{ textAlign: 'right' }}>
                  <Pagination
                    count={data?.length}
                    className="pagination-bar"
                    page={currentPage}
                    onChange={handleChangePage}
                  />
                </Box>
              </Grid>
            ) : null
        }
      </Grid>
    </Grid>
  </Box>
);

export default SearchTemplate;

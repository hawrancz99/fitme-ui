import React from 'react';

import Grid from '@mui/material/Grid';
import Avatar from '@mui/material/Avatar';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import SportsGroundDetailInfo from '../../molecules/sportGroundDetailInfo';
import SportType from '../../atoms/sportType';
import EventCard from '../../molecules/eventCard';
import Photos from '../../molecules/photos';
import Divider from '@mui/material/Divider';
import { useSelector } from 'react-redux';
import { RatingDetail } from '../../organisms/rating/ratingDetail';

export default function SportsGroundDetailTemplate({ gym, refreshFn }) {
  const user = useSelector((state) => state.userReducer.user || null);

  return (
    <>
      <Box>
        <Avatar variant="rounded" alt="The image" src="http://www.jankaresfitness.com/userfiles/hlavicka/jfk-web26-crop.jpg" sx={{ width: 1 }} style={{ height: 300 }}/>
      </Box>
      <Box sx={{ width: '100%' }}>
        <Box>
          <Grid container spacing={1} justifyContent="center" direction="column" alignItems="center">
            <Grid item xs={12} md={12} style={{width: "80%" }}>
              <Paper>
                <Box p={5}>
                  <h1>{gym?.name}</h1>
                  <Divider/>
                  <SportsGroundDetailInfo entity={gym}/>
                  <Grid container direction="row" style={{ marginBottom:'15px'}}>
                    {gym?.sportTypes?.map((sportType) => <div className="sport-type-chip" key={`${sportType.name}-type-detail`}><SportType key={`${sportType.name}-type-detail`} value={sportType.name}/></div>)}
                  </Grid>
                  <Divider/>
                  <div style={{ textAlign: 'center', marginBottom:'10px', marginTop:'20px' }}>
                    <h2>Galerie</h2>
                    <Photos photos={gym?.images}/>
                  </div>
                  <Divider/>
                  <EventCard events={gym?.events} id={gym?.id} refreshFn={refreshFn}/>
                  <RatingDetail user={user} subject={gym}/>
                </Box>
              </Paper>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </>
  );
}

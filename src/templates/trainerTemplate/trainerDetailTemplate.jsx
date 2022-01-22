import React from 'react';

import Grid from '@mui/material/Grid';
import Avatar from '@mui/material/Avatar';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import SportsGroundDetailInfo from '../../molecules/sportGroundDetailInfo';
import SportType from '../../atoms/sportType';
import EventCard from '../../molecules/eventCard';
import Divider from '@mui/material/Divider';
import { useSelector } from 'react-redux';
import Photos from '../../molecules/photos';
import { RatingDetail } from '../../organisms/rating/ratingDetail';

export default function TrainerTemplate({trainer, events, refreshFn}) {
  const user = useSelector((state) => state.userReducer.user || null);

  return (
    <>
      <Box>
        <Avatar variant="rounded" alt="The image" src="https://scontent-prg1-1.xx.fbcdn.net/v/t1.6435-9/52941781_2384166874940715_7032701152663699456_n.jpg?_nc_cat=102&ccb=1-5&_nc_sid=e3f864&_nc_ohc=fKOQCFscmUkAX_EQE5w&_nc_ht=scontent-prg1-1.xx&oh=00_AT8uc-fDGoeHK8sRyptJ4-RMPmZk7PqTtFiPq_2PXJquJg&oe=62083B55" sx={{ width: 1 }} style={{ height: 300 }} />
      </Box>
      <Box sx={{ width: '100%' }}>
        <Box>
          <Grid container spacing={1} justifyContent="center" direction="column" alignItems="center">
            <Grid item xs={12} md={12} sx={{ minWidth: 3/4 }}>
              <Paper>
                <Box p={5}>
                  <h1>{trainer?.firstName} {trainer?.lastName}</h1>
                  <Divider/>
                  <SportsGroundDetailInfo entity={trainer} />
                  <Grid container direction="row">
                    {trainer?.sportTypes?.map((sportType) => <div className="sport-type-chip" key={`${sportType.name}-type-detail`}><SportType key={`${sportType.name}-type-detail`} value={sportType.name} /></div>)}
                  </Grid>
                  <Divider/>
                  <div style={{ textAlign: 'center', marginBottom:'10px', marginTop:'20px' }}>
                    <h2>Galerie</h2>
                    <Photos photos={trainer?.images}/>
                  </div>
                  <Divider/>
                  <EventCard events={events} id={trainer?.id} refreshFn={refreshFn}/>
                </Box>
                <RatingDetail user={user} subject={trainer}/>
              </Paper>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </>
  );
}

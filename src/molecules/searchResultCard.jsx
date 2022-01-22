import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Rating from '@mui/material/Rating';
import { Container } from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import Button from '@mui/material/Button';
import gym from '../utils/images/gym.jpg';
import boi from '../utils/images/boi.jpg';
import eventImg from '../utils/images/eventSearchDefault.jpeg';
import './searchResultCard.css';
import SportType from '../atoms/sportType';
import { getAvgRating } from '../utils/utils';

export default function SearchResultCard({ result, getDetail, filterBy }) {
  const { sportTypes } = result;

  const roundUpDistance = (distance) => {
    if (distance < 1) {
      return `${distance * 1000} m`;
    }
    return `${Math.round(distance * 100) / 100} km`;
  };

  const getImg = (data) =>{
    if(data.firstName){
      return boi;
    }else if(data.city){
      return gym;
    }else{
      return eventImg;
    }
  }

  const isEvent = () => !!result.price;

  const isTrainer = () => !result.name && !isEvent();

  return (
    <Box mb={2}>
      <Card variant="outlined" className="result-card">
        <Grid container spacing={2}>
          <Grid item xs={12} md={4}>
            <CardMedia component="img" height="306" className="search-result-img" src={getImg(result)} alt="search result image"/>
          </Grid>
          <Grid item xs={12} md={8}>
            <CardContent>
              <Typography variant="h5" component="span" mr={1} gutterBottom>{isTrainer() ? result.firstName + ' ' + result.lastName : result.name}</Typography>
              {
                result?.reviews?.length > 0 ? <Rating name="read-only" value={getAvgRating(result.reviews)} sx={{
                    verticalAlign: 'sub',
                    color: 'rgba(136, 96, 208, 1)'
                  }} readOnly/>
                  : <Typography mb={2} variant="body2">Dosud nehodnoceno</Typography>
              }
              <Typography my={1} variant="body2" color="text.secondary">{result.fullAddress}</Typography>
              <Typography my={1} variant="body2" color="text.secondary" style={{ fontWeight: '900' }}>
                <LocationOnIcon/>
                {' '}
                {roundUpDistance(result.distanceFromUser)}
              </Typography>
              <Typography mb={2} variant="body2">{result.about ? result.about : 'Popis není k dispozici'}</Typography>
              <Container className="chip-container">
                {!isEvent() ? sportTypes.map((item) => (
                  <div className="chip" key={result.id + item.name}>
                    <SportType key={item.name} value={item.name}/>
                  </div>
                )) :
                  <div className="chip" key={result.id + result?.sportType?.name}>
                    <SportType key={result?.sportType.name} value={result?.sportType?.name}/>
                  </div>
                }
              </Container>
                <Button className="secondaryBtn" onClick={() => {
                  !isEvent() ? getDetail(result.id, filterBy === "trainers") : getDetail((result.sportsGroundId ? result.sportsGroundId : result.trainerId), !!result.trainerId);
                }}>
                  Zobrazit detail {isEvent() && (!!result.sportsGroundId ? " sportoviště" : " trenéra")}
                </Button>
            </CardContent>
          </Grid>
        </Grid>
      </Card>
    </Box>
  );
}

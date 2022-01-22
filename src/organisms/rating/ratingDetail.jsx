import React from 'react';
import Divider from '@mui/material/Divider';
import FitmeReview from './fitmeReview';
import FitmeRating from './fitmeRating';
import { getAvgRating } from '../../utils/utils';

export const RatingDetail = ({subject, user}) => {
  return (
    <>
      <Divider/>
      {!new URL(window.location.href).searchParams.get('userView') && user && <FitmeReview readOnly={false}/>}
      {
        subject?.reviews?.length > 0 ? <FitmeRating value={getAvgRating(subject.reviews)} reviews={subject.reviews}/>
          : (
            <div style={{
              minHeight: '10vh',
              textAlign: 'center'
            }}>
              <h3>Dosud žádná hodnocení</h3>
            </div>
          )
      }
    </>
  );
};

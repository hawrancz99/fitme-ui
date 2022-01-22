import React, { useState } from 'react';
import Rating from '@mui/material/Rating';
import Container from '@mui/material/Container';
import { Typography } from '@mui/material';
import TextField from '@mui/material/TextField';
import './rating.css';
import Button from '@mui/material/Button';
import { Add } from '@mui/icons-material';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fireTriggerBackdrop } from '../../actions/alert/alertActions';
import { useRatingLogic } from './useRatingLogic';

const FitmeReview = ({ value, review, readOnly }) => {
  const [stateValue, setStateValue] = useState(value ? value : 0);
  const [stateText, setStateText] = useState(review?.text ? review.text : '');
  const dispatch = useDispatch();
  const { gymId, trainerId } = useParams();
  const [postReview] = useRatingLogic(gymId, trainerId, setStateValue, setStateText);

  const handlePostReview = () => {
    dispatch(fireTriggerBackdrop(true));
    return postReview({
      variables: {
        reviewRequest: {
          value: parseInt(stateValue),
          text: stateText
        },
        accountType: gymId ? 'gym' : 'trainer',
        id: gymId ? parseInt(gymId) : parseInt(trainerId)
      },
    });
  };

  return (
    <>
      <div style={{
        textAlign: 'center',
        marginTop: '10px'
      }} key={review?.id}>
        {
          !readOnly && <h2>Přidat nové hodnocení</h2>
        }
        <Container>
          <div className="rating-header">
            {
              readOnly && <Typography variant="h6">
                Anonymně
              </Typography>
            }
            <Rating value={stateValue} readOnly={readOnly} style={{
              float: 'end',
              color: 'rgba(136, 96, 208, 1)'
            }} onChange={e => setStateValue(parseInt(e.target.value))}/>
          </div>
          <TextField
            inputProps={
              {
                disabled: readOnly,
                readOnly: readOnly
              }
            }
            fullWidth
            multiline
            value={stateText}
            rows={3}
            id="description"
            label={!readOnly ? 'Napište, co se vám líbilo' : ''}
            name="description"
            onChange={(e) => setStateText(e.target.value)}
            type="string"
          />
        </Container>
        {
          !readOnly &&
          <Container className="calendars" style={{ justifyContent: 'end' }} title={'Přidat hodnocení'}>
            <Button
              className="primaryBtn"
              style={{
                maxHeight: '38px',
                color: 'white',
                width: '60px',
                marginBottom: '60px'
              }}
              size="small"
              onClick={handlePostReview}
            >
              <Add/>
            </Button>
          </Container>
        }
      </div>
    </>
  );
};

export default FitmeReview;

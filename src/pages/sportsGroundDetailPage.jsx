import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useLazyQuery } from '@apollo/client';
import { GET_GYM } from '../graphql/graphql';
import SportsGroundDetailTemplate from '../templates/sportsGround/sportsGroundDetailTemplate';
import { sportsGroundLoaded } from '../actions/sportsGround/sportsGroundActions';
import { fireTriggerBackdrop } from '../actions/alert/alertActions';
import { useDispatch, useSelector } from 'react-redux';
import { resolveUserId } from '../utils/utils';

const SportsGroundDetailPage = () => {
  const { gymId } = useParams();
  const dispatch = useDispatch();
  const mySportsGround = useSelector(
    (state) => state.sportsGroundReducer.mySportsGround || null,
  );
  const user = useSelector((state) => state.userReducer.user || null);

  useEffect(() => {
    getGym();
    dispatch(fireTriggerBackdrop(true));
  }, [gymId]);

  const [getGym] = useLazyQuery(GET_GYM, {
    variables: {
      id: parseInt(gymId, 10),
      userId: resolveUserId(user)
    },
    onCompleted: ({ sportsGround: gym }) => {
      dispatch(sportsGroundLoaded(gym));
      dispatch(fireTriggerBackdrop(false));
    },
    onError: () => {
      dispatch(fireTriggerBackdrop(false));
    },
  });

  return (
    <>
      <SportsGroundDetailTemplate gym={mySportsGround} refreshFn={getGym}/>
    </>
  );
};

export default SportsGroundDetailPage;

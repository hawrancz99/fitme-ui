import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useLazyQuery } from '@apollo/client';
import { GET_TRAINER } from '../graphql/graphql';
import TrainerDetailTemplate from '../templates/trainerTemplate/trainerDetailTemplate';
import { fireTriggerBackdrop } from '../actions/alert/alertActions';
import { useDispatch, useSelector } from 'react-redux';
import { fireTrainerLoaded } from '../actions/trainer/trainerActions';
import { resolveUserId } from '../utils/utils';

const TrainerDetailPage = () => {
  const { trainerId } = useParams();
  const dispatch = useDispatch();
  const trainerOrigin = useSelector(
    (state) => state.trainerReducer.trainer || null,
  );
  const user = useSelector((state) => state.userReducer.user || null);

  useEffect(() => {
    dispatch(fireTriggerBackdrop(true));
    getTrainer();
  }, []);

  const [getTrainer] = useLazyQuery(GET_TRAINER, {
    variables: { id: parseInt(trainerId, 10), userId: resolveUserId(user) },
    onCompleted: ({ trainer }) => {
      dispatch(fireTrainerLoaded(trainer));
      dispatch(fireTriggerBackdrop(false));
    },
    onError: () => {
      dispatch(fireTriggerBackdrop(false));
    },
  });

  return (
    <>
      <TrainerDetailTemplate trainer={trainerOrigin} events={trainerOrigin?.events} refreshFn={getTrainer} />
    </>
  );
};

export default TrainerDetailPage;

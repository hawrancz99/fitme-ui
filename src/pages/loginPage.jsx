import React from 'react';
import { useDispatch } from 'react-redux';
import { useMutation } from '@apollo/client';
import { useHistory } from 'react-router-dom';
import { fireUserLoaded } from '../actions/user/userActions';
import LoginTemplate from '../templates/loginTemplate/loginTemplate';
import { sportsGroundLoaded } from '../actions/sportsGround/sportsGroundActions';
import { LOGIN_MUTATION } from '../graphql/graphql';
import { fireTrainerLoaded } from '../actions/trainer/trainerActions';
import { doMagicWithUser } from '../utils/utils';

function LoginPage() {
  const dispatch = useDispatch();
  const history = useHistory();
  const [login, { error, loading, data }] = useMutation(LOGIN_MUTATION, {
    onCompleted: ({ login: { user, token } }) => {
      localStorage.setItem('token', token);
      dispatch(fireUserLoaded(doMagicWithUser(user), token));
      if (user.accountType === 'gym') {
        dispatch(sportsGroundLoaded(user.sportsGrounds.length > 0 ? user.sportsGrounds[0] : []));
        history.push('/gym-administration');
      } else if (user.accountType === 'trainer') {
        dispatch(fireTrainerLoaded(user.trainer ? user.trainer : {}));
        history.push('/trainer-administration');
      } else {
        history.push('/');
      }
    },
    onError: () => {},
  });

  const handleSubmit = (email, password) => {
    return login({ variables: { email, password } });
  };

  return (
    <LoginTemplate submitFn={handleSubmit} error={error} loading={loading} data={data} />
  );
}

export default LoginPage;

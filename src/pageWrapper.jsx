import { useDispatch, useSelector } from 'react-redux';
import { useMutation, useQuery } from '@apollo/client';
import React, { useEffect, useState } from 'react';
import Backdrop from '@mui/material/Backdrop';
import { fireTriggerAlert, fireTriggerBackdrop } from './actions/alert/alertActions';
import { ScrollToTop } from './utils/scrollToTop';
import { Routes } from './routes';
import { LOAD_SPORT_TYPES, LOGIN_MUTATION } from './graphql/graphql';
import FitmeAlert from './molecules/fitmeAlert';
import Footer from './organisms/footer';
import NavBar from './organisms/navbar/navBar';
import FitmeLoader from './atoms/fitmeLoader';
import runnerLoader from './utils/animations/runnerLoader.json';
import { fireFilterSportTypesLoaded } from './actions/filter/filterActions';
import { doMagicWithUser, removeTypeName } from './utils/utils';
import { fireUserLoaded } from './actions/user/userActions';
import { sportsGroundLoaded } from './actions/sportsGround/sportsGroundActions';
import { fireTrainerLoaded } from './actions/trainer/trainerActions';

const PageWrapper = () => {
  const [logged, setLogged] = useState(false);

  const dispatch = useDispatch();
  const openAlert = useSelector((state) => state.alertReducer.fitmeAlert || {});
  const openBackdrop = useSelector((state) => state.alertReducer.fitmeBackdrop || {});
  const user = useSelector((state) => state.userReducer.user);

  const handleOnCloseAlert = () => {
    dispatch(fireTriggerAlert(null, null));
  };

  const [login] = useMutation(LOGIN_MUTATION, {
    onCompleted: ({ login: { user, token } }) => {
      dispatch(fireUserLoaded(doMagicWithUser(user), token));
      if (user.accountType === 'gym') {
        dispatch(sportsGroundLoaded(user.sportsGrounds.length > 0 ? user.sportsGrounds[0] : []));
      } else if (user.accountType === 'trainer') {
        dispatch(fireTrainerLoaded(user.trainer ? user.trainer : {}));
      }
      dispatch(fireTriggerBackdrop(false));
      setLogged(true);
    },
    onError: () => {},
  });

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      dispatch(fireTriggerBackdrop(true));
      return login({
        variables: {
          token,
        },
      });
    }
  }, [login]);

  useQuery(LOAD_SPORT_TYPES, {
    onCompleted: ({ sportTypes }) => {
      dispatch(fireFilterSportTypesLoaded(sportTypes.map(
        (st) => ({
          ...st,
          checked: false,
        }),
      )
        .map((st) => removeTypeName(st))));
    },
    onError: () => {},
  });

  if (localStorage.getItem('token') !== null && !logged && !user) {
    return <FitmeLoader loading />;
  }

  return (
    <>
      <Backdrop
        sx={{
          color: '#fff',
          zIndex: 100000,
        }}
        open={openBackdrop.open}
      >
        <FitmeLoader loading color="primary" animation={runnerLoader} />
      </Backdrop>
      <NavBar />
      <ScrollToTop />
      <Routes />
      <FitmeAlert
        open={openAlert.open}
        message={openAlert.message}
        severity={openAlert.severity}
        handleClose={handleOnCloseAlert}
      />
      <Footer />
    </>
  );
};

export default PageWrapper;

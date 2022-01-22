import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Grid from "@mui/material/Grid";
import { useHistory } from "react-router-dom";
import Typography from "@mui/material/Typography";
import FitmeLoader from "../atoms/fitmeLoader";
import { clearRegistrationData } from "../actions/user/userActions";
import useTimer from "../utils/useTimer";

const RegistrationConfirmation = () => {
  const userEmail1 = useSelector(
    (state) => state.registrationReducer.gymForm?.email || ""
  );
  const userEmail2 = useSelector(
    (state) => state.registrationReducer.trainerForm?.email || ""
  );
  const userEmail3 = useSelector(
    (state) => state.registrationReducer.personalForm?.email || ""
  );

  const dispatch = useDispatch();
  const history = useHistory();

  const timerTime = useTimer(true);

  useEffect(() => {
    if (timerTime < 1) {
      history.push("/login");
      dispatch(clearRegistrationData());
    }
  }, [dispatch, history, timerTime]);

  return (
    <Grid
      container
      spacing={0}
      direction="row"
      alignItems="center"
      justifyContent="center"
      marginTop={3}
      marginBottom={10}
    >
      <FitmeLoader loading color="primary">
        <Typography variant="h5">
          Budete přesměrování za:
          {timerTime}
        </Typography>
        <Typography variant="subtitle1">
          {`Děkujeme vám za registraci. Potvrzovací email jsme vám zaslali na adresu: ${
            userEmail1 || userEmail2 || userEmail3
          }`}
        </Typography>
      </FitmeLoader>
    </Grid>
  );
};

export default RegistrationConfirmation;

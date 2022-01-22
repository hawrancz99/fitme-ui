import React, { useEffect, useState } from 'react';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Chip from '@mui/material/Chip';
import ErrorComponent from '../../atoms/errorComponent';
import { personalUpdateValidatedFields } from '../../consts';
import './userProfile.css';
import useValidations from '../../validations/useValidations';

const UserProfileInfo = ({ updateFn, originUser, error }) => {
  const [readOnly, setReadOnly] = useState(true);
  const [user, setUser] = useState(null);
  const [errorObject, errorActions] = useValidations(personalUpdateValidatedFields);

  const handleEditable = () => {
    setReadOnly(false);
  };

  const isStateValueChanged = () => {
    const stateUser = JSON.stringify(user);
    const reducerUser = JSON.stringify(originUser);
    return stateUser !== reducerUser;
  };

  const handleSave = ({
    __typename, sportsGrounds, trainer, ...user
  }) => {
    const formResult = errorActions.isNextDisabled(user);
    if (isStateValueChanged() && !formResult) {
      updateFn({ ...user, emailChanged: originUser.email !== user.email });
    }
    if (!formResult) {
      setReadOnly(true);
    }
  };

  useEffect(() => {
    setUser(originUser);
  }, [originUser]);

  useEffect(() => {
    if (error) {
      setUser(originUser);
    }
  }, [error]);

  return (
    <>
      <Divider style={{ marginTop: '95px', marginBottom: '25px' }}>
        <Chip label="Základní informace" className="admin-page-chip" />
      </Divider>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Box noValidate sx={{ mt: 1 }}>
          <Grid container spacing={2} className="grid-container">
            <Grid item xs={12} justifyContent="flex-end">
              {readOnly ? (
                <IconButton className="float-right" onClick={handleEditable}>
                  <ModeEditIcon color="primary" />
                </IconButton>
              ) : (
                <div style={{ float: 'right', verticalAlign: 'middle' }}>
                  <Button
                    onClick={() => handleSave(user)}
                    variant="contained"
                    style={{ padding: '6px' }}
                    className="primaryBtn"
                  >
                    Uložit změny
                  </Button>
                  <Button
                    onClick={() => {
                      setUser(originUser);
                      setReadOnly(true);
                      errorActions.reset();
                    }}
                    variant="contained"
                    style={{ marginLeft: '0.25em', backgroundColor: '#fff' }}
                    className="deleteBtn"
                  >
                    Zrušit
                  </Button>
                </div>
              )}

            </Grid>
            <Grid item xs={6}>
              <TextField
                autoFocus
                required={!readOnly}
                inputProps={
                  { readOnly }
                }
                autoComplete="given-name"
                name="firstName"
                fullWidth
                id="firstName"
                label="Jméno"
                value={user?.firstName || ''}
                error={errorObject.firstName.error}
                onBlur={() => !readOnly && errorActions.validateFnc('firstName', user?.firstName)}
                onChange={(evt) => setUser({ ...user, firstName: evt.target.value })}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                autoFocus
                required={!readOnly}
                inputProps={
                  { readOnly }
                }
                fullWidth
                id="lastName"
                label="Příjmení"
                name="lastName"
                autoComplete="family-name"
                value={user?.lastName || ''}
                error={errorObject.lastName.error}
                onBlur={() => !readOnly && errorActions.validateFnc('lastName', user?.lastName)}
                onChange={(evt) => setUser({ ...user, lastName: evt.target.value })}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                autoFocus
                inputProps={
                  { readOnly }
                }
                fullWidth
                id="phoneNumber"
                label="Telefonní číslo"
                name="phoneNumber"
                type="number"
                value={user?.phoneNumber || ''}
                error={errorObject.phoneNumber.error}
                onBlur={() => !readOnly && errorActions.validateFnc('phoneNumber', user?.phoneNumber)}
                onChange={(evt) => setUser({ ...user, phoneNumber: evt.target.value })}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                autoFocus
                inputProps={
                  { readOnly }
                }
                required={!readOnly}
                fullWidth
                id="email"
                label="Emailová adresa"
                name="email"
                autoComplete="email"
                value={user?.email || ''}
                error={errorObject.email.error}
                onBlur={() => !readOnly && errorActions.validateFnc('email', user?.email)}
                onChange={(evt) => setUser({ ...user, email: evt.target.value })}
              />
              <ErrorComponent error={error}>
                {error?.message}
              </ErrorComponent>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </>
  );
};

export default UserProfileInfo;

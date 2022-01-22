import React, { useState } from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Grid } from '@mui/material';
import { registrationAccountTypeSelected } from '../actions/user/userActions';
import { route } from '../routes';
import Link from '../atoms/link';

function AccountTypeSelect({ handleNextFn }) {
  const dispatch = useDispatch();
  const accountType = useSelector((state) => state.registrationReducer.accountType || null);
  const [value, setValue] = useState(accountType);

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  const handleNext = () => {
    accountType !== value && dispatch(registrationAccountTypeSelected(value));
    handleNextFn();
  };

  return (
    <Grid
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justifyContent="center"
    >
      <Grid item xs={12}>
        <FormControl component="fieldset" style={{ marginTop: '5vh' }}>
          <FormLabel component="legend">
            Zvolte za jakým účelem účet zakládáte. Na základě toho Vám bude
            přizpůsobeno prostředí webu.
          </FormLabel>
          <RadioGroup
            aria-label="account-type"
            name="account-type-buttons-group"
            value={value}
            onChange={handleChange}
          >
            <FormControlLabel
              value="personal"
              control={<Radio />}
              label="Osobní"
            />
            <FormControlLabel
              value="trainer"
              control={<Radio />}
              label="Účet pro trenéra"
            />
            <FormControlLabel
              value="gym"
              control={<Radio />}
              label="Účet pro sportoviště"
            />
          </RadioGroup>
        </FormControl>
        <Grid container justifyContent="flex-end">
          <Grid item>
            <Link to={route.login()}>
              Již máte účet? Přihlašte se!
            </Link>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <Button onClick={handleNext} disabled={!value} variant="contained" className="primaryBtn">Další</Button>
      </Grid>
    </Grid>
  );
}

export default AccountTypeSelect;

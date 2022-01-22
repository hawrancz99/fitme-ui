import React, { useState } from 'react';
import Container from '@mui/material/Container';
import { Grid } from '@mui/material';
import { useLazyQuery } from '@apollo/client';
import LostPasswordForm from '../organisms/lostPasswordForm';
import { LOST_PASSWORD } from '../graphql/graphql';
import forgotPassword from '../utils/animations/forgot-password.json';
import emailSent from '../utils/animations/email-sent.json';
import LottieAnimation from '../atoms/lottie';

const LostPasswordTemplate = () => {
  const [sent, setSent] = useState(false);

  const [callLostPassword] = useLazyQuery(LOST_PASSWORD, {
    onCompleted: () => {
      setSent(true);
    },
    onError: () => {
      setSent(true);
    },
  });

  return (
    <>
      <Container maxWidth="md">
        <Grid
          alignItems="center"
          justifyContent="center"
        >
          {
                        sent ? <LottieAnimation lotti={emailSent} height={300} width={300} /> : <LottieAnimation lotti={forgotPassword} height={325} width={348} />
                    }
          {sent
            ? (
              <p className="text-center">
                Zaslali jsme vám email s adresou pro změnu hesla. Pokud email nedorazil, je možné, že jste zadali špatnou adresu, nebo se u nás něco pokazilo. Podporu je možné kontaktovat na čísle
                <b>111 111 111</b>
                .
              </p>
            )
            : <p className="text-center">Napište nám prosím svůj email a klikněte na odeslat. Za malou chvíli by vám měl přijít email s odkazem na změnu hesla.</p>}
        </Grid>
      </Container>
      <LostPasswordForm lostPwFn={callLostPassword} alreadySent={sent} />
    </>
  );
};

export default LostPasswordTemplate;

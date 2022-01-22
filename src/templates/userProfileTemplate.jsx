import React from 'react';
import { Event, Person, Settings } from '@mui/icons-material';
import Divider from '@mui/material/Divider';
import Chip from '@mui/material/Chip';
import FitmeTabs from '../organisms/fitmeTabs';
import NewPasswordForm from '../organisms/newPasswordForm';
import UserProfileInfo from '../organisms/user/userProfileInfo';
import Paper from '@mui/material/Paper';
import EventCard from '../molecules/eventCard';

function UserProfileTemplate({
  changePasswordError, handleChangePassword, handleUpdateProfile, updateProfileError, data, originUser, events, refreshFn
}) {
  return (
    <FitmeTabs
      tabsInScroll={[
        {
          text: 'Můj profil',
          component:
            <div style={{ marginTop: '2.5vh' }}>
              <Paper elevation={8} className="paper">
                <UserProfileInfo
                  updateFn={handleUpdateProfile}
                  error={updateProfileError}
                  originUser={originUser}
                />
              </Paper>
            </div>,
          icon: <Person style={{ verticalAlign: 'middle' }}/>,
        },
        {
          text: 'Rezervace',
          component:
            <div style={{ marginTop: '10vh' }}>
              <Paper elevation={8} className="paper">
                <Divider style={{ marginTop: '20px', marginBottom: '25px' }}>
                  <Chip label="Rezervace" className="admin-page-chip" />
                </Divider>
                <EventCard events={events} id={originUser.id} refreshFn={refreshFn} noBackDrop />
              </Paper>
            </div>,
          icon: <Event style={{ verticalAlign: 'middle' }} />,
        },
        {
          text: 'Nastavení',
          component:
            <div style={{
              minHeight: '80vh',
              marginTop: '10vh',
              marginBottom: '10vh',
            }}>
              <Paper elevation={8} className="paper">
                <NewPasswordForm
                  handleChangePassword={handleChangePassword}
                  error={changePasswordError}
                  data={data}
                />
              </Paper>
            </div>,
          icon: <Settings style={{ verticalAlign: 'middle' }}/>,
        },
      ]}
    />
  );
}

export default UserProfileTemplate;

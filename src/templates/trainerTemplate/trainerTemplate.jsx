import { Event, Image, Person, Settings, } from '@mui/icons-material';
import React from 'react';
import SportsKabaddiIcon from '@mui/icons-material/SportsKabaddi';
import Paper from '@mui/material/Paper';
import StarRateIcon from '@mui/icons-material/StarRate';
import FitmeRating from '../../organisms/rating/fitmeRating';
import FitmeTabs from '../../organisms/fitmeTabs';
import NewPasswordForm from '../../organisms/newPasswordForm';
import SportsActivities from '../../organisms/sportTypes/sportsActivities';
import TrainerInfo from '../../organisms/trainer/trainerInfo';
import FitmeGalery from '../../organisms/galery/fitmeGalery';
import FitmeEvents from '../../organisms/events/fitmeEvents';
import { getAvgRating } from '../../utils/utils';
import Divider from '@mui/material/Divider';
import Chip from '@mui/material/Chip';

const TrainerTemplate = ({
                             updateTrainer,
                             error,
                             trainer,
                             trainerSportTypes = [],
                             handleChangePassword,
                             changePasswordError,
                             changePasswordData,
                         }) => (
    <FitmeTabs
        tabsInScroll={[
            {
                text: 'Základní informace',
                component:
                    <div style={{marginTop: '2.5vh'}}>
                        <Paper elevation={8} className="paper" style={{marginTop: '70px'}}>
                            <TrainerInfo
                                updateFn={updateTrainer}
                                originTrainer={trainer}
                                error={error}
                            />
                        </Paper>
                    </div>,
                icon: <Person style={{verticalAlign: 'middle', marginLeft: '15px'}}/>,
            },
          {
            text: 'Sportovní aktivity',
            component:
              <div style={{ marginTop: '10vh' }}>
                <Paper elevation={8} className="paper">
                  <SportsActivities
                    accountType="trainer"
                    subjectId={trainer?.id}
                    subjectSportTypes={trainerSportTypes}
                  />
                </Paper>
              </div>,
            icon: <SportsKabaddiIcon style={{ verticalAlign: 'middle', marginLeft: '15px' }} />,
          },
            {
                text: 'Události',
                component:
                    <div style={{marginTop: '10vh'}}>
                        <Paper elevation={8} className="paper">
                          <FitmeEvents events={trainer?.events} accountType="trainer" sportTypes={trainer?.sportTypes} subjectsId={trainer?.id} location={trainer?.fullAddress}/>
                        </Paper>
                    </div>,
                icon: <Event style={{verticalAlign: 'middle', marginLeft: '15px'}}/>,
            },
          {
            text: 'Galerie',
            component:
              <div style={{
                marginBottom: '10vh',
                marginTop: '10vh'
              }}>
                <Paper elevation={8} className="paper">
                  <FitmeGalery photos={trainer?.images} accountType="trainer" id={trainer?.id}/>
                </Paper>
              </div>,
            icon: <Image style={{
              verticalAlign: 'middle',
              marginLeft: '15px'
            }}/>,
          },
          {
            text: 'Moje hodnocení',
            component:
              <div style={{marginTop: '10vh', marginBottom: '10vh'}}>
                <Paper elevation={8} className="paper">
                  <Divider style={{
                    marginTop: '25px',
                    marginBottom: '25px'
                  }}>
                    <Chip label="Moje hodnocení" className="admin-page-chip"/>
                  </Divider>
                  {
                    trainer?.reviews?.length > 0 ? <FitmeRating value={getAvgRating(trainer.reviews)} reviews={trainer.reviews}/>
                      : (
                        <div style={{
                          minHeight: '10vh',
                          textAlign: 'center'
                        }}>
                          <h3>Dosud žádná hodnocení</h3>
                        </div>
                      )
                  }
                </Paper>
              </div>,
            icon: <StarRateIcon style={{verticalAlign: 'middle'}}/>,
          },
            {
                text: 'Nastavení',
                component:
                    <div style={{minHeight: '80vh', marginTop: '10vh', marginBottom: '10vh'}}>
                        <Paper elevation={8} className="paper">
                            <NewPasswordForm handleChangePassword={handleChangePassword} error={changePasswordError}
                                             data={changePasswordData}/>
                        </Paper>
                    </div>,
                icon: <Settings style={{verticalAlign: 'middle'}}/>,
            }
        ]}
    />
);

export default TrainerTemplate;

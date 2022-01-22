import React from 'react';
import Card from '@mui/material/Card';
import Container from '@mui/material/Container';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import useScrollSpy from '../utils/scrollspy/useScrollSpy';

const FitmeTabs = (props) => {
  const [activeState, itemsServer, actions] = useScrollSpy(props);
  return (
    <div>
      <Card
        variant="outlined"
        sx={{
          boxShadow: '0 0 10px 0 rgb(0 0 0 / 50%)',
          top: 80,
          position: 'fixed',
          width: '100%',
          zIndex: '1000',
        }}
      >
        <Container>
          <Tabs
            variant="scrollable"
            scrollButtons="auto"
            aria-label="scrollable auto tabs example"
            value={activeState || itemsServer[0].hash}
          >
            {itemsServer.map((item2) => (
              <Tab
                key={item2.hash}
                label={item2.label}
                onClick={actions.handleClick(item2.hash)}
                value={item2.hash}
              />
            ))}
          </Tabs>
        </Container>
      </Card>
      <Box sx={{ width: '100%' }} marginTop="2.5em">
        <Container maxWidth="lg">
          {itemsServer.map((item1) => (
            <article id={item1.hash} key={item1.text}>
              {item1.component}
            </article>
          ))}
        </Container>
      </Box>
    </div>
  );
};

export default FitmeTabs;

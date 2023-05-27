import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import TabPanel from '../components/TabPanel';
import { Outlet, useLocation, useNavigate } from 'react-router';
const LoginAndRegisteration = () => {
  const location = useLocation();
  const [value, setValue] = useState(0);
  const navigator = useNavigate();
  const handleChange = (e, newValue) => {
    e.preventDefault();

    setValue(newValue);
  };
  function a11yProps(index) {
    return {
      id: `full-width-tab-${index}`,
      'aria-controls': `full-width-tabpanel-${index}`,
    };
  }
  useEffect(() => {
    if (location.pathname === '/signin') {
      setValue(1);
    } else {
      setValue(0);
    }
  }, [location]);
  return (
    <Box
      sx={{
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#2363eb',
      }}>
      <Box
        sx={{
          width: 350,
          height: 480,
          display: 'flex',
          backgroundColor: '#e5e7eb',
          p: { xs: '1rem', sm: '2rem' },
          borderRadius: 2,
          flexDirection: 'column',
        }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs
            value={value}
            onChange={handleChange}
            textColor='secondary'
            indicatorColor='secondary'
            centered
            aria-label='basic tabs example'>
            <Tab
              label='Sign Up'
              {...a11yProps(0)}
              onClick={() => {
                navigator('/signup');
              }}
            />
            <Tab
              label='Sign In'
              {...a11yProps(1)}
              onClick={() => {
                navigator('/signin');
              }}
            />
          </Tabs>
        </Box>
        <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
          <TabPanel value={value} index={0}>
            <Outlet />
          </TabPanel>
          <TabPanel value={value} index={1}>
            <Outlet />
          </TabPanel>
        </Box>
      </Box>
    </Box>
  );
};

export default LoginAndRegisteration;

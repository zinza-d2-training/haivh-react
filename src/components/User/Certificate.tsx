import React from 'react';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import { Box, Tab } from '@mui/material';

import ContainerLayout from '../ContainerLayout';
import VaccineCertificate from './VaccineCertificate';
import RegisterResult from './RegisterResult';
import Account from './Account';
import { useSearchParams } from 'react-router-dom';

const Certificate = () => {
  const [searchParams] = useSearchParams();
  const [value, setValue] = React.useState(searchParams.get('tab') || '1');
  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  return (
    <ContainerLayout>
      <Box sx={{ width: '100%', typography: 'body1' }}>
        <TabContext value={value}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 6 }}>
            <TabList onChange={handleChange} aria-label="lab API tabs example">
              <Tab label="Chứng nhận tiêm chủng" value="1" />
              <Tab label="Kết quả đăng ký" value="2" />
              <Tab label="Tài khoản" value="3" />
            </TabList>
          </Box>
          <TabPanel value="1">
            <VaccineCertificate />{' '}
          </TabPanel>
          <TabPanel value="2">
            <RegisterResult />{' '}
          </TabPanel>
          <TabPanel value="3">
            <Account />{' '}
          </TabPanel>
        </TabContext>
      </Box>
    </ContainerLayout>
  );
};

export default Certificate;

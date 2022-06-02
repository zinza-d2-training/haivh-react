import React from 'react';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import { Box, Tab } from '@mui/material';

import ContainerLayout from '../ContainerLayout';
import VaccineCertificate from './VaccineCertificate';
import RegisterResult from './RegisterResult';
import Account from './Account';
import { useSearchParams } from 'react-router-dom';

const enum AccountTabId {
  Certificate = 'certificate',
  Registration = 'registration',
  Profile = 'profile'
}

const Certificate = () => {
  const [searchParams] = useSearchParams();
  const [value, setValue] = React.useState(
    searchParams.get('tab') || AccountTabId.Certificate
  );
  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  return (
    <ContainerLayout>
      <Box sx={{ width: '100%', typography: 'body1' }}>
        <TabContext value={value}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 6 }}>
            <TabList onChange={handleChange} aria-label="lab API tabs example">
              <Tab
                label="Chứng nhận tiêm chủng"
                value={AccountTabId.Certificate}
              />
              <Tab label="Kết quả đăng ký" value={AccountTabId.Registration} />
              <Tab label="Tài khoản" value={AccountTabId.Profile} />
            </TabList>
          </Box>
          <TabPanel value={AccountTabId.Certificate}>
            <VaccineCertificate />
          </TabPanel>
          <TabPanel value={AccountTabId.Registration}>
            <RegisterResult />
          </TabPanel>
          <TabPanel value={AccountTabId.Profile}>
            <Account />
          </TabPanel>
        </TabContext>
      </Box>
    </ContainerLayout>
  );
};

export default Certificate;

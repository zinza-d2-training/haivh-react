import React from 'react';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import { Box, Tab } from '@mui/material';

import ContainerLayout from '../ContainerLayout';
import VaccineCertificate from './VaccineCertificate';
import RegisterResult from './RegisterResult';
import Account from './Account';
import { useSearchParams, Link } from 'react-router-dom';

export const enum AccountTabId {
  Certificate = 'certificate',
  Registration = 'registration',
  Profile = 'profile'
}

const Certificate = () => {
  const [searchParams] = useSearchParams();
  const [value, setValue] = React.useState(
    searchParams.get('tab') || AccountTabId.Certificate
  );
  const handleChange = (
    event: React.SyntheticEvent,
    newValue: AccountTabId
  ) => {
    setValue(newValue);
  };

  return (
    <ContainerLayout>
      <Box sx={{ width: '100%', typography: 'body1' }}>
        <TabContext value={searchParams.get('tab') || value}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 6 }}>
            <TabList onChange={handleChange} aria-label="lab API tabs example">
              <Tab
                component={Link}
                label="Chứng nhận tiêm chủng"
                to={`/user-info?tab=${AccountTabId.Certificate}`}
                value={AccountTabId.Certificate}
              />
              <Tab
                component={Link}
                label="Kết quả đăng ký"
                to={`/user-info?tab=${AccountTabId.Registration}`}
                value={AccountTabId.Registration}
              />
              <Tab
                component={Link}
                label="Tài khoản"
                to={`/user-info?tab=${AccountTabId.Profile}`}
                value={AccountTabId.Profile}
              />
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

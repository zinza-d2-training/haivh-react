import React from 'react';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import { Box, Tab } from '@mui/material';
import { useSearchParams } from 'react-router-dom';
import ContainerLayout from '../ContainerLayout';
import Location from './Location';
import Registration from './Registration';
import Document from './Document';

export const enum TabId {
  Location = 'location',
  Registration = 'registration',
  Document = 'document'
}

const Control = () => {
  const [searchParams] = useSearchParams();
  const [value, setValue] = React.useState(
    searchParams.get('tab') || TabId.Location
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
              <Tab label="Điểm tiêm" value={TabId.Location} />
              <Tab label="Đăng ký" value={TabId.Registration} />
              <Tab label="Tài liệu" value={TabId.Document} />
            </TabList>
          </Box>
          <TabPanel value={TabId.Location}>
            <Location />
          </TabPanel>
          <TabPanel value={TabId.Registration}>
            <Registration />
          </TabPanel>
          <TabPanel value={TabId.Document}>
            <Document />
          </TabPanel>
        </TabContext>
      </Box>
    </ContainerLayout>
  );
};

export default Control;

import React from 'react';
import styled from '@emotion/styled';
import Box from '@mui/material/Box';

import InfoForm from './InfoForm';
import PasswordForm from './PasswordForm';

const ContainerBox = styled(Box)``;

const Account = () => {
  return (
    <ContainerBox>
      <InfoForm />
      <PasswordForm />
    </ContainerBox>
  );
};

export default Account;

import React from 'react';
import { styled } from '@mui/material/styles';
import { Box, Typography } from '@mui/material';

const HeadingBox = styled(Box)`
  height: 64px;
  background-color: #f5f5f5;
  margin: 34px 0 46px;
  padding: 13.5px 36px;
`;

const Heading = () => {
  return (
    <HeadingBox>
      <Typography
        sx={{
          fontSize: '28px',
          fontWeight: '400',
          lineHeight: '37px',
          color: 'rgba(0, 0, 0, 0.87)'
        }}>
        Tra cứu đăng ký tiêm
      </Typography>
    </HeadingBox>
  );
};

export default Heading;

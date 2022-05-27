import React from 'react';
import styled from '@emotion/styled';
import CheckoutStep from './CheckoutStep';
import Heading from './Heading';
import { ArrowBack, ArrowForward } from '@mui/icons-material';

import { Box, Typography, Button } from '@mui/material';
import { blue, red } from '@mui/material/colors';
const BoxContainer = styled(Box)`
  padding: 36px;
`;

const BoxText = styled(Box)`
  text-align: center;
`;

const BoxInfo = styled(Box)`
  display: flex;
  margin-bottom: 16px;
`;

const BoxItem = styled(Box)`
  width: 456px;
`;

const ButtonBox = styled(Box)`
  display: flex;
  justify-content: center;
  margin-bottom: 300px;
  margin-top: 24px;
`;

const RegistrationStep3 = () => {
  return (
    <>
      <Heading />
      <BoxContainer>
        <CheckoutStep activeStep={2} />

        <BoxText>
          <Typography
            sx={{
              fontSize: '20px',
              fontWeight: '500',
              lineHeight: '32px',
              letterSpacing: '-0.05px',
              mb: 2
            }}>
            Đăng ký tiêm chủng COVID-19 thành công. Mã đặt tiêm của bạn là
            <Typography
              sx={{
                display: 'inline',
                fontSize: '20px',
                fontWeight: '500',
                lineHeight: '32px',
                letterSpacing: '-0.05px',
                color: red[400]
              }}>
              {' '}
              0120211103501237
            </Typography>
          </Typography>
          <Typography
            sx={{
              fontSize: '16px',
              fontWeight: '400',
              lineHeight: '24px',
              letterSpacing: '-0.04px',
              mb: 2
            }}>
            Cảm ơn quý khách đã đăng ký tiêm chủng vắc xin COVID-19. Hiện tại Bộ
            y tế đang tiến hành thu thập nhu cầu và thông tin để lập danh sách
            đối tượng đăng ký tiêm vắc xin COVID-19 theo từng địa bàn. Chúng tôi
            sẽ liên hệ với quý khách theo số điện thoại{' '}
            <Typography
              sx={{
                fontSize: '16px',
                fontWeight: '400',
                lineHeight: '24px',
                letterSpacing: '-0.04px',
                display: 'inline',
                color: blue[600]
              }}>
              0123456789
            </Typography>{' '}
            khi có kế hoạch tiêm trong thời gian sớm nhất.
          </Typography>
          <Typography
            sx={{
              fontSize: '16px',
              fontWeight: '400',
              lineHeight: '24px',
              letterSpacing: '-0.04px',
              mb: 2
            }}>
            Mời bạn tải ứng dụng "SỔ SỨC KHỎE ĐIỆN TỬ" tại
            <Typography
              sx={{
                display: 'inline',
                fontSize: '16px',
                fontWeight: '400',
                lineHeight: '24px',
                letterSpacing: '-0.04px',
                color: red[400]
              }}>
              {' '}
              https://hssk.kcb.vn/#/sskdt
            </Typography>{' '}
            để theo dõi kết quả đăng ký tiêm và nhận chứng nhận tiêm chủng
            COVID-19
          </Typography>
        </BoxText>

        <BoxInfo>
          <BoxItem>
            <Typography>Họ và tên</Typography>
            <Typography>Nguyễn Văn A</Typography>
          </BoxItem>
          <BoxItem>
            <Typography>Họ và tên</Typography>
            <Typography>Nguyễn Văn A</Typography>
          </BoxItem>
          <BoxItem>
            <Typography>Họ và tên</Typography>
            <Typography>Nguyễn Văn A</Typography>
          </BoxItem>
        </BoxInfo>

        <BoxInfo>
          <BoxItem>
            <Typography>Họ và tên</Typography>
            <Typography>Nguyễn Văn A</Typography>
          </BoxItem>
          <BoxItem>
            <Typography>Họ và tên</Typography>
            <Typography>Nguyễn Văn A</Typography>
          </BoxItem>
          <BoxItem>
            <Typography>Họ và tên</Typography>
            <Typography>Nguyễn Văn A</Typography>
          </BoxItem>
        </BoxInfo>

        <BoxInfo>
          <BoxItem>
            <Typography>Họ và tên</Typography>
            <Typography>Nguyễn Văn A</Typography>
          </BoxItem>
          <BoxItem>
            <Typography>Họ và tên</Typography>
            <Typography>Nguyễn Văn A</Typography>
          </BoxItem>
          <BoxItem>
            <Typography>Họ và tên</Typography>
            <Typography>Nguyễn Văn A</Typography>
          </BoxItem>
        </BoxInfo>

        <ButtonBox>
          <Button
            variant="outlined"
            startIcon={<ArrowBack />}
            sx={{
              mr: 2
            }}>
            Trang chủ
          </Button>
          <Button variant="contained" endIcon={<ArrowForward />}>
            Xuất thông tin
          </Button>
        </ButtonBox>
      </BoxContainer>
    </>
  );
};

export default RegistrationStep3;

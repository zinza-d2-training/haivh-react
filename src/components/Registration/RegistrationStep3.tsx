import React from 'react';
import styled from '@emotion/styled';
import CheckoutStep from './CheckoutStep';
import Heading from './Heading';
import { ArrowBack, ArrowForward } from '@mui/icons-material';
import { Box, Typography, Button } from '@mui/material';
import { blue, red } from '@mui/material/colors';
import { useNavigate } from 'react-router-dom';
import { jsPDF } from 'jspdf';
const html2canvas = require('html2canvas');
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

const TextLabel = styled(Typography)`
  font-size: 16px;
  font-weight: 400;
  line-height: 24px;
  letter-spacing: -0.04px;
  color: rgba(0, 0, 0, 0.87);
`;

const TextInfo = styled(Typography)`
  font-size: 16px;
  font-weight: 500;
  line-height: 24px;
  letter-spacing: -0.04px;
  color: rgba(0, 0, 0, 0.87);
`;

const PDFBox = styled(Box)``;
const RegistrationStep3 = () => {
  const navigate = useNavigate();
  const handleHomepage = () => {
    navigate('/');
  };

  const handlePDF = () => {
    html2canvas(document.getElementById('export')).then(
      (canvas: HTMLCanvasElement) => {
        const doc = new jsPDF();
        doc.addImage(canvas, 'JPEG', 5, 20, 200, 52);
        doc.save('download.pdf');
      }
    );
  };
  return (
    <>
      <Heading />
      <BoxContainer>
        <CheckoutStep activeStep={2} />

        <PDFBox id="export">
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
              Cảm ơn quý khách đã đăng ký tiêm chủng vắc xin COVID-19. Hiện tại
              Bộ y tế đang tiến hành thu thập nhu cầu và thông tin để lập danh
              sách đối tượng đăng ký tiêm vắc xin COVID-19 theo từng địa bàn.
              Chúng tôi sẽ liên hệ với quý khách theo số điện thoại{' '}
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
              <TextLabel>Họ và tên</TextLabel>
              <TextInfo>Nguyễn Văn A</TextInfo>
            </BoxItem>
            <BoxItem>
              <TextLabel>Ngày sinh</TextLabel>
              <TextInfo>16/10/1994</TextInfo>
            </BoxItem>
            <BoxItem>
              <TextLabel>Giới tính</TextLabel>
              <TextInfo>Nam</TextInfo>
            </BoxItem>
          </BoxInfo>

          <BoxInfo>
            <BoxItem>
              <TextLabel>Số CMND/CCCD/Mã định danh công dân</TextLabel>
              <TextInfo>030012345678</TextInfo>
            </BoxItem>
            <BoxItem>
              <TextLabel>Số thẻ BHYT</TextLabel>
            </BoxItem>
          </BoxInfo>

          <BoxInfo>
            <BoxItem>
              <TextLabel>Tỉnh/Thành phố</TextLabel>
              <TextInfo>Thành phố Hà Nội</TextInfo>
            </BoxItem>
            <BoxItem>
              <TextLabel>Quận/Huyện</TextLabel>
              <TextInfo>Quận Long Biên</TextInfo>
            </BoxItem>
            <BoxItem>
              <TextLabel>Xã/Phường</TextLabel>
              <TextInfo>Phường Giang Biên</TextInfo>
            </BoxItem>
          </BoxInfo>
        </PDFBox>
        <ButtonBox>
          <Button
            onClick={handleHomepage}
            variant="outlined"
            startIcon={<ArrowBack />}
            sx={{
              mr: 2
            }}>
            Trang chủ
          </Button>
          <Button
            variant="contained"
            endIcon={<ArrowForward />}
            onClick={handlePDF}>
            Xuất thông tin
          </Button>
        </ButtonBox>
      </BoxContainer>
    </>
  );
};

export default RegistrationStep3;

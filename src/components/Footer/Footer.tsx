import React from 'react';
import Logo_2 from '../../img/Logo_2.png';
import Cert from '../../img/Cert.png';
import './Footer.css';

import { Typography, Button, Box } from '@mui/material';
import { Apple } from '@mui/icons-material';
import ContainerLayout from '../ContainerLayout';
import { styled } from '@mui/material/styles';

const FlexBox = styled(Box)`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const Footer = () => {
  return (
    <footer className="footer-container">
      <ContainerLayout>
        <FlexBox>
          <div className="footer-license">
            <Typography
              sx={{
                fontSize: '14px',
                color: '#fff',
                lineHeight: '20px',
                letterSpacing: '-0.04px',
                fontWeight: '400',
                mb: 0.5
              }}>
              © Bản quyền thuộc{' '}
              <Typography
                sx={{
                  display: 'inline-block',
                  fontSize: '14px',
                  color: '#fff',
                  lineHeight: '20px',
                  letterSpacing: '-0.04px',
                  fontWeight: '700',
                  mb: 0.5
                }}>
                TRUNG TÂM CÔNG NGHỆ PHÒNG, CHỐNG DỊCH COVID-19 QUỐC GIA
              </Typography>
            </Typography>
            <Typography
              sx={{
                fontSize: '14px',
                color: '#fff',
                lineHeight: '20px',
                letterSpacing: '-0.04px',
                fontWeight: '400',
                mb: 0.5
              }}>
              Phát triển bởi{' '}
              <Typography sx={{ display: 'inline-block', color: 'red' }}>
                Viettel
              </Typography>
            </Typography>
            <img src={Logo_2} alt="" className="footer-license__logo" />
          </div>

          <div className="footer-download">
            <Typography
              sx={{
                fontSize: '14px',
                color: '#fff',
                lineHeight: '20px',
                letterSpacing: '-0.04px',
                fontWeight: '400',
                mb: 2
              }}>
              Tải sổ sức khỏe điện tử để đăng ký tiêm và nhận giấy chứng nhận
              tiêm
            </Typography>
            <div className="footer-download__group">
              <Button
                variant="outlined"
                sx={{
                  color: '#fff',
                  borderColor: '#fff',
                  borderRadius: '8px 8px 8px 0',
                  padding: '8px 22px'
                }}>
                App tiêm di động (Cho HCM)
              </Button>
              <Button
                variant="outlined"
                sx={{
                  ml: 2,
                  mr: 2,
                  color: '#fff',
                  borderColor: '#fff',
                  borderRadius: '8px 8px 8px 0',
                  padding: '8px 22px'
                }}>
                Apple Store
              </Button>
              <Button
                variant="outlined"
                sx={{
                  color: '#fff',
                  borderColor: '#fff',
                  borderRadius: '8px 8px 8px 0',
                  padding: '8px 22px'
                }}>
                Google Play
              </Button>
            </div>
            <img src={Cert} alt="" />
          </div>
        </FlexBox>
      </ContainerLayout>
    </footer>
  );
};

export default Footer;

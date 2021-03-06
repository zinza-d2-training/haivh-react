import React from 'react';
import styled from '@emotion/styled';
import CheckoutStep from './CheckoutStep';
import Heading from './Heading';
import ContainerLayout from '../ContainerLayout';
import { ArrowBack, ArrowForward } from '@mui/icons-material';
import { Box, Typography, Button } from '@mui/material';
import { blue, red } from '@mui/material/colors';
import { useNavigate } from 'react-router-dom';
import { jsPDF } from 'jspdf';
import { useAppSelector } from '../../app/hooks';
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
  const user = useAppSelector((state) => state.user.value.user);
  const userDoB = new Date(user.dob).toLocaleDateString('en-US');
  const vaccineRegistrationInfo = useAppSelector(
    (state) => state.vaccineRegistration.vaccineRegistrationInfo
  );

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
      <ContainerLayout>
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
                ????ng k?? ti??m ch???ng COVID-19 th??nh c??ng. M?? ?????t ti??m c???a b???n l??
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
                  {vaccineRegistrationInfo.id}
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
                C???m ??n qu?? kh??ch ???? ????ng k?? ti??m ch???ng v???c xin COVID-19. Hi???n
                t???i B??? y t??? ??ang ti???n h??nh thu th???p nhu c???u v?? th??ng tin ????? l???p
                danh s??ch ?????i t?????ng ????ng k?? ti??m v???c xin COVID-19 theo t???ng ?????a
                b??n. Ch??ng t??i s??? li??n h??? v???i qu?? kh??ch theo s??? ??i???n tho???i{' '}
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
                khi c?? k??? ho???ch ti??m trong th???i gian s???m nh???t.
              </Typography>
              <Typography
                sx={{
                  fontSize: '16px',
                  fontWeight: '400',
                  lineHeight: '24px',
                  letterSpacing: '-0.04px',
                  mb: 2
                }}>
                M???i b???n t???i ???ng d???ng "S??? S???C KH???E ??I???N T???" t???i
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
                ????? theo d??i k???t qu??? ????ng k?? ti??m v?? nh???n ch???ng nh???n ti??m ch???ng
                COVID-19
              </Typography>
            </BoxText>

            <BoxInfo>
              <BoxItem>
                <TextLabel>H??? v?? t??n</TextLabel>
                <TextInfo>{user.name}</TextInfo>
              </BoxItem>
              <BoxItem>
                <TextLabel>Ng??y sinh</TextLabel>
                <TextInfo>{userDoB}</TextInfo>
              </BoxItem>
              <BoxItem>
                <TextLabel>Gi???i t??nh</TextLabel>
                <TextInfo>{user.gender}</TextInfo>
              </BoxItem>
            </BoxInfo>

            <BoxInfo>
              <BoxItem>
                <TextLabel>S??? CMND/CCCD/M?? ?????nh danh c??ng d??n</TextLabel>
                <TextInfo>{user.identity_card}</TextInfo>
              </BoxItem>
              <BoxItem>
                <TextLabel>S??? th??? BHYT</TextLabel>
                <TextInfo>{vaccineRegistrationInfo.health_insurance}</TextInfo>
              </BoxItem>
            </BoxInfo>

            <BoxInfo>
              <BoxItem>
                <TextLabel>T???nh/Th??nh ph???</TextLabel>
                <TextInfo>{user.ward.district.province.name}</TextInfo>
              </BoxItem>
              <BoxItem>
                <TextLabel>Qu???n/Huy???n</TextLabel>
                <TextInfo>{user.ward.district.name}</TextInfo>
              </BoxItem>
              <BoxItem>
                <TextLabel>X??/Ph?????ng</TextLabel>
                <TextInfo>{user.ward.name}</TextInfo>
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
              Trang ch???
            </Button>
            <Button
              variant="contained"
              endIcon={<ArrowForward />}
              onClick={handlePDF}>
              Xu???t th??ng tin
            </Button>
          </ButtonBox>
        </BoxContainer>
      </ContainerLayout>
    </>
  );
};

export default RegistrationStep3;

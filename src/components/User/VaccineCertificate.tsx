import React from 'react';
import styled from '@emotion/styled';
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Paper,
  Button
} from '@mui/material';

import QR from '../../img/QR.png';
import Logo_3 from '../../img/Logo_3.png';
import date from '../../img/date.png';
import cmnd from '../../img/cmnd.png';
import person from '../../img/person.png';
import { useNavigate } from 'react-router-dom';

function createData(
  id: number,
  time: string,
  vaccine_name: string,
  batch_number: string,
  address: string
) {
  return { id, time, vaccine_name, batch_number, address };
}

const rows = [
  createData(
    1,
    '08/09/2021 - 16:56',
    'COVID-19 Vaccine AstraZeneca',
    'NJ0342',
    'TYT Dịch Vọng Hậu'
  ),
  createData(
    2,
    '08/09/2021 - 16:56',
    'COVID-19 Vaccine AstraZeneca',
    'NJ0342',
    'TYT Dịch Vọng Hậu'
  )
];

const ContainerBox = styled(Box)`
  display: flex;
`;

const ContentBox = styled(Box)`
  flex: 1;
  position: relative;
`;

const InfoBox = styled(Box)`
  display: flex;
  justify-content: space-between;
  margin-top: 24px;
`;

const CertificateBox = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 8px 8px 8px 0;
  width: 340px;
  height: 668px;
  margin-left: 16px;
  padding: 24px;
  background-color: ${rows.length > 1 ? '#43A047' : '#fdd835'};
`;

const ItemBox = styled(Box)``;

const LabelText = styled(Typography)`
  font-size: 16px;
  font-weight: 400;
  line-height: 24px;
  color: rgba(0, 0, 0, 0.87);
  letter-spacing: -0.04px;
`;

const InfoText = styled(Typography)`
  font-size: 16px;
  font-weight: 500;
  line-height: 24px;
  color: rgba(0, 0, 0, 0.87);
  letter-spacing: -0.04px;
`;

const CertificateInfo = styled(Box)`
  background-color: #fff;
  width: 100%;
  border-radius: 8px 8px 8px 0;
  margin-top: 24px;
  padding: 0 16px;
`;

const CertificateInfoItem = styled(Box)`
  display: flex;
  align-items: flex-start;
  margin: 16px 0;
`;

const VaccineCertificate = () => {
  const navigate = useNavigate();
  const handleRegister = () => {
    navigate('/registration-step-1');
  };
  return (
    <ContainerBox>
      <ContentBox>
        <LabelText
          sx={{
            textAlign: 'center'
          }}>
          CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM
        </LabelText>
        <InfoText
          sx={{
            textAlign: 'center'
          }}>
          Độc lập - Tự do - Hạnh phúc
        </InfoText>
        <Typography
          sx={{
            fontSize: '24px',
            fontWeight: '500',
            lineHeight: '32px',
            color: 'rgba(0, 0, 0, 0.87)',
            letterSpacing: '-0.04px',
            textAlign: 'center',
            mt: 3
          }}>
          CHỨNG NHẬN TIÊM CHỦNG COVID-19
        </Typography>
        <InfoBox>
          <ItemBox>
            <LabelText>Họ và tên</LabelText>
            <InfoText>Nguyễn Văn A</InfoText>
          </ItemBox>
          <ItemBox>
            <LabelText>Ngày sinh</LabelText>
            <InfoText>16/10/1994</InfoText>
          </ItemBox>
          <ItemBox>
            <LabelText>Số CMND/CCCD</LabelText>
            <InfoText>030012345678</InfoText>
          </ItemBox>
          <ItemBox>
            <LabelText>Số thẻ BHYT</LabelText>
            <InfoText>030094005102</InfoText>
          </ItemBox>
        </InfoBox>
        <LabelText
          sx={{
            mt: 2
          }}>
          Địa chỉ
        </LabelText>
        <InfoText>
          Phường Giang Biên - Quận Long Biên - Thành phố Hà Nội
        </InfoText>
        <LabelText
          sx={{
            mt: 2
          }}>
          Kết luận
        </LabelText>
        <InfoText>Đã được tiêm phòng vắc xin phòng bệnh Covid-19</InfoText>
        <TableContainer
          component={Paper}
          sx={{
            mt: 2
          }}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead sx={{ backgroundColor: 'rgba(238, 238, 238, 0.4)' }}>
              <TableRow>
                <TableCell align="center">Mũi số</TableCell>
                <TableCell align="center">Thời gian tiêm</TableCell>
                <TableCell align="center">Tên vắc xin</TableCell>
                <TableCell align="center">Số lô</TableCell>
                <TableCell align="center">Nơi tiêm</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row, index) => (
                <TableRow
                  key={row.id}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                  <TableCell align="center">{(index += 1)}</TableCell>
                  <TableCell align="center">{row.time}</TableCell>
                  <TableCell align="center">{row.vaccine_name}</TableCell>
                  <TableCell align="center">{row.batch_number}</TableCell>
                  <TableCell align="center">{row.address}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Button
          onClick={handleRegister}
          variant="contained"
          sx={{
            borderRadius: '8px 8px 8px 0',
            mt: 2,
            position: 'absolute',
            left: '50%',
            transform: 'translateX(-50%)'
          }}>
          Đăng ký mũi tiêm tiếp theo
        </Button>
      </ContentBox>

      <CertificateBox>
        <Box
          component="img"
          src={Logo_3}
          sx={{
            width: '100px',
            height: '100px',
            mb: 3
          }}
        />
        <Typography
          sx={{
            fontSize: '24px',
            fontWeight: '500',
            lineHeight: '32px',
            color: '#fff',
            mb: 3
          }}>
          ĐÃ TIÊM {rows.length} MŨI VẮC XIN
        </Typography>
        <Box component="img" src={QR} />
        <CertificateInfo>
          <CertificateInfoItem>
            <Box component="img" src={person} sx={{ mr: 1 }} />
            <Box>
              <LabelText>Họ và tên</LabelText>
              <InfoText>Nguyễn Văn A</InfoText>
            </Box>
          </CertificateInfoItem>
          <CertificateInfoItem>
            <Box component="img" src={date} sx={{ mr: 1 }} />
            <Box>
              <LabelText>Ngày sinh</LabelText>
              <InfoText>16/10/1994</InfoText>
            </Box>
          </CertificateInfoItem>
          <CertificateInfoItem>
            <Box component="img" src={cmnd} sx={{ mr: 1 }} />
            <Box>
              <LabelText>Số CMND/CCCD</LabelText>
              <InfoText>030012345678</InfoText>
            </Box>
          </CertificateInfoItem>
        </CertificateInfo>
      </CertificateBox>
    </ContainerBox>
  );
};

export default VaccineCertificate;

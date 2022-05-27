import React from 'react';
import styled from '@emotion/styled';
import CheckoutStep from './CheckoutStep';
import Heading from './Heading';
import { ArrowBack, ArrowForward } from '@mui/icons-material';

import Hospital from '../../img/hospital_icon.png';
import Shield from '../../img/shield_icon.png';
import Vaccine from '../../img/vaccine_icon.png';
import {
  Box,
  FormControlLabel,
  Checkbox,
  FormControl,
  MenuItem,
  Select,
  Typography,
  TextField,
  List,
  ListItem,
  ListItemText,
  Button
} from '@mui/material';
const BoxContainer = styled(Box)`
  padding: 36px;
`;

const BoxContent = styled(Box)`
  border-bottom: 2px solid #eeeeee;
`;

const BoxText = styled(Box)`
  display: flex;
  align-items: center;
  margin-bottom: 16px;
`;

const TickBox = styled(Box)`
  display: flex;
  align-items: center;
`;

const ButtonBox = styled(Box)`
  display: flex;
  justify-content: center;
  margin-bottom: 300px;
`;
const RegistrationStep2 = () => {
  return (
    <>
      <Heading />
      <BoxContainer>
        <CheckoutStep activeStep={1} />

        <BoxContent>
          <BoxText>
            <Box component="img" src={Shield} />
            <Typography sx={{ ml: 1.25 }}>
              1. Tiêm chủng vắc xin là biện pháp phòng chống dịch hiệu quả, tuy
              nhiên vắc xin phòng COVID-19 có thể không phòng được bệnh hoàn
              toàn. Người được tiêm chủng vắc xin phòng COVID-19 có thể phòng
              được bệnh hoặc giảm mức độ nặng nếu mắc bệnh. Tuy nhiên, sau khi
              tiêm chủng vẫn phải tiếp tục thực hiện nghiêm các biện pháp phòng
              chống dịch theo quy định.
            </Typography>
          </BoxText>

          <BoxText>
            <Box component="img" src={Vaccine} />
            <Typography sx={{ ml: 1.25 }}>
              2. Tiêm chủng vắc xin phòng COVID-19 có thể gây ra một số biểu
              hiện tại chỗ tiêm hoặc toàn thân như sưng, đau chỗ tiêm, nhức đầu,
              buồn nôn, sốt, đau cơ…hoặc tai biến nặng sau tiêm chủng. Tiêm vắc
              xin mũi 2 do Pfizer sản xuất ở người đã tiêm mũi 1 bằng vắc xin
              AstraZeneca có thể tăng khả năng xảy ra phản ứng thông thường sau
              tiêm chủng.
            </Typography>
          </BoxText>

          <BoxText>
            <Box component="img" src={Hospital} />
            <Typography sx={{ ml: 1.25 }}>
              3. Khi có triệu chứng bất thường về sức khỏe, người được tiêm
              chủng cần đến ngay cơ sở y tế gần nhất để được tư vấn, thăm khám
              và điều trị kịp thời.
            </Typography>
          </BoxText>
        </BoxContent>

        <TickBox>
          <Typography sx={{ mr: 1.25 }}>
            Sau khi đã đọc các thông tin nêu trên, tôi đã hiểu về các nguy cơ
            và:{' '}
          </Typography>
          <FormControlLabel control={<Checkbox />} label="Đồng ý tiêm chủng" />
        </TickBox>

        <ButtonBox>
          <Button
            variant="outlined"
            startIcon={<ArrowBack />}
            sx={{
              mr: 2
            }}>
            Quay lại
          </Button>
          <Button variant="contained" endIcon={<ArrowForward />}>
            Tiếp tục
          </Button>
        </ButtonBox>
      </BoxContainer>
    </>
  );
};

export default RegistrationStep2;

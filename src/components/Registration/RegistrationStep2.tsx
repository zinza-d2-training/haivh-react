import React, { useState } from 'react';
import styled from '@emotion/styled';
import CheckoutStep from './CheckoutStep';
import Heading from './Heading';
import { ArrowBack, ArrowForward } from '@mui/icons-material';
import { useLocation, useNavigate } from 'react-router-dom';

import Hospital from '../../img/hospital_icon.png';
import Shield from '../../img/shield_icon.png';
import Vaccine from '../../img/vaccine_icon.png';
import {
  Box,
  FormControlLabel,
  Checkbox,
  Typography,
  Button
} from '@mui/material';
import ContainerLayout from '../ContainerLayout';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { vaccineRegistrationAsync } from '../../features/user/vaccineRegistrationSlice';

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
  const user_id = useAppSelector((state) => state.user.value.user.id);
  const vaccineRegistration = useAppSelector(
    (state) => state.vaccineRegistration.vaccineRegistrationInfo
  );
  const dispatch = useAppDispatch();
  const location: any = useLocation();
  const data = location.state.data;
  const vaccineRegistrationInfo = { ...data, user_id };
  const [check, setCheck] = useState(false);

  const navigate = useNavigate();

  const handleCheck = () => {
    setCheck(!check);
  };

  const handleBack = () => {
    navigate('/registration-step-1');
  };

  const handleContinue = () => {
    dispatch(vaccineRegistrationAsync(vaccineRegistrationInfo));
    navigate('/registration-step-3');
  };

  return (
    <>
      <Heading />
      <ContainerLayout>
        <BoxContainer>
          <CheckoutStep activeStep={1} />

          <BoxContent>
            <BoxText>
              <Box component="img" src={Shield} />
              <Typography sx={{ ml: 1.25 }}>
                1. Ti??m ch???ng v???c xin l?? bi???n ph??p ph??ng ch???ng d???ch hi???u qu???,
                tuy nhi??n v???c xin ph??ng COVID-19 c?? th??? kh??ng ph??ng ???????c b???nh
                ho??n to??n. Ng?????i ???????c ti??m ch???ng v???c xin ph??ng COVID-19 c?? th???
                ph??ng ???????c b???nh ho???c gi???m m???c ????? n???ng n???u m???c b???nh. Tuy nhi??n,
                sau khi ti??m ch???ng v???n ph???i ti???p t???c th???c hi???n nghi??m c??c bi???n
                ph??p ph??ng ch???ng d???ch theo quy ?????nh.
              </Typography>
            </BoxText>

            <BoxText>
              <Box component="img" src={Vaccine} />
              <Typography sx={{ ml: 1.25 }}>
                2. Ti??m ch???ng v???c xin ph??ng COVID-19 c?? th??? g??y ra m???t s??? bi???u
                hi???n t???i ch??? ti??m ho???c to??n th??n nh?? s??ng, ??au ch??? ti??m, nh???c
                ?????u, bu???n n??n, s???t, ??au c?????ho???c tai bi???n n???ng sau ti??m ch???ng.
                Ti??m v???c xin m??i 2 do Pfizer s???n xu???t ??? ng?????i ???? ti??m m??i 1 b???ng
                v???c xin AstraZeneca c?? th??? t??ng kh??? n??ng x???y ra ph???n ???ng th??ng
                th?????ng sau ti??m ch???ng.
              </Typography>
            </BoxText>

            <BoxText>
              <Box component="img" src={Hospital} />
              <Typography sx={{ ml: 1.25 }}>
                3. Khi c?? tri???u ch???ng b???t th?????ng v??? s???c kh???e, ng?????i ???????c ti??m
                ch???ng c???n ?????n ngay c?? s??? y t??? g???n nh???t ????? ???????c t?? v???n, th??m kh??m
                v?? ??i???u tr??? k???p th???i.
              </Typography>
            </BoxText>
          </BoxContent>

          <TickBox>
            <Typography sx={{ mr: 1.25 }}>
              Sau khi ???? ?????c c??c th??ng tin n??u tr??n, t??i ???? hi???u v??? c??c nguy c??
              v??:{' '}
            </Typography>
            <FormControlLabel
              control={<Checkbox checked={check} onChange={handleCheck} />}
              label="?????ng ?? ti??m ch???ng"
            />
          </TickBox>

          <ButtonBox>
            <Button
              onClick={handleBack}
              variant="outlined"
              startIcon={<ArrowBack />}
              sx={{
                mr: 2
              }}>
              Quay l???i
            </Button>
            <Button
              onClick={handleContinue}
              variant="contained"
              endIcon={<ArrowForward />}
              disabled={!check}>
              Ti???p t???c
            </Button>
          </ButtonBox>
        </BoxContainer>
      </ContainerLayout>
    </>
  );
};

export default RegistrationStep2;

import React, { useEffect, useState } from 'react';
import CheckoutStep from './CheckoutStep';
import Heading from './Heading';
import styled from '@emotion/styled';
import { DatePicker, LocalizationProvider } from '@mui/lab';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import {
  Box,
  FormControl,
  MenuItem,
  Select,
  Typography,
  TextField,
  List,
  ListItem,
  ListItemText,
  Button,
  Grid
} from '@mui/material';
import { ArrowBack, ArrowForward } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Controller, useForm } from 'react-hook-form';
import FormHelperText from '@mui/material/FormHelperText';
import ContainerLayout from '../ContainerLayout';
import { useAppDispatch } from '../../app/hooks';
// import { vaccineRegistration } from '../../features/user/userSlice';
import { axiosInstance } from '../../requestMethod';

interface RegistrationInfo {
  group_id: number;
  health_insurance: string;
  occupation: string;
  work_place: string;
  address: string;
  expected_date: string;
  session: string;
}

interface Group {
  id: number;
  name: string;
}

const defaultValues = {
  group_id: 0,
  health_insurance: '',
  occupation: '',
  work_place: '',
  address: '',
  expected_date: '',
  session: ''
};

const schema = yup
  .object({
    group_id: yup.number().required('Group is required field'),
    health_insurance: yup.string().required(),
    occupation: yup.string().required(),
    work_place: yup.string().required(),
    address: yup.string().required(),
    expected_date: yup.string().required('Date is required field'),
    session: yup.string().required()
  })
  .required();

const BoxContainer = styled(Box)`
  padding: 0 36px;
`;
const BoxContent = styled(Box)``;

const BoxSelect = styled(Box)`
  /* display: flex; */
  margin-bottom: 16px;
  flex-grow: 1;
`;

const BoxItem = styled(Box)`
  /* margin-right: 16px; */
`;

const LabelText = styled(Typography)`
  margin-bottom: 5px;
  font-size: 16px;
  font-weight: 400;
  line-height: 24px;
`;

const NoticeBox = styled(Box)`
  color: red;
  margin-bottom: 24px;
`;

const ButtonBox = styled(Box)`
  display: flex;
  justify-content: center;
  margin-bottom: 50px;
`;
const RegistrationStep1 = () => {
  const [groups, setGroups] = useState<Group[]>([]);
  useEffect(() => {
    const getData = async () => {
      try {
        const res = await axiosInstance.get<Group[]>('/groups');
        setGroups(res.data);
      } catch (err) {}
    };
    getData();
  }, []);

  const {
    control,
    handleSubmit,
    formState: { isValid }
  } = useForm<RegistrationInfo>({
    defaultValues,
    mode: 'onChange',
    resolver: yupResolver(schema)
  });
  const navigate = useNavigate();
  const handleContinue = (data: RegistrationInfo) => {
    navigate('/registration-step-2', {
      state: {
        data
      }
    });
  };

  const handleCancel = () => {
    navigate('/');
  };

  return (
    <>
      <Heading />
      <ContainerLayout>
        <BoxContainer component="form" onSubmit={handleSubmit(handleContinue)}>
          <CheckoutStep activeStep={0} />

          <BoxContent>
            <Typography
              sx={{
                mb: 2,
                fontWeight: 500
              }}>
              1. Th??ng tin ng?????i ????ng k?? ti??m
            </Typography>
            <BoxSelect>
              <Grid container spacing={2}>
                <Grid item xs={3}>
                  <BoxItem>
                    <LabelText>Nh??m ??u ti??n (*)</LabelText>
                    <Controller
                      name="group_id"
                      control={control}
                      render={({ field, fieldState: { error } }) => (
                        <FormControl sx={{ width: '100%' }}>
                          <Select
                            size="small"
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            {...field}
                            onChange={(event) => {
                              field.onChange(event.target.value);
                            }}>
                            {groups.map((group, index) => (
                              <MenuItem key={index} value={group.id}>
                                {`${index + 1}. ${group.name}`}
                              </MenuItem>
                            ))}
                          </Select>
                          {error && (
                            <FormHelperText sx={{ color: 'red' }}>
                              {error?.message}
                            </FormHelperText>
                          )}
                        </FormControl>
                      )}
                    />
                  </BoxItem>
                </Grid>

                <Grid item xs={3}>
                  <BoxItem>
                    <LabelText>S??? th??? BHYT</LabelText>
                    <Controller
                      name="health_insurance"
                      control={control}
                      render={({ field, fieldState: { error } }) => (
                        <TextField
                          sx={{ width: '100%' }}
                          placeholder="S??? th??? BHYT"
                          size="small"
                          {...field}
                          error={!!error}
                          helperText={error?.message}
                        />
                      )}
                    />
                  </BoxItem>
                </Grid>
              </Grid>
            </BoxSelect>
            <BoxSelect>
              <Grid container spacing={2}>
                <Grid item xs={3}>
                  <BoxItem>
                    <LabelText>Ngh??? nghi???p</LabelText>
                    <Controller
                      name="occupation"
                      control={control}
                      render={({ field, fieldState: { error } }) => (
                        <TextField
                          sx={{
                            width: '100%'
                          }}
                          placeholder="Ngh??? nghi???p"
                          size="small"
                          {...field}
                          error={!!error}
                          helperText={error?.message}
                        />
                      )}
                    />
                  </BoxItem>
                </Grid>
                <Grid item xs={3}>
                  <BoxItem>
                    <LabelText>????n v??? c??ng t??c</LabelText>
                    <Controller
                      name="work_place"
                      control={control}
                      render={({ field, fieldState: { error } }) => (
                        <TextField
                          sx={{
                            width: '100%'
                          }}
                          placeholder="????n v??? c??ng t??c"
                          size="small"
                          {...field}
                          error={!!error}
                          helperText={error?.message}
                        />
                      )}
                    />
                  </BoxItem>
                </Grid>
                <Grid item xs={3}>
                  <BoxItem>
                    <LabelText>?????a ch??? hi???n t???i</LabelText>
                    <Controller
                      name="address"
                      control={control}
                      render={({ field, fieldState: { error } }) => (
                        <TextField
                          sx={{
                            width: '100%'
                          }}
                          placeholder="?????a ch??? hi???n t???i"
                          size="small"
                          {...field}
                          error={!!error}
                          helperText={error?.message}
                        />
                      )}
                    />
                  </BoxItem>
                </Grid>
              </Grid>
            </BoxSelect>
          </BoxContent>

          <BoxContent>
            <Typography
              sx={{
                mb: 2,
                fontWeight: 500
              }}>
              2. Th??ng tin ti??m ch???ng
            </Typography>
            <BoxSelect>
              <Grid container spacing={2}>
                <Grid item xs={3}>
                  {' '}
                  <BoxItem>
                    <LabelText>Ng??y mu???n ???????c ti??m (d??? ki???n)</LabelText>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                      <Controller
                        name="expected_date"
                        control={control}
                        render={({ field, fieldState: { error } }) => (
                          <FormControl sx={{ width: '100%' }}>
                            <DatePicker
                              renderInput={(params) => (
                                <TextField
                                  {...params}
                                  size="small"
                                  error={!!error}
                                  helperText={error?.message}
                                />
                              )}
                              {...field}
                            />
                          </FormControl>
                        )}
                      />
                    </LocalizationProvider>
                  </BoxItem>
                </Grid>
                <Grid item xs={3}>
                  <BoxItem>
                    <LabelText>Bu???i ti??m mong mu???n</LabelText>
                    <Controller
                      name="session"
                      control={control}
                      render={({ field, fieldState: { error } }) => (
                        <FormControl sx={{ width: '100%' }}>
                          <Select
                            defaultValue=""
                            sx={{
                              width: '100%'
                            }}
                            size="small"
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            {...field}
                            onChange={(event) => {
                              field.onChange(event.target.value);
                            }}>
                            <MenuItem value={'Bu???i s??ng'}>Bu???i s??ng</MenuItem>
                            <MenuItem value={'Bu???i chi???u'}>Bu???i chi???u</MenuItem>
                            <MenuItem value={'Bu???i t???i'}>Bu???i t???i</MenuItem>
                            <MenuItem value={'C??? ng??y'}>C??? ng??y</MenuItem>
                          </Select>
                          {error && (
                            <FormHelperText sx={{ color: 'red' }}>
                              {error?.message}
                            </FormHelperText>
                          )}
                        </FormControl>
                      )}
                    />
                  </BoxItem>
                </Grid>
              </Grid>
            </BoxSelect>
          </BoxContent>

          <NoticeBox>
            <Typography
              sx={{
                fontSize: '16px',
                fontWeight: '700',
                lineHeight: '24px'
              }}>
              L??u ??:
            </Typography>
            <List>
              <ListItem disablePadding>
                <ListItemText primary="Vi???c ????ng k?? th??ng tin ho??n to??n b???o m???t v?? ph???c v??? cho chi???n d???ch ti??m ch???ng V???c xin COVID - 19" />
              </ListItem>
              <ListItem disablePadding>
                <ListItemText primary="Xin vui l??ng ki???m tra k??? c??c th??ng tin b???t bu???c(VD: H??? v?? t??n, Ng??y th??ng n??m sinh, S??? ??i???n tho???i, S??? CMND/CCCD/M?? ?????nh danh c??ng d??n/HC ...)" />
              </ListItem>
              <ListItem disablePadding>
                <ListItemText primary='B???ng vi???c nh???n n??t X??c nh???n", b???n ho??n to??n hi???u v?? ?????ng ?? ch???u tr??ch nhi???m v???i c??c th??ng tin ???? cung c???p.' />
              </ListItem>
              <ListItem disablePadding>
                <ListItemText primary="C?? nh??n/T??? ch???c ????ng k?? th??nh c??ng tr??n h??? th???ng s??? ???????c ????a v??o danh s??ch ?????t ti??m. C?? s??? y t??? s??? th??ng b??o l???ch ti??m khi c?? v???c xin v?? k??? ho???ch ti??m ???????c ph?? duy???t. Tr??n tr???ng c???m ??n" />
              </ListItem>
            </List>
          </NoticeBox>

          <ButtonBox>
            <Button
              onClick={handleCancel}
              variant="outlined"
              startIcon={<ArrowBack />}
              sx={{
                mr: 2
              }}>
              H???y b???
            </Button>
            <Button
              disabled={!isValid}
              type="submit"
              variant="contained"
              endIcon={<ArrowForward />}>
              Ti???p t???c
            </Button>
          </ButtonBox>
        </BoxContainer>
      </ContainerLayout>
    </>
  );
};

export default RegistrationStep1;

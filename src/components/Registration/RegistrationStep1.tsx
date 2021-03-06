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
              1. Thông tin người đăng ký tiêm
            </Typography>
            <BoxSelect>
              <Grid container spacing={2}>
                <Grid item xs={3}>
                  <BoxItem>
                    <LabelText>Nhóm ưu tiên (*)</LabelText>
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
                    <LabelText>Số thẻ BHYT</LabelText>
                    <Controller
                      name="health_insurance"
                      control={control}
                      render={({ field, fieldState: { error } }) => (
                        <TextField
                          sx={{ width: '100%' }}
                          placeholder="Số thẻ BHYT"
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
                    <LabelText>Nghề nghiệp</LabelText>
                    <Controller
                      name="occupation"
                      control={control}
                      render={({ field, fieldState: { error } }) => (
                        <TextField
                          sx={{
                            width: '100%'
                          }}
                          placeholder="Nghề nghiệp"
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
                    <LabelText>Đơn vị công tác</LabelText>
                    <Controller
                      name="work_place"
                      control={control}
                      render={({ field, fieldState: { error } }) => (
                        <TextField
                          sx={{
                            width: '100%'
                          }}
                          placeholder="Đơn vị công tác"
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
                    <LabelText>Địa chỉ hiện tại</LabelText>
                    <Controller
                      name="address"
                      control={control}
                      render={({ field, fieldState: { error } }) => (
                        <TextField
                          sx={{
                            width: '100%'
                          }}
                          placeholder="Địa chỉ hiện tại"
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
              2. Thông tin tiêm chủng
            </Typography>
            <BoxSelect>
              <Grid container spacing={2}>
                <Grid item xs={3}>
                  {' '}
                  <BoxItem>
                    <LabelText>Ngày muốn được tiêm (dự kiến)</LabelText>
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
                    <LabelText>Buổi tiêm mong muốn</LabelText>
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
                            <MenuItem value={'Buổi sáng'}>Buổi sáng</MenuItem>
                            <MenuItem value={'Buổi chiều'}>Buổi chiều</MenuItem>
                            <MenuItem value={'Buổi tối'}>Buổi tối</MenuItem>
                            <MenuItem value={'Cả ngày'}>Cả ngày</MenuItem>
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
              Lưu ý:
            </Typography>
            <List>
              <ListItem disablePadding>
                <ListItemText primary="Việc đăng ký thông tin hoàn toàn bảo mật và phục vụ cho chiến dịch tiêm chủng Vắc xin COVID - 19" />
              </ListItem>
              <ListItem disablePadding>
                <ListItemText primary="Xin vui lòng kiểm tra kỹ các thông tin bắt buộc(VD: Họ và tên, Ngày tháng năm sinh, Số điện thoại, Số CMND/CCCD/Mã định danh công dân/HC ...)" />
              </ListItem>
              <ListItem disablePadding>
                <ListItemText primary='Bằng việc nhấn nút Xác nhận", bạn hoàn toàn hiểu và đồng ý chịu trách nhiệm với các thông tin đã cung cấp.' />
              </ListItem>
              <ListItem disablePadding>
                <ListItemText primary="Cá nhân/Tổ chức đăng ký thành công trên hệ thống sẽ được đưa vào danh sách đặt tiêm. Cơ sở y tế sẽ thông báo lịch tiêm khi có vắc xin và kế hoạch tiêm được phê duyệt. Trân trọng cảm ơn" />
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
              Hủy bỏ
            </Button>
            <Button
              disabled={!isValid}
              type="submit"
              variant="contained"
              endIcon={<ArrowForward />}>
              Tiếp tục
            </Button>
          </ButtonBox>
        </BoxContainer>
      </ContainerLayout>
    </>
  );
};

export default RegistrationStep1;

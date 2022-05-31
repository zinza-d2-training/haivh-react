import React, { useEffect, useMemo } from 'react';
import styled from '@emotion/styled';
import {
  Box,
  Typography,
  Grid,
  Button,
  TextField,
  FormControl,
  Select,
  MenuItem,
  FormHelperText
} from '@mui/material';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Controller, useForm } from 'react-hook-form';
import { DatePicker, LocalizationProvider } from '@mui/lab';
import AdapterDateFns from '@mui/lab/AdapterDateFns';

import Create from '../../img/Create.png';

const ContainerBox = styled(Box)``;

const InfoBox = styled(Box)``;

const PasswordBox = styled(Box)``;

const HeaderText = styled(Typography)`
  display: flex;
  align-items: center;
  margin-bottom: 5px;
  font-size: 16px;
  font-weight: 500;
  line-height: 24px;
`;

const BoxSelect = styled(Box)``;

const LabelText = styled(Typography)`
  margin-bottom: 16px;
  font-size: 16px;
  font-weight: 400;
  line-height: 24px;
`;

const ButtonBox = styled(Box)`
  margin-bottom: 24px;
  display: none;
`;
interface Info {
  identity_card: string;
  name: string;
  dob: string;
  gender: string;
  province_id: number | string;
  district_id: number | string;
  ward_id: number | string;
  password: string;
  password_confirm: string;
}

const defaultValues = {
  identity_card: '123456789',
  name: 'Nguyễn Văn A',
  dob: '05/31/2022',
  gender: 'male',
  province_id: 1,
  district_id: 1,
  ward_id: 1,
  password: '123',
  password_confirm: '123'
};

interface Ward {
  id: number;
  name: string;
  district_id: number;
}

interface District {
  id: number;
  name: string;
  wards: Ward[];
  province_id: number;
}
interface Province {
  id: number;
  name: string;
  districts: District[];
}

const provinces: Province[] = [
  {
    id: 1,
    name: 'Hà Nội',
    districts: [
      {
        id: 1,
        name: 'Hoàn Kiếm',
        province_id: 1,
        wards: [
          {
            id: 1,
            name: 'Chương Dương',
            district_id: 1
          },
          {
            id: 2,
            name: 'Cửa Nam',
            district_id: 1
          }
        ]
      },
      {
        id: 2,
        name: 'Hà Đông',
        province_id: 1,
        wards: [
          {
            id: 1,
            name: 'La Khê',
            district_id: 2
          },
          {
            id: 2,
            name: 'Nguyễn Trãi',
            district_id: 2
          }
        ]
      }
    ]
  },
  {
    id: 2,
    name: 'Hồ Chí Minh',
    districts: [
      {
        id: 1,
        name: 'Quận 1',
        province_id: 2,
        wards: [
          {
            id: 1,
            name: 'Bến Nghé',
            district_id: 1
          },
          {
            id: 2,
            name: 'Bến Thành',
            district_id: 1
          }
        ]
      },
      {
        id: 2,
        name: 'Quận 2',
        province_id: 2,
        wards: [
          {
            id: 1,
            name: 'An Khánh',
            district_id: 2
          },
          {
            id: 2,
            name: 'An Phú',
            district_id: 2
          }
        ]
      }
    ]
  }
];

const schema = yup
  .object({
    identity_card: yup.string().required(),
    name: yup.string().required(),
    dob: yup.string().nullable().required('Date is required field'),
    gender: yup.string().required(),
    province_id: yup.number().min(1, 'Thông tin không được để trống'),
    district_id: yup
      .number()
      .required()
      .min(1, 'Thông tin không được để trống'),
    ward_id: yup.number().required().min(1, 'Thông tin không được để trống'),
    password: yup
      .string()
      .required()
      .min(8)
      .matches(/^\S*$/, 'Mật khẩu không được có khoảng trắng'),
    password_confirm: yup
      .string()
      .required()
      .oneOf([yup.ref('password'), null], 'Passwords must match')
  })
  .required();

// const fakeInfo: Info = {
//   identity_card: '123456789',
//   name: 'Nguyễn Văn A',
//   dob: '05/31/2022',
//   gender: 'male',
//   province_id: 1,
//   district_id: 1,
//   ward_id: 1,
//   password: '123',
//   password_confirm: '123'
// };
const Account = () => {
  const {
    control,
    handleSubmit,
    formState: { isValid },
    setValue,
    watch
  } = useForm<Info>({
    defaultValues,
    mode: 'onChange',
    resolver: yupResolver(schema)
  });

  const provinceId = watch('province_id');
  const districtId = watch('district_id');

  useEffect(() => {
    const subscription = watch((value, { name, type }) => {
      if (name === 'province_id') {
        setValue('district_id', '');
        setValue('ward_id', '');
      }
      if (name === 'district_id') {
        setValue('ward_id', '');
      }
    });
    return () => subscription.unsubscribe();
  }, [setValue, watch]);

  const districts = useMemo(() => {
    return (
      provinces.find((province) => province.id === provinceId)?.districts ?? []
    );
  }, [provinceId]);

  const wards = useMemo(() => {
    return (
      districts.find((district) => district.id === districtId)?.wards ?? []
    );
  }, [districtId, districts]);

  return (
    <ContainerBox>
      <InfoBox>
        <HeaderText>
          Thông tin cá nhân
          <Box
            // onClick={handleShowInfo}
            component="img"
            src={Create}
            sx={{
              ml: 1,
              backgroundColor: 'transparent',
              padding: '8px',
              borderRadius: '50%',
              cursor: 'pointer',

              '&:hover': {
                backgroundColor: 'rgba(0, 0, 0, 0.04)'
              }
            }}
          />
        </HeaderText>

        <BoxSelect>
          <Grid container spacing={2} sx={{ mb: 3 }}>
            <Grid item xs={3}>
              <Box>
                <LabelText>Số CMND/CCCD/Mã định danh</LabelText>
                <Controller
                  name="identity_card"
                  control={control}
                  render={({ field, fieldState: { error } }) => (
                    <TextField
                      sx={{ width: '100%' }}
                      placeholder={defaultValues.identity_card}
                      size="small"
                      {...field}
                      error={!!error}
                      helperText={error?.message}
                    />
                  )}
                />
              </Box>
            </Grid>
          </Grid>

          <Grid container spacing={2} sx={{ mb: 3 }}>
            <Grid item xs={3}>
              <Box>
                <LabelText>Họ và tên</LabelText>
                <Controller
                  name="name"
                  control={control}
                  render={({ field, fieldState: { error } }) => (
                    <TextField
                      sx={{ width: '100%' }}
                      placeholder={defaultValues.name}
                      size="small"
                      {...field}
                      error={!!error}
                      helperText={error?.message}
                    />
                  )}
                />
              </Box>
            </Grid>

            <Grid item xs={3}>
              <Box>
                <LabelText>Ngày sinh</LabelText>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <Controller
                    name="dob"
                    control={control}
                    render={({ field, fieldState: { error } }) => (
                      <FormControl sx={{ width: '100%' }}>
                        <DatePicker
                          renderInput={(params) => (
                            <TextField
                              placeholder={defaultValues.dob}
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
              </Box>
            </Grid>

            <Grid item xs={3}>
              <Box>
                <LabelText>Giới tính</LabelText>
                <Controller
                  name="gender"
                  control={control}
                  render={({ field, fieldState: { error } }) => (
                    <FormControl sx={{ width: '100%' }}>
                      <Select
                        defaultValue={defaultValues.gender}
                        size="small"
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        {...field}
                        onChange={(event) => {
                          field.onChange(event.target.value);
                        }}>
                        <MenuItem value={'male'}>Nam</MenuItem>
                        <MenuItem value={'female'}>Nữ</MenuItem>
                      </Select>
                      {error && (
                        <FormHelperText sx={{ color: 'red' }}>
                          {error?.message}
                        </FormHelperText>
                      )}
                    </FormControl>
                  )}
                />
              </Box>
            </Grid>
          </Grid>

          <Grid container spacing={2} sx={{ mb: 3 }}>
            <Grid item xs={3}>
              <Box>
                <LabelText>Tỉnh/Thành phố</LabelText>
                <Controller
                  name="province_id"
                  control={control}
                  render={({ field, fieldState: { error } }) => (
                    <FormControl sx={{ width: '100%' }}>
                      <Select
                        defaultValue={defaultValues.province_id}
                        size="small"
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        {...field}
                        onChange={(event) => {
                          field.onChange(event.target.value);
                        }}>
                        {provinces.map((province) => (
                          <MenuItem key={province.id} value={province.id}>
                            {province.name}
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
              </Box>
            </Grid>

            <Grid item xs={3}>
              <Box>
                <LabelText>Quận/Huyện</LabelText>
                <Controller
                  name="district_id"
                  control={control}
                  render={({ field, fieldState: { error } }) => (
                    <FormControl sx={{ width: '100%' }}>
                      <Select
                        defaultValue={defaultValues.district_id}
                        size="small"
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        {...field}
                        onChange={(event) => {
                          field.onChange(event.target.value);
                        }}>
                        {districts.map((district) => (
                          <MenuItem key={district.id} value={district.id}>
                            {district.name}
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
              </Box>
            </Grid>

            <Grid item xs={3}>
              <Box>
                <LabelText>Phường/Xã</LabelText>
                <Controller
                  name="ward_id"
                  control={control}
                  render={({ field, fieldState: { error } }) => (
                    <FormControl sx={{ width: '100%' }}>
                      <Select
                        defaultValue={defaultValues.ward_id}
                        size="small"
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        {...field}
                        onChange={(event) => {
                          field.onChange(event.target.value);
                        }}>
                        {wards.map((ward) => (
                          <MenuItem key={ward.id} value={ward.id}>
                            {ward.name}
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
              </Box>
            </Grid>
          </Grid>
        </BoxSelect>

        <ButtonBox>
          <Button
            variant="outlined"
            sx={{
              mr: 2
            }}>
            Hủy bỏ
          </Button>
          <Button variant="contained">Lưu</Button>
        </ButtonBox>
      </InfoBox>

      <PasswordBox>
        <HeaderText>
          Mật khẩu
          <Box
            component="img"
            src={Create}
            sx={{
              ml: 1,
              backgroundColor: 'transparent',
              padding: '8px',
              borderRadius: '50%',
              cursor: 'pointer',

              '&:hover': {
                backgroundColor: 'rgba(0, 0, 0, 0.04)'
              }
            }}
          />
        </HeaderText>
        <Grid container spacing={2} sx={{ mb: 3 }}>
          <Grid item xs={3}>
            <Box>
              <LabelText>Mật khẩu mới</LabelText>
              <Controller
                name="password"
                control={control}
                render={({ field, fieldState: { error } }) => (
                  <TextField
                    type="password"
                    sx={{ width: '100%' }}
                    placeholder="Mật khẩu mới"
                    size="small"
                    {...field}
                    error={!!error}
                    helperText={error?.message}
                  />
                )}
              />
            </Box>
          </Grid>
        </Grid>

        <Grid container spacing={2} sx={{ mb: 3 }}>
          <Grid item xs={3}>
            <Box>
              <LabelText>Xác nhận lại mật khẩu</LabelText>
              <Controller
                name="password_confirm"
                control={control}
                render={({ field, fieldState: { error } }) => (
                  <TextField
                    type="password"
                    sx={{ width: '100%' }}
                    placeholder="Số CMND/CCCD/Mã định danh"
                    size="small"
                    {...field}
                    error={!!error}
                    helperText={error?.message}
                  />
                )}
              />
            </Box>
          </Grid>
        </Grid>

        <ButtonBox>
          <Button
            variant="outlined"
            sx={{
              mr: 2
            }}>
            Hủy bỏ
          </Button>
          <Button variant="contained">Lưu</Button>
        </ButtonBox>
      </PasswordBox>
    </ContainerBox>
  );
};

export default Account;

import React, { useEffect, useMemo, useState } from 'react';
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
import { User } from './VaccineCertificate';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { axiosInstance, axiosInstanceWithToken } from '../../requestMethod';
import { updateInfoAsync } from '../../features/user/updateInfoSlice';

const InfoBox = styled(Box)``;
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
`;

interface Info {
  identity_card?: string;
  name?: string;
  dob?: string;
  gender?: string;
  province_id: number | string;
  district_id: number | string;
  ward_id: number | string;
}
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
    ward_id: yup.number().required().min(1, 'Thông tin không được để trống')
  })
  .required();

const InfoForm = () => {
  const dispatch = useAppDispatch();
  const [data, setData] = useState<Info>();
  const [subdivisions, setSubdivisions] = useState<Province[]>([]);
  const user = useAppSelector((state) => state.user.value.user);
  const userId = user.id;

  useEffect(() => {
    const getData = async () => {
      try {
        const res = await axiosInstance.get<Province[]>('/subdivisions');
        setSubdivisions(res.data);
      } catch (err) {}
    };
    getData();
  }, []);

  const provinces: Province[] = subdivisions;

  const defaultValues: Info = {
    name: user.name,
    identity_card: user.identity_card,
    dob: user.dob,
    gender: user.gender,
    province_id: user.ward.district.province.id,
    district_id: user.ward.district.id,
    ward_id: user.ward.id
  };

  const {
    control,
    handleSubmit,
    formState: { isValid },
    setValue,
    watch,
    reset
  } = useForm<Info>({
    defaultValues,
    mode: 'onChange',
    resolver: yupResolver(schema)
  });

  useEffect(() => {
    const getUserInfo = async () => {
      try {
        const res = await axiosInstanceWithToken.get(`users/${userId}`);
        const info: Info = {
          name: res.data.name,
          identity_card: res.data.identity_card,
          dob: res.data.dob,
          gender: res.data.gender,
          province_id: res.data.ward.district.province_id,
          district_id: res.data.ward.district_id,
          ward_id: res.data.ward_id
        };
        reset(info);
        setData(info);
      } catch (err) {}
    };
    getUserInfo();
  }, [reset, userId]);

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
  }, [provinceId, provinces]);

  const wards = useMemo(() => {
    return (
      districts.find((district) => district.id === districtId)?.wards ?? []
    );
  }, [districtId, districts]);

  const [disable, setDisable] = useState(true);
  const [showCreate, setShowCreate] = useState(true);

  const ToggleDisable = () => {
    setDisable(!disable);
    setShowCreate(false);
  };

  const onSubmit = async (data: Info) => {
    const { district_id, province_id, ...userInfo } = data;
    dispatch(updateInfoAsync({ userInfo, userId }));
    setDisable(true);
    setShowCreate(true);
  };

  const handleCancel = () => {
    reset(data);
    setDisable(true);
    setShowCreate(true);
  };

  return (
    <InfoBox component="form" onSubmit={handleSubmit(onSubmit)}>
      <HeaderText>
        Thông tin cá nhân
        <Box
          visibility={showCreate ? 'visible' : 'hidden'}
          onClick={ToggleDisable}
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
                    disabled={disable}
                    sx={{ width: '100%' }}
                    placeholder={defaultValues.identity_card}
                    size="small"
                    {...field}
                    onChange={(event) => {
                      field.onChange(event.target.value);
                    }}
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
                    disabled={disable}
                    sx={{ width: '100%' }}
                    placeholder={defaultValues.name}
                    size="small"
                    {...field}
                    onChange={(event) => {
                      field.onChange(event.target.value);
                    }}
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
                        disabled={disable}
                        renderInput={(params) => (
                          <TextField
                            onChange={(event) => {
                              field.onChange(event.target.value);
                            }}
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
                      disabled={disable}
                      size="small"
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      {...field}
                      onChange={(event) => {
                        field.onChange(event.target.value);
                      }}>
                      <MenuItem value={'nam'}>Nam</MenuItem>
                      <MenuItem value={'nữ'}>Nữ</MenuItem>
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
                      disabled={disable}
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
                      disabled={disable}
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
                      disabled={disable}
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

      <ButtonBox visibility={disable ? 'hidden' : 'visible'}>
        <Button
          onClick={handleCancel}
          variant="outlined"
          sx={{
            mr: 2
          }}>
          Hủy bỏ
        </Button>
        <Button variant="contained" disabled={!isValid} type="submit">
          Lưu
        </Button>
      </ButtonBox>
    </InfoBox>
  );
};

export default InfoForm;

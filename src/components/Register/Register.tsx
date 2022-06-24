import React, { useEffect, useMemo, useState } from 'react';
import {
  Button,
  FormControlLabel,
  Radio,
  RadioGroup,
  Stack,
  TextField,
  Typography
} from '@mui/material';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Controller, useForm } from 'react-hook-form';
import { DatePicker, LocalizationProvider } from '@mui/lab';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import { ArrowRightAlt } from '@mui/icons-material';
import FormHelperText from '@mui/material/FormHelperText';

import './Register.css';
import Side_Left from '../../img/Side_Left.png';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { registerAsync } from '../../features/user/registerSlice';
import { axiosInstance } from '../../requestMethod';

interface FormData {
  identity_card: string;
  email: string;
  password: string;
  name: string;
  dob: Date | string;
  gender: string;
  province_id: number | string;
  district_id: number | string;
  ward_id: number | string;
  role_id: number | string;
}

const defaultValues = {
  identity_card: '',
  email: '',
  password: '',
  name: '',
  dob: '',
  gender: '',
  province_id: 0,
  district_id: 0,
  ward_id: 0,
  role_id: 2
};
const schema = yup
  .object({
    identity_card: yup.string().required().min(9).max(12),
    email: yup.string().email().required(),
    password: yup
      .string()
      .required()
      .min(8)
      .matches(/^\S*$/, 'Mật khẩu không được có khoảng trắng'),
    name: yup.string().required(),
    gender: yup.string().required(),
    dob: yup.string().nullable().required('Date is required field'),
    province_id: yup.number().min(1, 'Thông tin không được để trống'),
    district_id: yup
      .number()
      .required()
      .min(1, 'Thông tin không được để trống'),
    ward_id: yup.number().required().min(1, 'Thông tin không được để trống')
  })
  .required();

interface Ward {
  id: number;
  name: string;
  district_id: number;
  create_at: string;
  update_at: string;
  delete_at: string;
}

interface District {
  id: number;
  name: string;
  wards: Ward[];
  province_id: number;
  create_at: string;
  update_at: string;
  delete_at: string;
}
interface Province {
  id: number;
  name: string;
  districts: District[];
  create_at: string;
  update_at: string;
  delete_at: string;
}

const Register = () => {
  const dispatch = useAppDispatch();
  const status = useAppSelector((state) => state.register.status);
  const error = useAppSelector((state) => state.register.error);
  const [data, setData] = useState([]);
  useEffect(() => {
    const getData = async () => {
      try {
        const res = await axiosInstance.get('/subdivisions');
        setData(res.data);
      } catch (err) {}
    };
    getData();
  }, []);
  const provinces: Province[] = data;

  const {
    control,
    handleSubmit,
    formState: { isValid },
    setValue,
    watch
  } = useForm<FormData>({
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
  }, [provinceId, provinces]);

  const wards = useMemo(() => {
    return (
      districts.find((district) => district.id === districtId)?.wards ?? []
    );
  }, [districtId, districts]);

  const onSubmit = (data: FormData) => {
    const { province_id, district_id, ...registerInfo } = data;
    dispatch(registerAsync(registerInfo));
  };
  return (
    <>
      <div className="container">
        <img className="side-left__img" src={Side_Left} alt="" />
        <div className="side-right__register">
          <Typography
            variant="h4"
            sx={{
              fontWeight: 'Bold',
              fontSize: '34px',
              lineHeight: '42px',
              marginTop: '200px',
              mb: 2
            }}>
            Đăng ký tài khoản
          </Typography>

          <form
            className="side-right-form__register"
            onSubmit={handleSubmit(onSubmit)}>
            <div className="form-input__register">
              <Typography
                align="left"
                gutterBottom
                sx={{
                  fontSize: '16px',
                  lineHeight: '24px'
                }}>
                Số CMND/CCCD
                <Typography
                  sx={{
                    marginLeft: '2px',
                    display: 'inline-block',
                    color: 'red'
                  }}>
                  (*)
                </Typography>
              </Typography>
              <Controller
                name="identity_card"
                control={control}
                render={({ field, fieldState: { error } }) => (
                  <TextField
                    placeholder="Số CMND/CCCD"
                    sx={{
                      width: '100%',
                      mb: 2
                    }}
                    {...field}
                    error={!!error}
                    helperText={error?.message}
                  />
                )}
              />
            </div>

            <div className="form-input__register">
              <Typography
                align="left"
                gutterBottom
                sx={{
                  fontSize: '16px',
                  lineHeight: '24px'
                }}>
                Email
                <Typography
                  sx={{
                    marginLeft: '2px',
                    display: 'inline-block',
                    color: 'red'
                  }}>
                  (*)
                </Typography>
              </Typography>
              <Controller
                name="email"
                control={control}
                render={({ field, fieldState: { error } }) => (
                  <TextField
                    placeholder="Email"
                    sx={{
                      width: '100%',
                      mb: 2
                    }}
                    {...field}
                    error={!!error}
                    helperText={error?.message}
                  />
                )}
              />
            </div>

            <div className="form-input__register">
              <Typography
                align="left"
                gutterBottom
                sx={{
                  fontSize: '16px',
                  lineHeight: '24px'
                }}>
                Mật khẩu
                <Typography
                  sx={{
                    marginLeft: '2px',
                    display: 'inline-block',
                    color: 'red'
                  }}>
                  (*)
                </Typography>
              </Typography>
              <Controller
                name="password"
                control={control}
                render={({ field, fieldState: { error } }) => (
                  <TextField
                    type="password"
                    placeholder="Email"
                    sx={{
                      width: '100%',
                      mb: 2
                    }}
                    {...field}
                    error={!!error}
                    helperText={error?.message}
                  />
                )}
              />
            </div>

            <div className="form-input__register">
              <Typography
                align="left"
                gutterBottom
                sx={{
                  fontSize: '16px',
                  lineHeight: '24px'
                }}>
                Họ và tên
                <Typography
                  sx={{
                    marginLeft: '2px',
                    display: 'inline-block',
                    color: 'red'
                  }}>
                  (*)
                </Typography>
              </Typography>
              <Controller
                name="name"
                control={control}
                render={({ field, fieldState: { error } }) => (
                  <TextField
                    placeholder="Họ và rên"
                    sx={{
                      width: '100%',
                      mb: 2
                    }}
                    {...field}
                    error={!!error}
                    helperText={error?.message}
                  />
                )}
              />
            </div>
            <div className="form-input__register">
              <Typography
                align="left"
                gutterBottom
                sx={{
                  fontSize: '16px',
                  lineHeight: '24px'
                }}>
                Ngày sinh
                <Typography
                  sx={{
                    marginLeft: '2px',
                    display: 'inline-block',
                    color: 'red'
                  }}>
                  (*)
                </Typography>
              </Typography>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <Stack sx={{ width: '100%', mb: 4 }}>
                  <Controller
                    name="dob"
                    control={control}
                    render={({ field, fieldState: { error } }) => (
                      <FormControl>
                        <DatePicker
                          renderInput={(param) => (
                            <TextField
                              {...param}
                              error={!!error}
                              helperText={error?.message}
                            />
                          )}
                          {...field}
                        />
                      </FormControl>
                    )}
                  />
                </Stack>
              </LocalizationProvider>
            </div>

            <div className="form-input__register">
              <Typography
                align="left"
                gutterBottom
                sx={{
                  fontSize: '16px',
                  lineHeight: '24px'
                }}>
                Giới tính
                <Typography
                  sx={{
                    marginLeft: '2px',
                    display: 'inline-block',
                    color: 'red'
                  }}>
                  (*)
                </Typography>
              </Typography>
              <Controller
                name="gender"
                control={control}
                render={({ field, fieldState: { error } }) => (
                  <FormControl>
                    <RadioGroup
                      sx={{ mb: 2 }}
                      row
                      aria-labelledby="demo-controlled-radio-buttons-group"
                      {...field}
                      onChange={(event) => {
                        field.onChange(event.target.value);
                      }}>
                      <FormControlLabel
                        value="nam"
                        control={<Radio />}
                        label="Nam"
                      />
                      <FormControlLabel
                        value="nữ"
                        control={<Radio />}
                        label="Nữ"
                      />
                    </RadioGroup>
                    {error && (
                      <FormHelperText sx={{ color: 'red' }}>
                        {error?.message}
                      </FormHelperText>
                    )}
                  </FormControl>
                )}
              />
            </div>

            <div className="form-input__register">
              <Typography
                align="left"
                gutterBottom
                sx={{
                  fontSize: '16px',
                  lineHeight: '24px'
                }}>
                Tỉnh/Thành phố
                <Typography
                  sx={{
                    marginLeft: '2px',
                    display: 'inline-block',
                    color: 'red'
                  }}>
                  (*)
                </Typography>
              </Typography>
              <Controller
                name="province_id"
                control={control}
                render={({ field, fieldState: { error } }) => (
                  <FormControl fullWidth required sx={{ mb: 2 }}>
                    <InputLabel id="input-label">Province</InputLabel>
                    <Select
                      defaultValue=""
                      labelId="province-label-id"
                      id="province-select"
                      label="province"
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
            </div>

            <div className="form-input__register">
              <Typography
                align="left"
                gutterBottom
                sx={{
                  fontSize: '16px',
                  lineHeight: '24px'
                }}>
                Quận/Huyện
                <Typography
                  sx={{
                    marginLeft: '2px',
                    display: 'inline-block',
                    color: 'red'
                  }}>
                  (*)
                </Typography>
              </Typography>
              <Controller
                render={({ field, fieldState: { error } }) => (
                  <FormControl fullWidth required sx={{ mb: 2 }}>
                    <InputLabel id="input-label">District</InputLabel>
                    <Select
                      defaultValue=""
                      labelId="district-label-id"
                      id="district-select"
                      label="district"
                      {...field}
                      fullWidth
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
                name="district_id"
                control={control}
              />
            </div>

            <div className="form-input__register">
              <Typography
                align="left"
                gutterBottom
                sx={{
                  fontSize: '16px',
                  lineHeight: '24px'
                }}>
                Xã/Phường
                <Typography
                  sx={{
                    marginLeft: '2px',
                    display: 'inline-block',
                    color: 'red'
                  }}>
                  (*)
                </Typography>
              </Typography>
              <Controller
                name="ward_id"
                control={control}
                render={({ field, fieldState: { error } }) => (
                  <FormControl fullWidth required sx={{ mb: 2 }}>
                    <InputLabel id="input-label">Ward</InputLabel>
                    <Select
                      defaultValue=""
                      labelId="ward-label-id"
                      id="ward-select"
                      label="ward"
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
              {status === 'failed' && (
                <Typography
                  sx={{
                    color: 'red',
                    textAlign: 'center',
                    mb: 1
                  }}>
                  {error !== '' ? error : 'Đăng ký thất bại, hãy thử lại!!!'}
                </Typography>
              )}
            </div>

            <Button
              disabled={!isValid}
              type="submit"
              variant="outlined"
              sx={{
                mt: 1,
                mb: 2,
                ml: 35,
                backgroundColor: '#fff'
              }}
              endIcon={<ArrowRightAlt />}>
              Tiếp tục
            </Button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Register;

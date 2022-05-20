import React, { useState } from 'react';
import { Button, Stack, TextField, Typography } from '@mui/material';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Controller, useForm } from 'react-hook-form';
import { DatePicker, LocalizationProvider } from '@mui/lab';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import { ArrowRightAlt } from '@mui/icons-material';

import './Register.css';
import Side_Left from '../../img/Side_Left.png';

interface FormData {
  id: string;
  email: string;
  password: string;
  name: string;
  date: string;
  gender: string;
  city: string;
  district: string;
  wards: string;
}

const defaultValues = {
  id: '',
  email: '',
  password: '',
  name: '',
  date: '',
  gender: '',
  city: '',
  district: '',
  wards: ''
};
const schema = yup
  .object({
    id: yup.string().required().min(9).max(12),
    email: yup.string().email().required(),
    password: yup
      .string()
      .required()
      .min(8)
      .matches(/^\S*$/, 'Mật khẩu không được có khoảng trắng'),
    gender: yup.string().required()
  })
  .required();

const fakeData = [
  {
    idCity: 1,
    city: 'Hà Nội',
    districts: [
      {
        idDistrict: 1,
        districtName: 'Hoàn Kiếm',
        wards: [
          {
            wardId: 1,
            wardName: 'Chương Dương'
          },
          {
            wardId: 2,
            wardName: 'Cửa Nam'
          }
        ]
      },
      {
        idDistrict: 2,
        districtName: 'Hà Đông',
        wards: [
          {
            wardId: 1,
            wardName: 'La Khê'
          },
          {
            wardId: 2,
            wardName: 'Nguyễn Trãi'
          }
        ]
      }
    ]
  },
  {
    idCity: 2,
    city: 'Hồ Chí Minh',
    districts: [
      {
        idDistrict: 1,
        districtName: 'Quận 1',
        wards: [
          {
            wardId: 1,
            wardName: 'Bến Nghé'
          },
          {
            wardId: 2,
            wardName: 'Bến Thành'
          }
        ]
      },
      {
        idDistrict: 2,
        districtName: 'Quận 2',
        wards: [
          {
            wardId: 1,
            wardName: 'An Khánh'
          },
          {
            wardId: 2,
            wardName: 'An Phú'
          }
        ]
      }
    ]
  }
];
const Register = () => {
  const {
    control,
    handleSubmit,
    formState: { isValid }
  } = useForm<FormData>({
    defaultValues,
    mode: 'onChange',
    resolver: yupResolver(schema)
  });

  const [date, setDate] = useState<Date | null>(null);
  const [cityId, setCity] = useState('');
  const handleChangeCity = (e: SelectChangeEvent) => {
    setCity(e.target.value);
  };

  const [districtId, setDistrict] = useState('');
  const handleChangeDistrict = (e: SelectChangeEvent) => {
    setDistrict(e.target.value);
  };

  const [wardId, setWard] = useState('');
  const handleChangeWard = (e: SelectChangeEvent) => {
    setWard(e.target.value);
  };

  const filterDistrict = fakeData.find((data) => data.idCity === +cityId);

  const filterWard = filterDistrict?.districts.find(
    (data) => data.idDistrict === +districtId
  );

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
            onSubmit={handleSubmit(() => console.log(date))}>
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
                name="id"
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
                  <DatePicker
                    renderInput={(param) => <TextField {...param} />}
                    value={date}
                    onChange={(newDate) => setDate(newDate)}
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
                  <TextField
                    placeholder="Giới tính"
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
              <FormControl fullWidth sx={{ mb: 2 }}>
                <InputLabel id="demo-simple-select-label">City</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={cityId}
                  label="Age"
                  onChange={handleChangeCity}>
                  {fakeData.map((city, index) => (
                    <MenuItem key={index} value={city.idCity}>
                      {city.city}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
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
              <FormControl fullWidth sx={{ mb: 2 }}>
                <InputLabel id="demo-simple-select-label">District</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={districtId}
                  onChange={handleChangeDistrict}
                  label="District">
                  {filterDistrict?.districts.map((district, index) => (
                    <MenuItem key={index} value={district.idDistrict}>
                      {district.districtName}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
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
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Ward</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={wardId}
                  label="Ward"
                  onChange={handleChangeWard}>
                  {filterWard?.wards.map((ward, index) => (
                    <MenuItem key={index} value={ward.wardId}>
                      {ward.wardName}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </div>

            <Button
              disabled={!isValid}
              type="submit"
              variant="outlined"
              sx={{
                mt: 3,
                backgroundColor: '#fff',
                ml: 35
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

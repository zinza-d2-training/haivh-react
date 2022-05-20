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
    id: 1,
    name: 'Hà Nội',
    districts: [
      {
        id: 1,
        name: 'Hoàn Kiếm',
        parent_id: 1,
        wards: [
          {
            id: 1,
            name: 'Chương Dương',
            parent_id: 1
          },
          {
            id: 2,
            name: 'Cửa Nam',
            parent_id: 1
          }
        ]
      },
      {
        id: 2,
        name: 'Hà Đông',
        parent_id: 1,
        wards: [
          {
            id: 1,
            name: 'La Khê',
            parent_id: 2
          },
          {
            id: 2,
            name: 'Nguyễn Trãi',
            parent_id: 2
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
        parent_id: 2,
        wards: [
          {
            id: 1,
            name: 'Bến Nghé',
            parent_id: 1
          },
          {
            id: 2,
            name: 'Bến Thành',
            parent_id: 1
          }
        ]
      },
      {
        id: 2,
        name: 'Quận 2',
        parent_id: 2,
        wards: [
          {
            id: 1,
            name: 'An Khánh',
            parent_id: 2
          },
          {
            id: 2,
            name: 'An Phú',
            parent_id: 2
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

  const districts = fakeData.find((data) => data.id === +cityId);

  const wards = districts?.districts.find((data) => data.id === +districtId);

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
              <FormControl fullWidth required sx={{ mb: 2 }}>
                <InputLabel id="input-label">City</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={cityId}
                  label="Age"
                  onChange={handleChangeCity}>
                  {fakeData.map((city, index) => (
                    <MenuItem key={index} value={city.id}>
                      {city.name}
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
              <FormControl fullWidth required sx={{ mb: 2 }}>
                <InputLabel id="input-label">District</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={districtId}
                  onChange={handleChangeDistrict}
                  label="District">
                  {districts?.districts.map((district, index) => (
                    <MenuItem key={index} value={district.id}>
                      {district.name}
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
              <FormControl fullWidth required>
                <InputLabel id="input-label">Ward</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={wardId}
                  label="Ward"
                  onChange={handleChangeWard}>
                  {wards?.wards.map((ward, index) => (
                    <MenuItem key={index} value={ward.id}>
                      {ward.name}
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

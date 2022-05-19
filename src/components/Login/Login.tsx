import React from 'react';
import { Button, TextField, Typography } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import Side_Left from '../../img/Side_Left.png';
import './Login.css';
import { Controller, useForm } from 'react-hook-form';
import { green, lightGreen } from '@mui/material/colors';

import { incrementAsync } from '../../features/user/userSlice';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { LoadingButton } from '@mui/lab';

interface FormData {
  email: string;
  password: string;
}

const defaultValues = {
  email: '',
  password: ''
};

const schema = yup
  .object({
    email: yup.string().email().required(),
    password: yup
      .string()
      .required()
      .min(8)
      .matches(/^\S*$/, 'Mật khẩu không được có khoảng trắng')
  })
  .required();

const Login = () => {
  const loadingStatus = useAppSelector((state) => state.user.loading);
  const dispatch = useAppDispatch();
  const {
    control,
    handleSubmit,
    formState: { isValid }
  } = useForm<FormData>({
    defaultValues,
    mode: 'onChange',
    resolver: yupResolver(schema)
  });

  const navigate = useNavigate();

  const onSubmit = async (data: FormData) => {
    await dispatch(incrementAsync(data));
    navigate('/forgotPass');
  };

  return (
    <>
      <div className="container">
        <img className="side-left__img" src={Side_Left} alt="" />

        <div className="side-right">
          <div className="side-right__container">
            <Typography
              variant="h4"
              sx={{
                fontWeight: 'Bold',
                fontSize: '34px',
                lineHeight: '42px'
              }}>
              Đăng nhập vào tài khoản
            </Typography>
            <form className="side-right_form" onSubmit={handleSubmit(onSubmit)}>
              <div className="form-input">
                <Typography align="left" gutterBottom>
                  Email
                </Typography>
                <Controller
                  name="email"
                  control={control}
                  render={({ field, fieldState: { error } }) => (
                    <TextField
                      sx={{
                        width: '100%',
                        marginBottom: '5px'
                      }}
                      {...field}
                      error={!!error}
                      helperText={error?.message}
                    />
                  )}
                />
              </div>
              <div className="form-input">
                <Typography align="left" gutterBottom>
                  Mật khẩu
                </Typography>
                <Controller
                  name="password"
                  control={control}
                  render={({ field, fieldState: { error } }) => (
                    <TextField
                      type="password"
                      sx={{
                        width: '100%',
                        mb: 3
                      }}
                      {...field}
                      error={!!error}
                      helperText={error?.message}
                    />
                  )}
                />
              </div>
              <Link to="/forgotPass">
                <Typography
                  align="right"
                  sx={{
                    fontSize: '14px',
                    display: 'block',
                    mb: 3,
                    color: '#3949AB'
                  }}>
                  Quên mật khẩu?
                </Typography>
              </Link>
              <LoadingButton
                loading={loadingStatus}
                disabled={!isValid}
                type="submit"
                sx={{
                  backgroundColor: green[400],
                  width: '100%',
                  borderRadius: '5px',
                  padding: '15px 0',
                  color: '#fff',
                  mb: 3,
                  '&:hover': {
                    backgroundColor: green[500]
                  }
                }}>
                Đăng nhập
              </LoadingButton>
            </form>
            <Typography
              sx={{
                fontSize: '16px',
                fontWeight: '400',
                lineHeight: '24px',
                mb: 3
              }}>
              Hoặc đăng ký tài khoản nếu bạn chưa đăng ký
            </Typography>
            <Button
              variant="outlined"
              sx={{
                width: '100%',
                borderRadius: '5px',
                padding: '15px 0',
                borderColor: lightGreen[400],
                color: lightGreen[400],
                '&:hover': {
                  borderColor: lightGreen[500],
                  backgroundColor: '#fff'
                }
              }}>
              Đăng ký
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;

import React, { useState } from 'react';
import { Button, TextField, Typography } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import Side_Left from '../../img/Side_Left.png';
import './Login.css';
import { useForm } from 'react-hook-form';
import { green, lightGreen } from '@mui/material/colors';

import { incrementAsync } from '../../features/user/userSlice';
import { useAppSelector, useAppDispatch } from '../../app/hooks';

const Login = () => {
  const loadingStatus = useAppSelector((state) => state.user.loading);
  const dispatch = useAppDispatch();
  // const [userInfo, setUserInfo] = useState({});
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();

  const navigate = useNavigate();
  return (
    <>
      <div className="container">
        {/* <form onSubmit={handleSubmit((data) => console.log(data))}>
        <input type="text" {...register('test')} />
        <input type="submit" name="" id="" />
      </form> */}
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
            <form
              className="side-right_form"
              onSubmit={handleSubmit(async (data) => {
                await dispatch(incrementAsync(data));
                navigate('/forgotPass');
              })}>
              <div className="form-input">
                <Typography
                  align="left"
                  sx={{
                    marginBottom: '5px'
                  }}>
                  Email
                </Typography>
                <TextField
                  placeholder="Email"
                  sx={{
                    width: '100%',
                    marginBottom: '5px'
                  }}
                  {...register('email', {
                    required: 'Hãy nhập email',
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: 'invalid email address'
                    }
                  })}
                />
                {errors.email?.message && (
                  <Typography
                    align="left"
                    sx={{
                      marginBottom: '16px',
                      color: 'red'
                    }}>
                    {errors.email.message}
                  </Typography>
                )}
              </div>
              <div className="form-input">
                <Typography
                  align="left"
                  sx={{
                    marginBottom: '5px'
                  }}>
                  Mật khẩu
                </Typography>
                <TextField
                  placeholder="Mật khẩu"
                  type="password"
                  sx={{
                    width: '100%',
                    marginBottom: '24px'
                  }}
                  {...register('password', {
                    required: 'Hãy nhập mật khẩu',
                    minLength: {
                      value: 8,
                      message: 'Độ dài tối thiếu 8 ký tự'
                    },
                    pattern: {
                      value: /^\S*$/,
                      message: 'Mật khẩu không được có khoảng trắng'
                    }
                  })}
                />
                {errors.password?.message && (
                  <Typography
                    align="left"
                    sx={{
                      marginBottom: '16px',
                      color: 'red'
                    }}>
                    {errors.password.message}
                  </Typography>
                )}
              </div>
              <Link to="/forgotPass">
                <Typography
                  align="right"
                  sx={{
                    fontSize: '14px',
                    display: 'block',
                    marginBottom: '24px',
                    color: '#3949AB'
                  }}>
                  Quên mật khẩu?
                </Typography>
              </Link>
              {Object.keys(errors).length === 0 ? (
                <Button
                  // onClick={() => dispatch(incrementAsync(userInfo))}
                  type="submit"
                  sx={{
                    backgroundColor: green[400],
                    width: '100%',
                    borderRadius: '5px',
                    padding: '15px 0',
                    color: '#fff',
                    marginBottom: '24px',
                    '&:hover': {
                      backgroundColor: green[500]
                    }
                  }}>
                  Đăng nhập
                </Button>
              ) : (
                <Button
                  disabled
                  type="submit"
                  sx={{
                    backgroundColor: green[400],
                    width: '100%',
                    borderRadius: '5px',
                    padding: '15px 0',
                    color: '#fff',
                    marginBottom: '24px',
                    '&:hover': {
                      backgroundColor: green[500]
                    }
                  }}>
                  Đăng nhập
                </Button>
              )}
            </form>
            <Typography
              sx={{
                fontSize: '16px',
                fontWeight: '400',
                lineHeight: '24px',
                marginBottom: '24px'
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

      {loadingStatus && (
        <div className="modal">
          <div className="loader"></div>
        </div>
      )}
    </>
  );
};

export default Login;

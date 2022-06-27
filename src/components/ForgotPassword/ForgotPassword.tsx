import { Typography, TextField, Button } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { indigo } from '@mui/material/colors';
import React from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Controller, useForm } from 'react-hook-form';

import Side_Left from '../../img/Side_Left.png';
import './ForgotPassword.css';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { useNavigate } from 'react-router-dom';
import { forgotPasswordAsync } from '../../features/user/forgotPasswordSlice';

interface FormData {
  email: string;
}

const defaultValues = {
  email: ''
};

const schema = yup.object({
  email: yup.string().required().email()
});

const ForgotPassword = () => {
  const loadingStatus = useAppSelector((state) => state.forgotPassword.loading);
  const message = useAppSelector((state) => state.forgotPassword.message);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const {
    control,
    handleSubmit,
    formState: { isValid }
  } = useForm<FormData>({
    defaultValues,
    mode: 'onChange',
    resolver: yupResolver(schema)
  });

  const onSubmit = async (data: FormData) => {
    await dispatch(forgotPasswordAsync(data));
  };

  const handleBack = () => {
    navigate('/');
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
                textAlign: 'center',
                fontSize: '16px',
                fontWeight: '400',
                lineHeight: '24px',
                letterSpacing: '-0.04px',
                pl: 5,
                pr: 5,
                mb: 3
              }}>
              Để khôi phục mật khẩu, vui lòng nhập đúng email bạn đã dùng để
              đăng ký
              <Typography
                sx={{
                  marginLeft: '2px',
                  display: 'inline-block',
                  color: 'red'
                }}>
                (*)
              </Typography>
            </Typography>
            <form className="side-right_form" onSubmit={handleSubmit(onSubmit)}>
              <Controller
                name="email"
                control={control}
                render={({ field, fieldState: { error } }) => (
                  <TextField
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
              {message !== '' ? (
                <Typography
                  sx={{
                    color: 'red',
                    textAlign: 'center',
                    mb: 1
                  }}>
                  {message}
                </Typography>
              ) : (
                ''
              )}
              <div className="btn-group">
                <Button
                  onClick={handleBack}
                  variant="outlined"
                  sx={{
                    margin: '12px  16px 12px 0',
                    borderColor: indigo[400],
                    borderRadius: '8px',
                    '&:hover': {
                      borderColor: indigo[500],
                      backgroundColor: '#fff'
                    }
                  }}>
                  Quay lại
                </Button>
                <LoadingButton
                  loading={loadingStatus}
                  type="submit"
                  disabled={!isValid}
                  sx={{
                    color: '#fff',
                    backgroundColor: indigo[600],
                    margin: '12px 0',
                    borderRadius: '8px',
                    '&:hover': {
                      backgroundColor: indigo[700]
                    }
                  }}>
                  Gửi
                </LoadingButton>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default ForgotPassword;

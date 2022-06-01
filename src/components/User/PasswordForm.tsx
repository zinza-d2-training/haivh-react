import React, { useState } from 'react';
import styled from '@emotion/styled';
import {
  Box,
  Typography,
  Grid,
  Button,
  TextField,
  OutlinedInput,
  InputAdornment,
  IconButton,
  FormHelperText
} from '@mui/material';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Controller, useForm } from 'react-hook-form';

import Create from '../../img/Create.png';
import { Visibility, VisibilityOff } from '@mui/icons-material';

const PasswordBox = styled(Box)``;

const HeaderText = styled(Typography)`
  display: flex;
  align-items: center;
  margin-bottom: 5px;
  font-size: 16px;
  font-weight: 500;
  line-height: 24px;
`;
const LabelText = styled(Typography)`
  margin-bottom: 16px;
  font-size: 16px;
  font-weight: 400;
  line-height: 24px;
`;

const ButtonBox = styled(Box)`
  margin-bottom: 24px;
`;

interface Password {
  password: string;
  password_confirm: string;
}

const defaultValues = {
  password: '123456789',
  password_confirm: '123456789'
};

const schema = yup
  .object({
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
const PasswordForm = () => {
  const {
    control,
    handleSubmit,
    reset,
    formState: { isValid }
  } = useForm<Password>({
    defaultValues,
    mode: 'onChange',
    resolver: yupResolver(schema)
  });

  const [showPassword, setShowPassword] = useState(true);
  const [showConfirmPassword, setConfirmPassword] = useState(true);
  const [disable, setDisable] = useState(true);
  const [showCreate, setShowCreate] = useState(true);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleClickShowConfirmPassword = () => {
    setConfirmPassword(!showConfirmPassword);
  };

  const ToggleDisable = () => {
    setDisable(!disable);
    setShowPassword(true);
    setConfirmPassword(true);
    setShowCreate(false);
  };

  const onSubmit = (data: Password) => {
    setDisable(true);
    setShowCreate(true);
  };

  const handleCancel = () => {
    reset(defaultValues);
    setDisable(true);
    setShowPassword(true);
    setConfirmPassword(true);
    setShowCreate(true);
  };

  return (
    <PasswordBox component="form" onSubmit={handleSubmit(onSubmit)}>
      <HeaderText>
        Mật khẩu
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
      <Grid container spacing={2} sx={{ mb: 3 }}>
        <Grid item xs={3}>
          <Box>
            <LabelText>Mật khẩu mới</LabelText>
            <Controller
              name="password"
              control={control}
              render={({ field, fieldState: { error } }) => (
                <TextField
                  disabled={disable}
                  type={showPassword ? 'password' : 'text'}
                  sx={{ width: '100%' }}
                  placeholder="Mật khẩu mới"
                  size="small"
                  {...field}
                  error={!!error}
                  helperText={error?.message}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          disabled={disable}
                          className="icon"
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          // onMouseDown={handleMouseDownPassword}
                          edge="end">
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    )
                  }}
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
                  disabled={disable}
                  type={showConfirmPassword ? 'password' : 'text'}
                  sx={{ width: '100%' }}
                  placeholder="Xác nhận mật khẩu"
                  size="small"
                  {...field}
                  error={!!error}
                  helperText={error?.message}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          disabled={disable}
                          className="icon"
                          aria-label="toggle password visibility"
                          onClick={handleClickShowConfirmPassword}
                          // onMouseDown={handleMouseDownPassword}
                          edge="end">
                          {showConfirmPassword ? (
                            <VisibilityOff />
                          ) : (
                            <Visibility />
                          )}
                        </IconButton>
                      </InputAdornment>
                    )
                  }}
                />
              )}
            />
          </Box>
        </Grid>
      </Grid>

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
    </PasswordBox>
  );
};

export default PasswordForm;

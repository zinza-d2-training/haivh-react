import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {
  Box,
  Button,
  Dialog,
  DialogTitle,
  TextField,
  Typography,
  FormControl,
  Select,
  MenuItem
} from '@mui/material';
import { Clear } from '@mui/icons-material';
import { DatePicker, LocalizationProvider } from '@mui/lab';
import AdapterDateFns from '@mui/lab/AdapterDateFns';

import { Row } from './AdminRegistration';

interface Props {
  data: Row;
  onSubmit: (data: Row) => void;
  onClose: () => void;
}

const schema = yup
  .object({
    name: yup.string().required(),
    groupPerson: yup.string().required(),
    insurance: yup.string().required(),
    address: yup.string().required(),
    job: yup.string().required(),
    jobLocation: yup.string().required(),
    date: yup.string().required(),
    session: yup.string().required()
  })
  .required();

const AdminRegistrationDialog = ({ data, onSubmit, onClose }: Props) => {
  const { control, handleSubmit } = useForm<Row>({
    defaultValues: data,
    mode: 'onChange',
    resolver: yupResolver(schema)
  });

  const Submit = (data: Row) => {
    onSubmit(data);
    onClose();
    console.log(data);
  };

  const handleClose = () => {
    onClose();
  };
  return (
    <Dialog open={true} onClose={handleClose}>
      <DialogTitle
        sx={{
          padding: '0 0 16px'
        }}>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            width: '444px',
            height: '64px',
            padding: '0 24px',
            borderBottom: '1px solid #EEEEEE',
            alignItems: 'center'
          }}>
          <Typography
            sx={{
              fontSize: '20px',
              lineHeight: '32px',
              letterSpacing: '-0.05px',
              fontWeight: '500',
              color: 'rgba(0, 0, 0, 0.87)'
            }}>
            Cập Nhật Đăng Ký Tiêm
          </Typography>
          <Box>
            <Clear
              onClick={handleClose}
              sx={{
                cursor: 'pointer'
              }}
            />
          </Box>
        </Box>
      </DialogTitle>

      <Box
        component="form"
        onSubmit={handleSubmit(Submit)}
        sx={{
          padding: '8px 24px 24px'
        }}>
        <Box mb={3}>
          <Typography mb={0.625}>Họ và tên</Typography>
          <Controller
            name="name"
            control={control}
            render={({ field, fieldState: { error } }) => (
              <TextField
                sx={{ width: '100%' }}
                size="small"
                error={!!error}
                {...field}
                helperText={error?.message}
              />
            )}
          />
        </Box>
        <Box mb={3}>
          <Typography mb={0.625}>Nhóm</Typography>
          <Controller
            name="groupPerson"
            control={control}
            render={({ field, fieldState: { error } }) => (
              <FormControl sx={{ width: '100%' }}>
                <Select
                  defaultValue=""
                  size="small"
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  {...field}
                  onChange={(event) => {
                    field.onChange(event.target.value);
                  }}>
                  <MenuItem
                    value={'Người làm việc trong các cơ sở y tế, ngành y tế'}>
                    1. Người làm việc trong các cơ sở y tế, ngành y tế
                  </MenuItem>
                  <MenuItem value={'Lực lượng quân đội'}>
                    2. Lực lượng quân đội
                  </MenuItem>
                  <MenuItem value={'Lực lượng công an'}>
                    3. Lực lượng công an
                  </MenuItem>
                  <MenuItem value={'Người lao động tự do'}>
                    4. Người lao động tự do
                  </MenuItem>
                </Select>
              </FormControl>
            )}
          />
        </Box>
        <Box mb={3}>
          <Typography mb={0.625}>Số thẻ BHYT</Typography>
          <Controller
            name="insurance"
            control={control}
            render={({ field, fieldState: { error } }) => (
              <TextField
                sx={{ width: '100%' }}
                size="small"
                {...field}
                error={!!error}
                helperText={error?.message}
              />
            )}
          />
        </Box>
        <Box mb={3}>
          <Typography mb={0.625}>Địa chỉ</Typography>
          <Controller
            name="address"
            control={control}
            render={({ field, fieldState: { error } }) => (
              <TextField
                sx={{ width: '100%' }}
                size="small"
                {...field}
                error={!!error}
                helperText={error?.message}
              />
            )}
          />
        </Box>
        <Box mb={3}>
          <Typography mb={0.625}>Nghề nghiệp</Typography>
          <Controller
            name="job"
            control={control}
            render={({ field, fieldState: { error } }) => (
              <TextField
                sx={{ width: '100%' }}
                size="small"
                {...field}
                error={!!error}
                helperText={error?.message}
              />
            )}
          />
        </Box>
        <Box mb={3}>
          <Typography mb={0.625}>Đơn vị công tác</Typography>
          <Controller
            name="jobLocation"
            control={control}
            render={({ field, fieldState: { error } }) => (
              <TextField
                sx={{ width: '100%' }}
                size="small"
                {...field}
                error={!!error}
                helperText={error?.message}
              />
            )}
          />
        </Box>
        <Box mb={3}>
          <Typography mb={0.625}>Ngày tiêm</Typography>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <Controller
              name="date"
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
        </Box>

        <Box mb={3}>
          <Typography mb={0.625}>Buổi tiêm</Typography>
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
                  <MenuItem value={'Cả ngày'}>Cả ngày</MenuItem>
                </Select>
              </FormControl>
            )}
          />
        </Box>

        <Box
          sx={{
            display: 'flex',
            justifyContent: 'flex-end'
          }}>
          <Button
            onClick={handleClose}
            variant="outlined"
            sx={{
              mr: 2,
              borderRadius: '8px 8px 8px 0'
            }}>
            Hủy bỏ
          </Button>
          <Button
            type="submit"
            variant="contained"
            sx={{
              borderRadius: '8px 8px 8px 0'
            }}>
            Xác nhận
          </Button>
        </Box>
      </Box>
    </Dialog>
  );
};

export default AdminRegistrationDialog;

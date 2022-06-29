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
  Typography
} from '@mui/material';
import { Clear } from '@mui/icons-material';

const schema = yup
  .object({
    name: yup.string().required(),
    address: yup.string().required(),
    manager: yup.string().required(),
    number_table: yup.number().min(0)
  })
  .required();

export interface _Row {
  id: number;
  name: string;
  address: string;
  ward_id: number;
  manager: string;
  number_table: number;
}
interface Props {
  data: _Row;
  onSubmit: (data: _Row) => void;
  onClose: () => void;
}

const AdminLocationDialog = ({ data, onSubmit, onClose }: Props) => {
  const { control, handleSubmit } = useForm<_Row>({
    defaultValues: data,
    mode: 'onChange',
    resolver: yupResolver(schema)
  });

  const Submit = (data: _Row) => {
    onSubmit(data);
    onClose();
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
            Cập Nhật Điểm Tiêm
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
          <Typography mb={0.625}>Tên điểm tiêm</Typography>
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
          <Typography mb={0.625}>Người đứng đầu cơ sở</Typography>
          <Controller
            name="manager"
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
          <Typography mb={0.625}>Số bàn tiêm</Typography>
          <Controller
            name="number_table"
            control={control}
            render={({ field, fieldState: { error } }) => (
              <TextField
                type="number"
                sx={{ width: '100%' }}
                size="small"
                {...field}
                error={!!error}
                helperText={error?.message}
              />
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

export default AdminLocationDialog;

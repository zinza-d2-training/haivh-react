import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import { Box, TextField, Button } from '@mui/material';
import { AdminRegistration } from '../DataGrid/AdminRegistration';
import { Controller, useForm } from 'react-hook-form';
import { Search } from '@mui/icons-material';

interface SearchData {
  name: string;
  insurance: string;
}

const defaultValues = {
  name: '',
  insurance: ''
};

const InputField = styled(TextField)`
  margin-right: 16px;
  width: 260px;
`;

const Registration = () => {
  const { control, setValue, watch } = useForm<SearchData>({
    defaultValues,
    mode: 'onChange'
  });

  const name = watch('name');
  const insurance = watch('insurance');

  const [search, setSearch] = useState({
    name,
    insurance
  });

  const handleSearch = () => {
    setSearch({
      name,
      insurance
    });
    setValue('name', '');
    setValue('insurance', '');
  };

  return (
    <Box>
      <Controller
        name="name"
        control={control}
        render={({ field, fieldState: { error } }) => (
          <InputField
            label="Họ và tên"
            placeholder="Họ và tên"
            size="small"
            {...field}
            error={!!error}
          />
        )}
      />
      <Controller
        name="insurance"
        control={control}
        render={({ field, fieldState: { error } }) => (
          <InputField
            label="Số thẻ BHYT"
            placeholder="Số thẻ BHYT"
            size="small"
            {...field}
            error={!!error}
          />
        )}
      />
      <Button
        onClick={handleSearch}
        variant="contained"
        startIcon={<Search />}
        sx={{
          width: '148px',
          borderRadius: '8px 8px 8px 0'
        }}>
        Tìm kiếm
      </Button>
      <Box />
      <AdminRegistration search={search} />
    </Box>
  );
};

export default Registration;

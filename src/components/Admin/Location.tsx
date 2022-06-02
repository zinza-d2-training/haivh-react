import { Box, Button, TextField } from '@mui/material';
import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import { Search } from '@mui/icons-material';
import AdminLocation from '../DataGrid/AdminLocation';
import { Controller, useForm } from 'react-hook-form';

interface SearchData {
  location: string;
  address: string;
}

const defaultValues = {
  location: '',
  address: ''
};

const InputField = styled(TextField)`
  margin-right: 16px;
  width: 260px;
`;

const Location = () => {
  const { control, setValue, watch } = useForm<SearchData>({
    defaultValues,
    mode: 'onChange'
  });

  const locationInfo = watch('location');
  const addressInfo = watch('address');

  const [search, setSearch] = useState({
    locationInfo,
    addressInfo
  });

  const handleSearch = () => {
    setSearch({
      locationInfo,
      addressInfo
    });
  };

  return (
    <Box>
      <Controller
        name="location"
        control={control}
        render={({ field, fieldState: { error } }) => (
          <InputField
            label="Điểm tiêm"
            placeholder="Điểm tiêm"
            size="small"
            {...field}
            onChange={(e) => setValue('location', e.target.value)}
            error={!!error}
          />
        )}
      />
      <Controller
        name="address"
        control={control}
        render={({ field, fieldState: { error } }) => (
          <InputField
            label="Địa chỉ"
            placeholder="Địa chỉ"
            size="small"
            {...field}
            onChange={(e) => setValue('address', e.target.value)}
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

      <AdminLocation search={search} />
    </Box>
  );
};

export default Location;

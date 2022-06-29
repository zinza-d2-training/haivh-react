import React, { useEffect, useMemo, useState } from 'react';
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Typography
} from '@mui/material';
import { Search } from '@mui/icons-material';
import DataGird from '../DataGrid/DataGird';
import { Controller, useForm } from 'react-hook-form';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import { axiosInstance } from '../../requestMethod';

interface FormData {
  province_id: number | string;
  district_id: number | string;
  ward_id: number | string;
}

const defaultValues = {
  province_id: 0,
  district_id: 0,
  ward_id: 0
};

interface Ward {
  id: number;
  name: string;
  district_id: number;
}

interface District {
  id: number;
  name: string;
  wards: Ward[];
  province_id: number;
}
interface Province {
  id: number;
  name: string;
  districts: District[];
}

const LocationSortContainer = styled(Box)`
  display: flex;
  margin-bottom: 16px;
`;

const ShadowBox = styled(Box)`
  margin: 34px 0 32px;
  padding: 24px 16px;
  box-shadow: 0 4px 12px 0 rgb(34 41 47 / 12%);
  border-radius: 10px;
`;

const Location = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    const getData = async () => {
      try {
        const res = await axiosInstance.get('/subdivisions');
        setData(res.data);
      } catch (err) {}
    };
    getData();
  }, []);
  const provinces: Province[] = data;
  const { control, setValue, watch } = useForm<FormData>({
    defaultValues,
    mode: 'onChange'
  });

  const provinceId = watch('province_id');
  const districtId = watch('district_id');
  const wardId = watch('ward_id');

  useEffect(() => {
    const subscription = watch((value, { name, type }) => {
      if (name === 'province_id') {
        setValue('district_id', '');
        setValue('ward_id', '');
      }
      if (name === 'district_id') {
        setValue('ward_id', '');
      }
    });
    return () => subscription.unsubscribe();
  }, [setValue, watch]);

  const districts = useMemo(() => {
    return (
      provinces.find((province) => province.id === provinceId)?.districts ?? []
    );
  }, [provinceId, provinces]);

  const wards = useMemo(() => {
    return (
      districts.find((district) => district.id === districtId)?.wards ?? []
    );
  }, [districtId, districts]);

  const [search, setSearch] = useState({
    provinceId,
    districtId,
    wardId
  });

  const handleSearch = () => {
    setSearch({
      provinceId,
      districtId,
      wardId
    });
  };

  return (
    <ShadowBox>
      <Typography
        variant="h6"
        sx={{
          fontSize: '20px',
          lineHeight: '30px',
          letterSpacing: '-0.05px',
          fontWeight: 500,
          color: 'rgba(0, 0, 0, 0.87)',
          mb: 2
        }}>
        Dữ liệu tiêm theo ngày
      </Typography>

      <LocationSortContainer>
        <Controller
          name="province_id"
          control={control}
          render={({ field, fieldState: { error } }) => (
            <FormControl sx={{ mb: 2, mr: 2, width: '260px' }}>
              <InputLabel id="input-label">Province</InputLabel>
              <Select
                size="small"
                defaultValue=""
                labelId="province-label-id"
                id="province-select"
                label="province"
                {...field}
                onChange={(event) => {
                  field.onChange(event.target.value);
                }}>
                {provinces.map((province) => (
                  <MenuItem key={province.id} value={province.id}>
                    {province.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          )}
        />
        <Controller
          render={({ field, fieldState: { error } }) => (
            <FormControl size="small" sx={{ mb: 2, mr: 2, width: '260px' }}>
              <InputLabel id="input-label">District</InputLabel>
              <Select
                disabled={!provinceId}
                defaultValue=""
                labelId="district-label-id"
                id="district-select"
                label="district"
                {...field}
                onChange={(event) => {
                  field.onChange(event.target.value);
                }}>
                {districts.map((district) => (
                  <MenuItem key={district.id} value={district.id}>
                    {district.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          )}
          name="district_id"
          control={control}
        />
        <Controller
          name="ward_id"
          control={control}
          render={({ field, fieldState: { error } }) => (
            <FormControl size="small" sx={{ mb: 2, mr: 2, width: '260px' }}>
              <InputLabel id="input-label">Ward</InputLabel>
              <Select
                disabled={!districtId}
                defaultValue=""
                labelId="ward-label-id"
                id="ward-select"
                label="ward"
                {...field}
                onChange={(event) => {
                  field.onChange(event.target.value);
                }}>
                {wards.map((ward) => (
                  <MenuItem key={ward.id} value={ward.id}>
                    {ward.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          )}
        />
        <Button
          sx={{
            width: '148px',
            height: '40px',
            padding: '8px 16px',
            borderRadius: '8px 8px 8px 0',
            backgroundColor: '#171A88',
            '&:hover': {
              backgroundColor: '#171a6d'
            }
          }}
          onClick={handleSearch}>
          <Search
            sx={{
              color: '#fff',
              mr: 1
            }}
          />
          <Typography
            sx={{
              fontSize: '18px',
              fontWeight: '500',
              lineHeight: '23px',
              color: '#fff'
            }}>
            Tìm kiếm
          </Typography>
        </Button>
      </LocationSortContainer>
      <DataGird search={search} />
    </ShadowBox>
  );
};

export default Location;

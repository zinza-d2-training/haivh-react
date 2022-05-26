import React, { useEffect, useMemo, useState } from 'react';

import './Location.css';
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

const provinces: Province[] = [
  {
    id: 1,
    name: 'Hà Nội',
    districts: [
      {
        id: 1,
        name: 'Ba Đình',
        province_id: 1,
        wards: [
          {
            id: 1,
            name: 'Phúc Xá',
            district_id: 1
          },
          {
            id: 2,
            name: 'Trúc Bạch',
            district_id: 1
          },
          {
            id: 3,
            name: 'Vĩnh Phúc',
            district_id: 1
          },
          {
            id: 4,
            name: 'Cống Vị',
            district_id: 1
          },
          {
            id: 5,
            name: 'Liễu Giai',
            district_id: 1
          },
          {
            id: 6,
            name: 'Nguyễn Trung Trực',
            district_id: 1
          },
          {
            id: 7,
            name: 'Quán Thánh',
            district_id: 1
          }
        ]
      },
      {
        id: 2,
        name: 'Hà Đông',
        province_id: 1,
        wards: [
          {
            id: 1,
            name: 'Nguyễn Trãi',
            district_id: 2
          },
          {
            id: 2,
            name: 'Mộ Lao',
            district_id: 2
          },
          {
            id: 3,
            name: 'Văn Quán',
            district_id: 2
          },
          {
            id: 4,
            name: 'Vạn Phúc',
            district_id: 2
          },
          {
            id: 5,
            name: 'Yết Kiêu',
            district_id: 2
          },
          {
            id: 6,
            name: 'Quang Trung',
            district_id: 2
          }
        ]
      }
    ]
  }
];

const Location = () => {
  const {
    control,
    handleSubmit,
    formState: { isValid },
    setValue,
    watch
  } = useForm<FormData>({
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
  }, [provinceId]);

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
    <div className="location-container">
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

      <div className="location-sort-container">
        <Controller
          name="province_id"
          control={control}
          render={({ field, fieldState: { error } }) => (
            <FormControl sx={{ mb: 2, mr: 2, width: '260px' }}>
              <InputLabel id="input-label">Province</InputLabel>
              <Select
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
            <FormControl sx={{ mb: 2, mr: 2, width: '260px' }}>
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
            <FormControl sx={{ mb: 2, mr: 2, width: '260px' }}>
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
            height: '56px',
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
      </div>
      <DataGird
        search={search}
        // districtId={Number(districtId) || undefined}
        // provinceId={Number(provinceId) || undefined}
        // wardId={Number(wardId) || undefined}
      />
    </div>
  );
};

export default Location;
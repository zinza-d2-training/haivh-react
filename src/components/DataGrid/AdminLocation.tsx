import React, { useMemo, useState } from 'react';
import {
  DataGrid,
  GridColDef,
  gridPageCountSelector,
  gridPageSelector,
  useGridApiContext,
  useGridSelector
} from '@mui/x-data-grid';
import Pagination from '@mui/material/Pagination';
import {
  Box,
  Button,
  Dialog,
  DialogTitle,
  FormControl,
  FormHelperText,
  MenuItem,
  Select,
  TextField,
  Typography
} from '@mui/material';
import { Clear } from '@mui/icons-material';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

interface DataGridProps {
  search: {
    locationInfo: string;
    addressInfo: string;
  };
}

interface Row {
  id: number;
  name: string;
  address: string;
  leader: string;
  numberTable: number;
}

const defaultValues = {
  id: 0,
  name: '',
  address: '',
  leader: '',
  numberTable: 0
};
const rows: Row[] = [
  {
    id: 1,
    name: 'Bệnh viện Đa khoa Medlatec',
    address: '42-44 Nghĩa Dũng',
    leader: 'Nguyễn Thị Kim Liên',
    numberTable: 1
  },
  {
    id: 2,
    name: 'Trạm y tế Phường Phúc Xá',
    address: '84 Nghĩa Dũng',
    leader: 'Đỗ Thế Bảo',
    numberTable: 1
  },
  {
    id: 3,
    name: 'Trạm y tế Phường Trúc Bạch',
    address: '2 Trúc Bạch',
    leader: 'Trần Thị Hồng Tuyết',
    numberTable: 1
  },
  {
    id: 4,
    name: 'Bệnh viện Đa khoa Hồng Ngọc',
    address: '55 Yên Ninh',
    leader: 'Cao Độc Lập',
    numberTable: 1
  },
  {
    id: 5,
    name: 'Bệnh viện Quân Y 354',
    address: '120 Đốc Ngữ',
    leader: 'Phạm Minh Đức',
    numberTable: 1
  },
  {
    id: 6,
    name: 'Trạm y tế Phường Vĩnh Phúc',
    address: 'Tầng 1 nhà K3, khu 7',
    leader: 'Nguyễn Tường Phượng',
    numberTable: 1
  },
  {
    id: 7,
    name: 'Trạm y tế Phường Cống Vị',
    address: '518 Đội Cấn',
    leader: 'Nguyễn Thị Hồng Thúy',
    numberTable: 1
  },
  {
    id: 8,
    name: 'Trạm y tế Phường Liễu Giai',
    address: '3 Quần Ngựa',
    leader: 'Trần Trúc Hồ',
    numberTable: 1
  },
  {
    id: 9,
    name: 'Trạm y tế Phường Nguyễn Trung Trực',
    address: '6 Hàng Bún',
    leader: 'Nguyễn Trọng Điệp',
    numberTable: 1
  },
  {
    id: 10,
    name: 'Trạm y tế Phường Quán Thánh',
    address: '50 Hàng Bún',
    leader: 'Bạch Thị Ngọc Hoan',
    numberTable: 1
  },
  {
    id: 11,
    name: 'Trạm y tế Phường Nguyễn Trãi',
    address: '58 Phố Nhuệ Giang',
    leader: 'Nguyễn Đức Quý',
    numberTable: 1
  },
  {
    id: 12,
    name: 'Trạm y tế Phường Mộ Lao',
    address: 'LK16B1 LVKCA Tổ 14',
    leader: 'Ngô Thị Hoàn',
    numberTable: 1
  },
  {
    id: 13,
    name: 'Phòng khám tư vấn và điều trị dự phòng',
    address: 'LK 6D-1 C17 Bộ công Tổ 14',
    leader: 'Mai Thanh Yên',
    numberTable: 1
  },
  {
    id: 14,
    name: 'Trạm y tế Phường Văn Quán',
    address: '83A_đường 19/05',
    leader: 'Nguyễn Thị Hòa',
    numberTable: 1
  },
  {
    id: 15,
    name: 'Phòng tiêm chủng dịch vụ VNVC Skyline',
    address: 'tầng 3 tòa nhà Newskyline',
    leader: 'Lưu Thị Thoa',
    numberTable: 1
  },
  {
    id: 16,
    name: 'Trạm y tế Phường Vạn Phúc',
    address: 'Số 68-phố cầu am',
    leader: 'Nguyễn Thiện Phương',
    numberTable: 1
  },
  {
    id: 17,
    name: 'Trạm y tế Phường Yết Kiêu',
    address: '2 Tiều Công nghệ',
    leader: 'Nguyễn T Thanh Nhàn',
    numberTable: 1
  },
  {
    id: 18,
    name: 'Phòng tiêm chủng Bệnh viện đa khoa Hà Đông',
    address: 'Số 2 Nguyễn Viết Xuân',
    leader: 'Đinh Thị Uyên',
    numberTable: 1
  },
  {
    id: 19,
    name: 'Khoa sản Bệnh viện Đa khoa Hà Đông',
    address: 'Số 2 Bế văn đàn',
    leader: 'Đào Thị Lan',
    numberTable: 1
  },
  {
    id: 20,
    name: 'Trạm y tế Phường Quang Trung',
    address: 'Số 202 đường Quang Trung',
    leader: 'Bùi Thị Lan Khanh',
    numberTable: 1
  }
];

const AdminLocation = ({ search }: DataGridProps) => {
  const { control, handleSubmit, watch } = useForm<Row>({
    defaultValues,
    mode: 'onChange'
    // resolver: yupResolver(schema)
  });

  const currentRows = useMemo(() => {
    if (search.locationInfo !== '') {
      return rows
        .filter((row) => row.name === search.locationInfo)
        .map((item, index) => ({
          ...item,
          index: index + 1
        }));
    } else if (search.addressInfo !== '') {
      return rows
        .filter((row) => row.address === search.addressInfo)
        .map((item, index) => ({
          ...item,
          index: index + 1
        }));
    } else if (search.locationInfo !== '' && search.addressInfo !== '') {
      return rows
        .filter(
          (row) =>
            row.name === search.locationInfo &&
            row.address === search.addressInfo
        )
        .map((item, index) => ({
          ...item,
          index: index + 1
        }));
    } else {
      return rows.map((item, index) => ({
        ...item,
        index: index + 1
      }));
    }
  }, [search.locationInfo, search.addressInfo]);

  const columns: GridColDef[] = [
    {
      field: 'index',
      headerName: 'STT',
      width: 287.6,
      headerAlign: 'center',
      align: 'center'
    },
    {
      field: 'name',
      headerName: 'Tên điểm tiêm',
      width: 287.6
    },
    {
      field: 'address',
      headerName: 'Địa chỉ',
      width: 287.6
    },
    {
      field: 'leader',
      headerName: 'Người đứng đầu cơ sở tiêm chủng',
      width: 287.6
    },
    {
      field: 'numberTable',
      headerName: 'Số bàn tiêm',
      width: 287.6,
      headerAlign: 'center',
      align: 'center'
    }
  ];

  const CustomPagination = () => {
    const apiRef = useGridApiContext();
    const page = useGridSelector(apiRef, gridPageSelector);
    const pageCount = useGridSelector(apiRef, gridPageCountSelector);

    return (
      <Pagination
        color="primary"
        count={pageCount}
        page={page + 1}
        onChange={(event, value) => apiRef.current.setPage(value - 1)}
      />
    );
  };

  const [open, setOpen] = useState(false);
  const [info, setInfo] = useState(defaultValues);
  const name = watch('name');
  const handleClick = (rowData: Row) => {
    setInfo(rowData);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const onSubmit = (data: Row) => {
    console.log(data);
  };

  const handleSave = () => {
    console.log(name);
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      style={{
        height: 700,
        width: '100%',
        marginTop: '18px'
      }}>
      <DataGrid
        rows={currentRows}
        onRowClick={(param) => handleClick(param.row)}
        columns={columns}
        pagination
        pageSize={10}
        rowsPerPageOptions={[5]}
        components={{
          Pagination: CustomPagination
        }}
      />

      <Dialog open={open} onClose={handleClose}>
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
                  placeholder="Tên điểm tiêm"
                  size="small"
                  error={!!error}
                  {...field}
                  onChange={(event) => event.target.value}
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
                  placeholder="Địa chỉ"
                  size="small"
                  {...field}
                  onChange={(event) => event.target.value}
                  error={!!error}
                  helperText={error?.message}
                />
              )}
            />
          </Box>
          <Box mb={3}>
            <Typography mb={0.625}>Người đứng đầu cơ sở</Typography>
            <Controller
              name="leader"
              control={control}
              render={({ field, fieldState: { error } }) => (
                <TextField
                  sx={{ width: '100%' }}
                  placeholder="Người đứng đầu cơ sở"
                  size="small"
                  {...field}
                  onChange={(event) => event.target.value}
                  error={!!error}
                  helperText={error?.message}
                />
              )}
            />
          </Box>
          <Box mb={3}>
            <Typography mb={0.625}>Số bàn tiêm</Typography>
            <Controller
              name="numberTable"
              control={control}
              render={({ field, fieldState: { error } }) => (
                <TextField
                  sx={{ width: '100%' }}
                  placeholder="Số bàn tiêm"
                  size="small"
                  {...field}
                  onChange={(event) => event.target.value}
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
    </Box>
  );
};

export default AdminLocation;

import React, { useEffect, useMemo, useState } from 'react';
import {
  DataGrid,
  GridColDef,
  gridPageCountSelector,
  gridPageSelector,
  useGridApiContext,
  useGridSelector
} from '@mui/x-data-grid';
import Pagination from '@mui/material/Pagination';
import { Box } from '@mui/material';
import AdminLocationDialog from './AdminLocationDialog';
import { axiosInstance } from '../../requestMethod';
interface DataGridProps {
  search: {
    locationInfo: string;
    addressInfo: string;
  };
}

export interface Row {
  id: number;
  name: string;
  address: string;
  district: string;
  province: string;
  manager: string;
  number_table: number;
  ward_id: number;
  ward: {
    id: number;
    name: string;
    district_id: number;
    district: {
      id: number;
      name: string;
      province_id: number;
      province: {
        id: number;
        name: string;
      };
    };
  };
}

// const _rows: Row[] = [
//   {
//     id: 1,
//     name: 'Bệnh viện Đa khoa Medlatec',
//     address: '42-44 Nghĩa Dũng',
//     leader: 'Nguyễn Thị Kim Liên',
//     numberTable: 1
//   },
//   {
//     id: 2,
//     name: 'Trạm y tế Phường Phúc Xá',
//     address: '84 Nghĩa Dũng',
//     leader: 'Đỗ Thế Bảo',
//     numberTable: 1
//   },
//   {
//     id: 3,
//     name: 'Trạm y tế Phường Trúc Bạch',
//     address: '2 Trúc Bạch',
//     leader: 'Trần Thị Hồng Tuyết',
//     numberTable: 1
//   },
//   {
//     id: 4,
//     name: 'Bệnh viện Đa khoa Hồng Ngọc',
//     address: '55 Yên Ninh',
//     leader: 'Cao Độc Lập',
//     numberTable: 1
//   },
//   {
//     id: 5,
//     name: 'Bệnh viện Quân Y 354',
//     address: '120 Đốc Ngữ',
//     leader: 'Phạm Minh Đức',
//     numberTable: 1
//   },
//   {
//     id: 6,
//     name: 'Trạm y tế Phường Vĩnh Phúc',
//     address: 'Tầng 1 nhà K3, khu 7',
//     leader: 'Nguyễn Tường Phượng',
//     numberTable: 1
//   },
//   {
//     id: 7,
//     name: 'Trạm y tế Phường Cống Vị',
//     address: '518 Đội Cấn',
//     leader: 'Nguyễn Thị Hồng Thúy',
//     numberTable: 1
//   },
//   {
//     id: 8,
//     name: 'Trạm y tế Phường Liễu Giai',
//     address: '3 Quần Ngựa',
//     leader: 'Trần Trúc Hồ',
//     numberTable: 1
//   },
//   {
//     id: 9,
//     name: 'Trạm y tế Phường Nguyễn Trung Trực',
//     address: '6 Hàng Bún',
//     leader: 'Nguyễn Trọng Điệp',
//     numberTable: 1
//   },
//   {
//     id: 10,
//     name: 'Trạm y tế Phường Quán Thánh',
//     address: '50 Hàng Bún',
//     leader: 'Bạch Thị Ngọc Hoan',
//     numberTable: 1
//   },
//   {
//     id: 11,
//     name: 'Trạm y tế Phường Nguyễn Trãi',
//     address: '58 Phố Nhuệ Giang',
//     leader: 'Nguyễn Đức Quý',
//     numberTable: 1
//   },
//   {
//     id: 12,
//     name: 'Trạm y tế Phường Mộ Lao',
//     address: 'LK16B1 LVKCA Tổ 14',
//     leader: 'Ngô Thị Hoàn',
//     numberTable: 1
//   },
//   {
//     id: 13,
//     name: 'Phòng khám tư vấn và điều trị dự phòng',
//     address: 'LK 6D-1 C17 Bộ công Tổ 14',
//     leader: 'Mai Thanh Yên',
//     numberTable: 1
//   },
//   {
//     id: 14,
//     name: 'Trạm y tế Phường Văn Quán',
//     address: '83A_đường 19/05',
//     leader: 'Nguyễn Thị Hòa',
//     numberTable: 1
//   },
//   {
//     id: 15,
//     name: 'Phòng tiêm chủng dịch vụ VNVC Skyline',
//     address: 'tầng 3 tòa nhà Newskyline',
//     leader: 'Lưu Thị Thoa',
//     numberTable: 1
//   },
//   {
//     id: 16,
//     name: 'Trạm y tế Phường Vạn Phúc',
//     address: 'Số 68-phố cầu am',
//     leader: 'Nguyễn Thiện Phương',
//     numberTable: 1
//   },
//   {
//     id: 17,
//     name: 'Trạm y tế Phường Yết Kiêu',
//     address: '2 Tiều Công nghệ',
//     leader: 'Nguyễn T Thanh Nhàn',
//     numberTable: 1
//   },
//   {
//     id: 18,
//     name: 'Phòng tiêm chủng Bệnh viện đa khoa Hà Đông',
//     address: 'Số 2 Nguyễn Viết Xuân',
//     leader: 'Đinh Thị Uyên',
//     numberTable: 1
//   },
//   {
//     id: 19,
//     name: 'Khoa sản Bệnh viện Đa khoa Hà Đông',
//     address: 'Số 2 Bế văn đàn',
//     leader: 'Đào Thị Lan',
//     numberTable: 1
//   },
//   {
//     id: 20,
//     name: 'Trạm y tế Phường Quang Trung',
//     address: 'Số 202 đường Quang Trung',
//     leader: 'Bùi Thị Lan Khanh',
//     numberTable: 1
//   }
// ];

const AdminLocation = ({ search }: DataGridProps) => {
  const [rows, setRows] = useState<Row[]>([]);
  // const [data, setData] = useState([]);
  useEffect(() => {
    const getVaccineSite = async () => {
      try {
        const res = await axiosInstance.get('/vaccination-sites');
        setRows(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getVaccineSite();
  }, []);
  // const rows: Row[] = data;
  const _rows = rows.map((row) => ({
    id: row.id,
    name: row.name,
    address: row.address,
    ward: row.ward.name,
    ward_id: row.ward_id,
    district: row.ward.district.name,
    district_id: row.ward.district_id,
    province: row.ward.district.province.name,
    province_id: row.ward.district.province_id,
    manager: row.manager,
    number_table: row.number_table
  }));
  const [selectedId, setSelectedId] = useState<number | undefined>();

  const handleClick = (rowData: Row) => {
    setSelectedId(rowData.id);
  };

  const selectedRow = useMemo(
    () => rows.find((row) => row.id === selectedId),
    [rows, selectedId]
  );

  const currentRows = useMemo(() => {
    if (search.locationInfo !== '' && search.addressInfo !== '') {
      return _rows
        .filter(
          (row) =>
            row.name === search.locationInfo &&
            row.address === search.addressInfo
        )
        .map((item, index) => ({
          ...item,
          index: index + 1
        }));
    } else if (search.locationInfo !== '') {
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
    } else {
      return rows.map((row, index) => ({
        ...row,
        index: index + 1
      }));
    }
  }, [_rows, rows, search.addressInfo, search.locationInfo]);

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
      field: 'manager',
      headerName: 'Người đứng đầu cơ sở tiêm chủng',
      width: 287.6
    },
    {
      field: 'number_table',
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

  const onSubmit = (data: Row) => {
    setRows(
      rows.map((row) => {
        if (row.id === data.id) {
          return {
            ...data
          };
        }
        return row;
      })
    );
  };

  return (
    <Box
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
      {selectedRow && (
        <AdminLocationDialog
          data={selectedRow}
          onSubmit={onSubmit}
          onClose={() => setSelectedId(undefined)}
        />
      )}
    </Box>
  );
};

export default AdminLocation;

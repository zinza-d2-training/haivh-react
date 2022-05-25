import React, { useMemo, useRef } from 'react';
import {
  DataGrid,
  GridColDef,
  GridValueGetterParams,
  gridPageCountSelector,
  gridPageSelector,
  useGridApiContext,
  useGridSelector,
  GridSortApi
} from '@mui/x-data-grid';
import Pagination from '@mui/material/Pagination';

interface DataGridProps {
  search: {
    districtId: number | string;
    provinceId: number | string;
    wardId: number | string;
  };
  // districtId?: number;
  // provinceId?: number;
  // wardId?: number;
}

interface Row {
  id: number;
  name: string;
  address: string;
  ward: string;
  district: string;
  province: string;
  leader: string;
  numberTable: number;
  wardId: number;
  provinceId: number;
  districtId: number;
}

const rows: Row[] = [
  {
    id: 1,
    name: 'Bệnh viện Đa khoa Medlatec',
    address: '42-44 Nghĩa Dũng',
    ward: 'Phúc Xá',
    district: 'Quận Ba Đình',
    province: 'Thành phố Hà Nội',
    leader: 'Nguyễn Thị Kim Liên',
    numberTable: 1,
    wardId: 1,
    provinceId: 1,
    districtId: 1
  },
  {
    id: 2,
    name: 'Trạm y tế Phường Phúc Xá',
    address: '84 Nghĩa Dũng',
    ward: 'Phúc Xá',
    district: 'Quận Ba Đình',
    province: 'Thành phố Hà Nội',
    leader: 'Đỗ Thế Bảo',
    numberTable: 1,
    wardId: 1,
    provinceId: 1,
    districtId: 1
  },
  {
    id: 3,
    name: 'Trạm y tế Phường Trúc Bạch',
    address: '2 Trúc Bạch',
    ward: 'Trúc Bạch',
    district: 'Quận Ba Đình',
    province: 'Thành phố Hà Nội',
    leader: 'Trần Thị Hồng Tuyết',
    numberTable: 1,
    wardId: 2,
    provinceId: 1,
    districtId: 1
  },
  {
    id: 4,
    name: 'Bệnh viện Đa khoa Hồng Ngọc',
    address: '55 Yên Ninh',
    ward: 'Vĩnh Phúc',
    district: 'Quận Ba Đình',
    province: 'Thành phố Hà Nội',
    leader: 'Cao Độc Lập',
    numberTable: 1,
    wardId: 3,
    provinceId: 1,
    districtId: 1
  },
  {
    id: 5,
    name: 'Bệnh viện Quân Y 354',
    address: '120 Đốc Ngữ',
    ward: 'Vĩnh Phúc',
    district: 'Quận Ba Đình',
    province: 'Thành phố Hà Nội',
    leader: 'Phạm Minh Đức',
    numberTable: 1,
    wardId: 3,
    provinceId: 1,
    districtId: 1
  },
  {
    id: 6,
    name: 'Trạm y tế Phường Vĩnh Phúc',
    address: 'Tầng 1 nhà K3, khu 7',
    ward: 'Vĩnh Phúc',
    district: 'Quận Ba Đình',
    province: 'Thành phố Hà Nội',
    leader: 'Nguyễn Tường Phượng',
    numberTable: 1,
    wardId: 3,
    provinceId: 1,
    districtId: 1
  },
  {
    id: 7,
    name: 'Trạm y tế Phường Cống Vị',
    address: '518 Đội Cấn',
    ward: 'Cống Vị',
    district: 'Quận Ba Đình',
    province: 'Thành phố Hà Nội',
    leader: 'Nguyễn Thị Hồng Thúy',
    numberTable: 1,
    wardId: 4,
    provinceId: 1,
    districtId: 1
  },
  {
    id: 100,
    name: 'Trạm y tế Phường Liễu Giai',
    address: '3 Quần Ngựa',
    ward: 'Liễu Giai',
    district: 'Quận Ba Đình',
    province: 'Thành phố Hà Nội',
    leader: 'Trần Trúc Hồ',
    numberTable: 1,
    wardId: 5,
    provinceId: 1,
    districtId: 1
  },
  {
    id: 9,
    name: 'Trạm y tế Phường Nguyễn Trung Trực',
    address: '6 Hàng Bún',
    ward: 'Nguyễn Trung Trực',
    district: 'Quận Ba Đình',
    province: 'Thành phố Hà Nội',
    leader: 'Nguyễn Trọng Điệp',
    numberTable: 1,
    wardId: 6,
    provinceId: 1,
    districtId: 1
  },
  {
    id: 10,
    name: 'Trạm y tế Phường Quán Thánh',
    address: '50 Hàng Bún',
    ward: 'Quán Thánh',
    district: 'Quận Ba Đình',
    province: 'Thành phố Hà Nội',
    leader: 'Bạch Thị Ngọc Hoan',
    numberTable: 1,
    wardId: 7,
    provinceId: 1,
    districtId: 1
  },
  {
    id: 11,
    name: 'Trạm y tế Phường Nguyễn Trãi',
    address: '58 Phố Nhuệ Giang',
    ward: 'Nguyễn Trãi',
    district: 'Quận Hà Đông',
    province: 'Thành phố Hà Nội',
    leader: 'Nguyễn Đức Quý',
    numberTable: 1,
    wardId: 1,
    provinceId: 1,
    districtId: 2
  },
  {
    id: 12,
    name: 'Trạm y tế Phường Mộ Lao',
    address: 'LK16B1 LVKCA Tổ 14',
    ward: 'Mộ Lao',
    district: 'Quận Hà Đông',
    province: 'Thành phố Hà Nội',
    leader: 'Ngô Thị Hoàn',
    numberTable: 1,
    wardId: 2,
    provinceId: 1,
    districtId: 2
  },
  {
    id: 13,
    name: 'Phòng khám tư vấn và điều trị dự phòng',
    address: 'LK 6D-1 C17 Bộ công Tổ 14',
    ward: 'Mộ Lao',
    district: 'Quận Hà Đông',
    province: 'Thành phố Hà Nội',
    leader: 'Mai Thanh Yên',
    numberTable: 1,
    wardId: 2,
    provinceId: 1,
    districtId: 2
  },
  {
    id: 14,
    name: 'Trạm y tế Phường Văn Quán',
    address: '83A_đường 19/05',
    ward: 'Văn Quán',
    district: 'Quận Hà Đông',
    province: 'Thành phố Hà Nội',
    leader: 'Nguyễn Thị Hòa',
    numberTable: 1,
    wardId: 3,
    provinceId: 1,
    districtId: 2
  },
  {
    id: 15,
    name: 'Phòng tiêm chủng dịch vụ VNVC Skyline',
    address: 'tầng 3 tòa nhà Newskyline',
    ward: 'Văn Quán',
    district: 'Quận Hà Đông',
    province: 'Thành phố Hà Nội',
    leader: 'Lưu Thị Thoa',
    numberTable: 1,
    wardId: 3,
    provinceId: 1,
    districtId: 2
  },
  {
    id: 16,
    name: 'Trạm y tế Phường Vạn Phúc',
    address: 'Số 68-phố cầu am',
    ward: 'Vạn Phúc',
    district: 'Quận Hà Đông',
    province: 'Thành phố Hà Nội',
    leader: 'Nguyễn Thiện Phương',
    numberTable: 1,
    wardId: 4,
    provinceId: 1,
    districtId: 2
  },
  {
    id: 17,
    name: 'Trạm y tế Phường Yết Kiêu',
    address: '2 Tiều Công nghệ',
    ward: 'Yết Kiêu',
    district: 'Quận Hà Đông',
    province: 'Thành phố Hà Nội',
    leader: 'Nguyễn T Thanh Nhàn',
    numberTable: 1,
    wardId: 5,
    provinceId: 1,
    districtId: 2
  },
  {
    id: 18,
    name: 'Phòng tiêm chủng Bệnh viện đa khoa Hà Đông',
    address: 'Số 2 Nguyễn Viết Xuân',
    ward: 'Quang Trung',
    district: 'Quận Hà Đông',
    province: 'Thành phố Hà Nội',
    leader: 'Đinh Thị Uyên',
    numberTable: 1,
    wardId: 6,
    provinceId: 1,
    districtId: 2
  },
  {
    id: 19,
    name: 'Khoa sản Bệnh viện Đa khoa Hà Đông',
    address: 'Số 2 Bế văn đàn',
    ward: 'Quang Trung',
    district: 'Quận Hà Đông',
    province: 'Thành phố Hà Nội',
    leader: 'Đào Thị Lan',
    numberTable: 1,
    wardId: 6,
    provinceId: 1,
    districtId: 2
  },
  {
    id: 20,
    name: 'Trạm y tế Phường Quang Trung',
    address: 'Số 202 đường Quang Trung',
    ward: 'Quang Trung',
    district: 'Quận Hà Đông',
    province: 'Thành phố Hà Nội',
    leader: 'Bùi Thị Lan Khanh',
    numberTable: 1,
    wardId: 6,
    provinceId: 1,
    districtId: 2
  }
];

const DataGird = ({ search }: DataGridProps) => {
  const columns: GridColDef[] = [
    {
      field: 'index',
      headerName: 'STT',
      width: 200,
      headerAlign: 'center',
      align: 'center'
    },
    {
      field: 'name',
      headerName: 'Tên điểm tiêm',
      width: 224,
      headerAlign: 'center',
      align: 'center'
    },
    {
      field: 'address',
      headerName: 'Số nhà, tên đường',
      width: 224,
      headerAlign: 'center',
      align: 'center'
    },
    {
      field: 'ward',
      headerName: 'Xã/Phường',
      width: 224,
      headerAlign: 'center',
      align: 'center'
    },
    {
      field: 'district',
      headerName: 'Quận/Huyện',
      width: 224,
      headerAlign: 'center',
      align: 'center'
    },
    {
      field: 'province',
      headerName: 'Tỉnh/Thành phố',
      width: 224,
      headerAlign: 'center',
      align: 'center'
    },
    {
      field: 'leader',
      headerName: 'Người đứng đầu cơ sở tiêm chủng',
      width: 248,
      headerAlign: 'center',
      align: 'center'
    },
    {
      field: 'numberTable',
      headerName: 'Số bàn tiêm',
      width: 224,
      headerAlign: 'center',
      align: 'center'
    }
  ];

  const currentRows = useMemo<Row[]>(() => {
    return rows
      .filter((row) => {
        if (search.provinceId > 0) {
          return row.provinceId === search.provinceId;
        }
        return true;
      })
      .filter((row) => {
        if (search.districtId) {
          return row.districtId === search.districtId;
        }
        return true;
      })
      .filter((row) => {
        if (search.wardId) {
          return row.wardId === search.wardId;
        }
        return true;
      })
      .map((item, index) => ({
        ...item,
        index: index + 1
      }));
  }, [search.provinceId, search.districtId, search.wardId]);

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

  return (
    <div
      style={{
        height: 700,
        width: '100%'
      }}>
      <DataGrid
        rows={currentRows}
        columns={columns}
        pagination
        pageSize={10}
        rowsPerPageOptions={[5]}
        components={{
          Pagination: CustomPagination
        }}
      />
    </div>
  );
};

export default DataGird;

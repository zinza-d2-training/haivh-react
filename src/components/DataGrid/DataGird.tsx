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
import { axiosInstance } from '../../requestMethod';

interface DataGridProps {
  search: {
    districtId: number | string;
    provinceId: number | string;
    wardId: number | string;
  };
}

interface Row {
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

const DataGird = ({ search }: DataGridProps) => {
  const [data, setData] = useState([]);
  useEffect(() => {
    const getVaccineSite = async () => {
      try {
        const res = await axiosInstance.get('/vaccination-sites');
        setData(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getVaccineSite();
  }, []);
  const rows: Row[] = data;
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
  const columns: GridColDef[] = [
    {
      field: 'index',
      headerName: 'STT',
      width: 181.75,
      headerAlign: 'center',
      align: 'center'
    },
    {
      field: 'name',
      headerName: 'Tên điểm tiêm',
      width: 181.75,
      headerAlign: 'center',
      align: 'center'
    },
    {
      field: 'address',
      headerName: 'Số nhà, tên đường',
      width: 181.75,
      headerAlign: 'center',
      align: 'center'
    },
    {
      field: 'ward',
      headerName: 'Xã/Phường',
      width: 181.75,
      headerAlign: 'center',
      align: 'center'
    },
    {
      field: 'district',
      headerName: 'Quận/Huyện',
      width: 181.75,
      headerAlign: 'center',
      align: 'center'
    },
    {
      field: 'province',
      headerName: 'Tỉnh/Thành phố',
      width: 181.75,
      headerAlign: 'center',
      align: 'center'
    },
    {
      field: 'manager',
      headerName: 'Người đứng đầu cơ sở tiêm chủng',
      width: 181.75,
      headerAlign: 'center',
      align: 'center'
    },
    {
      field: 'number_table',
      headerName: 'Số bàn tiêm',
      width: 181.75,
      headerAlign: 'center',
      align: 'center'
    }
  ];

  const currentRows = useMemo(() => {
    return _rows
      .filter((row) => {
        if (search.provinceId > 0) {
          return row.province_id === search.provinceId;
        }
        return true;
      })
      .filter((row) => {
        if (search.districtId) {
          return row.district_id === search.districtId;
        }
        return true;
      })
      .filter((row) => {
        if (search.wardId) {
          return row.ward_id === search.wardId;
        }
        return true;
      })
      .map((item, index) => ({
        ...item,
        index: index + 1
      }));
  }, [_rows, search.districtId, search.provinceId, search.wardId]);

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

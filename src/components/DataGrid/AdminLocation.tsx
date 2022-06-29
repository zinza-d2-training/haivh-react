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
import AdminLocationDialog, { _Row } from './AdminLocationDialog';
import { axiosInstance } from '../../requestMethod';
import { useAppDispatch } from '../../app/hooks';
import { updateSiteAsync } from '../../features/vaccine/sitesSlice';
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

const AdminLocation = ({ search }: DataGridProps) => {
  const dispatch = useAppDispatch();
  const [rows, setRows] = useState<Row[]>([]);
  const [_rows, _setRows] = useState<_Row[]>([]);

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
  }, [_rows]);

  useMemo(
    () =>
      _setRows(
        rows.map((row) => ({
          id: row.id,
          name: row.name,
          address: row.address,
          ward_id: row.ward_id,
          manager: row.manager,
          number_table: row.number_table
        }))
      ),
    [rows]
  );

  const [selectedId, setSelectedId] = useState<number | undefined>();

  const handleClick = (rowData: Row) => {
    setSelectedId(rowData.id);
  };

  const selectedRow = useMemo(
    () => _rows.find((row) => row.id === selectedId),
    [_rows, selectedId]
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
      return _rows
        .filter((row) => row.name === search.locationInfo)
        .map((item, index) => ({
          ...item,
          index: index + 1
        }));
    } else if (search.addressInfo !== '') {
      return _rows
        .filter((row) => row.address === search.addressInfo)
        .map((item, index) => ({
          ...item,
          index: index + 1
        }));
    } else {
      return _rows.map((row, index) => ({
        ...row,
        index: index + 1
      }));
    }
  }, [_rows, search.addressInfo, search.locationInfo]);

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

  const onSubmit = (data: _Row) => {
    dispatch(updateSiteAsync(data));
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

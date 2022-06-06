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
  TextField,
  Typography
} from '@mui/material';
import { Clear } from '@mui/icons-material';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import AdminRegistrationDialog from './AdminRegistrationDialog';

interface DataGridProps {
  search: {
    name: string;
    insurance: string;
  };
}

export interface Row {
  id: number;
  name: string;
  groupPerson: string;
  insurance: string;
  address: string;
  job: string;
  jobLocation: string;
  date: string;
  session: string;
}

const _rows: Row[] = [
  {
    id: 1,
    name: 'Nguyễn Văn B',
    groupPerson: 'Người làm việc trong các cơ sở y tế, ngành y tế',
    address: 'Số 7 Thiền Quang',
    insurance: '123456789',
    job: 'Bác sĩ',
    jobLocation: 'Bện viện Bạch Mai',
    date: new Date('06/06/2022').toLocaleDateString('en-US'),
    session: 'Buổi sáng'
  },
  {
    id: 2,
    name: 'Nguyễn Văn A',
    groupPerson: 'Người làm việc trong các cơ sở y tế, ngành y tế',
    address: 'Số 7 Thiền Quang',
    insurance: '123456789',
    job: 'Bác sĩ',
    jobLocation: 'Bện viện Bạch Mai',
    date: new Date('06/06/2022').toLocaleDateString('en-US'),
    session: 'Buổi sáng'
  },
  {
    id: 3,
    name: 'Phạm Thị C',
    groupPerson: 'Người làm việc trong các cơ sở y tế, ngành y tế',
    address: 'Số 7 Thiền Quang',
    insurance: '123456789',
    job: 'Bác sĩ',
    jobLocation: 'Bện viện Bạch Mai',
    date: new Date('06/06/2022').toLocaleDateString('en-US'),
    session: 'Buổi sáng'
  },
  {
    id: 4,
    name: 'Nguyễn Văn D',
    groupPerson: 'Người làm việc trong các cơ sở y tế, ngành y tế',
    address: 'Số 7 Thiền Quang',
    insurance: '123456789',
    job: 'Bác sĩ',
    jobLocation: 'Bện viện Bạch Mai',
    date: new Date('06/06/2022').toLocaleDateString('en-US'),
    session: 'Buổi sáng'
  },
  {
    id: 5,
    name: 'Nguyễn Văn E',
    groupPerson: 'Người làm việc trong các cơ sở y tế, ngành y tế',
    address: 'Số 7 Thiền Quang',
    insurance: '123456789',
    job: 'Bác sĩ',
    jobLocation: 'Bện viện Bạch Mai',
    date: new Date('06/06/2022').toLocaleDateString('en-US'),
    session: 'Buổi sáng'
  },
  {
    id: 6,
    name: 'Phạm Thị T',
    groupPerson: 'Người làm việc trong các cơ sở y tế, ngành y tế',
    address: 'Số 7 Thiền Quang',
    insurance: '123456789',
    job: 'Bác sĩ',
    jobLocation: 'Bện viện Bạch Mai',
    date: new Date('06/06/2022').toLocaleDateString('en-US'),
    session: 'Buổi sáng'
  },
  {
    id: 7,
    name: 'Nguyễn Văn F',
    groupPerson: 'Người làm việc trong các cơ sở y tế, ngành y tế',
    address: 'Số 7 Thiền Quang',
    insurance: '123456789',
    job: 'Bác sĩ',
    jobLocation: 'Bện viện Bạch Mai',
    date: new Date('06/06/2022').toLocaleDateString('en-US'),
    session: 'Buổi sáng'
  },
  {
    id: 8,
    name: 'Phạm Thị Q',
    groupPerson: 'Người làm việc trong các cơ sở y tế, ngành y tế',
    address: 'Số 7 Thiền Quang',
    insurance: '123456789',
    job: 'Bác sĩ',
    jobLocation: 'Bện viện Bạch Mai',
    date: new Date('06/06/2022').toLocaleDateString('en-US'),
    session: 'Buổi sáng'
  },
  {
    id: 9,
    name: 'Nguyễn Văn K',
    groupPerson: 'Người làm việc trong các cơ sở y tế, ngành y tế',
    address: 'Số 7 Thiền Quang',
    insurance: '123456789',
    job: 'Bác sĩ',
    jobLocation: 'Bện viện Bạch Mai',
    date: new Date('06/06/2022').toLocaleDateString('en-US'),
    session: 'Buổi sáng'
  },
  {
    id: 10,
    name: 'Phạm Thị Y',
    groupPerson: 'Người làm việc trong các cơ sở y tế, ngành y tế',
    address: 'Số 7 Thiền Quang',
    insurance: '123456789',
    job: 'Bác sĩ',
    jobLocation: 'Bện viện Bạch Mai',
    date: new Date('06/06/2022').toLocaleDateString('en-US'),
    session: 'Buổi sáng'
  }
];

export const AdminRegistration = ({ search }: DataGridProps) => {
  const [rows, setRows] = useState(_rows);
  const [selectedId, setSelectedId] = useState<number | undefined>();

  const selectedRow = useMemo(
    () => rows.find((row) => row.id === selectedId),
    [selectedId, rows]
  );

  const currentRows = useMemo(() => {
    if (search.name !== '' && search.insurance !== '') {
      return rows
        .filter(
          (row) =>
            row.name.indexOf(search.name) > -1 &&
            row.insurance === search.insurance
        )
        .map((item, index) => ({
          ...item,
          index: index + 1
        }));
    } else if (search.name !== '') {
      return rows
        .filter((row) => row.name.indexOf(search.name) > -1)
        .map((item, index) => ({
          ...item,
          index: index + 1
        }));
    } else if (search.insurance !== '') {
      return rows
        .filter((row) => row.insurance === search.insurance)
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
  }, [search.name, search.insurance, rows]);

  const columns: GridColDef[] = [
    {
      field: 'index',
      headerName: 'STT',
      width: 153,
      headerAlign: 'center',
      align: 'center'
    },
    {
      field: 'name',
      headerName: 'Họ và tên',
      width: 153
    },
    {
      field: 'groupPerson',
      headerName: 'Nhóm',
      width: 153
    },
    {
      field: 'insurance',
      headerName: 'Số thẻ BHYT',
      width: 153
    },
    {
      field: 'address',
      headerName: 'Địa chỉ',
      width: 153,
      headerAlign: 'center',
      align: 'center'
    },
    {
      field: 'job',
      headerName: 'Nghề nghiệp',
      width: 153,
      headerAlign: 'center',
      align: 'center'
    },
    {
      field: 'jobLocation',
      headerName: 'Đơn vị công tác',
      width: 153,
      headerAlign: 'center',
      align: 'center'
    },
    {
      field: 'date',
      headerName: 'Ngày tiêm',
      width: 153,
      headerAlign: 'center',
      align: 'center'
    },
    {
      field: 'session',
      headerName: 'Buổi tiêm',
      width: 153,
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

  const handleClick = (rowData: Row) => {
    setSelectedId(rowData.id);
  };

  const onSubmit = (data: Row) => {
    setRows(rows.map((row) => (row.id === data.id ? { ...data } : row)));
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
        <AdminRegistrationDialog
          data={selectedRow}
          onSubmit={onSubmit}
          onClose={() => setSelectedId(undefined)}
        />
      )}
    </Box>
  );
};

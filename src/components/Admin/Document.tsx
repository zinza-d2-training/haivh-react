import React, { useEffect, useMemo, useState } from 'react';
import {
  DataGrid,
  GridColDef,
  gridPageCountSelector,
  gridPageSelector,
  useGridApiContext,
  useGridSelector
} from '@mui/x-data-grid';
import { Box, Link, Pagination } from '@mui/material';
import { FileDownload } from '@mui/icons-material';
import AdminDocumentDialog from '../DataGrid/AdminDocumentDialog';
import { axiosInstance } from '../../requestMethod';
import { updateDocumentAsync } from '../../features/document/documentSlice';
import { useAppDispatch } from '../../app/hooks';

export interface Row {
  id: number;
  description: string;
  link: string;
}

const Document = () => {
  const dispatch = useAppDispatch();
  const [rows, setRows] = useState<Row[]>([]);
  useEffect(() => {
    const getData = async () => {
      try {
        const res = await axiosInstance.get<Row[]>('/documents');
        setRows(res.data);
      } catch (err) {}
    };
    getData();
  }, [rows]);

  const [selectedId, setSelectedId] = useState<number | undefined>();

  const handleClick = (param: any) => {
    if (param.field !== 'link') {
      setSelectedId(param.row.id);
    }
  };

  const currentRow = rows.map((row, index) => ({
    ...row,
    index: index + 1
  }));

  const selectedRow = useMemo(
    () => rows.find((row) => row.id === selectedId),
    [rows, selectedId]
  );

  const onSubmit = (data: Row) => {
    dispatch(updateDocumentAsync(data));
  };

  const columns: GridColDef[] = [
    {
      field: 'index',
      headerName: 'STT',
      width: 100,
      headerAlign: 'center',
      align: 'center'
    },
    {
      field: 'description',
      headerName: 'Tên tài liệu',
      width: 1200
    },
    {
      field: 'link',
      headerName: 'Thao tác',
      width: 138,
      headerAlign: 'center',
      align: 'center',
      renderCell: (params: any) => {
        return (
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center'
            }}>
            <FileDownload />
            <Link
              href={`http://localhost:5000/api/documents/download/${params.formattedValue}`}
              sx={{
                textDecoration: 'none',
                color: 'red',
                ml: 2,
                '&:hover': {
                  color: '#5faee3'
                }
              }}>
              Tải về
            </Link>
          </Box>
        );
      }
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

  return (
    <Box
      style={{
        height: 700,
        width: '100%',
        marginTop: '18px'
      }}>
      <DataGrid
        rows={currentRow}
        onCellClick={(param) => handleClick(param)}
        columns={columns}
        pagination
        pageSize={10}
        rowsPerPageOptions={[5]}
        components={{
          Pagination: CustomPagination
        }}
      />
      {selectedRow && (
        <AdminDocumentDialog
          data={selectedRow}
          onSubmit={onSubmit}
          onClose={() => setSelectedId(undefined)}
        />
      )}
    </Box>
  );
};

export default Document;

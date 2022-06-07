import React, { useMemo, useState } from 'react';
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

export interface Row {
  id: number;
  name: string;
  link: string;
}

const _rows: Row[] = [
  {
    id: 1,
    name: 'Giới thiệu nền tảng quản lý tiêm chủng vắc xin phòng Covid - 19',
    link: 'https://tiemchungcovid19.gov.vn/assets/portal/document/Gi%E1%BB%9Bi_thi%E1%BB%87u_n%E1%BB%81n_t%E1%BA%A3ng_qu%E1%BA%A3n_l%C3%BD_ti%C3%AAm_ch%E1%BB%A7ng_v%E1%BA%AFc_xin_ph%C3%B2ng_Covid_-_19.pdf'
  },
  {
    id: 2,
    name: 'HD Chuẩn hóa dữ liệu và import danh sách đối tượng tiêm chủng Covid - 19, danh sách nhập hồi cứu',
    link: 'https://tiemchungcovid19.gov.vn/assets/portal/document/HD_Chu%E1%BA%A9n_h%C3%B3a_d%E1%BB%AF_li%E1%BB%87u_v%C3%A0_import_danh_s%C3%A1ch_%C4%91%E1%BB%91i_t%C6%B0%E1%BB%A3ng_ti%C3%AAm_ch%E1%BB%A7ng_Covid_-_19,_danh_s%C3%A1ch_nh%E1%BA%ADp_h%E1%BB%93i_c%E1%BB%A9u.pdf'
  },
  {
    id: 3,
    name: 'HD cài đặt và sử dụng ứng dụng SSKĐT dành cho người dân0',
    link: 'https://tiemchungcovid19.gov.vn/assets/portal/document/HD_c%C3%A0i_%C4%91%E1%BA%B7t_v%C3%A0_s%E1%BB%AD_d%E1%BB%A5ng_%E1%BB%A9ng_d%E1%BB%A5ng_SSK%C4%90T_d%C3%A0nh_cho_ng%C6%B0%E1%BB%9Di_d%C3%A2n.pdf'
  },
  {
    id: 4,
    name: 'HD nhanh trong quy trình tiêm chủng Covid - 19',
    link: 'https://tiemchungcovid19.gov.vn/assets/portal/document/HD_c%C3%A0i_%C4%91%E1%BA%B7t_v%C3%A0_s%E1%BB%AD_d%E1%BB%A5ng_%E1%BB%A9ng_d%E1%BB%A5ng_SSK%C4%90T_d%C3%A0nh_cho_ng%C6%B0%E1%BB%9Di_d%C3%A2n.pdf'
  },
  {
    id: 5,
    name: 'HD phê duyệt và phân bổ yêu cầu đăng ký tiêm chủng vắc xin phòng Covid - 19',
    link: 'https://tiemchungcovid19.gov.vn/assets/portal/document/HD_ph%C3%AA_duy%E1%BB%87t_v%C3%A0_ph%C3%A2n_b%E1%BB%95_y%C3%AAu_c%E1%BA%A7u_%C4%91%C4%83ng_k%C3%BD_ti%C3%AAm_ch%E1%BB%A7ng_v%E1%BA%AFc_xin_ph%C3%B2ng_Covid_-_19.pdf'
  },
  {
    id: 6,
    name: 'HD đăng ký cơ sở tiêm chủng Covid - 19',
    link: 'https://tiemchungcovid19.gov.vn/assets/portal/document/HD_%C4%91%C4%83ng_k%C3%BD_c%C6%A1_s%E1%BB%9F_ti%C3%AAm_ch%E1%BB%A7ng_Covid_-_19.pdf'
  },
  {
    id: 7,
    name: 'HD đăng ký tiêm chủng Covid - 19 dành cho cơ quan, tổ chức',
    link: 'https://tiemchungcovid19.gov.vn/assets/portal/document/HD_%C4%91%C4%83ng_k%C3%BD_ti%C3%AAm_ch%E1%BB%A7ng_Covid_-_19_d%C3%A0nh_cho_c%C6%A1_quan,_t%E1%BB%95_ch%E1%BB%A9c.pdf'
  },
  {
    id: 8,
    name: 'HD đăng ký tiêm chủng Covid - 19 dành cho người dân',
    link: 'https://tiemchungcovid19.gov.vn/assets/portal/document/HD_%C4%91%C4%83ng_k%C3%BD_ti%C3%AAm_ch%E1%BB%A7ng_Covid_-_19_d%C3%A0nh_cho_ng%C6%B0%E1%BB%9Di_d%C3%A2n.pdf'
  },
  {
    id: 9,
    name: 'HDSD ứng dụng SSKĐT trong quá trình tiêm chủng Covid - 19',
    link: 'https://tiemchungcovid19.gov.vn/assets/portal/document/HDSD_%E1%BB%A9ng_d%E1%BB%A5ng_SSK%C4%90T_trong_qu%C3%A1_tr%C3%ACnh_ti%C3%AAm_ch%E1%BB%A7ng_Covid_-_19.pdf'
  },
  {
    id: 10,
    name: 'Quy trình ứng dụng nền tảng quản lý điều hành tiêm chủng Covid - 19',
    link: 'https://tiemchungcovid19.gov.vn/assets/portal/document/Quy_tr%C3%ACnh_%E1%BB%A9ng_d%E1%BB%A5ng_n%E1%BB%81n_t%E1%BA%A3ng_qu%E1%BA%A3n_l%C3%BD_%C4%91i%E1%BB%81u_h%C3%A0nh_ti%C3%AAm_ch%E1%BB%A7ng_Covid_-_19.pdf'
  }
];

const Document = () => {
  const [selectedId, setSelectedId] = useState<number | undefined>();

  const handleClick = (param: any) => {
    if (param.field !== 'link') {
      setSelectedId(param.row.id);
    }
  };

  const [rows, setRows] = useState(_rows);

  const currentRow = rows.map((row, index) => ({
    ...row,
    index: index + 1
  }));

  const selectedRow = useMemo(
    () => rows.find((row) => row.id === selectedId),
    [rows, selectedId]
  );

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

  const columns: GridColDef[] = [
    {
      field: 'index',
      headerName: 'STT',
      width: 100,
      headerAlign: 'center',
      align: 'center'
    },
    {
      field: 'name',
      headerName: 'Tên điểm tiêm',
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
              href={params.formattedValue}
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

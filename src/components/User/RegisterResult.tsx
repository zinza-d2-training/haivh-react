import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box
} from '@mui/material';
import { indigo } from '@mui/material/colors';

function createData(
  id: number,
  name: string,
  dob: string,
  gender: string,
  identity_card: string,
  status: string
) {
  return { id, name, dob, gender, identity_card, status };
}

const rows = [
  createData(
    1,
    'Nguyễn Văn A',
    '6/10/1994',
    'Nam',
    '030012345678',
    'Đăng ký thành công'
  )
];

const RegisterResult = () => {
  return (
    <TableContainer
      component={Paper}
      sx={{
        mt: 2
      }}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead sx={{ backgroundColor: 'rgba(238, 238, 238, 0.4)' }}>
          <TableRow>
            <TableCell align="center">STT</TableCell>
            <TableCell align="center">Họ và tên</TableCell>
            <TableCell align="center">Ngày sinh</TableCell>
            <TableCell align="center">Giới tính</TableCell>
            <TableCell align="center">
              Số CMND/CCCD/Mã định danh công dân
            </TableCell>
            <TableCell align="center">Trạng thái</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, index) => (
            <TableRow
              key={row.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
              <TableCell align="center">{(index += 1)}</TableCell>
              <TableCell align="center">{row.name}</TableCell>
              <TableCell align="center">{row.dob}</TableCell>
              <TableCell align="center">{row.gender}</TableCell>
              <TableCell align="center">{row.identity_card}</TableCell>
              <TableCell align="center">
                <Box
                  sx={{
                    backgroundColor: indigo[50],
                    border: '1px solid',
                    borderColor: indigo[500],
                    borderRadius: '9999px',
                    pt: 0.25,
                    pb: 0.25
                  }}>
                  {row.status}
                </Box>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default RegisterResult;

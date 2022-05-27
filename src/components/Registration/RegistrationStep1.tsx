import React from 'react';
import CheckoutStep from './CheckoutStep';
import Heading from './Heading';
import styled from '@emotion/styled';
import { DatePicker, LocalizationProvider } from '@mui/lab';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import {
  Box,
  FormControl,
  MenuItem,
  Select,
  Typography,
  TextField,
  List,
  ListItem,
  ListItemText,
  Button
} from '@mui/material';
import { ArrowBack, ArrowForward } from '@mui/icons-material';

const BoxContainer = styled(Box)`
  padding: 0 36px;
`;
const BoxContent = styled(Box)``;

const BoxSelect = styled(Box)`
  display: flex;
  margin-bottom: 16px;
`;

const BoxItem = styled(Box)`
  margin-right: 16px;
`;

const LabelText = styled(Typography)`
  margin-bottom: 5px;
  font-size: 16px;
  font-weight: 400;
  line-height: 24px;
`;

const NoticeBox = styled(Box)`
  color: red;
  margin-bottom: 24px;
`;

const ButtonBox = styled(Box)`
  display: flex;
  justify-content: center;
  margin-bottom: 50px;
`;
const RegistrationStep1 = () => {
  const [value, setValue] = React.useState<Date | null>(null);
  return (
    <>
      <Heading />
      <BoxContainer>
        <CheckoutStep activeStep={0} />

        <BoxContent>
          <Typography
            sx={{
              mb: 2
            }}>
            1. Thông tin người đăng ký tiêm
          </Typography>
          <BoxSelect>
            <BoxItem>
              <LabelText>Nhóm ưu tiên (*)</LabelText>
              <FormControl>
                <Select
                  sx={{
                    width: '330px'
                  }}
                  size="small"
                  labelId="demo-simple-select-label"
                  id="demo-simple-select">
                  <MenuItem value={10}>Ten</MenuItem>
                  <MenuItem value={20}>Twenty</MenuItem>
                  <MenuItem value={30}>Thirty</MenuItem>
                </Select>
              </FormControl>
            </BoxItem>

            <BoxItem>
              <LabelText>Số thẻ BHYT</LabelText>
              <TextField
                label="Số thẻ BHYT"
                size="small"
                sx={{ width: '330px' }}
              />
            </BoxItem>
          </BoxSelect>
          <BoxSelect>
            <BoxItem>
              <LabelText>Nghề nghiệp</LabelText>
              <TextField
                label="Nghề nghiệp"
                size="small"
                sx={{ width: '330px' }}
              />
            </BoxItem>

            <BoxItem>
              <LabelText>Đơn vị công tác</LabelText>
              <TextField
                label="Đơn vị công tác"
                size="small"
                sx={{ width: '330px' }}
              />
            </BoxItem>

            <BoxItem>
              <LabelText>Địa chỉ hiện tại</LabelText>
              <TextField
                label="Địa chỉ hiện tại"
                size="small"
                sx={{ width: '330px' }}
              />
            </BoxItem>
          </BoxSelect>
        </BoxContent>

        <BoxContent>
          <Typography
            sx={{
              mb: 2
            }}>
            2. Thông tin tiêm chủng
          </Typography>
          <BoxSelect>
            <BoxItem>
              <LabelText>Ngày muốn được tiêm (dự kiến)</LabelText>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                  label="Basic example"
                  value={value}
                  onChange={(newValue) => {
                    setValue(newValue);
                  }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      size="small"
                      sx={{ width: '330px' }}
                    />
                  )}
                />
              </LocalizationProvider>
            </BoxItem>
            <BoxItem>
              <LabelText>Buổi tiêm mong muốn</LabelText>
              <FormControl>
                <Select
                  sx={{
                    width: '330px'
                  }}
                  size="small"
                  labelId="demo-simple-select-label"
                  id="demo-simple-select">
                  <MenuItem value={10}>Ten</MenuItem>
                  <MenuItem value={20}>Twenty</MenuItem>
                  <MenuItem value={30}>Thirty</MenuItem>
                </Select>
              </FormControl>
            </BoxItem>
          </BoxSelect>
        </BoxContent>

        <NoticeBox>
          <Typography
            sx={{
              fontSize: '16px',
              fontWeight: '700',
              lineHeight: '24px'
            }}>
            Lưu ý:
          </Typography>
          <List>
            <ListItem disablePadding>
              <ListItemText primary="Việc đăng ký thông tin hoàn toàn bảo mật và phục vụ cho chiến dịch tiêm chủng Vắc xin COVID - 19" />
            </ListItem>
            <ListItem disablePadding>
              <ListItemText primary="Xin vui lòng kiểm tra kỹ các thông tin bắt buộc(VD: Họ và tên, Ngày tháng năm sinh, Số điện thoại, Số CMND/CCCD/Mã định danh công dân/HC ...)" />
            </ListItem>
            <ListItem disablePadding>
              <ListItemText primary='Bằng việc nhấn nút Xác nhận", bạn hoàn toàn hiểu và đồng ý chịu trách nhiệm với các thông tin đã cung cấp.' />
            </ListItem>
            <ListItem disablePadding>
              <ListItemText primary="Cá nhân/Tổ chức đăng ký thành công trên hệ thống sẽ được đưa vào danh sách đặt tiêm. Cơ sở y tế sẽ thông báo lịch tiêm khi có vắc xin và kế hoạch tiêm được phê duyệt. Trân trọng cảm ơn" />
            </ListItem>
          </List>
        </NoticeBox>

        <ButtonBox>
          <Button
            variant="outlined"
            startIcon={<ArrowBack />}
            sx={{
              mr: 2
            }}>
            Hủy bỏ
          </Button>
          <Button variant="contained" endIcon={<ArrowForward />}>
            Tiếp tục
          </Button>
        </ButtonBox>
      </BoxContainer>
    </>
  );
};

export default RegistrationStep1;

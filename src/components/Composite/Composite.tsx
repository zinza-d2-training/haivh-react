import React from 'react';
import { styled } from '@mui/material/styles';
import { Container, Typography } from '@mui/material';
import Box from '@mui/material/Box';

import People from '../../img/People.png';
import Shield from '../../img/Shield.png';
import Injection from '../../img/Injection.png';
import './Composite.css';

const Text1 = styled(Typography)`
  font-size: 16px;
  font-weight: 700;
  line-height: 19px;
  margin-bottom: 8px;
  color: #000000;
`;

const Text2 = styled(Typography)`
  font-size: 28px;
  font-weight: 500;
  line-height: 33px;
  color: #000000;
`;
const Text3 = styled(Typography)`
  font-size: 13px;
  font-weight: 500;
  font-style: italic;
  display: inline-block;
`;

const BorderRight = styled(Box)`
  border-right: 1px solid #ccc;
  width: 33.33%;
  height: 100px;
  background-color: #fff;
  display: flex;
  align-items: center;
`;
const Composite = () => {
  return (
    <div className="composite">
      <Container maxWidth="xl">
        <div className="composite-container">
          <BorderRight>
            <img src={People} alt="" className="composite-item__logo" />
            <span>
              <Text1>Đối tượng đăng ký tiêm</Text1>
              <Text2>
                11,203,873 <Text3>(lượt)</Text3>{' '}
              </Text2>
            </span>
          </BorderRight>
          <BorderRight>
            <img src={Injection} alt="" className="composite-item__logo" />
            <span>
              <Text1>Số mũi tiêm hôm qua</Text1>
              <Text2>
                1,762,119 <Text3>(mũi)</Text3>{' '}
              </Text2>
            </span>
          </BorderRight>
          <div className="composite-item">
            <img src={Shield} alt="" className="composite-item__logo" />
            <span>
              <Text1>Số mũi đã tiêm toàn quốc</Text1>
              <Text2>
                69,523,654 <Text3>(mũi)</Text3>{' '}
              </Text2>
            </span>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Composite;

import React from 'react';
import './Header.css';
import Logo from '../../img/Logo.png';
import { Button, Typography } from '@mui/material';
import { KeyboardArrowDown } from '@mui/icons-material';
import { indigo } from '@mui/material/colors';

const Header = () => {
  return (
    <div className="header-container">
      <div className="header-brand">
        <img src={Logo} alt="" className="header-brand__logo" />
        <Typography
          variant="h6"
          sx={{
            fontSize: '20px',
            fontWeight: '400',
            lineHeight: '32px',
            letterSpacing: '-0.05px',
            color: '#fff',
            ml: 2,
            textTransform: 'uppercase'
          }}>
          Cổng thông tin tiêm chủng covid-19
        </Typography>
      </div>

      <div className="header-menu">
        <ul className="header-menu__list">
          <li className="header-menu__item">
            <a href="/" className="header-menu__link">
              Trang chủ
            </a>
          </li>
          <li className="header-menu__item">
            <a href="/vaccine-register" className="header-menu__link">
              Đăng ký tiêm
            </a>
          </li>
          <li className="header-menu__item">
            <a
              href="/search"
              className="header-menu__link"
              style={{
                display: 'flex'
              }}>
              <span>Tra cứu</span>
              <KeyboardArrowDown />
            </a>
          </li>
          <li className="header-menu__item">
            <a href="/document" className="header-menu__link">
              Tài liệu
            </a>
          </li>
        </ul>
        <Button
          sx={{
            backgroundColor: '#fff',
            color: indigo[700],
            borderRadius: '8px 8px 8px 0',
            padding: '8px 22px',
            border: '1px solid rgba(0,0,0,0)',
            '&:hover': {
              backgroundColor: 'rgba(0,0,0,0)',
              border: '1px solid #fff',
              color: '#fff'
            }
          }}>
          Đăng nhập
        </Button>
      </div>
    </div>
  );
};

export default Header;

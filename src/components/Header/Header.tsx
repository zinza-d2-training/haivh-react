import React from 'react';
import './Header.css';
import Logo from '../../img/Logo.png';
import { Button, Typography } from '@mui/material';
import {
  KeyboardArrowDown,
  ArrowRightAlt,
  PeopleAlt
} from '@mui/icons-material';
import { indigo, deepPurple, blue } from '@mui/material/colors';
import { useAppSelector } from '../../app/hooks';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();
  const user = useAppSelector((state) => state.user.value);

  const handleLogin = () => {
    navigate('/login');
  };
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
          <li className="header-menu__item more">
            <a
              href="/search"
              className="header-menu__link"
              style={{
                display: 'flex'
              }}>
              <span>Tra cứu</span>
              <KeyboardArrowDown />
            </a>

            <div className="header-menu__more">
              <ul className="header-menu__more-list">
                <li className="header-menu__more-item">
                  <div className="header-menu__more-icon">
                    <PeopleAlt
                      sx={{
                        color: blue[600]
                      }}
                    />
                  </div>

                  <span className="header-menu__more-text">
                    <Typography
                      sx={{
                        fontSize: '16px',
                        fontWeight: '400',
                        lineHeight: '24px',
                        letterSpacing: '-0.04px',
                        color: 'rgba(0, 0, 0, 0.87)'
                      }}>
                      Tra cứu chứng nhận tiêm
                    </Typography>
                    <Typography
                      sx={{
                        fontSize: '12px',
                        fontWeight: '400',
                        lineHeight: '18px',
                        letterSpacing: '-0.04px',
                        color: 'rgba(0, 0, 0, 0.87)'
                      }}>
                      Cập nhật nhanh và chính xác nhất
                    </Typography>
                  </span>
                  <ArrowRightAlt
                    sx={{
                      color: blue[600]
                    }}
                  />
                </li>
                <li className="header-menu__more-item">
                  <div className="header-menu__more-icon">
                    <PeopleAlt
                      sx={{
                        color: deepPurple[600]
                      }}
                    />
                  </div>

                  <span className="header-menu__more-text">
                    <Typography
                      sx={{
                        fontSize: '16px',
                        fontWeight: '400',
                        lineHeight: '24px',
                        letterSpacing: '-0.04px',
                        color: 'rgba(0, 0, 0, 0.87)'
                      }}>
                      Tra cứu kết quả đăng ký
                    </Typography>
                    <Typography
                      sx={{
                        fontSize: '12px',
                        fontWeight: '400',
                        lineHeight: '18px',
                        letterSpacing: '-0.04px',
                        color: 'rgba(0, 0, 0, 0.87)'
                      }}>
                      Cập nhật nhanh và chính xác nhất
                    </Typography>
                  </span>
                  <ArrowRightAlt
                    sx={{
                      color: deepPurple[600]
                    }}
                  />
                </li>
              </ul>
            </div>
          </li>
          <li className="header-menu__item">
            <a href="/document" className="header-menu__link">
              Tài liệu
            </a>
          </li>
        </ul>
        {user.email ? (
          <Typography
            sx={{
              fontSize: '16px',
              fontWeight: '500',
              lineHeight: '24px',
              letterSpacing: '-0.04px',
              color: '#fff',
              cursor: 'pointer'
            }}>
            {user.email}
          </Typography>
        ) : (
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
            }}
            onClick={handleLogin}>
            Đăng nhập
          </Button>
        )}
      </div>
    </div>
  );
};

export default Header;

import React from 'react';
import { Outlet } from 'react-router-dom';
import MainLayout from '../components/MainLayout';

const MainPage = () => {
  return (
    <MainLayout>
      <Outlet />
    </MainLayout>
  );
};

export default MainPage;

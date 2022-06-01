import React from 'react';
import Chart from '../components/Chart/Chart';
import Composite from '../components/Composite/Composite';
import ContainerLayout from '../components/ContainerLayout';
import Location from '../components/Location/Location';
import MainLayout from '../components/MainLayout';

const HomePage = () => {
  return (
    <MainLayout>
      <Composite />
      <ContainerLayout>
        <Chart />
        <Location />
      </ContainerLayout>
    </MainLayout>
  );
};

export default HomePage;

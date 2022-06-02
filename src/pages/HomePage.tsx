import React from 'react';
import Chart from '../components/Chart/Chart';
import Composite from '../components/Composite/Composite';
import ContainerLayout from '../components/ContainerLayout';
import Location from '../components/Location/Location';

const HomePage = () => {
  return (
    <>
      <Composite />
      <ContainerLayout>
        <Chart />
        <Location />
      </ContainerLayout>
    </>
  );
};

export default HomePage;

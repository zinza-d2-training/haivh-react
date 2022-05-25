import React from 'react';
import Chart from '../components/Chart/Chart';
import Composite from '../components/Composite/Composite';
import Footer from '../components/Footer/Footer';
import Header from '../components/Header/Header';
import Location from '../components/Location/Location';

const HomePage = () => {
  return (
    <div>
      <Header />
      <Composite />
      <Chart />
      <Location />
      <Footer />
    </div>
  );
};

export default HomePage;

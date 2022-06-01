import React from 'react';
import Footer from '../components/Footer/Footer';
import Header from '../components/Header/Header';

type MainProps = {
  children: React.ReactNode;
};

const MainLayout = (props: MainProps) => {
  return (
    <>
      <Header />
      {props.children}
      <Footer />
    </>
  );
};

export default MainLayout;

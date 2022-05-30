import React from 'react';
import { Container } from '@mui/material';

type ContainerProps = {
  children: React.ReactNode;
};

const ContainerLayout = (props: ContainerProps) => {
  return <Container maxWidth="xl">{props.children}</Container>;
};

export default ContainerLayout;

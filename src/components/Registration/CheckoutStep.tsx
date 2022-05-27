import React from 'react';
import { Box, Stepper, StepLabel, Step } from '@mui/material';
import styled from '@emotion/styled';

const steps = ['Thông tin cá nhân', 'Phiếu đồng ý tiêm', 'Hoàn thành'];

interface CheckoutStepProps {
  activeStep: number;
}
const StepBox = styled(Box)`
  margin-bottom: 80px;
`;
const CheckoutStep = ({ activeStep }: CheckoutStepProps) => {
  return (
    <StepBox>
      <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map((step, index) => (
          <Step
            key={index}
            active={activeStep === index ? true : false}
            completed={activeStep >= index ? true : false}>
            <StepLabel>{step}</StepLabel>
          </Step>
        ))}
      </Stepper>
    </StepBox>
  );
};

export default CheckoutStep;

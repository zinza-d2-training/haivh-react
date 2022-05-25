import React from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

import './Chart.css';
import { Typography } from '@mui/material';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const options = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'top' as const
    }
  }
};

const labels = [
  '24/04',
  '25/04',
  '26/04',
  '27/04',
  '28/04',
  '29/04',
  '30/04',
  '01/05',
  '02/05',
  '03/05',
  '04/05',
  '05/05',
  '06/05',
  '07/05',
  '08/05',
  '09/05',
  '10/05',
  '11/05',
  '12/05',
  '13/05',
  '14/05',
  '15/02',
  '16/05',
  '18/05',
  '19/05',
  '20/05',
  '21/05',
  '22/05',
  '23/05'
];

const data = {
  labels,
  datasets: [
    {
      label: 'Đã tiêm',
      data: [
        209325, 470229, 256736, 327969, 856473, 241434, 164998, 51917, 13929,
        17009, 137273, 189739, 238141, 149371, 55006, 95412, 257013, 184428,
        186901, 282316, 164864, 79626, 338133, 201046, 559551, 658999, 247995,
        39415, 35735, 117957
      ],
      borderColor: '#253494',
      backgroundColor: '#2e3091',
      pointBackgroundColor: 'red'
    }
  ]
};
const Chart = () => {
  return (
    <div className="chart-container">
      <Typography
        variant="h6"
        sx={{
          fontSize: '20px',
          lineHeight: '30px',
          letterSpacing: '-0.05px',
          fontWeight: 500,
          color: 'rgba(0, 0, 0, 0.87)',
          mb: 0.5
        }}>
        Dữ liệu tiêm theo ngày
      </Typography>
      <div style={{ height: '510px' }}>
        <Line options={options} data={data} />
      </div>
    </div>
  );
};

export default Chart;

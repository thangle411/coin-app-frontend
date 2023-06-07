import React, { FC } from 'react';
import { ChartData } from 'chart.js';
import { Line } from 'react-chartjs-2';
import { Chart, CategoryScale, LinearScale, PointElement, LineElement } from 'chart.js';
import Colors from '../../utils/constants/colors';
import { convertUnixTimestamp } from '../../utils/helpers/convertUnixTimestamp';
Chart.register(CategoryScale, LinearScale, PointElement, LineElement);

interface LineChartProps {
  dates: number[];
  prices: number[];
}

const LineChart: FC<LineChartProps> = ({ dates, prices }) => {
  const data: ChartData<'line'> = {
    labels: dates.map((date, index) => {
      // convertUnixTimestamp(date / 1000).toLocaleDateString('en-US')
      return '';
    }),
    datasets: [
      {
        data: prices,
        borderColor: Colors.GREEN,
        pointBackgroundColor: 'transparent',
        pointRadius: dates.map(() => 0),
        backgroundColor: 'transparent',
      },
    ],
  };

  return (
    <Line
      data={data}
      options={{
        responsive: true,
        scales: {
          x: {
            grid: {
              color: 'transparent',
            },
            ticks: {
              autoSkip: true,
              maxTicksLimit: 4,
              // maxRotation: 45,
              // minRotation: 45,
            },
          },
          y: {
            grid: {
              color: 'transparent',
            },
          },
        },
      }}
    />
  );
};

export default LineChart;

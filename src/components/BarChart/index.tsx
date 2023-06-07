import React, { FC } from 'react';
import { ChartData } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { Chart, CategoryScale, LinearScale, PointElement, BarElement } from 'chart.js';
import Colors from '../../utils/constants/colors';
Chart.register(CategoryScale, LinearScale, PointElement, BarElement);

interface BarChartProps {
  datasets: number[];
}

const BarChart: FC<BarChartProps> = ({ datasets }) => {
  const data: ChartData<'bar'> = {
    labels: datasets.map(x => ''),
    datasets: [
      {
        label: 'My First Dataset',
        data: datasets,
        borderWidth: 1,
        borderColor: Colors.PURPLE,
        backgroundColor: Colors.PURPLE,
      },
    ],
  };

  return <Bar data={data} />;
};

export default BarChart;

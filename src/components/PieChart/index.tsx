import React, { FC, useEffect, useState } from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart, ArcElement, ChartData } from 'chart.js';
Chart.register(ArcElement);

interface PieChartProps {
  labels: string[];
  label: string;
  dataset: number[];
  backgroundColor: string[];
}

const PieChart: FC<PieChartProps> = ({ labels, label, dataset, backgroundColor }) => {
  const [showChart, setShowChart] = useState(false);

  useEffect(() => {
    //prevent weird UI behaviors + show beautiful animation :D
    setTimeout(() => {
      setShowChart(true);
    }, 100);
  }, []);

  const chartData: ChartData<'doughnut'> = {
    datasets: [
      {
        label,
        data: dataset,
        backgroundColor,
        borderColor: dataset.map(() => 'transparent'),
        borderWidth: dataset.map(() => 0),
      },
    ],
  };

  return <div style={{ height: '300px' }}>{showChart && <Doughnut data={chartData} />}</div>;
};

export default PieChart;

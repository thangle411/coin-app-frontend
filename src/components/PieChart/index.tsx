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

  return (
    <div className='d-flex align-items-center justify-content-space-around w-100'>
      <div style={{ height: '300px', minWidth: '300px' }}>{showChart && <Doughnut data={chartData} />}</div>
      <div>
        {labels.map((name, index) => (
          <div className='d-flex align-items-center' style={{ fontSize: '10px' }}>
            <div
              style={{ width: '10px', height: '10px', background: backgroundColor[index], marginRight: '10px' }}
            ></div>
            {name}
          </div>
        ))}
      </div>
    </div>
  );
};

export default PieChart;

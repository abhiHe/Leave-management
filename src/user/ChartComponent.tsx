import React, { useEffect, useState } from 'react'
import { Chart } from 'primereact/chart';

const ChartComponent = () => {
     const [chartData, setChartData] = useState<any>({});
  const [chartOptions, setChartOptions] = useState<any>({});

  useEffect(() => {
    const data = {
      labels: [
        'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
        'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
      ],
      datasets: [
        {
          label: 'Total Leaves Applied',
          data: [4, 2, 6, 3, 5, 1, 7, 2, 4, 6, 3, 5],
          backgroundColor: '#42A5F5'
        }
      ]
    };

    const options = {
      maintainAspectRatio: false,
      plugins: {
        legend: {
          labels: {
            color: '#495057'
          }
        }
      },
      scales: {
        x: {
          ticks: {
            color: '#495057'
          }
        },
        y: {
          beginAtZero: true,
          ticks: {
            color: '#495057'
          }
        }
      }
    };

    setChartData(data);
    setChartOptions(options);
  }, []);
  return (
    //  <div className="card p-3">
    <div>
      <h3>Employee Leave Report (Monthly)</h3>
      <Chart type="bar" height='250px' data={chartData} options={chartOptions} />
    </div>
  )
}

export default ChartComponent
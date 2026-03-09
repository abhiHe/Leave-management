import { Chart } from 'primereact/chart';
import React, { useEffect, useState } from 'react'

const BarChartComponent = () => {
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
          label: 'Applied Leaves',
          backgroundColor: '#42A5F5',
          data: [5, 3, 6, 4, 8, 2, 7, 3, 5, 6, 4, 9]
        },
        {
          label: 'Approved Leaves',
          backgroundColor: '#66BB6A',
          data: [4, 2, 5, 3, 6, 2, 6, 2, 4, 5, 3, 7]
        }
      ]
    };

    const options = {
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: 'top'
        }
      },
      scales: {
        y: {
          beginAtZero: true
        }
      }
    };

    setChartData(data);
    setChartOptions(options);
  }, []);
  return (
     <div>
      <h3>Monthly Leave Report</h3>
      <Chart type="bar" height='250px' data={chartData} options={chartOptions} />
    </div>
  )
}

export default BarChartComponent
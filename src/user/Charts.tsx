import React from 'react'
import ChartComponent from './ChartComponent'
import BarChartComponent from './BarChartComponent'

const Charts = () => {
  return (
    <div className="container-fluid px-2 px-sm-3 px-md-4">
  <div className="row g-3">
    <div className="col-12 col-md-6">
      <ChartComponent />
    </div>
    <div className="col-12 col-md-6">
      <BarChartComponent />
    </div>
  </div>
</div>
  )
}

export default Charts
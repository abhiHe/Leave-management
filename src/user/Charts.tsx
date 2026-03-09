import React from 'react'
import ChartComponent from './ChartComponent'
import BarChartComponent from './BarChartComponent'

const Charts = () => {
  return (
     <div className="card shadow-sm m-4">
    
      {/* Header Section */}
      <div className="d-flex justify-content-between align-items-center px-4 pt-4">
        <h5 className="mb-0 fw-semibold">
          <i className="pi pi-desktop me-2 text-primary"></i>
          Dashboard
        </h5>
    
       
      </div>
    
      <hr className="my-3" />
    
  <div className="row g-3 p-3 align-items-stretch">
  <div className="col-12 col-md-6 border-end pe-4">
    <ChartComponent />
  </div>

  <div className="col-12 col-md-6 ps-4">
    <BarChartComponent />
  </div>
</div>
</div>
  )
}

export default Charts
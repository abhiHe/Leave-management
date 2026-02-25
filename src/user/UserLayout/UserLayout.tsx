import React from 'react'
import Dashboard from '../Dashboard'
import { Route, Router, Routes } from 'react-router-dom'
import ApplyLeave from '../ApplyLeave'
import Charts from '../Charts'

const UserLayout = () => {
  return (
   <div className="container-fluid mt-4">
    <h3 className="mb-4">Welcome back, John Doe!</h3>
  <div className="row g-4">

    <div className="col-12 col-sm-6 col-lg-3">
      <div className="card p-3 shadow-sm rounded-4">
        <div className="d-flex justify-content-between align-items-start">
          <div>
            <h6 className="text-muted">Days available</h6>
            <h3 className="fw-bold">7</h3>
            <small className="text-muted">To book time off</small>
          </div>
        </div>
      </div>
    </div>

    <div className="col-12 col-sm-6 col-lg-3">
      <div className="card p-3 shadow-sm rounded-4">
        <h6 className="text-muted">Pending requests</h6>
        <h3 className="fw-bold">4</h3>
        <small className="text-muted">Tracking manager requests</small>
      </div>
    </div>

    <div className="col-12 col-sm-6 col-lg-3">
      <div className="card p-3 shadow-sm rounded-4">
        <h6 className="text-muted">Days upcoming</h6>
        <h3 className="fw-bold">0</h3>
        <small className="text-muted">12 days decision taken</small>
      </div>
    </div>

    <div className="col-12 col-sm-6 col-lg-3">
      <div className="card p-3 shadow-sm rounded-4">
        <h6 className="text-muted">Days per year</h6>
        <h3 className="fw-bold">25</h3>
        <small className="text-muted">In the engagement</small>
      </div>
    </div>

  </div>
    <Dashboard />
      <div className='children'>
            <Routes>
                <Route path='dashboard' element={<Charts />} />
                <Route path='apply-leave' element={<ApplyLeave />} />

            </Routes>
      </div>
    </div>
  )
}

export default UserLayout
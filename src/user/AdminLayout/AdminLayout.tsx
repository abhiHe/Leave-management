import React from 'react'
import Dashboard from '../Dashboard'
import { Route, Router, Routes, useNavigate } from 'react-router-dom'
import ApplyLeave from '../ApplyLeave'
import Charts from '../Charts'
import AdminDepartment from '../AdminDepartment'
import logo from "../../assets/prj1.png";
import AdminLeaveType from '../AdminLeaveType'
const AdminLayout = () => {
  const username = window.sessionStorage.getItem('username') as any;
  const navigate = useNavigate();
  return (
   <div className="container-fluid">
    {/* <h3 className="ml-4 mt-4">Welcome,<span className='ml-1'>{username?.charAt(0).toUpperCase() + username?.slice(1)}!</span></h3> */}
    <div className="bg-white border-bottom shadow-sm">
  {/* Container to prevent stretching on large screens */}
  <div className="container-fluid px-4 py-2 d-flex align-items-center justify-content-between">
    
    {/* Left - Logo & Brand Name */}
    <div className="d-flex align-items-center">
      <img 
        src={logo} 
        alt="Logo" 
        height="60" 
        className="me-3" 
      />
      <div className="d-none d-md-block">
        <h6 className="mb-0 fw-bold text-primary">Leave Management</h6>
        <small className="text-muted">System Portal</small>
      </div>
    </div>

    {/* Center - Welcome Text */}
    <div className="text-center">
      <h5 className="mb-0 fw-bold text-secondary">
        Welcome, <span className="text-dark">{username?.charAt(0).toUpperCase() + username?.slice(1)}!</span>
      </h5>
    </div>

    {/* Right - Logout Button */}
     <div className="d-flex align-items-center gap-3">
      <div className="d-flex align-items-center bg-light px-3 py-1 rounded-pill shadow-sm">
        <i className="pi pi-user text-primary me-2"></i>
        <span className="fw-semibold text-dark small">
          Admin
        </span>
      </div>
      <button className="btn btn-outline-danger btn-sm px-4 rounded-pill fw-semibold" onClick={()=>navigate('/')}>
        Logout
      </button>
    </div>
  </div>
</div>
  <div className="row g-4 mx-4">

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
                <Route path='department' element={<AdminDepartment />} />
                <Route path='leave-type' element={<AdminLeaveType />} />
            </Routes>
      </div>
    </div>
  )
}

export default AdminLayout
import React from 'react'
import { MenuItem } from 'primereact/menuitem';
import { NavLink } from 'react-router-dom';
import '../user/Dashboard.css';
import { Menubar } from 'primereact/menubar';
const ManagerDashboard = () => {
    const items: MenuItem[] = [
    { template: () => <NavLink to="/manager/mdashboard" className={({ isActive }) => `menu-link ${isActive ? 'active' : ''}`}><i className="pi pi-desktop"></i> Dashboard</NavLink> },
    // { template: () => <NavLink to="/admin/apply-leave" className={({ isActive }) => `menu-link ${isActive ? 'active' : ''}`}><i className="pi pi-send"></i> Apply Leave</NavLink> },
    { template: () => <NavLink to="/admin/department" className={({ isActive }) => `menu-link ${isActive ? 'active' : ''}`}><i className="pi pi-objects-column"></i> Department</NavLink> },
    { template: () => <NavLink to="/admin/leave-type" className={({ isActive }) => `menu-link ${isActive ? 'active' : ''}`}><i className="pi pi-calendar"></i>Add Leave Type</NavLink> },
    { template: () => <NavLink to="/admin/appliedleaves" className={({ isActive }) => `menu-link ${isActive ? 'active' : ''}`}><i className="pi pi-file-export"></i> Applied Leaves</NavLink> },
    { template: () => <NavLink to="/admin/employeinfo" className={({ isActive }) => `menu-link ${isActive ? 'active' : ''}`}><i className="pi pi-user"></i>Employee Info</NavLink> },
     { template: () => <NavLink to="/manager/info" className={({ isActive }) => `menu-link ${isActive ? 'active' : ''}`}><i className="pi pi-id-card"></i>Profile</NavLink> },
    
  ];
  return (
    <div className="card dashboard-card shadow-sm border-0 mx-4">
          <Menubar model={items} className="custom-menubar" />
        </div>
  )
}

export default ManagerDashboard
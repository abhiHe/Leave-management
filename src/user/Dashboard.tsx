import React from 'react'
import { Menubar } from 'primereact/menubar';
import { MenuItem } from 'primereact/menuitem';
import { useLocation, useNavigate } from 'react-router-dom';
import './Dashboard.css';
 import { NavLink } from 'react-router-dom';

const Dashboard = () => {
  
const navigate = useNavigate();
    const location = useLocation();


const items: MenuItem[] = [
    {
        template: () => (
            <NavLink
                to="/user/dashboard"
                className={({ isActive }) =>
                    `menu-link ${isActive ? 'custom-active' : ''}`
                }
            >
                <i className="pi pi-desktop me-2"></i>
                Dashboard
            </NavLink>
        )
    },
    {
        template: () => (
            <NavLink
                to="/user/apply-leave"
                className={({ isActive }) =>
                    `menu-link ${isActive ? 'custom-active' : ''}`
                }
            >
                <i className="pi pi-send me-2"></i>
                Apply Leave
            </NavLink>
        )
    },
];
    
        
  return (
    <div className='p-2 gap-2'>
        <Menubar model={items} className="custom-menubar" />
    </div>
  )
}

export default Dashboard
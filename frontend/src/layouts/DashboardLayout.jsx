// src/layouts/DashboardLayout.jsx
import { Outlet, NavLink } from 'react-router-dom';
import { FiHome, FiBox, FiUsers, FiActivity, FiLogOut } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import './dashboardLayout.css';

export default function DashboardLayout() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('agent');
    navigate('/');
  };


  return (
    <div className="dashboard_layout">
      <aside className="menu">
        <h2 className="logo">AINT</h2>
        <nav>
          <NavLink to="/dashboard" end><FiHome className="inline-block mr-2" />Dashboard</NavLink>
          <NavLink to="/dashboard/inventory">  <FiBox className="inline-block mr-2" />Inventory</NavLink>
          <NavLink to="/dashboard/assignments">  <FiUsers className="inline-block mr-2" />Assignments</NavLink>
          <NavLink to="/dashboard/transactions">  <FiActivity className="inline-block mr-2" />Transactions</NavLink>
        </nav>
        <div className="logout-link">
        <button onClick={handleLogout}>
          <FiLogOut className="icon" /> Logout
        </button>
        </div>
      </aside>

      <main className="content">
        <Outlet />
      </main>
    </div>
  );
}

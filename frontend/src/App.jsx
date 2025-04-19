import { Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import ProtectedRoute from './components/ProtectedRoute';
import PublicRoute from './components/PublicRoute';
import DashboardLayout from './layouts/DashboardLayout';
import DashboardHome from './pages/DashboardHome';
import InventoryPage from './pages/InventoryPage';
import AssignmentPage from './pages/AssignmentPage';
import TransactionsPage from './pages/TransactionsPage';
import ItemAddPage from './pages/ItemAddPage';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<PublicRoute><Login /></PublicRoute>} />
      <Route path="/register" element={<PublicRoute><Register /></PublicRoute>} />

      <Route path="/dashboard" element={<ProtectedRoute><DashboardLayout /></ProtectedRoute>}>
        <Route index element={<DashboardHome />} />
        <Route path="inventory" element={<InventoryPage />} />
        <Route path="additem" element={<ItemAddPage />} />
        <Route path="assignments" element={<AssignmentPage />} />
        <Route path="transactions" element={<TransactionsPage />} />
      </Route>
    </Routes>
  );
}


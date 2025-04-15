import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard'; // protected page (stub)

export default function App() {
  const isLoggedIn = !!localStorage.getItem("agent"); // Simple login check

  return (
    <Routes>
      <Route path="/" element={isLoggedIn ? <Dashboard /> : <Navigate to="/login" />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
    </Routes>
  );
}

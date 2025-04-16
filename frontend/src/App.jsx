import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard'; // protected page (stub)
import ProtectedRoute from './components/ProtectedRoute';
import PublicRoute from './components/PublicRoute';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<PublicRoute><Login/></PublicRoute>} />
      <Route path="/register" element={<Register />} />
      <Route path='/dashboard' element={<ProtectedRoute><Dashboard/></ProtectedRoute>} />
    </Routes>
  );
}

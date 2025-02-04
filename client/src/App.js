import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Dashboard from './components/dashboard/Dashboard';
import Vendas from './components/vendas/Vendas';
import ModuleUnderDevelopment from './components/ModuleUnderDevelopment';
import './App.css';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <Router>
      <Routes>
        <Route path="/login" element={!isAuthenticated ? <Login setAuth={setIsAuthenticated} /> : <Navigate to="/dashboard" />} />
        <Route path="/register" element={!isAuthenticated ? <Register setAuth={setIsAuthenticated} /> : <Navigate to="/dashboard" />} />
        <Route path="/dashboard" element={isAuthenticated ? <Dashboard setAuth={setIsAuthenticated} /> : <Navigate to="/login" />} />
        <Route path="/vendas" element={isAuthenticated ? <Vendas /> : <Navigate to="/login" />} />
        <Route path="/compras" element={isAuthenticated ? <ModuleUnderDevelopment /> : <Navigate to="/login" />} />
        <Route path="/estoque" element={isAuthenticated ? <ModuleUnderDevelopment /> : <Navigate to="/login" />} />
        <Route path="/producao" element={isAuthenticated ? <ModuleUnderDevelopment /> : <Navigate to="/login" />} />
        <Route path="/financeiro" element={isAuthenticated ? <ModuleUnderDevelopment /> : <Navigate to="/login" />} />
        <Route path="/contabilidade" element={isAuthenticated ? <ModuleUnderDevelopment /> : <Navigate to="/login" />} />
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

export default App; 
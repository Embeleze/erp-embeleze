import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Dashboard from './components/dashboard/Dashboard';
import Vendas from './components/vendas/Vendas';
import ModuleUnderDevelopment from './components/ModuleUnderDevelopment';
import './App.css';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsAuthenticated(true);
    }
    setLoading(false);
  }, []);

  if (loading) {
    return <div>Carregando...</div>;
  }

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/login" element={!isAuthenticated ? <Login setAuth={setIsAuthenticated} /> : <Navigate to="/dashboard" />} />
          <Route path="/register" element={!isAuthenticated ? <Register setAuth={setIsAuthenticated} /> : <Navigate to="/dashboard" />} />
          <Route path="/dashboard" element={isAuthenticated ? <Dashboard setAuth={setIsAuthenticated} /> : <Navigate to="/login" />} />
          <Route path="/vendas" element={isAuthenticated ? <Vendas /> : <Navigate to="/login" />} />
          <Route path="/compras" element={isAuthenticated ? <ModuleUnderDevelopment moduleName="Compras" /> : <Navigate to="/login" />} />
          <Route path="/estoque" element={isAuthenticated ? <ModuleUnderDevelopment moduleName="Estoque" /> : <Navigate to="/login" />} />
          <Route path="/producao" element={isAuthenticated ? <ModuleUnderDevelopment moduleName="Produção" /> : <Navigate to="/login" />} />
          <Route path="/financeiro" element={isAuthenticated ? <ModuleUnderDevelopment moduleName="Financeiro" /> : <Navigate to="/login" />} />
          <Route path="/contabilidade" element={isAuthenticated ? <ModuleUnderDevelopment moduleName="Contabilidade" /> : <Navigate to="/login" />} />
          <Route path="/" element={<Navigate to={isAuthenticated ? "/dashboard" : "/login"} />} />
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App; 
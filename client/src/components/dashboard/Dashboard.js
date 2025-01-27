import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Dashboard.css';

const Dashboard = () => {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <div className="app-container">
      <div className="sidebar">
        <div className="logo">
          <h1>ERP Embeleze</h1>
        </div>
        <nav className="menu">
          <button className="menu-btn" onClick={() => navigateToModule('vendas')}>
            <i className="fas fa-shopping-cart"></i>
            <span>Vendas</span>
          </button>
          <button className="menu-btn" onClick={() => navigateToModule('compras')}>
            <i className="fas fa-shopping-bag"></i>
            <span>Compras</span>
          </button>
          <button className="menu-btn" onClick={() => navigateToModule('estoque')}>
            <i className="fas fa-warehouse"></i>
            <span>Estoque</span>
          </button>
          <button className="menu-btn" onClick={() => navigateToModule('producao')}>
            <i className="fas fa-industry"></i>
            <span>Produção</span>
          </button>
          <button className="menu-btn" onClick={() => navigateToModule('financeiro')}>
            <i className="fas fa-dollar-sign"></i>
            <span>Financeiro</span>
          </button>
          <button className="menu-btn" onClick={() => navigateToModule('contabilidade')}>
            <i className="fas fa-calculator"></i>
            <span>Contabilidade</span>
          </button>
          <button className="menu-btn logout" onClick={logout}>
            <i className="fas fa-sign-out-alt"></i>
            <span>Sair</span>
          </button>
        </nav>
      </div>
      <main className="content">
        <header>
          <div className="user-info">
            <i className="fas fa-user-circle"></i>
            <span>Bem-vindo(a)</span>
          </div>
        </header>
        <div className="dashboard" id="dashboard">
          <h2>Dashboard</h2>
          <p>Selecione um módulo para começar</p>
        </div>
      </main>
    </div>
  );
};

export default Dashboard; 
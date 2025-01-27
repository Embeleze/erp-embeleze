import React from 'react';
import { useNavigate } from 'react-router-dom';
import './ModuleUnderDevelopment.css';

const ModuleUnderDevelopment = ({ moduleName }) => {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  const navigateToModule = (module) => {
    switch(module) {
      case 'dashboard':
        navigate('/dashboard');
        break;
      case 'vendas':
        navigate('/vendas');
        break;
      case 'compras':
        navigate('/compras');
        break;
      case 'estoque':
        navigate('/estoque');
        break;
      case 'producao':
        navigate('/producao');
        break;
      case 'financeiro':
        navigate('/financeiro');
        break;
      case 'contabilidade':
        navigate('/contabilidade');
        break;
      default:
        navigate('/dashboard');
    }
  };

  const renderSidebar = () => (
    <div className="sidebar">
      <div className="logo">
        <h1>ERP Embeleze</h1>
      </div>
      <nav className="menu">
        <button className="menu-btn" onClick={() => navigateToModule('dashboard')}>
          <i className="fas fa-home"></i>
          <span>Dashboard</span>
        </button>
        <button className="menu-btn" onClick={() => navigateToModule('vendas')}>
          <i className="fas fa-shopping-cart"></i>
          <span>Vendas</span>
        </button>
        <button 
          className={`menu-btn ${moduleName === 'Compras' ? 'active' : ''}`} 
          onClick={() => navigateToModule('compras')}
        >
          <i className="fas fa-shopping-bag"></i>
          <span>Compras</span>
        </button>
        <button 
          className={`menu-btn ${moduleName === 'Estoque' ? 'active' : ''}`} 
          onClick={() => navigateToModule('estoque')}
        >
          <i className="fas fa-warehouse"></i>
          <span>Estoque</span>
        </button>
        <button 
          className={`menu-btn ${moduleName === 'Produção' ? 'active' : ''}`} 
          onClick={() => navigateToModule('producao')}
        >
          <i className="fas fa-industry"></i>
          <span>Produção</span>
        </button>
        <button 
          className={`menu-btn ${moduleName === 'Financeiro' ? 'active' : ''}`} 
          onClick={() => navigateToModule('financeiro')}
        >
          <i className="fas fa-dollar-sign"></i>
          <span>Financeiro</span>
        </button>
        <button 
          className={`menu-btn ${moduleName === 'Contabilidade' ? 'active' : ''}`} 
          onClick={() => navigateToModule('contabilidade')}
        >
          <i className="fas fa-calculator"></i>
          <span>Contabilidade</span>
        </button>
        <button className="menu-btn logout" onClick={logout}>
          <i className="fas fa-sign-out-alt"></i>
          <span>Sair</span>
        </button>
      </nav>
    </div>
  );

  const renderHeader = () => (
    <header>
      <div className="user-info">
        <i className="fas fa-user-circle"></i>
        <span>Bem-vindo(a)</span>
      </div>
    </header>
  );

  return (
    <div className="app-container">
      {renderSidebar()}
      <main className="content">
        {renderHeader()}
        <div className="module-container">
          <div className="module-content">
            <h2>{moduleName}</h2>
            <p>Módulo em desenvolvimento...</p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ModuleUnderDevelopment; 
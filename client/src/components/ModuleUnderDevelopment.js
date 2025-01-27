import React from 'react';
import { useNavigate } from 'react-router-dom';
import './ModuleUnderDevelopment.css';

const ModuleUnderDevelopment = () => {
  const navigate = useNavigate();

  return (
    <div className="module-container">
      <div className="module-content">
        <h2>Módulo em Desenvolvimento</h2>
        <p>Este módulo está atualmente em desenvolvimento.</p>
        <button className="btn-voltar" onClick={() => navigate('/dashboard')}>
          <i className="fas fa-arrow-left"></i>
          Voltar ao Dashboard
        </button>
      </div>
    </div>
  );
};

export default ModuleUnderDevelopment; 
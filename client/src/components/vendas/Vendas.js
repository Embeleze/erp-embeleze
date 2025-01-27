import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Vendas.css';

const Vendas = () => {
  const navigate = useNavigate();
  const [currentView, setCurrentView] = useState('marketplace');
  const [calculatorMode, setCalculatorMode] = useState('porPreco');
  const [formData, setFormData] = useState({
    custoProduto: '',
    quantidade: '',
    comissaoShopee: '',
    lucroDesejado: '',
    precoVenda: ''
  });
  const [resultado, setResultado] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const calcular = () => {
    if (calculatorMode === 'porPreco') {
      const custo = parseFloat(formData.custoProduto);
      const quantidade = parseInt(formData.quantidade);
      const comissao = parseFloat(formData.comissaoShopee);
      const precoVenda = parseFloat(formData.precoVenda);

      if (!custo || !quantidade || !comissao || !precoVenda) {
        alert('Por favor, preencha todos os campos');
        return;
      }

      const custoTotal = custo * quantidade;
      const valorComissao = (precoVenda * comissao) / 100;
      const lucro = precoVenda - custoTotal - valorComissao;
      const margemLucro = (lucro / precoVenda) * 100;

      setResultado({
        custoTotal: custoTotal.toFixed(2),
        valorComissao: valorComissao.toFixed(2),
        lucro: lucro.toFixed(2),
        margemLucro: margemLucro.toFixed(2)
      });
    } else {
      const custo = parseFloat(formData.custoProduto);
      const quantidade = parseInt(formData.quantidade);
      const comissao = parseFloat(formData.comissaoShopee);
      const lucroDesejado = parseFloat(formData.lucroDesejado);

      if (!custo || !quantidade || !comissao || !lucroDesejado) {
        alert('Por favor, preencha todos os campos');
        return;
      }

      const custoTotal = custo * quantidade;
      const precoBase = custoTotal + lucroDesejado;
      const precoVenda = precoBase / (1 - (comissao / 100));
      const valorComissao = (precoVenda * comissao) / 100;
      const margemLucro = (lucroDesejado / precoVenda) * 100;

      setResultado({
        custoTotal: custoTotal.toFixed(2),
        precoVenda: precoVenda.toFixed(2),
        valorComissao: valorComissao.toFixed(2),
        margemLucro: margemLucro.toFixed(2)
      });
    }
  };

  const limpar = () => {
    setFormData({
      custoProduto: '',
      quantidade: '',
      comissaoShopee: '',
      lucroDesejado: '',
      precoVenda: ''
    });
    setResultado(null);
  };

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
        <button className="menu-btn active">
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
  );

  const renderHeader = () => (
    <header>
      <div className="user-info">
        <i className="fas fa-user-circle"></i>
        <span>Bem-vindo(a)</span>
      </div>
    </header>
  );

  const renderMarketplace = () => (
    <div className="marketplace-container">
      <h2>Selecione o Marketplace</h2>
      <div className="marketplace-cards">
        <div className="marketplace-card shopee" onClick={() => setCurrentView('shopee')}>
          <div className="card-logo">
            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/0e/Shopee_logo.svg/2560px-Shopee_logo.svg.png" alt="Shopee" />
          </div>
          <div className="card-content">
            <h3>Shopee</h3>
            <p>Gerenciar vendas na Shopee</p>
          </div>
        </div>
        <div className="marketplace-card mercadolivre" onClick={() => setCurrentView('mercadolivre')}>
          <div className="card-logo">
            <img src="https://logodownload.org/wp-content/uploads/2018/10/mercado-livre-logo.png" alt="Mercado Livre" />
          </div>
          <div className="card-content">
            <h3>Mercado Livre</h3>
            <p>Gerenciar vendas no Mercado Livre</p>
          </div>
        </div>
      </div>
    </div>
  );

  const renderShopeeMenu = () => (
    <div className="shopee-welcome">
      <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/0e/Shopee_logo.svg/2560px-Shopee_logo.svg.png" alt="Shopee" className="shopee-logo" />
      <div className="welcome-text">
        <h2>Bem-vindo à Shopee</h2>
        <p>Escolha uma opção para continuar</p>
      </div>
      <button className="btn-precificar" onClick={() => setCurrentView('calculator')}>
        <i className="fas fa-calculator"></i>
        Precificar Shopee
      </button>
      <button className="btn-voltar" onClick={() => setCurrentView('marketplace')}>
        <i className="fas fa-arrow-left"></i>
        Voltar
      </button>
    </div>
  );

  const renderCalculator = () => (
    <div className="calculator-container">
      <div className="calculator-header">
        <button className="btn-voltar" onClick={() => setCurrentView('shopee')}>
          <i className="fas fa-arrow-left"></i>
          Voltar
        </button>
        <h2>Calculadora de Preços - Shopee</h2>
      </div>
      <div className="calculator-tabs">
        <button
          className={`tab ${calculatorMode === 'porPreco' ? 'active' : ''}`}
          onClick={() => setCalculatorMode('porPreco')}
        >
          Por Preço de Venda
        </button>
        <button
          className={`tab ${calculatorMode === 'porLucro' ? 'active' : ''}`}
          onClick={() => setCalculatorMode('porLucro')}
        >
          Por Lucro Desejado
        </button>
      </div>
      <div className="calc-container">
        <div className="input-group">
          <label>Custo do Produto:</label>
          <input
            type="number"
            name="custoProduto"
            value={formData.custoProduto}
            onChange={handleInputChange}
            placeholder="0.00"
          />
        </div>
        <div className="input-group">
          <label>Quantidade:</label>
          <input
            type="number"
            name="quantidade"
            value={formData.quantidade}
            onChange={handleInputChange}
            placeholder="0"
          />
        </div>
        <div className="input-group">
          <label>Comissão Shopee (%):</label>
          <input
            type="number"
            name="comissaoShopee"
            value={formData.comissaoShopee}
            onChange={handleInputChange}
            placeholder="0"
          />
        </div>
        {calculatorMode === 'porPreco' ? (
          <div className="input-group">
            <label>Preço de Venda:</label>
            <input
              type="number"
              name="precoVenda"
              value={formData.precoVenda}
              onChange={handleInputChange}
              placeholder="0.00"
            />
          </div>
        ) : (
          <div className="input-group">
            <label>Lucro Desejado:</label>
            <input
              type="number"
              name="lucroDesejado"
              value={formData.lucroDesejado}
              onChange={handleInputChange}
              placeholder="0.00"
            />
          </div>
        )}
        <div className="calc-buttons">
          <button className="btn-calcular" onClick={calcular}>
            <i className="fas fa-calculator"></i>
            Calcular
          </button>
          <button className="btn-limpar" onClick={limpar}>
            <i className="fas fa-trash"></i>
            Limpar
          </button>
        </div>
        {resultado && (
          <div className="resultado">
            <h3>Resultados:</h3>
            <div className="resultado-item">
              <span>Custo Total:</span>
              <span>R$ {resultado.custoTotal}</span>
            </div>
            {calculatorMode === 'porLucro' && (
              <div className="resultado-item">
                <span>Preço de Venda:</span>
                <span>R$ {resultado.precoVenda}</span>
              </div>
            )}
            <div className="resultado-item">
              <span>Valor da Comissão:</span>
              <span>R$ {resultado.valorComissao}</span>
            </div>
            <div className="resultado-item">
              <span>Lucro:</span>
              <span>R$ {resultado.lucro}</span>
            </div>
            <div className="resultado-item">
              <span>Margem de Lucro:</span>
              <span>{resultado.margemLucro}%</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div className="app-container">
      {renderSidebar()}
      <main className="content">
        {renderHeader()}
        {currentView === 'marketplace' && renderMarketplace()}
        {currentView === 'shopee' && renderShopeeMenu()}
        {currentView === 'calculator' && renderCalculator()}
      </main>
    </div>
  );
};

export default Vendas; 
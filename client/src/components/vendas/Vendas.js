import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Vendas.css';

const Vendas = () => {
  const navigate = useNavigate();
  const [currentView, setCurrentView] = useState('marketplace');
  const [calculatorMode, setCalculatorMode] = useState('preco');
  const [formData, setFormData] = useState({
    custoProduto: '',
    quantidade: '',
    comissaoShopee: '18',
    freteProduto: '',
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
    const custo = parseFloat(formData.custoProduto);
    const quantidade = parseInt(formData.quantidade);
    const comissao = parseFloat(formData.comissaoShopee) / 100;
    const frete = parseFloat(formData.freteProduto);
    
    if (calculatorMode === 'preco') {
      const precoVenda = parseFloat(formData.precoVenda);
      const custoTotal = custo * quantidade + frete;
      const comissaoValor = precoVenda * comissao;
      const lucro = precoVenda - custoTotal - comissaoValor;
      const margemLucro = (lucro / precoVenda) * 100;

      setResultado({
        custoTotal: custoTotal.toFixed(2),
        comissao: comissaoValor.toFixed(2),
        lucro: lucro.toFixed(2),
        margemLucro: margemLucro.toFixed(2)
      });
    } else {
      const lucroDesejado = parseFloat(formData.lucroDesejado);
      const custoTotal = custo * quantidade + frete;
      const precoBase = custoTotal / (1 - comissao - (lucroDesejado / 100));
      const comissaoValor = precoBase * comissao;
      const lucroFinal = precoBase - custoTotal - comissaoValor;

      setResultado({
        precoSugerido: precoBase.toFixed(2),
        custoTotal: custoTotal.toFixed(2),
        comissao: comissaoValor.toFixed(2),
        lucro: lucroFinal.toFixed(2)
      });
    }
  };

  const limpar = () => {
    setFormData({
      custoProduto: '',
      quantidade: '',
      comissaoShopee: '18',
      freteProduto: '',
      lucroDesejado: '',
      precoVenda: ''
    });
    setResultado(null);
  };

  const renderMarketplace = () => (
    <div className="marketplace-container">
      <div className="marketplace-cards">
        <div className="marketplace-card shopee" onClick={() => setCurrentView('shopee')}>
          <img src="/shopee-logo.png" alt="Shopee" className="marketplace-logo" />
          <h3>Shopee</h3>
        </div>
        <div className="marketplace-card mercadolivre" onClick={() => setCurrentView('calculator')}>
          <img src="/mercadolivre-logo.png" alt="Mercado Livre" className="marketplace-logo" />
          <h3>Mercado Livre</h3>
        </div>
      </div>
    </div>
  );

  const renderShopeeMenu = () => (
    <div className="shopee-welcome">
      <div className="welcome-text">
        <h2>Bem-vindo à Shopee</h2>
        <p>Escolha uma opção para continuar</p>
      </div>
      <button className="btn-precificar" onClick={() => setCurrentView('calculator')}>
        Precificar Shopee
      </button>
      <button className="btn-voltar" onClick={() => setCurrentView('marketplace')}>
        Voltar
      </button>
    </div>
  );

  const renderCalculator = () => (
    <div className="calculator-container">
      <div className="calculator-header">
        <button className="btn-voltar" onClick={() => setCurrentView('marketplace')}>
          Voltar
        </button>
        <h2>Calculadora de Preços</h2>
      </div>
      
      <div className="calculator-tabs">
        <button 
          className={`tab ${calculatorMode === 'preco' ? 'active' : ''}`}
          onClick={() => setCalculatorMode('preco')}
        >
          Por Preço de Venda
        </button>
        <button 
          className={`tab ${calculatorMode === 'lucro' ? 'active' : ''}`}
          onClick={() => setCalculatorMode('lucro')}
        >
          Por Lucro Desejado
        </button>
      </div>

      <div className="calculator-form">
        <div className="form-row">
          <div className="form-group">
            <label>Custo do Produto</label>
            <input
              type="number"
              name="custoProduto"
              value={formData.custoProduto}
              onChange={handleInputChange}
              placeholder="R$ 0,00"
            />
          </div>
          <div className="form-group">
            <label>Quantidade</label>
            <input
              type="number"
              name="quantidade"
              value={formData.quantidade}
              onChange={handleInputChange}
              placeholder="0"
            />
          </div>
          <div className="form-group">
            <label>Comissão Shopee (%)</label>
            <input
              type="number"
              name="comissaoShopee"
              value={formData.comissaoShopee}
              onChange={handleInputChange}
              placeholder="18%"
            />
          </div>
          <div className="form-group">
            <label>Frete do Produto</label>
            <input
              type="number"
              name="freteProduto"
              value={formData.freteProduto}
              onChange={handleInputChange}
              placeholder="R$ 0,00"
            />
          </div>
          {calculatorMode === 'lucro' ? (
            <div className="form-group">
              <label>Lucro Desejado (%)</label>
              <input
                type="number"
                name="lucroDesejado"
                value={formData.lucroDesejado}
                onChange={handleInputChange}
                placeholder="0%"
              />
            </div>
          ) : (
            <div className="form-group">
              <label>Preço de Venda</label>
              <input
                type="number"
                name="precoVenda"
                value={formData.precoVenda}
                onChange={handleInputChange}
                placeholder="R$ 0,00"
              />
            </div>
          )}
        </div>

        <div className="calculator-actions">
          <button className="btn-calcular" onClick={calcular}>
            Calcular
          </button>
          <button className="btn-limpar" onClick={limpar}>
            Limpar campos
          </button>
        </div>

        {resultado && (
          <div className="resultado">
            <h3>Resultados</h3>
            {calculatorMode === 'lucro' ? (
              <>
                <div className="resultado-item">
                  <span>Preço Sugerido:</span>
                  <strong>R$ {resultado.precoSugerido}</strong>
                </div>
                <div className="resultado-item">
                  <span>Custo Total:</span>
                  <strong>R$ {resultado.custoTotal}</strong>
                </div>
                <div className="resultado-item">
                  <span>Comissão:</span>
                  <strong>R$ {resultado.comissao}</strong>
                </div>
                <div className="resultado-item">
                  <span>Lucro:</span>
                  <strong>R$ {resultado.lucro}</strong>
                </div>
              </>
            ) : (
              <>
                <div className="resultado-item">
                  <span>Custo Total:</span>
                  <strong>R$ {resultado.custoTotal}</strong>
                </div>
                <div className="resultado-item">
                  <span>Comissão:</span>
                  <strong>R$ {resultado.comissao}</strong>
                </div>
                <div className="resultado-item">
                  <span>Lucro:</span>
                  <strong>R$ {resultado.lucro}</strong>
                </div>
                <div className="resultado-item">
                  <span>Margem de Lucro:</span>
                  <strong>{resultado.margemLucro}%</strong>
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div className="vendas-container">
      {currentView === 'marketplace' && renderMarketplace()}
      {currentView === 'shopee' && renderShopeeMenu()}
      {currentView === 'calculator' && renderCalculator()}
    </div>
  );
};

export default Vendas; 
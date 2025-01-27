import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Vendas.css';

const Vendas = () => {
  const navigate = useNavigate();
  const [currentView, setCurrentView] = useState('marketplace');
  const [calculatorMode, setCalculatorMode] = useState('preco');
  const [formData, setFormData] = useState({
    custoProduto: '',
    quantidade: '1',
    comissaoShopee: '12',
    comissaoParceiro: '0',
    imposto: '',
    taxaFixa: '5',
    custoPedido: '',
    precoVenda: '',
    lucroDesejado: ''
  });
  const [resultado, setResultado] = useState({
    precoFinal: 0,
    lucroBruto: 0,
    comissaoParceiroValor: 0,
    lucroFinal: 0,
    margemFinal: 0
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value
    });
  };

  const limpar = () => {
    setFormData({
      custoProduto: '',
      quantidade: '1',
      comissaoShopee: '12',
      comissaoParceiro: '0',
      imposto: '',
      taxaFixa: '5',
      custoPedido: '',
      precoVenda: '',
      lucroDesejado: ''
    });
    setResultado({
      precoFinal: 0,
      lucroBruto: 0,
      comissaoParceiroValor: 0,
      lucroFinal: 0,
      margemFinal: 0
    });
  };

  const calcular = () => {
    const {
      custoProduto,
      quantidade,
      comissaoShopee,
      comissaoParceiro,
      imposto,
      taxaFixa,
      custoPedido,
      precoVenda,
      lucroDesejado
    } = formData;

    if (!custoProduto) {
      alert('Por favor, preencha o custo do produto');
      return;
    }

    const custoTotalProduto = parseFloat(custoProduto) * parseInt(quantidade);
    let precoFinal = 0;
    let lucroBruto = 0;
    let lucroFinal = 0;

    if (calculatorMode === 'lucro' && lucroDesejado) {
      const lucroAlvo = parseFloat(lucroDesejado);
      const lucroAlvoAjustado = lucroAlvo / (1 - (parseFloat(comissaoParceiro) / 100));
      precoFinal = (custoTotalProduto + parseFloat(taxaFixa) + parseFloat(custoPedido || 0) + lucroAlvoAjustado) / (1 - (parseFloat(comissaoShopee) + parseFloat(imposto || 0)) / 100);
      lucroBruto = precoFinal - custoTotalProduto - parseFloat(taxaFixa) - parseFloat(custoPedido || 0) - (precoFinal * ((parseFloat(comissaoShopee) + parseFloat(imposto || 0)) / 100));
    } else if (calculatorMode === 'preco' && precoVenda) {
      precoFinal = parseFloat(precoVenda);
      const custoTotal = custoTotalProduto + parseFloat(taxaFixa) + parseFloat(custoPedido || 0);
      const descontos = precoFinal * ((parseFloat(comissaoShopee) + parseFloat(imposto || 0)) / 100);
      lucroBruto = precoFinal - custoTotal - descontos;
    } else {
      alert('Por favor, preencha todos os campos necessários');
      return;
    }

    const comissaoParceiroValor = lucroBruto * (parseFloat(comissaoParceiro) / 100);
    lucroFinal = lucroBruto - comissaoParceiroValor;
    const margemFinal = (lucroFinal / precoFinal) * 100;

    setResultado({
      precoFinal,
      lucroBruto,
      comissaoParceiroValor,
      lucroFinal,
      margemFinal
    });
  };

  const renderMarketplaces = () => (
    <div className="marketplace-container">
      <h2>Vendas</h2>
      <div className="marketplace-cards">
        <div className="marketplace-card shopee" onClick={() => setCurrentView('shopee')}>
          <div className="card-logo">
            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/0e/Shopee_logo.svg/2560px-Shopee_logo.svg.png" alt="Shopee Logo" />
          </div>
          <div className="card-content">
            <h3>Shopee</h3>
            <p>Gerenciar vendas na Shopee</p>
          </div>
        </div>
        <div className="marketplace-card mercadolivre">
          <div className="card-logo">
            <img src="https://http2.mlstatic.com/frontend-assets/ml-web-navigation/ui-navigation/5.21.3/mercadolibre/logo__large_plus.png" alt="Mercado Livre Logo" />
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
    <div className="marketplace-container">
      <button className="back-link" onClick={() => setCurrentView('marketplace')}>
        <i className="fas fa-chevron-left"></i>
        Voltar
      </button>
      <div className="shopee-welcome">
        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/0e/Shopee_logo.svg/2560px-Shopee_logo.svg.png" alt="Shopee Logo" className="shopee-logo" />
        <div className="welcome-text">
          <h2>Bem-vindo(a), Usuário</h2>
          <p>Gerencie suas vendas na Shopee</p>
        </div>
      </div>
      <button className="btn-precificar" onClick={() => setCurrentView('calculator')}>
        <i className="fas fa-tags"></i>
        Precificar Shopee
      </button>
    </div>
  );

  const renderCalculator = () => (
    <div className="calculator-container">
      <button className="back-link" onClick={() => setCurrentView('shopee')}>
        <i className="fas fa-chevron-left"></i>
        Voltar
      </button>
      <div className="calculator-header">
        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/0e/Shopee_logo.svg/2560px-Shopee_logo.svg.png" alt="Shopee Logo" className="marketplace-logo" />
        <div className="header-text">
          <h2>Calculadora de Precificação</h2>
          <p>Calcule o preço ideal para seus produtos</p>
        </div>
      </div>

      <div className="calculator-content">
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
              <label htmlFor="custoProduto">Custo do Produto (R$)</label>
              <input
                type="number"
                id="custoProduto"
                value={formData.custoProduto}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="quantidade">Quantidade</label>
              <input
                type="number"
                id="quantidade"
                value={formData.quantidade}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="comissaoShopee">Comissão Shopee (%)</label>
              <input
                type="number"
                id="comissaoShopee"
                value={formData.comissaoShopee}
                onChange={handleInputChange}
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="comissaoParceiro">Comissão Loja Parceira (% sobre lucro)</label>
              <input
                type="number"
                id="comissaoParceiro"
                value={formData.comissaoParceiro}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="imposto">Imposto (%)</label>
              <input
                type="number"
                id="imposto"
                value={formData.imposto}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="taxaFixa">Taxa Fixa (R$)</label>
              <input
                type="number"
                id="taxaFixa"
                value={formData.taxaFixa}
                onChange={handleInputChange}
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="custoPedido">Custo por Pedido (R$)</label>
              <input
                type="number"
                id="custoPedido"
                value={formData.custoPedido}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor={calculatorMode === 'preco' ? 'precoVenda' : 'lucroDesejado'}>
                {calculatorMode === 'preco' ? 'Preço de Venda (R$)' : 'Lucro Desejado (R$)'}
              </label>
              <input
                type="number"
                id={calculatorMode === 'preco' ? 'precoVenda' : 'lucroDesejado'}
                value={calculatorMode === 'preco' ? formData.precoVenda : formData.lucroDesejado}
                onChange={handleInputChange}
              />
            </div>
          </div>

          <div className="calculator-actions">
            <button className="btn-calcular" onClick={calcular}>
              <i className="fas fa-calculator"></i>
              Calcular
            </button>
            <button className="btn-limpar" onClick={limpar}>
              <i className="fas fa-eraser"></i>
              Limpar Campos
            </button>
          </div>

          {(resultado.precoFinal > 0 || resultado.lucroBruto > 0) && (
            <div className="resultado">
              <h3>Resultado</h3>
              <div className="resultado-item">
                <span>Preço Final:</span>
                <strong>R$ {resultado.precoFinal.toFixed(2)}</strong>
              </div>
              <div className="resultado-item">
                <span>Lucro Bruto:</span>
                <strong>R$ {resultado.lucroBruto.toFixed(2)}</strong>
              </div>
              <div className="resultado-item">
                <span>Comissão Parceiro:</span>
                <strong>R$ {resultado.comissaoParceiroValor.toFixed(2)}</strong>
              </div>
              <div className="resultado-item">
                <span>Lucro Líquido:</span>
                <strong>R$ {resultado.lucroFinal.toFixed(2)}</strong>
              </div>
              <div className="resultado-item">
                <span>Margem:</span>
                <strong>{resultado.margemFinal.toFixed(2)}%</strong>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <div className="vendas-container">
      {currentView === 'marketplace' && renderMarketplaces()}
      {currentView === 'shopee' && renderShopeeMenu()}
      {currentView === 'calculator' && renderCalculator()}
    </div>
  );
};

export default Vendas; 
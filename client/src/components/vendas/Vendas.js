import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Vendas.css';

const Vendas = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('mercadoLivre');
  const [formData, setFormData] = useState({
    valorProduto: '',
    frete: '',
    comissao: '',
    imposto: '',
    custoFixo: '',
    margemLucro: ''
  });
  const [resultados, setResultados] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const calcularPreco = () => {
    const valores = {
      valorProduto: parseFloat(formData.valorProduto) || 0,
      frete: parseFloat(formData.frete) || 0,
      comissao: parseFloat(formData.comissao) || 0,
      imposto: parseFloat(formData.imposto) || 0,
      custoFixo: parseFloat(formData.custoFixo) || 0,
      margemLucro: parseFloat(formData.margemLucro) || 0
    };

    const custoTotal = valores.valorProduto + valores.frete + valores.custoFixo;
    const precoBase = custoTotal / (1 - (valores.comissao + valores.imposto + valores.margemLucro) / 100);
    const lucroLiquido = precoBase * (valores.margemLucro / 100);
    const impostos = precoBase * (valores.imposto / 100);
    const comissoes = precoBase * (valores.comissao / 100);

    setResultados({
      precoVenda: precoBase.toFixed(2),
      lucroLiquido: lucroLiquido.toFixed(2),
      impostos: impostos.toFixed(2),
      comissoes: comissoes.toFixed(2),
      custoTotal: custoTotal.toFixed(2)
    });
  };

  const limparCampos = () => {
    setFormData({
      valorProduto: '',
      frete: '',
      comissao: '',
      imposto: '',
      custoFixo: '',
      margemLucro: ''
    });
    setResultados(null);
  };

  return (
    <div className="vendas-container">
      <div className="marketplace-container">
        <div className="marketplace-header">
          <button className="back-button" onClick={() => navigate('/dashboard')}>
            <i className="fas fa-arrow-left"></i>
            <span>Voltar ao Dashboard</span>
          </button>
          <div className="user-welcome">
            <h2>Calculadora de Preços</h2>
            <p>Calcule o preço ideal para seus produtos em diferentes marketplaces</p>
          </div>
        </div>

        <div className="calc-container">
          <div className="calc-options">
            <button
              className={`calc-tab ${activeTab === 'mercadoLivre' ? 'active' : ''}`}
              onClick={() => setActiveTab('mercadoLivre')}
            >
              Mercado Livre
            </button>
            <button
              className={`calc-tab ${activeTab === 'shopee' ? 'active' : ''}`}
              onClick={() => setActiveTab('shopee')}
            >
              Shopee
            </button>
            <button
              className={`calc-tab ${activeTab === 'amazon' ? 'active' : ''}`}
              onClick={() => setActiveTab('amazon')}
            >
              Amazon
            </button>
          </div>

          <div className="calc-form">
            <div className="input-group">
              <label>Valor do Produto (R$)</label>
              <input
                type="number"
                name="valorProduto"
                value={formData.valorProduto}
                onChange={handleInputChange}
                placeholder="0.00"
              />
            </div>
            <div className="input-group">
              <label>Frete (R$)</label>
              <input
                type="number"
                name="frete"
                value={formData.frete}
                onChange={handleInputChange}
                placeholder="0.00"
              />
            </div>
            <div className="input-group">
              <label>Comissão (%)</label>
              <input
                type="number"
                name="comissao"
                value={formData.comissao}
                onChange={handleInputChange}
                placeholder="0"
              />
            </div>
            <div className="input-group">
              <label>Imposto (%)</label>
              <input
                type="number"
                name="imposto"
                value={formData.imposto}
                onChange={handleInputChange}
                placeholder="0"
              />
            </div>
            <div className="input-group">
              <label>Custo Fixo (R$)</label>
              <input
                type="number"
                name="custoFixo"
                value={formData.custoFixo}
                onChange={handleInputChange}
                placeholder="0.00"
              />
            </div>
            <div className="input-group">
              <label>Margem de Lucro (%)</label>
              <input
                type="number"
                name="margemLucro"
                value={formData.margemLucro}
                onChange={handleInputChange}
                placeholder="0"
              />
            </div>
          </div>

          <div className="calc-buttons">
            <button className="action-btn calc-button" onClick={calcularPreco}>
              <i className="fas fa-calculator"></i>
              Calcular
            </button>
            <button className="action-btn clear-button" onClick={limparCampos}>
              <i className="fas fa-trash"></i>
              Limpar
            </button>
          </div>

          {resultados && (
            <div className="calc-results">
              <div className="result-card">
                <h3>Resultados</h3>
                <div className="result-item">
                  <span>Preço de Venda:</span>
                  <strong>R$ {resultados.precoVenda}</strong>
                </div>
                <div className="result-item">
                  <span>Lucro Líquido:</span>
                  <strong>R$ {resultados.lucroLiquido}</strong>
                </div>
                <div className="result-item">
                  <span>Impostos:</span>
                  <strong>R$ {resultados.impostos}</strong>
                </div>
                <div className="result-item">
                  <span>Comissões:</span>
                  <strong>R$ {resultados.comissoes}</strong>
                </div>
                <div className="result-item">
                  <span>Custo Total:</span>
                  <strong>R$ {resultados.custoTotal}</strong>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Vendas; 
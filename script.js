function navigateToModule(module) {
    // Limpa o conteúdo atual do dashboard
    const dashboard = document.querySelector('.dashboard');
    
    if (module === 'vendas') {
        dashboard.innerHTML = `
            <h2>${module.charAt(0).toUpperCase() + module.slice(1)}</h2>
            <div class="marketplace-cards">
                <div class="marketplace-card shopee" onclick="abrirMarketplace('shopee')">
                    <div class="card-logo">
                        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/0e/Shopee_logo.svg/2560px-Shopee_logo.svg.png" alt="Shopee Logo">
                    </div>
                    <div class="card-content">
                        <h3>Shopee</h3>
                        <p>Gerenciar vendas na Shopee</p>
                    </div>
                </div>
                <div class="marketplace-card mercadolivre" onclick="abrirMarketplace('mercadolivre')">
                    <div class="card-logo">
                        <img src="https://http2.mlstatic.com/frontend-assets/ml-web-navigation/ui-navigation/5.21.3/mercadolibre/logo__large_plus.png" alt="Mercado Livre Logo">
                    </div>
                    <div class="card-content">
                        <h3>Mercado Livre</h3>
                        <p>Gerenciar vendas no Mercado Livre</p>
                    </div>
                </div>
            </div>
        `;
    } else {
        dashboard.innerHTML = `
            <h2>${module.charAt(0).toUpperCase() + module.slice(1)}</h2>
            <p>Módulo ${module} em desenvolvimento...</p>
        `;
    }
    
    // Adiciona efeito visual ao botão clicado
    const buttons = document.querySelectorAll('.menu-btn');
    buttons.forEach(btn => {
        btn.style.backgroundColor = 'transparent';
        if (btn.querySelector('span').textContent.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '') === module.toLowerCase()) {
            btn.style.backgroundColor = 'var(--primary-color)';
        }
    });

    // Atualiza o nome do ERP
    document.querySelector('.logo h1').textContent = 'ERP Embeleze';
}

function abrirMarketplace(marketplace) {
    const dashboard = document.querySelector('.dashboard');
    
    if (marketplace === 'shopee') {
        dashboard.innerHTML = `
            <button class="back-button" onclick="navigateToModule('vendas')">
                <i class="fas fa-chevron-left"></i>
                Voltar
            </button>
            <div class="marketplace-header">
                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/0e/Shopee_logo.svg/2560px-Shopee_logo.svg.png" alt="Shopee Logo" class="marketplace-page-logo">
                <div class="user-welcome">
                    <h2>Bem-vindo(a), <span class="username">Usuário</span></h2>
                    <p>Gerencie suas vendas na Shopee</p>
                </div>
            </div>
            <div class="marketplace-actions">
                <button class="action-btn precificar" onclick="abrirPrecificacao()">
                    <i class="fas fa-tags"></i>
                    Precificar Shopee
                </button>
            </div>
        `;
    }
}

function abrirPrecificacao() {
    const dashboard = document.querySelector('.dashboard');
    dashboard.innerHTML = `
        <button class="back-button" onclick="abrirMarketplace('shopee')">
            <i class="fas fa-chevron-left"></i>
            Voltar
        </button>
        <div class="marketplace-header">
            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/0e/Shopee_logo.svg/2560px-Shopee_logo.svg.png" alt="Shopee Logo" class="marketplace-page-logo">
            <div class="user-welcome">
                <h2>Calculadora de Precificação</h2>
                <p>Calcule o preço ideal para seus produtos</p>
            </div>
        </div>
        <div class="calc-container">
            <div class="calc-options">
                <button class="calc-tab active" onclick="trocarModo('preco')">Por Preço de Venda</button>
                <button class="calc-tab" onclick="trocarModo('lucro')">Por Lucro Desejado</button>
            </div>
            <div class="calc-form">
                <div class="input-group">
                    <label>Custo do Produto (R$)</label>
                    <input type="number" id="custoProduto" step="0.01">
                </div>
                <div class="input-group">
                    <label>Quantidade</label>
                    <input type="number" id="quantidade" value="1" min="1">
                </div>
                <div class="input-group">
                    <label>Comissão Shopee (%)</label>
                    <input type="number" id="comissaoShopee" step="0.01" value="12">
                </div>
                <div class="input-group">
                    <label>Comissão Loja Parceira (% sobre lucro)</label>
                    <input type="number" id="comissaoParceiro" step="0.01" value="0">
                </div>
                <div class="input-group">
                    <label>Imposto (%)</label>
                    <input type="number" id="imposto" step="0.01">
                </div>
                <div class="input-group">
                    <label>Taxa Fixa (R$)</label>
                    <input type="number" id="taxaFixa" step="0.01" value="5">
                </div>
                <div class="input-group">
                    <label>Custo por Pedido (R$)</label>
                    <input type="number" id="custoPedido" step="0.01">
                </div>
                <div id="campoCalculo" class="input-group">
                    <label>Preço de Venda (R$)</label>
                    <input type="number" id="precoVenda" step="0.01">
                </div>
            </div>
            <button class="action-btn precificar calc-button" onclick="calcular()">
                <i class="fas fa-calculator"></i>
                Calcular
            </button>
            <button class="action-btn limpar clear-button" onclick="limpar()">
                <i class="fas fa-eraser"></i>
                Limpar Campos
            </button>
            <div class="calc-results">
                <div class="result-card">
                    <h3>Resultado</h3>
                    <div class="result-item">
                        <span>Preço Final:</span>
                        <strong id="precoFinal">R$ 0,00</strong>
                    </div>
                    <div class="result-item">
                        <span>Lucro Bruto:</span>
                        <strong id="lucroBruto">R$ 0,00</strong>
                    </div>
                    <div class="result-item">
                        <span>Comissão Parceiro:</span>
                        <strong id="comissaoParceiroValor">R$ 0,00</strong>
                    </div>
                    <div class="result-item">
                        <span>Lucro Líquido:</span>
                        <strong id="lucroFinal">R$ 0,00</strong>
                    </div>
                    <div class="result-item">
                        <span>Margem:</span>
                        <strong id="margemFinal">0%</strong>
                    </div>
                </div>
            </div>
        </div>
    `;
}

function trocarModo(modo) {
    const tabs = document.querySelectorAll('.calc-tab');
    tabs.forEach(tab => tab.classList.remove('active'));
    event.target.classList.add('active');

    const campoCalculo = document.getElementById('campoCalculo');
    if (modo === 'lucro') {
        campoCalculo.innerHTML = `
            <label>Lucro Desejado (R$)</label>
            <input type="number" id="lucroDesejado" step="0.01">
        `;
    } else {
        campoCalculo.innerHTML = `
            <label>Preço de Venda (R$)</label>
            <input type="number" id="precoVenda" step="0.01">
        `;
    }
}

function limpar() {
    // Limpa todos os campos de entrada
    const campos = [
        'custoProduto',
        'quantidade',
        'comissaoShopee',
        'comissaoParceiro',
        'imposto',
        'taxaFixa',
        'custoPedido'
    ];

    campos.forEach(campo => {
        const elemento = document.getElementById(campo);
        if (elemento) {
            elemento.value = '';
        }
    });
    
    // Limpa o campo dinâmico (preço de venda ou lucro desejado)
    const lucroDesejado = document.getElementById('lucroDesejado');
    const precoVenda = document.getElementById('precoVenda');
    if (lucroDesejado) lucroDesejado.value = '';
    if (precoVenda) precoVenda.value = '';

    // Limpa os resultados
    document.getElementById('precoFinal').textContent = 'R$ 0,00';
    document.getElementById('lucroBruto').textContent = 'R$ 0,00';
    document.getElementById('comissaoParceiroValor').textContent = 'R$ 0,00';
    document.getElementById('lucroFinal').textContent = 'R$ 0,00';
    document.getElementById('margemFinal').textContent = '0%';
}

function calcular() {
    const custoProduto = parseFloat(document.getElementById('custoProduto').value) || 0;
    const quantidade = parseInt(document.getElementById('quantidade').value) || 1;
    const comissaoShopee = parseFloat(document.getElementById('comissaoShopee').value) || 0;
    const comissaoParceiro = parseFloat(document.getElementById('comissaoParceiro').value) || 0;
    const imposto = parseFloat(document.getElementById('imposto').value) || 0;
    const taxaFixa = parseFloat(document.getElementById('taxaFixa').value) || 0;
    const custoPedido = parseFloat(document.getElementById('custoPedido').value) || 0;

    const lucroDesejado = document.getElementById('lucroDesejado');
    const precoVenda = document.getElementById('precoVenda');

    const custoTotalProduto = custoProduto * quantidade;
    let precoFinal = 0;
    let lucroBruto = 0;
    let lucroFinal = 0;

    if (lucroDesejado && lucroDesejado.value) {
        // Cálculo por lucro desejado
        const lucroAlvo = parseFloat(lucroDesejado.value);
        // Ajustando o lucro alvo para incluir a comissão do parceiro
        const lucroAlvoAjustado = lucroAlvo / (1 - (comissaoParceiro / 100));
        precoFinal = (custoTotalProduto + taxaFixa + custoPedido + lucroAlvoAjustado) / (1 - (comissaoShopee + imposto) / 100);
        lucroBruto = precoFinal - custoTotalProduto - taxaFixa - custoPedido - (precoFinal * ((comissaoShopee + imposto) / 100));
    } else if (precoVenda && precoVenda.value) {
        // Cálculo por preço de venda
        precoFinal = parseFloat(precoVenda.value);
        const custoTotal = custoTotalProduto + taxaFixa + custoPedido;
        const descontos = precoFinal * ((comissaoShopee + imposto) / 100);
        lucroBruto = precoFinal - custoTotal - descontos;
    }

    // Calcula a comissão do parceiro sobre o lucro bruto
    const comissaoParceiroValor = lucroBruto * (comissaoParceiro / 100);
    lucroFinal = lucroBruto - comissaoParceiroValor;
    const margemFinal = (lucroFinal / precoFinal) * 100;

    document.getElementById('precoFinal').textContent = `R$ ${precoFinal.toFixed(2)}`;
    document.getElementById('lucroBruto').textContent = `R$ ${lucroBruto.toFixed(2)}`;
    document.getElementById('comissaoParceiroValor').textContent = `R$ ${comissaoParceiroValor.toFixed(2)}`;
    document.getElementById('lucroFinal').textContent = `R$ ${lucroFinal.toFixed(2)}`;
    document.getElementById('margemFinal').textContent = `${margemFinal.toFixed(2)}%`;
} 
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const { connectDB } = require('./config/db');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Conectar ao banco de dados
connectDB()
  .then(() => console.log('Conectado ao PostgreSQL'))
  .catch(err => console.error('Erro ao conectar ao PostgreSQL:', err));

// Rotas da API
app.use('/api/auth', require('./routes/auth'));

// Servir arquivos estáticos do React em produção
if (process.env.NODE_ENV === 'production') {
  // Servir arquivos estáticos da pasta build
  app.use(express.static(path.join(__dirname, 'client/build')));

  // Qualquer rota não reconhecida, enviar o index.html
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client/build/index.html'));
  });
}

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`)); 
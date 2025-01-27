require('dotenv').config();
const { sequelize, connectDB } = require('../config/db');
const User = require('../models/User');

const initDB = async () => {
    try {
        // Conectar ao banco de dados
        await connectDB();

        // Criar usuário admin
        await User.create({
            name: 'Administrador',
            email: 'admin@erp.com',
            password: 'admin123',
            role: 'admin'
        });

        // Criar usuário de teste
        await User.create({
            name: 'Usuário Teste',
            email: 'teste@erp.com',
            password: 'teste123',
            role: 'user'
        });

        console.log('Banco de dados inicializado com sucesso!');
        process.exit(0);
    } catch (error) {
        console.error('Erro ao inicializar banco de dados:', error);
        process.exit(1);
    }
};

initDB(); 
const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialect: 'postgres',
    protocol: 'postgres',
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false
        }
    },
    logging: false
});

const connectDB = async () => {
    try {
        await sequelize.authenticate();
        console.log('Conexão com PostgreSQL estabelecida com sucesso.');
        
        // Sincronizar modelos com o banco de dados
        await sequelize.sync();
        console.log('Modelos sincronizados com o banco de dados.');
    } catch (error) {
        console.error('Erro ao conectar com PostgreSQL:', error);
        process.exit(1);
    }
};

module.exports = { sequelize, connectDB }; 
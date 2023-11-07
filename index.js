// index.js

const express = require('express');
const { Sequelize, DataTypes } = require('sequelize');
const app = express();
const cors = require('cors'); // Importe o middleware cors


app.use(express.json());

app.use(cors())

const port = 3333;

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './database.sqlite'
});

sequelize.authenticate().then(() => {
  console.log('Conexão ao banco de dados estabelecida com sucesso.');
}).catch(error => {
  console.error('Erro ao conectar ao banco de dados:', error);
});

const Cadastro = sequelize.define('Cadastro', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  nome: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
});

// Sincronize o modelo com o banco de dados
Cadastro.sync()
  .then(() => {
    console.log('Tabela "Cadastros" sincronizada com sucesso.');
  })
  .catch(error => {
    console.error('Erro ao sincronizar a tabela "Cadastros":', error);
  });

app.post('/cadastrar', async (req, res) => {
  try {
    const novoUsuario = await Cadastro.create({
      nome: req.body.nome,
      email: req.body.email,
    });

    res.status(201).json(novoUsuario);
  } catch (error) {
    console.error('Erro ao inserir usuário:', error);
    res.status(500).json({ error: 'Erro ao inserir usuário' });
  }
});

app.get('/listar', async (req, res) => {
  try {
    const usuarios = await Cadastro.findAll();

    res.json(usuarios);
  } catch (error) {
    console.error('Erro ao listar usuários:', error);
    res.status(500).json({ error: 'Erro ao listar usuários' });
  }
});

app.listen(port, () => {
  console.log("Servidor rodando na porta 3333");
});

module.exports = { sequelize };

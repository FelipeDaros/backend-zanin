const express = require('express');
const { Sequelize, DataTypes } = require('sequelize');
const app = express();
const cors = require('cors');
const path = require('path'); // Importe a biblioteca 'path'

app.use(express.json());

app.use(cors());

app.set('views', path.join(__dirname, 'views')); // Define o diretório de visualizações
app.set('view engine', 'ejs'); // Define o mecanismo de visualização (neste caso, 'ejs')
app.use(express.static( "public" ));


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

const Eletrecista = sequelize.define('eletrecista', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  nome: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  data_nascimento: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  cidade: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  custo_medio: {
    type: DataTypes.DECIMAL,
    allowNull: false,
  },
  especialidades: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  tipo: {
    type: DataTypes.STRING,
    allowNull: false,
  }
});

const Cliente = sequelize.define('cliente', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  nome: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  cpf: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  cidade: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  senha: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  tipo: {
    type: DataTypes.STRING,
    allowNull: false,
  }
});

// Sincronize o modelo com o banco de dados
Eletrecista.sync()
  .then(() => {
    console.log('Tabela "Eletrecista" sincronizada com sucesso.');
  })
  .catch(error => {
    console.error('Erro ao sincronizar a tabela "Eletrecista":', error);
  });

Cliente.sync()
.then(() => {
  console.log('Tabela "Cliente" sincronizada com sucesso.');
})
.catch(error => {
  console.error('Erro ao sincronizar a tabela "Cliente":', error);
});

app.post('/cadastrar-eletrecista', async (req, res) => {
  try {
    const eletrecista = await Eletrecista.create({
      nome: req.body.nome,
      email: req.body.email,
      data_nascimento: req.body.data_nascimento,
      cidade: req.body.cidade,
      custo_medio: req.body.custo_medio,
      especialidades: req.body.especialidades,
      tipo: 'ELETRECISTA'
    });

    res.status(201).json(eletrecista);
  } catch (error) {
    console.error('Erro ao inserir usuário:', error);
    res.status(500).json({ error: 'Erro ao inserir usuário' });
  }
});

app.get('/listar-eletrecista', async (req, res) => {
  try {
    const eletrecistas = await Eletrecista.findAll();

    res.json(eletrecistas);
  } catch (error) {
    console.error('Erro ao listar eletrecistas:', error);
    res.status(500).json({ error: 'Erro ao listar eletrecistas' });
  }
});

app.post('/cadastrar-cliente', async (req, res) => {
  try {
    const cliente = await Cliente.create({
      nome: req.body.nome,
      cpf: req.body.cpf,
      cidade: req.body.cidade,
      email: req.body.email,
      senha: req.body.senha,
      tipo: 'CLIENTE'
    });

    res.status(201).json(cliente);
  } catch (error) {
    console.error('Erro ao inserir usuário:', error);
    res.status(500).json({ error: 'Erro ao inserir usuário' });
  }
});

app.get('/listar-clientes', async (req, res) => {
  try {
    const clientes = await Cliente.findAll();

    res.json(clientes);
  } catch (error) {
    console.error('Erro ao listar clientes:', error);
    res.status(500).json({ error: 'Erro ao listar clientes' });
  }
});

app.get('/home', async (req, res) => {
  res.render('home'); // Remova a parte './views/'
});

app.get('/cadastro-eletrecista', async (req, res) => {
  res.render('cadastro-eletrecista'); // Remova a parte './views/'
});

app.get('/cadastro-cliente', async (req, res) => {
  res.render('cadastro-cliente'); // Remova a parte './views/'
});

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});

module.exports = { sequelize };

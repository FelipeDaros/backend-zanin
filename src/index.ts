import express, { Request, Response } from 'express';
import 'dotenv/config'
import cors from 'cors';
import path from 'path';
import { AppDataSource } from './data-source';
import { Eletrecista } from './entities/Eletrecista';
import { Cliente } from './entities/Cliente';

AppDataSource.initialize().then(() => {
  const app = express()

  app.use(express.json());

  app.use(cors());

  app.set('views', path.join(__dirname, 'views')); // Define o diretório de visualizações
  app.set('view engine', 'ejs'); // Define o mecanismo de visualização (neste caso, 'ejs')
  app.use(express.static("public"));

  app.post('/cadastrar-eletrecista', async (req, res) => {
    try {
      const eletrecista = AppDataSource.getRepository(Eletrecista).create({
        nome: req.body.nome,
        email: req.body.email,
        data_nascimento: req.body.data_nascimento,
        cidade: req.body.cidade,
        custo_medio: req.body.custo_medio,
        especialidades: req.body.especialidades,
        tipo: 'ELETRECISTA'
      });

      await AppDataSource.getRepository(Eletrecista).save(eletrecista);

      return res.status(201).json(eletrecista);
    } catch (error) {
      console.error('Erro ao inserir usuário:', error);
      res.status(500).json({ error: 'Erro ao inserir usuário' });
    }
  });

  app.get('/listar-eletrecista', async (req: Request, res: Response) => {
    try {
      const eletrecistas = await AppDataSource.getRepository(Eletrecista).find();

      return res.json(eletrecistas);
    } catch (error) {
      console.error('Erro ao listar eletrecistas:', error);
      res.status(500).json({ error: 'Erro ao listar eletrecistas' });
    }
  });

  app.post('/cadastrar-cliente', async (req, res) => {
    try {
      const cliente = AppDataSource.getRepository(Cliente).create({
        nome: req.body.nome,
        cpf: req.body.cpf,
        cidade: req.body.cidade,
        email: req.body.email,
        tipo: 'CLIENTE',
        bairro: req.body.bairro,
        telefone: req.body.telefone
      });

      await AppDataSource.getRepository(Cliente).save(cliente);

      return res.status(201).json(cliente);
    } catch (error) {
      console.error('Erro ao inserir usuário:', error);
      res.status(500).json({ error: 'Erro ao inserir usuário' });
    }
  });

  app.get('/listar-clientes', async (req, res) => {
    try {
      const clientes = await AppDataSource.getRepository(Cliente).find();

      return res.json(clientes);
    } catch (error) {
      console.error('Erro ao listar clientes:', error);
      res.status(500).json({ error: 'Erro ao listar clientes' });
    }
  });


  app.get('/home', async (req, res) => {
    res.render('home');
  });

  app.get('/c-home', async (req, res) => {
    res.render('c-home');
  });

  app.get('/c-contratar', async (req, res) => {
    res.render('c-contratar');
  });

  app.get('/c-agenda', async (req, res) => {
    res.render('c-agenda');
  });

  app.get('/c-contratar-agenda-pagamento', async (req, res) => {
    res.render('c-contratar-agenda-pagamento');
  });

  app.get('/cadastro-eletrecista', async (req, res) => {
    res.render('cadastro-eletrecista');
  });

  app.get('/cadastro-cliente', async (req, res) => {
    res.render('cadastro-cliente');
  });

  return app.listen(process.env.PORT)
})

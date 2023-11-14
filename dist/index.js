"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
require("dotenv/config");
const cors_1 = __importDefault(require("cors"));
const path_1 = __importDefault(require("path"));
const data_source_1 = require("./data-source");
const Eletrecista_1 = require("./entities/Eletrecista");
const Cliente_1 = require("./entities/Cliente");
data_source_1.AppDataSource.initialize().then(() => {
    const app = (0, express_1.default)();
    app.use(express_1.default.json());
    app.use((0, cors_1.default)());
    app.set('views', path_1.default.join(__dirname, 'views')); // Define o diretório de visualizações
    app.set('view engine', 'ejs'); // Define o mecanismo de visualização (neste caso, 'ejs')
    app.use(express_1.default.static("public"));
    app.post('/cadastrar-eletrecista', async (req, res) => {
        try {
            const eletrecista = data_source_1.AppDataSource.getRepository(Eletrecista_1.Eletrecista).create({
                nome: req.body.nome,
                email: req.body.email,
                data_nascimento: req.body.data_nascimento,
                cidade: req.body.cidade,
                custo_medio: req.body.custo_medio,
                especialidades: req.body.especialidades,
                tipo: 'ELETRECISTA'
            });
            await data_source_1.AppDataSource.getRepository(Eletrecista_1.Eletrecista).save(eletrecista);
            return res.status(201).json(eletrecista);
        }
        catch (error) {
            console.error('Erro ao inserir usuário:', error);
            res.status(500).json({ error: 'Erro ao inserir usuário' });
        }
    });
    app.get('/listar-eletrecista', async (req, res) => {
        try {
            const eletrecistas = await data_source_1.AppDataSource.getRepository(Eletrecista_1.Eletrecista).find();
            return res.json(eletrecistas);
        }
        catch (error) {
            console.error('Erro ao listar eletrecistas:', error);
            res.status(500).json({ error: 'Erro ao listar eletrecistas' });
        }
    });
    app.post('/cadastrar-cliente', async (req, res) => {
        try {
            const cliente = data_source_1.AppDataSource.getRepository(Cliente_1.Cliente).create({
                nome: req.body.nome,
                cpf: req.body.cpf,
                cidade: req.body.cidade,
                email: req.body.email,
                senha: req.body.senha,
                tipo: 'CLIENTE'
            });
            await data_source_1.AppDataSource.getRepository(Cliente_1.Cliente).save(cliente);
            return res.status(201).json(cliente);
        }
        catch (error) {
            console.error('Erro ao inserir usuário:', error);
            res.status(500).json({ error: 'Erro ao inserir usuário' });
        }
    });
    app.get('/listar-clientes', async (req, res) => {
        try {
            const clientes = await data_source_1.AppDataSource.getRepository(Cliente_1.Cliente).find();
            return res.json(clientes);
        }
        catch (error) {
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
    return app.listen(process.env.PORT);
});

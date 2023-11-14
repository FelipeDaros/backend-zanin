"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
require("dotenv/config");
require("reflect-metadata");
const typeorm_1 = require("typeorm");
const port = 5432;
exports.AppDataSource = new typeorm_1.DataSource({
    type: 'postgres',
    url: 'postgres://ernergy_user:nTqf629bDfF4FdNSkak676yUbFcu4ixk@dpg-cl6l2as72pts73bj0fkg-a.oregon-postgres.render.com/ernergy',
    entities: [`${__dirname}/**/entities/*.{ts,js}`],
    migrations: [`${__dirname}/**/migrations/*.{ts,js}`],
    ssl: true,
});

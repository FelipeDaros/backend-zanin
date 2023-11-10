import 'dotenv/config'
import 'reflect-metadata'
import { DataSource } from 'typeorm'

const port = 5432;

export const AppDataSource = new DataSource({
	type: 'postgres',
	url: 'postgres://ernergy_user:nTqf629bDfF4FdNSkak676yUbFcu4ixk@dpg-cl6l2as72pts73bj0fkg-a.oregon-postgres.render.com/ernergy',
	entities: [`${__dirname}/**/entities/*.{ts,js}`],
	migrations: [`${__dirname}/**/migrations/*.{ts,js}`],
	ssl: true,
})
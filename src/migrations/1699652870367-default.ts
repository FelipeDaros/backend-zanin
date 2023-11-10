import { MigrationInterface, QueryRunner } from "typeorm";

export class Default1699652870367 implements MigrationInterface {
    name = 'Default1699652870367'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "cliente" ("id" SERIAL NOT NULL, "nome" character varying NOT NULL, "cpf" character varying NOT NULL, "cidade" character varying NOT NULL, "email" integer NOT NULL, "senha" character varying NOT NULL, "tipo" character varying NOT NULL, CONSTRAINT "PK_18990e8df6cf7fe71b9dc0f5f39" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "eletrecista" ("id" SERIAL NOT NULL, "nome" character varying NOT NULL, "data_nascimento" TIMESTAMP NOT NULL, "cidade" character varying NOT NULL, "email" character varying NOT NULL, "custo_medio" integer NOT NULL, "especialidades" text NOT NULL, "tipo" character varying NOT NULL, CONSTRAINT "PK_62f62aebebe6ec585172e9e08b4" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "eletrecista"`);
        await queryRunner.query(`DROP TABLE "cliente"`);
    }

}

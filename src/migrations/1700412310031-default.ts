import { MigrationInterface, QueryRunner } from "typeorm";

export class Default1700412310031 implements MigrationInterface {
    name = 'Default1700412310031'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "cliente" DROP COLUMN "senha"`);
        await queryRunner.query(`ALTER TABLE "cliente" ADD "bairro" character varying`);
        await queryRunner.query(`ALTER TABLE "cliente" ADD "telefone" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "cliente" DROP COLUMN "telefone"`);
        await queryRunner.query(`ALTER TABLE "cliente" DROP COLUMN "bairro"`);
        await queryRunner.query(`ALTER TABLE "cliente" ADD "senha" character varying NOT NULL`);
    }

}
